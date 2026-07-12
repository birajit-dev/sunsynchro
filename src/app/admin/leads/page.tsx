"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "../../../lib/supabase/client";
import type { Lead, LeadStatus } from "../../../lib/types";
import { LEAD_STATUSES } from "../../../lib/types";
import {
  HiSearch,
  HiTrash,
  HiMail,
  HiPhone,
  HiRefresh,
  HiUser,
  HiChatAlt2,
} from "react-icons/hi";

type SourceTab = "all" | "website_lead_modal" | "website_contact_form";

const SOURCE_TABS: { id: SourceTab; label: string; badge: string }[] = [
  { id: "all", label: "All leads", badge: "bg-gray-100 text-gray-700" },
  { id: "website_lead_modal", label: "Quote modal", badge: "bg-yellow-100 text-yellow-800" },
  { id: "website_contact_form", label: "Contact page", badge: "bg-emerald-100 text-emerald-800" },
];

const sourceLabel = (source: string) => {
  switch (source) {
    case "website_lead_modal":
      return "Quote modal";
    case "website_contact_form":
      return "Contact page";
    case "product_enquiry":
      return "Product enquiry";
    default:
      return source || "Website";
  }
};

const sourceBadge = (source: string) => {
  if (source === "website_lead_modal") return "bg-yellow-100 text-yellow-800";
  if (source === "website_contact_form") return "bg-emerald-100 text-emerald-800";
  return "bg-gray-100 text-gray-600";
};

export default function AdminLeadsPage() {
  const supabase = createClient();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sourceTab, setSourceTab] = useState<SourceTab>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selected, setSelected] = useState<Lead | null>(null);
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchLeads = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      showToast("error", error.message);
    } else if (data) {
      setLeads(data as Lead[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  useEffect(() => {
    if (selected) setNotes(selected.notes ?? "");
  }, [selected?.id]);

  const modalCount = leads.filter((l) => l.source === "website_lead_modal").length;
  const contactCount = leads.filter((l) => l.source === "website_contact_form").length;
  const newCount = leads.filter((l) => l.status === "new").length;

  const tabCount = (id: SourceTab) => {
    if (id === "all") return leads.length;
    if (id === "website_lead_modal") return modalCount;
    return contactCount;
  };

  const filtered = leads.filter((lead) => {
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      lead.name.toLowerCase().includes(q) ||
      lead.email.toLowerCase().includes(q) ||
      lead.phone.toLowerCase().includes(q) ||
      lead.service.toLowerCase().includes(q);
    const matchesSource = sourceTab === "all" || lead.source === sourceTab;
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
    return matchesSearch && matchesSource && matchesStatus;
  });

  const updateStatus = async (id: string, status: LeadStatus) => {
    const { error } = await supabase.from("leads").update({ status }).eq("id", id);
    if (error) {
      showToast("error", error.message);
      return;
    }
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    if (selected?.id === id) setSelected((s) => (s ? { ...s, status } : s));
    showToast("success", `Marked as ${status}`);
  };

  const saveNotes = async () => {
    if (!selected) return;
    setSaving(true);
    const { error } = await supabase
      .from("leads")
      .update({ notes: notes.trim() })
      .eq("id", selected.id);
    setSaving(false);
    if (error) {
      showToast("error", error.message);
      return;
    }
    setLeads((prev) =>
      prev.map((l) => (l.id === selected.id ? { ...l, notes: notes.trim() } : l))
    );
    setSelected((s) => (s ? { ...s, notes: notes.trim() } : s));
    showToast("success", "Notes saved");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this lead permanently?")) return;
    const { error } = await supabase.from("leads").delete().eq("id", id);
    if (error) {
      showToast("error", error.message);
      return;
    }
    setLeads((prev) => prev.filter((l) => l.id !== id));
    if (selected?.id === id) setSelected(null);
    showToast("success", "Lead deleted");
  };

  const statusMeta = (status: LeadStatus) =>
    LEAD_STATUSES.find((s) => s.value === status) ?? LEAD_STATUSES[0];

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-xl shadow-xl text-sm font-medium text-white ${
            toast.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {toast.message}
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            Quote modal and contact form submissions
            {newCount > 0 && (
              <span className="ml-2 text-blue-600 font-medium">{newCount} new</span>
            )}
          </p>
        </div>
        <button
          onClick={fetchLeads}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50"
        >
          <HiRefresh className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {/* Source separation: Modal vs Contact */}
      <div className="flex flex-wrap gap-2 mb-5">
        {SOURCE_TABS.map((tab) => {
          const active = sourceTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setSourceTab(tab.id);
                setSelected(null);
              }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
                active
                  ? "bg-gray-900 text-white shadow-sm"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {tab.label}
              <span
                className={`px-1.5 py-0.5 rounded-full text-[11px] font-semibold ${
                  active ? "bg-white/20 text-white" : tab.badge
                }`}
              >
                {tabCount(tab.id)}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search name, email, phone, service…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All statuses</option>
          {LEAD_STATUSES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="py-20 text-center text-gray-400">Loading leads…</div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center text-gray-400 px-6">
              {sourceTab === "website_lead_modal"
                ? "No quote-modal leads yet. They appear when someone submits the “Get Free Quote” popup."
                : sourceTab === "website_contact_form"
                  ? "No contact-page leads yet. They appear when someone submits /contact."
                  : "No leads yet."}
            </div>
          ) : (
            <div className="divide-y divide-gray-50 max-h-[70vh] overflow-y-auto">
              {filtered.map((lead) => {
                const meta = statusMeta(lead.status);
                const active = selected?.id === lead.id;
                return (
                  <button
                    key={lead.id}
                    type="button"
                    onClick={() => setSelected(lead)}
                    className={`w-full text-left px-5 py-4 hover:bg-gray-50 transition ${
                      active ? "bg-blue-50/60" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="font-semibold text-gray-900 truncate">{lead.name}</span>
                          {lead.status === "new" && (
                            <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                          )}
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${sourceBadge(lead.source)}`}>
                            {sourceLabel(lead.source)}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 truncate">{lead.email}</div>
                        <div className="text-xs text-gray-400 mt-1">
                          {new Date(lead.created_at).toLocaleString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium flex-shrink-0 ${meta.color}`}>
                        {meta.label}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-5 min-h-[320px]">
          {!selected ? (
            <div className="h-full flex items-center justify-center text-gray-400 text-sm py-16">
              Select a lead to view details
            </div>
          ) : (
            <div className="space-y-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <HiUser className="w-5 h-5 text-gray-400" />
                    {selected.name}
                  </h2>
                  <span className={`inline-block mt-2 px-2.5 py-1 rounded-full text-xs font-semibold ${sourceBadge(selected.source)}`}>
                    {sourceLabel(selected.source)}
                  </span>
                </div>
                <button
                  onClick={() => handleDelete(selected.id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                  title="Delete lead"
                >
                  <HiTrash className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2 text-sm">
                <a href={`mailto:${selected.email}`} className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
                  <HiMail className="w-4 h-4 text-gray-400" />
                  {selected.email}
                </a>
                {selected.phone && (
                  <a href={`tel:${selected.phone}`} className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
                    <HiPhone className="w-4 h-4 text-gray-400" />
                    {selected.phone}
                  </a>
                )}
                <div className="text-gray-600">
                  <span className="text-gray-400 text-xs uppercase tracking-wide">Service</span>
                  <div className="font-medium mt-0.5">{selected.service || "—"}</div>
                </div>
              </div>

              {selected.message && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-1.5">
                    <HiChatAlt2 className="w-3.5 h-3.5" />
                    Message
                  </div>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">{selected.message}</p>
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Status</label>
                <select
                  value={selected.status}
                  onChange={(e) => updateStatus(selected.id, e.target.value as LeadStatus)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {LEAD_STATUSES.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Internal notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  placeholder="Call notes, follow-up reminders…"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={saveNotes}
                  disabled={saving}
                  className="mt-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {saving ? "Saving…" : "Save notes"}
                </button>
              </div>

              <p className="text-[11px] text-gray-400">
                Received{" "}
                {new Date(selected.created_at).toLocaleString("en-IN", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

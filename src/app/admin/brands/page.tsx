"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "../../../lib/supabase/client";
import type { Brand } from "../../../lib/types";
import { HiPlus, HiPencil, HiTrash, HiStar, HiSearch } from "react-icons/hi";

export default function AdminBrandsPage() {
  const supabase = createClient();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchBrands = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("brands")
      .select("*")
      .order("name", { ascending: true });
    if (!error && data) setBrands(data);
    setLoading(false);
  };

  useEffect(() => { fetchBrands(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this brand? This cannot be undone.")) return;
    setDeleting(id);
    const { error } = await supabase.from("brands").delete().eq("id", id);
    if (error) {
      showToast("error", "Failed to delete brand.");
    } else {
      showToast("success", "Brand deleted.");
      setBrands((prev) => prev.filter((b) => b.id !== id));
    }
    setDeleting(null);
  };

  const filtered = brands.filter(
    (b) =>
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-xl shadow-xl text-sm font-medium text-white transition-all ${
            toast.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {toast.message}
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Brands</h1>
          <p className="text-gray-500 text-sm mt-0.5">{brands.length} total brands</p>
        </div>
        <Link
          href="/admin/brands/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-600 text-white text-sm font-semibold rounded-lg hover:bg-purple-700 transition shadow-sm"
        >
          <HiPlus className="w-5 h-5" />
          Add Brand
        </Link>
      </div>

      <div className="relative mb-5">
        <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name or category…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-gray-400">Loading…</div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center text-gray-400">
            {search ? "No brands match your search." : "No brands yet."}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-left">
                  <th className="px-5 py-3.5 font-semibold text-gray-600">Brand</th>
                  <th className="px-5 py-3.5 font-semibold text-gray-600 hidden sm:table-cell">Category</th>
                  <th className="px-5 py-3.5 font-semibold text-gray-600 hidden md:table-cell">Website</th>
                  <th className="px-5 py-3.5 font-semibold text-gray-600 text-center">Featured</th>
                  <th className="px-5 py-3.5 font-semibold text-gray-600 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((brand) => (
                  <tr key={brand.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {brand.logo ? (
                          <div className="w-10 h-10 rounded-lg bg-gray-50 overflow-hidden flex-shrink-0 flex items-center justify-center border border-gray-100">
                            <Image
                              src={brand.logo}
                              alt={brand.name}
                              width={40}
                              height={40}
                              className="object-contain"
                            />
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0">
                            <span className="text-purple-500 text-sm font-bold">
                              {brand.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                        <div>
                          <div className="font-medium text-gray-900 capitalize">{brand.name}</div>
                          <div className="text-xs text-gray-400 line-clamp-1">{brand.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 hidden sm:table-cell">
                      <span className="px-2.5 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded-full">
                        {brand.category}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-gray-500 text-xs hidden md:table-cell">
                      {brand.website ? (
                        <a href={brand.website} target="_blank" rel="noreferrer" className="hover:text-purple-600 truncate block max-w-[200px]">
                          {brand.website.replace(/^https?:\/\//, "")}
                        </a>
                      ) : "—"}
                    </td>
                    <td className="px-5 py-4 text-center">
                      {brand.featured ? (
                        <HiStar className="w-5 h-5 text-yellow-400 mx-auto" />
                      ) : (
                        <span className="text-gray-300">—</span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/brands/${brand.id}`}
                          className="p-1.5 rounded-lg text-gray-500 hover:bg-purple-50 hover:text-purple-600 transition"
                        >
                          <HiPencil className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(brand.id)}
                          disabled={deleting === brand.id}
                          className="p-1.5 rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-600 transition disabled:opacity-40"
                        >
                          <HiTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

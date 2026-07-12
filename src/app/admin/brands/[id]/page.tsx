"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "../../../../lib/supabase/client";
import { BRAND_CATEGORIES } from "../../../../lib/types";
import ImageUpload from "../../_components/ImageUpload";
import { HiArrowLeft } from "react-icons/hi";

export default function EditBrandPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const supabase = createClient();

  const [name, setName] = useState("");
  const [logo, setLogo] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [category, setCategory] = useState(BRAND_CATEGORIES[0]);
  const [featured, setFeatured] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");

  useEffect(() => {
    const fetchBrand = async () => {
      const { data, error } = await supabase
        .from("brands")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !data) {
        setError("Brand not found.");
        setLoading(false);
        return;
      }

      setName(data.name);
      setLogo(data.logo ?? "");
      setDescription(data.description ?? "");
      setWebsite(data.website ?? "");
      setCategory(data.category);
      setFeatured(data.featured ?? false);
      setLoading(false);
    };

    if (id) fetchBrand();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Brand name is required.");
      return;
    }
    setSaving(true);
    setError("");

    const { error: dbError } = await supabase
      .from("brands")
      .update({
        name: name.trim(),
        logo: logo.trim(),
        description: description.trim(),
        website: website.trim(),
        category,
        featured,
      })
      .eq("id", id);

    if (dbError) {
      setError(dbError.message);
    } else {
      setToast("Brand updated successfully!");
      setTimeout(() => setToast(""), 3000);
    }
    setSaving(false);
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-400">Loading brand…</div>;
  }

  return (
    <div className="p-6 lg:p-8 max-w-2xl mx-auto">
      {toast && (
        <div className="fixed top-5 right-5 z-50 px-5 py-3 rounded-xl shadow-xl text-sm font-medium text-white bg-green-600">
          {toast}
        </div>
      )}

      <Link
        href="/admin/brands"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 mb-6 transition"
      >
        <HiArrowLeft className="w-4 h-4" />
        Back to Brands
      </Link>

      <h1 className="text-2xl font-bold text-gray-900 mb-8">Edit Brand</h1>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Brand Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
              >
                {BRAND_CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Website URL</label>
            <input
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <ImageUpload
              label="Brand Logo"
              value={logo}
              onChange={setLogo}
              folder="brands"
              accent="purple"
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              id="featured"
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            />
            <label htmlFor="featured" className="text-sm font-medium text-gray-700 cursor-pointer">
              Featured brand
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Link
            href="/admin/brands"
            className="px-5 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 text-sm font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-sm"
          >
            {saving ? "Saving…" : "Update Brand"}
          </button>
        </div>
      </form>
    </div>
  );
}

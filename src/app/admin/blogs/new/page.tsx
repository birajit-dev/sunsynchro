"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "../../../../lib/supabase/client";
import { BLOG_CATEGORIES } from "../../../../lib/types";
import ImageUpload from "../../_components/ImageUpload";
import { HiArrowLeft, HiEye, HiCode, HiLightBulb } from "react-icons/hi";

const generateSlug = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();

const HTML_SNIPPETS = [
  { label: "H2", code: '<h2 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">Heading</h2>' },
  { label: "H3", code: '<h3 class="text-xl font-semibold text-gray-900 mt-6 mb-3">Subheading</h3>' },
  { label: "P", code: '<p class="text-gray-700 leading-relaxed mb-6">Paragraph text here.</p>' },
  { label: "Bold", code: '<strong class="font-semibold">bold text</strong>' },
  { label: "List", code: '<ul class="list-disc pl-6 mb-6 space-y-2 text-gray-700">\n  <li>Item 1</li>\n  <li>Item 2</li>\n</ul>' },
  { label: "CTA", code: '<p class="text-gray-700 leading-relaxed mb-6"><strong class="text-green-600">👉 Ready to start?</strong> Contact Sunsynchro to get a free consultation.</p>' },
];

export default function NewBlogPage() {
  const router = useRouter();
  const supabase = createClient();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [author, setAuthor] = useState("Sunsynchro Team");
  const [publishDate, setPublishDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [readTime, setReadTime] = useState("5 min read");
  const [category, setCategory] = useState(BLOG_CATEGORIES[0]);
  const [tags, setTags] = useState("");
  const [featured, setFeatured] = useState(false);
  const [published, setPublished] = useState(true);
  const [previewMode, setPreviewMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!slug || slug === generateSlug(title)) {
      setSlug(generateSlug(val));
    }
  };

  const insertSnippet = (code: string) => {
    setContent((prev) => prev + (prev.endsWith("\n") || !prev ? "" : "\n") + code + "\n");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !slug.trim()) {
      setError("Title and slug are required.");
      return;
    }
    setSaving(true);
    setError("");

    const tagsArray = tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const { error: dbError } = await supabase.from("blog_posts").insert({
      title: title.trim(),
      slug: slug.trim(),
      excerpt: excerpt.trim(),
      content: content.trim(),
      image: image.trim(),
      author: author.trim(),
      publish_date: new Date(publishDate).toISOString(),
      read_time: readTime.trim(),
      category,
      tags: tagsArray,
      featured,
      published,
    });

    if (dbError) {
      setError(dbError.message);
      setSaving(false);
    } else {
      router.push("/admin/blogs");
    }
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <Link
        href="/admin/blogs"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 mb-6 transition"
      >
        <HiArrowLeft className="w-4 h-4" />
        Back to Blog Posts
      </Link>

      <h1 className="text-2xl font-bold text-gray-900 mb-8">New Blog Post</h1>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Meta fields */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
          <h2 className="text-base font-semibold text-gray-900">Post Details</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              required
              placeholder="e.g. How Solar Saves You Money in Tripura"
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Slug <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"))}
                required
                placeholder="how-solar-saves-money-tripura"
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
              >
                {BLOG_CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Author</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Publish Date</label>
              <input
                type="date"
                value={publishDate}
                onChange={(e) => setPublishDate(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Read Time</label>
              <input
                type="text"
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                placeholder="5 min read"
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <ImageUpload
              label="Featured Image"
              value={image}
              onChange={setImage}
              folder="blogs"
              accent="orange"
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Tags (comma separated)</label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Solar, Tripura, Savings"
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Excerpt</label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={2}
              placeholder="Brief summary shown in blog cards and SEO…"
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
            />
          </div>

          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-3">
              <input
                id="featured"
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
              />
              <label htmlFor="featured" className="text-sm font-medium text-gray-700 cursor-pointer">
                Featured post (shown on homepage)
              </label>
            </div>
            <div className="flex items-center gap-3">
              <input
                id="published"
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <label htmlFor="published" className="text-sm font-medium text-gray-700 cursor-pointer">
                Published (visible to public)
              </label>
            </div>
          </div>
        </div>

        {/* HTML Content Editor */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-gray-50">
            <div className="flex items-center gap-2">
              <HiCode className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-semibold text-gray-700">Content (HTML)</span>
            </div>
            <button
              type="button"
              onClick={() => setPreviewMode(!previewMode)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                previewMode
                  ? "bg-orange-100 text-orange-700"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <HiEye className="w-3.5 h-3.5" />
              {previewMode ? "Editing Preview" : "Preview"}
            </button>
          </div>

          {/* Snippet toolbar */}
          <div className="flex flex-wrap gap-1.5 px-5 py-2.5 border-b border-gray-100 bg-gray-50/50">
            <span className="text-xs text-gray-400 self-center mr-1">
              <HiLightBulb className="w-3.5 h-3.5 inline mr-0.5" />
              Insert:
            </span>
            {HTML_SNIPPETS.map((s) => (
              <button
                key={s.label}
                type="button"
                onClick={() => insertSnippet(s.code)}
                className="px-2.5 py-1 text-xs font-mono bg-white border border-gray-200 rounded text-gray-600 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-700 transition"
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Editor / Preview pane */}
          {previewMode ? (
            <div
              className="min-h-[500px] p-6 prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: content || "<p class='text-gray-400'>Nothing to preview yet…</p>" }}
            />
          ) : (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={22}
              placeholder={`<div class="prose prose-lg max-w-none">\n  <h2 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">Introduction</h2>\n  <p class="text-gray-700 leading-relaxed mb-6">Your content here…</p>\n</div>`}
              className="w-full px-5 py-4 text-sm font-mono text-gray-800 border-0 focus:outline-none focus:ring-0 resize-none leading-relaxed bg-white"
            />
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <Link
            href="/admin/blogs"
            className="px-5 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 text-sm font-semibold text-white bg-orange-500 rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-sm"
          >
            {saving ? "Publishing…" : published ? "Publish Post" : "Save Draft"}
          </button>
        </div>
      </form>
    </div>
  );
}

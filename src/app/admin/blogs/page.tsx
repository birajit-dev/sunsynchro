"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "../../../lib/supabase/client";
import type { BlogPost } from "../../../lib/types";
import { HiPlus, HiPencil, HiTrash, HiStar, HiSearch, HiEye, HiEyeOff } from "react-icons/hi";

export default function AdminBlogsPage() {
  const supabase = createClient();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("blog_posts")
      .select("id, title, slug, category, featured, published, publish_date, author, read_time")
      .order("publish_date", { ascending: false });
    if (!error && data) setPosts(data as BlogPost[]);
    setLoading(false);
  };

  useEffect(() => { fetchPosts(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this blog post? This cannot be undone.")) return;
    setDeleting(id);
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) {
      showToast("error", "Failed to delete post.");
    } else {
      showToast("success", "Post deleted.");
      setPosts((prev) => prev.filter((p) => p.id !== id));
    }
    setDeleting(null);
  };

  const togglePublished = async (post: BlogPost) => {
    const newVal = !post.published;
    const { error } = await supabase
      .from("blog_posts")
      .update({ published: newVal })
      .eq("id", post.id);
    if (!error) {
      setPosts((prev) =>
        prev.map((p) => (p.id === post.id ? { ...p, published: newVal } : p))
      );
      showToast("success", newVal ? "Post published." : "Post unpublished.");
    }
  };

  const filtered = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      p.author.toLowerCase().includes(search.toLowerCase())
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
          <h1 className="text-2xl font-bold text-gray-900">Blog Posts</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            {posts.filter((p) => p.published).length} published · {posts.filter((p) => !p.published).length} drafts
          </p>
        </div>
        <Link
          href="/admin/blogs/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-500 text-white text-sm font-semibold rounded-lg hover:bg-orange-600 transition shadow-sm"
        >
          <HiPlus className="w-5 h-5" />
          New Post
        </Link>
      </div>

      <div className="relative mb-5">
        <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search by title, category, or author…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-gray-400">Loading…</div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center text-gray-400">
            {search ? "No posts match your search." : "No blog posts yet."}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-left">
                  <th className="px-5 py-3.5 font-semibold text-gray-600">Title</th>
                  <th className="px-5 py-3.5 font-semibold text-gray-600 hidden sm:table-cell">Category</th>
                  <th className="px-5 py-3.5 font-semibold text-gray-600 hidden md:table-cell">Date</th>
                  <th className="px-5 py-3.5 font-semibold text-gray-600 text-center">Status</th>
                  <th className="px-5 py-3.5 font-semibold text-gray-600 text-center">Featured</th>
                  <th className="px-5 py-3.5 font-semibold text-gray-600 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4 max-w-xs">
                      <div className="font-medium text-gray-900 line-clamp-2">{post.title}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{post.slug}</div>
                    </td>
                    <td className="px-5 py-4 hidden sm:table-cell">
                      <span className="px-2.5 py-1 bg-orange-50 text-orange-700 text-xs font-medium rounded-full">
                        {post.category}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-gray-500 text-xs hidden md:table-cell">
                      {post.publish_date
                        ? new Date(post.publish_date).toLocaleDateString("en-IN", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        : "—"}
                    </td>
                    <td className="px-5 py-4 text-center">
                      <button
                        onClick={() => togglePublished(post)}
                        title={post.published ? "Click to unpublish" : "Click to publish"}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition ${
                          post.published
                            ? "bg-green-100 text-green-700 hover:bg-green-200"
                            : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                        }`}
                      >
                        {post.published ? (
                          <><HiEye className="w-3 h-3" /> Live</>
                        ) : (
                          <><HiEyeOff className="w-3 h-3" /> Draft</>
                        )}
                      </button>
                    </td>
                    <td className="px-5 py-4 text-center">
                      {post.featured ? (
                        <HiStar className="w-5 h-5 text-yellow-400 mx-auto" />
                      ) : (
                        <span className="text-gray-300">—</span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/blogs/${post.slug}`}
                          target="_blank"
                          className="p-1.5 rounded-lg text-gray-500 hover:bg-green-50 hover:text-green-600 transition"
                          title="Preview post"
                        >
                          <HiEye className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/admin/blogs/${post.id}`}
                          className="p-1.5 rounded-lg text-gray-500 hover:bg-orange-50 hover:text-orange-600 transition"
                        >
                          <HiPencil className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(post.id)}
                          disabled={deleting === post.id}
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

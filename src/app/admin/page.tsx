"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "../../lib/supabase/client";
import {
  HiCube,
  HiOfficeBuilding,
  HiNewspaper,
  HiRefresh,
  HiStar,
  HiCheckCircle,
  HiEye,
  HiInbox,
} from "react-icons/hi";

interface Stats {
  products: number
  brands: number
  blogs: number
  leads: number
  featuredProducts: number
  featuredBrands: number
  publishedBlogs: number
  newLeads: number
}

const StatCard = ({
  label,
  value,
  sub,
  subValue,
  icon: Icon,
  href,
  color,
}: {
  label: string
  value: number | string
  sub: string
  subValue: number | string
  icon: React.ElementType
  href: string
  color: string
}) => (
  <Link href={href} className="group">
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${color}`}>
          <Icon className="w-6 h-6" />
        </div>
        <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          Manage →
        </span>
      </div>
      <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-sm font-medium text-gray-600">{label}</div>
      <div className="text-xs text-gray-400 mt-1">
        <span className="text-gray-600 font-medium">{subValue}</span> {sub}
      </div>
    </div>
  </Link>
)

export default function AdminDashboard() {
  const supabase = createClient();
  const [stats, setStats] = useState<Stats>({
    products: 0, brands: 0, blogs: 0, leads: 0,
    featuredProducts: 0, featuredBrands: 0, publishedBlogs: 0, newLeads: 0,
  });
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchStats = async () => {
    setLoading(true);
    const [
      { count: products },
      { count: brands },
      { count: blogs },
      { count: leads },
      { count: featuredProducts },
      { count: featuredBrands },
      { count: publishedBlogs },
      { count: newLeads },
    ] = await Promise.all([
      supabase.from("products").select("*", { count: "exact", head: true }),
      supabase.from("brands").select("*", { count: "exact", head: true }),
      supabase.from("blog_posts").select("*", { count: "exact", head: true }),
      supabase.from("leads").select("*", { count: "exact", head: true }),
      supabase.from("products").select("*", { count: "exact", head: true }).eq("featured", true),
      supabase.from("brands").select("*", { count: "exact", head: true }).eq("featured", true),
      supabase.from("blog_posts").select("*", { count: "exact", head: true }).eq("published", true),
      supabase.from("leads").select("*", { count: "exact", head: true }).eq("status", "new"),
    ]);

    setStats({
      products: products ?? 0,
      brands: brands ?? 0,
      blogs: blogs ?? 0,
      leads: leads ?? 0,
      featuredProducts: featuredProducts ?? 0,
      featuredBrands: featuredBrands ?? 0,
      publishedBlogs: publishedBlogs ?? 0,
      newLeads: newLeads ?? 0,
    });
    setLastUpdated(new Date());
    setLoading(false);
  };

  useEffect(() => { fetchStats(); }, []);

  const quickActions = [
    { label: "View Leads", href: "/admin/leads", icon: HiInbox, color: "bg-sky-500" },
    { label: "Add Product", href: "/admin/products/new", icon: HiCube, color: "bg-blue-500" },
    { label: "Add Brand", href: "/admin/brands/new", icon: HiOfficeBuilding, color: "bg-purple-500" },
    { label: "Write Blog Post", href: "/admin/blogs/new", icon: HiNewspaper, color: "bg-orange-500" },
  ];

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            {lastUpdated ? `Last updated ${lastUpdated.toLocaleTimeString()}` : "Loading…"}
          </p>
        </div>
        <button
          onClick={fetchStats}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition"
        >
          <HiRefresh className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard
          label="Leads"
          value={stats.leads}
          sub="new"
          subValue={stats.newLeads}
          icon={HiInbox}
          href="/admin/leads"
          color="bg-sky-50 text-sky-600"
        />
        <StatCard
          label="Products"
          value={stats.products}
          sub="featured"
          subValue={stats.featuredProducts}
          icon={HiCube}
          href="/admin/products"
          color="bg-blue-50 text-blue-600"
        />
        <StatCard
          label="Brands"
          value={stats.brands}
          sub="featured"
          subValue={stats.featuredBrands}
          icon={HiOfficeBuilding}
          href="/admin/brands"
          color="bg-purple-50 text-purple-600"
        />
        <StatCard
          label="Blog Posts"
          value={stats.blogs}
          sub="published"
          subValue={stats.publishedBlogs}
          icon={HiNewspaper}
          href="/admin/blogs"
          color="bg-orange-50 text-orange-600"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-8">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.href}
                href={action.href}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
                style={{ background: action.color.replace("bg-", "").includes("-") ? undefined : action.color }}
              >
                <span className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white ${action.color} hover:opacity-90 transition`}>
                  <Icon className="w-4 h-4" />
                  {action.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-50 rounded-xl border border-green-100 p-5">
          <div className="flex items-center gap-2 text-green-700 font-semibold text-sm mb-2">
            <HiCheckCircle className="w-5 h-5" />
            CMS Connected
          </div>
          <p className="text-green-600 text-xs leading-relaxed">
            All content is managed through Supabase. Changes made here are reflected on the website immediately.
          </p>
        </div>
        <div className="bg-yellow-50 rounded-xl border border-yellow-100 p-5">
          <div className="flex items-center gap-2 text-yellow-700 font-semibold text-sm mb-2">
            <HiStar className="w-5 h-5" />
            Featured Content
          </div>
          <p className="text-yellow-600 text-xs leading-relaxed">
            Mark products, brands, and blog posts as "featured" to highlight them on the homepage.
          </p>
        </div>
        <div className="bg-blue-50 rounded-xl border border-blue-100 p-5">
          <div className="flex items-center gap-2 text-blue-700 font-semibold text-sm mb-2">
            <HiEye className="w-5 h-5" />
            Publishing
          </div>
          <p className="text-blue-600 text-xs leading-relaxed">
            Blog posts can be drafted (unpublished) before going live. Products and brands are always visible.
          </p>
        </div>
      </div>
    </div>
  );
}

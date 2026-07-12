"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "../../../lib/supabase/client";

type BrandOption = { id: string; name: string };

type Props = {
  value: string
  onChange: (name: string) => void
  required?: boolean
  /** Keep a brand value that exists on the product but was deleted from brands */
  includeOrphan?: string
}

export default function BrandSelect({ value, onChange, required, includeOrphan }: Props) {
  const [brands, setBrands] = useState<BrandOption[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()
    supabase
      .from("brands")
      .select("id, name")
      .order("name", { ascending: true })
      .then(({ data }) => {
        if (data) setBrands(data)
        setLoading(false)
      })
  }, [])

  const names = brands.map((b) => b.name)
  const orphan =
    includeOrphan && value && !names.some((n) => n.toLowerCase() === value.toLowerCase())
      ? value
      : null

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        Brand {required && <span className="text-red-500">*</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        disabled={loading}
        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white disabled:bg-gray-50 capitalize"
      >
        <option value="">
          {loading ? "Loading brands…" : "Select a brand"}
        </option>
        {orphan && (
          <option value={orphan}>
            {orphan} (not in brands list)
          </option>
        )}
        {brands.map((b) => (
          <option key={b.id} value={b.name}>
            {b.name}
          </option>
        ))}
      </select>
      {!loading && brands.length === 0 && (
        <p className="mt-1.5 text-xs text-amber-600">
          No brands yet.{" "}
          <Link href="/admin/brands/new" className="underline font-medium">
            Add a brand first
          </Link>
        </p>
      )}
    </div>
  )
}

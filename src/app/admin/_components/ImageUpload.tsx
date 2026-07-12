"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { uploadCmsFile, type UploadFolder } from "../../../lib/supabase/storage";
import { HiPhotograph, HiUpload, HiX, HiDocument } from "react-icons/hi";

type Props = {
  label: string
  value: string
  onChange: (url: string) => void
  folder: UploadFolder
  /** Accept attribute for the file input */
  accept?: string
  hint?: string
  accent?: "green" | "purple" | "orange"
}

const accentRing = {
  green: "focus-within:ring-green-500 border-green-200 hover:border-green-400",
  purple: "focus-within:ring-purple-500 border-purple-200 hover:border-purple-400",
  orange: "focus-within:ring-orange-500 border-orange-200 hover:border-orange-400",
}

const accentBtn = {
  green: "bg-green-600 hover:bg-green-700",
  purple: "bg-purple-600 hover:bg-purple-700",
  orange: "bg-orange-500 hover:bg-orange-600",
}

function isImageUrl(url: string) {
  return /\.(jpe?g|png|webp|avif|gif|svg)(\?|$)/i.test(url) || url.includes("/storage/v1/object/public/")
}

function isPdfUrl(url: string) {
  return /\.pdf(\?|$)/i.test(url)
}

export default function ImageUpload({
  label,
  value,
  onChange,
  folder,
  accept = "image/jpeg,image/png,image/webp,image/avif,image/gif",
  hint = "JPG, PNG, WebP up to 10 MB. Stored in Supabase Storage.",
  accent = "green",
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")
  const [dragOver, setDragOver] = useState(false)

  const handleFile = async (file: File | null | undefined) => {
    if (!file) return
    setError("")
    setUploading(true)
    try {
      const { url } = await uploadCmsFile(file, folder)
      onChange(url)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed")
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ""
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>

      {value ? (
        <div className="relative rounded-xl border border-gray-200 bg-gray-50 overflow-hidden">
          {isImageUrl(value) ? (
            <div className="relative h-44 w-full bg-white">
              <Image
                src={value}
                alt="Preview"
                fill
                className="object-contain p-3"
                unoptimized={value.startsWith("http")}
              />
            </div>
          ) : isPdfUrl(value) ? (
            <div className="flex items-center gap-3 p-4">
              <div className="w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center">
                <HiDocument className="w-6 h-6 text-red-500" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium text-gray-900">PDF attached</div>
                <a
                  href={value}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-blue-600 hover:underline truncate block"
                >
                  {value}
                </a>
              </div>
            </div>
          ) : (
            <div className="p-4 text-xs text-gray-500 break-all">{value}</div>
          )}

          <div className="flex items-center gap-2 p-3 border-t border-gray-100 bg-white">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white rounded-lg disabled:opacity-50 ${accentBtn[accent]}`}
            >
              <HiUpload className="w-3.5 h-3.5" />
              {uploading ? "Uploading…" : "Replace"}
            </button>
            <button
              type="button"
              onClick={() => onChange("")}
              disabled={uploading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg disabled:opacity-50"
            >
              <HiX className="w-3.5 h-3.5" />
              Remove
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault()
            setDragOver(true)
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault()
            setDragOver(false)
            handleFile(e.dataTransfer.files?.[0])
          }}
          className={`w-full rounded-xl border-2 border-dashed p-8 text-center transition focus:outline-none focus-within:ring-2 ${
            dragOver ? accentRing[accent] : "border-gray-200 hover:border-gray-300"
          } ${uploading ? "opacity-60 cursor-wait" : "cursor-pointer"}`}
        >
          <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
            <HiPhotograph className="w-6 h-6 text-gray-400" />
          </div>
          <div className="text-sm font-medium text-gray-800 mb-1">
            {uploading ? "Uploading to Supabase…" : "Click or drag file to upload"}
          </div>
          <div className="text-xs text-gray-400">{hint}</div>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />

      {error && (
        <p className="mt-2 text-xs text-red-600">{error}</p>
      )}

      {/* Optional manual URL for legacy /public paths */}
      <details className="mt-2">
        <summary className="text-xs text-gray-400 cursor-pointer hover:text-gray-600">
          Or paste an existing URL / path
        </summary>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://… or /products/photo.webp"
          className="mt-2 w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-gray-300"
        />
      </details>
    </div>
  )
}

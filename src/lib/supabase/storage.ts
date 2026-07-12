import { createClient } from './client'

export const CMS_BUCKET = 'cms-media'

export type UploadFolder = 'products' | 'brands' | 'blogs' | 'datasheets'

function sanitizeFilename(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

/** Upload a file to Supabase Storage and return its public URL. */
export async function uploadCmsFile(
  file: File,
  folder: UploadFolder
): Promise<{ url: string; path: string }> {
  const supabase = createClient()
  const ext = file.name.includes('.') ? file.name.split('.').pop() : 'bin'
  const base = sanitizeFilename(file.name.replace(/\.[^.]+$/, '')) || 'file'
  const path = `${folder}/${Date.now()}-${base}.${ext}`

  const { error } = await supabase.storage.from(CMS_BUCKET).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
    contentType: file.type || undefined,
  })

  if (error) throw new Error(error.message)

  const { data } = supabase.storage.from(CMS_BUCKET).getPublicUrl(path)
  return { url: data.publicUrl, path }
}

/** Best-effort delete by public URL (ignores failures). */
export async function deleteCmsFileByUrl(publicUrl: string) {
  try {
    const marker = `/${CMS_BUCKET}/`
    const idx = publicUrl.indexOf(marker)
    if (idx === -1) return
    const path = publicUrl.slice(idx + marker.length)
    if (!path) return
    const supabase = createClient()
    await supabase.storage.from(CMS_BUCKET).remove([path])
  } catch {
    /* ignore */
  }
}

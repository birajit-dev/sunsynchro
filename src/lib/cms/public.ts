import type { BlogPost, Brand, Product } from '../types'
import { products as staticProducts } from '../../data/products'
import { brands as staticBrands } from '../../data/brands'
import { blogPosts as staticBlogs } from '../../data/blogs'

function mapStaticBlog(post: (typeof staticBlogs)[number]): BlogPost {
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    image: post.image,
    author: post.author,
    publish_date: post.publishDate,
    read_time: post.readTime,
    category: post.category,
    tags: post.tags,
    featured: !!post.featured,
    published: true,
  }
}

function mapStaticProduct(p: (typeof staticProducts)[number]): Product {
  return {
    ...p,
    featured: !!p.featured,
  }
}

function mapStaticBrand(b: (typeof staticBrands)[number]): Brand {
  return {
    ...b,
    featured: true,
  }
}

/**
 * Same-origin CMS APIs (Node + DNS-bypass). Works on localhost and Netlify
 * without the browser talking to *.supabase.co (QUIC / network issues).
 */
async function cmsGet<T>(path: string): Promise<{ data: T | null; ok: boolean }> {
  try {
    const base =
      typeof window !== 'undefined'
        ? ''
        : process.env.NEXT_PUBLIC_SITE_URL ||
          process.env.URL ||
          'http://localhost:8880'
    const res = await fetch(`${base}${path}`, {
      cache: 'no-store',
      headers: { Accept: 'application/json' },
    })
    if (!res.ok) return { data: null, ok: false }
    const json = (await res.json()) as { data?: T }
    return { data: (json.data as T) ?? null, ok: true }
  } catch (err) {
    console.warn('[cms] request failed:', path, err)
    return { data: null, ok: false }
  }
}

/**
 * Load public CMS data from /api/cms/*.
 * Static src/data/* is only used when the API is unavailable (not when DB is empty).
 */
export async function fetchPublicProducts(): Promise<Product[]> {
  const { data, ok } = await cmsGet<Product[]>('/api/cms/products')
  if (ok) return data ?? []
  console.warn('[cms] products API unavailable — using static products')
  return staticProducts.map(mapStaticProduct)
}

export async function fetchPublicBrands(): Promise<Brand[]> {
  const { data, ok } = await cmsGet<Brand[]>('/api/cms/brands')
  if (ok) return data ?? []
  console.warn('[cms] brands API unavailable — using static brands')
  return staticBrands.map(mapStaticBrand)
}

export async function fetchPublishedBlogs(): Promise<BlogPost[]> {
  const { data, ok } = await cmsGet<BlogPost[]>('/api/cms/blogs')
  if (ok) return data ?? []
  console.warn('[cms] blogs API unavailable — using static blogs')
  return staticBlogs.map(mapStaticBlog)
}

export async function fetchFeaturedBlogs(limit = 3): Promise<BlogPost[]> {
  const all = await fetchPublishedBlogs()
  return all.filter((p) => p.featured).slice(0, limit)
}

export async function fetchBlogBySlug(slug: string): Promise<BlogPost | null> {
  const { data, ok } = await cmsGet<BlogPost | null>(
    `/api/cms/blogs/${encodeURIComponent(slug)}`
  )
  if (ok) return data
  const found = staticBlogs.find((p) => p.slug === slug)
  return found ? mapStaticBlog(found) : null
}

export async function fetchRelatedBlogs(slug: string, limit = 2): Promise<BlogPost[]> {
  const all = await fetchPublishedBlogs()
  return all.filter((p) => p.slug !== slug).slice(0, limit)
}

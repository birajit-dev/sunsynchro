import { tryCreateClient } from '../supabase/client'
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
 * Load public CMS data from Supabase, with static fallback so the marketing
 * site still works if production env vars were not set at build time.
 */
export async function fetchPublicProducts(): Promise<Product[]> {
  const supabase = tryCreateClient()
  if (!supabase) {
    console.warn('[cms] Supabase env missing — using static products')
    return staticProducts.map(mapStaticProduct)
  }

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.warn('[cms] products fetch failed:', error.message)
    return staticProducts.map(mapStaticProduct)
  }
  if (!data?.length) return staticProducts.map(mapStaticProduct)
  return data as Product[]
}

export async function fetchPublicBrands(): Promise<Brand[]> {
  const supabase = tryCreateClient()
  if (!supabase) {
    console.warn('[cms] Supabase env missing — using static brands')
    return staticBrands.map(mapStaticBrand)
  }

  const { data, error } = await supabase
    .from('brands')
    .select('*')
    .order('name', { ascending: true })

  if (error) {
    console.warn('[cms] brands fetch failed:', error.message)
    return staticBrands.map(mapStaticBrand)
  }
  if (!data?.length) return staticBrands.map(mapStaticBrand)
  return data as Brand[]
}

export async function fetchPublishedBlogs(): Promise<BlogPost[]> {
  const supabase = tryCreateClient()
  if (!supabase) {
    console.warn('[cms] Supabase env missing — using static blogs')
    return staticBlogs.map(mapStaticBlog)
  }

  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('publish_date', { ascending: false })

  if (error) {
    console.warn('[cms] blogs fetch failed:', error.message)
    return staticBlogs.map(mapStaticBlog)
  }
  if (!data?.length) return staticBlogs.map(mapStaticBlog)
  return data as BlogPost[]
}

export async function fetchFeaturedBlogs(limit = 3): Promise<BlogPost[]> {
  const all = await fetchPublishedBlogs()
  return all.filter((p) => p.featured).slice(0, limit)
}

export async function fetchBlogBySlug(slug: string): Promise<BlogPost | null> {
  const supabase = tryCreateClient()
  if (!supabase) {
    const found = staticBlogs.find((p) => p.slug === slug)
    return found ? mapStaticBlog(found) : null
  }

  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle()

  if (error) {
    console.warn('[cms] blog by slug failed:', error.message)
    const found = staticBlogs.find((p) => p.slug === slug)
    return found ? mapStaticBlog(found) : null
  }
  if (data) return data as BlogPost

  const found = staticBlogs.find((p) => p.slug === slug)
  return found ? mapStaticBlog(found) : null
}

export async function fetchRelatedBlogs(slug: string, limit = 2): Promise<BlogPost[]> {
  const all = await fetchPublishedBlogs()
  return all.filter((p) => p.slug !== slug).slice(0, limit)
}

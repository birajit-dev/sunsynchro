// ─── Shared CMS types (match Supabase table columns) ────────────────────────

export interface Product {
  id: string
  name: string
  category: string
  brand: string
  image: string
  description: string
  specifications: Record<string, string>
  price?: string
  datasheet?: string
  featured: boolean
  created_at?: string
  updated_at?: string
}

export interface Brand {
  id: string
  name: string
  logo: string
  description: string
  website?: string
  category: string
  featured: boolean
  created_at?: string
  updated_at?: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  image: string
  author: string
  publish_date: string
  read_time: string
  category: string
  tags: string[]
  featured: boolean
  published: boolean
  created_at?: string
  updated_at?: string
}

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'closed' | 'spam'

export interface Lead {
  id: string
  name: string
  email: string
  phone: string
  service: string
  message: string
  source: string
  status: LeadStatus
  notes: string
  created_at: string
  updated_at?: string
}

export const LEAD_STATUSES: { value: LeadStatus; label: string; color: string }[] = [
  { value: 'new', label: 'New', color: 'bg-blue-100 text-blue-700' },
  { value: 'contacted', label: 'Contacted', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'qualified', label: 'Qualified', color: 'bg-green-100 text-green-700' },
  { value: 'closed', label: 'Closed', color: 'bg-gray-100 text-gray-600' },
  { value: 'spam', label: 'Spam', color: 'bg-red-100 text-red-700' },
]

export const PRODUCT_CATEGORIES = [
  'Solar Panels',
  'Solar Inverters',
  'Microinverters',
  'Energy Meters & Controls',
  'Storage Systems',
  'EV Charging Stations',
  'Solar Street Light Luminaires',
  'Remote Monitoring & Power Management Systems',
  'UPS / DG Backup & Power Controls',
  'Mounting Structures & Accessories',
]

export const BRAND_CATEGORIES = [
  'Solar Panels',
  'Inverters',
  'Energy Storage',
  'Mounting Systems',
]

export const BLOG_CATEGORIES = [
  'Residential',
  'Commercial',
  'Government Schemes',
  'Technology',
  'Maintenance',
  'Industry News',
  'General',
]

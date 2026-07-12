/**
 * Full CMS migration from this repo (no Supabase Dashboard needed).
 *
 * Requires ONE of these in .env / .env.local:
 *   SUPABASE_DB_PASSWORD=...     (Project Settings → Database → Database password)
 *   DATABASE_URL=postgresql://postgres:...@db.<ref>.supabase.co:5432/postgres
 *
 * Then:
 *   npx tsx scripts/migrate-data.ts
 */

import { createClient } from '@supabase/supabase-js'
import pg from 'pg'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { products } from '../src/data/products'
import { brands } from '../src/data/brands'
import { blogPosts } from '../src/data/blogs'

function loadEnv() {
  for (const f of ['.env.local', '.env']) {
    try {
      const raw = readFileSync(join(process.cwd(), f), 'utf8')
      for (const line of raw.split('\n')) {
        const t = line.trim()
        if (!t || t.startsWith('#') || !t.includes('=')) continue
        const i = t.indexOf('=')
        const k = t.slice(0, i).trim()
        const v = t.slice(i + 1).trim()
        if (!process.env[k]) process.env[k] = v
      }
    } catch {
      /* missing file ok */
    }
  }
}

loadEnv()

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const projectRef = url.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1] || ''
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const dbPassword = process.env.SUPABASE_DB_PASSWORD || process.env.POSTGRES_PASSWORD
const databaseUrl = process.env.DATABASE_URL || process.env.SUPABASE_DB_URL

function sqlStr(s: string | undefined | null) {
  if (s == null) return "''"
  return "'" + String(s).replace(/'/g, "''") + "'"
}

function sqlJson(obj: Record<string, string>) {
  return sqlStr(JSON.stringify(obj ?? {}))
}

function sqlArr(arr: string[]) {
  if (!arr?.length) return 'ARRAY[]::TEXT[]'
  return 'ARRAY[' + arr.map(sqlStr).join(', ') + ']'
}

function buildSeedSql() {
  const lines: string[] = [
    'TRUNCATE TABLE products, brands, blog_posts RESTART IDENTITY CASCADE;',
    '',
  ]

  for (const p of products) {
    lines.push(
      `INSERT INTO products (name, category, brand, image, description, specifications, price, datasheet, featured) VALUES (` +
        `${sqlStr(p.name)}, ${sqlStr(p.category)}, ${sqlStr(p.brand)}, ${sqlStr(p.image)}, ` +
        `${sqlStr(p.description)}, ${sqlJson(p.specifications)}::jsonb, ${sqlStr(p.price ?? '')}, ` +
        `${sqlStr(p.datasheet ?? '')}, ${p.featured ? 'true' : 'false'});`
    )
  }

  for (const b of brands) {
    lines.push(
      `INSERT INTO brands (name, logo, description, website, category, featured) VALUES (` +
        `${sqlStr(b.name)}, ${sqlStr(b.logo)}, ${sqlStr(b.description)}, ${sqlStr(b.website ?? '')}, ` +
        `${sqlStr(b.category)}, true);`
    )
  }

  for (const post of blogPosts) {
    lines.push(
      `INSERT INTO blog_posts (title, slug, excerpt, content, image, author, publish_date, read_time, category, tags, featured, published) VALUES (` +
        `${sqlStr(post.title)}, ${sqlStr(post.slug)}, ${sqlStr(post.excerpt)}, ${sqlStr(post.content)}, ` +
        `${sqlStr(post.image)}, ${sqlStr(post.author)}, ${sqlStr(post.publishDate)}::timestamptz, ` +
        `${sqlStr(post.readTime)}, ${sqlStr(post.category)}, ${sqlArr(post.tags)}, ` +
        `${post.featured ? 'true' : 'false'}, true);`
    )
  }

  return lines.join('\n')
}

async function migrateViaPostgres() {
  const connectionString =
    databaseUrl ||
    (dbPassword && projectRef
      ? `postgresql://postgres:${encodeURIComponent(dbPassword)}@db.${projectRef}.supabase.co:5432/postgres`
      : null)

  if (!connectionString) {
    throw new Error('NO_DB_CREDENTIALS')
  }

  const setupPath = join(process.cwd(), 'supabase/setup-and-migrate.sql')
  const storagePath = join(process.cwd(), 'supabase/storage.sql')
  const sql = readFileSync(setupPath, 'utf8')
  const storageSql = readFileSync(storagePath, 'utf8')

  const client = new pg.Client({
    connectionString,
    ssl: { rejectUnauthorized: false },
  })

  console.log(`Connecting to Postgres (project ${projectRef})…`)
  await client.connect()
  try {
    console.log('Running setup-and-migrate.sql (schema + seed)…')
    await client.query(sql)
    console.log('Running storage.sql (cms-media bucket)…')
    await client.query(storageSql)
    console.log(`✓ Migrated ${products.length} products, ${brands.length} brands, ${blogPosts.length} blogs`)
    console.log('✓ Storage bucket cms-media ready')
  } finally {
    await client.end()
  }
}

async function migrateViaApi() {
  const key = serviceKey || anonKey
  if (!url || !key) throw new Error('Missing Supabase URL or API key')

  const sb = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })

  console.log(`Using ${serviceKey ? 'service_role' : 'anon'} REST API…`)

  for (const table of ['products', 'brands', 'blog_posts'] as const) {
    const { error } = await sb.from(table).delete().neq('id', '00000000-0000-0000-0000-000000000000')
    if (error) console.warn(`Clear ${table}:`, error.message)
  }

  const { error: pe } = await sb.from('products').insert(
    products.map((p) => ({
      name: p.name,
      category: p.category,
      brand: p.brand,
      image: p.image,
      description: p.description,
      specifications: p.specifications,
      price: p.price ?? '',
      datasheet: p.datasheet ?? '',
      featured: !!p.featured,
    }))
  )
  if (pe) throw new Error('products: ' + pe.message)
  console.log(`✓ ${products.length} products`)

  const { error: be } = await sb.from('brands').insert(
    brands.map((b) => ({
      name: b.name,
      logo: b.logo,
      description: b.description,
      website: b.website ?? '',
      category: b.category,
      featured: true,
    }))
  )
  if (be) throw new Error('brands: ' + be.message)
  console.log(`✓ ${brands.length} brands`)

  const { error: ble } = await sb.from('blog_posts').insert(
    blogPosts.map((post) => ({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      image: post.image,
      author: post.author,
      publish_date: new Date(post.publishDate).toISOString(),
      read_time: post.readTime,
      category: post.category,
      tags: post.tags,
      featured: !!post.featured,
      published: true,
    }))
  )
  if (ble) throw new Error('blog_posts: ' + ble.message)
  console.log(`✓ ${blogPosts.length} blog posts`)
}

// Always refresh SQL artifacts from TS sources
const seedSql = buildSeedSql()
writeFileSync(
  join(process.cwd(), 'supabase/migrate-seed.sql'),
  `-- Auto-generated from src/data/*.ts\n-- Paste into SQL Editor only if CLI migration is unavailable\n\n${seedSql}\n`,
  'utf8'
)

if (process.argv.includes('--sql-only')) {
  console.log('Wrote supabase/migrate-seed.sql')
  process.exit(0)
}

async function main() {
  try {
    await migrateViaPostgres()
    console.log('\nDone — data is in Supabase.')
    return
  } catch (err) {
    const msg = (err as Error).message
    if (msg === 'NO_DB_CREDENTIALS') {
      console.error(`
Cannot connect to Postgres — add your DB password to .env:

  SUPABASE_DB_PASSWORD=your-database-password

Find it in: Supabase → Project Settings → Database → Database password
(You do NOT need the SQL Editor — just copy the password here and re-run.)
`)
      process.exit(1)
    }
    console.warn('Postgres path failed:', msg)
    console.warn('Falling back to REST API…')
  }

  try {
    await migrateViaApi()
    console.log('\nDone — data is in Supabase.')
  } catch (err) {
    console.error('\nMigration failed:', (err as Error).message)
    console.error(`
Tables may not exist yet. Add this to .env and re-run:

  SUPABASE_DB_PASSWORD=your-database-password

Then: npx tsx scripts/migrate-data.ts
`)
    process.exit(1)
  }
}

main()

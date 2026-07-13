import dns from 'node:dns'
import https from 'node:https'
import http from 'node:http'
import { URL } from 'node:url'

/**
 * Some networks (NIC / captive portals) poison system DNS for *.supabase.co.
 * Resolve via public DNS (1.1.1.1 / 8.8.8.8) and connect by IP with correct SNI.
 */
const resolver = new dns.Resolver()
resolver.setServers(['1.1.1.1', '8.8.8.8'])

const ipCache = new Map<string, { ip: string; expires: number }>()

function resolveIpv4(hostname: string): Promise<string> {
  const cached = ipCache.get(hostname)
  if (cached && cached.expires > Date.now()) return Promise.resolve(cached.ip)

  return new Promise((resolve, reject) => {
    resolver.resolve4(hostname, (err, addresses) => {
      if (err || !addresses?.[0]) {
        reject(err ?? new Error(`No A record for ${hostname}`))
        return
      }
      const ip = addresses[0]
      ipCache.set(hostname, { ip, expires: Date.now() + 60_000 })
      resolve(ip)
    })
  })
}

function needsDnsBypass(hostname: string) {
  return hostname.endsWith('.supabase.co')
}

/**
 * Drop-in fetch for Node/server runtimes. Bypasses poisoned DNS for Supabase hosts.
 * Falls back to global fetch on non-Supabase hosts or if custom DNS fails.
 */
export async function supabaseFetch(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> {
  const request =
    input instanceof Request ? input : new Request(input, init)
  const url = new URL(request.url)

  if (!needsDnsBypass(url.hostname)) {
    return fetch(request)
  }

  let ip: string
  try {
    ip = await resolveIpv4(url.hostname)
  } catch {
    return fetch(request)
  }

  const headers: Record<string, string> = {}
  request.headers.forEach((value, key) => {
    headers[key] = value
  })
  if (!headers.host && !headers.Host) {
    headers.Host = url.host
  }

  const bodyBuffer =
    request.method === 'GET' || request.method === 'HEAD'
      ? undefined
      : Buffer.from(await request.arrayBuffer())

  return new Promise<Response>((resolve, reject) => {
    const lib = url.protocol === 'http:' ? http : https
    const req = lib.request(
      {
        protocol: url.protocol,
        hostname: ip,
        port: url.port || (url.protocol === 'https:' ? 443 : 80),
        path: `${url.pathname}${url.search}`,
        method: request.method,
        headers,
        servername: url.hostname,
        timeout: 15_000,
      },
      (res) => {
        const chunks: Buffer[] = []
        res.on('data', (chunk) => chunks.push(chunk))
        res.on('end', () => {
          const body = Buffer.concat(chunks)
          const responseHeaders = new Headers()
          for (const [key, value] of Object.entries(res.headers)) {
            if (value === undefined) continue
            if (Array.isArray(value)) {
              value.forEach((v) => responseHeaders.append(key, v))
            } else {
              responseHeaders.set(key, value)
            }
          }
          resolve(
            new Response(body, {
              status: res.statusCode ?? 502,
              statusText: res.statusMessage,
              headers: responseHeaders,
            })
          )
        })
      }
    )

    req.on('error', reject)
    req.on('timeout', () => {
      req.destroy()
      reject(new Error('Supabase request timed out'))
    })

    if (bodyBuffer && bodyBuffer.length) req.write(bodyBuffer)
    req.end()
  })
}

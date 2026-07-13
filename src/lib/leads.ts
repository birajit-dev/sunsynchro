import { tryCreateClient } from './supabase/client'

export type LeadSource =
  | 'website_lead_modal'
  | 'website_contact_form'
  | 'product_enquiry'
  | string

export type LeadInput = {
  name: string
  email: string
  phone?: string
  service?: string
  message?: string
  source?: LeadSource
}

/** Persist a lead to Supabase. Throws on failure. */
export async function submitLead(input: LeadInput) {
  const supabase = tryCreateClient()
  if (!supabase) {
    throw new Error(
      'Lead form is not connected. Missing Supabase environment variables on the server.'
    )
  }

  const row = {
    name: input.name.trim(),
    email: input.email.trim(),
    phone: (input.phone ?? '').trim(),
    service: (input.service ?? '').trim() || 'Not specified',
    message: (input.message ?? '').trim(),
    source: input.source ?? 'website',
    status: 'new' as const,
  }

  if (!row.name || !row.email) {
    throw new Error('Name and email are required')
  }

  const { error } = await supabase.from('leads').insert(row)
  if (error) throw new Error(error.message)
  return { ok: true as const }
}

import 'server-only'

import { createClient } from 'next-sanity'

import { apiReadToken, apiVersion, dataset, projectId } from '../env'

// Server-only client. The dataset is private, so every read is
// authenticated with a Viewer token and never falls back to an
// unauthenticated/CDN path. Never import this from a Client Component.
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token: apiReadToken,
  useCdn: false,
  perspective: 'published',
})

export async function sanityFetch<QueryResponse>({
  query,
  params = {},
}: {
  query: string
  params?: Record<string, unknown>
}): Promise<QueryResponse> {
  return client.fetch<QueryResponse>(query, params)
}

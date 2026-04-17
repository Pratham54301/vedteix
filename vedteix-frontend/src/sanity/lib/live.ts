import { client } from "./client";

type SanityFetchParams = {
  query: string;
  params?: Record<string, unknown>;
};

export async function sanityFetch<TData>({ query, params }: SanityFetchParams) {
  return client.fetch<TData>(query, params);
}

export function SanityLive() {
  return null;
}

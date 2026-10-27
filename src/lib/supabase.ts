import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

let publicClient: SupabaseClient | null = null;
let serviceClient: SupabaseClient | null = null;

/** True once the Supabase project is connected. Until then the site shows built-in sample content. */
export const hasSupabase = Boolean(url && anonKey);

/** Read-only client for public pages. Row-level security limits it to published content. */
export function getPublicClient(): SupabaseClient | null {
  if (!url || !anonKey) return null;
  publicClient ??= createClient(url, anonKey, { auth: { persistSession: false } });
  return publicClient;
}

/** Server-only client that bypasses row-level security. Used to save inquiries. Never import in client code. */
export function getServiceClient(): SupabaseClient | null {
  if (typeof window !== "undefined") throw new Error("The service client must only be used on the server.");
  if (!url || !serviceKey) return null;
  serviceClient ??= createClient(url, serviceKey, { auth: { persistSession: false } });
  return serviceClient;
}

import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Crea un cliente único por proceso. (singleton)
// Se inicializa la primera vez que se llama a `getSupabase()`, por lo que no pasa nada si se llama varias veces.
let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_KEY");
  }

  if (!client) {
    client = createClient(url, key);
  }

  return client;
}

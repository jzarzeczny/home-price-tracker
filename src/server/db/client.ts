import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { Database } from "~/interfaces/supabase";

export const getSupabaseClient = (): SupabaseClient => {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  return createClient<Database>(url, key);
};

export const supabaseClient = getSupabaseClient();

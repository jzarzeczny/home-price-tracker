import { routeLoader$ } from '@builder.io/qwik-city';
import { createServerClient } from 'supabase-auth-helpers-qwik';
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { Database } from '~/interfaces/supabase';


//  const createSupabase = routeLoader$(async (requestEv) => {
//   const supabaseClient = createServerClient(
//     requestEv.env.get("PUBLIC_SUPABASE_URL")!,
//     requestEv.env.get("PUBLIC_SUPABASE_ANON_KEY")!,
//     requestEv
//   );

//   return supabaseClient

 
// });

//  export const supabase = createSupabase()

export const getSupabaseClient = ():SupabaseClient =>{
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  return createClient<Database>(url, key)
}

export const subabaseClient = getSupabaseClient()
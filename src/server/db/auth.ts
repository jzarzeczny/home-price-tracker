import { supabaseClient } from "./client";
import { OAuthResponse } from "@supabase/supabase-js";

export async function signInWithGoogle(): Promise<OAuthResponse> {
  const result = await supabaseClient.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "/dashboard",
    },
  });

  return result;
}
export async function signOut() {
  const { error } = await supabaseClient.auth.signOut();
}

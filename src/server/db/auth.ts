import { CookieOptions, RequestEventCommon, z } from "@builder.io/qwik-city";
import { supabaseClient } from "./client";
import { OAuthResponse, Session, User } from "@supabase/supabase-js";
import { getBaseUrl } from "~/utils/routeUtils";

const cookieName = "_session";

const options: CookieOptions = {
  httpOnly: true,
  maxAge: 610000,
  path: "/",
  sameSite: "lax",
};

export async function signInWithGoogle(): Promise<OAuthResponse> {
  const result = await supabaseClient.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${getBaseUrl()}/auth/callback`,
    },
  });

  return result;
}
export async function signOut() {
  const { error } = await supabaseClient.auth.signOut();
}

export const updateAuthCookies = (
  event: RequestEventCommon,
  session: Pick<Session, "refresh_token" | "expires_in" | "access_token">
) => {
  event.cookie.set(cookieName, session, options);
};

export const getUserFromEvent = (
  event: RequestEventCommon
): Promise<User | null> => {
  const cachedPromise = event.sharedMap.get("user");
  if (cachedPromise) {
    return cachedPromise.promise;
  }

  const promise = getUserByCookie(event);
  event.sharedMap.set("user", { promise });

  return promise;
};

const getUserByCookie = async (event: RequestEventCommon) => {
  const value = event.cookie.get(cookieName)?.json();

  const parsed = z
    .object({ access_token: z.string(), refresh_token: z.string() })
    .safeParse(value);

  if (!parsed.success) {
    return null;
  }

  const userResponse = await supabaseClient.auth.setSession(parsed.data);

  if (userResponse.data.user) {
    return userResponse.data.user;
  }

  const refreshResponse = await supabaseClient.auth.refreshSession({
    refresh_token: parsed.data.refresh_token,
  });

  if (!refreshResponse.data.session) {
    removeAuthCookies(event);
    return null;
  }

  const session = refreshResponse.data.session;
  updateAuthCookies(event, session);

  return session.user;
};

export const removeAuthCookies = (event: RequestEventCommon) => {
  event.cookie.delete(cookieName, options);
};

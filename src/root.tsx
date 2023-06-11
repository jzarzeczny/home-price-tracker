import {
  component$,
  useVisibleTask$,
  useStore,
  useContextProvider,
  createContextId,
} from "@builder.io/qwik";
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";

import "./global.css";
import { supabaseClient } from "./server/db/client";
import type { Session } from "supabase-auth-helpers-qwik";
import type { AuthChangeEvent } from "@supabase/supabase-js";

export const UserSessionContext = createContextId<UserSession>("user-session");

export type UserSession = {
  userId: string;
  isLoggedIn: boolean;
};

export default component$(() => {
  const UserSession: UserSession = useStore({
    userId: "",
    isLoggedIn: false,
  });
  useVisibleTask$(async () => {
    const { data: authListener } = await supabaseClient.auth.onAuthStateChange(
      async (event: AuthChangeEvent, session: Session | null) => {
        if (event === "SIGNED_IN") {
          UserSession.userId = session?.user.id || "";
          UserSession.isLoggedIn = true;
        }
        if (event === "SIGNED_OUT") {
          UserSession.userId = "session.user.id;";
          UserSession.isLoggedIn = false;
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  });

  useContextProvider(UserSessionContext, UserSession);

  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <RouterHead />
      </head>
      <body lang="en">
        <RouterOutlet />
        <ServiceWorkerRegister />
      </body>
    </QwikCityProvider>
  );
});

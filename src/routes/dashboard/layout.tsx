import {
  Slot,
  component$,
  useContext,
  useVisibleTask$,
} from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import { UserSessionContext } from "~/root";
import { supabaseClient } from "~/server/db/client";

export default component$(() => {
  const userSession = useContext(UserSessionContext);
  const nav = useNavigate();
  useVisibleTask$(async () => {
    const { data, error } = await supabaseClient.auth.getUser();
    if (error || !data) {
      userSession.userId = "session.user.id;";
      userSession.isLoggedIn = false;
      nav("/");
    }
    userSession.userId = data.user?.id || "";
    userSession.isLoggedIn = true;
  });
  return <Slot />;
});

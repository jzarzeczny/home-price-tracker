import { Slot, component$, useContext, useTask$ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import { UserSessionContext } from "~/root";
import { supabaseClient } from "~/server/db/client";

export default component$(() => {
  const userSession = useContext(UserSessionContext);
  const nav = useNavigate();
  console.log(userSession);

  useTask$(async () => {
    const { data, error } = await supabaseClient.auth.getUser();
    if (error || !data) {
      userSession.userId = "";
      userSession.isLoggedIn = false;
      nav("/");
      return;
    }
    userSession.userId = data.user?.id || "";
    userSession.isLoggedIn = true;
  });
  return <Slot />;
});

import { Slot, component$, useVisibleTask$ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import { supabaseClient } from "~/server/db/client";

export default component$(() => {
  const nav = useNavigate();
  useVisibleTask$(async () => {
    const { data, error } = await supabaseClient.auth.getUser();
    if (error || !data) {
      nav("/");
    }
  });
  return <Slot />;
});

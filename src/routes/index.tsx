import { component$ } from "@builder.io/qwik";
import { globalAction$, type DocumentHead } from "@builder.io/qwik-city";
import { signInWithGoogle } from "~/server/db/auth";

export const useSignInGoogleAction = globalAction$(async () => {
  await signInWithGoogle();
});

export default component$(() => {
  return (
    <>
      <h2>Landing page</h2>
    </>
  );
});

export const head: DocumentHead = {
  title: "House tracker",
  meta: [
    {
      name: "description",
      content: "House Price Tracker",
    },
  ],
};

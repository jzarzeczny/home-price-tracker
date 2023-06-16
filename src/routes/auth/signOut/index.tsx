import { component$ } from "@builder.io/qwik";
import type { RequestEvent } from "@builder.io/qwik-city";
import { removeAuthCookies, signOut } from "~/server/db/auth";

export const onGet = async (event: RequestEvent) => {
  removeAuthCookies(event);
  await signOut();

  throw event.redirect(302, "/");
};

export default component$(() => {
  return <span>Bye</span>;
});

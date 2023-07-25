import { $, component$ } from "@builder.io/qwik";
import {
  globalAction$,
  type DocumentHead,
  useNavigate,
} from "@builder.io/qwik-city";
import { signInWithGoogle } from "~/server/db/auth";
import { getBaseUrl } from "~/utils/routeUtils";
import styles from "./index.module.scss";

interface UserInterface {
  id: string | undefined;
}

export const useSignInGoogleAction = globalAction$(async () => {
  await signInWithGoogle();
});

export default component$(({ id }: UserInterface) => {
  const nav = useNavigate();
  const handleLogOut = $(async () => {
    nav(`${getBaseUrl()}/auth/signOut`);
  });
  const handleLogin = $(async () => {
    console.log(getBaseUrl());
    await signInWithGoogle();
  });
  return (
    <>
      <h2>Landing page</h2>
      {id !== undefined ? (
        <button class={styles.button} onClick$={handleLogOut}>
          Logout
        </button>
      ) : (
        <button class={styles.button} onClick$={handleLogin}>
          Login
        </button>
      )}
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

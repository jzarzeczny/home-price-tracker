import { $, component$ } from "@builder.io/qwik";
import { Link, globalAction$, useNavigate } from "@builder.io/qwik-city";
import styles from "./Header.module.scss";
import { signInWithGoogle } from "~/server/db/auth";
import { getBaseUrl } from "~/utils/routeUtils";

const navigation = [
  { text: "Home", href: "/" },
  { text: "App", href: "/app" },
];

export const useSignInGoogleAction = globalAction$(async () => {
  console.log(getBaseUrl());
  await signInWithGoogle();
});

interface UserInterface {
  id: string | undefined;
}

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
    <header class={styles.header}>
      <nav class={styles.navigation}>
        {navigation.map((nav) => (
          <li key={nav.text} class={styles.navItem}>
            <Link href={nav.href}>{nav.text}</Link>
          </li>
        ))}
      </nav>
      {id !== undefined ? (
        <button class={styles.button} onClick$={handleLogOut}>
          Logout
        </button>
      ) : (
        <button class={styles.button} onClick$={handleLogin}>
          Login
        </button>
      )}
    </header>
  );
});

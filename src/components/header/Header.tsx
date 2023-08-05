import { $, component$ } from "@builder.io/qwik";

import styles from "./Header.module.scss";
import { Link, globalAction$, useNavigate } from "@builder.io/qwik-city";
import { getBaseUrl } from "~/utils/routeUtils";
import { signInWithGoogle } from "~/server/db/auth";

interface HeaderInterface {
  user: any;
}

export const useSignInGoogleAction = globalAction$(async () => {
  await signInWithGoogle();
});

export default component$(({ user }: HeaderInterface) => {
  const nav = useNavigate();

  const handleLogOut = $(async () => {
    nav(`${getBaseUrl()}/auth/signOut`);
  });
  const handleLogin = $(async () => {
    await signInWithGoogle();
  });

  return (
    <header class={styles.header}>
      <div class={styles.contentWrapper}>
        <div class={styles.logo}>
          <Link href="/">Home tracker</Link>
          <p>Zapisuj ulubione oferty mieszkań!</p>
        </div>
        <div class={styles.desktopNav}>
          <nav>
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
            </ul>
          </nav>
          {user.value ? (
            <button class={styles.button} onClick$={handleLogOut}>
              Wyloguj
            </button>
          ) : (
            <button class={styles.button} onClick$={handleLogin}>
              Zaloguj się
            </button>
          )}
        </div>
      </div>
    </header>
  );
});

export const getBaseUrl = (): string => {
  if (import.meta.env.VERCEL_URL) {
    return `https://${import.meta.env.VERCEL_URL}`;
  }

  return `http://localhost:5173`;
};

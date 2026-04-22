export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

// Simple login URL — redirect to local login page
export const getLoginUrl = (returnPath?: string) => {
  const path = returnPath || window.location.pathname;
  return `/login?redirect=${encodeURIComponent(path)}`;
};

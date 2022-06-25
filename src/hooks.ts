import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  if (event.url.pathname === "/admin" || event.url.pathname === "/admin/") {
    return Response.redirect(new URL("/admin/index.html", event.url));
  }
  return resolve(event);
};

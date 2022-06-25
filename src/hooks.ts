import { base } from "$app/paths";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  if (
    event.url.pathname === `${base}/admin` ||
    event.url.pathname === `${base}/admin/`
  ) {
    return Response.redirect(new URL(`${base}/admin/index.html`, event.url));
  }
  return resolve(event);
};

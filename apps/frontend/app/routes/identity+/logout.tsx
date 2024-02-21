import { type LoaderFunctionArgs, redirect } from "@remix-run/node";

import storage from "~/server/storage/session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await storage.getSession(request, async (session) =>
    storage.destroySession(session)
  );

  return redirect("/", {
    headers: {
      "Set-Cookie": session,
    },
  });
};

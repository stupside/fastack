import type { LoaderFunctionArgs } from "@remix-run/node";

import { Outlet, json, useLoaderData } from "@remix-run/react";

import storage from "~/server/storage/session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // TODO: get user sub from backend
  const sub = {
    free: true,
    remaining: "5 days",
    updated: "2022-01-01",
  };

  const session = await storage.extractSession(request);

  return json({
    name: "Kilian Houpeurt",
    sub,
    session: JSON.stringify(session.state.data),
  });
};

const PageComponent = () => {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <header className="py-5 flex gap-x-5">
        {/** this is a title */}
        <img
          alt="profile"
          className="rounded w-28 h-28"
          src="https://via.placeholder.com/150"
        />
        <div>
          <h1 className="mr-4 inline-block text-2xl">{data.name}</h1>
          {data.sub.free ? (
            <span className="text-md font-bold px-2 py-[0.5px] rounded-full bg-orange-400 text-white">
              freemium
            </span>
          ) : (
            <span className="text-md font-bold px-2 py-[0.5px] rounded-full bg-emerald-400 text-white">
              premium
            </span>
          )}
        </div>
      </header>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default PageComponent;

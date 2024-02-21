import { type FC } from "react";

import { useLoaderData } from "@remix-run/react";

import { json, type LoaderFunctionArgs } from "@remix-run/node";

export const meta = () => {
  return {
    title: "Manage Event",
    description: "Manage Event",
  };
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  if (params.id === undefined) throw new Error();

  // TODO: get event by id

  return json({ id: +params.id });
};

const PageComponent: FC = () => {
  const { id } = useLoaderData<typeof loader>();

  return (
    <div>
      <h1>Manage Event {id}</h1>
      <p>Event ID: {id}</p>
    </div>
  );
};

export default PageComponent;

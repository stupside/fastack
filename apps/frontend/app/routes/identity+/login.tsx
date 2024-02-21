import type { FC } from "react";

import { Form, Link, redirect } from "@remix-run/react";

import type { ActionFunctionArgs } from "@remix-run/node";

import { Type } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";

import storage from "~/server/storage/session.server";

export const meta = () => {
  return {
    title: "Login",
    description: "Login",
  };
};

const ActionBody = Type.Object({
  email: Type.String({
    format: "email",
  }),
  password: Type.String({
    minLength: 8,
  }),
});

export const action = async ({ request }: ActionFunctionArgs) => {
  const form = await request.formData();

  const body = Value.Decode(ActionBody, form.entries());

  console.log("register", body);

  const session = await storage.getSession(request, async (session) => {
    // TODO: Implement login logic here

    session.set("context", {
      token: "123",
    });

    return storage.commitSession(session);
  });

  return redirect("/dashboard", {
    headers: {
      "Set-Cookie": session,
    },
  });
};

const PageComponent: FC = () => {
  return (
    <section className="m-auto">
      <Form method="POST">
        <div className="flex gap-y-3">
          <input type="text" title="email" placeholder="Email" />
          <input type="password" title="password" placeholder="Password" />
        </div>
        <div>
          <button>Login</button>
        </div>
      </Form>
      <Link
        to={{
          pathname: "/identity/register",
        }}
      >
        Register
      </Link>
    </section>
  );
};

export default PageComponent;

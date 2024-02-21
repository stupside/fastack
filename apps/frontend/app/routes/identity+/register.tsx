import type { FC } from "react";

import { Form, Link, redirect } from "@remix-run/react";

import type { ActionFunctionArgs } from "@remix-run/node";

import { Type } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";

export const meta = () => {
  return {
    title: "Register",
    description: "Register",
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

  // TODO: Implement register logic here

  return redirect("/identity/register");
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
          <button>Register</button>
        </div>
      </Form>
      <Link
        to={{
          pathname: "/identity/login",
        }}
      >
        Login
      </Link>
    </section>
  );
};

export default PageComponent;

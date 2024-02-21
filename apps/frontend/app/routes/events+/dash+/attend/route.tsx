import { type FC } from "react";

import { Form, useActionData, useNavigate } from "@remix-run/react";

import {
  json,
  type ActionFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";

import { Type } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";

import { Dialog } from "@fastack/ui-layout";

import storage from "~/server/storage/session.server";

import Input from "~/client/components/commons/forms/Input";
import Submit from "~/client/components/commons/forms/Submit";

export const meta: MetaFunction = () => {
  return [
    {
      title: "Attend Event",
    },
  ];
};

const ActionBody = Type.Object({
  code: Type.String({
    minLength: 4,
    maxLength: 8,
  }),
});

export const action = async ({ request }: ActionFunctionArgs) => {
  const session = await storage.extractSession(request);

  void session; // TODO: attend event

  const form = await request.formData();

  const body = Value.Decode(ActionBody, form.entries());

  void body; // TODO: attend event

  return json({ id: 0 });
};

const PageComponent: FC = () => {
  const navigate = useNavigate();

  const data = useActionData<typeof action>();

  const open = data === undefined;

  return (
    <Dialog
      title={<h1>Attend an event</h1>}
      open={open}
      close={() => {
        navigate("../", {
          replace: true,
          relative: "route",
        });
      }}
    >
      <Form method="POST" className="flex gap-x-4">
        <Input type="text" name="code" title="code" placeholder="Code" />
        <Submit>Attend</Submit>
      </Form>
    </Dialog>
  );
};

export default PageComponent;

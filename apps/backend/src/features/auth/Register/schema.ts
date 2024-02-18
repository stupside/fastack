import { Static, Type } from "@sinclair/typebox";

import { FastifySchema, RouteGenericInterface } from "fastify";

const Body = Type.Object({
  name: Type.String({ description: "The name of the user." }),
  email: Type.String({ description: "The email of the user." }),
  password: Type.String({ description: "The password of the user." }),
});

const Reply = Type.Object({
  id: Type.Integer({ description: "The id of the user." }),
});

export interface Interface extends RouteGenericInterface {
  Body: Static<typeof Body>;
  Reply: Static<typeof Reply>;
}

export const Schema: FastifySchema = {
  tags: ["auth"],
  description: "Register a new user.",
  body: Body,
  response: {
    200: Reply,
  },
};

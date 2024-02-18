import { Static, Type } from "@sinclair/typebox";

import { FastifySchema, RouteGenericInterface } from "fastify";

const Body = Type.Object({
  email: Type.String({ description: "The email of the user." }),
  password: Type.String({ description: "The password of the user." }),
  device: Type.Partial(
    Type.Object({
      ip: Type.String({ description: "The ip of the device." }),
      userAgent: Type.String({ description: "The user agent of the device." }),
    }),
  ),
});

const Reply = Type.Object({
  token: Type.String({ description: "The token for the session." }),
  session: Type.Integer({ description: "The id of the session." }),
});

export interface Interface extends RouteGenericInterface {
  Body: Static<typeof Body>;
  Reply: Static<typeof Reply>;
}

export const Schema: FastifySchema = {
  tags: ["auth"],
  description: "Create a session.",
  body: Body,
  response: {
    200: Reply,
  },
};

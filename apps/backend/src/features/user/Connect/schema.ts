import { FastifySchema, RouteGenericInterface } from 'fastify'

import { Static, Type } from '@sinclair/typebox'

const Body = Type.Object(
  {
    firstname: Type.String({
      description: "The user's firstname",
    }),
    lastname: Type.String({
      description: "The user's lastname",
    }),
    password: Type.String({
      description: "The user's password",
    }),
  },
  {
    readOnly: true,
  },
)

const Reply = Type.Object(
  {
    id: Type.Number({ description: "The user's id" }),
    token: Type.String({ description: "The user's token" }),
  },
  {
    readOnly: true,
  },
)

export interface Interface extends RouteGenericInterface {
  Body: Static<typeof Body>
  Reply: Static<typeof Reply>
}

export const Schema: FastifySchema = {
  tags: ['user'],
  description: 'Connect User',
  body: Body,
  response: {
    200: Reply,
  },
}
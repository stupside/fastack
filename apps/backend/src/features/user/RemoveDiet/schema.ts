import { FastifySchema, RouteGenericInterface } from 'fastify'
import { Static, Type } from '@sinclair/typebox'

const Reply = Type.Object(
  {
    id: Type.Number({ description: "The event's id" }),
  },
  {
    readOnly: true,
  },
)

const Params = Type.Object(
  {
    dietId: Type.String({
      description: "diet's id to remove",
      minLength: 1,
    }),
  },
  {
    readOnly: true,
  },
)

export interface Interface extends RouteGenericInterface {
  Reply: Static<typeof Reply>
  Params: Static<typeof Params>
}

export const Schema: FastifySchema = {
  tags: ['diet'],
  description: 'Remove a diet',
  security: [{ bearerAuth: [] }],
  response: {
    200: Reply,
  },
}

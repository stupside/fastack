import { FastifySchema, RouteGenericInterface } from 'fastify'

import { Static, Type } from '@sinclair/typebox'

const Body = Type.Object(
  {
    menuId: Type.Integer({
      description:
        "Menu's id that the user want to take, -1 if isn't selected for moment",
      minimum: -1,
    }),
    eventId: Type.Integer({
      description: "Event's id that the user want to participate",
      minimum: 0,
    }),
  },
  {
    readOnly: true,
  },
)

const Reply = Type.Object(
  {
    eventId: Type.Integer({
      description: "The event's id",
      minimum: 0,
    }),
    menuId: Type.Union([Type.Integer(), Type.Null()], {
      description: "Menu's id selected, -1 if the menu isn't selected",
      minimum: 1,
    }),
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
  tags: ['participant'],
  description: 'Make an user participate to an event and menu',
  body: Body,
  security: [{ bearerAuth: [] }],
  response: {
    200: Reply,
  },
}

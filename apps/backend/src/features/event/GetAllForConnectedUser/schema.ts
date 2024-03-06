import { FastifySchema, RouteGenericInterface } from 'fastify'

import { Static, Type } from '@sinclair/typebox'

const Event = Type.Object({
  id: Type.Number({
    description: 'id of event',
    minimum: 0,
  }),
  name: Type.String({
    description: 'name of event',
    minLength: 3,
    maxLength: 20,
  }),
  nbParticipantMax: Type.Number({
    minimum: 1,
    maximum: 30,
  }),
  // startDate: Type.String(), // Adjust the type if needed
  // endDate: Type.String(), // Adjust the type if needed
  author: Type.Number({
    description: 'id of the author',
    minimum: 0,
  }),
})

const Reply = Type.Object(
  {
    events: Type.Array(Event, {
      description: 'array evenement where connected user participate in it',
    }),
  },
  {
    readOnly: true,
  },
)

export interface Interface extends RouteGenericInterface {
  Reply: Static<typeof Reply>
}

export const Schema: FastifySchema = {
  tags: ['event'],
  description: 'get all events of the connected user',
  security: [{ bearerAuth: [] }],
  response: {
    200: Reply,
  },
}

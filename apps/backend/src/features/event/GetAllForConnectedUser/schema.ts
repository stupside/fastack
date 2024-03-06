import { FastifySchema, RouteGenericInterface } from 'fastify'

import { Static, Type } from '@sinclair/typebox'

const Event = Type.Object({
  id: Type.Number(),
  name: Type.String(),
  nbParticipantMax: Type.Number(),
  // startDate: Type.String(), // Adjust the type if needed
  // endDate: Type.String(), // Adjust the type if needed
  userId: Type.Number(),
})

const Reply = Type.Object(
  {
    events: Type.Array(Event, {
      description: "tableau d'evenement dont le connected User est participant",
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
  description: 'Create an event',
  security: [{ bearerAuth: [] }],
  response: {
    200: Reply,
  },
}

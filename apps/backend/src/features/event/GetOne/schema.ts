import { FastifySchema, RouteGenericInterface } from 'fastify'

import { Static, Type } from '@sinclair/typebox'

// const Participant = Type.Object({
//   userId: Type.Number({
//     description: 'id of user',
//     minimum: 0,
//   }),
//   eventId: Type.Number({
//     description: 'id of event',
//     minimum: 0,
//   }),
//   menuId: Type.Number({
//     description: "menu's id",
//     minimum: 0,
//   }),
// })

const Reply = Type.Object(
  {
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
    userId: Type.Number({
      description: 'id of the author',
      minimum: 0,
    }),
    // participants: Type.Array(Participant, {
    //   description: "Participant's array of the event",
    // }),
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
  description: 'get one event',
  security: [{ bearerAuth: [] }],
  response: {
    200: Reply,
  },
}

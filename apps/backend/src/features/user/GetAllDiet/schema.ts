import { FastifySchema, RouteGenericInterface } from 'fastify'
import { Static, Type } from '@sinclair/typebox'

const DietType = Type.Object({
  id: Type.Integer({
    description: "id's of the diet",
    minimum: 1,
  }),
  name: Type.String({
    description: "name's of diet",
    minLength: 3,
    maxLength: 30,
  }),
})

const Reply = Type.Object(
  {
    diets: Type.Array(DietType, {
      description: 'Array of the diets of user',
      minItems: 0,
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
  tags: ['diet'],
  description: 'Get all diet of user',
  security: [{ bearerAuth: [] }],
  response: {
    200: Reply,
  },
}

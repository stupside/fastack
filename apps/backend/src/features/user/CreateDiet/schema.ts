import { FastifySchema, RouteGenericInterface } from 'fastify'
import { Static, Type } from '@sinclair/typebox'

export const DietType = Type.Object({
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

const Body = Type.Object(
  {
    diets: Type.Array(DietType, {
      description: "array's diet of the user",
      minItems: 1,
    }),
  },
  {
    readOnly: true,
  },
)

const Reply = Type.Object(
  {
    countOfDiet: Type.Integer({
      description: 'number of diet put in database',
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
  tags: ['diet'],
  description: 'Create a diet',
  body: Body,
  security: [{ bearerAuth: [] }],
  response: {
    200: Reply,
  },
}

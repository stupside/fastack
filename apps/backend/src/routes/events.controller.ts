import { FastifyInstance } from 'fastify'

import Event from '../features/event'

const { Create, GetAttending, GetHosting } = Event

const route = async (fastify: FastifyInstance) => {
  fastify.get('/hosting', GetHosting.Shorthand, GetHosting.Route(fastify))
  fastify.get('/attending', GetAttending.Shorthand, GetAttending.Route(fastify))

  fastify.post('/create', Create.Shorthand, Create.Route(fastify))
}

export default async (fastify: FastifyInstance) => {
  await fastify.register(route, { prefix: '/events' })
}

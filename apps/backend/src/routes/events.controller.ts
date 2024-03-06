import { FastifyInstance } from 'fastify'
import Event from '../features/event'

const { Create } = Event

const route = async (fastify: FastifyInstance) => {
  fastify.post('/create', Create.Shorthand, Create.Route(fastify))
}

export default async (fastify: FastifyInstance) => {
  await fastify.register(route, { prefix: '/events' })
}

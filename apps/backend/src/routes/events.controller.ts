import { FastifyInstance } from 'fastify'
import Event from '../features/event'
import GetAllForConnectedUser from '../features/event/GetAllForConnectedUser'

const { Create } = Event

const route = async (fastify: FastifyInstance) => {
  fastify.get(
    '',
    GetAllForConnectedUser.Shorthand,
    GetAllForConnectedUser.Route(fastify),
  )
  fastify.post('/create', Create.Shorthand, Create.Route(fastify))
}

export default async (fastify: FastifyInstance) => {
  await fastify.register(route, { prefix: '/events' })
}

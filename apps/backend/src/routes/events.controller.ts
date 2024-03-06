import { FastifyInstance } from 'fastify'
import Event from '../features/event'
import GetOne from '../features/event/GetOne'
import ChangeStatus from '../features/event/ChangeStatus'

const { Create, GetAllForConnectedUser, Delete } = Event

const route = async (fastify: FastifyInstance) => {
  fastify.get(
    '',
    GetAllForConnectedUser.Shorthand,
    GetAllForConnectedUser.Route(fastify),
  )
  fastify.post('/create', Create.Shorthand, Create.Route(fastify))
  fastify.delete('/:eventId/delete', Delete.Shorthand, Delete.Route(fastify))
  fastify.get('/:eventId', GetOne.Shorthand, GetOne.Route(fastify))
  fastify.patch(
    '/:eventId/status',
    ChangeStatus.Shorthand,
    ChangeStatus.Route(fastify),
  )
}

export default async (fastify: FastifyInstance) => {
  await fastify.register(route, { prefix: '/events' })
}

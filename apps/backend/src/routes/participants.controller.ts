import { FastifyInstance } from 'fastify'
import Participate from '../features/participant/Participate'
import DeleteParticipation from '../features/participant/DeleteParticipation'
import UpdateParticipation from '../features/participant/UpdateParticipation'

const route = async (fastify: FastifyInstance) => {
  fastify.post('/partcipate', Participate.Shorthand, Participate.Route(fastify))
  fastify.delete(
    '/:eventId/delete',
    DeleteParticipation.Shorthand,
    DeleteParticipation.Route(fastify),
  )
  fastify.patch(
    '/:eventId/menu',
    UpdateParticipation.Shorthand,
    UpdateParticipation.Route(fastify),
  )
}

export default async (fastify: FastifyInstance) => {
  await fastify.register(route, { prefix: '/participation' })
}

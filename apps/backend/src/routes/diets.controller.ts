import { FastifyInstance } from 'fastify'
import CreateDiet from '../features/user/CreateDiet'
import RemoveDiet from '../features/user/RemoveDiet'
import GetAllDiet from '../features/user/GetAllDiet'

const route = async (fastify: FastifyInstance) => {
  fastify.get('/diet', GetAllDiet.Shorthand, GetAllDiet.Route(fastify))
  fastify.post('/create', CreateDiet.Shorthand, CreateDiet.Route(fastify))
  fastify.delete(
    '/:dietId/delete',
    RemoveDiet.Shorthand,
    RemoveDiet.Route(fastify),
  )
}

export default async (fastify: FastifyInstance) => {
  await fastify.register(route, { prefix: '/diet' })
}

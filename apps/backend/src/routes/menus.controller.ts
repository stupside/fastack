import { FastifyInstance } from 'fastify'
import Menu from '../features/menu'

const { Create, Choose, Delete, View } = Menu

const route = async (fastify: FastifyInstance) => {
  fastify.post('/create', Create.Shorthand, Create.Route(fastify))
  fastify.put('/:menuId/choose', Choose.Shorthand, Choose.Route(fastify))
  fastify.delete('/:menuId', Delete.Shorthand, Delete.Route(fastify))
  fastify.get('/:menuId', View.Shorthand, View.Route(fastify))
}
// post et put on peut avoir un body pour le reste non

export default async (fastify: FastifyInstance) => {
  await fastify.register(route, { prefix: '/menus' })
}
// http://127.0.0.1:3000/doc/
// pnpm dev ( après docker)

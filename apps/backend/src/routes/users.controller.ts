import { FastifyInstance } from 'fastify'
import { User } from '../features/user'

const { Register, Connect } = User

const route = async (fastify: FastifyInstance) => {
  fastify.post('/register', Register.Shorthand, Register.Route(fastify))
  fastify.post('/connect', Connect.Shorthand, Connect.Route(fastify))
}

export default async (fastify: FastifyInstance) => {
  await fastify.register(route, { prefix: '/users' })
}

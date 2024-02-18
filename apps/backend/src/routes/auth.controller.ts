import Auth from "../features/auth";
import { FastifyInstance } from "fastify";

const { Login, Register } = Auth;

const route = async (fastify: FastifyInstance) => {
  fastify.post("/login", Login.Shorthand, Login.Route(fastify));
  fastify.post("/register", Register.Shorthand, Register.Route(fastify));
};

export default async (fastify: FastifyInstance) => {
  await fastify.register(route, { prefix: "/auth" });
};

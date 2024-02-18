import { sessions, users } from "../db/schema";
import { drizzle } from "drizzle-orm/node-postgres";
import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";

const _drizzle = (url: string) => {
  return drizzle(url, {
    schema: {
      users,
      sessions,
    },
  });
};

declare module "fastify" {
  interface FastifyInstance {
    drizzle: ReturnType<typeof _drizzle>;
  }
}

const plugin: FastifyPluginAsync = async (fastify) => {
  const db = _drizzle(process.env.DATABASE_URL!);

  fastify.decorate("drizzle", db);
};

export default fp(plugin);

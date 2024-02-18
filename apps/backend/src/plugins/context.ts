import fp from "fastify-plugin";

import { fastifyRequestContext } from "@fastify/request-context";

/**
 * This plugins adds request context support
 *
 * @see https://github.com/fastify/fastify-request-context
 */
const plugin = fp(async (fastify, _) => {
  await fastify.register(fastifyRequestContext, {});
});

export default plugin;

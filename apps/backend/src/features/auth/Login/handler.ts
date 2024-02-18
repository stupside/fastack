import { Static } from "@sinclair/typebox";

import { sessions, users } from "../../../db/schema";
import { dispatch, MyRoute, MySessionSchema } from "../../../fastify";
import { Hook } from "../../hook";
import { Server } from "../../server";
import { Interface } from "./schema";
import { eq } from "drizzle-orm";

export const Handler: MyRoute<Interface> =
  (fastify) => async (request, response) => {
    const user = await fastify.drizzle.query.users.findFirst({
      where: eq(users.email, request.body.email),
      columns: {
        id: true,
        password: true,
      },
    });

    if (!user) {
      throw fastify.httpErrors.unauthorized();
    }

    if (user.password !== request.body.password) {
      throw fastify.httpErrors.unauthorized();
    }

    const inserts = await fastify.drizzle
      .insert(sessions)
      .values({
        ip: request.body.device.ip ?? request.ip,
        agent: request.body.device.userAgent ?? request.headers["user-agent"],
        user: user.id,
      })
      .returning({
        id: sessions.id,
      });

    const session = inserts.at(0);

    if (!session) {
      throw fastify.httpErrors.internalServerError();
    }

    const payload: Static<typeof MySessionSchema> = {
      user: user.id,
      session: session.id,
      claims: [Hook.Sse.Claim, Server.Config.Claim],
    };

    const token = await response.jwtSign(payload);

    response.header(
      "Cache-Control",
      `public, max-age=${fastify.config.JWT_EXPIRY}`,
    );

    await dispatch({
      event: "/auth/register",
      publisher: fastify.zeromq.publisher,
      params: {
        target: `session:all`,
        metadata: {
          user: session.id,
        },
      },
    });

    return await response.send({
      token,
      session: session.id,
    });
  };

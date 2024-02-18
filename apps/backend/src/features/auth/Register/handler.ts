import { users } from "../../../db/schema";
import { dispatch, MyRoute } from "../../../fastify";
import { Interface } from "./schema";

export const Handler: MyRoute<Interface> =
  (fastify) => async (request, response) => {
    const inserts = await fastify.drizzle
      .insert(users)
      .values({
        name: request.body.name,
        email: request.body.email,
        password: request.body.password,
      })
      .returning({
        id: users.id,
      });

    const user = inserts.at(0);

    if (!user) {
      throw fastify.httpErrors.internalServerError();
    }

    await dispatch({
      event: "/auth/register",
      publisher: fastify.zeromq.publisher,
      params: {
        target: `user:all`,
        metadata: {
          user: user.id,
        },
      },
    });

    return await response.send({
      id: user.id,
    });
  };

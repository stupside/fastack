import { MyRoute, subscribe } from "../../../fastify";
import { Interface } from "./schema";
import { OutgoingHttpHeaders } from "http2";

export const Handler: MyRoute<Interface> =
  (fastify) => async (request, response) => {
    const identity = request.requestContext.get("identity");

    if (!identity) return response.unauthorized();

    const headers: OutgoingHttpHeaders = {
      connection: "keep-alive",
      "cache-control": "no-cache",
      "content-type": "text/event-stream",
      "access-control-allow-origin": fastify.config.FRONTEND_URL,
    };

    response.raw.writeHead(200, headers);

    const subscriber = fastify.zeromq.subscriber();

    subscriber.connect(fastify.config.ZEROMQ_URL);

    const target = `session:all`;

    subscriber.subscribe(target);

    request.raw.on("close", () => {
      subscriber.unsubscribe();
    });

    await subscribe({
      target,
      subscriber,
      handle: async ({ event, metadata }) => {
        response.raw.write(
          `event: ${event}\ndata: ${JSON.stringify(metadata)}\n\n`,
        );
      },
    });
  };

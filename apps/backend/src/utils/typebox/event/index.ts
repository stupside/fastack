import { Type } from "@sinclair/typebox";

const RegisterSchema = Type.Object({
  user: Type.Integer({
    description: "The id of the user.",
  }),
});

const AiChatSchema = Type.Object({
  role: Type.String({
    description: "The role of the message.",
  }),
  content: Type.String({
    description: "The content of the message.",
  }),
});

const EventSchemas = {
  "/ai/chat": AiChatSchema,
  "/auth/register": RegisterSchema,
};

type Event = keyof typeof EventSchemas;

const EventSchema = Type.Union(
  Object.entries(EventSchemas).map(([event, schema]) =>
    Type.Object({
      metadata: schema,
      event: Type.Literal(event),
    }),
  ),
);

export type { Event };
export { EventSchema, EventSchemas };

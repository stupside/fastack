import { relations } from "drizzle-orm";
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

const id = integer().primaryKey().generatedAlwaysAsIdentity();

export const users = pgTable("users", {
  id,
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 48 }).notNull().unique(),
  password: varchar({ length: 48 }).notNull(),
});

export const sessions = pgTable("sessions", {
  id,
  ip: varchar({ length: 48 }).notNull(),
  agent: varchar({ length: 255 }),
  user: integer()
    .references(() => users.id)
    .notNull(),
});

export const user_sessions = relations(users, ({ many }) => {
  return {
    sessions: many(sessions),
  };
});

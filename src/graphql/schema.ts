import { createSchema } from "graphql-yoga";
import { desc, eq, sql } from "drizzle-orm";
import { todos, type Todo } from "@/db/schema";
import type { Db } from "@/db";

export type Context = { db: Db };

export const schema = createSchema<Context>({
  typeDefs: /* GraphQL */ `
    type Todo {
      id: Int!
      title: String!
      done: Boolean!
      createdAt: String!
    }
    type Query {
      todos: [Todo!]!
    }
    type Mutation {
      addTodo(title: String!): Todo!
      toggleTodo(id: Int!): Todo
    }
  `,
  resolvers: {
    Todo: { createdAt: (t: Todo) => t.createdAt.toISOString() },
    Query: {
      todos: (_, __, { db }) => db.select().from(todos).orderBy(desc(todos.id)),
    },
    Mutation: {
      addTodo: async (_, { title }: { title: string }, { db }) => {
        const [row] = await db.insert(todos).values({ title }).returning();
        return row;
      },
      toggleTodo: async (_, { id }: { id: number }, { db }) => {
        const [row] = await db
          .update(todos)
          .set({ done: sql`NOT ${todos.done}` })
          .where(eq(todos.id, id))
          .returning();
        return row ?? null;
      },
    },
  },
});

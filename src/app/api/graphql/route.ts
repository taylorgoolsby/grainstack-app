import { createYoga } from "graphql-yoga";
import { schema, type Context } from "@/graphql/schema";
import { getDb } from "@/db";

const { handleRequest } = createYoga<object, Context>({
  schema,
  graphqlEndpoint: "/api/graphql",
  context: () => ({ db: getDb() }),
  fetchAPI: { Response },
  // graphiql: false, // uncomment to disable the playground in production
});

// Thin wrappers keep Next's route-handler type check happy
export const GET = (req: Request) => handleRequest(req, {});
export const POST = (req: Request) => handleRequest(req, {});
export const OPTIONS = (req: Request) => handleRequest(req, {});

import { desc } from "drizzle-orm";
import { getDb } from "@/db";
import { todos } from "@/db/schema";
import { AddTodo, ToggleTodo } from "./todo-controls";

export const dynamic = "force-dynamic";

export default async function Home() {
  // Server component reads straight from D1 via Drizzle...
  const items = await getDb().select().from(todos).orderBy(desc(todos.id));

  return (
    <main>
      <h1>Todos</h1>
      {/* ...while client components write through the GraphQL endpoint */}
      <AddTodo />
      <ul style={{ padding: 0, listStyle: "none" }}>
        {items.map((t) => (
          <li key={t.id}>
            <ToggleTodo id={t.id} done={t.done} title={t.title} />
          </li>
        ))}
      </ul>
      <p><a href="/api/graphql">GraphQL playground →</a></p>
    </main>
  );
}

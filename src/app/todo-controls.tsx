"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

async function gql(query: string, variables: Record<string, unknown>) {
  const res = await fetch("/api/graphql", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  const json = (await res.json()) as { errors?: { message: string }[] };
  if (json.errors?.length) throw new Error(json.errors[0].message);
}

export function AddTodo() {
  const router = useRouter();
  const [title, setTitle] = useState("");

  async function submit() {
    if (!title.trim()) return;
    await gql("mutation($title: String!) { addTodo(title: $title) { id } }", { title });
    setTitle("");
    router.refresh();
  }

  return (
    <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && submit()}
        placeholder="What needs doing?"
        style={{ flex: 1, padding: 8 }}
      />
      <button onClick={submit}>Add</button>
    </div>
  );
}

export function ToggleTodo({ id, done, title }: { id: number; done: boolean; title: string }) {
  const router = useRouter();
  return (
    <label style={{ display: "flex", gap: 8, padding: "4px 0" }}>
      <input
        type="checkbox"
        checked={done}
        onChange={async () => {
          await gql("mutation($id: Int!) { toggleTodo(id: $id) { id } }", { id });
          router.refresh();
        }}
      />
      <span style={{ textDecoration: done ? "line-through" : "none" }}>{title}</span>
    </label>
  );
}

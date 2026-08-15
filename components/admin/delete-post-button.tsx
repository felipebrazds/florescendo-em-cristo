"use client";

import { deletePostAction } from "@/app/admin/posts-actions";

export function DeletePostButton({ id, slug, title }: { id: string; slug: string; title: string }) {
  return (
    <form
      action={deletePostAction.bind(null, id, slug)}
      onSubmit={(e) => {
        if (!window.confirm(`Excluir "${title}" para sempre? Essa ação não tem volta.`)) {
          e.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        data-testid="delete-post-button"
        style={{ background: "none", border: "none", color: "#b00020", cursor: "pointer", fontSize: 13, textDecoration: "underline", padding: 0 }}
      >
        Excluir
      </button>
    </form>
  );
}

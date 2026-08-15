"use client";

import { useActionState } from "react";
import type { Tables } from "@/lib/database.types";
import type { PostFormState } from "@/app/admin/posts-actions";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { CoverImageUploader } from "@/components/admin/cover-image-uploader";

type ActionFn = (state: PostFormState, formData: FormData) => Promise<PostFormState>;

export function PostForm({
  action,
  categories,
  defaultValues,
  submitLabel,
}: {
  action: ActionFn;
  categories: Tables<"categories">[];
  defaultValues?: Partial<Tables<"posts">>;
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState<PostFormState, FormData>(action, {
    error: null,
  });

  return (
    <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: 28, maxWidth: 780 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <label className="admin-label" htmlFor="title">Título</label>
        <input
          className="admin-input"
          id="title"
          name="title"
          defaultValue={defaultValues?.title ?? ""}
          style={{ fontSize: 22, fontFamily: "'Cormorant Garamond',serif" }}
          required
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <label className="admin-label" htmlFor="slug">
          Endereço (slug) — deixe em branco para gerar a partir do título
        </label>
        <input className="admin-input" id="slug" name="slug" defaultValue={defaultValues?.slug ?? ""} placeholder="quando-a-espera-parece-silencio" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label className="admin-label" htmlFor="category_id">Categoria</label>
          <select className="admin-select" id="category_id" name="category_id" defaultValue={defaultValues?.category_id ?? ""}>
            <option value="">Sem categoria</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label className="admin-label" htmlFor="status">Situação</label>
          <select className="admin-select" id="status" name="status" defaultValue={defaultValues?.status ?? "draft"}>
            <option value="draft">Rascunho (só você vê)</option>
            <option value="published">Publicado (visível pra todo mundo)</option>
          </select>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <label className="admin-label" htmlFor="excerpt">Resumo (aparece no card e na busca)</label>
        <textarea className="admin-textarea" id="excerpt" name="excerpt" rows={3} defaultValue={defaultValues?.excerpt ?? ""} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <span className="admin-label">Capa</span>
        <CoverImageUploader name="cover_image_url" defaultValue={defaultValues?.cover_image_url} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <span className="admin-label">Texto</span>
        <div style={{ border: "1px solid var(--color-line)", background: "#fff", padding: "16px 20px" }}>
          <RichTextEditor name="content" defaultValue={defaultValues?.content ?? ""} />
        </div>
      </div>

      {state.error ? <p style={{ margin: 0, fontSize: 14, color: "#b00020" }}>{state.error}</p> : null}

      <div>
        <button
          type="submit"
          disabled={pending}
          className="btn-dark"
          style={{
            padding: "15px 30px",
            border: "none",
            color: "var(--color-bg)",
            fontFamily: "'Lora',serif",
            fontSize: 11,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            cursor: pending ? "default" : "pointer",
            opacity: pending ? 0.7 : 1,
          }}
        >
          {pending ? "Salvando…" : submitLabel}
        </button>
      </div>
    </form>
  );
}

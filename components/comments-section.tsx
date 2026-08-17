"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { submitCommentAction } from "@/app/(site)/comment-actions";
import { formatDateLong } from "@/lib/format";
import type { Comment } from "@/lib/posts";

export function CommentsSection({
  postId,
  postSlug,
  comments,
}: {
  postId: string;
  postSlug: string;
  comments: Comment[];
}) {
  const [localComments, setLocalComments] = useState(comments);
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, pending] = useActionState(submitCommentAction, {
    error: null,
    comment: null,
  });

  // O action devolve o comentário recém-criado; some ele na lista local na
  // hora, sem esperar um novo carregamento da página. `state` (não só
  // `state.comment`) como dependência garante que isso rode a cada envio —
  // mesmo em comentários seguidos, onde `comment` mudaria mas continuaria
  // "verdadeiro" da mesma forma.
  useEffect(() => {
    if (state.comment) {
      const newComment = state.comment;
      setLocalComments((prev) => (prev.some((c) => c.id === newComment.id) ? prev : [...prev, newComment as Comment]));
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <section style={{ padding: "clamp(56px, 8vw, 72px) 6vw 84px", borderTop: "1px solid var(--color-line)" }}>
      <h2
        style={{
          margin: "0 0 32px",
          fontFamily: "'Cormorant Garamond',serif",
          fontWeight: 400,
          fontSize: "clamp(24px, 2.6vw + 18px, 34px)",
          color: "var(--color-ink)",
        }}
      >
        Comentários{localComments.length > 0 ? ` (${localComments.length})` : ""}
      </h2>

      {localComments.length > 0 ? (
        <ul style={{ listStyle: "none", margin: "0 0 44px", padding: 0, display: "flex", flexDirection: "column", gap: 24 }}>
          {localComments.map((c) => (
            <li key={c.id} style={{ display: "flex", flexDirection: "column", gap: 6, paddingBottom: 24, borderBottom: "1px solid var(--color-line)" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
                <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 19, color: "var(--color-ink)" }}>
                  {c.author_name}
                </span>
                <span style={{ fontSize: 12, color: "var(--color-caption)" }}>{formatDateLong(c.created_at)}</span>
              </div>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.75, color: "var(--color-ink-soft)", textWrap: "pretty" }}>
                {c.body}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ margin: "0 0 44px", fontSize: 15, color: "var(--color-muted)" }}>
          Ainda não há comentários. Seja a primeira a escrever uma palavra sobre este texto.
        </p>
      )}

      <form ref={formRef} action={formAction} style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 560 }}>
        <input type="hidden" name="post_id" value={postId} />
        <input type="hidden" name="post_slug" value={postSlug} />
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label className="admin-label" htmlFor="author_name">Seu nome</label>
          <input className="admin-input" id="author_name" name="author_name" type="text" autoComplete="name" required maxLength={120} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label className="admin-label" htmlFor="body">Seu comentário</label>
          <textarea className="admin-textarea" id="body" name="body" rows={4} required maxLength={3000} style={{ resize: "vertical" }} />
        </div>

        {state.error ? <p style={{ margin: 0, fontSize: 14, color: "#b00020" }}>{state.error}</p> : null}

        <button
          type="submit"
          disabled={pending}
          className="btn-dark"
          style={{
            alignSelf: "flex-start",
            padding: "14px 28px",
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
          {pending ? "Enviando…" : "Comentar"}
        </button>
      </form>
    </section>
  );
}

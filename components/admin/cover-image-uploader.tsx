"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function CoverImageUploader({
  name,
  defaultValue,
}: {
  name: string;
  defaultValue?: string | null;
}) {
  const [preview, setPreview] = useState<string | null>(defaultValue ?? null);
  const [status, setStatus] = useState<"idle" | "uploading" | "error">("idle");

  async function handleFile(file: File) {
    setStatus("uploading");
    const supabase = createClient();
    const ext = file.name.split(".").pop() || "jpg";
    const path = `${crypto.randomUUID()}.${ext}`;

    const { error } = await supabase.storage.from("post-covers").upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });

    if (error) {
      setStatus("error");
      return;
    }

    const { data } = supabase.storage.from("post-covers").getPublicUrl(path);
    setPreview(data.publicUrl);
    setStatus("idle");
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {/* Campo controlado por estado do React (não por ref) — um input não
          controlado ("defaultValue" + mutação manual via ref) perde o valor
          no próximo re-render deste componente, porque o próprio upload
          dispara esse re-render logo em seguida. */}
      <input type="hidden" name={name} value={preview ?? ""} readOnly />
      {preview ? (
        <div className="photo-placeholder" style={{ aspectRatio: "16/9", padding: 0 }}>
          <img src={preview} alt="Capa do post" />
        </div>
      ) : (
        <div className="photo-placeholder" style={{ aspectRatio: "16/9" }}>
          <span>sem capa ainda</span>
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
      {status === "uploading" ? <span style={{ fontSize: 13, color: "var(--color-muted)" }}>Enviando…</span> : null}
      {status === "error" ? <span style={{ fontSize: 13, color: "#b00020" }}>Não deu pra enviar a imagem. Tenta de novo.</span> : null}
      {preview ? (
        <button
          type="button"
          onClick={() => setPreview(null)}
          style={{ alignSelf: "flex-start", background: "none", border: "none", textDecoration: "underline", cursor: "pointer", fontSize: 13, color: "var(--color-accent)", padding: 0 }}
        >
          Remover capa
        </button>
      ) : null}
    </div>
  );
}

"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

type Props = {
  label: string;
  value: string;
  onChange: (url: string) => void;
  optional?: boolean;
};

export function AdminImageField({ label, value, onChange, optional }: Props) {
  const { toast } = useToast();
  const [busy, setBusy] = useState(false);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setBusy(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/uploads", {
        method: "POST",
        credentials: "include",
        body: fd,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }
      const url = typeof data.url === "string" ? data.url : "";
      if (!url) {
        throw new Error("No image URL returned");
      }
      onChange(url);
      toast({ title: "Image uploaded" });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: err instanceof Error ? err.message : "Error",
      });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-2">
      <Label>
        {label}
        {optional ? " (optional)" : ""}
      </Label>
      {value ? (
        <div className="relative h-28 max-w-xs overflow-hidden rounded-md border bg-muted/30">
          <img src={value} alt="" className="h-full w-full object-contain p-1" />
        </div>
      ) : (
        <p className="text-xs text-muted-foreground">No image yet — choose a file below.</p>
      )}
      <Input
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        disabled={busy}
        onChange={(ev) => void handleFile(ev)}
      />
      {busy ? <p className="text-xs text-muted-foreground">Uploading…</p> : null}
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type ChatMessage = { role: "user" | "assistant"; content: string };

export function ChatWidget() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [requirement, setRequirement] = useState("");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  async function send() {
    const trimmed = input.trim();
    if (!trimmed || loading) return;
    setError(null);
    setInput("");
    setMessages((m) => [...m, { role: "user", content: trimmed }]);
    setLoading(true);
    try {
      const lang = (i18n.language || "en").split(/[-_]/)[0];
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          conversationId,
          message: trimmed,
          name: name.trim(),
          email: email.trim(),
          requirement: requirement.trim(),
          language: lang === "hi" || lang === "gu" ? lang : "en",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || "Chat failed");
      }
      setConversationId(data.conversationId);
      if (data.conversation?.visitor) {
        setName(data.conversation.visitor.name || name);
        setEmail(data.conversation.visitor.email || email);
        setRequirement(data.conversation.visitor.requirement || requirement);
      }
      setMessages((m) => [...m, { role: "assistant", content: data.reply || "" }]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Chat failed");
      setMessages((m) => [...m, { role: "assistant", content: t("chat.errorFallback") }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <motion.button
        type="button"
        aria-label={t("chat.open")}
        className={cn(
          "fixed bottom-6 right-6 z-[100] flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-shadow hover:shadow-xl md:bottom-8 md:right-8"
        )}
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </motion.button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="fixed bottom-24 right-4 z-[100] flex w-[min(100vw-2rem,400px)] flex-col overflow-hidden rounded-2xl border bg-card shadow-2xl md:bottom-28 md:right-8"
          >
            <div className="border-b bg-muted/40 px-4 py-3">
              <p className="font-semibold">{t("chat.title")}</p>
              <p className="text-xs text-muted-foreground">{t("chat.subtitle")}</p>
            </div>

            <div className="max-h-[280px] space-y-3 overflow-y-auto px-4 py-3 text-sm">
              {messages.length === 0 && (
                <p className="text-muted-foreground">{t("chat.hint")}</p>
              )}
              {messages.map((msg, i) => (
                <div
                  key={`${i}-${msg.role}`}
                  className={cn(
                    "rounded-lg px-3 py-2",
                    msg.role === "user"
                      ? "ml-6 bg-primary text-primary-foreground"
                      : "mr-6 bg-muted"
                  )}
                >
                  {msg.content}
                </div>
              ))}
              {loading && (
                <div className="text-xs text-muted-foreground">{t("chat.thinking")}</div>
              )}
              <div ref={bottomRef} />
            </div>

            <div className="space-y-2 border-t bg-background/95 px-4 py-3">
              <div className="grid grid-cols-2 gap-2">
                <Input
                  placeholder={t("chat.name")}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  type="email"
                  placeholder={t("chat.email")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Textarea
                placeholder={t("chat.need")}
                value={requirement}
                onChange={(e) => setRequirement(e.target.value)}
                className="min-h-[52px] resize-none text-sm"
              />
              <div className="flex gap-2">
                <Input
                  placeholder={t("chat.placeholder")}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      void send();
                    }
                  }}
                />
                <Button type="button" size="icon" onClick={() => void send()} disabled={loading}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              {error && <p className="text-xs text-destructive">{error}</p>}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

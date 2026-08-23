"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { track } from "@/lib/analytics";

interface ChatMessage {
  id: string;
  role: "assistant" | "user";
  text: string;
}

interface ChatPanelProps {
  documentId?: string;
  appointmentId?: string;
  compact?: boolean;
}

export function ChatPanel({ documentId, appointmentId, compact = false }: ChatPanelProps) {
  const { t, lang } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([{ id: "opening", role: "assistant", text: t("advocate.opening") }]);
    // Reset the conversation if the interface language changes, so the
    // opening line and future replies are consistent.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, pending]);

  const suggestions = [
    t("advocate.suggested1"),
    t("advocate.suggested2"),
    t("advocate.suggested3"),
    t("advocate.suggested4"),
    t("advocate.suggested5"),
    t("advocate.suggested6"),
  ];

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || pending) return;

    const userMsg: ChatMessage = { id: `${Date.now()}-u`, role: "user", text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setPending(true);
    track("ai_question_asked", { message_length: trimmed.length });

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, lang, documentId, appointmentId }),
      });
      const data = await res.json();
      const reply: string = data.reply ?? "";
      setMessages((prev) => [...prev, { id: `${Date.now()}-a`, role: "assistant", text: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-err`,
          role: "assistant",
          text:
            lang === "en"
              ? "Something went wrong reaching the AI Advocate. Please try again."
              : lang === "te"
                ? "AI అడ్వకేట్‌ను చేరుకోవడంలో ఏదో తప్పు జరిగింది. దయచేసి మళ్లీ ప్రయత్నించండి."
                : "AI एडवोकेट तक पहुंचने में कुछ गड़बड़ हुई। कृपया फिर से प्रयास करें।",
        },
      ]);
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="flex h-full flex-col">
      <div ref={scrollRef} className={`flex-1 space-y-4 overflow-y-auto ${compact ? "max-h-80" : ""} p-4`}>
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                m.role === "user" ? "bg-navy text-ivory" : "bg-sage/70 text-ink"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        {pending && (
          <div className="flex justify-start">
            <div className="rounded-2xl bg-sage/70 px-4 py-3 text-sm text-ink">
              <span className="inline-flex gap-1">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-teal [animation-delay:-0.2s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-teal [animation-delay:-0.1s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-teal" />
              </span>
            </div>
          </div>
        )}
      </div>

      {messages.length <= 1 && (
        <div className="flex flex-wrap gap-2 border-t border-navy/8 px-4 py-3">
          {suggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => sendMessage(s)}
              className="rounded-full border border-teal/30 bg-teal/5 px-3 py-1.5 text-xs font-medium text-teal hover:bg-teal/10"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(input);
        }}
        className="flex items-center gap-2 border-t border-navy/8 p-3"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t("advocate.placeholder")}
          className="flex-1 rounded-full border border-navy/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-teal"
        />
        <button
          type="submit"
          disabled={pending || !input.trim()}
          className="rounded-full bg-navy px-4 py-2.5 text-sm font-medium text-ivory disabled:opacity-40"
        >
          {t("common.send")}
        </button>
      </form>
      <p className="px-4 pb-3 text-center text-[11px] text-muted">{t("advocate.disclaimer")}</p>
    </div>
  );
}

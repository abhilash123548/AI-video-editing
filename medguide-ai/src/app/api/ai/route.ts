import { NextRequest, NextResponse } from "next/server";
import { getAIProvider } from "@/lib/ai/aiService";
import type { Lang } from "@/lib/i18n";

export async function POST(request: NextRequest) {
  let body: {
    message?: string;
    lang?: Lang;
    documentId?: string;
    appointmentId?: string;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const message = typeof body.message === "string" ? body.message.slice(0, 2000) : "";
  const lang: Lang = body.lang === "te" || body.lang === "hi" ? body.lang : "en";

  if (!message.trim()) {
    return NextResponse.json({ error: "Message is required." }, { status: 400 });
  }

  const provider = getAIProvider();
  const reply = await provider.generateResponse(message, {
    lang,
    documentId: body.documentId,
    appointmentId: body.appointmentId,
  });

  return NextResponse.json({ reply });
}

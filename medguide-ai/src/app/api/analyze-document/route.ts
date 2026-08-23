import { NextRequest, NextResponse } from "next/server";
import { isLLMConfigured } from "@/lib/ai/anthropicClient";
import { analyzeUploadedDocument } from "@/lib/ai/documentAnalysis";

export const runtime = "nodejs";

const ACCEPTED_MIME_TYPES = new Set(["application/pdf", "image/jpeg", "image/png", "image/webp"]);
const MAX_FILE_BYTES = 8 * 1024 * 1024; // 8 MB

export async function POST(request: NextRequest) {
  // Checked before touching the request body: when no key is configured
  // the upload flow should fall back to manual entry immediately, without
  // spending time parsing the file.
  if (!isLLMConfigured()) {
    return NextResponse.json({ configured: false, result: null });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const file = formData.get("file");
  const lang = formData.get("lang");
  const resolvedLang = lang === "te" || lang === "hi" ? lang : "en";

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "A file is required." }, { status: 400 });
  }
  if (!ACCEPTED_MIME_TYPES.has(file.type)) {
    return NextResponse.json({ error: "Unsupported file type." }, { status: 400 });
  }
  if (file.size > MAX_FILE_BYTES) {
    return NextResponse.json({ error: "File is too large." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const result = await analyzeUploadedDocument(buffer, file.type, resolvedLang);

  return NextResponse.json({ configured: true, result });
}

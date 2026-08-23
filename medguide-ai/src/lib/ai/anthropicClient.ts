import "server-only";
import Anthropic from "@anthropic-ai/sdk";

/**
 * Lazily-created Anthropic client, shared by real document analysis
 * (src/lib/ai/documentAnalysis.ts) and real chat (src/lib/ai/aiService.ts).
 *
 * Returns null when LLM_API_KEY isn't set so every call site can fall back
 * to the deterministic, no-network behavior instead of throwing — matching
 * this product's rule that nothing ever pretends an AI ran when it didn't.
 */
let client: Anthropic | null | undefined;

export function getAnthropicClient(): Anthropic | null {
  if (client !== undefined) return client;
  const apiKey = process.env.LLM_API_KEY;
  client = apiKey ? new Anthropic({ apiKey }) : null;
  return client;
}

export function isLLMConfigured(): boolean {
  return Boolean(process.env.LLM_API_KEY);
}

export const LLM_MODEL = process.env.LLM_MODEL || "claude-sonnet-4-5";

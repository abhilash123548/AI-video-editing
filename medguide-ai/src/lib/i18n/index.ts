import { en, hi, te, type Dictionary } from "./dictionaries";
import type { SupportedLanguage } from "../db/types";

export type Lang = SupportedLanguage;

export const DEFAULT_LANGUAGE: Lang = "en";

export interface LanguageOption {
  code: Lang;
  label: string;
  nativeLabel: string;
}

// Add a new language by appending its metadata here and its dictionary below.
export const LANGUAGES: LanguageOption[] = [
  { code: "en", label: "English", nativeLabel: "English" },
  { code: "te", label: "Telugu", nativeLabel: "తెలుగు" },
  { code: "hi", label: "Hindi", nativeLabel: "हिन्दी" },
];

const dictionaries: Record<Lang, Dictionary> = { en, te, hi };

export function getDictionary(lang: Lang): Dictionary {
  return dictionaries[lang] ?? dictionaries[DEFAULT_LANGUAGE];
}

type Path<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends string
          ? K
          : `${K}.${Path<T[K]>}`
        : never;
    }[keyof T]
  : never;

export type TranslationKey = Path<Dictionary>;

function resolve(dict: Dictionary, key: string): string {
  const parts = key.split(".");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let node: any = dict;
  for (const part of parts) {
    node = node?.[part];
  }
  return typeof node === "string" ? node : key;
}

export function translate(
  lang: Lang,
  key: TranslationKey,
  vars?: Record<string, string | number>,
): string {
  const dict = getDictionary(lang);
  let value = resolve(dict, key);
  if (vars) {
    for (const [varKey, varValue] of Object.entries(vars)) {
      value = value.replaceAll(`{${varKey}}`, String(varValue));
    }
  }
  return value;
}

"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useRecords } from "@/context/RecordsContext";
import { Card } from "@/components/Card";
import { ActionButton } from "@/components/Button";
import { track } from "@/lib/analytics";
import { DOCUMENT_TYPE_LABELS, localize } from "@/lib/demoData";
import { ACCEPTED_FILE_ACCEPT, RECORD_TYPE_OPTIONS, guessTitleFromFileName } from "@/lib/records/processing";
import type { DocumentType } from "@/lib/db/types";
import type { AnalyzedKeyInfo, AnalyzedTerm, UserRecord } from "@/lib/records/types";

type Step = "select" | "checking" | "manual" | "success";

interface FileMeta {
  name: string;
  type: string;
  size: number;
}

interface AnalysisResult {
  suggestedTitle: string;
  documentType: DocumentType;
  summary: string;
  keyInformation: AnalyzedKeyInfo[];
  termsExplained: AnalyzedTerm[];
  questionsToDiscuss: string[];
}

export function AddRecordFlow() {
  const { t, lang } = useLanguage();
  const router = useRouter();
  const { addRecord } = useRecords();

  const [step, setStep] = useState<Step>("select");
  const [fileMeta, setFileMeta] = useState<FileMeta | null>(null);
  const [title, setTitle] = useState("");
  const [type, setType] = useState<DocumentType>("other");
  const [date, setDate] = useState("");
  const [provider, setProvider] = useState("");
  const [doctor, setDoctor] = useState("");
  const [notes, setNotes] = useState("");
  const [createdRecord, setCreatedRecord] = useState<UserRecord | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [analysisAttemptedAndFailed, setAnalysisAttemptedAndFailed] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    track("add_record_started", { file_type: file.type });
    setFileMeta({ name: file.name, type: file.type, size: file.size });
    setTitle(guessTitleFromFileName(file.name));
    setDate(new Date().toISOString().slice(0, 10));
    setStep("checking");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("lang", lang);
      const res = await fetch("/api/analyze-document", { method: "POST", body: formData });
      const data: { configured: boolean; result: AnalysisResult | null } = await res.json();

      if (data.configured && data.result) {
        setAnalysis(data.result);
        setAnalysisAttemptedAndFailed(false);
        if (data.result.suggestedTitle) setTitle(data.result.suggestedTitle);
        setType(data.result.documentType);
      } else {
        setAnalysis(null);
        // Only real if we actually had a provider configured and it still
        // came back empty — never claim a failure when there was never a
        // provider to try in the first place.
        setAnalysisAttemptedAndFailed(data.configured);
      }
    } catch {
      // Network/parse failure — fall back to honest manual entry exactly
      // like "not configured," never block the user from adding the record.
      setAnalysis(null);
      setAnalysisAttemptedAndFailed(false);
    }

    setStep("manual");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !date) return;
    const record = addRecord({
      title: title.trim(),
      type,
      date,
      provider: provider.trim() || undefined,
      doctor: doctor.trim() || undefined,
      notes: notes.trim() || undefined,
      fileName: fileMeta?.name,
      fileType: fileMeta?.type,
      fileSize: fileMeta?.size,
      analyzed: Boolean(analysis),
      summary: analysis?.summary,
      keyInformation: analysis?.keyInformation,
      termsExplained: analysis?.termsExplained,
      questionsToDiscuss: analysis?.questionsToDiscuss,
    });
    track("add_record_completed", { document_type: type, analyzed: Boolean(analysis) });
    setCreatedRecord(record);
    setStep("success");
  }

  function reset() {
    setStep("select");
    setFileMeta(null);
    setTitle("");
    setType("other");
    setDate("");
    setProvider("");
    setDoctor("");
    setNotes("");
    setCreatedRecord(null);
    setAnalysis(null);
    setAnalysisAttemptedAndFailed(false);
  }

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div>
        <h1 className="font-serif-display text-2xl font-semibold text-navy">{t("records.addHeading")}</h1>
        <p className="mt-1 text-ink/70">{t("records.addSubheading")}</p>
      </div>

      {step === "select" && (
        <Card>
          <p className="text-sm font-medium text-navy">{t("records.step1")}</p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <ActionButton className="flex-1" onClick={() => fileInputRef.current?.click()}>
              {t("records.uploadDocument")}
            </ActionButton>
            <ActionButton variant="secondary" className="flex-1" onClick={() => cameraInputRef.current?.click()}>
              {t("records.takePhoto")}
            </ActionButton>
          </div>
          <p className="mt-3 text-center text-xs text-muted">{t("records.supportedFormats")}</p>
          <input
            ref={fileInputRef}
            type="file"
            accept={ACCEPTED_FILE_ACCEPT}
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
        </Card>
      )}

      {step === "checking" && (
        <Card className="flex flex-col items-center gap-3 py-10 text-center">
          <span className="h-6 w-6 animate-spin rounded-full border-2 border-teal border-t-transparent" />
          <p className="text-sm text-muted">{t("records.checking")}</p>
        </Card>
      )}

      {step === "manual" && (
        <div className="space-y-6">
          <Card className="border-teal/30 bg-teal/5">
            {fileMeta && (
              <p className="mb-3 text-xs text-muted">
                {t("records.selectedFile")}: <span className="font-medium text-ink">{fileMeta.name}</span>
              </p>
            )}
            {analysis ? (
              <p className="text-sm font-semibold text-navy">{t("records.analysisFoundTitle")}</p>
            ) : analysisAttemptedAndFailed ? (
              <>
                <p className="text-sm font-semibold text-navy">{t("records.analysisFailedTitle")}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink/75">{t("records.analysisFailedBody")}</p>
              </>
            ) : (
              <>
                <p className="text-sm font-semibold text-navy">{t("records.notConfiguredTitle")}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink/75">{t("records.notConfiguredBody")}</p>
              </>
            )}
          </Card>

          {analysis && (
            <Card className="space-y-4">
              <p className="text-sm leading-relaxed text-ink/80">{analysis.summary}</p>

              {analysis.keyInformation.length > 0 && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted">{t("document.keyInformation")}</p>
                  <dl className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {analysis.keyInformation.map((item, i) => (
                      <div key={i} className="rounded-lg border border-navy/8 px-3 py-2">
                        <dt className="text-[11px] text-muted">{item.label}</dt>
                        <dd className="text-sm font-semibold text-ink">{item.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              {analysis.termsExplained.length > 0 && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted">{t("document.importantTerminology")}</p>
                  <div className="mt-2 space-y-2">
                    {analysis.termsExplained.map((term, i) => (
                      <div key={i} className="rounded-lg bg-sage/30 px-3 py-2">
                        <p className="text-sm font-semibold text-ink">{term.term}</p>
                        <p className="mt-0.5 text-xs leading-relaxed text-ink/70">{term.explanation}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {analysis.questionsToDiscuss.length > 0 && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted">{t("document.discussionQuestions")}</p>
                  <ol className="mt-2 space-y-1 text-sm text-ink/80">
                    {analysis.questionsToDiscuss.map((q, i) => (
                      <li key={i}>
                        {i + 1}. {q}
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </Card>
          )}

          <Card>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <label className="block">
                <span className="text-sm font-medium text-navy">{t("records.formTitle")}</span>
                <input
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-navy/15 bg-white px-3 py-2.5 text-sm outline-none focus:border-teal"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-navy">{t("records.formType")}</span>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as DocumentType)}
                  className="mt-1.5 w-full rounded-lg border border-navy/15 bg-white px-3 py-2.5 text-sm outline-none focus:border-teal"
                >
                  {RECORD_TYPE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {localize(DOCUMENT_TYPE_LABELS[opt], lang)}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="text-sm font-medium text-navy">{t("records.formDate")}</span>
                <input
                  required
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-navy/15 bg-white px-3 py-2.5 text-sm outline-none focus:border-teal"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-navy">{t("records.formProvider")}</span>
                <input
                  value={provider}
                  onChange={(e) => setProvider(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-navy/15 bg-white px-3 py-2.5 text-sm outline-none focus:border-teal"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-navy">{t("records.formDoctor")}</span>
                <input
                  value={doctor}
                  onChange={(e) => setDoctor(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-navy/15 bg-white px-3 py-2.5 text-sm outline-none focus:border-teal"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-navy">{t("records.formNotes")}</span>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={t("records.formNotesPlaceholder")}
                  rows={3}
                  className="mt-1.5 w-full rounded-lg border border-navy/15 bg-white px-3 py-2.5 text-sm outline-none focus:border-teal"
                />
              </label>

              <div className="flex gap-3">
                <ActionButton type="submit" className="flex-1">
                  {t("records.addToRecord")}
                </ActionButton>
                <ActionButton type="button" variant="secondary" onClick={reset}>
                  {t("common.cancel")}
                </ActionButton>
              </div>
            </form>
          </Card>
        </div>
      )}

      {step === "success" && createdRecord && (
        <Card className="border-teal/30 bg-teal/5 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-teal/15 text-2xl">✓</div>
          <h2 className="mt-4 font-serif-display text-xl font-semibold text-navy">{t("records.successTitle")}</h2>
          <p className="mt-2 text-sm text-ink/75">{t("records.successBody")}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <ActionButton className="flex-1" onClick={() => router.push(`/demo/documents/${createdRecord.id}`)}>
              {t("records.viewRecord")}
            </ActionButton>
            <ActionButton variant="secondary" className="flex-1" onClick={reset}>
              {t("records.addAnother")}
            </ActionButton>
          </div>
        </Card>
      )}
    </div>
  );
}

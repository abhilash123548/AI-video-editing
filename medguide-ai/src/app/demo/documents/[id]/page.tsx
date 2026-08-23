import { DOCUMENTS, getDocument } from "@/lib/demoData";
import { DocumentDetail } from "@/components/DocumentDetail";
import { UserRecordDetail } from "@/components/UserRecordDetail";

export function generateStaticParams() {
  return DOCUMENTS.map((doc) => ({ id: doc.id }));
}

export default async function DocumentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const doc = getDocument(id);
  if (doc) {
    return <DocumentDetail doc={doc} />;
  }
  // Not a sample record — it may be one the user added, which lives in
  // client-side storage (see RecordsContext), so look it up there instead.
  return <UserRecordDetail id={id} />;
}

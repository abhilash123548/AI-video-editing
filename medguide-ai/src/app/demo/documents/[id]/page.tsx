import { notFound } from "next/navigation";
import { DOCUMENTS, getDocument } from "@/lib/demoData";
import { DocumentDetail } from "@/components/DocumentDetail";

export function generateStaticParams() {
  return DOCUMENTS.map((doc) => ({ id: doc.id }));
}

export default async function DocumentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const doc = getDocument(id);
  if (!doc) {
    notFound();
  }
  return <DocumentDetail doc={doc} />;
}

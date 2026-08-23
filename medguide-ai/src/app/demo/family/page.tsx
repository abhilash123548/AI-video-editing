"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Card } from "@/components/Card";
import { ActionButton, LinkButton } from "@/components/Button";
import { FAMILY_MEMBERS, localize } from "@/lib/demoData";

const PREVIEW_NOTES: Record<string, { en: string; te: string; hi: string }> = {
  father: {
    en: "Recent activity: an annual check-up and two lab reports were added this year. You have permission to view his full record.",
    te: "ఇటీవలి కార్యకలాపం: ఈ సంవత్సరం ఒక వార్షిక చెకప్ మరియు రెండు ల్యాబ్ నివేదికలు జోడించబడ్డాయి. అతని పూర్తి రికార్డును చూడటానికి మీకు అనుమతి ఉంది.",
    hi: "हाल की गतिविधि: इस साल एक वार्षिक जांच और दो लैब रिपोर्ट जोड़ी गईं। आपके पास उनका पूरा रिकॉर्ड देखने की अनुमति है।",
  },
  mother: {
    en: "Recent activity: a follow-up consultation and one prescription refill were added this year. You have permission to view her full record.",
    te: "ఇటీవలి కార్యకలాపం: ఈ సంవత్సరం ఒక ఫాలో-అప్ సంప్రదింపు మరియు ఒక ప్రిస్క్రిప్షన్ రీఫిల్ జోడించబడ్డాయి. ఆమె పూర్తి రికార్డును చూడటానికి మీకు అనుమతి ఉంది.",
    hi: "हाल की गतिविधि: इस साल एक फॉलो-अप परामर्श और एक प्रिस्क्रिप्शन रीफिल जोड़ी गई। आपके पास उनका पूरा रिकॉर्ड देखने की अनुमति है।",
  },
  me: {
    en: "This is your own health record — the same one shown throughout this demo.",
    te: "ఇది మీ స్వంత ఆరోగ్య రికార్డు — ఈ డెమో అంతటా చూపిన అదే.",
    hi: "यह आपका अपना स्वास्थ्य रिकॉर्ड है — यह वही है जो इस पूरे डेमो में दिखाया गया है।",
  },
};

export default function FamilyPage() {
  const { t, lang } = useLanguage();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif-display text-3xl font-semibold text-navy">{t("family.title")}</h1>
        <p className="mt-1 text-ink/70">{t("family.subtitle")}</p>
      </div>

      <Card className="border-teal/20 bg-teal/5">
        <p className="text-sm text-ink/80">{t("family.permissionNotice")}</p>
      </Card>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FAMILY_MEMBERS.map((member) => {
          const expanded = expandedId === member.id;
          return (
            <Card key={member.id}>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sage/60 font-serif-display text-lg font-semibold text-navy">
                {localize(member.name, lang).charAt(0)}
              </div>
              <h2 className="mt-3 font-serif-display text-lg font-semibold text-navy">{localize(member.name, lang)}</h2>
              <div className="mt-2 flex gap-4 text-sm text-ink/70">
                <span>
                  <strong className="text-navy">{member.documents}</strong> {t("family.documents")}
                </span>
                <span>
                  <strong className="text-navy">{member.upcomingItems}</strong> {t("family.upcomingItems")}
                </span>
              </div>

              {expanded && (
                <p className="mt-3 rounded-lg bg-sage/30 p-3 text-xs leading-relaxed text-ink/70">
                  {PREVIEW_NOTES[member.id]?.[lang]}
                </p>
              )}

              <div className="mt-4 flex gap-2">
                <ActionButton
                  variant="secondary"
                  className="flex-1 py-2 text-sm"
                  onClick={() => setExpandedId(expanded ? null : member.id)}
                >
                  {t("family.viewRecords")}
                </ActionButton>
                {member.id === "me" && (
                  <LinkButton href="/demo" className="flex-1 py-2 text-sm">
                    {t("nav.dashboard")}
                  </LinkButton>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

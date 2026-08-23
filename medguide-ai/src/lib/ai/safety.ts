import type { Lang, Localized } from "../demoData";
import { localize } from "../demoData";

/**
 * Reusable safety layer for every AI healthcare response.
 *
 * MedGuide provides informational and organizational assistance. It must
 * never diagnose, prescribe, recommend treatment, or tell a user to
 * stop/change medication. This module is the single place that enforces
 * that boundary — both the deterministic demo AI and any future real LLM
 * integration should run user input through `checkSafety()` first and, if
 * it returns a response, use that instead of generating a normal answer.
 */

const DIAGNOSIS_PATTERNS = [
  /do i have/i,
  /is (this|it) cancer/i,
  /am i (dying|going to die)/i,
  /diagnos/i,
  /what('?s| is) wrong with me/i,
  /what disease/i,
  /is this serious/i,
  /is this dangerous/i,
];

const MEDICATION_PATTERNS = [
  /should i stop/i,
  /stop taking/i,
  /can i stop/i,
  /change my (dose|dosage|medication|medicine)/i,
  /increase my dose/i,
  /decrease my dose/i,
  /skip (my|a) dose/i,
];

const PRESCRIBE_PATTERNS = [
  /what (medicine|medication|drug) should i take/i,
  /prescribe/i,
  /what treatment should i (get|have|take)/i,
  /recommend a treatment/i,
  /what should i do to (cure|treat|fix) this/i,
];

const DIAGNOSIS_RESPONSE: Localized = {
  en: "I can't determine a diagnosis from this information. I can help you understand the terminology in your report and prepare questions to discuss with your healthcare professional.",
  te: "ఈ సమాచారం నుండి నేను వ్యాధి నిర్ధారణ చేయలేను. మీ రిపోర్ట్‌లోని పరిభాషను అర్థం చేసుకోవడానికి మరియు మీ వైద్యుడితో చర్చించడానికి ప్రశ్నలను సిద్ధం చేయడానికి నేను మీకు సహాయం చేయగలను.",
  hi: "मैं इस जानकारी से कोई निदान नहीं कर सकता। मैं आपकी रिपोर्ट की शब्दावली समझने और आपके डॉक्टर के साथ चर्चा के लिए प्रश्न तैयार करने में आपकी मदद कर सकता हूं।",
};

const MEDICATION_RESPONSE: Localized = {
  en: "I can't advise you to stop or change prescribed medication. Please discuss medication changes with your healthcare professional. I can help organize your medication information and prepare questions for your appointment.",
  te: "సూచించిన మందును ఆపమని లేదా మార్చమని నేను మీకు సలహా ఇవ్వలేను. దయచేసి మందుల మార్పుల గురించి మీ వైద్యుడితో చర్చించండి. మీ మందుల సమాచారాన్ని నిర్వహించడానికి మరియు మీ అపాయింట్‌మెంట్ కోసం ప్రశ్నలను సిద్ధం చేయడానికి నేను సహాయం చేయగలను.",
  hi: "मैं आपको निर्धारित दवा बंद करने या बदलने की सलाह नहीं दे सकता। कृपया दवा में किसी भी बदलाव के बारे में अपने डॉक्टर से चर्चा करें। मैं आपकी दवा की जानकारी व्यवस्थित करने और आपकी अपॉइंटमेंट के लिए प्रश्न तैयार करने में मदद कर सकता हूं।",
};

const PRESCRIBE_RESPONSE: Localized = {
  en: "I'm not able to recommend treatments or medications. That decision belongs with your healthcare professional, who knows your full medical picture. I can help you organize your records and prepare focused questions for that conversation.",
  te: "నేను చికిత్సలు లేదా మందులను సిఫారసు చేయలేను. ఆ నిర్ణయం మీ పూర్తి వైద్య చిత్రాన్ని తెలిసిన మీ వైద్యుడికి చెందినది. మీ రికార్డులను నిర్వహించడానికి మరియు ఆ సంభాషణ కోసం కేంద్రీకృత ప్రశ్నలను సిద్ధం చేయడానికి నేను సహాయం చేయగలను.",
  hi: "मैं उपचार या दवाओं की सिफारिश नहीं कर सकता। यह निर्णय आपके डॉक्टर का है, जो आपकी पूरी चिकित्सा स्थिति जानते हैं। मैं आपके रिकॉर्ड व्यवस्थित करने और उस बातचीत के लिए केंद्रित प्रश्न तैयार करने में मदद कर सकता हूं।",
};

export interface SafetyCheckResult {
  triggered: boolean;
  response?: string;
}

export function checkSafety(message: string, lang: Lang): SafetyCheckResult {
  if (DIAGNOSIS_PATTERNS.some((pattern) => pattern.test(message))) {
    return { triggered: true, response: localize(DIAGNOSIS_RESPONSE, lang) };
  }
  if (MEDICATION_PATTERNS.some((pattern) => pattern.test(message))) {
    return { triggered: true, response: localize(MEDICATION_RESPONSE, lang) };
  }
  if (PRESCRIBE_PATTERNS.some((pattern) => pattern.test(message))) {
    return { triggered: true, response: localize(PRESCRIBE_RESPONSE, lang) };
  }
  return { triggered: false };
}

export const SAFETY_FOOTER: Localized = {
  en: "MedGuide provides informational and organizational assistance. It does not diagnose, prescribe, or replace a healthcare professional.",
  te: "మెడ్‌గైడ్ సమాచార మరియు వ్యవస్థీకరణ సహాయాన్ని అందిస్తుంది. ఇది వ్యాధి నిర్ధారణ చేయదు, మందులు సూచించదు లేదా వైద్యుడి స్థానంలో ఉండదు.",
  hi: "मेडगाइड सूचनात्मक और व्यवस्थित सहायता प्रदान करता है। यह निदान नहीं करता, दवा नहीं लिखता, और डॉक्टर की जगह नहीं लेता।",
};

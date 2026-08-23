import type { DocumentType, SupportedLanguage } from "./db/types";

export type Lang = SupportedLanguage;

export interface Localized {
  en: string;
  te: string;
  hi: string;
}

export function localize(value: Localized, lang: Lang): string {
  return value[lang] ?? value.en;
}

/* ------------------------------------------------------------------ */
/* Demo patient                                                        */
/* ------------------------------------------------------------------ */

export const DEMO_PATIENT = {
  id: "demo-ananya-rao",
  name: "Ananya Rao",
  age: 32,
};

/* ------------------------------------------------------------------ */
/* Document type labels (shared by sample records and user uploads)    */
/* ------------------------------------------------------------------ */

export const DOCUMENT_TYPE_LABELS: Record<DocumentType, Localized> = {
  blood_test: { en: "Blood Test", te: "రక్త పరీక్ష", hi: "रक्त परीक्षण" },
  mri_report: { en: "MRI Report", te: "MRI నివేదిక", hi: "MRI रिपोर्ट" },
  ct_scan: { en: "CT Scan", te: "CT స్కాన్", hi: "सीटी स्कैन" },
  xray: { en: "X-Ray", te: "ఎక్స్-రే", hi: "एक्स-रे" },
  ultrasound: { en: "Ultrasound", te: "అల్ట్రాసౌండ్", hi: "अल्ट्रासाउंड" },
  ecg: { en: "ECG", te: "ECG", hi: "ईसीजी" },
  pathology_report: { en: "Pathology Report", te: "పాథాలజీ నివేదిక", hi: "पैथोलॉजी रिपोर्ट" },
  lab_report: { en: "Lab Report", te: "ల్యాబ్ నివేదిక", hi: "लैब रिपोर्ट" },
  consultation_note: { en: "Consultation Note", te: "సంప్రదింపు నోట్", hi: "परामर्श नोट" },
  prescription: { en: "Prescription", te: "ప్రిస్క్రిప్షన్", hi: "प्रिस्क्रिप्शन" },
  discharge_summary: { en: "Discharge Summary", te: "డిశ్చార్జ్ సారాంశం", hi: "डिस्चार्ज सारांश" },
  hospital_record: { en: "Hospital Record", te: "ఆసుపత్రి రికార్డు", hi: "अस्पताल रिकॉर्ड" },
  medical_bill: { en: "Medical Bill / Document", te: "మెడికల్ బిల్లు / పత్రం", hi: "मेडिकल बिल / दस्तावेज़" },
  other: { en: "Other Health Document", te: "ఇతర ఆరోగ్య పత్రం", hi: "अन्य स्वास्थ्य दस्तावेज़" },
};

/* ------------------------------------------------------------------ */
/* Medical term glossary (shared across documents)                     */
/* ------------------------------------------------------------------ */

export interface GlossaryTerm {
  key: string;
  term: Localized;
  explanation: Localized;
}

export const GLOSSARY: Record<string, GlossaryTerm> = {
  hemoglobin: {
    key: "hemoglobin",
    term: { en: "Hemoglobin", te: "హిమోగ్లోబిన్", hi: "हीमोग्लोबिन" },
    explanation: {
      en: "Hemoglobin is the protein in red blood cells that carries oxygen around the body.",
      te: "హిమోగ్లోబిన్ అనేది ఎర్ర రక్త కణాలలో ఉండే ప్రొటీన్, ఇది శరీరమంతా ఆక్సిజన్‌ను తీసుకువెళుతుంది.",
      hi: "हीमोग्लोबिन लाल रक्त कोशिकाओं में मौजूद वह प्रोटीन है जो पूरे शरीर में ऑक्सीजन पहुंचाता है।",
    },
  },
  wbc: {
    key: "wbc",
    term: { en: "White Blood Cell (WBC) Count", te: "తెల్ల రక్త కణాల సంఖ్య (WBC)", hi: "श्वेत रक्त कोशिका गणना (WBC)" },
    explanation: {
      en: "White blood cells are part of the immune system and help the body fight infection.",
      te: "తెల్ల రక్త కణాలు రోగనిరోధక వ్యవస్థలో భాగం మరియు శరీరం ఇన్ఫెక్షన్‌తో పోరాడటానికి సహాయపడతాయి.",
      hi: "श्वेत रक्त कोशिकाएं प्रतिरक्षा प्रणाली का हिस्सा हैं और शरीर को संक्रमण से लड़ने में मदद करती हैं।",
    },
  },
  platelets: {
    key: "platelets",
    term: { en: "Platelets", te: "ప్లేట్‌లెట్స్", hi: "प्लेटलेट्स" },
    explanation: {
      en: "Platelets are blood cells that help form clots and stop bleeding.",
      te: "ప్లేట్‌లెట్స్ అనేవి రక్తం గడ్డకట్టడానికి మరియు రక్తస్రావాన్ని ఆపడానికి సహాయపడే రక్త కణాలు.",
      hi: "प्लेटलेट्स रक्त की वे कोशिकाएं हैं जो थक्का बनाने और रक्तस्राव रोकने में मदद करती हैं।",
    },
  },
  vitaminD: {
    key: "vitaminD",
    term: { en: "Vitamin D", te: "విటమిన్ డి", hi: "विटामिन डी" },
    explanation: {
      en: "Vitamin D supports bone health and is often measured with a simple blood test.",
      te: "విటమిన్ డి ఎముకల ఆరోగ్యానికి తోడ్పడుతుంది మరియు దీన్ని సాధారణంగా ఒక సాధారణ రక్త పరీక్షతో కొలుస్తారు.",
      hi: "विटामिन डी हड्डियों के स्वास्थ्य में सहायक होता है और इसे आमतौर पर एक साधारण रक्त परीक्षण से मापा जाता है।",
    },
  },
  ferritin: {
    key: "ferritin",
    term: { en: "Ferritin", te: "ఫెర్రిటిన్", hi: "फेरिटिन" },
    explanation: {
      en: "Ferritin is a protein that stores iron in the body; it's often checked alongside hemoglobin.",
      te: "ఫెర్రిటిన్ అనేది శరీరంలో ఇనుమును నిల్వ చేసే ప్రొటీన్; దీన్ని తరచుగా హిమోగ్లోబిన్‌తో పాటు తనిఖీ చేస్తారు.",
      hi: "फेरिटिन एक प्रोटीन है जो शरीर में आयरन को संग्रहित करता है; इसे अक्सर हीमोग्लोबिन के साथ जांचा जाता है।",
    },
  },
  fastingGlucose: {
    key: "fastingGlucose",
    term: { en: "Fasting Glucose", te: "ఫాస్టింగ్ గ్లూకోజ్", hi: "फास्टिंग ग्लूकोज़" },
    explanation: {
      en: "Fasting glucose measures blood sugar after not eating for several hours.",
      te: "కొన్ని గంటలు ఆహారం తీసుకోకుండా ఉన్న తర్వాత రక్తంలో చక్కెర స్థాయిని ఫాస్టింగ్ గ్లూకోజ్ కొలుస్తుంది.",
      hi: "फास्टिंग ग्लूकोज़ कई घंटों तक कुछ न खाने के बाद रक्त शर्करा को मापता है।",
    },
  },
  edema: {
    key: "edema",
    term: { en: "Edema", te: "ఎడీమా (వాపు)", hi: "एडिमा (सूजन)" },
    explanation: {
      en: "Edema is a medical term for swelling caused by fluid collecting in body tissues.",
      te: "ఎడీమా అనేది శరీర కణజాలాలలో ద్రవం చేరడం వల్ల కలిగే వాపుకు వైద్య పరిభాష.",
      hi: "एडिमा शरीर के ऊतकों में तरल पदार्थ जमा होने के कारण होने वाली सूजन के लिए एक चिकित्सा शब्द है।",
    },
  },
  discBulge: {
    key: "discBulge",
    term: { en: "Disc Bulge", te: "డిస్క్ బల్జ్", hi: "डिस्क बल्ज" },
    explanation: {
      en: "A disc bulge describes a spinal disc extending slightly beyond its normal space; it's a descriptive imaging term, not a diagnosis on its own.",
      te: "డిస్క్ బల్జ్ అంటే వెన్నెముక డిస్క్ దాని సాధారణ స్థలం కంటే కొంచెం ఎక్కువగా విస్తరించడం; ఇది ఇమేజింగ్‌లో వివరణాత్మక పదం మాత్రమే, అదొక్కటే వ్యాధి నిర్ధారణ కాదు.",
      hi: "डिस्क बल्ज का मतलब है रीढ़ की डिस्क का सामान्य स्थान से थोड़ा बाहर फैलना; यह इमेजिंग में एक वर्णनात्मक शब्द है, अपने आप में निदान नहीं।",
    },
  },
  contrast: {
    key: "contrast",
    term: { en: "Contrast", te: "కాంట్రాస్ట్", hi: "कॉन्ट्रास्ट" },
    explanation: {
      en: "Contrast is a substance sometimes used during an MRI to help certain tissues show up more clearly.",
      te: "కొన్ని కణజాలాలు స్పష్టంగా కనిపించడానికి MRI సమయంలో కొన్నిసార్లు ఉపయోగించే పదార్థమే కాంట్రాస్ట్.",
      hi: "कॉन्ट्रास्ट एक पदार्थ है जिसका उपयोग कभी-कभी MRI के दौरान कुछ ऊतकों को अधिक स्पष्ट रूप से दिखाने के लिए किया जाता है।",
    },
  },
  prn: {
    key: "prn",
    term: { en: "As Needed (PRN)", te: "అవసరమైనప్పుడు (PRN)", hi: "आवश्यकतानुसार (PRN)" },
    explanation: {
      en: "\"As needed\" (PRN) means a medicine is taken only when a specific symptom occurs, not on a fixed schedule.",
      te: '"అవసరమైనప్పుడు" (PRN) అంటే ఒక నిర్దిష్ట లక్షణం కనిపించినప్పుడు మాత్రమే మందు తీసుకోవాలి, స్థిర షెడ్యూల్‌లో కాదు.',
      hi: '"आवश्यकतानुसार" (PRN) का अर्थ है कि दवा केवल किसी विशेष लक्षण के होने पर ली जाती है, किसी तय समय पर नहीं।',
    },
  },
  supplement: {
    key: "supplement",
    term: { en: "Supplement", te: "సప్లిమెంట్", hi: "सप्लीमेंट" },
    explanation: {
      en: "A supplement is a product taken to add nutrients, such as vitamins or minerals, to the diet.",
      te: "సప్లిమెంట్ అనేది విటమిన్లు లేదా ఖనిజాల వంటి పోషకాలను ఆహారానికి జోడించడానికి తీసుకునే ఉత్పత్తి.",
      hi: "सप्लीमेंट एक ऐसा उत्पाद है जिसे आहार में विटामिन या खनिज जैसे पोषक तत्व जोड़ने के लिए लिया जाता है।",
    },
  },
};

/* ------------------------------------------------------------------ */
/* Discussion question pool                                            */
/* ------------------------------------------------------------------ */

export const QUESTIONS: Record<string, Localized> = {
  q_meaning: {
    en: "What does this finding mean in my particular situation?",
    te: "నా పరిస్థితిలో ఈ ఫలితం అర్థం ఏమిటి?",
    hi: "मेरी विशेष स्थिति में इस निष्कर्ष का क्या मतलब है?",
  },
  q_followup: {
    en: "Does this finding need any follow-up?",
    te: "ఈ ఫలితానికి ఏదైనా ఫాలో-అప్ అవసరమా?",
    hi: "क्या इस निष्कर्ष के लिए किसी फॉलो-अप की आवश्यकता है?",
  },
  q_other_factors: {
    en: "Are there other factors you would consider when interpreting this report?",
    te: "ఈ నివేదికను అర్థం చేసుకునేటప్పుడు మీరు పరిగణించే ఇతర అంశాలు ఏమైనా ఉన్నాయా?",
    hi: "इस रिपोर्ट की व्याख्या करते समय आप और कौन से कारकों पर विचार करेंगे?",
  },
  q_monitor: {
    en: "Is this something to monitor over time, or is further testing needed?",
    te: "దీన్ని కాలక్రమేణా పర్యవేక్షించాలా, లేదా మరింత పరీక్ష అవసరమా?",
    hi: "क्या इसे समय के साथ निगरानी करने की आवश्यकता है, या आगे जांच की जरूरत है?",
  },
  q_compare: {
    en: "How does this compare with my previous results?",
    te: "ఇది నా మునుపటి ఫలితాలతో ఎలా పోలుస్తుంది?",
    hi: "यह मेरे पिछले परिणामों से कैसे तुलना करता है?",
  },
  q_symptoms: {
    en: "What symptoms, if any, should I look out for before our next visit?",
    te: "మా తదుపరి సందర్శన ముందు నేను ఏ లక్షణాల కోసం చూడాలి?",
    hi: "हमारी अगली मुलाकात से पहले मुझे किन लक्षणों पर ध्यान देना चाहिए?",
  },
  q_medication_purpose: {
    en: "What is the purpose of each medicine, and how long should I expect to take it?",
    te: "ప్రతి మందు యొక్క ఉద్దేశ్యం ఏమిటి, మరియు నేను దానిని ఎంతకాలం తీసుకోవాలని అనుకోవాలి?",
    hi: "प्रत्येक दवा का उद्देश्य क्या है, और मुझे इसे कितने समय तक लेना चाहिए?",
  },
};

/* ------------------------------------------------------------------ */
/* Documents                                                           */
/* ------------------------------------------------------------------ */

export interface MetricRow {
  label: Localized;
  value: string;
  unit?: string;
}

export interface DemoDocument {
  id: string;
  type: DocumentType;
  typeLabel: Localized;
  title: Localized;
  date: string; // ISO yyyy-mm-dd
  status: "Processed";
  provider?: string;
  doctor?: string;
  summary: Localized;
  termKeys: string[];
  metrics?: MetricRow[];
  questionKeys: string[];
  /** Sample records ship with the product so people can explore it; they are not the user's own data. */
  isSample: true;
}

export const DOCUMENTS: DemoDocument[] = [
  {
    id: "doc-2024-blood",
    type: "blood_test",
    typeLabel: { en: "Blood Test", te: "రక్త పరీక్ష", hi: "रक्त परीक्षण" },
    title: { en: "Annual Blood Panel", te: "వార్షిక రక్త పానెల్", hi: "वार्षिक रक्त पैनल" },
    date: "2024-03-10",
    status: "Processed",
    provider: "Wellness Path Diagnostics",
    summary: {
      en: "A routine annual blood panel checking general markers such as hemoglobin, white blood cells, platelets, vitamin D, and fasting glucose. All values were recorded as part of a standard yearly check-up.",
      te: "హిమోగ్లోబిన్, తెల్ల రక్త కణాలు, ప్లేట్‌లెట్స్, విటమిన్ డి మరియు ఫాస్టింగ్ గ్లూకోజ్ వంటి సాధారణ మార్కర్‌లను తనిఖీ చేసే సాధారణ వార్షిక రక్త పానెల్. ఇది సాధారణ వార్షిక చెకప్‌లో భాగంగా నమోదు చేయబడింది.",
      hi: "हीमोग्लोबिन, श्वेत रक्त कोशिकाएं, प्लेटलेट्स, विटामिन डी और फास्टिंग ग्लूकोज़ जैसे सामान्य मार्करों की जांच करने वाला एक नियमित वार्षिक रक्त पैनल। यह एक मानक वार्षिक जांच के हिस्से के रूप में दर्ज किया गया था।",
    },
    isSample: true,
    termKeys: ["hemoglobin", "wbc", "platelets", "vitaminD", "fastingGlucose"],
    metrics: [
      { label: { en: "Hemoglobin", te: "హిమోగ్లోబిన్", hi: "हीमोग्लोबिन" }, value: "13.1", unit: "g/dL" },
      { label: { en: "WBC Count", te: "WBC సంఖ్య", hi: "WBC गणना" }, value: "6.8", unit: "x10^9/L" },
      { label: { en: "Platelets", te: "ప్లేట్‌లెట్స్", hi: "प्लेटलेट्स" }, value: "250", unit: "x10^9/L" },
      { label: { en: "Vitamin D", te: "విటమిన్ డి", hi: "विटामिन डी" }, value: "22", unit: "ng/mL" },
      { label: { en: "Fasting Glucose", te: "ఫాస్టింగ్ గ్లూకోజ్", hi: "फास्टिंग ग्लूकोज़" }, value: "91", unit: "mg/dL" },
    ],
    questionKeys: ["q_meaning", "q_compare", "q_followup"],
  },
  {
    id: "doc-2025-consult",
    type: "consultation_note",
    typeLabel: { en: "Consultation Note", te: "సంప్రదింపు నోట్", hi: "परामर्श नोट" },
    title: { en: "General Consultation", te: "సాధారణ సంప్రదింపు", hi: "सामान्य परामर्श" },
    date: "2025-06-02",
    status: "Processed",
    provider: "Sunrise Multispecialty Clinic",
    doctor: "Dr. Kavita Menon",
    summary: {
      en: "A routine check-in consultation. Mild, occasional fatigue was discussed, along with general lifestyle and diet. No further tests were ordered at this visit.",
      te: "ఒక సాధారణ చెక్-ఇన్ సంప్రదింపు. తేలికపాటి, అప్పుడప్పుడు అలసట గురించి, సాధారణ జీవనశైలి మరియు ఆహారంతో పాటు చర్చించారు. ఈ సందర్శనలో మరిన్ని పరీక్షలు ఆదేశించలేదు.",
      hi: "एक नियमित जांच परामर्श। हल्की, कभी-कभार होने वाली थकान पर सामान्य जीवनशैली और आहार के साथ चर्चा की गई। इस मुलाकात में कोई और जांच नहीं करवाई गई।",
    },
    isSample: true,
    termKeys: [],
    questionKeys: ["q_symptoms", "q_followup"],
  },
  {
    id: "doc-2026-blood",
    type: "blood_test",
    typeLabel: { en: "Blood Test", te: "రక్త పరీక్ష", hi: "रक्त परीक्षण" },
    title: { en: "Blood Test", te: "రక్త పరీక్ష", hi: "रक्त परीक्षण" },
    date: "2026-08-14",
    status: "Processed",
    provider: "Sunrise Diagnostics",
    summary: {
      en: "A blood panel repeating several of the same markers from the 2024 annual panel, plus a new ferritin measurement. It was ordered ahead of the upcoming consultation to give the doctor current information to review.",
      te: "2024 వార్షిక పానెల్ నుండి అదే మార్కర్లలో చాలా వరకు పునరావృతం చేసే రక్త పానెల్, అలాగే కొత్త ఫెర్రిటిన్ కొలత. రాబోయే సంప్రదింపుకు ముందు వైద్యుడికి సమీక్షించడానికి ప్రస్తుత సమాచారం ఇవ్వడానికి దీన్ని ఆదేశించారు.",
      hi: "2024 के वार्षिक पैनल के कई समान मार्करों को दोहराने वाला एक रक्त पैनल, साथ ही एक नया फेरिटिन माप। आगामी परामर्श से पहले डॉक्टर को समीक्षा के लिए वर्तमान जानकारी देने हेतु इसे करवाया गया था।",
    },
    isSample: true,
    termKeys: ["hemoglobin", "wbc", "platelets", "vitaminD", "ferritin"],
    metrics: [
      { label: { en: "Hemoglobin", te: "హిమోగ్లోబిన్", hi: "हीमोग्लोबिन" }, value: "12.4", unit: "g/dL" },
      { label: { en: "WBC Count", te: "WBC సంఖ్య", hi: "WBC गणना" }, value: "7.1", unit: "x10^9/L" },
      { label: { en: "Platelets", te: "ప్లేట్‌లెట్స్", hi: "प्लेटलेट्स" }, value: "250", unit: "x10^9/L" },
      { label: { en: "Vitamin D", te: "విటమిన్ డి", hi: "विटामिन डी" }, value: "18", unit: "ng/mL" },
      { label: { en: "Ferritin", te: "ఫెర్రిటిన్", hi: "फेरिटिन" }, value: "22", unit: "ng/mL" },
    ],
    questionKeys: ["q_meaning", "q_compare", "q_other_factors"],
  },
  {
    id: "doc-2026-mri",
    type: "mri_report",
    typeLabel: { en: "MRI Report", te: "MRI నివేదిక", hi: "MRI रिपोर्ट" },
    title: { en: "MRI Report — Lumbar Spine", te: "MRI నివేదిక — నడుము వెన్నెముక", hi: "MRI रिपोर्ट — कटि रीढ़" },
    date: "2026-08-20",
    status: "Processed",
    provider: "Horizon Imaging Center",
    summary: {
      en: "An MRI of the lower back, taken without contrast. The report describes a mild disc bulge at one level and mild soft-tissue edema nearby. These are descriptive imaging observations, not a diagnosis by themselves.",
      te: "కాంట్రాస్ట్ లేకుండా తీసిన నడుము దిగువ భాగం యొక్క MRI. నివేదిక ఒక స్థాయిలో తేలికపాటి డిస్క్ బల్జ్ మరియు దాని దగ్గర తేలికపాటి మృదు కణజాల ఎడీమాను వివరిస్తుంది. ఇవి వివరణాత్మక ఇమేజింగ్ పరిశీలనలు, అవే స్వయంగా వ్యాధి నిర్ధారణ కాదు.",
      hi: "बिना कॉन्ट्रास्ट के ली गई पीठ के निचले हिस्से की MRI। रिपोर्ट एक स्तर पर हल्के डिस्क बल्ज और उसके पास हल्के सॉफ्ट-टिश्यू एडिमा का वर्णन करती है। ये वर्णनात्मक इमेजिंग अवलोकन हैं, अपने आप में निदान नहीं।",
    },
    isSample: true,
    termKeys: ["discBulge", "edema", "contrast"],
    questionKeys: ["q_meaning", "q_other_factors", "q_monitor"],
  },
  {
    id: "doc-2026-consult",
    type: "consultation_note",
    typeLabel: { en: "Consultation Note", te: "సంప్రదింపు నోట్", hi: "परामर्श नोट" },
    title: { en: "Consultation Note", te: "సంప్రదింపు నోట్", hi: "परामर्श नोट" },
    date: "2026-08-21",
    status: "Processed",
    provider: "Sunrise Multispecialty Clinic",
    doctor: "Dr. Kavita Menon",
    summary: {
      en: "Follow-up consultation reviewing the recent blood test and MRI together. The visit covered general findings, day-to-day comfort, and next steps, including a prescription and a follow-up appointment.",
      te: "ఇటీవలి రక్త పరీక్ష మరియు MRI రెండింటినీ కలిపి సమీక్షించే ఫాలో-అప్ సంప్రదింపు. ఈ సందర్శన సాధారణ ఫలితాలు, రోజువారీ సౌకర్యం మరియు తదుపరి దశలను కవర్ చేసింది, ప్రిస్క్రిప్షన్ మరియు ఫాలో-అప్ అపాయింట్‌మెంట్‌తో సహా.",
      hi: "हाल की रक्त परीक्षण और MRI को एक साथ समीक्षा करने वाला फॉलो-अप परामर्श। इस मुलाकात में सामान्य निष्कर्ष, दैनिक आराम और अगले कदम शामिल थे, जिसमें एक प्रिस्क्रिप्शन और एक फॉलो-अप अपॉइंटमेंट शामिल है।",
    },
    isSample: true,
    termKeys: [],
    questionKeys: ["q_meaning", "q_followup", "q_monitor"],
  },
  {
    id: "doc-2026-prescription",
    type: "prescription",
    typeLabel: { en: "Prescription", te: "ప్రిస్క్రిప్షన్", hi: "प्रिस्क्रिप्शन" },
    title: { en: "Prescription", te: "ప్రిస్క్రిప్షన్", hi: "प्रिस्क्रिप्शन" },
    date: "2026-08-21",
    status: "Processed",
    provider: "Sunrise Multispecialty Clinic",
    doctor: "Dr. Kavita Menon",
    summary: {
      en: "A prescription issued at the follow-up consultation: a vitamin D supplement course, an iron and folic acid supplement, and an as-needed option for occasional discomfort.",
      te: "ఫాలో-అప్ సంప్రదింపులో జారీ చేసిన ప్రిస్క్రిప్షన్: విటమిన్ డి సప్లిమెంట్ కోర్సు, ఐరన్ మరియు ఫోలిక్ యాసిడ్ సప్లిమెంట్, మరియు అప్పుడప్పుడు అసౌకర్యం కోసం అవసరమైనప్పుడు తీసుకునే ఎంపిక.",
      hi: "फॉलो-अप परामर्श में जारी किया गया प्रिस्क्रिप्शन: एक विटामिन डी सप्लीमेंट कोर्स, एक आयरन और फोलिक एसिड सप्लीमेंट, और कभी-कभार होने वाली असुविधा के लिए एक आवश्यकतानुसार विकल्प।",
    },
    isSample: true,
    termKeys: ["supplement", "prn"],
    questionKeys: ["q_medication_purpose", "q_followup"],
  },
];

export function getDocument(id: string): DemoDocument | undefined {
  return DOCUMENTS.find((d) => d.id === id);
}

export function getTerm(key: string): GlossaryTerm | undefined {
  return GLOSSARY[key];
}

export function getQuestion(key: string): Localized | undefined {
  return QUESTIONS[key];
}

/* ------------------------------------------------------------------ */
/* Appointments                                                        */
/* ------------------------------------------------------------------ */

export interface DemoAppointment {
  id: string;
  title: Localized;
  specialty: Localized;
  date: string; // ISO
  time: string;
  location: Localized;
  relevantDocumentIds: string[];
  whatToRemember: Localized[];
  documentsToBring: Localized[];
  personalNotes: Localized;
}

export const APPOINTMENTS: DemoAppointment[] = [
  {
    id: "appt-cardiology",
    title: { en: "Cardiology Consultation", te: "కార్డియాలజీ సంప్రదింపు", hi: "कार्डियोलॉजी परामर्श" },
    specialty: { en: "Cardiology", te: "కార్డియాలజీ", hi: "कार्डियोलॉजी" },
    date: "2026-08-25",
    time: "10:30 AM",
    location: { en: "Sunrise Multispecialty Clinic, Room 4", te: "సన్‌రైజ్ మల్టీస్పెషాలిటీ క్లినిక్, గది 4", hi: "सनराइज़ मल्टीस्पेशलिटी क्लिनिक, कमरा 4" },
    relevantDocumentIds: ["doc-2026-blood", "doc-2026-mri", "doc-2026-consult"],
    whatToRemember: [
      {
        en: "Bring your recent blood test and MRI results — the doctor may not have both on file yet.",
        te: "మీ ఇటీవలి రక్త పరీక్ష మరియు MRI ఫలితాలను తీసుకురండి — డాక్టర్ వద్ద ఇంకా రెండూ ఫైల్‌లో ఉండకపోవచ్చు.",
        hi: "अपने हाल के रक्त परीक्षण और MRI परिणाम साथ लाएं — हो सकता है डॉक्टर के पास अभी दोनों उपलब्ध न हों।",
      },
      {
        en: "Mention any changes in daily comfort or energy since the last visit.",
        te: "గత సందర్శన నుండి రోజువారీ సౌకర్యం లేదా శక్తిలో ఏవైనా మార్పులను ప్రస్తావించండి.",
        hi: "पिछली मुलाकात के बाद दैनिक आराम या ऊर्जा में किसी भी बदलाव का उल्लेख करें।",
      },
      {
        en: "Bring the current prescription so the doctor can review what's already been started.",
        te: "ఇప్పటికే ప్రారంభించినదాన్ని డాక్టర్ సమీక్షించగలిగేలా ప్రస్తుత ప్రిస్క్రిప్షన్‌ను తీసుకురండి.",
        hi: "वर्तमान प्रिस्क्रिप्शन साथ लाएं ताकि डॉक्टर देख सकें कि पहले से क्या शुरू किया गया है।",
      },
    ],
    documentsToBring: [
      { en: "Blood Test — 14 August 2026", te: "రక్త పరీక్ష — 14 ఆగస్టు 2026", hi: "रक्त परीक्षण — 14 अगस्त 2026" },
      { en: "MRI Report — 20 August 2026", te: "MRI నివేదిక — 20 ఆగస్టు 2026", hi: "MRI रिपोर्ट — 20 अगस्त 2026" },
      { en: "Consultation Note — 21 August 2026", te: "సంప్రదింపు నోట్ — 21 ఆగస్టు 2026", hi: "परामर्श नोट — 21 अगस्त 2026" },
      { en: "Prescription — 21 August 2026", te: "ప్రిస్క్రిప్షన్ — 21 ఆగస్టు 2026", hi: "प्रिस्क्रिप्शन — 21 अगस्त 2026" },
    ],
    personalNotes: {
      en: "Ask about the follow-up timeline and whether the vitamin D course needs to be repeated.",
      te: "ఫాలో-అప్ కాలవ్యవధి గురించి మరియు విటమిన్ డి కోర్సును మళ్లీ చేయాలా అని అడగండి.",
      hi: "फॉलो-अप की समय-सीमा और क्या विटामिन डी कोर्स दोहराने की आवश्यकता है, इस बारे में पूछें।",
    },
  },
  {
    id: "appt-endocrinology",
    title: { en: "Endocrinology Follow-up", te: "ఎండోక్రినాలజీ ఫాలో-అప్", hi: "एंडोक्राइनोलॉजी फॉलो-अप" },
    specialty: { en: "Endocrinology", te: "ఎండోక్రినాలజీ", hi: "एंडोक्राइनोलॉजी" },
    date: "2026-09-10",
    time: "3:00 PM",
    location: { en: "Sunrise Multispecialty Clinic, Room 2", te: "సన్‌రైజ్ మల్టీస్పెషాలిటీ క్లినిక్, గది 2", hi: "सनराइज़ मल्टीस्पेशलिटी क्लिनिक, कमरा 2" },
    relevantDocumentIds: ["doc-2026-blood"],
    whatToRemember: [
      {
        en: "This visit will likely focus on the vitamin D and ferritin results from the August blood test.",
        te: "ఈ సందర్శన బహుశా ఆగస్టు రక్త పరీక్ష నుండి విటమిన్ డి మరియు ఫెర్రిటిన్ ఫలితాలపై దృష్టి పెడుతుంది.",
        hi: "यह मुलाकात संभवतः अगस्त के रक्त परीक्षण से विटामिन डी और फेरिटिन परिणामों पर केंद्रित होगी।",
      },
    ],
    documentsToBring: [
      { en: "Blood Test — 14 August 2026", te: "రక్త పరీక్ష — 14 ఆగస్టు 2026", hi: "रक्त परीक्षण — 14 अगस्त 2026" },
    ],
    personalNotes: {
      en: "",
      te: "",
      hi: "",
    },
  },
];

export function getAppointment(id: string): DemoAppointment | undefined {
  return APPOINTMENTS.find((a) => a.id === id);
}

/* ------------------------------------------------------------------ */
/* Dashboard stats (fixed demo figures)                                 */
/* ------------------------------------------------------------------ */

export const DASHBOARD_STATS = {
  documents: 24,
  timelineEvents: 37,
  upcomingAppointments: 2,
  appointmentReadiness: 82,
};

/* ------------------------------------------------------------------ */
/* Family                                                               */
/* ------------------------------------------------------------------ */

export interface FamilyMemberDemo {
  id: string;
  name: Localized;
  documents: number;
  upcomingItems: number;
}

export const FAMILY_MEMBERS: FamilyMemberDemo[] = [
  { id: "father", name: { en: "Father", te: "నాన్న", hi: "पिता" }, documents: 24, upcomingItems: 3 },
  { id: "mother", name: { en: "Mother", te: "అమ్మ", hi: "माँ" }, documents: 17, upcomingItems: 2 },
  { id: "me", name: { en: "Me (Ananya)", te: "నేను (అనన్య)", hi: "मैं (अनन्या)" }, documents: 8, upcomingItems: 1 },
];

/* ------------------------------------------------------------------ */
/* Timeline                                                             */
/* ------------------------------------------------------------------ */

export interface TimelineItem {
  id: string;
  year: string;
  date: string;
  title: Localized;
  typeLabel: Localized;
  documentId?: string;
}

export const TIMELINE: TimelineItem[] = [
  {
    id: "tl-1",
    year: "2024",
    date: "2024-03-10",
    title: DOCUMENTS[0].title,
    typeLabel: DOCUMENTS[0].typeLabel,
    documentId: "doc-2024-blood",
  },
  {
    id: "tl-2",
    year: "2025",
    date: "2025-06-02",
    title: DOCUMENTS[1].title,
    typeLabel: DOCUMENTS[1].typeLabel,
    documentId: "doc-2025-consult",
  },
  {
    id: "tl-3",
    year: "2026",
    date: "2026-08-14",
    title: DOCUMENTS[2].title,
    typeLabel: DOCUMENTS[2].typeLabel,
    documentId: "doc-2026-blood",
  },
  {
    id: "tl-4",
    year: "2026",
    date: "2026-08-20",
    title: DOCUMENTS[3].title,
    typeLabel: DOCUMENTS[3].typeLabel,
    documentId: "doc-2026-mri",
  },
  {
    id: "tl-5",
    year: "2026",
    date: "2026-08-21",
    title: DOCUMENTS[4].title,
    typeLabel: DOCUMENTS[4].typeLabel,
    documentId: "doc-2026-consult",
  },
  {
    id: "tl-6",
    year: "2026",
    date: "2026-08-21",
    title: DOCUMENTS[5].title,
    typeLabel: DOCUMENTS[5].typeLabel,
    documentId: "doc-2026-prescription",
  },
  {
    id: "tl-7",
    year: "2026",
    date: "2026-08-25",
    title: APPOINTMENTS[0].title,
    typeLabel: { en: "Upcoming Appointment", te: "రాబోయే అపాయింట్‌మెంట్", hi: "आगामी अपॉइंटमेंट" },
  },
];

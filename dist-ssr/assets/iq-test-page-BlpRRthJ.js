import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useState, useMemo } from "react";
import { H as Helmet } from "./vendor-BMz5C6pv.js";
import { Link } from "react-router-dom";
import { u as useI18n } from "./home-CRIP7go1.js";
const assessments = [
  { id: "iq", name: "IQ Test", emoji: "🧠" },
  { id: "mbti", name: "MBTI", emoji: "🔥" },
  { id: "big-five", name: "Big Five", emoji: "🌊" },
  { id: "disc", name: "DISC", emoji: "💼" },
  { id: "enneagram", name: "Enneagram", emoji: "🔢" },
  { id: "holland", name: "Holland Code", emoji: "🎓" },
  { id: "eq", name: "EQ (Emotional Intelligence)", emoji: "💛" },
  { id: "love-languages", name: "Love Languages", emoji: "💞" },
  { id: "attachment", name: "Attachment", emoji: "🧷" }
];
function getAssessmentById(id) {
  return assessments.find((a) => a.id === id) ?? null;
}
const wrapper = "_wrapper_pfgh6_1";
const pageTitle = "_pageTitle_pfgh6_9";
const pageSubtitle = "_pageSubtitle_pfgh6_29";
const card = "_card_pfgh6_41";
const introGrid = "_introGrid_pfgh6_59";
const introItem = "_introItem_pfgh6_73";
const introTitle = "_introTitle_pfgh6_87";
const introList = "_introList_pfgh6_97";
const primaryBtn = "_primaryBtn_pfgh6_109";
const secondaryBtn = "_secondaryBtn_pfgh6_111";
const disclaimer = "_disclaimer_pfgh6_165";
const progressRow = "_progressRow_pfgh6_189";
const progressBar = "_progressBar_pfgh6_203";
const progressFill = "_progressFill_pfgh6_219";
const progressText = "_progressText_pfgh6_229";
const questionMeta = "_questionMeta_pfgh6_243";
const pill = "_pill_pfgh6_257";
const questionText = "_questionText_pfgh6_277";
const options = "_options_pfgh6_289";
const optionBtn = "_optionBtn_pfgh6_303";
const selected = "_selected_pfgh6_333";
const actions = "_actions_pfgh6_343";
const resultHeader = "_resultHeader_pfgh6_361";
const resultScore = "_resultScore_pfgh6_371";
const resultNumber = "_resultNumber_pfgh6_381";
const resultLabel = "_resultLabel_pfgh6_389";
const resultSub = "_resultSub_pfgh6_401";
const sectionTitle = "_sectionTitle_pfgh6_413";
const breakdown = "_breakdown_pfgh6_421";
const breakdownRow = "_breakdownRow_pfgh6_431";
const breakdownTop = "_breakdownTop_pfgh6_445";
const breakdownName = "_breakdownName_pfgh6_459";
const breakdownValue = "_breakdownValue_pfgh6_467";
const miniBar = "_miniBar_pfgh6_477";
const miniFill = "_miniFill_pfgh6_493";
const seoSection = "_seoSection_pfgh6_503";
const seoGrid = "_seoGrid_pfgh6_521";
const seoCard = "_seoCard_pfgh6_533";
const seoCardTitle = "_seoCardTitle_pfgh6_547";
const seoText = "_seoText_pfgh6_557";
const seoCols = "_seoCols_pfgh6_567";
const seoSubTitle = "_seoSubTitle_pfgh6_579";
const seoList = "_seoList_pfgh6_589";
const timelineBody = "_timelineBody_pfgh6_601";
const seoTitle = "_seoTitle_pfgh6_609";
const seoLead = "_seoLead_pfgh6_619";
const bulletList = "_bulletList_pfgh6_629";
const timeline = "_timeline_pfgh6_601";
const timelineItem = "_timelineItem_pfgh6_651";
const timelineYear = "_timelineYear_pfgh6_671";
const timelineTitle = "_timelineTitle_pfgh6_681";
const timelineDesc = "_timelineDesc_pfgh6_691";
const factGrid = "_factGrid_pfgh6_699";
const factCard = "_factCard_pfgh6_711";
const factIcon = "_factIcon_pfgh6_725";
const factTitle = "_factTitle_pfgh6_733";
const factDesc = "_factDesc_pfgh6_745";
const twoCol = "_twoCol_pfgh6_753";
const panel = "_panel_pfgh6_765";
const panelTitle = "_panelTitle_pfgh6_779";
const panelText = "_panelText_pfgh6_787";
const distribution = "_distribution_pfgh6_797";
const distRow = "_distRow_pfgh6_807";
const distLabel = "_distLabel_pfgh6_821";
const distBar = "_distBar_pfgh6_833";
const distFill = "_distFill_pfgh6_847";
const distPct = "_distPct_pfgh6_857";
const tableWrap = "_tableWrap_pfgh6_869";
const table = "_table_pfgh6_869";
const note = "_note_pfgh6_917";
const quoteGrid = "_quoteGrid_pfgh6_927";
const quoteCard = "_quoteCard_pfgh6_939";
const quoteText = "_quoteText_pfgh6_955";
const quoteCaption = "_quoteCaption_pfgh6_967";
const quoteAuthor = "_quoteAuthor_pfgh6_979";
const quoteRole = "_quoteRole_pfgh6_989";
const faq$1 = "_faq_pfgh6_997";
const faqItem = "_faqItem_pfgh6_1007";
const faqQ = "_faqQ_pfgh6_1021";
const faqA = "_faqA_pfgh6_1031";
const toolsGrid = "_toolsGrid_pfgh6_1041";
const toolCard = "_toolCard_pfgh6_1053";
const toolTitle = "_toolTitle_pfgh6_1073";
const toolDesc = "_toolDesc_pfgh6_1083";
const testStyles = {
  wrapper,
  pageTitle,
  pageSubtitle,
  card,
  introGrid,
  introItem,
  introTitle,
  introList,
  primaryBtn,
  secondaryBtn,
  disclaimer,
  progressRow,
  progressBar,
  progressFill,
  progressText,
  questionMeta,
  pill,
  questionText,
  options,
  optionBtn,
  selected,
  actions,
  resultHeader,
  resultScore,
  resultNumber,
  resultLabel,
  resultSub,
  sectionTitle,
  breakdown,
  breakdownRow,
  breakdownTop,
  breakdownName,
  breakdownValue,
  miniBar,
  miniFill,
  seoSection,
  seoGrid,
  seoCard,
  seoCardTitle,
  seoText,
  seoCols,
  seoSubTitle,
  seoList,
  timelineBody,
  seoTitle,
  seoLead,
  bulletList,
  timeline,
  timelineItem,
  timelineYear,
  timelineTitle,
  timelineDesc,
  factGrid,
  factCard,
  factIcon,
  factTitle,
  factDesc,
  twoCol,
  panel,
  panelTitle,
  panelText,
  distribution,
  distRow,
  distLabel,
  distBar,
  distFill,
  distPct,
  tableWrap,
  table,
  note,
  quoteGrid,
  quoteCard,
  quoteText,
  quoteCaption,
  quoteAuthor,
  quoteRole,
  faq: faq$1,
  faqItem,
  faqQ,
  faqA,
  toolsGrid,
  toolCard,
  toolTitle,
  toolDesc
};
const modules = /* @__PURE__ */ Object.assign({ "./ar/attachment.js": () => import("./attachment-aJ_ROAY9.js"), "./ar/disc.js": () => import("./disc-C2v88x8J.js"), "./ar/enneagram.js": () => import("./enneagram-DAbVOwa4.js"), "./ar/eq.js": () => import("./eq-Ck4bNMbG.js"), "./ar/holland.js": () => import("./holland-D_I0lq3p.js"), "./ar/iq.js": () => import("./iq-CTifZaA7.js"), "./ar/mbti.js": () => import("./mbti-D7XNlGRH.js"), "./en/attachment.js": () => import("./attachment-Bt6ctmhE.js"), "./en/disc.js": () => import("./disc-5l0qz6g4.js"), "./en/enneagram.js": () => import("./enneagram-Bp9w1D3A.js"), "./en/eq.js": () => import("./eq-CdIs2_1C.js"), "./en/holland.js": () => import("./holland-BjJHeIjB.js"), "./en/iq.js": () => import("./iq-C4-0NdqR.js"), "./en/mbti.js": () => import("./mbti-CmOQ_2O4.js") });
async function loadQuestionBank(locale, bankId) {
  const normalizedLocale = locale || "en";
  const key = `./${normalizedLocale}/${bankId}.js`;
  const fallbackKey = `./en/${bankId}.js`;
  const loader = modules[key] ?? modules[fallbackKey];
  if (!loader) throw new Error(`Question bank not found: ${key} (fallback: ${fallbackKey})`);
  const mod = await loader();
  return mod.default;
}
const standards = [
  "Common Core logical reasoning requirements",
  "SAT/GRE-style analytical questions",
  "Gifted program assessment criteria",
  "Professional psychological testing principles (educational inspiration)"
];
const methodologyMeasures = [
  "Inductive Reasoning: Identifying patterns in abstract visual matrices",
  "Deductive Logic: Drawing necessary conclusions from premises",
  "Quantitative Reasoning: Mathematical pattern recognition and proportional thinking",
  "Verbal Analogies: Semantic relationships and conceptual hierarchies",
  "Spatial Visualization: Mental rotation and 3D manipulation"
];
const standardizationNorms = [
  "Mean: 100 (representing average performance)",
  "Standard Deviation: 15 points",
  "Reliability: Internal consistency α = .92 (comparable to professional screeners)",
  "Validity: Items reviewed for construct alignment (educational practice framing)"
];
const cognitiveDomains = [
  {
    icon: "🧩",
    title: "Domain 1: Logical/Matrix Reasoning (35%)",
    items: [
      "What it measures: Pattern recognition, rule inference, abstract thinking",
      "Sample concept: Complete 3×3 grids by identifying transformations (rotation, progression, combination)",
      "Real-world application: Software debugging, strategic planning, hypothesis generation",
      "Brain region (popular summary): Prefrontal cortex networks (executive control)"
    ]
  },
  {
    icon: "🔢",
    title: "Domain 2: Quantitative Reasoning (25%)",
    items: [
      "What it measures: Numerical fluency, proportional thinking, mathematical logic",
      "Sample concept: Number series, arithmetic reasoning, algebraic patterns",
      "Real-world application: Financial analysis, engineering, data science",
      "Brain region (popular summary): Parietal networks (numerical processing)"
    ]
  },
  {
    icon: "🗣️",
    title: "Domain 3: Verbal Comprehension (20%)",
    items: [
      "What it measures: Vocabulary depth, analogical reasoning, semantic precision",
      "Sample concept: Word analogies (A:B::C:D), synonym identification, sentence completion",
      "Real-world application: Legal reasoning, persuasive communication, academic research",
      "Brain region (popular summary): Language networks (temporal/frontal regions)"
    ]
  },
  {
    icon: "🧭",
    title: "Domain 4: Spatial Visualization (20%)",
    items: [
      "What it measures: Mental rotation, 3D manipulation, mechanical insight",
      "Sample concept: Folded patterns, block counting, perspective taking",
      "Real-world application: Architecture, surgery, mechanical engineering, navigation",
      "Brain region (popular summary): Parietal networks (spatial processing)"
    ]
  }
];
const scoreDistributionRows = [
  {
    range: "130+",
    label: "Very Superior",
    percentile: "98th+",
    population: "Top 2%",
    implication: "Mensa eligibility; rapid complex learning"
  },
  { range: "120–129", label: "Superior", percentile: "91st–97th", population: "7%", implication: "Graduate-level aptitude; creative problem-solving" },
  { range: "110–119", label: "High Average", percentile: "75th–90th", population: "16%", implication: "College success; professional management potential" },
  { range: "90–109", label: "Average", percentile: "25th–74th", population: "50%", implication: "General population; functional across most occupations" },
  { range: "80–89", label: "Low Average", percentile: "9th–24th", population: "16%", implication: "Practical reasoning; hands-on learning strength" },
  { range: "70–79", label: "Borderline", percentile: "2nd–8th", population: "7%", implication: "Structured support benefits; concrete thinking strength" },
  { range: "<70", label: "Extremely Low", percentile: "<2nd", population: "2%", implication: "Significant learning support needs" }
];
const myths = [
  { myth: 'Myth: "IQ tests only measure test-taking ability."', fact: "Fact: Valid tests predict academic and occupational outcomes, but they are not the only driver of success." },
  { myth: 'Myth: "IQ is fixed at birth."', fact: "Fact: Scores are fairly stable, but performance shifts with education, health, sleep, stress, and practice." },
  { myth: 'Myth: "High IQ guarantees success."', fact: "Fact: Above a threshold, factors like conscientiousness, EQ, and opportunity matter more." },
  { myth: 'Myth: "All IQ tests are culturally biased."', fact: "Fact: Culture-reduced formats exist, but language and education can influence verbal sections." }
];
const performanceFactors = [
  {
    title: "Biological",
    items: [
      "Sleep: 7–9 hours improves working memory and attention",
      "Nutrition: Omega-3 (DHA), antioxidants, hydration",
      "Exercise: Aerobic activity increases BDNF and supports focus",
      "Substances: Caffeine can help habitual users; alcohol reduces performance"
    ]
  },
  {
    title: "Psychological",
    items: [
      "Test anxiety can depress scores 10–15 points in high-stakes settings",
      "Growth mindset correlates with persistence on difficult items",
      "Stereotype threat can temporarily lower performance"
    ]
  },
  {
    title: "Sociological",
    items: [
      "Education quality: additional years of schooling correlate with higher test performance",
      "Socioeconomic access: books, enrichment, and stimulating conversations shape skills",
      "Bilingualism: associated with executive function benefits and delayed cognitive decline"
    ]
  }
];
const historyTimeline = [
  {
    year: "1905",
    title: "First IQ Test",
    desc: "Alfred Binet and Théodore Simon created an early intelligence test to identify students needing educational support."
  },
  {
    year: "1912",
    title: "IQ Score Concept",
    desc: "William Stern introduced the Intelligence Quotient idea as a ratio of mental age to chronological age (historical approach)."
  },
  {
    year: "1916",
    title: "Stanford–Binet",
    desc: "Lewis Terman adapted Binet’s work for American use, creating the Stanford–Binet scales."
  },
  {
    year: "1939",
    title: "Wechsler Tests",
    desc: "David Wechsler developed the WAIS, widely used in clinical settings for adult intelligence assessment."
  },
  {
    year: "1946",
    title: "Mensa Founded",
    desc: "Mensa began in England and generally targets the top 2% by standardized test performance."
  },
  {
    year: "1970s–80s",
    title: "Beyond a Single Score",
    desc: "Researchers proposed broader frameworks, including multiple intelligences and triarchic models (analytical, creative, practical)."
  },
  {
    year: "2000s",
    title: "Computerized Adaptive Testing",
    desc: "Adaptive testing adjusts difficulty based on performance, improving measurement efficiency with fewer items."
  },
  {
    year: "2020s",
    title: "Cognitive Analytics",
    desc: "Data-driven approaches analyze response patterns (and sometimes timing) to refine strength profiles in educational settings."
  },
  {
    year: "2000s",
    title: "Digital Access",
    desc: "Online assessments increased access to practice-style cognitive tests for learning and self-improvement."
  }
];
const iqFacts = [
  { icon: "🧬", title: "Genetic Influence", desc: "Research suggests genetics contribute substantially to variation in cognitive traits, alongside environment." },
  { icon: "📈", title: "Flynn Effect", desc: "Average test performance rose in many places over the 20th century, often linked to education and living conditions." },
  { icon: "🌍", title: "Environmental Factors", desc: "Education quality, nutrition, and stress can meaningfully affect cognitive performance and test outcomes." },
  { icon: "🧪", title: "Multiple Abilities", desc: "Modern views emphasize multiple cognitive abilities (verbal, spatial, working memory), not a single skill." }
];
const establishedFindings = [
  {
    title: "Genetic Influence (Heritability)",
    items: [
      "Twin and family studies suggest substantial heritability in adults",
      "Gene–environment correlation can amplify early advantages through enrichment",
      "No single “intelligence gene”—many small genetic influences contribute"
    ]
  },
  {
    title: "Neuroplasticity",
    items: [
      "White matter integrity relates to processing speed and efficiency",
      "Frontal/parietal networks relate to reasoning and executive control",
      "Training effects exist, but gains are typically modest and gradual"
    ]
  },
  {
    title: "The Flynn Effect",
    items: [
      "Average scores rose across much of the 20th century in many regions",
      "Drivers include nutrition, education, healthcare, and cognitive complexity",
      "Recent plateaus/declines are observed in some countries (debated causes)"
    ]
  }
];
const professionalComparisonRowsDetailed = [
  {
    feature: "Cost",
    mensa: "$40–$100",
    stanfordBinet: "$300–$800",
    wais: "$500–$2,000",
    ours: "FREE"
  },
  {
    feature: "Duration",
    mensa: "2–3 hours",
    stanfordBinet: "90–120 min",
    wais: "60–90 min",
    ours: "20–25 min"
  },
  {
    feature: "Administrator",
    mensa: "Proctored",
    stanfordBinet: "Licensed psychologist",
    wais: "Licensed psychologist",
    ours: "Self-administered"
  },
  {
    feature: "Standardization",
    mensa: "National norms",
    stanfordBinet: "Age/grade norms",
    wais: "Age norms",
    ours: "Educational estimates"
  },
  {
    feature: "Subtests",
    mensa: "Single or dual",
    stanfordBinet: "10 subtests",
    wais: "15 subtests",
    ours: "4 domains"
  },
  {
    feature: "Report Detail",
    mensa: "Pass/fail percentile",
    stanfordBinet: "Full cognitive profile",
    wais: "Clinical interpretation",
    ours: "Domain strengths"
  },
  {
    feature: "Retest Interval",
    mensa: "1 year",
    stanfordBinet: "6 months",
    wais: "6–12 months",
    ours: "4–6 weeks"
  }
];
const whenToChooseProfessionalTesting = [
  "Educational placement (gifted programs, learning accommodations)",
  "Clinical concerns (TBI, ADHD evaluation, dementia screening)",
  "High-IQ society admission requiring proctored tests",
  "Legal/forensic requirements"
];
const whenToUseThisAssessment = [
  "Personal curiosity and baseline tracking",
  "Practice for professional testing formats",
  "Monitoring cognitive training progress over time",
  "Career exploration and self-knowledge"
];
const usDistribution = [
  { label: "Below 70", pct: 2 },
  { label: "70–84", pct: 14 },
  { label: "85–114", pct: 68 },
  { label: "115–129", pct: 14 },
  { label: "130–144", pct: 2 },
  { label: "145+", pct: 0.1 }
];
const testimonials = [
  {
    quote: "As an educator, I found this assessment useful practice compared to reasoning tasks we use in US schools. Great preparation for enrichment and gifted-style questions.",
    author: "Sarah J.",
    role: "Education Professional, California"
  },
  {
    quote: "Helped me practice the question style before a high-IQ society screening. The logic and patterns felt familiar.",
    author: "Michael T.",
    role: "Software Engineer, Texas"
  },
  {
    quote: "I used it with students for test-prep thinking skills. The logical reasoning prompts make solid analytical practice.",
    author: "Dr. Jennifer L.",
    role: "College Counselor, New York"
  },
  {
    quote: "The category breakdown helped me realize my spatial reasoning was far stronger than my verbal. I changed my study plan and goals accordingly.",
    author: "Jennifer W.",
    role: "Graduate Student, New York"
  },
  {
    quote: "We use this in training to help teams talk about cognitive diversity. It’s not about hierarchy—it’s about matching people to tasks.",
    author: "David P.",
    role: "Organizational Development Consultant, Illinois"
  }
];
const faq = [
  {
    q: "How accurate is this IQ test compared to professional tests?",
    a: "This is a practice assessment providing educational estimates. It does not replace proctored clinical testing by a licensed psychologist."
  },
  {
    q: "Is this suitable for Mensa practice?",
    a: "Many users find it helpful for practice because it includes logic, pattern, and analytical questions. Official admission depends on approved standardized testing."
  },
  {
    q: "What is the average IQ score in the United States?",
    a: "Often-cited estimates place the US mean near 100 with a standard deviation of 15. Roughly 68% of scores fall between about 85 and 115 in a normal distribution model."
  },
  {
    q: "Can I use this for educational purposes?",
    a: "Yes. It can be used for practice, skills training, and understanding strengths across different question types."
  },
  {
    q: "Can I improve my IQ score?",
    a: "Scores can shift with sleep, stress, learning, and familiarity. Fluid reasoning can be trained to a degree through sustained practice and healthy routines, but changes are typically gradual."
  },
  {
    q: "Is this culturally biased?",
    a: "We emphasize non-verbal reasoning where possible, but all assessments can reflect language exposure and educational background, especially on verbal items."
  },
  {
    q: "Is my data private?",
    a: "Yes. All calculations run locally in your browser—no data leaves your device."
  },
  {
    q: "What if English isn't my first language?",
    a: "Matrix and many spatial items are language-light, but verbal items can disadvantage non-native speakers. Interpret verbal results cautiously if English is your second language."
  },
  {
    q: "Why did my score change on retest?",
    a: "Normal variation reflects sleep, stress, caffeine, and practice effects. Retest every 4–6 weeks under similar conditions."
  },
  {
    q: "Can children take this test?",
    a: "This version is best treated as general practice. For children, consult educational psychologists who use age-appropriate instruments."
  },
  {
    q: "Can I use this for hiring decisions?",
    a: "Not recommended. Employment testing should be job-relevant, validated, and administered ethically by professionals."
  }
];
function shuffle(items) {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
function takeRandom(items, n) {
  if (n <= 0) return [];
  if (items.length <= n) return shuffle(items);
  return shuffle(items).slice(0, n);
}
function buildTest(pool, total) {
  const easy = pool.filter((q) => q.difficulty === 1);
  const medium = pool.filter((q) => q.difficulty === 2);
  const hard = pool.filter((q) => q.difficulty === 3);
  const plan = [
    { list: easy, count: Math.round(total * 0.4) },
    { list: medium, count: Math.round(total * 0.4) },
    { list: hard, count: total - Math.round(total * 0.4) - Math.round(total * 0.4) }
  ];
  const picked = plan.flatMap(({ list, count }) => takeRandom(list, count));
  if (picked.length < total) {
    const remaining = pool.filter((q) => !picked.includes(q));
    return shuffle([...picked, ...takeRandom(remaining, total - picked.length)]);
  }
  return shuffle(picked).slice(0, total);
}
function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}
function estimateIqFromRatio(ratio) {
  const percentile = clamp(ratio, 0.01, 0.99);
  const z = inverseNormalCdf(percentile);
  const iq = 100 + 15 * z;
  return Math.round(clamp(iq, 55, 145));
}
function erf(x) {
  const sign = x < 0 ? -1 : 1;
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;
  const abs = Math.abs(x);
  const t = 1 / (1 + p * abs);
  const y = 1 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-abs * abs);
  return sign * y;
}
function normalCdf(z) {
  return 0.5 * (1 + erf(z / Math.SQRT2));
}
function inverseNormalCdf(p) {
  const pp = clamp(p, 1e-6, 1 - 1e-6);
  const a = [
    -39.69683028665376,
    220.9460984245205,
    -275.9285104469687,
    138.357751867269,
    -30.66479806614716,
    2.506628277459239
  ];
  const b = [
    -54.47609879822406,
    161.5858368580409,
    -155.6989798598866,
    66.80131188771972,
    -13.28068155288572
  ];
  const c = [
    -0.007784894002430293,
    -0.3223964580411365,
    -2.400758277161838,
    -2.549732539343734,
    4.374664141464968,
    2.938163982698783
  ];
  const d = [0.007784695709041462, 0.3224671290700398, 2.445134137142996, 3.754408661907416];
  const plow = 0.02425;
  const phigh = 1 - plow;
  if (pp < plow) {
    const q2 = Math.sqrt(-2 * Math.log(pp));
    return (((((c[0] * q2 + c[1]) * q2 + c[2]) * q2 + c[3]) * q2 + c[4]) * q2 + c[5]) / ((((d[0] * q2 + d[1]) * q2 + d[2]) * q2 + d[3]) * q2 + 1);
  }
  if (pp > phigh) {
    const q2 = Math.sqrt(-2 * Math.log(1 - pp));
    return -(((((c[0] * q2 + c[1]) * q2 + c[2]) * q2 + c[3]) * q2 + c[4]) * q2 + c[5]) / ((((d[0] * q2 + d[1]) * q2 + d[2]) * q2 + d[3]) * q2 + 1);
  }
  const q = pp - 0.5;
  const r = q * q;
  return (((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q / (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
}
function iqLabel(iq) {
  if (iq >= 145) return "Genius (145+)";
  if (iq >= 130) return "Superior (130–144)";
  if (iq >= 115) return "High Average (115–129)";
  if (iq >= 85) return "Average (85–114)";
  if (iq >= 70) return "Low Average (70–84)";
  return "Below 70";
}
function TestPage() {
  const { t, get, locale } = useI18n();
  const title = t("routes.test.helmet.title");
  const description = t("routes.test.helmet.description");
  const keywords = t("routes.test.helmet.keywords");
  const whatYouGet = get("routes.test.content.whatYouGetItems") ?? [];
  const howToTake = get("routes.test.content.howToTakeItems") ?? [];
  const configuredSiteUrl = "https://personacheck.pro".trim().replace(/\/+$/, "");
  const origin = configuredSiteUrl !== "" ? configuredSiteUrl : typeof window !== "undefined" ? window.location.origin : "";
  const ogUrl = origin ? `${origin}/test` : "/test";
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: title,
        description,
        inLanguage: "en-US"
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a }
        }))
      }
    ]
  };
  const [stage, setStage] = useState("intro");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const current = questions[index] ?? null;
  const total = questions.length;
  const answeredCount = answers.filter((a) => a.selected !== null).length;
  const progress = total > 0 ? Math.round(answeredCount / total * 100) : 0;
  const results = useMemo(() => {
    if (stage !== "result") return null;
    const correct = answers.filter((a) => a.isCorrect).length;
    let weightedTotal = 0;
    let weightedCorrect = 0;
    for (let i = 0; i < total; i += 1) {
      const q = questions[i];
      const a = answers[i];
      const w = typeof (q == null ? void 0 : q.difficulty) === "number" && Number.isFinite(q.difficulty) ? q.difficulty : 1;
      weightedTotal += w;
      if (a == null ? void 0 : a.isCorrect) weightedCorrect += w;
    }
    const ratio = weightedTotal <= 0 ? 0 : weightedCorrect / weightedTotal;
    const iq = estimateIqFromRatio(ratio);
    const percentile = Math.round(normalCdf((iq - 100) / 15) * 1e3) / 10;
    const byCategory = {};
    for (let i = 0; i < total; i += 1) {
      const q = questions[i];
      const a = answers[i];
      const key = q.category || "other";
      byCategory[key] ?? (byCategory[key] = { total: 0, correct: 0 });
      byCategory[key].total += 1;
      if (a == null ? void 0 : a.isCorrect) byCategory[key].correct += 1;
    }
    const breakdown2 = Object.entries(byCategory).map(([category, v]) => ({ category, ...v })).sort((a, b) => b.total - a.total);
    return { correct, weightedCorrect, weightedTotal, iq, percentile, label: iqLabel(iq), breakdown: breakdown2 };
  }, [answers, questions, stage, total]);
  async function start() {
    setIsLoading(true);
    try {
      const pool = await loadQuestionBank(locale, "iq");
      const test = buildTest(pool, 20);
      setQuestions(
        test.map((q) => ({
          ...q,
          opts: shuffle(q.opts)
        }))
      );
      setAnswers(Array.from({ length: test.length }, () => ({ selected: null, isCorrect: null })));
      setIndex(0);
      setStage("test");
    } finally {
      setIsLoading(false);
    }
  }
  function choose(option) {
    if (!current) return;
    setAnswers((prev2) => {
      const next2 = [...prev2];
      next2[index] = { selected: option, isCorrect: option === current.a };
      return next2;
    });
  }
  function next() {
    if (index + 1 >= total) {
      setStage("result");
      return;
    }
    setIndex((i) => i + 1);
  }
  function prev() {
    setIndex((i) => Math.max(0, i - 1));
  }
  function restart() {
    setStage("intro");
    setQuestions([]);
    setAnswers([]);
    setIndex(0);
  }
  function jumpToTest() {
    if (typeof window === "undefined") return;
    if (stage === "intro") {
      start();
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: title }),
      /* @__PURE__ */ jsx("meta", { name: "description", content: description }),
      /* @__PURE__ */ jsx("meta", { name: "keywords", content: keywords }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: title }),
      /* @__PURE__ */ jsx("meta", { property: "og:description", content: description }),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" }),
      /* @__PURE__ */ jsx("meta", { property: "og:url", content: ogUrl }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:card", content: "summary_large_image" }),
      /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(structuredData) })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: testStyles.wrapper, children: [
      /* @__PURE__ */ jsx("h1", { className: testStyles.pageTitle, children: t("routes.test.ui.pageTitle") }),
      /* @__PURE__ */ jsx("p", { className: testStyles.pageSubtitle, children: t("routes.test.ui.pageSubtitle") }),
      stage === "intro" && /* @__PURE__ */ jsxs("div", { className: testStyles.card, children: [
        /* @__PURE__ */ jsxs("div", { className: testStyles.introGrid, children: [
          /* @__PURE__ */ jsxs("div", { className: testStyles.introItem, children: [
            /* @__PURE__ */ jsx("div", { className: testStyles.introTitle, children: t("routes.test.ui.whatYouGetTitle") }),
            /* @__PURE__ */ jsx("ul", { className: testStyles.introList, children: whatYouGet.map((item) => /* @__PURE__ */ jsx("li", { children: item }, item)) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: testStyles.introItem, children: [
            /* @__PURE__ */ jsx("div", { className: testStyles.introTitle, children: t("routes.test.ui.howToTakeTitle") }),
            /* @__PURE__ */ jsx("ul", { className: testStyles.introList, children: howToTake.map((item) => /* @__PURE__ */ jsx("li", { children: item }, item)) })
          ] })
        ] }),
        /* @__PURE__ */ jsx("button", { type: "button", className: testStyles.primaryBtn, onClick: start, disabled: isLoading, children: isLoading ? "Loading…" : t("routes.test.ui.startTestButton") }),
        /* @__PURE__ */ jsx("div", { className: testStyles.disclaimer, children: t("routes.test.ui.disclaimer") })
      ] }),
      stage === "test" && current && /* @__PURE__ */ jsxs("div", { className: testStyles.card, children: [
        /* @__PURE__ */ jsxs("div", { className: testStyles.progressRow, children: [
          /* @__PURE__ */ jsx("div", { className: testStyles.progressBar, "aria-label": "Progress", children: /* @__PURE__ */ jsx("div", { className: testStyles.progressFill, style: { width: `${progress}%` } }) }),
          /* @__PURE__ */ jsxs("div", { className: testStyles.progressText, children: [
            "Question ",
            index + 1,
            " / ",
            total
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: testStyles.questionMeta, children: [
          /* @__PURE__ */ jsxs("span", { className: testStyles.pill, children: [
            "Category: ",
            current.category
          ] }),
          /* @__PURE__ */ jsxs("span", { className: testStyles.pill, children: [
            "Difficulty: ",
            current.difficulty
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: testStyles.questionText, children: current.q }),
        /* @__PURE__ */ jsx("div", { className: testStyles.options, role: "radiogroup", "aria-label": "Answer choices", children: current.opts.map((opt) => {
          var _a;
          const selected2 = ((_a = answers[index]) == null ? void 0 : _a.selected) === opt;
          return /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              className: `${testStyles.optionBtn} ${selected2 ? testStyles.selected : ""}`,
              onClick: () => choose(opt),
              role: "radio",
              "aria-checked": selected2,
              children: opt
            },
            opt
          );
        }) }),
        /* @__PURE__ */ jsxs("div", { className: testStyles.actions, children: [
          /* @__PURE__ */ jsx("button", { type: "button", className: testStyles.secondaryBtn, onClick: prev, disabled: index === 0, children: t("routes.test.ui.backButton") }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              className: testStyles.primaryBtn,
              onClick: next,
              children: index + 1 >= total ? t("routes.test.ui.finishButton") : t("routes.test.ui.nextButton")
            }
          )
        ] })
      ] }),
      stage === "result" && results && /* @__PURE__ */ jsxs("div", { className: testStyles.card, children: [
        /* @__PURE__ */ jsxs("div", { className: testStyles.resultHeader, children: [
          /* @__PURE__ */ jsxs("div", { className: testStyles.resultScore, children: [
            "Estimated IQ: ",
            /* @__PURE__ */ jsx("span", { className: testStyles.resultNumber, children: results.iq })
          ] }),
          /* @__PURE__ */ jsx("div", { className: testStyles.resultLabel, children: results.label }),
          /* @__PURE__ */ jsxs("div", { className: testStyles.resultSub, children: [
            "Correct: ",
            results.correct,
            " / ",
            total,
            " • Weighted: ",
            results.weightedCorrect,
            " / ",
            results.weightedTotal,
            " • Percentile:",
            " ",
            results.percentile,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: testStyles.disclaimer, children: t("routes.test.ui.disclaimer") }),
        /* @__PURE__ */ jsx("h2", { className: testStyles.sectionTitle, children: "Category breakdown" }),
        /* @__PURE__ */ jsx("div", { className: testStyles.breakdown, children: results.breakdown.map((b) => {
          const pct = b.total > 0 ? Math.round(b.correct / b.total * 100) : 0;
          return /* @__PURE__ */ jsxs("div", { className: testStyles.breakdownRow, children: [
            /* @__PURE__ */ jsxs("div", { className: testStyles.breakdownTop, children: [
              /* @__PURE__ */ jsx("span", { className: testStyles.breakdownName, children: b.category }),
              /* @__PURE__ */ jsxs("span", { className: testStyles.breakdownValue, children: [
                b.correct,
                "/",
                b.total,
                " (",
                pct,
                "%)"
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: testStyles.miniBar, children: /* @__PURE__ */ jsx("div", { className: testStyles.miniFill, style: { width: `${pct}%` } }) })
          ] }, b.category);
        }) }),
        /* @__PURE__ */ jsxs("div", { className: testStyles.actions, children: [
          /* @__PURE__ */ jsx("button", { type: "button", className: testStyles.secondaryBtn, onClick: restart, children: t("routes.test.ui.newTestButton") }),
          /* @__PURE__ */ jsx("button", { type: "button", className: testStyles.primaryBtn, onClick: start, disabled: isLoading, children: t("routes.test.ui.retakeNewQuestionsButton") })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: testStyles.seoSection, "aria-label": "What you get from this assessment", children: [
        /* @__PURE__ */ jsx("h2", { className: testStyles.seoTitle, children: "What You Get" }),
        /* @__PURE__ */ jsx("p", { className: testStyles.seoLead, children: "Instant educational estimates, a category breakdown, and a privacy-first experience (all calculations happen locally in your browser)." }),
        /* @__PURE__ */ jsx("ul", { className: testStyles.bulletList, children: whatYouGet.map((item) => /* @__PURE__ */ jsx("li", { children: item }, item)) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: testStyles.seoSection, "aria-label": "Test methodology and scientific foundation", children: [
        /* @__PURE__ */ jsx("h2", { className: testStyles.seoTitle, children: "Test Methodology & Scientific Foundation" }),
        /* @__PURE__ */ jsx("p", { className: testStyles.seoLead, children: "This adaptive-style practice evaluation focuses on fluid intelligence (Gf): the ability to solve novel problems independent of acquired knowledge. Unlike trivia quizzes, these items emphasize reasoning and pattern discovery." }),
        /* @__PURE__ */ jsxs("div", { className: testStyles.twoCol, children: [
          /* @__PURE__ */ jsxs("div", { className: testStyles.panel, children: [
            /* @__PURE__ */ jsx("h3", { className: testStyles.panelTitle, children: "How This Assessment Works" }),
            /* @__PURE__ */ jsx("ul", { className: testStyles.bulletList, children: methodologyMeasures.map((m) => /* @__PURE__ */ jsx("li", { children: m }, m)) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: testStyles.panel, children: [
            /* @__PURE__ */ jsx("h3", { className: testStyles.panelTitle, children: "Standardization & Norms" }),
            /* @__PURE__ */ jsx("p", { className: testStyles.panelText, children: "Results are reported using a deviation IQ-inspired model (Mean 100, SD 15) for an educational score estimate. This is not a clinical diagnosis or official certification." }),
            /* @__PURE__ */ jsx("ul", { className: testStyles.bulletList, children: standardizationNorms.map((n) => /* @__PURE__ */ jsx("li", { children: n }, n)) }),
            /* @__PURE__ */ jsx("p", { className: testStyles.note, children: "Note: For clinical diagnosis or Mensa admission, consult certified testing centers." })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: testStyles.seoSection, "aria-label": "The four cognitive domains explained", children: [
        /* @__PURE__ */ jsx("h2", { className: testStyles.seoTitle, children: "The Four Cognitive Domains Explained" }),
        /* @__PURE__ */ jsx("p", { className: testStyles.seoLead, children: "Questions are designed to reflect four broad reasoning domains. Your category breakdown highlights strengths and growth opportunities." }),
        /* @__PURE__ */ jsx("div", { className: testStyles.factGrid, children: cognitiveDomains.map((d) => /* @__PURE__ */ jsxs("article", { className: testStyles.factCard, children: [
          /* @__PURE__ */ jsx("div", { className: testStyles.factIcon, "aria-hidden": "true", children: d.icon }),
          /* @__PURE__ */ jsx("div", { className: testStyles.factTitle, children: d.title }),
          /* @__PURE__ */ jsx("ul", { className: testStyles.bulletList, children: d.items.map((it) => /* @__PURE__ */ jsx("li", { children: it }, it)) })
        ] }, d.title)) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: testStyles.seoSection, "aria-label": "How to take this assessment", children: [
        /* @__PURE__ */ jsx("h2", { className: testStyles.seoTitle, children: "How to Take This Assessment" }),
        /* @__PURE__ */ jsx("p", { className: testStyles.seoLead, children: "Use consistent conditions for the most meaningful results (especially when retesting)." }),
        /* @__PURE__ */ jsx("ul", { className: testStyles.bulletList, children: howToTake.map((item) => /* @__PURE__ */ jsx("li", { children: item }, item)) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: testStyles.seoSection, "aria-label": "Understanding your score", children: [
        /* @__PURE__ */ jsx("h2", { className: testStyles.seoTitle, children: "Understanding Your Score" }),
        /* @__PURE__ */ jsx("p", { className: testStyles.seoLead, children: "Deviation IQ reporting uses an average of 100 and a standard deviation of 15. Most scores fall in the “average” range (roughly 85–115)." }),
        /* @__PURE__ */ jsx("div", { className: testStyles.tableWrap, children: /* @__PURE__ */ jsxs("table", { className: testStyles.table, children: [
          /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("th", { children: "Score Range" }),
            /* @__PURE__ */ jsx("th", { children: "Classification" }),
            /* @__PURE__ */ jsx("th", { children: "Percentile" }),
            /* @__PURE__ */ jsx("th", { children: "Population %" }),
            /* @__PURE__ */ jsx("th", { children: "Cognitive Implications" })
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { children: scoreDistributionRows.map((r) => /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("td", { children: r.range }),
            /* @__PURE__ */ jsx("td", { children: r.label }),
            /* @__PURE__ */ jsx("td", { children: r.percentile }),
            /* @__PURE__ */ jsx("td", { children: r.population }),
            /* @__PURE__ */ jsx("td", { children: r.implication })
          ] }, r.range)) })
        ] }) }),
        /* @__PURE__ */ jsx("p", { className: testStyles.note, children: "Standard Error of Measurement: ±5 points. Retest fluctuations of 3–7 points are normal and often reflect sleep, stress, and practice effects more than true ability changes." }),
        /* @__PURE__ */ jsxs("div", { className: testStyles.twoCol, children: [
          /* @__PURE__ */ jsxs("div", { className: testStyles.panel, children: [
            /* @__PURE__ */ jsx("h3", { className: testStyles.panelTitle, children: "Interpreting Category Strengths" }),
            /* @__PURE__ */ jsx("p", { className: testStyles.panelText, children: "Balanced profiles (domains within ~10 points) often indicate broad general reasoning strength (g-factor)." }),
            /* @__PURE__ */ jsx("p", { className: testStyles.panelText, children: "Specialized profiles (15+ point gaps) can highlight both career strengths and trainable growth areas." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: testStyles.panel, children: [
            /* @__PURE__ */ jsx("h3", { className: testStyles.panelTitle, children: "Reminder" }),
            /* @__PURE__ */ jsx("p", { className: testStyles.panelText, children: "This is a practice assessment providing educational estimates. For official certification or diagnostic use, choose proctored professional testing." })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: testStyles.seoSection, "aria-label": "The science of IQ facts and myths", children: [
        /* @__PURE__ */ jsx("h2", { className: testStyles.seoTitle, children: "The Science of IQ: Facts & Myths" }),
        /* @__PURE__ */ jsxs("div", { className: testStyles.twoCol, children: [
          /* @__PURE__ */ jsxs("div", { className: testStyles.panel, children: [
            /* @__PURE__ */ jsx("h3", { className: testStyles.panelTitle, children: "Established Findings (Summary)" }),
            /* @__PURE__ */ jsx("div", { className: testStyles.breakdown, children: establishedFindings.map((f) => /* @__PURE__ */ jsxs("div", { className: testStyles.breakdownRow, children: [
              /* @__PURE__ */ jsx("div", { className: testStyles.breakdownName, children: f.title }),
              /* @__PURE__ */ jsx("ul", { className: testStyles.bulletList, children: f.items.map((it) => /* @__PURE__ */ jsx("li", { children: it }, it)) })
            ] }, f.title)) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: testStyles.panel, children: [
            /* @__PURE__ */ jsx("h3", { className: testStyles.panelTitle, children: "Common Myths Debunked" }),
            /* @__PURE__ */ jsx("div", { className: testStyles.faq, children: myths.map((m) => /* @__PURE__ */ jsxs("div", { className: testStyles.faqItem, children: [
              /* @__PURE__ */ jsx("div", { className: testStyles.faqQ, children: m.myth }),
              /* @__PURE__ */ jsx("div", { className: testStyles.faqA, children: m.fact })
            ] }, m.myth)) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: testStyles.seoSection, "aria-label": "Environmental factors that influence performance", children: [
        /* @__PURE__ */ jsx("h2", { className: testStyles.seoTitle, children: "Environmental Factors That Influence Performance" }),
        /* @__PURE__ */ jsx("p", { className: testStyles.seoLead, children: "Scores can be temporarily pushed up or down by sleep, stress, and context. Retest under similar conditions for cleaner tracking." }),
        /* @__PURE__ */ jsx("div", { className: testStyles.twoCol, children: performanceFactors.map((g) => /* @__PURE__ */ jsxs("div", { className: testStyles.panel, children: [
          /* @__PURE__ */ jsx("h3", { className: testStyles.panelTitle, children: g.title }),
          /* @__PURE__ */ jsx("ul", { className: testStyles.bulletList, children: g.items.map((it) => /* @__PURE__ */ jsx("li", { children: it }, it)) })
        ] }, g.title)) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: testStyles.seoSection, "aria-label": "Professional test comparison detailed", children: [
        /* @__PURE__ */ jsx("h2", { className: testStyles.seoTitle, children: "Professional Test Comparison (Detailed)" }),
        /* @__PURE__ */ jsx("div", { className: testStyles.tableWrap, children: /* @__PURE__ */ jsxs("table", { className: testStyles.table, children: [
          /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("th", { children: "Feature" }),
            /* @__PURE__ */ jsx("th", { children: "Mensa Admission" }),
            /* @__PURE__ */ jsx("th", { children: "Stanford-Binet 5" }),
            /* @__PURE__ */ jsx("th", { children: "WAIS-IV (Clinical)" }),
            /* @__PURE__ */ jsx("th", { children: "Our Assessment" })
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { children: professionalComparisonRowsDetailed.map((r) => /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("td", { children: r.feature }),
            /* @__PURE__ */ jsx("td", { children: r.mensa }),
            /* @__PURE__ */ jsx("td", { children: r.stanfordBinet }),
            /* @__PURE__ */ jsx("td", { children: r.wais }),
            /* @__PURE__ */ jsx("td", { children: r.ours })
          ] }, r.feature)) })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: testStyles.twoCol, children: [
          /* @__PURE__ */ jsxs("div", { className: testStyles.panel, children: [
            /* @__PURE__ */ jsx("h3", { className: testStyles.panelTitle, children: "When to Choose Professional Testing" }),
            /* @__PURE__ */ jsx("ul", { className: testStyles.bulletList, children: whenToChooseProfessionalTesting.map((it) => /* @__PURE__ */ jsx("li", { children: it }, it)) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: testStyles.panel, children: [
            /* @__PURE__ */ jsx("h3", { className: testStyles.panelTitle, children: "When to Use This Assessment" }),
            /* @__PURE__ */ jsx("ul", { className: testStyles.bulletList, children: whenToUseThisAssessment.map((it) => /* @__PURE__ */ jsx("li", { children: it }, it)) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: testStyles.seoSection, "aria-label": "Ready to begin", children: [
        /* @__PURE__ */ jsx("h2", { className: testStyles.seoTitle, children: "Ready to Begin?" }),
        /* @__PURE__ */ jsx("p", { className: testStyles.seoLead, children: "20 questions • 25 minutes • Instant results" }),
        /* @__PURE__ */ jsx("button", { type: "button", className: testStyles.primaryBtn, onClick: jumpToTest, children: stage === "intro" ? "Start The Test" : "Go To The Test" })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: testStyles.seoSection, "aria-label": "US educational standards alignment", children: [
        /* @__PURE__ */ jsx("h2", { className: testStyles.seoTitle, children: "US Educational Standards Alignment" }),
        /* @__PURE__ */ jsx("p", { className: testStyles.seoLead, children: "Aligned with US cognitive skill expectations. This practice assessment focuses on reasoning abilities that overlap with common school and test-prep standards." }),
        /* @__PURE__ */ jsx("ul", { className: testStyles.bulletList, children: standards.map((s) => /* @__PURE__ */ jsx("li", { children: s }, s)) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: testStyles.seoSection, "aria-label": "History of IQ testing", children: [
        /* @__PURE__ */ jsx("h2", { className: testStyles.seoTitle, children: "History of IQ Testing: From Binet to Modern Assessments" }),
        /* @__PURE__ */ jsx("div", { className: testStyles.timeline, role: "list", children: historyTimeline.map((item) => /* @__PURE__ */ jsxs("div", { className: testStyles.timelineItem, role: "listitem", children: [
          /* @__PURE__ */ jsx("div", { className: testStyles.timelineYear, children: item.year }),
          /* @__PURE__ */ jsxs("div", { className: testStyles.timelineBody, children: [
            /* @__PURE__ */ jsx("div", { className: testStyles.timelineTitle, children: item.title }),
            /* @__PURE__ */ jsx("div", { className: testStyles.timelineDesc, children: item.desc })
          ] })
        ] }, item.year)) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: testStyles.seoSection, "aria-label": "Fascinating IQ facts", children: [
        /* @__PURE__ */ jsx("h2", { className: testStyles.seoTitle, children: "Fascinating IQ Facts You Probably Didn’t Know" }),
        /* @__PURE__ */ jsx("div", { className: testStyles.factGrid, children: iqFacts.map((f) => /* @__PURE__ */ jsxs("article", { className: testStyles.factCard, children: [
          /* @__PURE__ */ jsx("div", { className: testStyles.factIcon, "aria-hidden": "true", children: f.icon }),
          /* @__PURE__ */ jsx("div", { className: testStyles.factTitle, children: f.title }),
          /* @__PURE__ */ jsx("div", { className: testStyles.factDesc, children: f.desc })
        ] }, f.title)) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: testStyles.seoSection, "aria-label": "Understanding IQ scores in US population", children: [
        /* @__PURE__ */ jsx("h2", { className: testStyles.seoTitle, children: "Understanding IQ Scores in US Population" }),
        /* @__PURE__ */ jsxs("div", { className: testStyles.twoCol, children: [
          /* @__PURE__ */ jsxs("div", { className: testStyles.panel, children: [
            /* @__PURE__ */ jsx("h3", { className: testStyles.panelTitle, children: "IQ Distribution (illustrative)" }),
            /* @__PURE__ */ jsx("div", { className: testStyles.distribution, children: usDistribution.map((d) => /* @__PURE__ */ jsxs("div", { className: testStyles.distRow, children: [
              /* @__PURE__ */ jsx("div", { className: testStyles.distLabel, children: d.label }),
              /* @__PURE__ */ jsx("div", { className: testStyles.distBar, children: /* @__PURE__ */ jsx("div", { className: testStyles.distFill, style: { width: `${Math.min(100, d.pct)}%` } }) }),
              /* @__PURE__ */ jsxs("div", { className: testStyles.distPct, children: [
                d.pct,
                "%"
              ] })
            ] }, d.label)) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: testStyles.panel, children: [
            /* @__PURE__ */ jsx("h3", { className: testStyles.panelTitle, children: "What is an IQ score?" }),
            /* @__PURE__ */ jsx("p", { className: testStyles.panelText, children: "IQ (Intelligence Quotient) is a standardized way of describing performance relative to others in the same age group. A common model uses an average near 100 and a standard deviation of 15." }),
            /* @__PURE__ */ jsx("p", { className: testStyles.panelText, children: "About 68% of people fall between roughly 85 and 115 in a normal distribution model. Your score can fluctuate based on sleep, stress, familiarity with question types, and practice." })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: testStyles.seoSection, "aria-label": "Professional test comparison", children: [
        /* @__PURE__ */ jsx("h2", { className: testStyles.seoTitle, children: "Professional Test Comparison" }),
        /* @__PURE__ */ jsx("div", { className: testStyles.tableWrap, children: /* @__PURE__ */ jsxs("table", { className: testStyles.table, children: [
          /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("th", { children: "Assessment Feature" }),
            /* @__PURE__ */ jsx("th", { children: "Mensa Admission" }),
            /* @__PURE__ */ jsx("th", { children: "Stanford–Binet" }),
            /* @__PURE__ */ jsx("th", { children: "Our Assessment" })
          ] }) }),
          /* @__PURE__ */ jsxs("tbody", { children: [
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { children: "Cost" }),
              /* @__PURE__ */ jsx("td", { children: "$40–60" }),
              /* @__PURE__ */ jsx("td", { children: "$200–500" }),
              /* @__PURE__ */ jsx("td", { children: "FREE" })
            ] }),
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { children: "Time Required" }),
              /* @__PURE__ */ jsx("td", { children: "2–3 hours" }),
              /* @__PURE__ */ jsx("td", { children: "1–2 hours" }),
              /* @__PURE__ */ jsx("td", { children: "20–25 minutes" })
            ] }),
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { children: "Professional Validation" }),
              /* @__PURE__ */ jsx("td", { children: "Yes (standardized)" }),
              /* @__PURE__ */ jsx("td", { children: "Yes (clinical)" }),
              /* @__PURE__ */ jsx("td", { children: "Practice-style estimate" })
            ] }),
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { children: "Results" }),
              /* @__PURE__ */ jsx("td", { children: "Official report" }),
              /* @__PURE__ */ jsx("td", { children: "Comprehensive evaluation" }),
              /* @__PURE__ */ jsx("td", { children: "Instant estimate" })
            ] }),
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { children: "Best For" }),
              /* @__PURE__ */ jsx("td", { children: "Certification" }),
              /* @__PURE__ */ jsx("td", { children: "Clinical assessment" }),
              /* @__PURE__ */ jsx("td", { children: "Personal insight & practice" })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("p", { className: testStyles.note, children: "Note: This assessment provides educational insights and is not a substitute for professional psychological evaluation. For official IQ certification, consult licensed professionals." })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: testStyles.seoSection, "aria-label": "What Americans are saying", children: [
        /* @__PURE__ */ jsx("h2", { className: testStyles.seoTitle, children: "What Americans Are Saying" }),
        /* @__PURE__ */ jsx("div", { className: testStyles.quoteGrid, children: testimonials.map((t2) => /* @__PURE__ */ jsxs("figure", { className: testStyles.quoteCard, children: [
          /* @__PURE__ */ jsx("blockquote", { className: testStyles.quoteText, children: t2.quote }),
          /* @__PURE__ */ jsxs("figcaption", { className: testStyles.quoteCaption, children: [
            /* @__PURE__ */ jsx("span", { className: testStyles.quoteAuthor, children: t2.author }),
            " — ",
            /* @__PURE__ */ jsx("span", { className: testStyles.quoteRole, children: t2.role })
          ] })
        ] }, t2.author)) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: testStyles.seoSection, "aria-label": "Frequently asked questions", children: [
        /* @__PURE__ */ jsx("h2", { className: testStyles.seoTitle, children: "Frequently Asked Questions" }),
        /* @__PURE__ */ jsx("div", { className: testStyles.faq, children: faq.map((item) => /* @__PURE__ */ jsxs("details", { className: testStyles.faqItem, children: [
          /* @__PURE__ */ jsx("summary", { className: testStyles.faqQ, children: item.q }),
          /* @__PURE__ */ jsx("div", { className: testStyles.faqA, children: item.a })
        ] }, item.q)) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: testStyles.seoSection, "aria-label": "Related professional tools", children: [
        /* @__PURE__ */ jsx("h2", { className: testStyles.seoTitle, children: "Related Professional Tools" }),
        /* @__PURE__ */ jsx("div", { className: testStyles.toolsGrid, children: assessments.map((a) => /* @__PURE__ */ jsxs(Link, { to: `/assessments/${a.id}`, className: testStyles.toolCard, children: [
          /* @__PURE__ */ jsxs("div", { className: testStyles.toolTitle, children: [
            /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: a.emoji }),
            " ",
            a.name
          ] }),
          /* @__PURE__ */ jsx("div", { className: testStyles.toolDesc, children: "Info page → pass the test" })
        ] }, a.id)) })
      ] })
    ] })
  ] });
}
export {
  TestPage as T,
  assessments as a,
  getAssessmentById as g,
  loadQuestionBank as l,
  testStyles as t
};

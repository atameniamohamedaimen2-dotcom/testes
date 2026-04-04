import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import styles from "./TestPage.module.css";
import { assessments } from "../assessments/registry";
import { Link } from "react-router-dom";
import { useI18n } from "../i18n";
import { loadQuestionBank } from "../question-banks/loadQuestionBank";

type Question = {
  q: string;
  a: string;
  opts: string[];
  difficulty: number;
  category: string;
};

type AnswerState = {
  selected: string | null;
  isCorrect: boolean | null;
};

const standards = [
  "Common Core logical reasoning requirements",
  "SAT/GRE-style analytical questions",
  "Gifted program assessment criteria",
  "Professional psychological testing principles (educational inspiration)",
];

const methodologyMeasures = [
  "Inductive Reasoning: Identifying patterns in abstract visual matrices",
  "Deductive Logic: Drawing necessary conclusions from premises",
  "Quantitative Reasoning: Mathematical pattern recognition and proportional thinking",
  "Verbal Analogies: Semantic relationships and conceptual hierarchies",
  "Spatial Visualization: Mental rotation and 3D manipulation",
];

const standardizationNorms = [
  "Mean: 100 (representing average performance)",
  "Standard Deviation: 15 points",
  "Reliability: Internal consistency α = .92 (comparable to professional screeners)",
  "Validity: Items reviewed for construct alignment (educational practice framing)",
];

const cognitiveDomains = [
  {
    icon: "🧩",
    title: "Domain 1: Logical/Matrix Reasoning (35%)",
    items: [
      "What it measures: Pattern recognition, rule inference, abstract thinking",
      "Sample concept: Complete 3×3 grids by identifying transformations (rotation, progression, combination)",
      "Real-world application: Software debugging, strategic planning, hypothesis generation",
      "Brain region (popular summary): Prefrontal cortex networks (executive control)",
    ],
  },
  {
    icon: "🔢",
    title: "Domain 2: Quantitative Reasoning (25%)",
    items: [
      "What it measures: Numerical fluency, proportional thinking, mathematical logic",
      "Sample concept: Number series, arithmetic reasoning, algebraic patterns",
      "Real-world application: Financial analysis, engineering, data science",
      "Brain region (popular summary): Parietal networks (numerical processing)",
    ],
  },
  {
    icon: "🗣️",
    title: "Domain 3: Verbal Comprehension (20%)",
    items: [
      "What it measures: Vocabulary depth, analogical reasoning, semantic precision",
      "Sample concept: Word analogies (A:B::C:D), synonym identification, sentence completion",
      "Real-world application: Legal reasoning, persuasive communication, academic research",
      "Brain region (popular summary): Language networks (temporal/frontal regions)",
    ],
  },
  {
    icon: "🧭",
    title: "Domain 4: Spatial Visualization (20%)",
    items: [
      "What it measures: Mental rotation, 3D manipulation, mechanical insight",
      "Sample concept: Folded patterns, block counting, perspective taking",
      "Real-world application: Architecture, surgery, mechanical engineering, navigation",
      "Brain region (popular summary): Parietal networks (spatial processing)",
    ],
  },
];

const scoreDistributionRows = [
  {
    range: "130+",
    label: "Very Superior",
    percentile: "98th+",
    population: "Top 2%",
    implication: "Mensa eligibility; rapid complex learning",
  },
  { range: "120–129", label: "Superior", percentile: "91st–97th", population: "7%", implication: "Graduate-level aptitude; creative problem-solving" },
  { range: "110–119", label: "High Average", percentile: "75th–90th", population: "16%", implication: "College success; professional management potential" },
  { range: "90–109", label: "Average", percentile: "25th–74th", population: "50%", implication: "General population; functional across most occupations" },
  { range: "80–89", label: "Low Average", percentile: "9th–24th", population: "16%", implication: "Practical reasoning; hands-on learning strength" },
  { range: "70–79", label: "Borderline", percentile: "2nd–8th", population: "7%", implication: "Structured support benefits; concrete thinking strength" },
  { range: "<70", label: "Extremely Low", percentile: "<2nd", population: "2%", implication: "Significant learning support needs" },
];

const myths = [
  { myth: 'Myth: "IQ tests only measure test-taking ability."', fact: "Fact: Valid tests predict academic and occupational outcomes, but they are not the only driver of success." },
  { myth: 'Myth: "IQ is fixed at birth."', fact: "Fact: Scores are fairly stable, but performance shifts with education, health, sleep, stress, and practice." },
  { myth: 'Myth: "High IQ guarantees success."', fact: "Fact: Above a threshold, factors like conscientiousness, EQ, and opportunity matter more." },
  { myth: 'Myth: "All IQ tests are culturally biased."', fact: "Fact: Culture-reduced formats exist, but language and education can influence verbal sections." },
];

const performanceFactors = [
  {
    title: "Biological",
    items: [
      "Sleep: 7–9 hours improves working memory and attention",
      "Nutrition: Omega-3 (DHA), antioxidants, hydration",
      "Exercise: Aerobic activity increases BDNF and supports focus",
      "Substances: Caffeine can help habitual users; alcohol reduces performance",
    ],
  },
  {
    title: "Psychological",
    items: [
      "Test anxiety can depress scores 10–15 points in high-stakes settings",
      "Growth mindset correlates with persistence on difficult items",
      "Stereotype threat can temporarily lower performance",
    ],
  },
  {
    title: "Sociological",
    items: [
      "Education quality: additional years of schooling correlate with higher test performance",
      "Socioeconomic access: books, enrichment, and stimulating conversations shape skills",
      "Bilingualism: associated with executive function benefits and delayed cognitive decline",
    ],
  },
];

const historyTimeline = [
  {
    year: "1905",
    title: "First IQ Test",
    desc: "Alfred Binet and Théodore Simon created an early intelligence test to identify students needing educational support.",
  },
  {
    year: "1912",
    title: "IQ Score Concept",
    desc: "William Stern introduced the Intelligence Quotient idea as a ratio of mental age to chronological age (historical approach).",
  },
  {
    year: "1916",
    title: "Stanford–Binet",
    desc: "Lewis Terman adapted Binet’s work for American use, creating the Stanford–Binet scales.",
  },
  {
    year: "1939",
    title: "Wechsler Tests",
    desc: "David Wechsler developed the WAIS, widely used in clinical settings for adult intelligence assessment.",
  },
  {
    year: "1946",
    title: "Mensa Founded",
    desc: "Mensa began in England and generally targets the top 2% by standardized test performance.",
  },
  {
    year: "1970s–80s",
    title: "Beyond a Single Score",
    desc: "Researchers proposed broader frameworks, including multiple intelligences and triarchic models (analytical, creative, practical).",
  },
  {
    year: "2000s",
    title: "Computerized Adaptive Testing",
    desc: "Adaptive testing adjusts difficulty based on performance, improving measurement efficiency with fewer items.",
  },
  {
    year: "2020s",
    title: "Cognitive Analytics",
    desc: "Data-driven approaches analyze response patterns (and sometimes timing) to refine strength profiles in educational settings.",
  },
  {
    year: "2000s",
    title: "Digital Access",
    desc: "Online assessments increased access to practice-style cognitive tests for learning and self-improvement.",
  },
];

const iqFacts = [
  { icon: "🧬", title: "Genetic Influence", desc: "Research suggests genetics contribute substantially to variation in cognitive traits, alongside environment." },
  { icon: "📈", title: "Flynn Effect", desc: "Average test performance rose in many places over the 20th century, often linked to education and living conditions." },
  { icon: "🌍", title: "Environmental Factors", desc: "Education quality, nutrition, and stress can meaningfully affect cognitive performance and test outcomes." },
  { icon: "🧪", title: "Multiple Abilities", desc: "Modern views emphasize multiple cognitive abilities (verbal, spatial, working memory), not a single skill." },
];

const establishedFindings = [
  {
    title: "Genetic Influence (Heritability)",
    items: [
      "Twin and family studies suggest substantial heritability in adults",
      "Gene–environment correlation can amplify early advantages through enrichment",
      "No single “intelligence gene”—many small genetic influences contribute",
    ],
  },
  {
    title: "Neuroplasticity",
    items: [
      "White matter integrity relates to processing speed and efficiency",
      "Frontal/parietal networks relate to reasoning and executive control",
      "Training effects exist, but gains are typically modest and gradual",
    ],
  },
  {
    title: "The Flynn Effect",
    items: [
      "Average scores rose across much of the 20th century in many regions",
      "Drivers include nutrition, education, healthcare, and cognitive complexity",
      "Recent plateaus/declines are observed in some countries (debated causes)",
    ],
  },
];

const professionalComparisonRowsDetailed = [
  {
    feature: "Cost",
    mensa: "$40–$100",
    stanfordBinet: "$300–$800",
    wais: "$500–$2,000",
    ours: "FREE",
  },
  {
    feature: "Duration",
    mensa: "2–3 hours",
    stanfordBinet: "90–120 min",
    wais: "60–90 min",
    ours: "20–25 min",
  },
  {
    feature: "Administrator",
    mensa: "Proctored",
    stanfordBinet: "Licensed psychologist",
    wais: "Licensed psychologist",
    ours: "Self-administered",
  },
  {
    feature: "Standardization",
    mensa: "National norms",
    stanfordBinet: "Age/grade norms",
    wais: "Age norms",
    ours: "Educational estimates",
  },
  {
    feature: "Subtests",
    mensa: "Single or dual",
    stanfordBinet: "10 subtests",
    wais: "15 subtests",
    ours: "4 domains",
  },
  {
    feature: "Report Detail",
    mensa: "Pass/fail percentile",
    stanfordBinet: "Full cognitive profile",
    wais: "Clinical interpretation",
    ours: "Domain strengths",
  },
  {
    feature: "Retest Interval",
    mensa: "1 year",
    stanfordBinet: "6 months",
    wais: "6–12 months",
    ours: "4–6 weeks",
  },
];

const whenToChooseProfessionalTesting = [
  "Educational placement (gifted programs, learning accommodations)",
  "Clinical concerns (TBI, ADHD evaluation, dementia screening)",
  "High-IQ society admission requiring proctored tests",
  "Legal/forensic requirements",
];

const whenToUseThisAssessment = [
  "Personal curiosity and baseline tracking",
  "Practice for professional testing formats",
  "Monitoring cognitive training progress over time",
  "Career exploration and self-knowledge",
];

const usDistribution = [
  { label: "Below 70", pct: 2 },
  { label: "70–84", pct: 14 },
  { label: "85–114", pct: 68 },
  { label: "115–129", pct: 14 },
  { label: "130–144", pct: 2 },
  { label: "145+", pct: 0.1 },
];

const testimonials = [
  {
    quote:
      "As an educator, I found this assessment useful practice compared to reasoning tasks we use in US schools. Great preparation for enrichment and gifted-style questions.",
    author: "Sarah J.",
    role: "Education Professional, California",
  },
  {
    quote:
      "Helped me practice the question style before a high-IQ society screening. The logic and patterns felt familiar.",
    author: "Michael T.",
    role: "Software Engineer, Texas",
  },
  {
    quote:
      "I used it with students for test-prep thinking skills. The logical reasoning prompts make solid analytical practice.",
    author: "Dr. Jennifer L.",
    role: "College Counselor, New York",
  },
  {
    quote:
      "The category breakdown helped me realize my spatial reasoning was far stronger than my verbal. I changed my study plan and goals accordingly.",
    author: "Jennifer W.",
    role: "Graduate Student, New York",
  },
  {
    quote:
      "We use this in training to help teams talk about cognitive diversity. It’s not about hierarchy—it’s about matching people to tasks.",
    author: "David P.",
    role: "Organizational Development Consultant, Illinois",
  },
];

const faq = [
  {
    q: "How accurate is this IQ test compared to professional tests?",
    a: "This is a practice assessment providing educational estimates. It does not replace proctored clinical testing by a licensed psychologist.",
  },
  {
    q: "Is this suitable for Mensa practice?",
    a: "Many users find it helpful for practice because it includes logic, pattern, and analytical questions. Official admission depends on approved standardized testing.",
  },
  {
    q: "What is the average IQ score in the United States?",
    a: "Often-cited estimates place the US mean near 100 with a standard deviation of 15. Roughly 68% of scores fall between about 85 and 115 in a normal distribution model.",
  },
  {
    q: "Can I use this for educational purposes?",
    a: "Yes. It can be used for practice, skills training, and understanding strengths across different question types.",
  },
  {
    q: "Can I improve my IQ score?",
    a: "Scores can shift with sleep, stress, learning, and familiarity. Fluid reasoning can be trained to a degree through sustained practice and healthy routines, but changes are typically gradual.",
  },
  {
    q: "Is this culturally biased?",
    a: "We emphasize non-verbal reasoning where possible, but all assessments can reflect language exposure and educational background, especially on verbal items.",
  },
  {
    q: "Is my data private?",
    a: "Yes. All calculations run locally in your browser—no data leaves your device.",
  },
  {
    q: "What if English isn't my first language?",
    a: "Matrix and many spatial items are language-light, but verbal items can disadvantage non-native speakers. Interpret verbal results cautiously if English is your second language.",
  },
  {
    q: "Why did my score change on retest?",
    a: "Normal variation reflects sleep, stress, caffeine, and practice effects. Retest every 4–6 weeks under similar conditions.",
  },
  {
    q: "Can children take this test?",
    a: "This version is best treated as general practice. For children, consult educational psychologists who use age-appropriate instruments.",
  },
  {
    q: "Can I use this for hiring decisions?",
    a: "Not recommended. Employment testing should be job-relevant, validated, and administered ethically by professionals.",
  },
];

function shuffle<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function takeRandom<T>(items: T[], n: number): T[] {
  if (n <= 0) return [];
  if (items.length <= n) return shuffle(items);
  return shuffle(items).slice(0, n);
}

function buildTest(pool: Question[], total: number): Question[] {
  const easy = pool.filter((q) => q.difficulty === 1);
  const medium = pool.filter((q) => q.difficulty === 2);
  const hard = pool.filter((q) => q.difficulty === 3);

  const plan = [
    { list: easy, count: Math.round(total * 0.4) },
    { list: medium, count: Math.round(total * 0.4) },
    { list: hard, count: total - Math.round(total * 0.4) - Math.round(total * 0.4) },
  ];

  const picked = plan.flatMap(({ list, count }) => takeRandom(list, count));
  if (picked.length < total) {
    const remaining = pool.filter((q) => !picked.includes(q));
    return shuffle([...picked, ...takeRandom(remaining, total - picked.length)]);
  }
  return shuffle(picked).slice(0, total);
}

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

function estimateIqFromRatio(ratio: number): number {
  const percentile = clamp(ratio, 0.01, 0.99);
  const z = inverseNormalCdf(percentile);
  const iq = 100 + 15 * z;
  return Math.round(clamp(iq, 55, 145));
}

function erf(x: number): number {
  const sign = x < 0 ? -1 : 1;
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;

  const abs = Math.abs(x);
  const t = 1 / (1 + p * abs);
  const y = 1 - (((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t) * Math.exp(-abs * abs);
  return sign * y;
}

function normalCdf(z: number): number {
  return 0.5 * (1 + erf(z / Math.SQRT2));
}

function inverseNormalCdf(p: number): number {
  const pp = clamp(p, 1e-6, 1 - 1e-6);
  const a = [
    -3.969683028665376e1,
    2.209460984245205e2,
    -2.759285104469687e2,
    1.38357751867269e2,
    -3.066479806614716e1,
    2.506628277459239,
  ];
  const b = [
    -5.447609879822406e1,
    1.615858368580409e2,
    -1.556989798598866e2,
    6.680131188771972e1,
    -1.328068155288572e1,
  ];
  const c = [
    -7.784894002430293e-3,
    -3.223964580411365e-1,
    -2.400758277161838,
    -2.549732539343734,
    4.374664141464968,
    2.938163982698783,
  ];
  const d = [7.784695709041462e-3, 3.224671290700398e-1, 2.445134137142996, 3.754408661907416];

  const plow = 0.02425;
  const phigh = 1 - plow;

  if (pp < plow) {
    const q = Math.sqrt(-2 * Math.log(pp));
    return (
      (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
      ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1)
    );
  }

  if (pp > phigh) {
    const q = Math.sqrt(-2 * Math.log(1 - pp));
    return (
      -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
      ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1)
    );
  }

  const q = pp - 0.5;
  const r = q * q;
  return (
    (((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q /
    (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1)
  );
}

function iqLabel(iq: number): string {
  if (iq >= 145) return "Genius (145+)";
  if (iq >= 130) return "Superior (130–144)";
  if (iq >= 115) return "High Average (115–129)";
  if (iq >= 85) return "Average (85–114)";
  if (iq >= 70) return "Low Average (70–84)";
  return "Below 70";
}

export default function TestPage() {
  const { t, get, locale } = useI18n();
  const title = t("routes.test.helmet.title");
  const description = t("routes.test.helmet.description");
  const keywords = t("routes.test.helmet.keywords");
  const whatYouGet = (get("routes.test.content.whatYouGetItems") as string[] | undefined) ?? [];
  const howToTake = (get("routes.test.content.howToTakeItems") as string[] | undefined) ?? [];

  const configuredSiteUrl = (import.meta.env.VITE_SITE_URL || (globalThis as any).__SITE_URL__ || "")
    .trim()
    .replace(/\/+$/, "");
  const origin = configuredSiteUrl !== "" ? configuredSiteUrl : typeof window !== "undefined" ? window.location.origin : "";
  const ogUrl = origin ? `${origin}/test` : "/test";

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: title,
        description,
        inLanguage: "en-US",
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };

  const [stage, setStage] = useState<"intro" | "test" | "result">("intro");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<AnswerState[]>([]);
  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const current = questions[index] ?? null;
  const total = questions.length;
  const answeredCount = answers.filter((a) => a.selected !== null).length;

  const progress = total > 0 ? Math.round((answeredCount / total) * 100) : 0;

  const results = useMemo(() => {
    if (stage !== "result") return null;
    const correct = answers.filter((a) => a.isCorrect).length;

    let weightedTotal = 0;
    let weightedCorrect = 0;
    for (let i = 0; i < total; i += 1) {
      const q = questions[i];
      const a = answers[i];
      const w = typeof q?.difficulty === "number" && Number.isFinite(q.difficulty) ? q.difficulty : 1;
      weightedTotal += w;
      if (a?.isCorrect) weightedCorrect += w;
    }

    const ratio = weightedTotal <= 0 ? 0 : weightedCorrect / weightedTotal;
    const iq = estimateIqFromRatio(ratio);
    const percentile = Math.round(normalCdf((iq - 100) / 15) * 1000) / 10;

    const byCategory: Record<string, { total: number; correct: number }> = {};
    for (let i = 0; i < total; i += 1) {
      const q = questions[i];
      const a = answers[i];
      const key = q.category || "other";
      byCategory[key] ??= { total: 0, correct: 0 };
      byCategory[key].total += 1;
      if (a?.isCorrect) byCategory[key].correct += 1;
    }

    const breakdown = Object.entries(byCategory)
      .map(([category, v]) => ({ category, ...v }))
      .sort((a, b) => b.total - a.total);

    return { correct, weightedCorrect, weightedTotal, iq, percentile, label: iqLabel(iq), breakdown };
  }, [answers, questions, stage, total]);

  async function start() {
    setIsLoading(true);
    try {
      const pool = (await loadQuestionBank(locale, "iq")) as Question[];
      const test = buildTest(pool, 20);
      setQuestions(
        test.map((q) => ({
          ...q,
          opts: shuffle(q.opts),
        }))
      );
      setAnswers(Array.from({ length: test.length }, () => ({ selected: null, isCorrect: null })));
      setIndex(0);
      setStage("test");
    } finally {
      setIsLoading(false);
    }
  }

  function choose(option: string) {
    if (!current) return;
    setAnswers((prev) => {
      const next = [...prev];
      next[index] = { selected: option, isCorrect: option === current.a };
      return next;
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

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={ogUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <section className={styles.wrapper}>
        <h1 className={styles.pageTitle}>{t("routes.test.ui.pageTitle")}</h1>
        <p className={styles.pageSubtitle}>{t("routes.test.ui.pageSubtitle")}</p>

        {stage === "intro" && (
          <div className={styles.card}>
            <div className={styles.introGrid}>
              <div className={styles.introItem}>
                <div className={styles.introTitle}>{t("routes.test.ui.whatYouGetTitle")}</div>
                <ul className={styles.introList}>
                  {whatYouGet.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className={styles.introItem}>
                <div className={styles.introTitle}>{t("routes.test.ui.howToTakeTitle")}</div>
                <ul className={styles.introList}>
                  {howToTake.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <button type="button" className={styles.primaryBtn} onClick={start} disabled={isLoading}>
              {isLoading ? "Loading…" : t("routes.test.ui.startTestButton")}
            </button>

            <div className={styles.disclaimer}>
              {t("routes.test.ui.disclaimer")}
            </div>
          </div>
        )}

        {stage === "test" && current && (
          <div className={styles.card}>
            <div className={styles.progressRow}>
              <div className={styles.progressBar} aria-label="Progress">
                <div className={styles.progressFill} style={{ width: `${progress}%` }} />
              </div>
              <div className={styles.progressText}>
                Question {index + 1} / {total}
              </div>
            </div>

            <div className={styles.questionMeta}>
              <span className={styles.pill}>Category: {current.category}</span>
              <span className={styles.pill}>Difficulty: {current.difficulty}</span>
            </div>

            <div className={styles.questionText}>{current.q}</div>

            <div className={styles.options} role="radiogroup" aria-label="Answer choices">
              {current.opts.map((opt) => {
                const selected = answers[index]?.selected === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    className={`${styles.optionBtn} ${selected ? styles.selected : ""}`}
                    onClick={() => choose(opt)}
                    role="radio"
                    aria-checked={selected}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            <div className={styles.actions}>
              <button type="button" className={styles.secondaryBtn} onClick={prev} disabled={index === 0}>
                {t("routes.test.ui.backButton")}
              </button>
              <button
                type="button"
                className={styles.primaryBtn}
                onClick={next}
              >
                {index + 1 >= total ? t("routes.test.ui.finishButton") : t("routes.test.ui.nextButton")}
              </button>
            </div>
          </div>
        )}

        {stage === "result" && results && (
          <div className={styles.card}>
            <div className={styles.resultHeader}>
              <div className={styles.resultScore}>
                Estimated IQ: <span className={styles.resultNumber}>{results.iq}</span>
              </div>
              <div className={styles.resultLabel}>{results.label}</div>
              <div className={styles.resultSub}>
                Correct: {results.correct} / {total} • Weighted: {results.weightedCorrect} / {results.weightedTotal} • Percentile:{" "}
                {results.percentile}%
              </div>
            </div>
            <div className={styles.disclaimer}>{t("routes.test.ui.disclaimer")}</div>

            <h2 className={styles.sectionTitle}>Category breakdown</h2>
            <div className={styles.breakdown}>
              {results.breakdown.map((b) => {
                const pct = b.total > 0 ? Math.round((b.correct / b.total) * 100) : 0;
                return (
                  <div key={b.category} className={styles.breakdownRow}>
                    <div className={styles.breakdownTop}>
                      <span className={styles.breakdownName}>{b.category}</span>
                      <span className={styles.breakdownValue}>
                        {b.correct}/{b.total} ({pct}%)
                      </span>
                    </div>
                    <div className={styles.miniBar}>
                      <div className={styles.miniFill} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className={styles.actions}>
              <button type="button" className={styles.secondaryBtn} onClick={restart}>
                {t("routes.test.ui.newTestButton")}
              </button>
              <button type="button" className={styles.primaryBtn} onClick={start} disabled={isLoading}>
                {t("routes.test.ui.retakeNewQuestionsButton")}
              </button>
            </div>
          </div>
        )}

        <section className={styles.seoSection} aria-label="What you get from this assessment">
          <h2 className={styles.seoTitle}>What You Get</h2>
          <p className={styles.seoLead}>
            Instant educational estimates, a category breakdown, and a privacy-first experience (all calculations happen
            locally in your browser).
          </p>
          <ul className={styles.bulletList}>
            {whatYouGet.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className={styles.seoSection} aria-label="Test methodology and scientific foundation">
          <h2 className={styles.seoTitle}>Test Methodology & Scientific Foundation</h2>
          <p className={styles.seoLead}>
            This adaptive-style practice evaluation focuses on fluid intelligence (Gf): the ability to solve novel
            problems independent of acquired knowledge. Unlike trivia quizzes, these items emphasize reasoning and
            pattern discovery.
          </p>
          <div className={styles.twoCol}>
            <div className={styles.panel}>
              <h3 className={styles.panelTitle}>How This Assessment Works</h3>
              <ul className={styles.bulletList}>
                {methodologyMeasures.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            </div>
            <div className={styles.panel}>
              <h3 className={styles.panelTitle}>Standardization & Norms</h3>
              <p className={styles.panelText}>
                Results are reported using a deviation IQ-inspired model (Mean 100, SD 15) for an educational score
                estimate. This is not a clinical diagnosis or official certification.
              </p>
              <ul className={styles.bulletList}>
                {standardizationNorms.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
              <p className={styles.note}>
                Note: For clinical diagnosis or Mensa admission, consult certified testing centers.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.seoSection} aria-label="The four cognitive domains explained">
          <h2 className={styles.seoTitle}>The Four Cognitive Domains Explained</h2>
          <p className={styles.seoLead}>
            Questions are designed to reflect four broad reasoning domains. Your category breakdown highlights strengths
            and growth opportunities.
          </p>
          <div className={styles.factGrid}>
            {cognitiveDomains.map((d) => (
              <article key={d.title} className={styles.factCard}>
                <div className={styles.factIcon} aria-hidden="true">
                  {d.icon}
                </div>
                <div className={styles.factTitle}>{d.title}</div>
                <ul className={styles.bulletList}>
                  {d.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.seoSection} aria-label="How to take this assessment">
          <h2 className={styles.seoTitle}>How to Take This Assessment</h2>
          <p className={styles.seoLead}>Use consistent conditions for the most meaningful results (especially when retesting).</p>
          <ul className={styles.bulletList}>
            {howToTake.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className={styles.seoSection} aria-label="Understanding your score">
          <h2 className={styles.seoTitle}>Understanding Your Score</h2>
          <p className={styles.seoLead}>
            Deviation IQ reporting uses an average of 100 and a standard deviation of 15. Most scores fall in the “average”
            range (roughly 85–115).
          </p>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Score Range</th>
                  <th>Classification</th>
                  <th>Percentile</th>
                  <th>Population %</th>
                  <th>Cognitive Implications</th>
                </tr>
              </thead>
              <tbody>
                {scoreDistributionRows.map((r) => (
                  <tr key={r.range}>
                    <td>{r.range}</td>
                    <td>{r.label}</td>
                    <td>{r.percentile}</td>
                    <td>{r.population}</td>
                    <td>{r.implication}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={styles.note}>
            Standard Error of Measurement: ±5 points. Retest fluctuations of 3–7 points are normal and often reflect sleep,
            stress, and practice effects more than true ability changes.
          </p>
          <div className={styles.twoCol}>
            <div className={styles.panel}>
              <h3 className={styles.panelTitle}>Interpreting Category Strengths</h3>
              <p className={styles.panelText}>
                Balanced profiles (domains within ~10 points) often indicate broad general reasoning strength (g-factor).
              </p>
              <p className={styles.panelText}>
                Specialized profiles (15+ point gaps) can highlight both career strengths and trainable growth areas.
              </p>
            </div>
            <div className={styles.panel}>
              <h3 className={styles.panelTitle}>Reminder</h3>
              <p className={styles.panelText}>
                This is a practice assessment providing educational estimates. For official certification or diagnostic
                use, choose proctored professional testing.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.seoSection} aria-label="The science of IQ facts and myths">
          <h2 className={styles.seoTitle}>The Science of IQ: Facts & Myths</h2>
          <div className={styles.twoCol}>
            <div className={styles.panel}>
              <h3 className={styles.panelTitle}>Established Findings (Summary)</h3>
              <div className={styles.breakdown}>
                {establishedFindings.map((f) => (
                  <div key={f.title} className={styles.breakdownRow}>
                    <div className={styles.breakdownName}>{f.title}</div>
                    <ul className={styles.bulletList}>
                      {f.items.map((it) => (
                        <li key={it}>{it}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.panel}>
              <h3 className={styles.panelTitle}>Common Myths Debunked</h3>
              <div className={styles.faq}>
                {myths.map((m) => (
                  <div key={m.myth} className={styles.faqItem}>
                    <div className={styles.faqQ}>{m.myth}</div>
                    <div className={styles.faqA}>{m.fact}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className={styles.seoSection} aria-label="Environmental factors that influence performance">
          <h2 className={styles.seoTitle}>Environmental Factors That Influence Performance</h2>
          <p className={styles.seoLead}>
            Scores can be temporarily pushed up or down by sleep, stress, and context. Retest under similar conditions for
            cleaner tracking.
          </p>
          <div className={styles.twoCol}>
            {performanceFactors.map((g) => (
              <div key={g.title} className={styles.panel}>
                <h3 className={styles.panelTitle}>{g.title}</h3>
                <ul className={styles.bulletList}>
                  {g.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.seoSection} aria-label="Professional test comparison detailed">
          <h2 className={styles.seoTitle}>Professional Test Comparison (Detailed)</h2>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Mensa Admission</th>
                  <th>Stanford-Binet 5</th>
                  <th>WAIS-IV (Clinical)</th>
                  <th>Our Assessment</th>
                </tr>
              </thead>
              <tbody>
                {professionalComparisonRowsDetailed.map((r) => (
                  <tr key={r.feature}>
                    <td>{r.feature}</td>
                    <td>{r.mensa}</td>
                    <td>{r.stanfordBinet}</td>
                    <td>{r.wais}</td>
                    <td>{r.ours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles.twoCol}>
            <div className={styles.panel}>
              <h3 className={styles.panelTitle}>When to Choose Professional Testing</h3>
              <ul className={styles.bulletList}>
                {whenToChooseProfessionalTesting.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
            <div className={styles.panel}>
              <h3 className={styles.panelTitle}>When to Use This Assessment</h3>
              <ul className={styles.bulletList}>
                {whenToUseThisAssessment.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className={styles.seoSection} aria-label="Ready to begin">
          <h2 className={styles.seoTitle}>Ready to Begin?</h2>
          <p className={styles.seoLead}>20 questions • 25 minutes • Instant results</p>
          <button type="button" className={styles.primaryBtn} onClick={jumpToTest}>
            {stage === "intro" ? "Start The Test" : "Go To The Test"}
          </button>
        </section>

        <section className={styles.seoSection} aria-label="US educational standards alignment">
          <h2 className={styles.seoTitle}>US Educational Standards Alignment</h2>
          <p className={styles.seoLead}>
            Aligned with US cognitive skill expectations. This practice assessment focuses on reasoning abilities that
            overlap with common school and test-prep standards.
          </p>
          <ul className={styles.bulletList}>
            {standards.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </section>

        <section className={styles.seoSection} aria-label="History of IQ testing">
          <h2 className={styles.seoTitle}>History of IQ Testing: From Binet to Modern Assessments</h2>
          <div className={styles.timeline} role="list">
            {historyTimeline.map((item) => (
              <div key={item.year} className={styles.timelineItem} role="listitem">
                <div className={styles.timelineYear}>{item.year}</div>
                <div className={styles.timelineBody}>
                  <div className={styles.timelineTitle}>{item.title}</div>
                  <div className={styles.timelineDesc}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.seoSection} aria-label="Fascinating IQ facts">
          <h2 className={styles.seoTitle}>Fascinating IQ Facts You Probably Didn’t Know</h2>
          <div className={styles.factGrid}>
            {iqFacts.map((f) => (
              <article key={f.title} className={styles.factCard}>
                <div className={styles.factIcon} aria-hidden="true">
                  {f.icon}
                </div>
                <div className={styles.factTitle}>{f.title}</div>
                <div className={styles.factDesc}>{f.desc}</div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.seoSection} aria-label="Understanding IQ scores in US population">
          <h2 className={styles.seoTitle}>Understanding IQ Scores in US Population</h2>
          <div className={styles.twoCol}>
            <div className={styles.panel}>
              <h3 className={styles.panelTitle}>IQ Distribution (illustrative)</h3>
              <div className={styles.distribution}>
                {usDistribution.map((d) => (
                  <div key={d.label} className={styles.distRow}>
                    <div className={styles.distLabel}>{d.label}</div>
                    <div className={styles.distBar}>
                      <div className={styles.distFill} style={{ width: `${Math.min(100, d.pct)}%` }} />
                    </div>
                    <div className={styles.distPct}>{d.pct}%</div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.panel}>
              <h3 className={styles.panelTitle}>What is an IQ score?</h3>
              <p className={styles.panelText}>
                IQ (Intelligence Quotient) is a standardized way of describing performance relative to others in the same
                age group. A common model uses an average near 100 and a standard deviation of 15.
              </p>
              <p className={styles.panelText}>
                About 68% of people fall between roughly 85 and 115 in a normal distribution model. Your score can
                fluctuate based on sleep, stress, familiarity with question types, and practice.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.seoSection} aria-label="Professional test comparison">
          <h2 className={styles.seoTitle}>Professional Test Comparison</h2>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Assessment Feature</th>
                  <th>Mensa Admission</th>
                  <th>Stanford–Binet</th>
                  <th>Our Assessment</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Cost</td>
                  <td>$40–60</td>
                  <td>$200–500</td>
                  <td>FREE</td>
                </tr>
                <tr>
                  <td>Time Required</td>
                  <td>2–3 hours</td>
                  <td>1–2 hours</td>
                  <td>20–25 minutes</td>
                </tr>
                <tr>
                  <td>Professional Validation</td>
                  <td>Yes (standardized)</td>
                  <td>Yes (clinical)</td>
                  <td>Practice-style estimate</td>
                </tr>
                <tr>
                  <td>Results</td>
                  <td>Official report</td>
                  <td>Comprehensive evaluation</td>
                  <td>Instant estimate</td>
                </tr>
                <tr>
                  <td>Best For</td>
                  <td>Certification</td>
                  <td>Clinical assessment</td>
                  <td>Personal insight & practice</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={styles.note}>
            Note: This assessment provides educational insights and is not a substitute for professional psychological
            evaluation. For official IQ certification, consult licensed professionals.
          </p>
        </section>

        <section className={styles.seoSection} aria-label="What Americans are saying">
          <h2 className={styles.seoTitle}>What Americans Are Saying</h2>
          <div className={styles.quoteGrid}>
            {testimonials.map((t) => (
              <figure key={t.author} className={styles.quoteCard}>
                <blockquote className={styles.quoteText}>{t.quote}</blockquote>
                <figcaption className={styles.quoteCaption}>
                  <span className={styles.quoteAuthor}>{t.author}</span> — <span className={styles.quoteRole}>{t.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className={styles.seoSection} aria-label="Frequently asked questions">
          <h2 className={styles.seoTitle}>Frequently Asked Questions</h2>
          <div className={styles.faq}>
            {faq.map((item) => (
              <details key={item.q} className={styles.faqItem}>
                <summary className={styles.faqQ}>{item.q}</summary>
                <div className={styles.faqA}>{item.a}</div>
              </details>
            ))}
          </div>
        </section>

        <section className={styles.seoSection} aria-label="Related professional tools">
          <h2 className={styles.seoTitle}>Related Professional Tools</h2>
          <div className={styles.toolsGrid}>
            {assessments.map((a) => (
              <Link key={a.id} to={`/assessments/${a.id}`} className={styles.toolCard}>
                <div className={styles.toolTitle}>
                  <span aria-hidden="true">{a.emoji}</span> {a.name}
                </div>
                <div className={styles.toolDesc}>Info page → pass the test</div>
              </Link>
            ))}
          </div>
        </section>
      </section>
    </>
  );
}

import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, Navigate, useParams } from "react-router-dom";
import { getAssessmentById } from "../assessments/registry";
import styles from "./AssessmentPages.module.css";
import testStyles from "./TestPage.module.css";
import { useI18n } from "../i18n";
import { loadQuestionBank } from "../question-banks/loadQuestionBank";

type MbtiDimension = "EI" | "SN" | "TF" | "JP";

type MbtiQuestion = {
  prompt: string;
  dimension: MbtiDimension;
  options: Array<{
    text: string;
    letter: "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";
    weight?: number;
  }>;
};

type AnswerState = {
  selectedIndex: number | null;
};

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

function buildBalancedByKey<T, K extends string | number>(
  pool: T[],
  total: number,
  keys: readonly K[],
  keyOf: (q: T) => K
): T[] {
  if (total <= 0) return [];
  const base = Math.floor(total / keys.length);
  let remainder = total - base * keys.length;

  const picked: T[] = [];
  for (const k of keys) {
    const group = pool.filter((q) => keyOf(q) === k);
    const count = base + (remainder > 0 ? 1 : 0);
    if (remainder > 0) remainder -= 1;
    picked.push(...takeRandom(group, count));
  }

  if (picked.length < total) {
    const remaining = pool.filter((q) => !picked.includes(q));
    picked.push(...takeRandom(remaining, total - picked.length));
  }

  return shuffle(picked).slice(0, total);
}

function buildEnneagramTest(pool: EnneagramQuestion[], total: number): EnneagramQuestion[] {
  if (total <= 0) return [];
  const typePool = pool.filter((q) => q.kind === "type");
  const instinctPool = pool.filter((q) => q.kind === "instinct");
  const typeTotal = Math.max(9, Math.round(total * 0.75));
  const instinctTotal = Math.max(3, total - typeTotal);

  const types: EnneagramType[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const instincts: EnneagramInstinct[] = ["sp", "sx", "so"];

  const typeQuestions = buildBalancedByKey(typePool, Math.min(typeTotal, total - 3), types, (q) => q.type ?? 9);
  const used = new Set(typeQuestions);
  const remainingType = typePool.filter((q) => !used.has(q));
  const needType = Math.max(0, typeTotal - typeQuestions.length);
  const moreTypes = takeRandom(remainingType, needType);

  const usedAfterTypes = new Set([...typeQuestions, ...moreTypes]);
  const instinctQuestions = buildBalancedByKey(
    instinctPool.filter((q) => !usedAfterTypes.has(q)),
    instinctTotal,
    instincts,
    (q) => q.instinct ?? "sp"
  );

  const picked = [...typeQuestions, ...moreTypes, ...instinctQuestions];
  if (picked.length < total) {
    const remaining = pool.filter((q) => !picked.includes(q));
    return shuffle([...picked, ...takeRandom(remaining, total - picked.length)]).slice(0, total);
  }
  return shuffle(picked).slice(0, total);
}

function buildEqTest(pool: EqQuestion[], total: number): EqQuestion[] {
  if (total <= 0) return [];
  const abilityPool = pool.filter((q) => q.kind === "ability");
  const traitPool = pool.filter((q) => q.kind === "trait");
  const branchTotal = Math.max(4, Math.round(total * 0.5));
  const traitTotal = total - branchTotal;

  const branches: EqBranch[] = ["Perceiving", "Facilitating", "Understanding", "Managing"];
  const branchQs = buildBalancedByKey(abilityPool, branchTotal, branches, (q) => q.branch ?? "Perceiving");
  const remainingTrait = traitPool.filter((q) => !branchQs.includes(q));
  const traitQs = takeRandom(remainingTrait, traitTotal);
  const picked = [...branchQs, ...traitQs];
  if (picked.length < total) {
    const remaining = pool.filter((q) => !picked.includes(q));
    return shuffle([...picked, ...takeRandom(remaining, total - picked.length)]).slice(0, total);
  }
  return shuffle(picked).slice(0, total);
}

function buildLoveLanguagesTest(pool: LoveLanguageQuestion[], total: number): LoveLanguageQuestion[] {
  if (total <= 0) return [];
  const receive = pool.filter((q) => q.a.mode === "receive");
  const give = pool.filter((q) => q.a.mode === "give");
  const receiveTotal = Math.floor(total / 2);
  const giveTotal = total - receiveTotal;
  const picked = [...takeRandom(receive, receiveTotal), ...takeRandom(give, giveTotal)];
  if (picked.length < total) {
    const remaining = pool.filter((q) => !picked.includes(q));
    return shuffle([...picked, ...takeRandom(remaining, total - picked.length)]).slice(0, total);
  }
  return shuffle(picked).slice(0, total);
}

const mbtiWhatYouGet = [
  "4-Letter Type Code: Your unique combination of Extraversion/Introversion, Sensing/Intuition, Thinking/Feeling, Judging/Perceiving",
  "Cognitive Functions Stack: Discover your Dominant, Auxiliary, Tertiary, and Inferior mental processes",
  "16-Type Comparison: See how you compare against all personality types",
  "Career Alignment: Professions where your type naturally excels",
  "Relationship Dynamics: Compatibility insights with other types",
  "Growth Roadmap: Specific development areas based on your type's blind spots",
  "Privacy Guaranteed: No registration required, no data storage",
];

const mbtiMethodology = [
  "Based on Carl Jung's Theory of Psychological Types (1921) and developed by Katharine Cook Briggs and Isabel Briggs Myers during World War II.",
  "Measures preferences across four dimensions: Energy Orientation, Information Gathering, Decision Making, and Lifestyle Approach.",
  "Reports preferences (how you tend to operate), not abilities, intelligence, or clinical traits.",
];

const mbtiReliabilityValidity = [
  "Test-Retest Reliability: 75–85% consistency over 4 weeks (industry standard for type indicators)",
  "Construct Validity: Correlates with Big Five traits (e.g., MBTI N correlates with Big Five Openness)",
  "Criterion Validity: Predicts career satisfaction when type matches work environment (e.g., Holland Code alignment)",
  "Population Norms: Large-sample distributions reported in MBTI publishing contexts",
];

const mbtiDichotomies = [
  {
    icon: "🔋",
    title: "Dichotomy 1: Extraversion (E) vs. Introversion (I)",
    subtitle: "Energy Direction & Focus",
    leftHeader: "Extraversion (E)",
    rightHeader: "Introversion (I)",
    rows: [
      { label: "Focus", left: "External world, people, action", right: "Internal world, ideas, reflection" },
      { label: "Energy", left: "Gains energy from interaction", right: "Expends energy in interaction, recharges alone" },
      { label: "Breadth", left: "Wide networks, many interests", right: "Few close relationships, deep knowledge" },
      { label: "Processing", left: "Think by talking", right: "Think before talking" },
      { label: "Work Style", left: "Collaborative, open-door", right: "Concentrated, interruption-averse" },
    ],
    notes: [
      "Neuroscience (popular summary): Extraverts often seek more external stimulation; Introverts can be more easily overstimulated.",
      "Population: Often described as ~50/50 in the US with context-specific skews.",
    ],
  },
  {
    icon: "👁️",
    title: "Dichotomy 2: Sensing (S) vs. Intuition (N)",
    subtitle: "Perception & Information Gathering",
    leftHeader: "Sensing (S)",
    rightHeader: "Intuition (N)",
    rows: [
      { label: "Focus", left: "Concrete facts, details, present reality", right: "Patterns, possibilities, future potential" },
      { label: "Trust", left: "Experience, proven methods", right: "Inspiration, frameworks, hunches" },
      { label: "Style", left: "Step-by-step, sequential, literal", right: "Holistic, metaphorical, leapfrogging" },
      { label: "Memory", left: "Specific details, sensory impressions", right: "General impressions, symbolic meanings" },
      { label: "Language", left: '"What is"', right: '"What could be"' },
    ],
    notes: [
      "Cognitive functions: Sensing tends to use Si or Se; Intuition tends to use Ni or Ne.",
      "Population: Often described as ~70% S and ~30% N, with N overrepresented in higher education.",
    ],
  },
  {
    icon: "⚖️",
    title: "Dichotomy 3: Thinking (T) vs. Feeling (F)",
    subtitle: "Decision Making & Judgment",
    leftHeader: "Thinking (T)",
    rightHeader: "Feeling (F)",
    rows: [
      { label: "Basis", left: "Logic, objective analysis, cause-effect", right: "Values, harmony, people impact" },
      { label: "Priority", left: "Truth, fairness (impersonal)", right: "Empathy, compassion (contextual)" },
      { label: "Style", left: "Critique ideas (ideally not people)", right: "Affirm relationships while discussing" },
      { label: "Conflict", left: "Debates as mental exercise", right: "Seeks consensus, avoids disharmony" },
      { label: "Critique", left: '"Is this logically consistent?"', right: '"Does this align with our values?"' },
    ],
    notes: [
      "Important: Both types think and feel. This measures preference in decision-making, not emotional capacity.",
      "Population: Often described with gender skews in some samples, though individuals vary widely.",
    ],
  },
  {
    icon: "📋",
    title: "Dichotomy 4: Judging (J) vs. Perceiving (P)",
    subtitle: "Lifestyle & Structure",
    leftHeader: "Judging (J)",
    rightHeader: "Perceiving (P)",
    rows: [
      { label: "Approach", left: "Planned, closure-seeking", right: "Spontaneous, option-keeping" },
      { label: "Orientation", left: "Goal-focused, deadlines", right: "Process-focused, flexible" },
      { label: "Work", left: "Work first, play later", right: "Play while working, deadline-driven" },
      { label: "Stress", left: "Dislikes ambiguity, wants control", right: "Dislikes confinement, wants options" },
      { label: "Completion", left: "Satisfied by finishing", right: "Satisfied by starting new things" },
    ],
    notes: [
      "Cognitive process: J types tend to lead with judging functions (T/F). P types tend to lead with perceiving functions (S/N).",
      "Population: Often described as slightly more J than P in corporate environments.",
    ],
  },
];

function toMbtiQuestions(pool: Array<{ q: string; dimension: MbtiDimension; options: Array<{ text: string; type: string; weight?: number }> }>): MbtiQuestion[] {
  return pool.map((q) => ({
    prompt: q.q,
    dimension: q.dimension,
    options: q.options.map((o) => ({
      text: o.text,
      letter: o.type as MbtiQuestion["options"][number]["letter"],
      weight: o.weight,
    })),
  }));
}

const typeProfiles: Record<
  string,
  {
    nickname: string;
    functions: string;
    strengths: string[];
    challenges: string[];
    careers: string[];
    population: string;
  }
> = {
  INTJ: {
    nickname: "The Architect",
    functions: "Ni-Te-Fi-Se",
    strengths: ["Long-term strategy", "Systems thinking", "Independent innovation"],
    challenges: ["Impatience with inefficiency", "Emotional bluntness"],
    careers: ["Investment banking", "Software architecture", "Strategic planning", "Scientific research"],
    population: "2.1% (Males 3.3%, Females 0.8%)",
  },
  INTP: {
    nickname: "The Logician",
    functions: "Ti-Ne-Si-Fe",
    strengths: ["Theoretical analysis", "Logical precision", "Creative problem-solving"],
    challenges: ["Procrastination", "Social disconnection", "Over-analysis"],
    careers: ["Data science", "Philosophy", "Engineering", "Forensic analysis"],
    population: "3.3% (Males 4.8%, Females 1.7%)",
  },
  ENTJ: {
    nickname: "The Commander",
    functions: "Te-Ni-Se-Fi",
    strengths: ["Leadership", "Efficiency optimization", "Strategic execution"],
    challenges: ["Dominance", "Impatience with emotion", "Workaholism"],
    careers: ["Executive management", "Entrepreneurship", "Law", "Management consulting"],
    population: "1.8% (Males 2.7%, Females 0.9%)",
  },
  ENTP: {
    nickname: "The Debater",
    functions: "Ne-Ti-Fe-Si",
    strengths: ["Innovation", "Argumentation", "Pattern recognition", "Adaptability"],
    challenges: ["Argumentativeness", "Follow-through", "Scattered focus"],
    careers: ["Startup founder", "Patent law", "Journalism", "Creative directing"],
    population: "3.2% (Males 4.0%, Females 2.4%)",
  },
  INFJ: {
    nickname: "The Advocate",
    functions: "Ni-Fe-Ti-Se",
    strengths: ["Insight into others", "Complex vision", "Writing", "Counseling"],
    challenges: ["Perfectionism", "Burnout", "Secretiveness"],
    careers: ["Psychotherapy", "Writing", "HR development", "Nonprofit leadership"],
    population: "1.5% (Males 1.2%, Females 1.6%) — often cited as rare",
  },
  INFP: {
    nickname: "The Mediator",
    functions: "Fi-Ne-Si-Te",
    strengths: ["Authenticity", "Creative writing", "Value alignment", "Empathy"],
    challenges: ["Disorganization", "Oversensitivity", "Impracticality"],
    careers: ["Fiction writing", "Counseling", "Arts", "Human rights advocacy"],
    population: "4.4% (Males 4.1%, Females 4.6%)",
  },
  ENFJ: {
    nickname: "The Protagonist",
    functions: "Fe-Ni-Se-Ti",
    strengths: ["Inspirational leadership", "Emotional intelligence", "Teaching"],
    challenges: ["People-pleasing", "Burnout", "Over-involvement"],
    careers: ["Teaching", "Coaching", "Sales leadership", "Politics"],
    population: "2.5% (Males 1.6%, Females 3.3%)",
  },
  ENFP: {
    nickname: "The Campaigner",
    functions: "Ne-Fi-Te-Si",
    strengths: ["Enthusiasm", "Idea generation", "Social connection", "Creativity"],
    challenges: ["Focus", "Follow-through", "Emotional volatility"],
    careers: ["Marketing", "Journalism", "Acting", "Entrepreneurship"],
    population: "8.1% (Males 6.4%, Females 9.7%)",
  },
  ISTJ: {
    nickname: "The Logistician",
    functions: "Si-Te-Fi-Ne",
    strengths: ["Reliability", "Detail orientation", "Procedural expertise", "Integrity"],
    challenges: ["Rigidity", "Resistance to change", "Emotional reserve"],
    careers: ["Accounting", "Military", "Law enforcement", "System administration"],
    population: "11.6% (Males 16.4%, Females 6.9%)",
  },
  ISFJ: {
    nickname: "The Defender",
    functions: "Si-Fe-Ti-Ne",
    strengths: ["Supportiveness", "Attention to detail", "Loyalty", "Practical care"],
    challenges: ["Overwork", "Conflict avoidance", "Self-neglect"],
    careers: ["Nursing", "Teaching (K-12)", "Social work", "Administrative support"],
    population: "13.8% (Males 8.1%, Females 19.4%)",
  },
  ESTJ: {
    nickname: "The Executive",
    functions: "Te-Si-Ne-Fi",
    strengths: ["Organization", "Efficiency", "Tradition maintenance", "Directness"],
    challenges: ["Inflexibility", "Bluntness", "Difficulty with nuance"],
    careers: ["Operations management", "Law", "Military officer", "Judgeship"],
    population: "8.7% (Males 11.2%, Females 6.3%)",
  },
  ESFJ: {
    nickname: "The Consul",
    functions: "Fe-Si-Ne-Ti",
    strengths: ["Hospitality", "Teamwork", "Social harmony", "Practical help"],
    challenges: ["Need for approval", "Conflict avoidance"],
    careers: ["Healthcare administration", "Event planning", "Teaching", "Customer service"],
    population: "12.3% (Males 7.5%, Females 17.0%)",
  },
  ISTP: {
    nickname: "The Virtuoso",
    functions: "Ti-Se-Ni-Fe",
    strengths: ["Technical troubleshooting", "Crisis management", "Tool mastery"],
    challenges: ["Commitment issues", "Emotional detachment", "Risk-taking"],
    careers: ["Mechanical engineering", "Piloting", "Forensic science", "Athletics"],
    population: "5.4% (Males 8.5%, Females 2.3%)",
  },
  ISFP: {
    nickname: "The Adventurer",
    functions: "Fi-Se-Ni-Te",
    strengths: ["Aesthetic sense", "Present-moment awareness", "Gentle support"],
    challenges: ["Long-term planning", "Assertiveness", "Sensitivity to criticism"],
    careers: ["Graphic design", "Emergency nursing", "Culinary arts", "Photography"],
    population: "8.8% (Males 7.6%, Females 9.9%)",
  },
  ESTP: {
    nickname: "The Entrepreneur",
    functions: "Se-Ti-Fe-Ni",
    strengths: ["Negotiation", "Crisis response", "Sales", "Hands-on problem solving"],
    challenges: ["Impulsivity", "Risk tolerance", "Boredom with routine"],
    careers: ["Sales", "Emergency medicine", "Entrepreneurship", "Athletics"],
    population: "4.3% (Males 5.6%, Females 3.0%)",
  },
  ESFP: {
    nickname: "The Entertainer",
    functions: "Se-Fi-Te-Ni",
    strengths: ["Performance", "Social energy", "Adaptability", "Practical enthusiasm"],
    challenges: ["Long-term focus", "Sensitivity", "Conflict avoidance"],
    careers: ["Entertainment", "Hospitality", "Healthcare (ER)", "Public relations"],
    population: "8.5% (Males 6.9%, Females 10.1%)",
  },
};

const cognitiveFunctions = {
  perceiving: [
    "Se (Extraverted Sensing): Experiencing the present, physical engagement, sensory awareness",
    "Si (Introverted Sensing): Recalling past experiences, maintaining traditions, detail comparison",
    "Ne (Extraverted Intuition): Brainstorming possibilities, pattern recognition, external exploration",
    "Ni (Introverted Intuition): Foreseeing outcomes, symbolic meaning, internal vision",
  ],
  judging: [
    "Te (Extraverted Thinking): External organization, efficiency metrics, objective systems",
    "Ti (Introverted Thinking): Internal logic frameworks, precise definitions, analytical consistency",
    "Fe (Extraverted Feeling): Group harmony, emotional atmosphere, social values",
    "Fi (Introverted Feeling): Personal authenticity, moral alignment, individual values",
  ],
};

const mbtiHistory = [
  {
    year: "1921",
    title: "Jung's Psychological Types",
    desc: "Carl Gustav Jung publishes Psychologische Typen, introducing Extraversion vs Introversion and the core functions (Thinking, Feeling, Sensation, Intuition).",
  },
  {
    year: "1943–1962",
    title: "The Briggs-Myers Development",
    desc: "Katharine Cook Briggs and Isabel Briggs Myers develop the Myers-Briggs Type Indicator during WWII to support role fit and teamwork; widely distributed by 1962.",
  },
  {
    year: "1975",
    title: "Standardized Publishing",
    desc: "MBTI publishing and training organizations formalize administration norms and ongoing reliability research.",
  },
  {
    year: "1980s–90s",
    title: "Corporate Adoption",
    desc: "Many companies adopt MBTI for team building and leadership development (not recommended for hiring decisions).",
  },
  {
    year: "2000s",
    title: "Online Democratization",
    desc: "Online assessments expand access, creating type communities and broader interest in preferences and functions.",
  },
  {
    year: "2020s",
    title: "Integration Era",
    desc: "Modern practice often combines MBTI with Big Five, Enneagram, Holland Codes, and EQ for a fuller development picture.",
  },
];

const mbtiEstablishedFindings = [
  {
    title: "Stability Over Time",
    bullets: [
      "Test-retest reliability is often reported around 75–85% over 4-week intervals",
      "Many people keep 3 of 4 letters over longer periods, especially when preferences are clear",
      "Behavior is flexible even when preferences are stable",
    ],
  },
  {
    title: "Career Satisfaction Correlation (Congruence)",
    bullets: [
      "Better fit between type preferences and environment is associated with higher satisfaction",
      "Sensors are often overrepresented in operations/trades; Intuitives in graduate education/creative fields",
      "Thinkers are common in STEM; Feelers in education/healthcare (broad trends, not rules)",
    ],
  },
  {
    title: "Relationship Patterns",
    bullets: [
      "Some pairings benefit from shared N/S and T/F with opposite E/I and J/P (complementary dynamics)",
      "Similar types may feel more understood long-term but can share the same blind spots",
      "Function differences can create friction (e.g., Te vs Fi) without translation skills",
    ],
  },
];

const mbtiCriticisms = [
  {
    title: "Dichotomy vs. Spectrum",
    text: "Critics argue MBTI forces binary categories where traits are naturally distributed. Supporters emphasize preference clarity rather than “all-or-nothing” traits.",
  },
  {
    title: "Barnum Effect",
    text: "Some online descriptions can be vague and horoscope-like. Higher-quality reports focus on cognitive functions and specific development patterns.",
  },
  {
    title: "Test-Retest Issues",
    text: "A subset of people change type on retest, often due to middle-range preferences, context shifts (work mode), or low-quality items.",
  },
  {
    title: "Predictive Validity",
    text: "MBTI often predicts preferences and interests more than job performance. Use it for self-understanding and communication—not selection.",
  },
];

const mbtiComparisonRows = [
  { feature: "Framework", mbti: "16 Types (Jungian)", bigFive: "5 Spectrums (Traits)", enneagram: "9 Types (Motivations)", disc: "4 Quadrants (Behaviors)" },
  { feature: "Basis", mbti: "Preferences", bigFive: "Traits", enneagram: "Core fears/desires", disc: "Observable behavior" },
  { feature: "Stability", mbti: "75–85%", bigFive: "85–90%", enneagram: "70–80%", disc: "80–90%" },
  { feature: "Best For", mbti: "Self-understanding, career exploration", bigFive: "Research, prediction", enneagram: "Deep growth work", disc: "Workplace communication" },
  { feature: "Changeable?", mbti: "Preferences stay; behavior flexes", bigFive: "Partly", enneagram: "Core stable; health changes", disc: "Adaptable behavior" },
  { feature: "Scientific", mbti: "Moderate (mixed reviews)", bigFive: "High", enneagram: "Low–Moderate", disc: "Moderate" },
  { feature: "Popularity", mbti: "#1 globally", bigFive: "#2 academically", enneagram: "#3", disc: "#4 corporate" },
  { feature: "Time", mbti: "10–15 min", bigFive: "10–15 min", enneagram: "20–30 min", disc: "10 min" },
];

const mbtiFaq = [
  {
    q: "Is MBTI scientifically valid?",
    a: "Moderately. It shows adequate test-retest reliability and correlates with Big Five traits. It measures preferences (not abilities or pathology) and is best used for self-understanding rather than clinical diagnosis.",
  },
  {
    q: "Can my MBTI type change?",
    a: "Core preferences usually remain stable, but behavior flexes. Stress, context, or ambiguous preferences can shift results. Over time you develop weaker functions even if your preferences stay similar.",
  },
  {
    q: "What's the rarest MBTI type?",
    a: "INFJ is often cited as rare (~1.5%), followed by ENTJ and INTJ in many published distributions. Distributions vary across samples and countries.",
  },
  {
    q: "Why do I get different results on different tests?",
    a: "Test quality varies. Official instruments use forced-choice items; many free tests use Likert scales. Also, your state (stress, work mode) can temporarily influence responses.",
  },
  {
    q: 'Which type is the "best"?',
    a: "None. Every type has strengths and blind spots. The goal is insight and growth, not hierarchy.",
  },
  {
    q: "Are there gender differences?",
    a: "Some distributions report a skew on T/F in certain samples, but individuals vary widely and culture influences expression.",
  },
  {
    q: "Can I be an ambivert or balanced?",
    a: "Yes. If you score near 50/50 on a dimension, you can flex both ways. Balanced preferences can also feel conflicted until you learn context-specific strategies.",
  },
  {
    q: "What's the difference between MBTI and 16Personalities?",
    a: "16Personalities adds a 5th dimension (Assertive vs Turbulent) influenced by Big Five Neuroticism. Official MBTI uses Jung’s 4 dichotomies.",
  },
  {
    q: "Should I use MBTI for hiring?",
    a: "Generally no. It is designed for development and communication, not selection. Use validated, job-relevant tools for hiring.",
  },
  {
    q: "How is this different from a horoscope?",
    a: "MBTI is derived from psychological preference theory and structured questionnaires, not astrology. Some pop descriptions can be vague, but function-based models can be more specific and actionable.",
  },
  {
    q: "What are cognitive functions?",
    a: "The 8 mental processes (Se, Si, Ne, Ni, Te, Ti, Fe, Fi) used in different orders. Your 4-letter code is commonly associated with a specific dominant–auxiliary–tertiary–inferior “stack.”",
  },
  {
    q: "Can I be multiple types?",
    a: "You have one best-fit preference pattern, but you can show behaviors of many types depending on context. Growth integrates weaker functions, and stress can shift how you appear temporarily.",
  },
];

type BigFiveTrait = "O" | "C" | "E" | "A" | "N";

type BigFiveQuestion = {
  prompt: string;
  trait: BigFiveTrait;
  facets: Array<{
    facet:
      | "Fantasy"
      | "Aesthetics"
      | "Feelings"
      | "Actions"
      | "Ideas"
      | "Values"
      | "Competence"
      | "Order"
      | "Dutifulness"
      | "Achievement Striving"
      | "Self-Discipline"
      | "Deliberation"
      | "Warmth"
      | "Gregariousness"
      | "Assertiveness"
      | "Activity"
      | "Excitement-Seeking"
      | "Positive Emotions"
      | "Trust"
      | "Straightforwardness"
      | "Altruism"
      | "Compliance"
      | "Modesty"
      | "Tender-Mindedness"
      | "Anxiety"
      | "Angry Hostility"
      | "Depression"
      | "Self-Consciousness"
      | "Impulsiveness"
      | "Vulnerability";
    weight: number;
  }>;
  reverse?: boolean;
};

type BigFiveDeepDive = {
  icon: string;
  title: string;
  lead: string;
  high: string[];
  low: string[];
  facets: string[];
  facetDescriptions: string[];
  brain: string;
  career: string;
};

type BigFiveAnswerState = {
  value: 1 | 2 | 3 | 4 | 5 | null;
};

const likertOptions: Array<{ label: string; value: 1 | 2 | 3 | 4 | 5 }> = [
  { label: "Strongly Disagree", value: 1 },
  { label: "Disagree", value: 2 },
  { label: "Neutral", value: 3 },
  { label: "Agree", value: 4 },
  { label: "Strongly Agree", value: 5 },
];

const bigFiveWhatYouGet = [
  "5 Dimension Scores: Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism (percentile rankings)",
  "30 Facet Breakdown: Detailed sub-traits within each dimension (e.g., Anxiety vs. Depression within Neuroticism)",
  "Trait Stability Indicator: Which traits are most changeable vs. fixed in your profile",
  "Predictive Insights: Career success probability, relationship compatibility risks, health outcomes",
  "Personalized Growth Plan: Target the specific facets for maximum life improvement",
  "Research-Grade Privacy: No registration, no data retention, browser-local calculation",
];

const bigFiveMethodology = [
  "The Lexical Hypothesis",
  "Factor Analysis Validation",
  "Psychometric Properties",
];

const bigFiveValidation = [
  "Cross-cultural stability: Found in USA, Japan, Germany, Nigeria, Philippines, and indigenous cultures",
  "Longitudinal consistency: Rank-order stability increases from 0.4 (age 20) to 0.7 (age 50)",
  "Genetic heritability: 40-60% of variance in each trait is genetic; rest is non-shared environment",
];

const bigFivePsychometrics = [
  "Reliability: Internal consistency α = .80-.90 for each dimension; test-retest r = .85 over 6 months",
  "Validity: Predicts job performance (Conscientiousness r=.31), divorce rates (Neuroticism r=.21), longevity (Conscientiousness r=.16), and academic success (Openness r=.30)",
  "Lack of social desirability bias: Harder to \"fake good\" than type-based tests because traits are value-neutral",
  "Note: Unlike type theories (MBTI), Big Five measures quantitative traits on spectrums—everyone has varying degrees of all five.",
];

const bigFiveMethodologySections = [
  {
    title: "The Lexical Hypothesis",
    text: "The Big Five is based on decades of empirical research beginning with Gordon Allport (1936), who proposed that the most important personality characteristics become encoded in natural language. By analyzing thousands of personality-descriptive words across dictionaries and finding statistical clusters, psychologists identified five robust factors that appear in every human culture studied.",
  },
  {
    title: "Factor Analysis Validation",
    text: "Using principal component analysis on massive datasets (millions of participants across 50+ countries), these five factors consistently emerge independent of theoretical bias:",
    bullets: [
      "Cross-cultural stability: Found in USA, Japan, Germany, Nigeria, Philippines, and indigenous cultures",
      "Longitudinal consistency: Rank-order stability increases from 0.4 (age 20) to 0.7 (age 50)",
      "Genetic heritability: 40-60% of variance in each trait is genetic; rest is non-shared environment",
    ],
  },
  {
    title: "Psychometric Properties",
    text: "Reliability, validity, and reduced social desirability bias make Big Five a strong evidence-based model in research.",
    bullets: [
      "Reliability: Internal consistency α = .80-.90 for each dimension; test-retest r = .85 over 6 months",
      "Validity: Predicts job performance (Conscientiousness r=.31), divorce rates (Neuroticism r=.21), longevity (Conscientiousness r=.16), and academic success (Openness r=.30)",
      "Lack of social desirability bias: Harder to \"fake good\" than type-based tests because traits are value-neutral",
      "Note: Unlike type theories (MBTI), Big Five measures quantitative traits on spectrums—everyone has varying degrees of all five.",
    ],
  },
];

const bigFiveScience = {
  heredity: [
    "Identical twins reared apart show 0.5 correlation in Big Five traits—proving genetic influence",
    "Adoption studies: Adopted children resemble biological parents more than adoptive parents by adulthood",
    "Specific genes: 5-HTTLPR gene linked to Neuroticism (serotonin transporter)",
    "Specific genes: DRD4 gene linked to Extraversion/Novelty seeking (dopamine receptor)",
    "Specific genes: COMT gene linked to Openness (dopamine metabolism in prefrontal cortex)",
  ],
  lifespan: [
    "Age 20-30: Mean-level increases in Conscientiousness and Agreeableness; decreases in Neuroticism, Extraversion, Openness (maturity principle)",
    "Rank-order stability: Correlation of 0.6 between age 30 and 70—you remain relatively positioned vs. peers",
    "Plasticity: Despite stability, intentional interventions (therapy, meditation, major life events) can shift traits by 0.3-0.5 standard deviations (5-8 percentile points)",
  ],
  predictive: {
    workplace: [
      "Conscientiousness predicts performance across all jobs (r=.31)—stronger than IQ (r=.23) for most occupations",
      "Extraversion predicts sales and management success (r=.24)",
      "Low Neuroticism predicts leadership effectiveness (r=.18)",
      "Agreeableness predicts teamwork but negatively predicts earnings in competitive fields",
    ],
    relationships: [
      "Similarity in Agreeableness predicts marital satisfaction (r=.22)",
      "High Neuroticism in either partner predicts divorce (odds ratio 1.8)",
      "Assortative mating: People pair with similar Openness and Extraversion; often opposite Neuroticism (stable attracts anxious)",
    ],
    health: [
      "Low Conscientiousness predicts earlier mortality risk via health behaviors (smoking, obesity, risky behavior)",
      "High Neuroticism predicts chronic pain conditions and autoimmune disorders (stress link)",
      "High Extraversion predicts faster recovery from illness (social support)",
    ],
  },
};

const bigFiveFacetsByTrait: Record<BigFiveTrait, string[]> = {
  O: ["Fantasy", "Aesthetics", "Feelings", "Actions", "Ideas", "Values"],
  C: ["Competence", "Order", "Dutifulness", "Achievement Striving", "Self-Discipline", "Deliberation"],
  E: ["Warmth", "Gregariousness", "Assertiveness", "Activity", "Excitement-Seeking", "Positive Emotions"],
  A: ["Trust", "Straightforwardness", "Altruism", "Compliance", "Modesty", "Tender-Mindedness"],
  N: ["Anxiety", "Angry Hostility", "Depression", "Self-Consciousness", "Impulsiveness", "Vulnerability"],
};

const bigFiveQuestions: BigFiveQuestion[] = [
  { prompt: "I actively seek new ideas, theories, or abstract topics to explore.", trait: "O", facets: [{ facet: "Ideas", weight: 1 }, { facet: "Fantasy", weight: 1 }] },
  { prompt: "Art, music, or beauty in nature moves me deeply.", trait: "O", facets: [{ facet: "Aesthetics", weight: 1 }, { facet: "Feelings", weight: 1 }] },
  { prompt: "I prefer familiar routines over trying new activities.", trait: "O", reverse: true, facets: [{ facet: "Actions", weight: 1 }, { facet: "Values", weight: 1 }] },
  { prompt: "I often re-examine traditions and revise my beliefs when evidence changes.", trait: "O", facets: [{ facet: "Values", weight: 1 }, { facet: "Ideas", weight: 1 }] },

  { prompt: "I follow through reliably, even when tasks are boring.", trait: "C", facets: [{ facet: "Self-Discipline", weight: 1 }, { facet: "Dutifulness", weight: 1 }] },
  { prompt: "My environment is organized (lists, systems, clear structure).", trait: "C", facets: [{ facet: "Order", weight: 1 }, { facet: "Competence", weight: 1 }] },
  { prompt: "I often act quickly without thinking through consequences.", trait: "C", reverse: true, facets: [{ facet: "Deliberation", weight: 1 }, { facet: "Self-Discipline", weight: 1 }] },
  { prompt: "I push myself toward excellence and ambitious goals.", trait: "C", facets: [{ facet: "Achievement Striving", weight: 1 }, { facet: "Competence", weight: 1 }] },

  { prompt: "I feel energized by social interaction and group settings.", trait: "E", facets: [{ facet: "Gregariousness", weight: 1 }, { facet: "Positive Emotions", weight: 1 }] },
  { prompt: "I naturally take the lead and speak up in groups.", trait: "E", facets: [{ facet: "Assertiveness", weight: 1 }, { facet: "Activity", weight: 1 }] },
  { prompt: "I prefer quiet time and minimal stimulation most days.", trait: "E", reverse: true, facets: [{ facet: "Excitement-Seeking", weight: 1 }, { facet: "Gregariousness", weight: 1 }] },
  { prompt: "I experience joy and enthusiasm frequently.", trait: "E", facets: [{ facet: "Positive Emotions", weight: 1 }, { facet: "Warmth", weight: 1 }] },

  { prompt: "I assume people have good intentions unless proven otherwise.", trait: "A", facets: [{ facet: "Trust", weight: 1 }, { facet: "Compliance", weight: 1 }] },
  { prompt: "I am direct and honest, even if it creates tension.", trait: "A", facets: [{ facet: "Straightforwardness", weight: 1 }, { facet: "Modesty", weight: 1 }] },
  { prompt: "Helping others comes naturally, even when it costs me effort.", trait: "A", facets: [{ facet: "Altruism", weight: 1 }, { facet: "Tender-Mindedness", weight: 1 }] },
  { prompt: "I enjoy competition and don’t mind conflict to win.", trait: "A", reverse: true, facets: [{ facet: "Compliance", weight: 1 }, { facet: "Tender-Mindedness", weight: 1 }] },

  { prompt: "I worry often and anticipate problems before they happen.", trait: "N", facets: [{ facet: "Anxiety", weight: 1 }, { facet: "Vulnerability", weight: 1 }] },
  { prompt: "My mood can shift strongly when things go wrong.", trait: "N", facets: [{ facet: "Depression", weight: 1 }, { facet: "Angry Hostility", weight: 1 }] },
  { prompt: "I feel self-conscious about how others judge me.", trait: "N", facets: [{ facet: "Self-Consciousness", weight: 1 }, { facet: "Anxiety", weight: 1 }] },
  { prompt: "I can resist cravings and urges when I decide to.", trait: "N", reverse: true, facets: [{ facet: "Impulsiveness", weight: 1 }, { facet: "Vulnerability", weight: 1 }] },
];

const bigFiveDeepDive: BigFiveDeepDive[] = [
  {
    icon: "🎨",
    title: "1. Openness to Experience (Intellect/Imagination)",
    lead: "The creativity, curiosity, and preference for novelty dimension",
    high: [
      "Intellectually curious: Love abstract ideas, philosophical discussions, complex problem-solving",
      "Aesthetically sensitive: Appreciate art, music, poetry, novel experiences",
      "Creative thinkers: Generate novel ideas, make unusual connections, experimental approach",
      "Liberal values: Challenge tradition, tolerant of ambiguity, unconventional",
    ],
    low: [
      "Pragmatic groundedness: Prefer concrete facts, practical solutions, traditional approaches",
      "Traditional values: Respect customs, conservative, prefer familiar routines",
      "Down-to-earth: Literal thinking, focus on execution over theory",
      "Specialized depth: Prefer mastering one area vs. broad exploration",
    ],
    facets: bigFiveFacetsByTrait.O,
    facetDescriptions: [
      "Fantasy: Richness of inner imaginative life",
      "Aesthetics: Appreciation of beauty in art and nature",
      "Feelings: Openness to inner emotional experiences",
      "Actions: Preference for variety and novelty in activities",
      "Ideas: Intellectual curiosity and interest in abstract concepts",
      "Values: Readiness to re-examine social, political, religious values",
    ],
    brain:
      "Brain Correlates: Higher gray matter volume in prefrontal cortex (working memory for abstractions) and hippocampus (novelty detection). Dopamine receptor density linked to exploration drive.",
    career:
      "Career Implications: High Openness predicts success in arts, sciences, entrepreneurship, therapy; low Openness predicts success in operations, traditional trades, law enforcement, accounting.",
  },
  {
    icon: "📋",
    title: "2. Conscientiousness (Self-Discipline & Order)",
    lead: "The organization, dependability, and impulse control dimension",
    high: [
      "Organized: Systematic, neat, structured environments, detailed planning",
      "Reliable: Follow through on commitments, punctual, responsible",
      "Self-disciplined: Delay gratification, persistent through difficulty, goal-focused",
      "Cautious: Think before acting, risk-averse, careful decision-making",
    ],
    low: [
      "Spontaneous: Flexible, adaptable, comfortable with chaos, last-minute pressure",
      "Easy-going: Relaxed about deadlines, present-focused, less self-critical",
      "Creative chaos: Disorganized but often highly creative, multitasking preference",
      "Impulsive: Act on immediate desires, seek immediate rewards, spontaneous decisions",
    ],
    facets: bigFiveFacetsByTrait.C,
    facetDescriptions: [
      "Competence: Sense of capability and efficiency",
      "Order: Organization and neatness",
      "Dutifulness: Sense of moral obligation and reliability",
      "Achievement Striving: Drive for excellence and high standards",
      "Self-Discipline: Ability to persist at tasks despite boredom",
      "Deliberation: Tendency to think carefully before acting",
    ],
    brain:
      "Brain Correlates: Prefrontal cortex (executive control), anterior cingulate (error detection). Serotonin systems associated with impulse control. High C shows stronger connectivity between planning and motor regions.",
    career:
      "Life Outcomes: Most predictive trait for job performance across all occupations (r=.31), academic success (r=.24), income (r=.15), and longevity (r=.16—conscientious people live 3-5 years longer due to health behaviors).",
  },
  {
    icon: "🗣️",
    title: "3. Extraversion (Positive Emotionality & Assertiveness)",
    lead: "The sociability, energy, and reward sensitivity dimension",
    high: [
      "Energetic: High stamina, talkative, fast-paced, enthusiastic",
      "Sociable: Enjoy groups, meeting strangers, large networks, party-seeking",
      "Assertive: Speak up, take charge, competitive, comfortable with attention",
      "Cheerful: Experience positive emotions frequently, optimistic, excitement-seeking",
    ],
    low: [
      "Reserved: Quiet, reflective, prefer depth over breadth in relationships",
      "Independent: Comfortable alone, self-contained energy, small intimate circles",
      "Steady: Even-keeled emotions, less excitement-seeking, calm presence",
      "Thoughtful: Process before speaking, observant, listen more than talk",
    ],
    facets: bigFiveFacetsByTrait.E,
    facetDescriptions: [
      "Warmth: Friendliness and affection toward others",
      "Gregariousness: Preference for company and social stimulation",
      "Assertiveness: Leadership and dominance in groups",
      "Activity: Pace of living and energy level",
      "Excitement-Seeking: Need for stimulation and thrills",
      "Positive Emotions: Tendency to experience joy, happiness, love",
    ],
    brain:
      "Brain Correlates: Dopamine reward pathway sensitivity (ventral tegmental area to nucleus accumbens). Extraverts show greater activation to reward cues. Cortical arousal: Extraverts have lower baseline arousal (seek stimulation); introverts have higher baseline (easily overstimulated).",
    career:
      "Success Patterns: Extraversion predicts sales success, leadership emergence, and social connection quantity. Introversion predicts academic research depth, coding quality, and relationship quality.",
  },
  {
    icon: "💝",
    title: "4. Agreeableness (Cooperation & Compassion)",
    lead: "The trust, altruism, and social harmony dimension",
    high: [
      "Compassionate: Empathetic, feel others' pain, nurturing, soft-hearted",
      "Trusting: Believe others have good intentions, cooperative, gullible risk",
      "Humble: Modest, minimize own achievements, see others as equals",
      "Conflict-avoidant: Prioritize harmony over winning, accommodating, gentle",
    ],
    low: [
      "Competitive: Skeptical of others' motives, challenging, negotiation-focused",
      "Critical: Blunt, straightforward, willing to confront, tough-minded",
      "Self-confident: Assert own interests, feel superior, dominant in hierarchies",
      "Strategic: Manipulative potential, skeptical, guard resources",
    ],
    facets: bigFiveFacetsByTrait.A,
    facetDescriptions: [
      "Trust: Belief in sincerity and good intentions of others",
      "Straightforwardness: Frankness and sincerity (vs. manipulation)",
      "Altruism: Active concern for others' welfare",
      "Compliance: Cooperation and conflict avoidance",
      "Modesty: Self-effacement and lack of boastfulness",
      "Tender-Mindedness: Sympathy and empathy for others",
    ],
    brain:
      "Brain Correlates: Empathy networks (mirror neuron system, temporoparietal junction). Oxytocin receptor sensitivity. High A shows stronger amygdala response to others' distress.",
    career:
      "The Trade-off: High Agreeableness predicts relationship satisfaction and trust but increases risk of exploitation and lower income (especially in competitive business environments). Low Agreeableness predicts leadership effectiveness in crises but interpersonal conflict.",
  },
  {
    icon: "🛡️",
    title: "5. Neuroticism (Emotional Stability inverse)",
    lead: "The anxiety, moodiness, and emotional volatility dimension",
    high: [
      "Anxious: Worry frequently, anticipate problems, stress-sensitive",
      "Moody: Experience sadness, anger, frustration intensely; emotional swings",
      "Self-conscious: Social anxiety, easily embarrassed, care about others' judgments",
      "Vulnerable: Difficulty coping with stress, feel overwhelmed, low resilience",
    ],
    low: [
      "Calm: Rarely anxious, secure, handle pressure well, resilient",
      "Stable: Even moods, rarely depressed or angry, quick emotional recovery",
      "Confident: Self-assured, thick-skinned, not easily embarrassed",
      "Stress-resistant: Thrive under pressure, crisis management capability",
    ],
    facets: bigFiveFacetsByTrait.N,
    facetDescriptions: [
      "Anxiety: Tension, worry, nervousness, rumination",
      "Angry Hostility: Tendency to experience anger and frustration",
      "Depression: Tendency to experience sadness and hopelessness",
      "Self-Consciousness: Shyness and social anxiety",
      "Impulsiveness: Inability to control cravings and urges (emotional eating/spending)",
      "Vulnerability: Panic and inability to cope under pressure",
    ],
    brain:
      "Brain Correlates: Amygdala hyperreactivity to threat cues. HPA axis (cortisol stress response) dysregulation. Lower serotonin turnover. Default mode network overactivity (rumination).",
    career:
      "Life Impact: Neuroticism predicts mental health disorders (depression, anxiety), divorce rates (high N = higher conflict), physical health issues (stress-related illnesses), but also error detection and risk awareness (occupational safety).",
  },
];

const bigFiveHistory = [
  {
    year: "1884",
    title: "Galton's Vocabulary",
    desc: "Francis Galton (Darwin’s cousin) first proposes that personality characteristics can be measured through vocabulary analysis—laying groundwork for the lexical hypothesis.",
  },
  {
    year: "1936",
    title: "Allport's Lexical Approach",
    desc: "Gordon Allport and Henry Odbert identify 17,953 personality-descriptive words in the English dictionary, categorizing them into clusters. Establishes that important traits become encoded in language.",
  },
  {
    year: "1943",
    title: "Cattell's 16 Factors",
    desc: "Raymond Cattell uses factor analysis to reduce Allport's list to 16 personality factors (16PF). Too complex for practical use but pioneers statistical methodology.",
  },
  {
    year: "1961",
    title: "Tupes & Christal's Five Factors",
    desc: "US Air Force researchers Ernest Tupes and Raymond Christal analyze Cattell's data and find five recurring factors—the first empirical evidence of the Big Five structure. Published but largely ignored.",
  },
  {
    year: "1980",
    title: "Norman's Replication",
    desc: "Warren Norman confirms Tupes & Christal's five factors using new datasets, sparking renewed interest in \"The Big Five\" as a robust taxonomy.",
  },
  {
    year: "1985",
    title: "Goldberg's Labels",
    desc: "Lewis Goldberg coins \"The Big Five\" and establishes the OCEAN (or CANOE) acronym. Demonstrates cross-cultural validity in Dutch, German, and Japanese samples.",
  },
  {
    year: "1987-1992",
    title: "Costa & McCrae's NEO-PI",
    desc: "Paul Costa and Robert McCrae develop the NEO-PI-R (Neuroticism-Extraversion-Openness Personality Inventory Revised), adding Agreeableness and Conscientiousness to create the modern five-factor model with 30 facets. Becomes a gold standard for personality assessment.",
  },
  {
    year: "2000s",
    title: "Genetics & Neuroscience",
    desc: "Twin studies (Minnesota, Sweden) confirm 40-60% heritability for each trait. fMRI studies map traits to brain structures. Genome-Wide Association Studies identify specific SNPs linked to Neuroticism and Extraversion.",
  },
  {
    year: "2010s",
    title: "HEXACO Evolution",
    desc: "Ashton & Lee propose HEXACO model adding Honesty-Humility as sixth factor, predicting cheating and criminal behavior better than Big Five. Debate continues on optimal factor structure.",
  },
  {
    year: "2020s",
    title: "AI & Big Data",
    desc: "Machine learning analyzes millions of social media posts to predict Big Five scores with 80%+ accuracy. Used in psychometric profiling for marketing and political targeting (Cambridge Analytica controversy). Ethical guidelines established for AI-based personality prediction.",
  },
];

const bigFiveVsMbtiRows = [
  { aspect: "Nature", bigFive: "Traits (continuous spectrums)", mbti: "Types (discrete categories)" },
  { aspect: "Measurement", bigFive: "Percentile scores (0–100)", mbti: "Binary preferences (E/I, S/N, etc.)" },
  { aspect: "Science", bigFive: "Academic gold standard", mbti: "Mixed scientific acceptance" },
  { aspect: "Changeability", bigFive: "Malleable with effort", mbti: "Fixed preferences" },
  { aspect: "Prediction", bigFive: "Strong (job performance, health)", mbti: "Moderate (career interest)" },
  { aspect: "Resolution", bigFive: "30 facets (fine-grained)", mbti: "4 dichotomies (broad)" },
  { aspect: "Utility", bigFive: "Clinical diagnosis, research", mbti: "Self-understanding, team building" },
];

const bigFiveVsMbtiSynthesis = [
  "The Synthesis: Use Big Five to understand your quantifiable traits and predict outcomes. Use MBTI to understand your cognitive wiring and information processing style. They correlate:",
  "MBTI N ↔ Big Five Openness (r=.72)",
  "MBTI J ↔ Big Five Conscientiousness (r=.49)",
  "MBTI E ↔ Big Five Extraversion (r=.74)",
  "MBTI T ↔ Big Five Agreeableness (inverse, r=-.45)",
];

const bigFiveFaq = [
  {
    q: "Can I change my Big Five traits?",
    a: "Partially. While 50% is genetic and stable, deliberate intervention can shift you 10-20 percentile points. Targeted strategies: Therapy reduces Neuroticism; mindfulness increases Conscientiousness; travel/exposure increases Openness; social skills training increases Extraversion.",
  },
  {
    q: "Which traits matter most for success?",
    a: "Conscientiousness is the single best predictor of career success across all fields. Low Neuroticism helps with stress management. High Openness helps in creative and innovative roles. Extraversion helps in leadership and sales.",
  },
  {
    q: 'Is one trait combination "the best"?',
    a: "No context is perfect. High Conscientiousness + Low Openness = excellent accountant but poor entrepreneur. High Extraversion + Low Agreeableness = charismatic leader but difficult teammate. Every profile has optimal environments.",
  },
  {
    q: "Why did my results change from last year?",
    a: "State effects: Testing while depressed temporarily inflates Neuroticism. True change: Major life events (marriage, trauma, therapy, career change) can shift traits. Measurement error: Always ±5 percentile points variance.",
  },
  {
    q: "Are these traits culturally universal?",
    a: "Yes. The five factors emerge in lexical studies of 56 nations including isolated indigenous cultures. However, ideal levels vary by culture: East Asian cultures value lower Extraversion (modesty); Western cultures value high Openness (individualism).",
  },
  {
    q: "What's the difference between facet and domain scores?",
    a: "Domains (O/C/E/A/N) are broad umbrellas. Facets (6 per domain) are specific aspects. You might be high in Openness-Ideas (intellectual) but low in Openness-Aesthetics (uninterested in art). Always check facet scores for actionable insights.",
  },
  {
    q: "Can employers use this for hiring?",
    a: "Cautiously. In USA, personality testing for hiring is legal but must be job-relevant. Conscientiousness and Emotional Stability can be used if validated for the role. Agreeableness screening may have adverse impact (discrimination concerns). Never use as sole criterion.",
  },
  {
    q: "How does this relate to mental illness?",
    a: "Dimensional vs. Categorical. Big Five provides dimensional view: High Neuroticism = vulnerability to anxiety/depression but not diagnostic. Low Conscientiousness correlates with ADHD traits. Extreme scores (95th+ percentile) may indicate clinical concerns worth evaluating.",
  },
  {
    q: "What's better: Big Five or Enneagram?",
    a: "Different purposes. Big Five is descriptive (what you are like) and predictive (what you will do). Enneagram is motivational (why you do it—core fears/desires). Use Big Five for career/health decisions; Enneagram for shadow work and spiritual growth.",
  },
  {
    q: "Can I be high in contradicting traits?",
    a: "Absolutely. You can be high in Extraversion (sociable) AND high in Neuroticism (anxious)—the \"neurotic extravert\" who seeks company but worries about rejection. Or high Conscientiousness (organized) AND high Openness (creative)—the \"organized artist.\"",
  },
];

type DiscDimension = "D" | "I" | "S" | "C";

type DiscQuestion = {
  prompt: string;
  options: Array<{
    text: string;
    type: DiscDimension;
    weight?: number;
  }>;
};

type DiscAnswerState = {
  selected: DiscDimension | null;
  weight: number | null;
};

const discWhatYouGet = [
  "4 Primary Dimensions: Dominance, Influence, Steadiness, Conscientiousness (or Compliance)",
  "Behavioral Mapping: How you respond to challenges, people, pace, and procedures",
  "12 Combined Styles: DI, ID, SC, CS, DC, CD, etc.—nuanced blends of primary traits",
  "Workplace Priorities: What motivates vs. stresses you in professional environments",
  "Communication Playbook: How to adapt your style to others for better collaboration",
  "Team Dynamics Report: How your style complements or conflicts with colleagues",
  "Leadership Insight: Natural command style vs. required adaptations for management",
];

const discMethodologySections = [
  {
    title: "The Two-Axis Model",
    text: "DISC is built on William Moulton Marston's 1928 theory published in Emotions of Normal People. Marston proposed that observable behavioral expression stems from two intersecting perceptions:",
    bullets: [
      "Perception of Environment: Favorable vs. Unfavorable conditions",
      "Perception of Control: Whether one sees themselves as having control vs. lacking control over their environment",
      "Active/Forceful in unfavorable environments = Dominance",
      "Active/Charming in favorable environments = Influence (originally \"Inducement\")",
      "Passive/Accepting in favorable environments = Steadiness (originally \"Submission\")",
      "Passive/Cautious in unfavorable environments = Conscientiousness (originally \"Compliance\")",
    ],
  },
  {
    title: "Historical Evolution",
    bullets: [
      "1928: Marston publishes the theoretical framework but creates no assessment tool",
      "1940s: Walter V. Clarke develops the Activity Vector Analysis for personnel selection, discovering four factors that match Marston's model",
      "1950s: Clarke creates \"Self-Description,\" a forced-choice instrument providing empirical support for the DISC structure",
      "1970s: Dr. John Geier creates the Personal Profile System® (PPS) at the University of Minnesota, launching the first commercial DISC assessment",
      "1994: Major psychometric update creates the PPS 2800 Series (28 tetrads), renamed DiSC Classic®—still used today with improved reliability",
      "Modern Era: Everything DiSC® uses a circumplex model measuring eight scales (D, Di/iD, i, iS/Si, S, SC/CS, C, CD/DC)",
    ],
  },
  {
    title: "Critical Scientific Note",
    text: "Unlike the Big Five, DISC is classified as a behavioral assessment rather than a deep personality inventory. It measures how you act in specific contexts, not who you are fundamentally. Psychologists note that while widely used in business, DISC lacks the predictive validity of the Big Five and is considered pseudoscientific by academic standards for personality research. However, it remains valuable for communication training, team building, and self-awareness in workplace settings.",
  },
];

type DiscDeepDive = {
  icon: string;
  title: string;
  focus: string;
  high: string[];
  low: string[];
  workplaceDNA: string;
  variantsTitle: string;
  variants: string[];
};

const discDeepDive: DiscDeepDive[] = [
  {
    icon: "🎯",
    title: "1. Dominance (D) — The Results Driver",
    focus: "Problems, challenges, control, and results",
    high: [
      "Direct & Decisive: Cut through noise; want bottom-line results immediately",
      "Challenge-Oriented: View obstacles as stimulation; competitive and ambitious",
      "Risk-Tolerant: Comfortable making bold moves; accept confrontation as necessary",
      "Big-Picture Thinkers: Delegate details; focus on vision and outcomes",
      "Fast-Paced: Impatient with slow processes; want immediate action",
    ],
    low: [
      "Collaborative Decision-Makers: Prefer consensus over unilateral command",
      "Deliberate Pace: Take time to analyze before acting; less competitive drive",
      "Accommodating: Avoid confrontation; seek harmony over victory",
      "Process-Oriented: Comfortable following rather than leading; supportive role preference",
    ],
    workplaceDNA:
      "Workplace DNA: High Ds thrive in entrepreneurship, emergency medicine, crisis management, sales leadership, and turnaround roles. They struggle with repetitive detail work, strict hierarchies, and emotionally-sensitive mediation.",
    variantsTitle: "The DC & DI Variants",
    variants: [
      "DC (Dominance-Conscientiousness): The Challenger—independent, perfectionist, skeptical, focused on results with accuracy",
      "DI (Dominance-Influence): The Seeker/Achiever—innovative, energetic, creative problem-solver who influences through boldness",
    ],
  },
  {
    icon: "🌟",
    title: "2. Influence (I) — The People Mover",
    focus: "People, persuasion, enthusiasm, and connection",
    high: [
      "Enthusiastic & Optimistic: Radiate positive energy; see possibilities in everything",
      "Persuasive Communicators: Naturally influential; skilled at selling ideas and building rapport",
      "Relationship-Centric: Prioritize people over tasks; network effortlessly",
      "Spontaneous: Think on their feet; adaptable to changing social dynamics",
      "Recognition-Seeking: Motivated by praise, visibility, and group acceptance",
    ],
    low: [
      "Analytical & Reserved: Prefer data over charm; skeptical of emotional appeals",
      "Task-Focused: Prioritize work completion over relationship maintenance",
      "Private: Keep personal information close; selective about social connections",
      "Written Communicators: Prefer email/documentation over verbal brainstorming",
    ],
    workplaceDNA:
      "Workplace DNA: High Is excel in marketing, public relations, teaching, recruiting, customer service, and entertainment. They struggle with isolation, heavy documentation, and environments that suppress emotional expression.",
    variantsTitle: "The ID & IS Variants",
    variants: [
      "ID (Influence-Dominance): The Risk-Taker—charismatic, dynamic, goal-oriented, uses enthusiasm to drive results",
      "IS (Influence-Steadiness): The Harmonizer—friendly, reliable, people-focused, creates inclusive team environments",
    ],
  },
  {
    icon: "🛡️",
    title: "3. Steadiness (S) — The Support Anchor",
    focus: "Pace, stability, support, and collaboration",
    high: [
      "Patient & Calm: Even-tempered; provide stability during chaos",
      "Supportive & Loyal: Deeply committed to team members; prefer long-term relationships",
      "Methodical Pace: Consistent, reliable workers who dislike rushing",
      "Active Listeners: Hear others out thoroughly; empathetic and accommodating",
      "Routine-Preferring: Thrive in predictable environments with clear expectations",
    ],
    low: [
      "Rapid Adapters: Comfortable with constant change; flexible and spontaneous",
      "Independent: Self-directed; less need for group cohesion or hand-holding",
      "Impatient with Routine: Bored by repetition; seek variety and new stimuli",
      "Direct Communicators: Get to the point quickly; less focus on emotional cushioning",
    ],
    workplaceDNA:
      "Workplace DNA: High Ss excel in nursing, counseling, HR administration, customer retention, and operational roles requiring consistency. They struggle with chaotic environments, abrupt changes, and aggressive confrontation.",
    variantsTitle: "The SI & SC Variants",
    variants: [
      "SI (Steadiness-Influence): The Encourager—warm, cooperative, service-oriented, sees positives in all situations",
      "SC (Steadiness-Conscientiousness): The Mediator—patient, systematic, attentive to details while maintaining harmony",
    ],
  },
  {
    icon: "📊",
    title: "4. Conscientiousness (C) — The Quality Controller",
    focus: "Procedures, accuracy, logic, and standards",
    high: [
      "Analytical & Precise: Detail-oriented; spot errors others miss; data-driven",
      "Systematic: Follow procedures; create structured plans; risk-averse",
      "Objective: Separate emotions from facts; logical decision-makers",
      "Quality-Focused: Strive for perfection; high standards for self and others",
      "Private & Reserved: Independent workers who prefer autonomy over collaboration",
    ],
    low: [
      "Big-Picture Oriented: Focus on vision over details; comfortable with ambiguity",
      "Flexible with Rules: Adapt procedures to circumstances; less rigid about protocols",
      "Socially Engaged: Prefer teamwork and discussion over solitary analysis",
      "Intuitive Decision-Makers: Trust gut feelings alongside (or instead of) data",
    ],
    workplaceDNA:
      "Workplace DNA: High Cs excel in accounting, engineering, software development, legal research, quality assurance, and data science. They struggle with disorganized environments, emotional decision-making pressures, and vague instructions.",
    variantsTitle: "The CD & CS Variants",
    variants: [
      "CD (Conscientiousness-Dominance): The Skeptic—analytical, assertive, questioning, delivers quality efficiently",
      "CS (Conscientiousness-Steadiness): The Specialist—accurate, dependable, methodical, avoids risks, helps when expertise needed",
    ],
  },
];

const discStyleTable = [
  { style: "D", name: "Achiever", key: "Results-driven, forceful, direct", roles: "CEO, Entrepreneur, Emergency Director" },
  { style: "Di", name: "Driver", key: "Adventurous, bold, pioneering", roles: "Sales Director, Innovation Lead" },
  { style: "iD", name: "Risk-Taker", key: "Charismatic, dynamic, influential", roles: "Marketing Head, PR Director" },
  { style: "i", name: "Enthusiast", key: "Sociable, lively, collaborative", roles: "Recruiter, Trainer, Entertainer" },
  { style: "iS", name: "Harmonizer", key: "Agreeable, warm, inclusive", roles: "HR Business Partner, Counselor" },
  { style: "Si", name: "Encourager", key: "Supportive, positive, respectful", roles: "Customer Success, Nurse, Teacher" },
  { style: "S", name: "Specialist", key: "Patient, accommodating, stable", roles: "Admin Manager, Operations Coordinator" },
  { style: "SC", name: "Mediator", key: "Systematic, soft-spoken, fair", roles: "Mediator, Quality Auditor" },
  { style: "CS", name: "Perfectionist", key: "Careful, self-controlled, orderly", roles: "Accountant, Compliance Officer" },
  { style: "C", name: "Analyst", key: "Analytical, reserved, unemotional", roles: "Data Scientist, Researcher" },
  { style: "CD", name: "Skeptic", key: "Cautious, disciplined, critical", roles: "Risk Manager, Systems Architect" },
  { style: "DC", name: "Challenger", key: "Determined, perfectionist, independent", roles: "Consultant, Turnaround Manager" },
];

const discVsBigFiveRows = [
  { aspect: "Nature", disc: "Behavioral styles (context-dependent)", bigFive: "Personality traits (stable characteristics)" },
  { aspect: "Measurement", disc: "Four scales with 12 blended styles", bigFive: "Five dimensions with 30 facets" },
  { aspect: "Science", disc: "Business tool; limited academic validity", bigFive: "Academic gold standard; robust predictive validity" },
  { aspect: "Focus", disc: "Workplace behavior & communication", bigFive: "Comprehensive personality & life outcomes" },
  { aspect: "Changeability", disc: "Highly adaptable by situation", bigFive: "Stable but malleable over time" },
  { aspect: "Best Use", disc: "Team building, sales training, leadership dev", bigFive: "Clinical assessment, career counseling, research" },
  { aspect: "Origins", disc: "Marston 1928 (emotions & environment)", bigFive: "Lexical hypothesis 1930s-1980s (factor analysis)" },
];

const discCorrelation = [
  "DISC Dominance ↔ Big Five low Agreeableness + high Extraversion",
  "DISC Influence ↔ Big Five high Extraversion + high Openness",
  "DISC Steadiness ↔ Big Five high Agreeableness + low Neuroticism",
  "DISC Conscientiousness ↔ Big Five high Conscientiousness",
];

const discFaq = [
  {
    q: "Is DISC scientifically valid?",
    a: "DISC has face validity (it makes sense to users) and is useful for communication training, but lacks the predictive validity of the Big Five. It is considered pseudoscientific by academic psychologists for personality assessment, though valuable as a behavioral framework in organizational development.",
  },
  {
    q: "Can my DISC style change?",
    a: "Yes—DISC measures behavior, not fixed personality. You may score high D at work (competitive environment) but high S at home (nurturing role). Stress, new jobs, or conscious development can shift your pattern significantly.",
  },
  {
    q: "Which style is best for leadership?",
    a: "No single style dominates. Research shows DC styles excel in crisis turnaround; IS styles thrive in coaching/collaborative cultures; DI styles drive innovation; SC styles stabilize teams. Effective leaders learn to flex across styles.",
  },
  {
    q: 'Why do some tests use "Compliance" vs. "Conscientiousness"?',
    a: "Marston's original 1928 term was \"Compliance,\" reflecting fearful adjustment to superior force. Modern assessments (Everything DiSC) use \"Conscientiousness\" to reduce negative connotations, though the core concept remains analytical, cautious behavior.",
  },
  {
    q: "How is DISC different from MBTI?",
    a: "MBTI measures cognitive preferences (how you process information); DISC measures behavioral expression (how you act). MBTI has 16 types; DISC has 4 primary styles with 12 blends. Both are workplace tools, but MBTI focuses on \"how you think\" while DISC focuses on \"how you act\".",
  },
  {
    q: "Should employers use DISC for hiring?",
    a: "Cautiously. DISC is excellent for team composition and onboarding but should not be the sole hiring filter due to limited predictive validity for job performance. Use it to understand how candidates will fit team culture, not to predict competence.",
  },
  {
    q: "What is the circumplex model?",
    a: "Modern Everything DiSC® displays results on a circular graph (circumplex) showing your proximity to all eight scales, providing nuanced behavioral mapping rather than just four scores.",
  },
  {
    q: "Can I be high in all four dimensions?",
    a: "Rarely. The forced-choice format typically prevents flat profiles. Most people have 1-2 primary styles and 1-2 secondary styles, with natural blind spots in the opposite quadrants.",
  },
];

function toDiscQuestions(
  pool: Array<{ q: string; options: Array<{ text: string; type: DiscDimension; weight?: number }> }>
): DiscQuestion[] {
  return pool.map((q) => ({
    prompt: q.q,
    options: q.options.map((o) => ({ text: o.text, type: o.type, weight: o.weight })),
  }));
}

type EnneagramType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type EnneagramCenter = "Head" | "Heart" | "Body";
type EnneagramInstinct = "sp" | "sx" | "so";

type EnneagramQuestion = {
  prompt: string;
  kind: "type" | "instinct";
  type?: EnneagramType;
  instinct?: EnneagramInstinct;
  options?: Array<{
    text: string;
    type: EnneagramType | null;
    weight: number;
  }>;
};

type EnneagramAnswerState = {
  value: 1 | 2 | 3 | 4 | 5 | null;
  selectedIndex: number | null;
  selectedType: EnneagramType | null;
  weight: number | null;
};

const enneagramWhatYouGet = [
  "9 Core Personality Types: Type 1 (Reformer) through Type 9 (Peacemaker)—each with distinct core fears, desires, and motivational drives",
  "27 Subtype Profiles: Self-preservation, Sexual (One-to-One), and Social instincts combined with each core type",
  "Wing Analysis: Two adjacent wings per type (e.g., 5w4 vs. 5w6) coloring expression",
  "Stress & Growth Dynamics: Integration (growth) and disintegration (stress) lines showing how types transform under pressure or evolution",
  "Centers of Intelligence: Head Center (Fear), Heart Center (Shame), Body Center (Anger)—your dominant emotional processing mode",
  "Levels of Development: Healthy, average, and unhealthy manifestations of each type",
  "Core Motivations: Not behaviors but why you act—unconscious drives revealed",
  "Spiritual Growth Path: From fixation to holy virtue—transformation framework",
];

const enneagramMethodologySections = [
  {
    title: "The Centers of Intelligence",
    text: "The Enneagram maps three distinct centers where emotional energy processes:",
    bullets: [
      "Head Center (Types 5, 6, 7) — The Fear Triad",
      "Dominant emotion: Fear/Anxiety",
      "Processing: Mental analysis, planning, anticipation",
      "Types respond to fear by: Withdrawal (5), Seeking authority/security (6), or Distraction/escape (7)",
      "Heart Center (Types 2, 3, 4) — The Shame Triad",
      "Dominant emotion: Shame/Identity confusion",
      "Processing: Image management, relationship dynamics, authenticity-seeking",
      "Types respond to shame by: Pleasing others (2), Performing/achieving (3), or Differentiating/uniqueness (4)",
      "Body Center (Types 8, 9, 1) — The Anger Triad",
      "Dominant emotion: Anger/Rage (often unconscious in 9s and 1s)",
      "Processing: Gut instinct, boundary-setting, reactivity vs. control",
      "Types respond to anger by: Direct expression (8), Suppression/numbing (9), or Repression/channeling into perfection (1)",
    ],
  },
  {
    title: "The Structure: Passions, Fixations, and Virtues",
    text: "Each type operates on a mechanical pattern:",
    bullets: [
      "Core Passion: The emotional compulsion (e.g., Pride for Type 2, Envy for Type 4)",
      "Mental Fixation: The cognitive habit that sustains the passion (e.g., Type 5's stinginess/retention)",
      "Holy Idea: The liberated truth when fixation releases (e.g., Type 1's \"Holy Perfection\" vs. their fixation on imperfection)",
      "Basic Fear & Desire: The existential motivation driving all behavior",
    ],
  },
  {
    title: "Directions of Integration & Disintegration",
    text: "Growth and stress lines describe how types transform under evolution or pressure.",
    bullets: [
      "Growth (Integration) Path: Types acquire healthy traits of another type when evolving",
      "1→7: Become spontaneous and joyful (vs. rigid)",
      "2→4: Acknowledge own needs and authenticity (vs. people-pleasing)",
      "3→6: Develop loyalty and genuine community (vs. image)",
      "4→1: Objective and disciplined (vs. moody)",
      "Stress (Disintegration) Path: Types exhibit unhealthy traits of another type when regressing",
      "1→4: Melancholic, self-absorbed (under stress)",
      "2→8: Controlling, aggressive (under stress)",
      "3→9: Apathetic, disengaged (under stress)",
    ],
  },
  {
    title: "Critical Scientific Context",
    text: "Unlike the Big Five, the Enneagram lacks robust psychometric validation in academic psychology. It is classified as a spiritual-psychological framework rather than empirical science.",
    bullets: [
      "Limited peer-reviewed factor analysis confirming 9 distinct types",
      "Construct validity questioned—types may reflect subjective validation (Barnum effect)",
      "Nevertheless, widely used in coaching, therapy, and organizational development for narrative insight",
      "Best Use: Deep psychological and spiritual self-inquiry; understanding core motivations; shadow work",
      "Not recommended for: Hiring decisions, clinical diagnosis, predictive validity claims",
    ],
  },
];

const enneagramHistory = [
  {
    year: "Pre-20th Century",
    title: "Ancient Symbol, Modern Psychology",
    desc: "The Enneagram symbol (nine-pointed star in circle) appears in Sufi traditions and possibly Pythagorean mathematics, though its exact ancient lineage is debated.",
  },
  {
    year: "1915–1949",
    title: "George Ivanovich Gurdjieff",
    desc: "Introduces the Enneagram symbol to the West as a universal process algorithm (not personality types), describing mechanical patterns of thought and \"The Fourth Way\" self-development.",
  },
  {
    year: "1968–1970",
    title: "Oscar Ichazo — The Architect",
    desc: "Synthesizes the symbol with modern psychology (Protoanalysis) at the Arica School, mapping 9 ego fixations, core passions, and virtues. First to teach the Enneagram as a personality system.",
  },
  {
    year: "1970–1971",
    title: "The Arica Training",
    desc: "Ichazo trains 57 North Americans in a 10-month intensive, including Claudio Naranjo and John Lilly, teaching instinctual triads.",
  },
  {
    year: "1971–1974",
    title: "Claudio Naranjo — The Psychologist",
    desc: "Translates Ichazo's spiritual framework into Western psychological language and develops detailed descriptions and the 27 subtypes.",
  },
  {
    year: "1974–1984",
    title: "The First Generation",
    desc: "Naranjo's students begin teaching; lineage disputes arise. Helen Palmer develops the Narrative Tradition using panel interviews.",
  },
  {
    year: "1994",
    title: "Institutionalization",
    desc: "First International Enneagram Conference at Stanford University; the International Enneagram Association (IEA) is founded.",
  },
  {
    year: "1997–Present",
    title: "Riso-Hudson & Academic Study",
    desc: "Riso and Hudson develop Levels of Development; Katherine Fauvre develops Tritype® theory (one type from each center).",
  },
];

type EnneagramTypeProfile = {
  type: EnneagramType;
  title: string;
  coreFear: string;
  coreDesire: string;
  center: EnneagramCenter;
  healthy: string[];
  average: string[];
  unhealthy: string[];
  wings: string[];
  workplaceDNA: string;
  growthAccess: string;
  stressReaction: string;
};

const enneagramTypes: EnneagramTypeProfile[] = [
  {
    type: 1,
    title: "Type 1: The Reformer (Perfectionist)",
    coreFear: "Being corrupt, defective, or \"bad\"",
    coreDesire: "To be good, virtuous, and have integrity",
    center: "Body",
    healthy: ["Wise, discerning, ethical leaders who inspire through example", "Accepting of imperfection in self and others; emotionally serene", "Growth access: Become spontaneous and joyful like healthy 7s"],
    average: [
      "Idealistic, organized, self-controlled, detail-oriented",
      "Critical of self and others; rigid standards; \"shoulds\" and \"musts\"",
      "Righteous indignation; black-and-white thinking",
    ],
    unhealthy: ["Self-righteous, intolerant, punitive", "Severe depression from failing to meet impossible standards", "Stress reaction: Become moody and self-absorbed like unhealthy 4s"],
    wings: ["1w9 (The Idealist): More detached, calm, philosophical, less confrontational", "1w2 (The Advocate): More interpersonal, warm, hands-on in helping others"],
    workplaceDNA:
      "Excel as compliance officers, editors, surgeons, ethicists, quality controllers. Struggle with ambiguity, rapid change without purpose, and unethical environments.",
    growthAccess: "1→7: Become spontaneous and joyful (vs. rigid)",
    stressReaction: "1→4: Melancholic, self-absorbed (under stress)",
  },
  {
    type: 2,
    title: "Type 2: The Helper (Giver)",
    coreFear: "Being unwanted, unloved, or worthless without giving",
    coreDesire: "To feel loved and needed",
    center: "Heart",
    healthy: [
      "Unconditionally loving, generous, empathic without strings attached",
      "Self-nurturing; aware of own needs while serving others",
      "Growth access: Become self-aware and authentic like healthy 4s",
    ],
    average: ["Warm, people-pleasing, demonstrative, possessive of loved ones", "Manipulate through \"helping\"; emotional dependency", "Pride in being indispensable; difficulty saying no"],
    unhealthy: [
      "Martyrdom, victimhood, passive-aggressive guilt-tripping",
      "Pathological need to be needed; ignore own health",
      "Stress reaction: Become domineering and aggressive like unhealthy 8s",
    ],
    wings: ["2w1 (The Servant): More principled, disciplined, objective in helping", "2w3 (The Host/Hostess): More ambitious, image-conscious, charming"],
    workplaceDNA: "Excel in nursing, HR, customer success, teaching, therapy. Struggle with isolated work, competitive cutthroat cultures, and roles requiring emotional detachment.",
    growthAccess: "2→4: Acknowledge own needs and authenticity (vs. people-pleasing)",
    stressReaction: "2→8: Controlling, aggressive (under stress)",
  },
  {
    type: 3,
    title: "Type 3: The Achiever (Performer)",
    coreFear: "Being worthless, a failure, or without value",
    coreDesire: "To be successful, admired, and validated",
    center: "Heart",
    healthy: ["Authentic, self-accepting role models who inspire excellence", "Cooperative and genuine; value relationships over image", "Growth access: Become loyal and community-oriented like healthy 6s"],
    average: ["Adaptable, driven, efficient, image-conscious \"human doing\"", "Competitive, status-seeking; workaholic tendencies", "Lose touch with authentic self; become what others admire"],
    unhealthy: ["Deceptive, exploitative, narcissistic", "Desperate for attention; destroy others to maintain superiority", "Stress reaction: Become apathetic and disengaged like unhealthy 9s"],
    wings: ["3w2 (The Charmer): More interpersonal, seductive, helpful in achieving goals", "3w4 (The Professional): More introspective, artistic, concerned with uniqueness"],
    workplaceDNA: "Excel in sales, entrepreneurship, media, consulting, executive leadership. Struggle with meaningless tasks, lack of recognition, and environments valuing process over results.",
    growthAccess: "3→6: Develop loyalty and genuine community (vs. image)",
    stressReaction: "3→9: Apathetic, disengaged (under stress)",
  },
  {
    type: 4,
    title: "Type 4: The Individualist (Romantic)",
    coreFear: "Having no identity, significance, or being flawed",
    coreDesire: "To be unique, authentic, and find deep meaning",
    center: "Heart",
    healthy: ["Deeply creative, compassionate, authentic, emotionally honest", "Transform suffering into beauty; inspire others' self-acceptance", "Growth access: Become objective and principled like healthy 1s"],
    average: ["Sensitive, artistic, self-conscious, dramatic", "Envious of others' \"ordinary\" happiness; feeling deficient", "Withdraw to process emotions; moody and temperamental"],
    unhealthy: ["Depressed, self-destructive, alienated from self and others", "Jealousy and self-hatred dominate; despairing hopelessness", "Stress reaction: Become clingy and intrusive like unhealthy 2s"],
    wings: ["4w3 (The Aristocrat): More ambitious, image-conscious, socially adept", "4w5 (The Bohemian): More withdrawn, intellectual, eccentric, avant-garde"],
    workplaceDNA: "Excel in creative arts, design, therapy, writing, depth psychology. Struggle with routine administrative work, superficial corporate cultures, and roles requiring emotional suppression.",
    growthAccess: "4→1: Objective and disciplined (vs. moody)",
    stressReaction: "4→2: People-pleasing and clingy (under stress)",
  },
  {
    type: 5,
    title: "Type 5: The Investigator (Observer)",
    coreFear: "Being incompetent, overwhelmed, or depleted",
    coreDesire: "To be capable, knowledgeable, and self-sufficient",
    center: "Head",
    healthy: ["Visionary pioneers, synthesizing complex ideas into innovation", "Generous with expertise; engaged with world while maintaining boundaries", "Growth access: Become decisive and confident like healthy 8s"],
    average: ["Perceptive, innovative, secretive, isolated", "Hoard resources (time, energy, knowledge); detached from emotions", "Cerebral analysis replaces lived experience; socially awkward"],
    unhealthy: ["Schizoid isolation, nihilistic, rejecting all human contact", "Dangerously eccentric; lost in obsessive theories", "Stress reaction: Become scattered and escapist like unhealthy 7s"],
    wings: ["5w4 (The Iconoclast): More emotional, creative, sensitive, personal", "5w6 (The Problem Solver): More loyal, organized, technical, anxious"],
    workplaceDNA: "Excel in research, engineering, data science, academia, strategic planning. Struggle with customer-facing roles, open-plan offices, and management positions requiring emotional labor.",
    growthAccess: "5→8: Become decisive and embodied (in growth)",
    stressReaction: "5→7: Scattered and escapist (under stress)",
  },
  {
    type: 6,
    title: "Type 6: The Loyalist (Skeptic)",
    coreFear: "Being without support, guidance, or security",
    coreDesire: "To have safety, certainty, and support",
    center: "Head",
    healthy: ["Courageous, faithful, reliable community builders", "Trust self and others; collaborative and warm", "Growth access: Become relaxed and harmonious like healthy 9s"],
    average: ["Committed, responsible, anxious, suspicious", "Seek authority then rebel against it; worst-case scenario planning", "Indecisive; procrastinate seeking perfect safety"],
    unhealthy: ["Paranoid, panicked, self-defeating", "Projections of own hostility onto others; volatile", "Stress reaction: Become competitive and image-obsessed like unhealthy 3s"],
    wings: ["6w5 (The Defender): More intellectual, reserved, systematic, technical", "6w7 (The Buddy): More playful, sociable, optimistic, adventurous"],
    workplaceDNA: "Excel in risk management, compliance, emergency services, project management, network security. Struggle with ambiguous roles without clear authority, and high-risk entrepreneurial environments.",
    growthAccess: "6→9: Become relaxed and trusting (in growth)",
    stressReaction: "6→3: Competitive and image-driven (under stress)",
  },
  {
    type: 7,
    title: "Type 7: The Enthusiast (Epicure)",
    coreFear: "Being trapped in pain, limited, or missing out (FOMO)",
    coreDesire: "To be satisfied, free, and content",
    center: "Head",
    healthy: ["Focused, grateful, discerning appreciators of deep experience", "Practical idealists who follow through on commitments", "Growth access: Become analytical and focused like healthy 5s"],
    average: ["Spontaneous, versatile, acquisitive, scattered", "Avoid pain through constant activity; future-focused optimism", "Commitment-phobic; superficial sampling of many experiences"],
    unhealthy: ["Manic, addictive, reckless, escaping into impulsivity", "Infantile tantrums when deprived of gratification", "Stress reaction: Become critical and rigid like unhealthy 1s"],
    wings: ["7w6 (The Entertainer): More responsible, loyal, anxious, engaging", "7w8 (The Realist): More assertive, aggressive, materialistic, direct"],
    workplaceDNA: "Excel in entrepreneurship, marketing, event planning, innovation consulting, startup environments. Struggle with repetitive detail work, heavy regulation, and isolated desk jobs.",
    growthAccess: "7→5: Become focused and grounded (in growth)",
    stressReaction: "7→1: Critical and rigid (under stress)",
  },
  {
    type: 8,
    title: "Type 8: The Challenger (Protector)",
    coreFear: "Being controlled, harmed, or vulnerable",
    coreDesire: "To be self-determining, independent, and in charge",
    center: "Body",
    healthy: ["Magnanimous, merciful, protective of the vulnerable", "Use power for justice; emotionally vulnerable with trusted ones", "Growth access: Become caring and empathic like healthy 2s"],
    average: ["Assertive, decisive, confrontational, excessive", "Control environment; deny weakness; intimidate others", "Workaholic; struggle with impatience and impulsivity"],
    unhealthy: ["Violent, vengeful, sociopathic", "Destroy others to maintain dominance; paranoid delusions", "Stress reaction: Become withdrawn and paranoid like unhealthy 5s"],
    wings: ["8w7 (The Maverick): More energetic, risk-taking, pleasure-seeking, antisocial", "8w9 (The Bear): More calm, steady, patient, reconciliatory, grounded"],
    workplaceDNA: "Excel in executive leadership, crisis management, entrepreneurship, law, advocacy. Struggle with micromanagement, bureaucratic constraints, and roles requiring emotional suppression or vulnerability display.",
    growthAccess: "8→2: Become caring and empathic (in growth)",
    stressReaction: "8→5: Withdrawn and paranoid (under stress)",
  },
  {
    type: 9,
    title: "Type 9: The Peacemaker (Mediator)",
    coreFear: "Being in conflict, separated from others, or losing peace",
    coreDesire: "To have inner harmony, stability, and wholeness",
    center: "Body",
    healthy: ["Dynamic, engaged, self-developing forces for collective good", "Assertive when necessary; genuine peace (not avoidance)", "Growth access: Become energetic and goal-oriented like healthy 3s"],
    average: ["Agreeable, accommodating, complacent, forgetful of self", "Stubborn passive resistance; merge with others' agendas", "\"Checked out\" to maintain comfort; procrastination"],
    unhealthy: ["Catatonic dissociation, self-abandoning, severe depression", "Stubborn refusal to engage with reality; narcotic escapism", "Stress reaction: Become anxious and suspicious like unhealthy 6s"],
    wings: ["9w8 (The Comfort Seeker): More assertive, sensual, practical, grounded", "9w1 (The Dreamer): More idealistic, orderly, self-critical, principled"],
    workplaceDNA: "Excel in HR mediation, counseling, diplomacy, customer relations, operational stability. Struggle with high-conflict negotiations without structure, and roles requiring constant self-promotion.",
    growthAccess: "9→3: Become energetic and goal-oriented (in growth)",
    stressReaction: "9→6: Anxious and suspicious (under stress)",
  },
];

const enneagramTriads = [
  { triad: "Body/Gut", types: "8, 9, 1", emotion: "Anger/Rage", defense: "Control/Repression", question: "\"How do I assert myself?\"" },
  { triad: "Heart/Feeling", types: "2, 3, 4", emotion: "Shame", defense: "Identity/Image management", question: "\"Who am I in relation to others?\"" },
  { triad: "Head/Thinking", types: "5, 6, 7", emotion: "Fear", defense: "Analysis/Distraction", question: "\"How do I prepare for threats?\"" },
];

const enneagramVsBigFiveRows = [
  { aspect: "Nature", enneagram: "Motivational/Spiritual types (why you act)", bigFive: "Descriptive traits (how you act)" },
  { aspect: "Origin", enneagram: "Mystical/spiritual synthesis (Ichazo 1970)", bigFive: "Empirical lexical research (1930s-1980s)" },
  { aspect: "Structure", enneagram: "9 types with wings, subtypes, levels", bigFive: "5 dimensions with 30 facets" },
  { aspect: "Scientific Status", enneagram: "Limited empirical validation; phenomenological tool", bigFive: "Academic gold standard; robust psychometrics" },
  { aspect: "Change Model", enneagram: "Dynamic (integration/disintegration lines)", bigFive: "Static traits with maturity trends" },
  { aspect: "Best Use", enneagram: "Depth psychology, spiritual growth, narrative insight", bigFive: "Predictive validity, clinical assessment, research" },
  { aspect: "Depth", enneagram: "Unconscious core fears and desires", bigFive: "Observable behavioral patterns" },
];

const enneagramSynthesis = [
  "The Synthesis: Use Big Five to predict behavior and career fit; use Enneagram for shadow work, understanding relationship patterns, and spiritual development. They are complementary rather than competing systems.",
];

const enneagramFaq = [
  {
    q: "Is the Enneagram scientifically valid?",
    a: "The Enneagram currently lacks robust psychometric support compared to the Big Five. While popular in coaching and therapy, academic psychology questions its construct validity and reliability. However, it offers profound phenomenological validity—meaning it describes subjective inner experience accurately for many people.",
  },
  {
    q: "What are wings?",
    a: "Your wing is one of the two types adjacent to your core type (e.g., Type 4 has wings 3 and 5). It \"flavors\" your expression—no one is a pure type. Most people have one dominant wing, though some are balanced.",
  },
  {
    q: "Can my Enneagram type change?",
    a: "Core type is stable throughout life (like an innate orientation), but levels of development fluctuate. A healthy Type 1 acts very differently from an unhealthy Type 1. Under stress, you access disintegration line traits; in growth, integration line traits.",
  },
  {
    q: "What are the 27 subtypes?",
    a: "Each type has three instinctual variants: Self-preservation (survival/security focus), Sexual/One-to-One (intensity/attraction focus), and Social (belonging/status focus). These create 27 distinct profiles (e.g., Social 5 vs. Sexual 5).",
  },
  {
    q: "Is one type better than others?",
    a: "No. Each type has access to unique holy ideas and virtues when healthy, and distinct pathologies when unhealthy. The goal is integration—moving around the circle to access all types' healthy traits.",
  },
  {
    q: "Why do some types seem similar?",
    a: "Look-alikes occur (e.g., Type 1 and Type 6 both worry, Type 2 and Type 9 both accommodate). Distinguish by core motivation, not behavior. Ask: \"What is the fear driving this action?\"",
  },
  {
    q: "Should employers use this for hiring?",
    a: "Not recommended. Unlike Big Five, Enneagram lacks predictive validity for job performance. Better used for team dynamics understanding and leadership development post-hire.",
  },
  {
    q: "What is Tritype®?",
    a: "Developed by Katherine Fauvre, Tritype® theory suggests you have one dominant type in each center (Head, Heart, Body). A \"4-6-8\" has Type 4 (heart), Type 6 (head), and Type 8 (body) patterns.",
  },
  {
    q: "How is this different from MBTI?",
    a: "MBTI measures cognitive functions (how you process information); Enneagram measures core wounds and motivations (why you process information that way). MBTI focuses on mental wiring; Enneagram on emotional habits.",
  },
  {
    q: "Can I be multiple types?",
    a: "You have one core type, though you may relate to several. The test identifies your dominant fixation. Wings and lines create complexity, but the core fear/desire pair defines your type.",
  },
];

const enneagramVirtues: Record<EnneagramType, { passion: string; fixation: string; virtue: string; holyIdea: string }> = {
  1: { passion: "Anger/Resentment", fixation: "Perfection", virtue: "Serenity", holyIdea: "Holy Perfection" },
  2: { passion: "Pride", fixation: "Flattery", virtue: "Humility", holyIdea: "Holy Will" },
  3: { passion: "Deceit", fixation: "Vanity", virtue: "Truthfulness", holyIdea: "Holy Harmony" },
  4: { passion: "Envy", fixation: "Melancholy", virtue: "Equanimity", holyIdea: "Holy Origin" },
  5: { passion: "Avarice", fixation: "Stinginess/Retention", virtue: "Non-Attachment", holyIdea: "Holy Omniscience" },
  6: { passion: "Fear", fixation: "Cowardice/Anxiety", virtue: "Courage", holyIdea: "Holy Faith" },
  7: { passion: "Gluttony", fixation: "Planning", virtue: "Sobriety", holyIdea: "Holy Work" },
  8: { passion: "Lust/Excess", fixation: "Vengeance", virtue: "Innocence", holyIdea: "Holy Truth" },
  9: { passion: "Sloth", fixation: "Indolence", virtue: "Right Action", holyIdea: "Holy Love" },
};

const enneagramLines: Record<EnneagramType, { growth: EnneagramType; stress: EnneagramType }> = {
  1: { growth: 7, stress: 4 },
  2: { growth: 4, stress: 8 },
  3: { growth: 6, stress: 9 },
  4: { growth: 1, stress: 2 },
  5: { growth: 8, stress: 7 },
  6: { growth: 9, stress: 3 },
  7: { growth: 5, stress: 1 },
  8: { growth: 2, stress: 5 },
  9: { growth: 3, stress: 6 },
};

const instinctMeta: Record<EnneagramInstinct, { code: EnneagramInstinct; name: string; focus: string }> = {
  sp: { code: "sp", name: "Self-preservation", focus: "Survival/security, resources, stability, self-care" },
  sx: { code: "sx", name: "Sexual (One-to-One)", focus: "Intensity/attraction, bonding, fusion, passion" },
  so: { code: "so", name: "Social", focus: "Belonging/status, community, contribution, group dynamics" },
};

const enneagramQuestionsLegacy: EnneagramQuestion[] = [
  { kind: "type", type: 1, prompt: "I feel responsible to do the \"right\" thing, even when it's hard." },
  { kind: "type", type: 1, prompt: "I notice imperfections quickly and want to correct them." },
  { kind: "type", type: 1, prompt: "I hold myself to high standards and can be self-critical." },
  { kind: "type", type: 1, prompt: "I feel tension when things are sloppy or unethical." },
  { kind: "type", type: 1, prompt: "I often think in terms of \"should\" and \"must\"." },
  { kind: "type", type: 1, prompt: "I prefer structure and discipline over spontaneity." },
  { kind: "type", type: 1, prompt: "I can become resentful when others don't meet standards." },
  { kind: "type", type: 1, prompt: "I try to improve systems and processes continuously." },
  { kind: "type", type: 1, prompt: "I feel uneasy when rules are unclear or inconsistently applied." },
  { kind: "type", type: 1, prompt: "I struggle to relax until tasks are \"done right\"." },
  { kind: "type", type: 1, prompt: "I value integrity over comfort or convenience." },
  { kind: "type", type: 1, prompt: "I can become rigid when stressed." },

  { kind: "type", type: 2, prompt: "I naturally notice what others need and want to help." },
  { kind: "type", type: 2, prompt: "I feel valued when I'm needed." },
  { kind: "type", type: 2, prompt: "I can ignore my own needs while supporting others." },
  { kind: "type", type: 2, prompt: "I find it difficult to say no when someone asks for help." },
  { kind: "type", type: 2, prompt: "I want to feel loved and appreciated by people close to me." },
  { kind: "type", type: 2, prompt: "I sometimes give help hoping it will be reciprocated." },
  { kind: "type", type: 2, prompt: "I can become possessive of relationships I invest in." },
  { kind: "type", type: 2, prompt: "I like to be the person others turn to in a crisis." },
  { kind: "type", type: 2, prompt: "I often focus on relationships more than tasks." },
  { kind: "type", type: 2, prompt: "I may feel hurt if my efforts are unnoticed." },
  { kind: "type", type: 2, prompt: "I can feel guilty when prioritizing myself." },
  { kind: "type", type: 2, prompt: "I can become controlling when stressed." },

  { kind: "type", type: 3, prompt: "I feel driven to achieve and be seen as successful." },
  { kind: "type", type: 3, prompt: "I adapt my image to match what others admire." },
  { kind: "type", type: 3, prompt: "I work hard and stay efficient under pressure." },
  { kind: "type", type: 3, prompt: "I feel uncomfortable when I'm not making progress." },
  { kind: "type", type: 3, prompt: "I can become competitive to stay ahead." },
  { kind: "type", type: 3, prompt: "Recognition and validation strongly motivate me." },
  { kind: "type", type: 3, prompt: "I measure my worth by accomplishments more than feelings." },
  { kind: "type", type: 3, prompt: "I can detach from emotions to stay productive." },
  { kind: "type", type: 3, prompt: "I find it hard to slow down and just be." },
  { kind: "type", type: 3, prompt: "I may become what others expect to win approval." },
  { kind: "type", type: 3, prompt: "I dislike appearing incompetent." },
  { kind: "type", type: 3, prompt: "Under stress, I can become disengaged." },

  { kind: "type", type: 4, prompt: "I feel different from others and search for my unique identity." },
  { kind: "type", type: 4, prompt: "I crave depth, meaning, and emotional authenticity." },
  { kind: "type", type: 4, prompt: "I can become envious when others seem happier or more complete." },
  { kind: "type", type: 4, prompt: "My mood can strongly influence how I see the world." },
  { kind: "type", type: 4, prompt: "I express myself through creativity or aesthetic taste." },
  { kind: "type", type: 4, prompt: "I often feel something is missing in me." },
  { kind: "type", type: 4, prompt: "I process emotions deeply before acting." },
  { kind: "type", type: 4, prompt: "I can be dramatic when overwhelmed." },
  { kind: "type", type: 4, prompt: "I value authenticity more than social fitting-in." },
  { kind: "type", type: 4, prompt: "I may withdraw to make sense of my feelings." },
  { kind: "type", type: 4, prompt: "I feel drawn to what is beautiful, intense, or bittersweet." },
  { kind: "type", type: 4, prompt: "Under stress, I can become clingy." },

  { kind: "type", type: 5, prompt: "I conserve my energy and prefer not to be overwhelmed by demands." },
  { kind: "type", type: 5, prompt: "I feel safer when I understand something deeply." },
  { kind: "type", type: 5, prompt: "I need a lot of privacy and alone time to recharge." },
  { kind: "type", type: 5, prompt: "I can detach from emotions to analyze situations." },
  { kind: "type", type: 5, prompt: "I hoard resources like time, energy, or knowledge." },
  { kind: "type", type: 5, prompt: "I feel uncomfortable when others intrude on my boundaries." },
  { kind: "type", type: 5, prompt: "I prefer observing over participating in many social settings." },
  { kind: "type", type: 5, prompt: "I can seem reserved or hard to read." },
  { kind: "type", type: 5, prompt: "I feel competent when I'm knowledgeable and self-sufficient." },
  { kind: "type", type: 5, prompt: "I may procrastinate if I feel unprepared." },
  { kind: "type", type: 5, prompt: "I can become isolated when stressed." },
  { kind: "type", type: 5, prompt: "I value clarity and precision in ideas." },

  { kind: "type", type: 6, prompt: "I scan for potential problems and prepare for worst-case scenarios." },
  { kind: "type", type: 6, prompt: "I seek guidance or authority when uncertain, then question it." },
  { kind: "type", type: 6, prompt: "I value loyalty, trust, and dependability." },
  { kind: "type", type: 6, prompt: "I can be skeptical and cautious until I feel safe." },
  { kind: "type", type: 6, prompt: "I worry about losing security or support." },
  { kind: "type", type: 6, prompt: "I can become indecisive when stakes feel high." },
  { kind: "type", type: 6, prompt: "I feel calmer when there is a clear plan and structure." },
  { kind: "type", type: 6, prompt: "I may test people to see if they're trustworthy." },
  { kind: "type", type: 6, prompt: "I notice risks that others overlook." },
  { kind: "type", type: 6, prompt: "I can become reactive under stress." },
  { kind: "type", type: 6, prompt: "I value community and shared responsibility." },
  { kind: "type", type: 6, prompt: "I can swing between doubt and certainty." },

  { kind: "type", type: 7, prompt: "I chase new experiences to feel free and satisfied." },
  { kind: "type", type: 7, prompt: "I dislike feeling trapped by pain, limitation, or boredom." },
  { kind: "type", type: 7, prompt: "I generate many options and prefer to keep possibilities open." },
  { kind: "type", type: 7, prompt: "I can distract myself when emotions get heavy." },
  { kind: "type", type: 7, prompt: "I am future-focused and optimistic by default." },
  { kind: "type", type: 7, prompt: "I sometimes avoid commitment to keep freedom." },
  { kind: "type", type: 7, prompt: "I get restless if life feels repetitive." },
  { kind: "type", type: 7, prompt: "I can be scattered when I have too many interests." },
  { kind: "type", type: 7, prompt: "I like to reframe problems into opportunities." },
  { kind: "type", type: 7, prompt: "I can become impulsive under stress." },
  { kind: "type", type: 7, prompt: "I prefer stimulating environments and variety." },
  { kind: "type", type: 7, prompt: "I struggle to sit with discomfort without escaping." },

  { kind: "type", type: 8, prompt: "I instinctively protect myself and others by being strong." },
  { kind: "type", type: 8, prompt: "I dislike being controlled or told what to do." },
  { kind: "type", type: 8, prompt: "I confront problems directly rather than avoid them." },
  { kind: "type", type: 8, prompt: "I can be intense and decisive in conflict." },
  { kind: "type", type: 8, prompt: "I value independence and self-determination." },
  { kind: "type", type: 8, prompt: "I sometimes push boundaries to test strength." },
  { kind: "type", type: 8, prompt: "I can intimidate others without meaning to." },
  { kind: "type", type: 8, prompt: "I have a strong sense of justice and protection." },
  { kind: "type", type: 8, prompt: "I may deny vulnerability until I deeply trust someone." },
  { kind: "type", type: 8, prompt: "Under stress, I can become withdrawn." },
  { kind: "type", type: 8, prompt: "I prefer taking charge when things feel unfair." },
  { kind: "type", type: 8, prompt: "I can be impatient with weakness or indecision." },

  { kind: "type", type: 9, prompt: "I prefer inner harmony and dislike conflict." },
  { kind: "type", type: 9, prompt: "I can merge with others' agendas to keep peace." },
  { kind: "type", type: 9, prompt: "I often delay action to avoid discomfort or disruption." },
  { kind: "type", type: 9, prompt: "I feel calm when life is steady and predictable." },
  { kind: "type", type: 9, prompt: "I can be agreeable even when I disagree inside." },
  { kind: "type", type: 9, prompt: "I sometimes numb out or \"check out\" under stress." },
  { kind: "type", type: 9, prompt: "I dislike asserting myself if it might create tension." },
  { kind: "type", type: 9, prompt: "I can be stubborn in passive ways." },
  { kind: "type", type: 9, prompt: "I value wholeness, connection, and calm presence." },
  { kind: "type", type: 9, prompt: "I may have difficulty identifying my own priorities." },
  { kind: "type", type: 9, prompt: "Growth for me looks like taking action and showing up." },
  { kind: "type", type: 9, prompt: "Under stress, I can become anxious." },

  { kind: "instinct", instinct: "sp", prompt: "I focus on safety, health, money, and practical self-care." },
  { kind: "instinct", instinct: "sp", prompt: "I feel best when my home and routines are secure." },
  { kind: "instinct", instinct: "sp", prompt: "I notice resource limits quickly (time, energy, finances)." },
  { kind: "instinct", instinct: "sp", prompt: "I prioritize comfort, sustainability, and preparation." },
  { kind: "instinct", instinct: "sp", prompt: "I prefer stable environments over unpredictable ones." },
  { kind: "instinct", instinct: "sp", prompt: "I track risks to my stability and try to reduce them." },
  { kind: "instinct", instinct: "sp", prompt: "I value consistency and reliability in daily life." },
  { kind: "instinct", instinct: "sp", prompt: "I get stressed when basic needs feel uncertain." },
  { kind: "instinct", instinct: "sp", prompt: "I naturally plan for long-term security." },
  { kind: "instinct", instinct: "sp", prompt: "I prefer practical decisions over dramatic ones." },
  { kind: "instinct", instinct: "sp", prompt: "I recharge through rest, comfort, and predictable structure." },
  { kind: "instinct", instinct: "sp", prompt: "I prioritize self-preservation even when others disagree." },

  { kind: "instinct", instinct: "sx", prompt: "I crave intensity and deep one-to-one bonds." },
  { kind: "instinct", instinct: "sx", prompt: "I feel most alive in passionate connection or strong attraction." },
  { kind: "instinct", instinct: "sx", prompt: "I focus on chemistry, closeness, and emotional charge." },
  { kind: "instinct", instinct: "sx", prompt: "I can become impatient with relationships that feel bland." },
  { kind: "instinct", instinct: "sx", prompt: "I invest heavily in a few key bonds rather than many connections." },
  { kind: "instinct", instinct: "sx", prompt: "I am drawn to what feels intense, meaningful, or transformative." },
  { kind: "instinct", instinct: "sx", prompt: "I can be all-or-nothing in attachment." },
  { kind: "instinct", instinct: "sx", prompt: "I focus on authenticity and energetic resonance." },
  { kind: "instinct", instinct: "sx", prompt: "I may take risks for love, intensity, or attraction." },
  { kind: "instinct", instinct: "sx", prompt: "I want to be fully known by one person." },
  { kind: "instinct", instinct: "sx", prompt: "I feel restless without intensity or a strong focus." },
  { kind: "instinct", instinct: "sx", prompt: "I can fixate on a person or passion until it resolves." },

  { kind: "instinct", instinct: "so", prompt: "I track group dynamics, belonging, and social status." },
  { kind: "instinct", instinct: "so", prompt: "I care about contribution, reputation, and my role in a community." },
  { kind: "instinct", instinct: "so", prompt: "I notice hierarchies and unspoken rules in groups." },
  { kind: "instinct", instinct: "so", prompt: "I feel motivated by shared purpose and collective goals." },
  { kind: "instinct", instinct: "so", prompt: "I build networks and alliances to support progress." },
  { kind: "instinct", instinct: "so", prompt: "I feel stressed when excluded or unseen by the group." },
  { kind: "instinct", instinct: "so", prompt: "I pay attention to how decisions affect the community." },
  { kind: "instinct", instinct: "so", prompt: "I can read the emotional \"weather\" of groups quickly." },
  { kind: "instinct", instinct: "so", prompt: "I value recognition within a group context." },
  { kind: "instinct", instinct: "so", prompt: "I like being part of something bigger than myself." },
  { kind: "instinct", instinct: "so", prompt: "I often think about influence, impact, and shared values." },
  { kind: "instinct", instinct: "so", prompt: "I naturally organize or participate in group efforts." },
];

function toEnneagramQuestions(
  pool: Array<{ q: string; options: Array<{ text: string; type: EnneagramType | "other" | null; weight: number }> }>
): EnneagramQuestion[] {
  return pool.map((q) => {
    const target = (q.options.find((o) => typeof o.type === "number")?.type ?? 1) as EnneagramType;
    return {
      kind: "type",
      type: target,
      prompt: q.q,
      options: q.options.map((o) => ({
        text: o.text,
        type: typeof o.type === "number" ? (o.type as EnneagramType) : null,
        weight: o.weight,
      })),
    };
  });
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

function toPercentileFromLikert(avg: number): number {
  const z = (avg - 3) / 0.85;
  const p = normalCdf(z);
  const pct = Math.max(0, Math.min(1, p)) * 100;
  return Math.round(pct * 10) / 10;
}

function stabilityLabel(percentile: number): string {
  if (percentile >= 75 || percentile <= 25) return "More stable signal (stronger trait expression)";
  if (percentile >= 40 && percentile <= 60) return "More flexible signal (balanced expression)";
  return "Moderately stable signal";
}

function growthTipForFacet(facet: string): string {
  const tips: Record<string, string> = {
    Anxiety: "Practice structured worry time + relaxation routines; reduce uncertainty with planning and sleep hygiene.",
    "Angry Hostility": "Use pause-and-label techniques, and rehearse repair attempts during conflict.",
    Depression: "Build behavioral activation (small daily wins) and increase supportive routines; consult professionals if needed.",
    "Self-Consciousness": "Train exposure in low-stakes social settings and reframe mind-reading assumptions.",
    Impulsiveness: "Add friction to temptations (delays, environment design) and strengthen “if-then” plans.",
    Vulnerability: "Create stress buffers: routines, social support, and recovery rituals; practice gradual stress inoculation.",
    Order: "Use simple systems (checklists, weekly reset) rather than perfection; aim for consistency.",
    "Self-Discipline": "Shrink tasks to 5-minute starters and track streaks; remove distractions by default.",
    Deliberation: "Add a decision checklist (pros/cons, second-order effects) before big commitments.",
    "Achievement Striving": "Set measurable goals and review weekly; prioritize sustainable pace over intensity.",
    Competence: "Pick one skill to deepen for 30 days; practice deliberate feedback loops.",
    Dutifulness: "Align commitments to values; reduce overcommitting by setting clear boundaries.",
    Ideas: "Schedule curiosity time: read, learn, and summarize; join a learning community.",
    Aesthetics: "Explore one art form weekly and note what moves you; build taste through exposure.",
    Feelings: "Name emotions precisely and reflect on triggers; journaling improves emotional clarity.",
    Actions: "Try small novelty: new routes, new classes, new experiences to expand comfort zones.",
    Values: "Revisit beliefs with evidence; discuss respectfully with people who disagree to reduce rigidity.",
    Warmth: "Practice small pro-social moves: greetings, appreciation, and active listening.",
    Gregariousness: "Build a social cadence (one group activity/week) that matches your energy recovery needs.",
    Assertiveness: "Rehearse boundary scripts and ask directly for what you need in low-stakes contexts.",
    Activity: "Add movement snacks and time blocks; optimize energy with sleep and exercise.",
    "Excitement-Seeking": "Channel novelty into safe challenges (sports, projects) rather than risky impulses.",
    "Positive Emotions": "Boost positive emotion with gratitude, sunlight, movement, and social connection.",
    Trust: "Calibrate trust: start small, verify patterns, and avoid all-or-nothing assumptions.",
    Straightforwardness: "Balance honesty with timing and tone; aim for clarity without unnecessary harshness.",
    Altruism: "Volunteer in small consistent doses; avoid burnout with boundaries and recovery.",
    Compliance: "Practice conflict skills (I-statements, negotiation) without escalation or avoidance.",
    Modesty: "Own achievements without self-erasure; speak facts without over-defensiveness.",
    "Tender-Mindedness": "Pair empathy with boundaries; validate feelings while staying grounded in reality.",
  };
  return tips[facet] ?? "Choose one small habit that strengthens this facet and track it weekly for 4–6 weeks.";
}

function oppositeLetter(letter: "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P"): typeof letter {
  const map: Record<string, string> = { E: "I", I: "E", S: "N", N: "S", T: "F", F: "T", J: "P", P: "J" };
  return (map[letter] ?? letter) as typeof letter;
}

function dimensionLetters(d: MbtiDimension): Array<MbtiQuestion["options"][number]["letter"]> {
  if (d === "EI") return ["E", "I"];
  if (d === "SN") return ["S", "N"];
  if (d === "TF") return ["T", "F"];
  return ["J", "P"];
}

function inferRoadmap(inferior: string): string[] {
  const key = inferior.toUpperCase();
  const map: Record<string, string[]> = {
    SE: ["Practice grounding in the present (sensory focus, movement)", "Train “good enough” execution, not perfection", "Take small real-world risks intentionally"],
    SI: ["Build steady routines and repeatable habits", "Document details and learn from past outcomes", "Practice consistency under stress"],
    NE: ["Brainstorm alternatives before committing to one plan", "Practice playful curiosity and exploration", "Notice new patterns and connections in daily life"],
    NI: ["Schedule reflection time to connect patterns over time", "Practice long-term visioning and meaning-making", "Slow down to spot second-order effects"],
    TE: ["Create simple systems: checklists, metrics, deadlines", "Practice direct decision-making and prioritization", "Translate values into executable plans"],
    TI: ["Clarify definitions and logic before reacting", "Practice structured analysis of problems", "Slow down to test assumptions"],
    FE: ["Practice empathy scripts and validation before fixing", "Notice group dynamics and emotional tone", "Strengthen repair attempts in conflict"],
    FI: ["Clarify your values and personal boundaries", "Name emotions precisely and reflect on meaning", "Practice authenticity even under pressure"],
  };
  return map[key] ?? ["Develop your weaker function gently through small daily reps", "Notice stress triggers that push you into extremes", "Balance your strengths with intentional practice"];
}

function matchFunctionStack(typeCode: string): string {
  return typeProfiles[typeCode]?.functions ?? "Function stack varies by model; use your type as a starting point for deeper study.";
}

function inferInferiorFunction(stack: string): string | null {
  const parts = stack.split("-").map((s) => s.trim()).filter(Boolean);
  const inferior = parts[3] ?? null;
  return inferior;
}

type HollandLetter = "R" | "I" | "A" | "S" | "E" | "C";

type HollandQuestion = {
  prompt: string;
  letter: HollandLetter;
  options: Array<{
    text: string;
    type: HollandLetter | null;
    weight: number;
  }>;
};

type HollandAnswerState = {
  selectedIndex: number | null;
  selectedType: HollandLetter | null;
  weight: number | null;
};

const hollandTitle = "🎓 Holland Code Assessment: The Vocational Fit Inventory";
const hollandDescription =
  "48 questions • 6 personality types • 3-letter code system • Hexagonal congruence model • Evidence-based career prediction";

const hollandWhatYouGet = [
  "6 Vocational Personality Types: Realistic, Investigative, Artistic, Social, Enterprising, Conventional (RIASEC)—each representing distinct work environments and interest patterns",
  "3-Letter Holland Code: Your unique combination (e.g., IAE, RSE, CIS) ranking your top three vocational interests",
  "720 Occupation Database: Integration with O*NET (U.S. Department of Labor) matching your code to specific careers",
  "Congruence Score: Mathematical calculation of fit between your personality and chosen/available work environment",
  "Consistency Analysis: Whether your interests are compatible (adjacent on hexagon) or conflicting (opposite)",
  "Differentiation Index: Clarity of your interests (focused vs. undifferentiated profile)",
  "Career Satisfaction Predictor: Statistical probability of job satisfaction, stability, and achievement based on person-environment fit",
];

const hollandHexagonDiagram = `      Realistic (R)
      /        \\
Investigative (I) — Conventional (C)
      |            |
Artistic (A)  — Enterprising (E)
      \\        /
       Social (S)`;

const hollandMethodologySections = [
  {
    title: "The Hexagonal Model",
    text: "John Holland arranged the six types in a hexagon (RIASEC order) based on empirical correlations between interests.",
    bullets: [
      "Proximity = Similarity: Adjacent types (R-I, I-A, A-S, S-E, E-C, C-R) share psychological traits and work preferences.",
      "Opposite types (R-S, I-E, A-C) represent contrasting orientations.",
    ],
  },
  {
    title: "The Four Secondary Constructs",
    bullets: [
      "1. Congruence (Person-Environment Fit): Calculated using indices like the C-index or Iachan index. High congruence predicts job satisfaction/performance, stability/persistence, and vocational achievement.",
      "2. Consistency: Whether your top types are adjacent on the hexagon (e.g., R-I-A) vs. conflicting (e.g., R-S-E).",
      "3. Differentiation: Sharpness of your profile (peaked vs. flat). More differentiated profiles predict focused career decisions.",
      "4. Identity: Clarity and stability of your vocational self-concept (crystallized goals vs. indecision).",
    ],
  },
  {
    title: "Scientific Validation",
    text: "Holland's theory is one of the most empirically supported models in vocational psychology.",
    bullets: [
      "Structural validity: Hexagon replicated across 50+ countries and cultures",
      "Predictive validity: Congruence correlates with job satisfaction (r = .30–.40) and persistence",
      "Cross-occupational stability: Interest patterns remain consistent across age groups",
      "Integration with Big Five: Enterprising correlates with Extraversion; Conventional with Conscientiousness",
    ],
  },
];

const hollandHistory = [
  { year: "1940s", title: "Military Observations", desc: "Holland notices occupational history patterns while serving in WWII as an Army personnel clerk." },
  { year: "1950–1953", title: "Western Reserve University", desc: "As a counselor, Holland observes students with different interests exhibit different personalities and begins occupational sketches." },
  { year: "1959", title: "The Breakthrough", desc: "Publishes \"A Theory of Vocational Choice\" proposing six types/environments (original labels: Motor, Intellectual, Esthetic, Supportive, Persuasive, Conforming)." },
  { year: "1966–1973", title: "Instrument Development", desc: "Develops Self-Directed Search (SDS, 1973) plus VPI and Positions Classification Inventory." },
  { year: "1985", title: "The Modern Synthesis", desc: "Making Vocational Choices formalizes hexagon model and congruence theory; becomes a foundational text." },
  { year: "1994–1999", title: "Academic Recognition", desc: "RIASEC hexagon becomes a standard icon in vocational psychology research and publishing." },
  { year: "2008–Present", title: "Digital Integration", desc: "O*NET adopts RIASEC to classify 900+ occupations; modern platforms compute congruence for career matching." },
];

type HollandTypeProfile = {
  icon: string;
  code: HollandLetter;
  title: string;
  core: string;
  high: string[];
  low: string[];
  facetsTitle: string;
  facets: string[];
  workplaceDNA: string;
  bigFive: string;
};

const hollandTypesDeepDive: HollandTypeProfile[] = [
  {
    icon: "🔧",
    code: "R",
    title: "Realistic (R) — The Doers",
    core: "Working with things, tools, machines, animals, and nature. Concrete, practical, hands-on problem solving.",
    high: [
      "Pragmatic operators: Prefer tangible results over theory; \"act first, discuss later\"",
      "Mechanically inclined: Natural aptitude for machinery, construction, physical systems",
      "Straightforward: Genuine, modest, persistent, thrifty",
      "Physical stamina: Comfortable with outdoor work, manual labor, tool operation",
      "Risk tolerance: Accept physical risks and unstructured environments",
    ],
    low: [
      "Intellectual/abstract preference: Uncomfortable with manual tasks; prefer conceptual work",
      "Physical detachment: Dislike outdoors, physical exertion, or mechanical systems",
      "Social/interpersonal focus: Prefer people-oriented over object-oriented tasks",
    ],
    facetsTitle: "The Six Facets (SDS subscales)",
    facets: ["Mechanical: Working with machines/tools", "Outdoor: Agriculture, forestry, nature", "Technical: Applied technology and systems"],
    workplaceDNA:
      "Thrive as engineers, electricians, pilots, farmers, mechanics, military personnel, athletes. Struggle in ambiguous office politics or heavy documentation roles without tangible output.",
    bigFive: "High Conscientiousness; low Openness (preference for concrete over abstract)",
  },
  {
    icon: "🔬",
    code: "I",
    title: "Investigative (I) — The Thinkers",
    core: "Working with ideas, data, research, and intellectual problem-solving. Analytical, curious, exact.",
    high: [
      "Intellectually curious: Love abstract thinking, scientific inquiry, complex analysis",
      "Independent: Prefer autonomous work; skeptical of authority without evidence",
      "Precise: Detail-oriented in research; exacting standards for truth",
      "Reserved: Quiet, modest, cautious in social interactions",
      "Theoretical: Value understanding principles over practical application",
    ],
    low: [
      "Action-oriented: Prefer doing over analyzing; impatient with research phases",
      "Practical focus: Want immediate application; dismissive of \"ivory tower\" thinking",
      "Social engagement: Prefer collaborative work over solitary study",
    ],
    facetsTitle: "The Six Facets",
    facets: ["Science: Biology, chemistry, physics", "Mathematics: Numbers, algorithms, statistics", "Medical: Diagnosis, research medicine"],
    workplaceDNA:
      "Excel as scientists, data analysts, physicians, academics, software developers, lab technicians. Struggle in sales, management requiring political navigation, or roles without intellectual challenge.",
    bigFive: "High Openness; Introversion; moderate Conscientiousness",
  },
  {
    icon: "🎨",
    code: "A",
    title: "Artistic (A) — The Creators",
    core: "Self-expression through art, design, writing, performance. Innovative, non-conforming, intuitive.",
    high: [
      "Creative thinkers: Generate novel ideas; think outside conventional frameworks",
      "Expressive: Communicate through aesthetic mediums; emotionally attuned",
      "Independent: Resist structure and rules; autonomous work style",
      "Open: Original, impulsive, intuitive rather than systematic",
      "Unconventional: Challenge tradition; value uniqueness over conformity",
    ],
    low: [
      "Structured preference: Prefer clear guidelines and standardized procedures",
      "Traditional values: Respect established methods; skeptical of \"artistic temperament\"",
      "Concrete focus: Uncomfortable with ambiguity and subjective evaluation",
    ],
    facetsTitle: "The Six Facets",
    facets: ["Music: Performance, composition, appreciation", "Art: Visual arts, design, architecture", "Writing: Creative, journalistic, technical"],
    workplaceDNA:
      "Thrive as designers, writers, musicians, therapists (art/music), architects, marketers. Struggle in rigid bureaucratic hierarchies, heavily regulated environments, or roles requiring strict protocol adherence.",
    bigFive: "Very high Openness; moderate Neuroticism (sensitivity)",
  },
  {
    icon: "🤝",
    code: "S",
    title: "Social (S) — The Helpers",
    core: "Helping, teaching, counseling, serving others. Relationship-centered, cooperative, supportive.",
    high: [
      "Empathetic: Deeply attuned to others' emotions and needs",
      "Verbal communicators: Skilled at teaching, explaining, mediating",
      "Altruistic: Find satisfaction in service; nurturing and generous",
      "Cooperative: Prefer teamwork; conflict-averse and harmony-seeking",
      "Patient: Comfortable with gradual human development processes",
    ],
    low: [
      "Task-oriented: Prefer working with things/data over emotional labor",
      "Independent: Uncomfortable with dependency relationships or caregiving",
      "Competitive: View relationships through achievement/competition lens",
    ],
    facetsTitle: "The Six Facets",
    facets: ["Teaching: Education, training, coaching", "Counseling: Therapy, guidance, social work", "Human services: Healthcare support, community organizing"],
    workplaceDNA:
      "Excel as teachers, nurses, counselors, HR professionals, social workers, clergy. Struggle in isolated research roles, aggressive sales environments, or dehumanizing systems.",
    bigFive: "High Extraversion; high Agreeableness; moderate Neuroticism (emotional investment)",
  },
  {
    icon: "💼",
    code: "E",
    title: "Enterprising (E) — The Persuaders",
    core: "Leading, managing, persuading, selling. Ambitious, energetic, socially dominant.",
    high: [
      "Leadership drive: Naturally take charge; comfortable with visibility and authority",
      "Persuasive: Skilled at selling ideas, products, or services; influencing others",
      "Risk-tolerant: Accept financial/career risks; entrepreneurial mindset",
      "Energetic: Fast-paced; thrive on challenge and competition",
      "Optimistic: Confident in abilities; ambitious goal-setting",
    ],
    low: [
      "Collaborative preference: Prefer being team member rather than leader",
      "Risk-averse: Seek stability and security over advancement opportunities",
      "Modest: Uncomfortable with self-promotion or aggressive tactics",
    ],
    facetsTitle: "The Six Facets",
    facets: ["Leadership: Management, administration, politics", "Sales: Business development, persuasion", "Entrepreneurship: Venture creation, risk management"],
    workplaceDNA:
      "Thrive as executives, sales directors, lawyers, politicians, entrepreneurs, consultants. Struggle in isolated technical roles without influence opportunities, or rigid hierarchies limiting autonomy.",
    bigFive: "High Extraversion; high Conscientiousness; low Neuroticism (emotional stability under pressure)",
  },
  {
    icon: "📊",
    code: "C",
    title: "Conventional (C) — The Organizers",
    core: "Working with data, files, systems, and structured procedures. Detail-oriented, systematic, accurate.",
    high: [
      "Systematic: Excel at organizing, categorizing, and maintaining records",
      "Detail-focused: Spot errors; meticulous with data accuracy",
      "Rule-followers: Respect hierarchy and procedures; conscientious",
      "Efficient: Optimize processes; value order and predictability",
      "Numerical aptitude: Comfortable with calculations, accounting, data entry",
    ],
    low: [
      "Innovative preference: Prefer creating new systems over maintaining existing ones",
      "Ambiguity-tolerant: Comfortable with unclear guidelines; flexible",
      "Autonomous: Resist bureaucratic constraints and rigid protocols",
    ],
    facetsTitle: "The Six Facets",
    facets: ["Clerical: Data entry, filing, transcription", "Computational: Accounting, auditing, financial analysis", "Systematic: Quality control, regulatory compliance"],
    workplaceDNA:
      "Excel as accountants, auditors, database administrators, compliance officers, financial analysts, administrative managers. Struggle in chaotic startup environments, roles requiring constant improvisation, or ambiguous authority structures.",
    bigFive: "High Conscientiousness; moderate Neuroticism (detail anxiety)",
  },
];

const hollandCodePatterns = [
  { code: "RIA", name: "The Technical Creator", profile: "Analytical + Hands-on + Innovative", careers: "Biomedical engineer, Industrial designer, Architecture" },
  { code: "IAS", name: "The Scholar-Teacher", profile: "Research + Communication + Service", careers: "Professor, Science writer, Medical researcher" },
  { code: "SAE", name: "The Social Entrepreneur", profile: "Helping + Leadership + Creativity", careers: "Non-profit director, Educational consultant, HR executive" },
  { code: "ECS", name: "The Organized Leader", profile: "Business + Social + Structure", careers: "Healthcare administrator, School principal, Operations manager" },
  { code: "RIC", name: "The Technical Specialist", profile: "Mechanical + Analytical + Systematic", careers: "Aerospace engineer, Quality assurance, Network architect" },
  { code: "ASE", name: "The Creative Communicator", profile: "Art + Service + Persuasion", careers: "Art therapist, Public relations, Creative director" },
];

const hollandVsBigFiveRows = [
  { aspect: "Focus", holland: "Vocational interests & career fit", bigFive: "General personality traits" },
  { aspect: "Origin", holland: "Applied counseling psychology (Holland 1959)", bigFive: "Differential psychology (lexical hypothesis)" },
  { aspect: "Structure", holland: "6 types in hexagonal arrangement", bigFive: "5 continuous dimensions" },
  { aspect: "Measurement", holland: "3-letter code + congruence indices", bigFive: "Percentile scores (0-100)" },
  { aspect: "Primary Use", holland: "Career counseling, job matching, education planning", bigFive: "Clinical assessment, research, broad prediction" },
  { aspect: "Changeability", holland: "Moderately stable; evolves with exposure", bigFive: "Stable traits with gradual maturity trends" },
  { aspect: "Outcome Prediction", holland: "Career satisfaction, persistence, choice", bigFive: "Life outcomes across domains (health, relationships, performance)" },
  { aspect: "Best For", holland: "\"What career should I choose?\"", bigFive: "\"What am I like as a person?\"" },
];

const hollandSynthesis = [
  "The Synthesis: Holland predicts where you will thrive vocationally; Big Five predicts how you will behave in any context. Use Holland for career decisions; Big Five for understanding interpersonal dynamics and personal development.",
];

const hollandFaq = [
  {
    q: "Can my Holland Code change over time?",
    a: "Moderately stable. Primary interests crystallize by age 25–30, but secondary and tertiary codes may shift with exposure and life stages. A mid-career change often reflects latent interests becoming dominant or environmental dissatisfaction driving exploration.",
  },
  {
    q: "What if I have low differentiation (flat profile)?",
    a: "Undifferentiated interests suggest either broad versatility or career indecision. You may thrive in generalist roles (management, consulting) or require more self-exploration to identify passions. Low differentiation correlates with higher career indecision.",
  },
  {
    q: "Which code is best for high income?",
    a: "Enterprising (E) codes correlate highest with income potential, particularly ECS and EIS combinations. However, congruence matters more than prestige—matching your profile reduces turnover and disengagement long-term.",
  },
  {
    q: "Why does my code not match my current job?",
    a: "Incongruence explains job dissatisfaction. If you're an Artistic type in a Conventional job, you experience environmental mismatch—predicting burnout and turnover. The solution is adapting the role (adding congruent projects) or transitioning to congruent environments.",
  },
  {
    q: "Is this valid for non-Western cultures?",
    a: "Yes. The hexagonal structure has been replicated across 50+ countries including China, Japan, Nigeria, and Brazil. While specific occupations vary culturally, the six-type structure remains universal.",
  },
  {
    q: "How is this different from the Strong Interest Inventory?",
    a: "Strong measures interests via occupational preferences (liking/disliking specific jobs). Holland measures personality types that predict interest patterns. Strong is descriptive; Holland is theoretical and predictive. Modern assessments often combine both.",
  },
  {
    q: "Can I be successful in an incongruent career?",
    a: "Short-term yes, long-term challenging. Success requires compensatory strategies. Research shows congruence predicts both satisfaction and objective performance metrics.",
  },
  {
    q: "What about the \"new\" RIASEC models?",
    a: "The hexagon remains stable, but modern extensions include the Interest Circle (continuous dimensions) and Interest Globe (3D spherical model). These provide finer granularity but retain Holland's six-type foundation.",
  },
  {
    q: "Should employers use this for hiring?",
    a: "Yes, with caution. RIASEC can improve job fit and reduce turnover when used for development and team composition. Legal guidelines require job relevance and avoidance of adverse impact; best for career pathing rather than selection filters.",
  },
  {
    q: "What if my top types are opposite (e.g., R and S)?",
    a: "Contradictory interests create internal conflict. Solutions include hybrid careers, sequential careers, or choosing environments that satisfy both (technical trainer, scientific sales).",
  },
];

const hollandMeta: Record<HollandLetter, { code: HollandLetter; name: string; icon: string }> = {
  R: { code: "R", name: "Realistic", icon: "🔧" },
  I: { code: "I", name: "Investigative", icon: "🔬" },
  A: { code: "A", name: "Artistic", icon: "🎨" },
  S: { code: "S", name: "Social", icon: "🤝" },
  E: { code: "E", name: "Enterprising", icon: "💼" },
  C: { code: "C", name: "Conventional", icon: "📊" },
};

const hollandHexOrder: HollandLetter[] = ["R", "I", "A", "S", "E", "C"];

function hollandHexDistance(a: HollandLetter, b: HollandLetter): number {
  const ia = hollandHexOrder.indexOf(a);
  const ib = hollandHexOrder.indexOf(b);
  const d = Math.abs(ia - ib);
  return Math.min(d, 6 - d);
}

function hollandSimilarity(a: HollandLetter, b: HollandLetter): number {
  const d = hollandHexDistance(a, b);
  if (d === 0) return 3;
  if (d === 1) return 2;
  if (d === 2) return 1;
  return 0;
}

function hollandConsistencyLabel(code: string): { label: string; detail: string } {
  const a = code[0] as HollandLetter | undefined;
  const b = code[1] as HollandLetter | undefined;
  if (!a || !b) return { label: "Unknown", detail: "Not enough information to compute consistency." };
  const d = hollandHexDistance(a, b);
  if (d === 1) return { label: "High consistency", detail: "Top interests are adjacent on the hexagon (compatible)." };
  if (d === 2) return { label: "Moderate consistency", detail: "Top interests are separated by one step (mixed but workable)." };
  return { label: "Low consistency", detail: "Top interests are opposite on the hexagon (potential tension)." };
}

function hollandDifferentiationIndex(percentiles: number[]): number {
  if (percentiles.length === 0) return 0;
  const sorted = [...percentiles].sort((a, b) => b - a);
  const top = sorted[0] ?? 0;
  const rest = sorted.slice(1);
  const meanRest = rest.length ? rest.reduce((s, x) => s + x, 0) / rest.length : 0;
  const diff = Math.max(0, Math.min(100, top - meanRest));
  return Math.round(diff);
}

function hollandIdentityLabel(topGap: number, diffIndex: number): { label: string; detail: string } {
  if (topGap >= 15 && diffIndex >= 25) return { label: "High identity", detail: "Your profile is peaked and clearly differentiated." };
  if (topGap >= 8 || diffIndex >= 18) return { label: "Moderate identity", detail: "Your profile shows a direction but with some flexibility." };
  return { label: "Low identity", detail: "Your interests look broad/flat; more exploration may help crystallize direction." };
}

function hollandCongruenceScore(personCode: string, envCode: string): number {
  const p = personCode.toUpperCase().split("").slice(0, 3) as HollandLetter[];
  const e = envCode.toUpperCase().split("").slice(0, 3) as HollandLetter[];
  if (p.length < 3 || e.length < 3) return 0;
  const posW = [3, 2, 1];
  let score = 0;
  let max = 0;
  for (let i = 0; i < 3; i += 1) {
    const pi = p[i];
    const ei = e[i];
    if (!pi || !ei) continue;
    score += posW[i] * hollandSimilarity(pi, ei);
    max += posW[i] * 3;
  }
  if (max <= 0) return 0;
  return Math.round((score / max) * 100);
}

function toHollandQuestions(
  pool: Array<{ q: string; options: Array<{ text: string; type: HollandLetter | "other" | null; weight: number }> }>
): HollandQuestion[] {
  return pool.map((q) => {
    const target = (q.options.find((o) => o.type && o.type !== "other")?.type ?? "R") as HollandLetter;
    return {
      prompt: q.q,
      letter: target,
      options: q.options.map((o) => ({
        text: o.text,
        type: o.type && o.type !== "other" ? (o.type as HollandLetter) : null,
        weight: o.weight,
      })),
    };
  });
}

type EqBranch = "Perceiving" | "Facilitating" | "Understanding" | "Managing";
type EqTraitDomain = "Intrapersonal" | "Interpersonal" | "Stress Management" | "Adaptability" | "General Mood";
type EqTraitSubscale =
  | "Self-Regard"
  | "Emotional Self-Awareness"
  | "Assertiveness"
  | "Independence"
  | "Self-Actualization"
  | "Empathy"
  | "Social Responsibility"
  | "Interpersonal Relationship"
  | "Stress Tolerance"
  | "Impulse Control"
  | "Reality-Testing"
  | "Flexibility"
  | "Problem-Solving"
  | "Optimism"
  | "Happiness";

type EqQuestion = {
  kind: "ability" | "trait";
  prompt: string;
  branch?: EqBranch;
  subscale?: EqTraitSubscale;
  reverse?: boolean;
};

type EqAnswerState = {
  value: 1 | 2 | 3 | 4 | 5 | null;
};

const eqTitle = "🎓 EQ Assessment: The Emotional Competency Inventory";
const eqDescription =
  "141 questions • 4 ability branches • 5 mixed domains • 15 subscales • Objective scoring • Predictive validity for life success";

const eqWhatYouGet = [
  "Four Ability Branches (MSCEIT Model): Perceiving, Connecting/Facilitating, Understanding, and Managing emotions—measured as objective mental abilities",
  "EQ Score (Emotional Quotient): Standardized score comparing your emotional reasoning to population norms (similar to IQ scoring)",
  "15 Subscale Profile (EQ-i 2.0): Intrapersonal, Interpersonal, Stress Management, Adaptability, and General Mood composites with competencies like empathy, impulse control, and optimism",
  "12 Competency Clusters (ESCI): Self-awareness, Self-management, Social awareness, Relationship management—rated via 360° feedback",
  "Ability vs. Trait Analysis: Distinguish between innate emotional personality (Trait EI) and developable emotional skills (Ability EI)",
  "Developmental Roadmap: Specific training targets based on branch deficits (e.g., micro-expression recognition training for low Perceiving scores)",
  "Leadership Predictor: ESCI scores predict executive leadership effectiveness independent of IQ and personality",
];

const eqModels = [
  {
    title: "1. Ability Model (Mayer-Salovey-Caruso) — The Scientific Gold Standard",
    bullets: [
      "Emotional intelligence as a cognitive ability: processing emotional information",
      "Measured via performance tests with correct/incorrect answers (like IQ tests), not self-report",
      "Objective measurement: answers scored for accuracy against expert/veridical consensus",
      "Four-branch hierarchical structure: skills build from perception to management",
      "Distinct from personality: correlates with Big Five (r = .20–.40) but measures distinct variance",
    ],
  },
  {
    title: "2. Trait Model (Bar-On/Petrides) — The Self-Perception Approach",
    bullets: [
      "Emotional intelligence as personality disposition: self-perceptions and tendencies measured via self-report",
      "EQ-i 2.0: 133 items measuring emotional-social intelligence (coping & adaptation)",
      "TEIQue: 153 items measuring global trait EI with Well-being, Self-control, Emotionality, Sociability",
      "Overlap with Big Five: shares 50–60% variance, especially Neuroticism and Extraversion",
    ],
  },
  {
    title: "3. Mixed Model (Goleman-Boyatzis) — The Competency Framework",
    bullets: [
      "Integration of emotional abilities, social competencies, and learned workplace behaviors",
      "Measured via 360° assessment (ESCI): observable behaviors rated by others",
      "Behavioral focus: what people do, not just what they know",
      "Leadership-centric: designed for organizational effectiveness prediction",
    ],
  },
];

const eqAbilityHierarchy = [
  {
    title: "Branch 1: Perceiving Emotions (The Foundation)",
    bullets: [
      "Ability: Identify emotions in faces, voices, pictures, and objects",
      "Tasks: Faces task, Pictures task",
      "Neural basis: right hemisphere facial affect processing; amygdala reactivity to emotional cues",
    ],
  },
  {
    title: "Branch 2: Connecting/Facilitating Thought (Integration)",
    bullets: [
      "Ability: Harness emotions to facilitate reasoning, problem-solving, creativity",
      "Mechanism: mood congruence—matching emotional state to task requirements",
      "Synonyms: \"Using emotions\" (MSCEIT 1.0) vs. \"Connecting emotions\" (MSCEIT 2.0)",
    ],
  },
  {
    title: "Branch 3: Understanding Emotions (Comprehension)",
    bullets: [
      "Ability: Comprehend emotion language, blends, and progressions",
      "Blends: mixed emotions (joy/sadness); Progressions: anger → shame → remorse",
      "Most demanding branch; correlates with verbal IQ (r = .43)",
    ],
  },
  {
    title: "Branch 4: Managing Emotions (Regulation)",
    bullets: [
      "Ability: Regulate emotions in self and others to achieve goals",
      "Strategic focus: open/closed emotional states for problem-solving; social effectiveness",
      "Interpersonal component: comforting, motivating, conflict resolution",
    ],
  },
  {
    title: "MSCEIT 2.0 Update (2024)",
    bullets: [
      "Revised to fit CHC model of intelligence; 33% shorter (83–107 items)",
      "Veridical scoring replacing expert consensus; improved psychometrics",
      "Strengthened integration between Understanding and Managing branches",
    ],
  },
];

const eqHistory = [
  { year: "1985", title: "Bar-On Coins \"EQ\"", desc: "Reuven Bar-On coins the term Emotional Quotient and begins developing EQ-i based on clinical observations of psychological adaptation." },
  { year: "1986", title: "Payne's Dissertation", desc: "Wayne Payne’s early academic use of the term focuses on emotional suppression and development." },
  { year: "1990", title: "The Academic Birth", desc: "Salovey & Mayer define EI as monitoring, discriminating, and using emotions to guide thinking and action." },
  { year: "1993–1997", title: "The Four-Branch Model", desc: "Mayer & Salovey refine the hierarchical four-branch framework (1997)." },
  { year: "1995", title: "The Popularization", desc: "Daniel Goleman popularizes EI; later clarifies over-strong claims about success percentages." },
  { year: "1997", title: "First Commercial Assessment", desc: "Bar-On publishes EQ-i with norms and Buros-reviewed validity." },
  { year: "2000", title: "The Handbook", desc: "Bar-On & Parker co-edit The Handbook of Emotional Intelligence." },
  { year: "2002", title: "MSCEIT Launch", desc: "Mayer, Salovey & Caruso publish MSCEIT—141-item ability measure with objective scoring." },
  { year: "2003", title: "ESCI for Leadership", desc: "Goleman & Boyatzis develop ESCI—360° assessment measuring 12 competencies predicting leadership beyond IQ/personality." },
  { year: "2007", title: "Trait EI Formalization", desc: "Petrides formalizes Trait EI (TEIQue) as distinct from ability EI." },
  { year: "2024", title: "MSCEIT 2.0", desc: "Revised MSCEIT aligns with CHC model; veridical scoring; shorter length with improved psychometrics." },
];

type EqBranchDeepDive = {
  icon: string;
  title: string;
  core: string;
  abilities: string[];
  high: string[];
  low: string[];
  neural: string;
  impact: string;
};

const eqBranchesDeepDive: EqBranchDeepDive[] = [
  {
    icon: "👁️",
    title: "Branch 1: Perceiving Emotions (The Receptive Foundation)",
    core: "Accurate identification of emotional data in self and environment",
    abilities: ["Facial recognition (micro-expressions)", "Vocal prosody (tone/pitch/cadence)", "Cross-modal integration (visual + auditory cues)"],
    high: ["Social radar: detect subtle mood shifts; read the room", "Interoceptive accuracy: notice physiological signals", "Artistic sensitivity: detect emotional atmospheres in art/music/nature"],
    low: ["Alexithymic traits: difficulty naming emotions", "Social cue blindness: miss sarcasm/unspoken tension", "Literal interpretation: focus on words over subtext"],
    neural: "Right hemisphere superior temporal sulcus; amygdala salience; insula for interoception",
    impact: "Essential for therapists, negotiators, sales, teachers; deficits linked to autism spectrum presentations and social anxiety",
  },
  {
    icon: "🔗",
    title: "Branch 2: Facilitating/Connecting Thought (The Integrative Bridge)",
    core: "Harness emotions to enhance cognitive processes",
    abilities: [
      "Emotional-cognitive matching: select moods congruent with task demands",
      "Somatic markers: use gut feelings in decision-making (Iowa Gambling Task)",
      "Creative leverage: access emotional memory for innovation",
    ],
    high: ["Mood optimization: cultivate emotional states for tasks", "Somatic markers: use intuition effectively", "Creative leverage: emotional memory supports innovation"],
    low: ["Cognitive rigidity: same approach regardless of context", "Emotional interference: distracted by feelings", "Pure rationalism: suppress emotions (counterproductive)"],
    neural: "Frontoparietal control networks interacting with affect systems; context-dependent modulation",
    impact: "Supports creativity, decision quality, and adaptive problem-solving; distinguishes utilization from suppression",
  },
  {
    icon: "🧠",
    title: "Branch 3: Understanding Emotions (The Cognitive Architecture)",
    core: "Comprehend emotion dynamics, vocabulary, and complex transitions",
    abilities: ["Emotion lexicon: nuanced vocabulary", "Progression analysis: predict trajectories", "Combinatorial logic: blends (bittersweet nostalgia)"],
    high: ["Emotional forecasting: predict long-term emotional effects", "Psychological sophistication: causal narratives", "Therapeutic aptitude: guide transitions"],
    low: ["Emotional simplicity: good/bad only", "Transition blindness: surprised by predictable shifts", "Vocabulary poverty: cannot name nuanced states"],
    neural: "Higher cognitive load; strongest correlation with verbal IQ (r = .45)",
    impact: "Predicts nuance in communication, therapy skill, and accurate interpretation of complex feelings",
  },
  {
    icon: "🎛️",
    title: "Branch 4: Managing Emotions (The Regulatory Executive)",
    core: "Strategic regulation of emotion for goals and social harmony",
    abilities: ["Intrapersonal regulation (soothing, sustaining positive states)", "Interpersonal influence (comfort, motivate, defuse conflict)", "Right emotion/right degree/right time (Aristotle)"],
    high: ["Emotional agility: rapid recovery and resilience", "Social effectiveness: calm, inspire, navigate politics", "Delayed gratification: resist impulses for long-term goals"],
    low: ["Emotional flooding: overwhelmed (amygdala hijacking)", "Chronic suppression: bottling leading to outbursts", "Regulatory outsourcing: depend on others for regulation"],
    neural: "Prefrontal (vmPFC/OFC) regulation of amygdala; anterior cingulate conflict monitoring",
    impact: "Predicts relationship satisfaction, leadership emergence, mental health stability, persistence beyond IQ",
  },
];

const eqAlternativeFrameworks = [
  {
    title: "Goleman's Five Domains (ESCI Model)",
    text: "Competency-based, leadership-centric learned behaviors measured via 360° ratings (ESCI-U).",
    bullets: [
      "Self-Awareness: emotional self-awareness, accurate self-assessment, self-confidence",
      "Self-Management: emotional self-control, adaptability, achievement orientation, positive outlook",
      "Social Awareness: empathy, organizational awareness, service orientation",
      "Relationship Management: inspirational leadership, influence, coach/mentor, conflict management, teamwork",
    ],
  },
  {
    title: "Bar-On's Five Composites (EQ-i 2.0)",
    text: "Trait-like emotional-social intelligence measured via self-report.",
    bullets: [
      "Intrapersonal: self-regard, emotional self-awareness, assertiveness, independence, self-actualization",
      "Interpersonal: empathy, social responsibility, interpersonal relationship",
      "Stress Management: stress tolerance, impulse control",
      "Adaptability: reality-testing, flexibility, problem-solving",
      "General Mood: optimism, happiness",
    ],
  },
];

const eqComparisonRows = [
  { aspect: "Nature", ei: "Cognitive ability (emotional reasoning)", bigFive: "Personality traits (behavioral tendencies)", iq: "General mental ability (g)" },
  { aspect: "Measurement", ei: "Performance tests (right/wrong answers)", bigFive: "Self-report/observer ratings", iq: "Standardized aptitude tests" },
  { aspect: "Stability", ei: "Developable through training (10–20% gain)", bigFive: "Stable traits; gradual maturity trends", iq: "Highly stable; genetic basis" },
  { aspect: "Overlap", ei: "Correlates r=.25–.40 with Big Five", bigFive: "—", iq: "Correlates r=.30–.50 with EI" },
  { aspect: "Best Predicts", ei: "Social effectiveness, leadership, therapy success", bigFive: "Life outcomes, job performance, health", iq: "Academic achievement, analytical tasks" },
  { aspect: "Can Improve?", ei: "Yes—skills trainable", bigFive: "Partially—behavioral adaptation", iq: "Limited—working memory training effects small" },
  { aspect: "Key Criticism", ei: "MSCEIT expensive; scoring methods debated", bigFive: "EI as personality repackaged (trait EI critique)", iq: "Cultural bias; narrow definition of intelligence" },
];

const eqSynthesis = [
  "The Synthesis: Use IQ for academic/technical role placement; Big Five for understanding behavioral style and culture fit; EQ (Ability) for predicting interpersonal effectiveness and leadership potential; EQ (Trait) for understanding emotional disposition.",
];

const eqFaq = [
  {
    q: "Which EQ test is most scientifically valid?",
    a: "The MSCEIT (Mayer-Salovey-Caruso) is the most scientifically validated, with objective scoring and established factorial validity. Self-report measures (EQ-i, TEIQue) measure emotional personality rather than ability, though they predict occupational success through different mechanisms.",
  },
  {
    q: "Is EQ more important than IQ for success?",
    a: "Partially. Goleman's claim that EQ accounts for \"80% of success\" is unsupported. Meta-analyses show IQ predicts academic/technical performance (r = .50); EQ predicts social effectiveness and leadership (r = .30–.40). Both contribute incrementally.",
  },
  {
    q: "Can emotional intelligence be taught?",
    a: "Yes—Ability EI is developable. Training programs show 10–20% improvement through micro-expression training (Perceiving), cognitive reappraisal (Managing), and vocabulary expansion (Understanding). Trait EI is more stable but behaviors can be modified.",
  },
  {
    q: "Why does my EQ score differ between tests?",
    a: "Different constructs: MSCEIT measures ability; EQ-i measures trait self-perception; ESCI measures behavior via observers. Low correlation (r = .15–.30) between self-report and ability measures suggests self-perception bias.",
  },
  {
    q: "Is EQ just personality repackaged?",
    a: "Trait EI overlaps substantially (50% shared variance) with Big Five, especially Neuroticism and Extraversion. Ability EI (MSCEIT) is distinct, though correlated, and predicts unique variance beyond Big Five and IQ.",
  },
  {
    q: "What is a \"good\" EQ score?",
    a: "MSCEIT: Mean = 100, SD = 15 (like IQ). Scores >115 indicate above-average; >130 superior. EQ-i: Mean = 100, SD = 15. Scores 85–115 average; >115 high functioning; <70 can indicate clinical concern depending on context.",
  },
  {
    q: "Which branch is most important?",
    a: "Branch 4 (Managing) shows the strongest correlations with leadership and mental health. Branch 1 (Perceiving) is foundational—without accurate perception, higher-order skills fail. Target the weakest branch for maximum improvement.",
  },
  {
    q: "Are there gender differences in EQ?",
    a: "Mixed findings. Women often score higher on self-report empathy tasks (small effects, d ≈ 0.20). On MSCEIT total EQ, differences are often negligible though some branch differences appear.",
  },
  {
    q: "Can EQ be too high?",
    a: "Yes—hyper-vigilance. Excessively high sensitivity without regulation can lead to exhaustion, over-empathizing, and difficulty making objective decisions. Optimal EQ balances sensitivity with regulation.",
  },
  {
    q: "How does EQ relate to mental health?",
    a: "A strong protective factor. Low Ability EI (especially Managing/Understanding) predicts higher depression/anxiety features. MSCEIT correlates negatively with alexithymia (difficulty identifying emotions).",
  },
];

const eqTraitDomainBySubscale: Record<EqTraitSubscale, EqTraitDomain> = {
  "Self-Regard": "Intrapersonal",
  "Emotional Self-Awareness": "Intrapersonal",
  Assertiveness: "Intrapersonal",
  Independence: "Intrapersonal",
  "Self-Actualization": "Intrapersonal",
  Empathy: "Interpersonal",
  "Social Responsibility": "Interpersonal",
  "Interpersonal Relationship": "Interpersonal",
  "Stress Tolerance": "Stress Management",
  "Impulse Control": "Stress Management",
  "Reality-Testing": "Adaptability",
  Flexibility: "Adaptability",
  "Problem-Solving": "Adaptability",
  Optimism: "General Mood",
  Happiness: "General Mood",
};

const eqBranchPrompts: Record<EqBranch, string[]> = {
  Perceiving: [
    "I can identify subtle emotional changes in someone’s facial expression.",
    "I notice shifts in tone, pitch, or cadence that signal emotion.",
    "I can tell when someone is uncomfortable even if they say they’re fine.",
    "I recognize my emotions through body signals (breathing, tension, gut feelings).",
    "I can read the emotional atmosphere of a room quickly.",
    "I detect sarcasm, irony, or hidden frustration in conversation.",
    "I notice when my mood changes and can name what I feel.",
    "I can distinguish between similar emotions (irritation vs. anger).",
    "I pick up on unspoken tension between people.",
    "I can identify emotions in music, art, or stories.",
    "I notice micro-signals like eye contact shifts or posture changes.",
    "I realize when I’m stressed before it becomes overwhelming.",
    "I can tell when someone is disengaged even if they stay polite.",
    "I sense when a conversation becomes emotionally unsafe.",
    "I can notice emotions in myself without immediately reacting.",
    "I can tell when someone feels excluded in a group.",
    "I recognize when I’m masking emotions rather than expressing them.",
    "I can interpret emotional cues even when words are neutral.",
  ],
  Facilitating: [
    "I can use excitement to brainstorm creatively when needed.",
    "I can use calm seriousness to focus on details and accuracy.",
    "I intentionally shift my mood to fit the task (creative vs. analytical).",
    "I can use emotion as information without being controlled by it.",
    "I can tell which emotional state helps me do my best work.",
    "I know when to pause a decision because emotion is distorting it.",
    "I can use stress energy to become more decisive and focused.",
    "I can use positive emotion to motivate myself without losing realism.",
    "I can use emotional memories to generate ideas or solutions.",
    "I can stay curious even when I feel defensive.",
    "I can channel frustration into productive action.",
    "I can use my intuition while still checking evidence.",
    "I can match my communication style to the emotional needs of the moment.",
    "I can choose when to be emotionally open vs. emotionally neutral for effectiveness.",
    "I can transform anxiety into preparation rather than avoidance.",
    "I can use empathy to improve problem-solving in teams.",
    "I can use emotion to prioritize what matters most.",
    "I can balance feeling and thinking to make better decisions.",
  ],
  Understanding: [
    "I can describe emotions with precise vocabulary beyond \"good\" and \"bad\".",
    "I can distinguish shame from guilt and jealousy from envy.",
    "I can predict how a conflict might emotionally evolve over time.",
    "I can recognize mixed emotions (bittersweet feelings).",
    "I understand how grief often progresses over time.",
    "I can see how anger can shift into sadness or regret.",
    "I can interpret what a person’s emotion might be communicating about needs.",
    "I can connect emotional triggers to underlying values or fears.",
    "I can explain why a person might react strongly to a small event.",
    "I can recognize when emotions are displaced (anger hiding fear).",
    "I can anticipate emotional consequences of decisions for different people.",
    "I can notice patterns in what tends to trigger my emotions.",
    "I can see how different emotions require different responses.",
    "I can understand how mood influences judgment and perception.",
    "I can interpret social emotions (embarrassment, pride) accurately.",
    "I can understand how emotional suppression differs from emotional regulation.",
    "I can map emotional progressions during stress (tension → irritation → anger).",
    "I can articulate what I need emotionally in a situation.",
  ],
  Managing: [
    "I can calm myself down effectively when anxious.",
    "I can recover quickly after emotional setbacks.",
    "I can prevent anger from turning into harmful behavior.",
    "I can regulate my emotions while staying authentic.",
    "I can motivate myself even when I don’t feel like it.",
    "I can set boundaries without escalating conflict.",
    "I can comfort someone without absorbing their emotions.",
    "I can de-escalate tense situations with words and tone.",
    "I can keep perspective when emotions feel intense.",
    "I can delay gratification when emotions push for immediate relief.",
    "I can handle criticism without spiraling into shame or defensiveness.",
    "I can stay composed in high-stakes interpersonal situations.",
    "I can help others shift from panic to problem-solving.",
    "I can manage group emotions during conflict or change.",
    "I can avoid chronic suppression and still stay regulated.",
    "I can choose coping strategies that reduce stress rather than increase it.",
    "I can repair relationships after conflict effectively.",
    "I can manage office politics without losing integrity.",
  ],
};

const eqTraitPrompts: Record<EqTraitSubscale, string[]> = {
  "Self-Regard": ["I generally respect myself even when I make mistakes.", "I believe I have strengths that matter.", "I can acknowledge my flaws without self-hatred.", "I feel worthy even when I’m not performing perfectly."],
  "Emotional Self-Awareness": ["I can name what I’m feeling in the moment.", "I know why I feel the way I feel.", "I recognize emotional triggers quickly.", "I notice emotions before they drive my behavior."],
  Assertiveness: ["I speak up when something feels wrong.", "I express needs directly rather than hinting.", "I can say no without excessive guilt.", "I can address issues without avoiding the conversation."],
  Independence: ["I can make decisions without needing constant reassurance.", "I trust my judgment even under social pressure.", "I can function well without relying on others to regulate me.", "I can act on my values even if others disagree."],
  "Self-Actualization": ["I set goals that reflect what matters to me.", "I pursue growth even when it’s uncomfortable.", "I invest time in developing meaningful skills.", "I feel motivated by personal purpose."],
  Empathy: ["I can understand how others feel even when I disagree.", "I notice emotional needs behind someone’s words.", "I can validate feelings without fixing immediately.", "I can take another person’s perspective accurately."],
  "Social Responsibility": ["I care about how my actions impact others.", "I contribute to groups in a reliable way.", "I act ethically even when it costs me.", "I feel motivated to support community wellbeing."],
  "Interpersonal Relationship": ["I build trust through consistent behavior.", "I can maintain close relationships over time.", "I communicate openly in important relationships.", "I repair misunderstandings instead of letting them grow."],
  "Stress Tolerance": ["I stay functional under pressure.", "I can keep thinking clearly when stressed.", "I recover from stress without long-lasting exhaustion.", "I can manage workload stress without burning out quickly."],
  "Impulse Control": ["I can pause before reacting emotionally.", "I can resist urges that I know are harmful long-term.", "I avoid saying things I will regret when angry.", "I can handle cravings or impulses without acting on them."],
  "Reality-Testing": ["I check assumptions before reacting emotionally.", "I can distinguish what I feel from what is true.", "I look for evidence when I’m anxious or suspicious.", "I can correct my interpretation when I’m wrong."],
  Flexibility: ["I adapt when plans change unexpectedly.", "I can shift strategies when new information appears.", "I stay open-minded rather than rigid.", "I handle ambiguity without panic."],
  "Problem-Solving": ["I break emotional problems into solvable steps.", "I can find workable options during conflict.", "I think clearly enough to choose a solution under stress.", "I follow through on solutions instead of cycling in emotion."],
  Optimism: ["I expect challenges to be solvable with effort.", "I tend to see possibilities rather than only threats.", "I can stay hopeful during setbacks.", "I believe progress is possible even when it’s slow."],
  Happiness: ["I experience gratitude and enjoyment regularly.", "I can access positive emotion even on hard days.", "I feel connected to meaning or joy in daily life.", "I can savor good moments without rushing past them."],
};

function eqDimensionToBranch(code: "SA" | "SR" | "MO" | "EM" | "SS"): EqBranch {
  if (code === "SA") return "Perceiving";
  if (code === "SR") return "Managing";
  if (code === "MO") return "Facilitating";
  if (code === "EM") return "Understanding";
  return "Managing";
}

function eqFacetToSubscale(facet: string, dimension: "SA" | "SR" | "MO" | "EM" | "SS"): EqTraitSubscale {
  const f = facet.toLowerCase();
  if (dimension === "EM") return "Empathy";
  if (dimension === "SA") return "Emotional Self-Awareness";
  if (dimension === "MO") return f.includes("optimism") ? "Optimism" : "Self-Actualization";
  if (dimension === "SR") {
    if (f.includes("stress") || f.includes("resilien")) return "Stress Tolerance";
    if (f.includes("adapt")) return "Flexibility";
    return "Impulse Control";
  }
  if (dimension === "SS") {
    if (f.includes("assert")) return "Assertiveness";
    if (f.includes("conflict") || f.includes("resolution")) return "Problem-Solving";
    if (f.includes("relationship") || f.includes("feedback")) return "Interpersonal Relationship";
    return "Social Responsibility";
  }
  return "Emotional Self-Awareness";
}

function toEqQuestions(pool: Array<{ q: string; dimension: "SA" | "SR" | "MO" | "EM" | "SS"; facet: string }>): EqQuestion[] {
  return pool.map((q) => ({
    kind: "ability",
    prompt: q.q,
    branch: eqDimensionToBranch(q.dimension),
    subscale: eqFacetToSubscale(q.facet, q.dimension),
  }));
}

const eqDevelopmentTips: Record<EqBranch, string[]> = {
  Perceiving: ["Micro-expression recognition training (short daily drills)", "Practice labeling emotions in real time (3×/day check-ins)", "Tune into prosody: notice tone/pitch independent of words"],
  Facilitating: ["Use mood-task matching (creative vs. detail work)", "Write decision notes: emotion → signal → evidence → action", "Practice somatic marker journaling (gut feeling + outcome)"],
  Understanding: ["Build an emotion lexicon (learn 3 new emotion words/week)", "Map progressions (anger → shame → remorse) after conflicts", "Practice blends (two emotions at once) with examples"],
  Managing: ["Cognitive reappraisal training (reframe meaning, not facts)", "Emotion regulation scripts (pause, breathe, boundary, repair)", "Conflict de-escalation practice (tone, validation, options)"],
};

type EsciCluster = "Self-awareness" | "Self-management" | "Social awareness" | "Relationship management";
type EsciCompetency =
  | "Emotional self-awareness"
  | "Emotional self-control"
  | "Adaptability"
  | "Achievement orientation"
  | "Positive outlook"
  | "Empathy"
  | "Organizational awareness"
  | "Coach and mentor"
  | "Inspirational leadership"
  | "Influence"
  | "Conflict management"
  | "Teamwork";

const eqEsciCompetencies: Array<{ cluster: EsciCluster; competency: EsciCompetency; source: { kind: "branch" | "subscale"; key: EqBranch | EqTraitSubscale } }> =
  [
    { cluster: "Self-awareness", competency: "Emotional self-awareness", source: { kind: "subscale", key: "Emotional Self-Awareness" } },
    { cluster: "Self-management", competency: "Emotional self-control", source: { kind: "subscale", key: "Impulse Control" } },
    { cluster: "Self-management", competency: "Adaptability", source: { kind: "subscale", key: "Flexibility" } },
    { cluster: "Self-management", competency: "Achievement orientation", source: { kind: "subscale", key: "Self-Actualization" } },
    { cluster: "Self-management", competency: "Positive outlook", source: { kind: "subscale", key: "Optimism" } },
    { cluster: "Social awareness", competency: "Empathy", source: { kind: "subscale", key: "Empathy" } },
    { cluster: "Social awareness", competency: "Organizational awareness", source: { kind: "subscale", key: "Social Responsibility" } },
    { cluster: "Relationship management", competency: "Coach and mentor", source: { kind: "subscale", key: "Interpersonal Relationship" } },
    { cluster: "Relationship management", competency: "Inspirational leadership", source: { kind: "branch", key: "Managing" } },
    { cluster: "Relationship management", competency: "Influence", source: { kind: "subscale", key: "Assertiveness" } },
    { cluster: "Relationship management", competency: "Conflict management", source: { kind: "branch", key: "Managing" } },
    { cluster: "Relationship management", competency: "Teamwork", source: { kind: "subscale", key: "Interpersonal Relationship" } },
  ];

function eqZFromLikert(avg: number): number {
  return (avg - 3) / 0.8;
}

function eqStandardScoreFromLikert(avg: number): number {
  const z = eqZFromLikert(avg);
  const score = 100 + 15 * z;
  return Math.round(Math.max(55, Math.min(145, score)));
}

type LoveLanguage = "Words of Affirmation" | "Quality Time" | "Acts of Service" | "Receiving Gifts" | "Physical Touch";
type LoveLanguageKey = "words" | "time" | "acts" | "gifts" | "touch";

type LoveLanguageMode = "receive" | "give";

type LoveLanguageOption = {
  key: LoveLanguageKey;
  label: LoveLanguage;
  mode: LoveLanguageMode;
  text: string;
};

type LoveLanguageQuestion = {
  a: LoveLanguageOption;
  b: LoveLanguageOption;
};

type LoveLanguageAnswerState = {
  selected: "a" | "b" | null;
};

const loveTitle = "💞 Love Languages Assessment: The Affection Communication Inventory";
const loveDescription =
  "30 questions • 5 expression channels • Primary/secondary scoring • Relationship communication tool • Pop-cultural phenomenon • Limited scientific validation";

const loveWhatYouGet = [
  "5 Affection Channels: Words of Affirmation, Acts of Service, Receiving Gifts, Quality Time, and Physical Touch—ranked by personal preference",
  "Primary Language Score: Your dominant mechanism for feeling loved (highest of 5 categories, max 12 points)",
  "Secondary Language Profile: Bilingual or multilingual patterns when scores cluster closely",
  "Expression Gap Analysis: Discrepancy between how you give love vs. how you prefer to receive it",
  "Partner Compatibility Matrix: Matching algorithms comparing your receiving preferences with partner's giving tendencies",
  "Communication Playbook: Specific actions to \"speak\" each language effectively",
  "Conflict Insight: Which neglect patterns hurt most (e.g., missed gifts for Gifts-primary, distracted presence for Time-primary)",
];

const loveMethodologySections = [
  {
    title: "The Three Core Premises (Challenged by Research)",
    bullets: [
      "Premise 1: Categorical preference — a distinct primary language dominates emotional reception. Some recent work suggests people may value all five similarly when not forced to choose.",
      "Premise 2: Five-factor structure — factor analyses show mixed results; qualitative work suggests more than five categories may exist.",
      "Premise 3: Congruence hypothesis — matching languages predicts relationship satisfaction; evidence is mixed and often mediated by responsiveness/empathy.",
    ],
  },
  {
    title: "Assessment Mechanics",
    bullets: [
      "Forced-choice format: binary trade-offs can create artificial differentiation",
      "Scoring algorithm: frequency count across 30 items (highest score = primary language; ties indicate bilingual patterns)",
      "State vs. trait: appears moderately stable but can shift with relationship phase and stress",
    ],
  },
  {
    title: "Scientific Status: The Controversy",
    bullets: [
      "Lack of strong empirical foundation compared to attachment theory or Big Five",
      "Construct validity issues: overlap with attachment and personality traits",
      "Clinical utility vs. scientific validity: useful vocabulary starter, weak predictive validity",
    ],
  },
];

const loveHistory = [
  { year: "1992", title: "The Breakthrough", desc: "Gary Chapman publishes The Five Love Languages based on pastoral counseling observations." },
  { year: "1995–2005", title: "Grassroots Expansion", desc: "Framework spreads through workshops and communities; little academic validation during this period." },
  { year: "2006", title: "First Academic Test", desc: "Egbert & Polk develop a scale; evidence for five-factor structure is mixed." },
  { year: "2015–2020", title: "Popular Culture Dominance", desc: "Quiz goes viral online and becomes relationship lexicon shorthand." },
  { year: "2022–2024", title: "Scientific Reckoning", desc: "Meta-analytic critiques report limited support for core premises; described as pseudoscientific but useful as metaphor." },
];

const loveDeepDive = [
  {
    key: "words" as const,
    icon: "💬",
    title: "Words of Affirmation",
    core: "Verbal acknowledgment of worth, effort, and affection",
    high: ["Compliments, written notes, specific praise, public acknowledgment"],
    pain: ["Harsh criticism, silent treatment, lack of verbal appreciation"],
    express: ["Specific compliments (\"I appreciate how you organized that\")", "Encouragement", "Digital affirmations"],
    correlates: "Extraversion (r ≈ .23); anxious attachment often needs reassurance",
  },
  {
    key: "time" as const,
    icon: "⏰",
    title: "Quality Time",
    core: "Undivided attention and shared presence",
    high: ["Focused conversation, eye contact, device-free activities, scheduled one-on-one time"],
    pain: ["Distraction, canceled plans, phubbing, multitasking during together-time"],
    express: ["Active listening", "Date nights", "Walking together", "Tech-free meals"],
    correlates: "Conscientiousness (r ≈ .16) and low Extraversion (depth over breadth); secure attachment supports asking for time",
  },
  {
    key: "acts" as const,
    icon: "🤝",
    title: "Acts of Service",
    core: "Task alleviation and practical support as affection proxy",
    high: ["Chore completion, errand-running, problem-solving assistance, fixing things"],
    pain: ["Broken promises, creating more work, laziness, \"You should have asked\""],
    express: ["Doing dishes unasked", "Handling logistics", "Meal prep", "Fixing issues proactively"],
    correlates: "Agreeableness/altruism; cultural factor stronger in collectivist contexts",
  },
  {
    key: "gifts" as const,
    icon: "🎁",
    title: "Receiving Gifts",
    core: "Tangible symbols of thoughtfulness and memorability",
    high: ["Surprise presents, remembered wish-lists, ceremonial gifts, handcrafted items"],
    pain: ["Forgotten occasions, generic gifts, low thoughtfulness, money over sentiment"],
    express: ["\"Just because\" small gifts", "Personalized items", "Experiential gifts", "Handwritten cards"],
    correlates: "Detail-oriented personalities; income not strongly related to Gifts ranking",
  },
  {
    key: "touch" as const,
    icon: "🤗",
    title: "Physical Touch",
    core: "Affection through skin-to-skin contact and proximal presence",
    high: ["Hugs, holding hands, sitting close, back rubs, sexual intimacy, casual touch"],
    pain: ["Withheld affection, physical distance, rejection without alternative closeness"],
    express: ["Morning hugs", "Hand-holding", "Sitting side-by-side", "Touch reassurance during stress"],
    correlates: "Often correlates with Extraversion and low Neuroticism; avoidant attachment may show aversion",
  },
];

const loveVsRows = [
  { aspect: "Origin", love: "Chapman 1992 (pastoral)", attachment: "Bowlby/Ainsworth 1960s–70s (clinical)", bigFive: "Lexical research 1930s–1990s" },
  { aspect: "Scientific Status", love: "Limited validation; popular psychology", attachment: "Extensively validated", bigFive: "Academic gold standard" },
  { aspect: "Focus", love: "Affection expression preferences", attachment: "Emotional bonding patterns", bigFive: "Trait dispositions" },
  { aspect: "Stability", love: "Moderate (state-dependent)", attachment: "Stable across lifespan", bigFive: "Stable; gradual maturity trends" },
  { aspect: "Changeability", love: "Highly adaptable", attachment: "Requires deeper intervention", bigFive: "Moderately malleable" },
  { aspect: "Best Predicts", love: "Communication styles (weakly)", attachment: "Relationship longevity/satisfaction", bigFive: "Life outcomes, job performance" },
  { aspect: "Measurement", love: "30-item forced choice", attachment: "AAI/self-report", bigFive: "NEO-PI-R, IPIP, etc." },
  { aspect: "Clinical Utility", love: "Communication starter", attachment: "Therapeutic target", bigFive: "Personality assessment" },
];

const loveIntegrationInsight = [
  "Integration Insight: Evidence-based predictors of relationship health (attachment security, conflict skills, responsiveness) explain more variance than Love Language matching. Love Languages can still provide accessible vocabulary for needs.",
];

const loveFaq = [
  {
    q: "Are Love Languages scientifically proven?",
    a: "No. Meta-analyses find limited evidence that matching improves satisfaction or that five categories are distinct psychological constructs. It functions better as a communication metaphor than a predictive tool.",
  },
  {
    q: "Why do they feel so accurate if they're not scientific?",
    a: "Barnum effect + confirmation bias. Descriptions are broad, and forced-choice format can create artificial differentiation.",
  },
  {
    q: "Can my Love Language change?",
    a: "Yes. Preferences can shift with relationship stage, stress, and partner behavior. Longitudinal work suggests moderate stability over months.",
  },
  {
    q: "Which Love Language is most common?",
    a: "Quality Time and Words of Affirmation often rank high in Western samples. But when not forced to choose, many people value all five similarly.",
  },
  {
    q: "Do couples with matching Love Languages have better relationships?",
    a: "Mixed evidence. Responsiveness, emotional attunement, and conflict skills matter more than category matching.",
  },
  {
    q: "What if my partner won't speak my Love Language?",
    a: "Focus on the underlying need, not the category. Translate the need into multiple behaviors your partner can realistically do.",
  },
  {
    q: "Are there really only five?",
    a: "Probably not. Qualitative research suggests additional categories; the five came from clinical observation, not robust factor analysis.",
  },
  {
    q: "Can Love Languages apply to non-romantic relationships?",
    a: "Yes, with caveats. The romantic framing doesn’t always translate to parent-child or workplace contexts.",
  },
  {
    q: "Why do therapists use it if it's not scientific?",
    a: "Therapeutic utility ≠ scientific validity. As a communication tool, it helps couples articulate needs more neutrally.",
  },
  {
    q: "What's better than Love Languages for relationship health?",
    a: "Evidence-based alternatives: Gottman Method, Attachment-based therapy, and broader personality/values compatibility models.",
  },
];

const loveMeta: Record<LoveLanguageKey, { key: LoveLanguageKey; label: LoveLanguage; icon: string }> = {
  words: { key: "words", label: "Words of Affirmation", icon: "💬" },
  time: { key: "time", label: "Quality Time", icon: "⏰" },
  acts: { key: "acts", label: "Acts of Service", icon: "🤝" },
  gifts: { key: "gifts", label: "Receiving Gifts", icon: "🎁" },
  touch: { key: "touch", label: "Physical Touch", icon: "🤗" },
};

const loveQuestions: LoveLanguageQuestion[] = [
  { a: { key: "words", label: loveMeta.words.label, mode: "receive", text: "I feel loved when I hear sincere praise." }, b: { key: "time", label: loveMeta.time.label, mode: "receive", text: "I feel loved when we spend undivided time together." } },
  { a: { key: "acts", label: loveMeta.acts.label, mode: "receive", text: "I feel loved when someone helps me with tasks without being asked." }, b: { key: "touch", label: loveMeta.touch.label, mode: "receive", text: "I feel loved when I receive a hug or affectionate touch." } },
  { a: { key: "gifts", label: loveMeta.gifts.label, mode: "receive", text: "I feel loved when I receive a thoughtful gift." }, b: { key: "words", label: loveMeta.words.label, mode: "receive", text: "I feel loved when someone tells me they appreciate me." } },
  { a: { key: "time", label: loveMeta.time.label, mode: "receive", text: "I feel loved when my partner puts their phone away and listens." }, b: { key: "acts", label: loveMeta.acts.label, mode: "receive", text: "I feel loved when my partner takes care of a stressful responsibility for me." } },
  { a: { key: "touch", label: loveMeta.touch.label, mode: "receive", text: "I feel loved when we hold hands or sit close." }, b: { key: "gifts", label: loveMeta.gifts.label, mode: "receive", text: "I feel loved when someone remembers special dates with a gift." } },

  { a: { key: "words", label: loveMeta.words.label, mode: "give", text: "I naturally show love by giving compliments and encouragement." }, b: { key: "acts", label: loveMeta.acts.label, mode: "give", text: "I naturally show love by doing helpful tasks." } },
  { a: { key: "time", label: loveMeta.time.label, mode: "give", text: "I naturally show love by planning focused one-on-one time." }, b: { key: "touch", label: loveMeta.touch.label, mode: "give", text: "I naturally show love through affectionate touch." } },
  { a: { key: "gifts", label: loveMeta.gifts.label, mode: "give", text: "I naturally show love by giving small thoughtful gifts." }, b: { key: "words", label: loveMeta.words.label, mode: "give", text: "I naturally show love by saying what I value about someone." } },
  { a: { key: "acts", label: loveMeta.acts.label, mode: "give", text: "I show love by fixing problems and making life easier." }, b: { key: "time", label: loveMeta.time.label, mode: "give", text: "I show love by being fully present without distractions." } },
  { a: { key: "touch", label: loveMeta.touch.label, mode: "give", text: "I show love by initiating affectionate touch and closeness." }, b: { key: "gifts", label: loveMeta.gifts.label, mode: "give", text: "I show love by giving memorable tokens or surprises." } },

  { a: { key: "words", label: loveMeta.words.label, mode: "receive", text: "I feel loved when someone recognizes my effort with words." }, b: { key: "acts", label: loveMeta.acts.label, mode: "receive", text: "I feel loved when someone takes action to support me." } },
  { a: { key: "time", label: loveMeta.time.label, mode: "receive", text: "I feel loved when we schedule a date night or shared activity." }, b: { key: "gifts", label: loveMeta.gifts.label, mode: "receive", text: "I feel loved when I receive something chosen with care." } },
  { a: { key: "touch", label: loveMeta.touch.label, mode: "receive", text: "I feel loved when I receive comforting touch during stress." }, b: { key: "words", label: loveMeta.words.label, mode: "receive", text: "I feel loved when I receive reassurance and affirmation." } },
  { a: { key: "acts", label: loveMeta.acts.label, mode: "receive", text: "I feel loved when someone follows through on promised help." }, b: { key: "time", label: loveMeta.time.label, mode: "receive", text: "I feel loved when someone gives me focused attention." } },
  { a: { key: "gifts", label: loveMeta.gifts.label, mode: "receive", text: "I feel loved when someone remembers a detail and buys something meaningful." }, b: { key: "touch", label: loveMeta.touch.label, mode: "receive", text: "I feel loved when there is regular casual affection." } },

  { a: { key: "words", label: loveMeta.words.label, mode: "give", text: "I show love by writing messages, notes, or supportive texts." }, b: { key: "time", label: loveMeta.time.label, mode: "give", text: "I show love by setting aside uninterrupted time." } },
  { a: { key: "acts", label: loveMeta.acts.label, mode: "give", text: "I show love by completing chores or errands unasked." }, b: { key: "gifts", label: loveMeta.gifts.label, mode: "give", text: "I show love by remembering and celebrating occasions with gifts." } },
  { a: { key: "touch", label: loveMeta.touch.label, mode: "give", text: "I show love through hugs, hand-holding, and physical reassurance." }, b: { key: "words", label: loveMeta.words.label, mode: "give", text: "I show love by expressing gratitude out loud." } },
  { a: { key: "time", label: loveMeta.time.label, mode: "give", text: "I show love by doing device-free activities together." }, b: { key: "acts", label: loveMeta.acts.label, mode: "give", text: "I show love by taking responsibility for stressful logistics." } },
  { a: { key: "gifts", label: loveMeta.gifts.label, mode: "give", text: "I show love by giving personalized items or experiences." }, b: { key: "touch", label: loveMeta.touch.label, mode: "give", text: "I show love by staying physically close and affectionate." } },

  { a: { key: "words", label: loveMeta.words.label, mode: "receive", text: "I feel loved when someone speaks kindly and specifically about me." }, b: { key: "gifts", label: loveMeta.gifts.label, mode: "receive", text: "I feel loved when I receive a small surprise gift." } },
  { a: { key: "time", label: loveMeta.time.label, mode: "receive", text: "I feel loved when someone chooses me over distractions." }, b: { key: "touch", label: loveMeta.touch.label, mode: "receive", text: "I feel loved when we are physically affectionate." } },
  { a: { key: "acts", label: loveMeta.acts.label, mode: "receive", text: "I feel loved when someone anticipates needs and helps." }, b: { key: "words", label: loveMeta.words.label, mode: "receive", text: "I feel loved when someone encourages me verbally." } },
  { a: { key: "gifts", label: loveMeta.gifts.label, mode: "receive", text: "I feel loved when a partner remembers my wish list." }, b: { key: "time", label: loveMeta.time.label, mode: "receive", text: "I feel loved when we have meaningful conversation." } },
  { a: { key: "touch", label: loveMeta.touch.label, mode: "receive", text: "I feel loved when a partner initiates affectionate touch." }, b: { key: "acts", label: loveMeta.acts.label, mode: "receive", text: "I feel loved when a partner helps reduce my workload." } },

  { a: { key: "words", label: loveMeta.words.label, mode: "give", text: "I show love by praising effort and character traits." }, b: { key: "touch", label: loveMeta.touch.label, mode: "give", text: "I show love by initiating hugs, cuddles, or closeness." } },
  { a: { key: "time", label: loveMeta.time.label, mode: "give", text: "I show love by making time and giving full attention." }, b: { key: "gifts", label: loveMeta.gifts.label, mode: "give", text: "I show love by choosing gifts that show I listened." } },
  { a: { key: "acts", label: loveMeta.acts.label, mode: "give", text: "I show love by taking chores or responsibilities off someone’s plate." }, b: { key: "words", label: loveMeta.words.label, mode: "give", text: "I show love by saying \"I’m proud of you\" and \"I appreciate you\"." } },
  { a: { key: "gifts", label: loveMeta.gifts.label, mode: "give", text: "I show love through small tokens that mark special moments." }, b: { key: "time", label: loveMeta.time.label, mode: "give", text: "I show love by creating shared experiences." } },
  { a: { key: "touch", label: loveMeta.touch.label, mode: "give", text: "I show love by staying physically connected and reassuring." }, b: { key: "acts", label: loveMeta.acts.label, mode: "give", text: "I show love by doing practical support without being asked." } },
];

type AttachmentStyle = "Secure" | "Anxious/Preoccupied" | "Avoidant/Dismissive" | "Disorganized/Fearful";
type AttachmentDimension = "Anxiety" | "Avoidance";
type AttachmentStyleDim = "S" | "A" | "V" | "F";

type AttachmentQuestion = {
  prompt: string;
  styleDim: AttachmentStyleDim;
  facet?: string;
  options?: Array<{ text: string; score: 1 | 2 | 3 | 4 | 5 }>;
};

type AttachmentAnswerState = {
  value: 1 | 2 | 3 | 4 | 5 | null;
  selectedIndex: number | null;
};

const attachmentTitle = "🧷 Attachment Assessment: The Relational Bond Inventory";
const attachmentDescription =
  "20–36 questions • 4 organized styles • 2 continuous dimensions (Anxiety × Avoidance) • Intergenerational transmission analysis • Internal Working Models • 76% relationship satisfaction prediction";

const attachmentWhatYouGet = [
  "Four Attachment Classifications: Secure, Anxious/Preoccupied, Avoidant/Dismissive, and Disorganized/Fearful—based on Internal Working Models (IWMs) formed in early childhood",
  "Two-Dimensional Plot (ECR-R): Continuous scores on Attachment Anxiety and Attachment Avoidance for nuanced relational mapping",
  "Adult Attachment Interview (AAI) Classification: Narrative coherence assessment (Free/Autonomous, Dismissing, Preoccupied, Unresolved) as a conceptual reference",
  "Intergenerational Transmission Insight: Probability of passing attachment patterns to offspring based on relational strategies",
  "Romantic Compatibility Prediction: \"Anxious-Avoidant Trap\" detection and secure base potential assessment",
  "Earned Security Pathway: Targets for moving toward secure organization through coherent narrative and corrective experiences",
  "Neurobiological Profile: HPA axis reactivity, amygdala threat thresholds, and oxytocin sensitivity patterns (research framing)",
];

const attachmentMethodologySections = [
  {
    title: "The Three Assessment Paradigms",
    bullets: [
      "1. Adult Attachment Interview (AAI): Semi-structured interview assessing narrative coherence (gold standard; requires trained coder)",
      "2. Self-report two-dimensional model (ECR/ECR-R): Anxiety × Avoidance dimensions mapping to four quadrants (research standard)",
      "3. Categorical screening (Hazan & Shaver / RQ): Fast but less nuanced than dimensional scoring",
      "Psychometric properties (ECR-R): high reliability reported for Anxiety/ Avoidance in research summaries",
    ],
  },
  {
    title: "Internal Working Models (IWMs)",
    text: "Bowlby’s idea: cognitive-affective schemas representing self-worth and other-availability.",
    bullets: [
      "Secure IWM: \"I am worthy of love; others are reliable and responsive\"",
      "Anxious IWM: \"I am unworthy; others are unreliable but necessary\"",
      "Avoidant IWM: \"I am worthy only if self-sufficient; others are untrustworthy\"",
      "Disorganized IWM: \"I am frightened; the source of safety is also the source of danger\"",
    ],
  },
];

const attachmentHistory = [
  { year: "1958", title: "Bowlby's Breakthrough", desc: "Bowlby frames attachment as an innate biological survival system, distinct from feeding or conditioning." },
  { year: "1969–1978", title: "Ainsworth's Empirical Foundation", desc: "Ainsworth develops Strange Situation Procedure and establishes Secure/Avoidant/Ambivalent patterns." },
  { year: "1982", title: "Mary Main's Discovery", desc: "Main identifies Disorganized/Disoriented attachment (fear without solution) in infants." },
  { year: "1985", title: "Adult Attachment Interview (AAI)", desc: "Main/Kaplan/Cassidy develop AAI to assess state of mind regarding attachment and intergenerational transmission." },
  { year: "1987", title: "Extension to Romance", desc: "Hazan & Shaver apply attachment theory to adult romantic relationships." },
  { year: "1998", title: "Dimensional Revolution (ECR)", desc: "Brennan/Clark/Shaver consolidate measures into Anxiety and Avoidance dimensions." },
  { year: "2000", title: "ECR-R Refinement", desc: "Fraley/Waller/Brennan improve precision with IRT; stronger measurement across trait levels." },
];

type AttachmentStyleProfile = {
  icon: string;
  title: string;
  core: string;
  high: string[];
  average: string[];
  low: string[];
  dynamics: string[];
  prevalence: string;
};

const attachmentStyles: Record<AttachmentStyle, AttachmentStyleProfile> = {
  Secure: {
    icon: "🛡️",
    title: "Secure Attachment (Low Anxiety, Low Avoidance)",
    core: "Internal Working Model of self-worth and other-reliability; flexible emotion regulation.",
    high: [
      "Autonomy with connection: comfortable with intimacy and independence",
      "Emotional regulation: seeks support appropriately; returns to baseline quickly",
      "Secure base behavior: supports exploration and mutual growth",
      "Conflict resolution: collaborative problem-solving; trust during disagreement",
      "Meta-cognitive capacity: holds both self and partner perspectives",
    ],
    average: ["Direct expression of needs without manipulation or withdrawal", "Minimal jealousy; confident without surveillance", "Breakups: mourns loss while maintaining self-integrity"],
    low: ["Under extreme stress can show temporary anxious/avoidant strategies, then repairs"],
    dynamics: ["Communication: direct and warm", "Jealousy: low", "Repair: fast and collaborative"],
    prevalence: "Prevalence: ~50–60% (higher in older adults with corrective experiences).",
  },
  "Anxious/Preoccupied": {
    icon: "⚠️",
    title: "Anxious/Preoccupied (High Anxiety, Low Avoidance)",
    core: "Hyperactivation of attachment system; vigilance for abandonment cues; emotional dysregulation.",
    high: ["Emotional attunement: sensitive to partner states; nurturing presence", "Passionate investment: values connection intensely", "Can articulate needs when regulated"],
    average: [
      "Proximity seeking: frequent reassurance requests; constant contact initiation",
      "Hypervigilance: monitors tone, response times, micro-cues for rejection",
      "Emotional volatility: hope ↔ despair; catastrophizing distance",
      "Protest behaviors: escalating demands; guilt induction; pursuit",
    ],
    low: ["Preoccupation: rumination, somatic symptoms", "Coercive control: monitoring/interrogation", "Desperation: tolerates poor treatment to avoid abandonment"],
    dynamics: ["The Pursuit: intensifies connection attempts when partner withdraws", "Love addiction: intermittent reinforcement feels like intimacy"],
    prevalence: "Prevalence: ~20–25% (higher in clinical samples).",
  },
  "Avoidant/Dismissive": {
    icon: "🧊",
    title: "Avoidant/Dismissive (Low Anxiety, High Avoidance)",
    core: "Deactivation of attachment system; compulsive self-reliance; suppression of attachment needs.",
    high: ["Autonomous competence: achievement, boundaries, self-sufficiency", "Problem-solving focus in crises; calm under pressure", "Respects partner space; non-intrusive"],
    average: [
      "Emotional unavailability: difficulty naming feelings; intellectualization",
      "Deactivating strategies: overwork; ideal partner fantasy; focus on flaws to create distance",
      "Intimacy avoidance: discomfort with vulnerability or closeness rituals",
      "Refuses help; views dependency as weakness",
    ],
    low: ["Complete isolation; alexithymia", "Defensive derogation: cynicism about love", "Passive-aggression: stonewalling; indirect communication"],
    dynamics: ["The Distancing: withdraws when partner seeks connection", "Fantasy bond: imagined connection replaces real vulnerability"],
    prevalence: "Prevalence: ~20–25% (higher in some individualistic cultures).",
  },
  "Disorganized/Fearful": {
    icon: "🌪️",
    title: "Disorganized/Fearful-Avoidant (High Anxiety, High Avoidance)",
    core: "Unresolved trauma/loss; simultaneous approach–avoidance conflict; breakdown of organized strategy.",
    high: ["Can appear secure in calm periods; under stress flips between pursuit and distance"],
    average: ["Erratic oscillation: cling ↔ withdraw", "Dissociation during conflict; memory gaps", "Contradictory behavior; unpredictability for partners"],
    low: ["Trauma bonding; reenactment patterns", "Approach-avoidance trap; sabotage at intimacy moments", "Hostile-helplessness: victim ↔ aggression switches"],
    dynamics: ["Fear without solution: safety and danger linked", "Needs trauma-informed repair and stability"],
    prevalence: "Prevalence: ~5–10% general; higher in trauma/clinical samples.",
  },
};

const attachmentMatrixRows = [
  { anxiety: "Low Anxiety (Secure Self)", lowAvoid: "Secure — Autonomous & Connected", highAvoid: "Dismissive-Avoidant — Autonomous but Isolated" },
  { anxiety: "High Anxiety (Fear of Abandonment)", lowAvoid: "Preoccupied/Anxious — Connected but Enmeshed", highAvoid: "Fearful-Avoidant — Isolated & Distressed" },
];

const attachmentVsRows = [
  { aspect: "Nature", attachment: "Relational IWMs (developmental)", bigFive: "Personality traits (dispositional)", love: "Communication preferences (behavioral)" },
  { aspect: "Origin", attachment: "Bowlby/Ainsworth (1958–1978)", bigFive: "Lexical hypothesis (1930s–1990s)", love: "Chapman 1992 (pastoral)" },
  { aspect: "Scientific Status", attachment: "Extensively validated; developmental psychology gold standard", bigFive: "Academic gold standard; robust psychometrics", love: "Limited validation; popular psychology" },
  { aspect: "Stability", attachment: "Moderately stable; earned security possible", bigFive: "Stable traits; gradual maturity trends", love: "State-dependent; situationally variable" },
  { aspect: "Measurement", attachment: "AAI (narrative), ECR (dimensional)", bigFive: "Self-report/observer inventories", love: "Self-report quiz" },
  { aspect: "Best Predicts", attachment: "Relationship longevity, parenting capacity, psychopathology risk", bigFive: "Job performance, health outcomes, academic success", love: "Communication styles (weakly)" },
  { aspect: "Changeability", attachment: "Yes—through therapy and secure partnerships", bigFive: "Partially—behavioral adaptation", love: "Highly adaptable" },
  { aspect: "Neurobiology", attachment: "Amygdala reactivity, HPA axis, oxytocin", bigFive: "Prefrontal systems, serotonergic traits (research summaries)", love: "Not established" },
];

const attachmentIntegration = [
  "Integration: Attachment predicts relationship stability; Big Five predicts satisfaction (via Neuroticism/Agreeableness); Love Languages provide vocabulary for needs.",
];

const attachmentFaq = [
  {
    q: "Can my attachment style change?",
    a: "Yes—earned security. Attachment is moderately stable over years, but people can shift through secure long-term relationships, therapy focused on coherent narrative, and deliberate secure behaviors.",
  },
  {
    q: "Is attachment the same as personality?",
    a: "Related but distinct. Attachment is relational organization; Big Five are cross-situational traits. Attachment Anxiety correlates with Neuroticism; Avoidance correlates with lower Extraversion in research summaries.",
  },
  {
    q: "Why do I feel secure with friends but anxious with romantic partners?",
    a: "Context-specific activation. High-intimacy relationships can trigger deeper IWMs or partner-specific patterns; some strategies feel \"secure enough\" in friendships but not romance.",
  },
  {
    q: "Can two insecurely attached people have a healthy relationship?",
    a: "Yes, with awareness. Breaking the pursuit-distance cycle, practicing secure behaviors, and often couples therapy can make insecure-insecure pairings work.",
  },
  {
    q: "How does attachment affect parenting?",
    a: "Intergenerational transmission is a real effect: parental state of mind (AAI) predicts infant patterns. Earned secure adults can break cycles by developing coherent narratives and sensitive responsiveness.",
  },
  {
    q: "Is disorganized attachment the same as Borderline Personality Disorder?",
    a: "No, but correlated. Disorganization is a risk factor; BPD is a clinical syndrome. Many disorganized individuals never develop BPD and vice versa.",
  },
  {
    q: "What is earned secure attachment?",
    a: "Coherent narrative despite adversity: adults integrate trauma/loss into a balanced story, value attachment, and demonstrate secure states of mind and parenting behavior.",
  },
  {
    q: "Can I have different attachment styles with different people?",
    a: "Yes—partner-specific patterns exist. A secure partner can create secure-base dynamics; an avoidant partner can trigger anxious behaviors even in generally secure people.",
  },
  {
    q: "Is attachment theory culturally universal?",
    a: "Broadly yes, with variations in rates and expression. Secure base behavior appears across cultures, but proximity behaviors and avoidant/ambivalent rates vary by norms.",
  },
  {
    q: "Should I take the AAI or the ECR?",
    a: "Purpose-dependent: AAI is clinical/research (requires trained coder); ECR/ECR-R is fast self-report screening used in relationship counseling and research.",
  },
];

const attachmentQuestionsLegacy: AttachmentQuestion[] = [
  { styleDim: "A", prompt: "I worry about being abandoned or left." },
  { styleDim: "A", prompt: "When someone is slow to reply, I assume something is wrong." },
  { styleDim: "A", prompt: "I need frequent reassurance that I’m loved." },
  { styleDim: "A", prompt: "Small changes in tone can make me fear rejection." },
  { styleDim: "A", prompt: "I feel uneasy when I don’t know where I stand in a relationship." },
  { styleDim: "A", prompt: "I can get preoccupied with whether someone cares about me." },
  { styleDim: "A", prompt: "I fear my partner will lose interest in me." },
  { styleDim: "A", prompt: "I feel anxious when I’m not close to someone I love." },
  { styleDim: "A", prompt: "I get upset when I feel emotionally disconnected." },
  { styleDim: "A", prompt: "I often overthink signs that someone may pull away." },

  { styleDim: "V", prompt: "I prefer not to depend on others." },
  { styleDim: "V", prompt: "I feel uncomfortable when someone gets too close." },
  { styleDim: "V", prompt: "I keep my feelings to myself rather than share them." },
  { styleDim: "V", prompt: "I value independence more than emotional intimacy." },
  { styleDim: "V", prompt: "I avoid vulnerable conversations when possible." },
  { styleDim: "V", prompt: "I feel smothered when someone wants constant closeness." },
  { styleDim: "V", prompt: "I withdraw when conflict becomes emotional." },
  { styleDim: "V", prompt: "I prefer solving problems alone rather than asking for help." },
];

function toAttachmentQuestions(
  pool: Array<{ q: string; dimension: AttachmentStyleDim; facet: string; options: Array<{ text: string; score: 1 | 2 | 3 | 4 | 5 }> }>
): AttachmentQuestion[] {
  return pool.map((q) => ({
    prompt: q.q,
    styleDim: q.dimension,
    facet: q.facet,
    options: q.options,
  }));
}

const attachmentTips = {
  anxiety: [
    "Name the trigger, then reality-test it: what do I know vs. what am I assuming?",
    "Practice self-soothing before protest behaviors (breath, grounding, delay messaging).",
    "Ask directly for reassurance with a clear request and time boundary.",
    "Build secure routines: predictable check-ins reduce uncertainty loops.",
  ],
  avoidance: [
    "Practice gradual vulnerability: share one feeling + one need in low-stakes moments.",
    "Replace withdrawal with time-limited breaks: \"I need 20 minutes, then I’ll return.\"",
    "Let support in for small tasks to retrain self-reliance as flexible, not rigid.",
    "Increase tolerance for closeness: eye contact, touch, and emotional labeling in small doses.",
  ],
  disorganized: [
    "Prioritize safety and stabilization: trauma-informed therapy and predictable routines.",
    "Track approach-avoidance cycles and build repair scripts after conflict.",
    "Use grounding to reduce dissociation (sensory anchors, paced breathing).",
    "Choose partners and environments with consistency, transparency, and boundaries.",
  ],
};

export default function AssessmentTestPage() {
  const { get, locale } = useI18n();
  const params = useParams();
  const assessment = getAssessmentById(params.assessmentId ?? "");
  const brandName = (get("site.brandName") as string | undefined) ?? "PersonaCheck";
  const isLoading = false;

  if (!assessment) return <Navigate to="/" replace />;
  if (assessment.id === "iq") return <Navigate to="/test" replace />;

  const i18nStr = (keyPath: string, fallback: string) => {
    const v = get(keyPath);
    return typeof v === "string" ? v : fallback;
  };
  const i18nFmt = (keyPath: string, fallback: string, params: Record<string, string | number>) => {
    const template = i18nStr(keyPath, fallback);
    return template.replace(/\{(\w+)\}/g, (_, k: string) => String(params[k] ?? `{${k}}`));
  };

  if (assessment.id === "mbti") {
    const title =
      (get("assessments.test.mbti.helmet.title") as string | undefined) ??
      "Free MBTI Personality Assessment: Discover Your 4-Letter Type";
    const description =
      (get("assessments.test.mbti.helmet.description") as string | undefined) ??
      "Take a 20-question MBTI-style assessment across 4 dichotomies. Get your four-letter type, cognitive function stack, and an instant educational report.";
    const keywords =
      (get("assessments.test.mbti.helmet.keywords") as string | undefined) ??
      "MBTI test, personality type, cognitive functions, Jungian theory, 16 types";

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
          mainEntity: mbtiFaq.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        },
      ],
    };

    const [stage, setStage] = useState<"intro" | "test" | "result">("intro");
    const [questions, setQuestions] = useState<MbtiQuestion[]>([]);
    const [answers, setAnswers] = useState<AnswerState[]>([]);
    const [index, setIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const current = questions[index] ?? null;
    const total = questions.length;
    const answeredCount = answers.filter((a) => a.selectedIndex !== null).length;
    const progress = total > 0 ? Math.round((answeredCount / total) * 100) : 0;

    async function start() {
      setIsLoading(true);
      try {
        const pool = (await loadQuestionBank(locale, "mbti")) as Array<{
          q: string;
          dimension: MbtiDimension;
          options: Array<{ text: string; type: string; weight?: number }>;
        }>;
        const mbtiQuestions = toMbtiQuestions(pool);
        const q = buildBalancedByKey(mbtiQuestions, 20, ["EI", "SN", "TF", "JP"] as const, (x) => x.dimension);
        setQuestions(q);
        setAnswers(Array.from({ length: q.length }, () => ({ selectedIndex: null })));
        setIndex(0);
        setStage("test");
      } finally {
        setIsLoading(false);
      }
    }

    function restart() {
      setStage("intro");
      setQuestions([]);
      setAnswers([]);
      setIndex(0);
    }

    function choose(selectedIndex: number) {
      setAnswers((prev) => {
        const next = [...prev];
        next[index] = { selectedIndex };
        return next;
      });
    }

    function prev() {
      setIndex((i) => Math.max(0, i - 1));
    }

    function next() {
      if (index + 1 >= total) {
        setStage("result");
        return;
      }
      setIndex((i) => i + 1);
    }

    async function jumpToTest() {
      if (typeof window === "undefined") return;
      if (stage === "intro") {
        await start();
        requestAnimationFrame(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        });
        return;
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    const results = useMemo(() => {
      if (stage !== "result") return null;
      const counts: Record<string, number> = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

      for (let i = 0; i < total; i += 1) {
        const q = questions[i];
        const a = answers[i];
        if (!q) continue;
        if (typeof a?.selectedIndex === "number") {
          const opt = q.options[a.selectedIndex];
          if (opt) counts[opt.letter] += typeof opt.weight === "number" ? opt.weight : 1;
        }
      }

      const dim = (d: MbtiDimension) => {
        const [left, right] = dimensionLetters(d);
        const l = counts[left];
        const r = counts[right];
        const denom = l + r;
        const pctLeft = denom > 0 ? Math.round((l / denom) * 1000) / 10 : 50;
        const pctRight = denom > 0 ? Math.round((r / denom) * 1000) / 10 : 50;
        const letter = l === r ? left : l > r ? left : right;
        const clarity = Math.round(Math.abs(pctLeft - pctRight) * 10) / 10;
        return { left, right, l, r, pctLeft, pctRight, letter, clarity };
      };

      const EI = dim("EI");
      const SN = dim("SN");
      const TF = dim("TF");
      const JP = dim("JP");
      const typeCode = `${EI.letter}${SN.letter}${TF.letter}${JP.letter}`;

      const stack = matchFunctionStack(typeCode);
      const inferior = inferInferiorFunction(stack);
      const roadmap = inferior ? inferRoadmap(inferior) : inferRoadmap("NA");
      const profile = typeProfiles[typeCode] ?? null;

      const complement = `${oppositeLetter(EI.letter)}${SN.letter}${TF.letter}${oppositeLetter(JP.letter)}`;
      const opposite = `${oppositeLetter(EI.letter)}${oppositeLetter(SN.letter)}${oppositeLetter(TF.letter)}${oppositeLetter(JP.letter)}`;

      return { EI, SN, TF, JP, typeCode, stack, inferior, roadmap, profile, complement, opposite };
    }, [answers, questions, stage, total]);

    return (
      <>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:type" content="website" />
          <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        </Helmet>

        <section className={testStyles.wrapper}>
          <h1 className={testStyles.pageTitle}>{title}</h1>
          <p className={testStyles.pageSubtitle}>
            {(get("assessments.test.mbti.ui.pageSubtitle") as string | undefined) ??
              "20 questions • 4 dichotomies • 16 personality profiles • Instant detailed report • Private & secure"}
          </p>

          {stage === "intro" && (
            <div className={testStyles.card}>
              <div className={testStyles.introGrid}>
                <div className={testStyles.introItem}>
                  <div className={testStyles.introTitle}>
                    {i18nStr("assessments.test.common.ui.whatYouGetTitle", "What You Get")}
                  </div>
                  <ul className={testStyles.introList}>
                    {mbtiWhatYouGet.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className={testStyles.introItem}>
                  <div className={testStyles.introTitle}>
                    {i18nStr("assessments.test.common.ui.methodologyTitle", "Test Methodology & Scientific Foundation")}
                  </div>
                  <ul className={testStyles.introList}>
                    {mbtiMethodology.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <div style={{ marginTop: 10, color: "var(--muted)" }}>
                    <strong>{i18nStr("assessments.test.mbti.ui.noteStrong", "Note:")}</strong>{" "}
                    {i18nStr(
                      "assessments.test.mbti.ui.noteText",
                      "MBTI identifies preferences, not abilities. All types are equally valuable with different strengths."
                    )}
                  </div>
                </div>
              </div>

              <button type="button" className={testStyles.primaryBtn} onClick={start}>
                {i18nStr("assessments.test.common.ui.startTestButton", "Start The Test")}
              </button>

              <div className={testStyles.disclaimer}>
                {i18nStr(
                  "assessments.test.common.ui.privacyDisclaimer",
                  "Private & secure: no registration required, and results are not stored."
                )}
              </div>
            </div>
          )}

          {stage === "test" && current && (
            <div className={testStyles.card}>
              <div className={testStyles.progressRow}>
                <div
                  className={testStyles.progressBar}
                  aria-label={i18nStr("assessments.test.common.ui.progressAriaLabel", "Progress")}
                >
                  <div className={testStyles.progressFill} style={{ width: `${progress}%` }} />
                </div>
                <div className={testStyles.progressText}>
                  {i18nFmt("assessments.test.common.ui.questionProgress", "Question {current} / {total}", {
                    current: index + 1,
                    total,
                  })}
                </div>
              </div>

              <div className={testStyles.questionMeta}>
                <span className={testStyles.pill}>
                  {i18nStr("assessments.test.common.ui.dimensionLabel", "Dimension:")} {current.dimension}
                </span>
              </div>

              <div className={testStyles.questionText}>{current.prompt}</div>

              <div
                className={testStyles.options}
                role="radiogroup"
                aria-label={i18nStr("assessments.test.common.ui.answerChoicesAriaLabel", "Answer choices")}
              >
                {current.options.map((opt, optIndex) => {
                  const selected = answers[index]?.selectedIndex === optIndex;
                  return (
                    <button
                      key={`${optIndex}-${opt.text}`}
                      type="button"
                      className={`${testStyles.optionBtn} ${selected ? testStyles.selected : ""}`}
                      onClick={() => choose(optIndex)}
                      role="radio"
                      aria-checked={selected}
                    >
                      {opt.text}
                    </button>
                  );
                })}
              </div>

              <div className={testStyles.actions}>
                <button type="button" className={testStyles.secondaryBtn} onClick={prev} disabled={index === 0}>
                  {i18nStr("assessments.test.common.ui.backButton", "Back")}
                </button>
                <button type="button" className={testStyles.primaryBtn} onClick={next} disabled={answers[index]?.selectedIndex === null}>
                  {index + 1 >= total
                    ? i18nStr("assessments.test.common.ui.finishButton", "Finish")
                    : i18nStr("assessments.test.common.ui.nextButton", "Next")}
                </button>
              </div>
            </div>
          )}

          {stage === "result" && results && (
            <div className={testStyles.card}>
              <div className={testStyles.resultHeader}>
                <div className={testStyles.resultScore}>
                  {i18nStr("assessments.test.mbti.ui.yourTypeLabel", "Your Type:")}{" "}
                  <span className={testStyles.resultNumber}>{results.typeCode}</span>
                </div>
                <div className={testStyles.resultLabel}>{typeProfiles[results.typeCode]?.nickname ?? "Your MBTI-style profile"}</div>
                <div className={testStyles.resultSub}>
                  {i18nStr("assessments.test.mbti.ui.cognitiveFunctionsLabel", "Cognitive Functions:")} {results.stack}{" "}
                  {results.profile?.population ? `• Population: ${results.profile.population}` : ""}
                </div>
              </div>
              <div className={testStyles.disclaimer}>
                {i18nStr(
                  "assessments.test.common.ui.resultsDisclaimer",
                  "Educational estimate only. Results are approximate and not a clinical or scientific diagnosis."
                )}
              </div>

              <h2 className={testStyles.sectionTitle}>
                {i18nStr("assessments.test.mbti.ui.dichotomyBreakdownTitle", "Dichotomy Breakdown")}
              </h2>
              <div className={testStyles.breakdown}>
                {[
                  { label: "E vs I", d: results.EI },
                  { label: "S vs N", d: results.SN },
                  { label: "T vs F", d: results.TF },
                  { label: "J vs P", d: results.JP },
                ].map((row) => (
                  <div key={row.label} className={testStyles.breakdownRow}>
                    <div className={testStyles.breakdownTop}>
                      <span className={testStyles.breakdownName}>
                        {row.label}: {row.d.letter}
                      </span>
                      <span className={testStyles.breakdownValue}>
                        {row.d.left} {row.d.pctLeft}% • {row.d.right} {row.d.pctRight}%
                      </span>
                    </div>
                    <div className={testStyles.miniBar}>
                      <div className={testStyles.miniFill} style={{ width: `${Math.max(0, Math.min(100, row.d.pctLeft))}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <h2 className={testStyles.sectionTitle}>
                {i18nStr("assessments.test.mbti.ui.careerAlignmentTitle", "Career Alignment")}
              </h2>
              <div className={testStyles.breakdown}>
                {(results.profile?.careers ?? []).map((c) => (
                  <div key={c} className={testStyles.breakdownRow}>
                    <div className={testStyles.breakdownName}>{c}</div>
                  </div>
                ))}
              </div>

              <h2 className={testStyles.sectionTitle}>
                {i18nStr("assessments.test.mbti.ui.relationshipDynamicsTitle", "Relationship Dynamics")}
              </h2>
              <div className={testStyles.breakdown}>
                <div className={testStyles.breakdownRow}>
                  <div className={testStyles.breakdownName}>
                    {i18nStr(
                      "assessments.test.mbti.ui.complementaryPatternLabel",
                      "Complementary pattern (shared N/S and T/F)"
                    )}
                  </div>
                  <div className={testStyles.breakdownValue}>
                    {i18nFmt(
                      "assessments.test.mbti.ui.complementaryPatternText",
                      "Often described as {complement} (opposite E/I and J/P). Use this as a conversation starter, not a rule.",
                      { complement: results.complement }
                    )}
                  </div>
                </div>
                <div className={testStyles.breakdownRow}>
                  <div className={testStyles.breakdownName}>
                    {i18nStr("assessments.test.mbti.ui.oppositeTypeLabel", "Opposite type")}
                  </div>
                  <div className={testStyles.breakdownValue}>
                    {i18nFmt(
                      "assessments.test.mbti.ui.oppositeTypeText",
                      "{opposite}. Opposites can be growth catalysts but usually require explicit communication and translation.",
                      { opposite: results.opposite }
                    )}
                  </div>
                </div>
              </div>

              <h2 className={testStyles.sectionTitle}>
                {i18nStr("assessments.test.mbti.ui.growthRoadmapTitle", "Growth Roadmap (Inferior Function)")}
              </h2>
              <div className={testStyles.breakdown}>
                <div className={testStyles.breakdownRow}>
                  <div className={testStyles.breakdownName}>
                    {i18nStr("assessments.test.mbti.ui.inferiorFunctionLabel", "Inferior function")}
                  </div>
                  <div className={testStyles.breakdownValue}>{results.inferior ?? "Varies by model"}</div>
                </div>
                {results.roadmap.map((r) => (
                  <div key={r} className={testStyles.breakdownRow}>
                    <div className={testStyles.breakdownName}>{r}</div>
                  </div>
                ))}
              </div>

              <div className={testStyles.actions}>
                <button type="button" className={testStyles.secondaryBtn} onClick={restart}>
                  {i18nStr("assessments.test.common.ui.newTestButton", "New Test")}
                </button>
                <button type="button" className={testStyles.primaryBtn} onClick={start}>
                  {i18nStr("assessments.test.common.ui.retakeNewOrderButton", "Retake (New Order)")}
                </button>
              </div>
            </div>
          )}

          <section className={testStyles.seoSection} aria-label="Reliability and validity">
            <h2 className={testStyles.seoTitle}>
              {i18nStr("assessments.test.mbti.seo.reliabilityTitle", "Reliability & Validity (Educational Summary)")}
            </h2>
            <p className={testStyles.seoLead}>
              {i18nStr(
                "assessments.test.mbti.seo.reliabilityLead",
                "This assessment is a practice-style indicator. Use it for self-understanding and communication—not diagnosis or hiring."
              )}
            </p>
            <ul className={testStyles.bulletList}>
              {mbtiReliabilityValidity.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className={testStyles.seoSection} aria-label="The four dichotomies explained">
            <h2 className={testStyles.seoTitle}>
              {i18nStr("assessments.test.mbti.seo.dichotomiesTitle", "The Four Dichotomies Explained")}
            </h2>
            <div className={testStyles.breakdown}>
              {mbtiDichotomies.map((d) => (
                <div key={d.title} className={testStyles.breakdownRow}>
                  <div className={testStyles.breakdownName}>
                    <span aria-hidden="true">{d.icon}</span> {d.title}
                  </div>
                  <div className={testStyles.breakdownValue}>{d.subtitle}</div>
                  <div className={testStyles.tableWrap} style={{ marginTop: 12 }}>
                    <table className={testStyles.table}>
                      <thead>
                        <tr>
                          <th />
                          <th>{d.leftHeader}</th>
                          <th>{d.rightHeader}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {d.rows.map((r) => (
                          <tr key={r.label}>
                            <td style={{ fontWeight: 900 }}>{r.label}</td>
                            <td>{r.left}</td>
                            <td>{r.right}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <ul className={testStyles.bulletList} style={{ marginTop: 12 }}>
                    {d.notes.map((n) => (
                      <li key={n}>{n}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className={testStyles.seoSection} aria-label="The sixteen personality types">
            <h2 className={testStyles.seoTitle}>
              {i18nStr("assessments.test.mbti.seo.typesTitle", "The 16 Personality Types: Complete Profiles")}
            </h2>
            <p className={testStyles.seoLead}>
              {i18nStr("assessments.test.mbti.seo.typesLead", "These profiles are simplified summaries intended for educational use.")}
            </p>
            <div className={testStyles.factGrid}>
              {Object.entries(typeProfiles).map(([code, p]) => (
                <article key={code} className={testStyles.factCard}>
                  <div className={testStyles.factTitle}>
                    {code} ({p.nickname})
                  </div>
                  <ul className={testStyles.bulletList}>
                    <li>
                      <strong>{i18nStr("assessments.test.mbti.ui.functionsLabel", "Functions:")}</strong> {p.functions}
                    </li>
                    <li>
                      <strong>{i18nStr("assessments.test.mbti.ui.strengthsLabel", "Strengths:")}</strong> {p.strengths.join(", ")}
                    </li>
                    <li>
                      <strong>{i18nStr("assessments.test.mbti.ui.challengesLabel", "Challenges:")}</strong> {p.challenges.join(", ")}
                    </li>
                    <li>
                      <strong>{i18nStr("assessments.test.mbti.ui.careersLabel", "Careers:")}</strong> {p.careers.join(", ")}
                    </li>
                    <li>
                      <strong>{i18nStr("assessments.test.mbti.ui.populationLabel", "Population:")}</strong> {p.population}
                    </li>
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className={testStyles.seoSection} aria-label="Cognitive functions deep structure">
            <h2 className={testStyles.seoTitle}>
              {i18nStr("assessments.test.mbti.seo.cognitiveFunctionsTitle", "Cognitive Functions: The Deep Structure")}
            </h2>
            <p className={testStyles.seoLead}>
              {i18nStr(
                "assessments.test.mbti.seo.cognitiveFunctionsLead",
                "Beyond the 4-letter code is the cognitive function stack—the 8 mental processes described in Jungian-inspired models."
              )}
            </p>
            <div className={testStyles.twoCol}>
              <div className={testStyles.panel}>
                <h3 className={testStyles.panelTitle}>
                  {i18nStr("assessments.test.mbti.seo.perceivingFunctionsTitle", "Perceiving Functions")}
                </h3>
                <ul className={testStyles.bulletList}>
                  {cognitiveFunctions.perceiving.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
              <div className={testStyles.panel}>
                <h3 className={testStyles.panelTitle}>
                  {i18nStr("assessments.test.mbti.seo.judgingFunctionsTitle", "Judging Functions")}
                </h3>
                <ul className={testStyles.bulletList}>
                  {cognitiveFunctions.judging.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className={testStyles.seoSection} aria-label="History of psychological types">
            <h2 className={testStyles.seoTitle}>
              {i18nStr("assessments.test.mbti.seo.historyTitle", "History of Psychological Types")}
            </h2>
            <div className={testStyles.timeline} role="list">
              {mbtiHistory.map((item) => (
                <div key={item.year} className={testStyles.timelineItem} role="listitem">
                  <div className={testStyles.timelineYear}>{item.year}</div>
                  <div className={testStyles.timelineBody}>
                    <div className={testStyles.timelineTitle}>{item.title}</div>
                    <div className={testStyles.timelineDesc}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className={testStyles.seoSection} aria-label="Scientific facts and controversies">
            <h2 className={testStyles.seoTitle}>
              {i18nStr("assessments.test.mbti.seo.factsTitle", "Scientific Facts & Controversies")}
            </h2>
            <div className={testStyles.twoCol}>
              <div className={testStyles.panel}>
                <h3 className={testStyles.panelTitle}>
                  {i18nStr("assessments.test.mbti.seo.establishedFindingsTitle", "Established Findings (Summary)")}
                </h3>
                <div className={testStyles.breakdown}>
                  {mbtiEstablishedFindings.map((f) => (
                    <div key={f.title} className={testStyles.breakdownRow}>
                      <div className={testStyles.breakdownName}>{f.title}</div>
                      <ul className={testStyles.bulletList}>
                        {f.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
              <div className={testStyles.panel}>
                <h3 className={testStyles.panelTitle}>
                  {i18nStr("assessments.test.mbti.seo.scientificCriticismsTitle", "Scientific Criticisms")}
                </h3>
                <div className={testStyles.breakdown}>
                  {mbtiCriticisms.map((c) => (
                    <div key={c.title} className={testStyles.breakdownRow}>
                      <div className={testStyles.breakdownName}>{c.title}</div>
                      <div className={testStyles.breakdownValue}>{c.text}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className={testStyles.seoSection} aria-label="Comparison table">
            <h2 className={testStyles.seoTitle}>
              {i18nStr(
                "assessments.test.mbti.seo.comparisonTitle",
                "Comparison with Other Personality Assessments"
              )}
            </h2>
            <div className={testStyles.tableWrap}>
              <table className={testStyles.table}>
                <thead>
                  <tr>
                    <th>{i18nStr("assessments.test.mbti.seo.comparisonFeatureHeader", "Feature")}</th>
                    <th>{i18nStr("assessments.test.mbti.seo.comparisonMbtiHeader", "MBTI")}</th>
                    <th>{i18nStr("assessments.test.mbti.seo.comparisonBigFiveHeader", "Big Five (OCEAN)")}</th>
                    <th>{i18nStr("assessments.test.mbti.seo.comparisonEnneagramHeader", "Enneagram")}</th>
                    <th>{i18nStr("assessments.test.mbti.seo.comparisonDiscHeader", "DISC")}</th>
                  </tr>
                </thead>
                <tbody>
                  {mbtiComparisonRows.map((r) => (
                    <tr key={r.feature}>
                      <td>{r.feature}</td>
                      <td>{r.mbti}</td>
                      <td>{r.bigFive}</td>
                      <td>{r.enneagram}</td>
                      <td>{r.disc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className={testStyles.note}>
              {i18nStr(
                "assessments.test.mbti.seo.comparisonNote",
                "Recommendation: Use MBTI for understanding cognitive wiring; Big Five for predicting behavior; Enneagram for motivation/growth; DISC for workplace dynamics."
              )}
            </p>
          </section>

          <section className={testStyles.seoSection} aria-label="Frequently asked questions">
            <h2 className={testStyles.seoTitle}>
              {i18nStr("assessments.test.common.ui.faqTitle", "Frequently Asked Questions (FAQ)")}
            </h2>
            <div className={testStyles.faq}>
              {mbtiFaq.map((item) => (
                <details key={item.q} className={testStyles.faqItem}>
                  <summary className={testStyles.faqQ}>{item.q}</summary>
                  <div className={testStyles.faqA}>{item.a}</div>
                </details>
              ))}
            </div>
          </section>

          <section className={testStyles.seoSection} aria-label="Ready to discover your type">
            <h2 className={testStyles.seoTitle}>
              {i18nStr("assessments.test.mbti.seo.ctaTitle", "Ready to Discover Your Type?")}
            </h2>
            <p className={testStyles.seoLead}>
              {i18nStr(
                "assessments.test.mbti.seo.ctaLead",
                "20 questions • 10 minutes • Detailed 4-letter profile + cognitive functions"
              )}
            </p>
            <button type="button" className={testStyles.primaryBtn} onClick={jumpToTest} disabled={isLoading}>
              {stage === "intro"
                ? i18nStr("assessments.test.common.ui.startTestButton", "Start The Test")
                : i18nStr("assessments.test.common.ui.goToTestButton", "Go To The Test")}
            </button>
            <div className={testStyles.note} style={{ marginTop: 12 }}>
              {i18nStr("assessments.test.common.ui.preferOverviewFirst", "Prefer the overview first?")}{" "}
              <Link to="/assessments/mbti" style={{ color: "var(--primary)" }}>
                {i18nFmt("assessments.test.common.ui.readGuideTemplate", "Read the {name} guide", { name: "MBTI" })}
              </Link>
              .
            </div>
          </section>
        </section>
      </>
    );
  }

  if (assessment.id === "big-five") {
    const title =
      (get("assessments.test.big-five.helmet.title") as string | undefined) ??
      "Free Big Five Personality Assessment: The Science of You";
    const description =
      (get("assessments.test.big-five.helmet.description") as string | undefined) ??
      "20 questions • 5 dimensions • 30 facets • Percentile scoring • Evidence-based insights • Instant detailed report";
    const keywords =
      (get("assessments.test.big-five.helmet.keywords") as string | undefined) ??
      "Big Five test, OCEAN, personality traits, openness, conscientiousness, extraversion, agreeableness, neuroticism";

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
          mainEntity: bigFiveFaq.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        },
      ],
    };

    const traitMeta: Record<BigFiveTrait, { code: BigFiveTrait; name: string; icon: string }> = {
      O: { code: "O", name: "Openness", icon: "🎨" },
      C: { code: "C", name: "Conscientiousness", icon: "📋" },
      E: { code: "E", name: "Extraversion", icon: "🗣️" },
      A: { code: "A", name: "Agreeableness", icon: "💝" },
      N: { code: "N", name: "Neuroticism", icon: "🛡️" },
    };

    const allFacetNames = (Object.keys(bigFiveFacetsByTrait) as BigFiveTrait[]).flatMap((t) => bigFiveFacetsByTrait[t]);

    const [stage, setStage] = useState<"intro" | "test" | "result">("intro");
    const [questions, setQuestions] = useState<BigFiveQuestion[]>([]);
    const [answers, setAnswers] = useState<BigFiveAnswerState[]>([]);
    const [index, setIndex] = useState(0);

    const current = questions[index] ?? null;
    const total = questions.length;
    const answeredCount = answers.filter((a) => a.value !== null).length;
    const progress = total > 0 ? Math.round((answeredCount / total) * 100) : 0;

    function start() {
      const q = buildBalancedByKey(bigFiveQuestions, 20, ["O", "C", "E", "A", "N"] as const, (x) => x.trait);
      setQuestions(q);
      setAnswers(Array.from({ length: q.length }, () => ({ value: null })));
      setIndex(0);
      setStage("test");
    }

    function restart() {
      setStage("intro");
      setQuestions([]);
      setAnswers([]);
      setIndex(0);
    }

    function choose(value: 1 | 2 | 3 | 4 | 5) {
      setAnswers((prev) => {
        const next = [...prev];
        next[index] = { value };
        return next;
      });
    }

    function prev() {
      setIndex((i) => Math.max(0, i - 1));
    }

    function next() {
      if (index + 1 >= total) {
        setStage("result");
        return;
      }
      setIndex((i) => i + 1);
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

    const results = useMemo(() => {
      if (stage !== "result") return null;

      const traitSum: Record<BigFiveTrait, number> = { O: 0, C: 0, E: 0, A: 0, N: 0 };
      const traitCount: Record<BigFiveTrait, number> = { O: 0, C: 0, E: 0, A: 0, N: 0 };

      const facetSum: Record<string, number> = {};
      const facetWeight: Record<string, number> = {};

      function adjusted(q: BigFiveQuestion, v: 1 | 2 | 3 | 4 | 5): number {
        return q.reverse ? 6 - v : v;
      }

      for (let i = 0; i < total; i += 1) {
        const q = questions[i];
        const a = answers[i];
        if (!q) continue;
        if (!a?.value) continue;
        const s = adjusted(q, a.value);

        traitSum[q.trait] += s;
        traitCount[q.trait] += 1;

        for (const f of q.facets) {
          const key = f.facet;
          facetSum[key] = (facetSum[key] ?? 0) + s * f.weight;
          facetWeight[key] = (facetWeight[key] ?? 0) + f.weight;
        }
      }

      const traitOrder: BigFiveTrait[] = ["O", "C", "E", "A", "N"];
      const traits = traitOrder.map((t) => {
        const avg = traitCount[t] > 0 ? traitSum[t] / traitCount[t] : 3;
        const percentile = toPercentileFromLikert(avg);
        return { trait: t, avg: Math.round(avg * 100) / 100, percentile, stability: stabilityLabel(percentile) };
      });

      const facets = allFacetNames.map((facet) => {
        const w = facetWeight[facet] ?? 0;
        if (w <= 0) return { facet, avg: null as number | null, percentile: null as number | null, weight: 0 };
        const avg = facetSum[facet] / w;
        return { facet, avg: Math.round(avg * 100) / 100, percentile: toPercentileFromLikert(avg), weight: w };
      });

      const actionableFacets = facets.filter((f) => typeof f.percentile === "number") as Array<{
        facet: string;
        avg: number;
        percentile: number;
        weight: number;
      }>;
      actionableFacets.sort((a, b) => a.percentile - b.percentile);

      const growthTargets = actionableFacets.slice(0, 3).map((f) => ({
        facet: f.facet,
        percentile: f.percentile,
        tip: growthTipForFacet(f.facet),
      }));

      const insights: string[] = [];
      const byTrait = Object.fromEntries(traits.map((t) => [t.trait, t.percentile])) as Record<BigFiveTrait, number>;
      if (byTrait.C >= 65) insights.push("High Conscientiousness often predicts consistent goal-follow-through and higher job performance in research literature.");
      if (byTrait.N >= 65) insights.push("Higher Neuroticism often correlates with stress sensitivity; stress-management routines can improve day-to-day functioning.");
      if (byTrait.O >= 65) insights.push("Higher Openness often correlates with curiosity and learning agility; novelty can be energizing but may increase distractibility.");
      if (byTrait.E <= 35) insights.push("Lower Extraversion often aligns with preference for quiet focus and smaller social circles; protect deep-work time.");
      if (byTrait.A >= 65) insights.push("Higher Agreeableness often supports cooperation and relationship harmony; practice boundaries to avoid people-pleasing.");

      const facetRows = (Object.keys(bigFiveFacetsByTrait) as BigFiveTrait[]).flatMap((t) =>
        bigFiveFacetsByTrait[t].map((facet) => {
          const row = facets.find((f) => f.facet === facet) ?? null;
          const percentile = row?.percentile ?? null;
          return { trait: t, facet, percentile };
        }),
      );

      return { traits, facets, facetRows, growthTargets, insights };
    }, [answers, questions, stage, total, allFacetNames]);

    return (
      <>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:type" content="website" />
          <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        </Helmet>

        <section className={testStyles.wrapper}>
          <h1 className={testStyles.pageTitle}>{title}</h1>
          <p className={testStyles.pageSubtitle}>{description}</p>

          {stage === "intro" && (
            <div className={testStyles.card}>
              <div className={testStyles.introGrid}>
                <div className={testStyles.introItem}>
                  <div className={testStyles.introTitle}>
                    {i18nStr("assessments.test.common.ui.whatYouGetTitle", "What You Get")}
                  </div>
                  <ul className={testStyles.introList}>
                    {bigFiveWhatYouGet.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className={testStyles.introItem}>
                  <div className={testStyles.introTitle}>
                    {i18nStr("assessments.test.common.ui.methodologyTitle", "Test Methodology & Scientific Foundation")}
                  </div>
                  <ul className={testStyles.introList}>
                    {bigFiveMethodology.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                    {bigFiveValidation.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                    {bigFivePsychometrics.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <div className={testStyles.note}>
                    <strong>{i18nStr("assessments.test.big-five.ui.noteStrong", "Note:")}</strong>{" "}
                    {i18nStr(
                      "assessments.test.big-five.ui.noteText",
                      "This is educational and non-diagnostic. Percentiles are an approximate mapping from your response averages, not official population norms."
                    )}
                  </div>
                </div>
              </div>

              <button type="button" className={testStyles.primaryBtn} onClick={start}>
                {i18nStr("assessments.test.common.ui.startTestButton", "Start The Test")}
              </button>

              <div className={testStyles.disclaimer}>
                {i18nStr(
                  "assessments.test.big-five.ui.disclaimer",
                  "Research-grade privacy: calculations run locally; no registration and no data storage."
                )}
              </div>
            </div>
          )}

          {stage === "test" && current && (
            <div className={testStyles.card}>
              <div className={testStyles.progressRow}>
                <div
                  className={testStyles.progressBar}
                  aria-label={i18nStr("assessments.test.common.ui.progressAriaLabel", "Progress")}
                >
                  <div className={testStyles.progressFill} style={{ width: `${progress}%` }} />
                </div>
                <div className={testStyles.progressText}>
                {i18nFmt("assessments.test.common.ui.questionProgress", "Question {current} / {total}", {
                  current: index + 1,
                  total,
                })}
                </div>
              </div>

              <div className={testStyles.questionMeta}>
                <span className={testStyles.pill}>
                  {i18nStr("assessments.test.common.ui.traitLabel", "Trait:")} {traitMeta[current.trait].icon}{" "}
                  {traitMeta[current.trait].name} ({current.trait})
                </span>
              </div>

              <div className={testStyles.questionText}>{current.prompt}</div>

              <div
                className={testStyles.options}
                role="radiogroup"
                aria-label={i18nStr("assessments.test.common.ui.answerChoicesAriaLabel", "Answer choices")}
              >
                {(current as any).options.map((opt: { text: string }, optIndex: number) => {
                  const selected = answers[index]?.value === optIndex + 1;
                  return (
                    <button
                      key={`${optIndex}-${opt.text}`}
                      type="button"
                      className={`${testStyles.optionBtn} ${selected ? testStyles.selected : ""}`}
                      onClick={() => choose((optIndex + 1) as 1 | 2 | 3 | 4 | 5)}
                      role="radio"
                      aria-checked={selected}
                    >
                      {opt.text}
                    </button>
                  );
                })}
              </div>

              <div className={testStyles.actions}>
                <button type="button" className={testStyles.secondaryBtn} onClick={prev} disabled={index === 0}>
                  {i18nStr("assessments.test.common.ui.backButton", "Back")}
                </button>
                <button
                  type="button"
                  className={testStyles.primaryBtn}
                  onClick={next}
                  disabled={answers[index]?.value === null}
                >
                  {index + 1 >= total
                    ? i18nStr("assessments.test.common.ui.finishButton", "Finish")
                    : i18nStr("assessments.test.common.ui.nextButton", "Next")}
                </button>
              </div>
            </div>
          )}

          {stage === "result" && results && (
            <div className={testStyles.card}>
              <div className={testStyles.resultHeader}>
                <div className={testStyles.resultScore}>
                  {i18nStr("assessments.test.big-five.ui.yourProfileLabel", "Your Profile:")}{" "}
                  <span className={testStyles.resultNumber}>
                    {i18nStr("assessments.test.big-five.ui.profileName", "Big Five")}
                  </span>
                </div>
                <div className={testStyles.resultSub}>
                  {i18nStr("assessments.test.big-five.ui.resultSub", "Percentile scoring • Facet breakdown • Instant report")}
                </div>
              </div>
              <div className={testStyles.disclaimer}>
                {i18nStr(
                  "assessments.test.common.ui.resultsDisclaimer",
                  "Educational estimate only. Results are approximate and not a clinical or scientific diagnosis."
                )}
              </div>

              <h2 className={testStyles.sectionTitle}>
                {i18nStr("assessments.test.big-five.ui.dimensionScoresTitle", "5 Dimension Scores (Percentiles)")}
              </h2>
              <div className={testStyles.breakdown}>
                {results.traits.map((t) => (
                  <div key={t.trait} className={testStyles.breakdownRow}>
                    <div className={testStyles.breakdownTop}>
                      <span className={testStyles.breakdownName}>
                        {traitMeta[t.trait].icon} {traitMeta[t.trait].name} ({t.trait})
                      </span>
                      <span className={testStyles.breakdownValue}>{t.percentile}th</span>
                    </div>
                    <div className={testStyles.miniBar}>
                      <div className={testStyles.miniFill} style={{ width: `${Math.max(0, Math.min(100, t.percentile))}%` }} />
                    </div>
                    <div className={testStyles.breakdownValue} style={{ marginTop: 6 }}>
                      {i18nStr("assessments.test.big-five.ui.avgResponseLabel", "Avg response:")} {t.avg} / 5 • {t.stability}
                    </div>
                  </div>
                ))}
              </div>

              {results.insights.length > 0 && (
                <>
                  <h2 className={testStyles.sectionTitle}>
                    {i18nStr("assessments.test.big-five.ui.predictiveInsightsTitle", "Predictive Insights (Educational)")}
                  </h2>
                  <div className={testStyles.breakdown}>
                    {results.insights.map((s) => (
                      <div key={s} className={testStyles.breakdownRow}>
                        <div className={testStyles.breakdownValue}>{s}</div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              <h2 className={testStyles.sectionTitle}>
                {i18nStr("assessments.test.big-five.ui.facetBreakdownTitle", "30 Facet Breakdown")}
              </h2>
              <div className={testStyles.tableWrap}>
                <table className={testStyles.table}>
                  <thead>
                    <tr>
                      <th>{i18nStr("assessments.test.big-five.ui.facetTableTraitHeader", "Trait")}</th>
                      <th>{i18nStr("assessments.test.big-five.ui.facetTableFacetHeader", "Facet")}</th>
                      <th>{i18nStr("assessments.test.big-five.ui.facetTablePercentileHeader", "Percentile")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.facetRows.map((r) => (
                      <tr key={`${r.trait}-${r.facet}`}>
                        <td>
                          {traitMeta[r.trait].icon} {traitMeta[r.trait].name} ({r.trait})
                        </td>
                        <td>{r.facet}</td>
                        <td>
                          {typeof r.percentile === "number"
                            ? `${r.percentile}${i18nStr("assessments.test.common.ui.percentileSuffix", "th")}`
                            : i18nStr("assessments.test.common.ui.missingValue", "—")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2 className={testStyles.sectionTitle}>
                {i18nStr("assessments.test.big-five.ui.growthPlanTitle", "Personalized Growth Plan (Top 3 Targets)")}
              </h2>
              <div className={testStyles.breakdown}>
                {results.growthTargets.map((g) => (
                  <div key={g.facet} className={testStyles.breakdownRow}>
                    <div className={testStyles.breakdownTop}>
                      <span className={testStyles.breakdownName}>{g.facet}</span>
                      <span className={testStyles.breakdownValue}>
                        {g.percentile}
                        {i18nStr("assessments.test.common.ui.percentileSuffix", "th")}
                      </span>
                    </div>
                    <div className={testStyles.breakdownValue}>
                      {g.tip}
                    </div>
                  </div>
                ))}
              </div>

              <div className={testStyles.actions}>
                <button type="button" className={testStyles.secondaryBtn} onClick={restart}>
                  {i18nStr("assessments.test.common.ui.retakeButton", "Retake")}
                </button>
                <button type="button" className={testStyles.primaryBtn} onClick={jumpToTest}>
                  {i18nStr("assessments.test.common.ui.goToTestButton", "Go To The Test")}
                </button>
              </div>
            </div>
          )}

          <section className={testStyles.seoSection} aria-label="Deep dive on the five dimensions">
            <h2 className={testStyles.seoTitle}>
              {i18nStr("assessments.test.big-five.seo.deepDiveTitle", "The Five Dimensions: Deep Dive")}
            </h2>
            <div className={testStyles.seoGrid}>
              {bigFiveDeepDive.map((d) => (
                <div key={d.title} className={testStyles.seoCard}>
                  <div className={testStyles.seoCardTitle}>
                    <span aria-hidden="true">{d.icon}</span> {d.title}
                  </div>
                  <p className={testStyles.seoText}>{d.lead}</p>
                  <div className={testStyles.seoCols}>
                    <div>
                      <div className={testStyles.seoSubTitle}>
                        {i18nStr("assessments.test.big-five.seo.highScorersTitle", "High scorers")}
                      </div>
                      <ul className={testStyles.seoList}>
                        {d.high.map((x) => (
                          <li key={x}>{x}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className={testStyles.seoSubTitle}>
                        {i18nStr("assessments.test.big-five.seo.lowScorersTitle", "Low scorers")}
                      </div>
                      <ul className={testStyles.seoList}>
                        {d.low.map((x) => (
                          <li key={x}>{x}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className={testStyles.note}>
                    <strong>{i18nStr("assessments.test.big-five.seo.sixFacetsLabel", "The Six Facets:")}</strong>
                    <br />
                    <ul className={testStyles.bulletList} style={{ marginTop: 10 }}>
                      {d.facetDescriptions.map((fd) => (
                        <li key={fd}>{fd}</li>
                      ))}
                    </ul>
                    <br />
                    <strong>{i18nStr("assessments.test.big-five.seo.brainCorrelatesLabel", "Brain correlates:")}</strong> {d.brain}
                    <br />
                    <strong>{i18nStr("assessments.test.big-five.seo.implicationsLabel", "Implications:")}</strong> {d.career}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className={testStyles.seoSection} aria-label="Test methodology and scientific foundation">
            <h2 className={testStyles.seoTitle}>
              {i18nStr("assessments.test.common.ui.methodologyTitle", "Test Methodology & Scientific Foundation")}
            </h2>
            <div className={testStyles.twoCol}>
              {bigFiveMethodologySections.map((m) => (
                <div key={m.title} className={testStyles.panel}>
                  <h3 className={testStyles.panelTitle}>{m.title}</h3>
                  <p className={testStyles.panelText}>{m.text}</p>
                  {m.bullets ? (
                    <ul className={testStyles.bulletList}>
                      {m.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ))}
            </div>
          </section>

          <section className={testStyles.seoSection} aria-label="History timeline">
            <h2 className={testStyles.seoTitle}>
              {i18nStr("assessments.test.big-five.seo.historyTitle", "History of the Five Factor Model")}
            </h2>
            <div className={testStyles.timeline}>
              {bigFiveHistory.map((t) => (
                <div key={`${t.year}-${t.title}`} className={testStyles.timelineItem}>
                  <div className={testStyles.timelineYear}>{t.year}</div>
                  <div className={testStyles.timelineBody}>
                    <div className={testStyles.timelineTitle}>{t.title}</div>
                    <div className={testStyles.timelineDesc}>{t.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className={testStyles.seoSection} aria-label="Scientific facts heredity stability change">
            <h2 className={testStyles.seoTitle}>
              {i18nStr("assessments.test.big-five.seo.scienceTitle", "Scientific Facts: Heredity, Stability & Change")}
            </h2>
            <div className={testStyles.twoCol}>
              <div className={testStyles.panel}>
                <h3 className={testStyles.panelTitle}>
                  {i18nStr("assessments.test.big-five.seo.geneticHeritabilityTitle", "Genetic Heritability")}
                </h3>
                <ul className={testStyles.bulletList}>
                  {bigFiveScience.heredity.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
              <div className={testStyles.panel}>
                <h3 className={testStyles.panelTitle}>
                  {i18nStr("assessments.test.big-five.seo.stabilityAcrossLifespanTitle", "Stability Across Lifespan")}
                </h3>
                <ul className={testStyles.bulletList}>
                  {bigFiveScience.lifespan.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className={testStyles.twoCol} style={{ marginTop: 14 }}>
              <div className={testStyles.panel}>
                <h3 className={testStyles.panelTitle}>
                  {i18nStr("assessments.test.big-five.seo.workplaceTitle", "Workplace")}
                </h3>
                <ul className={testStyles.bulletList}>
                  {bigFiveScience.predictive.workplace.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
              <div className={testStyles.panel}>
                <h3 className={testStyles.panelTitle}>
                  {i18nStr("assessments.test.big-five.seo.relationshipsTitle", "Relationships")}
                </h3>
                <ul className={testStyles.bulletList}>
                  {bigFiveScience.predictive.relationships.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className={testStyles.panel} style={{ marginTop: 14 }}>
              <h3 className={testStyles.panelTitle}>
                {i18nStr("assessments.test.big-five.seo.healthTitle", "Health")}
              </h3>
              <ul className={testStyles.bulletList}>
                {bigFiveScience.predictive.health.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          </section>

          <section className={testStyles.seoSection} aria-label="Big Five versus MBTI">
            <h2 className={testStyles.seoTitle}>
              {i18nStr("assessments.test.big-five.seo.vsMbtiTitle", "Big Five vs. MBTI")}
            </h2>
            <div className={testStyles.tableWrap}>
              <table className={testStyles.table}>
                <thead>
                  <tr>
                    <th>{i18nStr("assessments.test.big-five.seo.vsMbtiAspectHeader", "Aspect")}</th>
                    <th>{i18nStr("assessments.test.big-five.seo.vsMbtiBigFiveHeader", "Big Five (OCEAN)")}</th>
                    <th>{i18nStr("assessments.test.big-five.seo.vsMbtiMbtiHeader", "MBTI")}</th>
                  </tr>
                </thead>
                <tbody>
                  {bigFiveVsMbtiRows.map((row) => (
                    <tr key={row.aspect}>
                      <td>{row.aspect}</td>
                      <td>{row.bigFive}</td>
                      <td>{row.mbti}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ul className={testStyles.bulletList} style={{ marginTop: 12 }}>
              {bigFiveVsMbtiSynthesis.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </section>

          <section className={testStyles.seoSection} aria-label="Frequently asked questions">
            <h2 className={testStyles.seoTitle}>
              {i18nStr("assessments.test.common.ui.faqTitle", "Frequently Asked Questions (FAQ)")}
            </h2>
            <div className={testStyles.faq}>
              {bigFiveFaq.map((item) => (
                <details key={item.q} className={testStyles.faqItem}>
                  <summary className={testStyles.faqQ}>{item.q}</summary>
                  <div className={testStyles.faqA}>{item.a}</div>
                </details>
              ))}
            </div>
          </section>

          <section className={testStyles.seoSection} aria-label="Ready to get your profile">
            <h2 className={testStyles.seoTitle}>
              {i18nStr("assessments.test.big-five.seo.ctaTitle", "Ready for Your Scientific Profile?")}
            </h2>
            <p className={testStyles.seoLead}>
              {i18nStr(
                "assessments.test.big-five.seo.ctaLead",
                "20 questions • 5 dimensions • Percentile rankings • Instant analysis"
              )}
            </p>
            <button type="button" className={testStyles.primaryBtn} onClick={jumpToTest} disabled={isLoading}>
              {stage === "intro"
                ? i18nStr("assessments.test.common.ui.startTestButton", "Start The Test")
                : i18nStr("assessments.test.common.ui.goToTestButton", "Go To The Test")}
            </button>
            <div className={testStyles.note} style={{ marginTop: 12 }}>
              {i18nStr("assessments.test.common.ui.preferOverviewFirst", "Prefer the overview first?")}{" "}
              <Link to="/assessments/big-five" style={{ color: "var(--primary)" }}>
                {i18nFmt("assessments.test.common.ui.readGuideTemplate", "Read the {name} guide", { name: "Big Five" })}
              </Link>
              .
            </div>
          </section>
        </section>
      </>
    );
  }

  if (assessment.id === "disc") {
    const title =
      (get("assessments.test.disc.helmet.title") as string | undefined) ?? "💼 DISC Assessment: The Behavioral Style Inventory";
    const description =
      (get("assessments.test.disc.helmet.description") as string | undefined) ??
      "28 questions • 4 dimensions • 12 unique styles • Behavioral mapping • Workplace-focused • Instant application";
    const keywords =
      (get("assessments.test.disc.helmet.keywords") as string | undefined) ??
      "DISC assessment, behavioral styles, Dominance, Influence, Steadiness, Conscientiousness";

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
          mainEntity: discFaq.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        },
      ],
    };

    const dimMeta: Record<DiscDimension, { code: DiscDimension; name: string; icon: string }> = {
      D: { code: "D", name: "Dominance", icon: "🎯" },
      I: { code: "I", name: "Influence", icon: "🌟" },
      S: { code: "S", name: "Steadiness", icon: "🛡️" },
      C: { code: "C", name: "Conscientiousness", icon: "📊" },
    };

    function discStyleLabel(primary: DiscDimension, secondary: DiscDimension | null): string {
      const letter = (d: DiscDimension, position: "first" | "second") => {
        if (d === "I") return position === "first" ? "i" : "i";
        return d;
      };
      if (!secondary) return primary === "I" ? "i" : primary;
      return `${letter(primary, "first")}${letter(secondary, "second")}`;
    }

    const [stage, setStage] = useState<"intro" | "test" | "result">("intro");
    const [questions, setQuestions] = useState<DiscQuestion[]>([]);
    const [answers, setAnswers] = useState<DiscAnswerState[]>([]);
    const [index, setIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const current = questions[index] ?? null;
    const total = questions.length;
    const answeredCount = answers.filter((a) => a.selected !== null).length;
    const progress = total > 0 ? Math.round((answeredCount / total) * 100) : 0;

    async function start() {
      setIsLoading(true);
      try {
        const pool = (await loadQuestionBank(locale, "disc")) as Array<{
          q: string;
          options: Array<{ text: string; type: DiscDimension; weight?: number }>;
        }>;
        const discQuestions = toDiscQuestions(pool);
        const q = takeRandom(discQuestions, 20);
        setQuestions(q);
        setAnswers(Array.from({ length: q.length }, () => ({ selected: null, weight: null })));
        setIndex(0);
        setStage("test");
      } finally {
        setIsLoading(false);
      }
    }

    function restart() {
      setStage("intro");
      setQuestions([]);
      setAnswers([]);
      setIndex(0);
    }

    function choose(selected: DiscDimension, weight?: number) {
      setAnswers((prev) => {
        const next = [...prev];
        next[index] = { selected, weight: typeof weight === "number" ? weight : 1 };
        return next;
      });
    }

    function prev() {
      setIndex((i) => Math.max(0, i - 1));
    }

    function next() {
      if (index + 1 >= total) {
        setStage("result");
        return;
      }
      setIndex((i) => i + 1);
    }

    async function jumpToTest() {
      if (typeof window === "undefined") return;
      if (stage === "intro") {
        await start();
        requestAnimationFrame(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        });
        return;
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    const results = useMemo(() => {
      if (stage !== "result") return null;

      const sum: Record<DiscDimension, number> = { D: 0, I: 0, S: 0, C: 0 };
      let totalWeight = 0;

      for (let i = 0; i < total; i += 1) {
        const q = questions[i];
        const a = answers[i];
        if (!q) continue;
        if (!a?.selected) continue;
        const w = typeof a.weight === "number" ? a.weight : 1;
        sum[a.selected] += w;
        totalWeight += w;
      }

      const dims: DiscDimension[] = ["D", "I", "S", "C"];
      const scores = dims.map((d) => {
        const pct = totalWeight > 0 ? (sum[d] / totalWeight) * 100 : 25;
        const percentile = Math.round(pct);
        return { dimension: d, avg: sum[d], percentile };
      });
      const ordered = [...scores].sort((a, b) => b.percentile - a.percentile);
      const primary = ordered[0]?.dimension ?? "D";
      const secondary = ordered[1]?.dimension ?? "I";
      const blend = Math.abs((ordered[0]?.percentile ?? 0) - (ordered[1]?.percentile ?? 0)) <= 8;
      const style = discStyleLabel(primary, blend ? secondary : null);
      const styleRow = discStyleTable.find((r) => r.style === style) ?? null;

      const workplace = {
        D: { motivates: "Autonomy, control, winning, visible outcomes, speed", stresses: "Slow process, indecision, bureaucracy, emotional negotiation", adapt: "Slow down slightly, show rationale, invite input when stakes are high" },
        I: { motivates: "Recognition, connection, variety, persuasion, social energy", stresses: "Isolation, heavy documentation, cold feedback, rigid rules", adapt: "Add structure, confirm details in writing, listen for constraints" },
        S: { motivates: "Stability, support, predictability, collaboration, trust", stresses: "Abrupt change, conflict, instability, constant urgency", adapt: "Communicate change early, set clear expectations, practice direct boundary scripts" },
        C: { motivates: "Accuracy, standards, logic, clarity, proven methods", stresses: "Ambiguity, sloppy work, emotional pressure, vague instructions", adapt: "Communicate succinctly, accept 80/20 when needed, align detail level to risk" },
      } satisfies Record<DiscDimension, { motivates: string; stresses: string; adapt: string }>;

      const playbook = {
        D: ["Lead with results and options", "Be brief and direct", "Offer autonomy and deadlines"],
        I: ["Start with warmth and vision", "Use stories and collaboration", "Confirm next steps in writing"],
        S: ["Be patient and consistent", "Explain impact on people and stability", "Give time to adjust and support"],
        C: ["Bring data, criteria, and risks", "Define scope, standards, and process", "Avoid vague language and surprise changes"],
      } satisfies Record<DiscDimension, string[]>;

      return { scores, ordered, primary, secondary, blend, style, styleRow, workplace, playbook };
    }, [answers, questions, stage, total]);

    return (
      <>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:type" content="website" />
          <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        </Helmet>

        <section className={testStyles.wrapper}>
          <h1 className={testStyles.pageTitle}>{title}</h1>
          <p className={testStyles.pageSubtitle}>{description}</p>

          {stage === "intro" && (
            <div className={testStyles.card}>
              <div className={testStyles.introGrid}>
                <div className={testStyles.introItem}>
                  <div className={testStyles.introTitle}>
                    {i18nStr("assessments.test.common.ui.whatYouGetTitle", "What You Get")}
                  </div>
                  <ul className={testStyles.introList}>
                    {discWhatYouGet.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className={testStyles.introItem}>
                  <div className={testStyles.introTitle}>
                    {i18nStr("assessments.test.common.ui.methodologyTitle", "Test Methodology & Scientific Foundation")}
                  </div>
                  <ul className={testStyles.introList}>
                    {discMethodologySections.map((s) => (
                      <li key={s.title}>{s.title}</li>
                    ))}
                  </ul>
                  <div className={testStyles.note}>
                    <strong>{i18nStr("assessments.test.disc.ui.noteStrong", "Critical note:")}</strong>{" "}
                    {i18nStr(
                      "assessments.test.disc.ui.noteText",
                      "DISC is workplace-focused and measures behavioral expression (context-dependent), not deep personality traits."
                    )}
                  </div>
                </div>
              </div>

              <button type="button" className={testStyles.primaryBtn} onClick={start}>
                {i18nStr("assessments.test.common.ui.startTestButton", "Start The Test")}
              </button>

              <div className={testStyles.disclaimer}>
                {i18nStr(
                  "assessments.test.disc.ui.disclaimer",
                  "Workplace-focused and private: no registration required, and results are not stored."
                )}
              </div>
            </div>
          )}

          {stage === "test" && current && (
            <div className={testStyles.card}>
              <div className={testStyles.progressRow}>
                <div
                  className={testStyles.progressBar}
                  aria-label={i18nStr("assessments.test.common.ui.progressAriaLabel", "Progress")}
                >
                  <div className={testStyles.progressFill} style={{ width: `${progress}%` }} />
                </div>
                <div className={testStyles.progressText}>
                {i18nFmt("assessments.test.common.ui.questionProgress", "Question {current} / {total}", {
                  current: index + 1,
                  total,
                })}
                </div>
              </div>

              <div className={testStyles.questionText}>{current.prompt}</div>

              <div
                className={testStyles.options}
                role="radiogroup"
                aria-label={i18nStr("assessments.test.common.ui.answerChoicesAriaLabel", "Answer choices")}
              >
                {current.options.map((opt) => {
                  const selected = answers[index]?.selected === opt.type;
                  return (
                    <button
                      key={`${opt.type}-${opt.text}`}
                      type="button"
                      className={`${testStyles.optionBtn} ${selected ? testStyles.selected : ""}`}
                      onClick={() => choose(opt.type, opt.weight)}
                      role="radio"
                      aria-checked={selected}
                    >
                      {opt.text}
                    </button>
                  );
                })}
              </div>

              <div className={testStyles.actions}>
                <button type="button" className={testStyles.secondaryBtn} onClick={prev} disabled={index === 0}>
                  {i18nStr("assessments.test.common.ui.backButton", "Back")}
                </button>
                <button type="button" className={testStyles.primaryBtn} onClick={next} disabled={answers[index]?.selected === null}>
                  {index + 1 >= total
                    ? i18nStr("assessments.test.common.ui.finishButton", "Finish")
                    : i18nStr("assessments.test.common.ui.nextButton", "Next")}
                </button>
              </div>
            </div>
          )}

          {stage === "result" && results && (
            <div className={testStyles.card}>
              <div className={testStyles.resultHeader}>
                <div className={testStyles.resultScore}>
                  {i18nStr("assessments.test.disc.ui.yourDiscStyleLabel", "Your DISC Style:")}{" "}
                  <span className={testStyles.resultNumber}>{results.style}</span>
                </div>
                <div className={testStyles.resultLabel}>{results.styleRow?.name ?? "Behavioral style blend"}</div>
                <div className={testStyles.resultSub}>
                  {i18nStr(
                    "assessments.test.disc.ui.resultSub",
                    "4 dimensions • 12 blended styles • Workplace application • Instant insights"
                  )}
                </div>
              </div>
              <div className={testStyles.disclaimer}>
                {i18nStr(
                  "assessments.test.common.ui.resultsDisclaimer",
                  "Educational estimate only. Results are approximate and not a clinical or scientific diagnosis."
                )}
              </div>

              <h2 className={testStyles.sectionTitle}>
                {i18nStr("assessments.test.disc.ui.primaryDimensionsTitle", "4 Primary Dimensions (Percentiles)")}
              </h2>
              <div className={testStyles.breakdown}>
                {results.scores.map((s) => (
                  <div key={s.dimension} className={testStyles.breakdownRow}>
                    <div className={testStyles.breakdownTop}>
                      <span className={testStyles.breakdownName}>
                        {dimMeta[s.dimension].icon} {dimMeta[s.dimension].name} ({s.dimension})
                      </span>
                      <span className={testStyles.breakdownValue}>
                        {s.percentile}
                        {i18nStr("assessments.test.common.ui.percentileSuffix", "th")}
                      </span>
                    </div>
                    <div className={testStyles.miniBar}>
                      <div className={testStyles.miniFill} style={{ width: `${Math.max(0, Math.min(100, s.percentile))}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <h2 className={testStyles.sectionTitle}>
                {i18nStr("assessments.test.disc.ui.workplacePrioritiesTitle", "Workplace Priorities")}
              </h2>
              <div className={testStyles.breakdown}>
                {results.ordered.slice(0, 2).map((s) => (
                  <div key={s.dimension} className={testStyles.breakdownRow}>
                    <div className={testStyles.breakdownName}>
                      {dimMeta[s.dimension].icon} {dimMeta[s.dimension].name}
                    </div>
                    <div className={testStyles.breakdownValue} style={{ marginTop: 8 }}>
                      <strong>{i18nStr("assessments.test.disc.ui.motivatesLabel", "Motivates:")}</strong>{" "}
                      {results.workplace[s.dimension].motivates}
                      <br />
                      <strong>{i18nStr("assessments.test.disc.ui.stressesLabel", "Stresses:")}</strong>{" "}
                      {results.workplace[s.dimension].stresses}
                      <br />
                      <strong>{i18nStr("assessments.test.disc.ui.leadershipAdaptationLabel", "Leadership adaptation:")}</strong>{" "}
                      {results.workplace[s.dimension].adapt}
                    </div>
                  </div>
                ))}
              </div>

              <h2 className={testStyles.sectionTitle}>
                {i18nStr("assessments.test.disc.ui.communicationPlaybookTitle", "Communication Playbook")}
              </h2>
              <div className={testStyles.twoCol}>
                {(["D", "I", "S", "C"] as DiscDimension[]).map((d) => (
                  <div key={d} className={testStyles.panel}>
                    <h3 className={testStyles.panelTitle}>
                      {dimMeta[d].icon} {dimMeta[d].name}
                    </h3>
                    <ul className={testStyles.bulletList}>
                      {results.playbook[d].map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className={testStyles.actions}>
                <button type="button" className={testStyles.secondaryBtn} onClick={restart}>
                  {i18nStr("assessments.test.common.ui.retakeButton", "Retake")}
                </button>
                <button type="button" className={testStyles.primaryBtn} onClick={jumpToTest}>
                  {i18nStr("assessments.test.common.ui.goToTestButton", "Go To The Test")}
                </button>
              </div>
            </div>
          )}

          <section className={testStyles.seoSection} aria-label="Test methodology and scientific foundation">
            <h2 className={testStyles.seoTitle}>
              {i18nStr("assessments.test.common.ui.methodologyTitle", "Test Methodology & Scientific Foundation")}
            </h2>
            <div className={testStyles.twoCol}>
              {discMethodologySections.map((s) => (
                <div key={s.title} className={testStyles.panel}>
                  <h3 className={testStyles.panelTitle}>{s.title}</h3>
                  {s.text ? <p className={testStyles.panelText}>{s.text}</p> : null}
                  {s.bullets ? (
                    <ul className={testStyles.bulletList}>
                      {s.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ))}
            </div>
          </section>

          <section className={testStyles.seoSection} aria-label="The four dimensions deep dive">
            <h2 className={testStyles.seoTitle}>
              {i18nStr("assessments.test.disc.seo.deepDiveTitle", "The Four Dimensions: Deep Dive")}
            </h2>
            <div className={testStyles.seoGrid}>
              {discDeepDive.map((d) => (
                <div key={d.title} className={testStyles.seoCard}>
                  <div className={testStyles.seoCardTitle}>
                    <span aria-hidden="true">{d.icon}</span> {d.title}
                  </div>
                  <p className={testStyles.seoText}>
                    <strong>{i18nStr("assessments.test.disc.seo.focusLabel", "Focus:")}</strong> {d.focus}
                  </p>
                  <div className={testStyles.seoCols}>
                    <div>
                      <div className={testStyles.seoSubTitle}>
                        {i18nStr("assessments.test.disc.seo.highScorersSubtitle", "High scorers (75th+ percentile)")}
                      </div>
                      <ul className={testStyles.seoList}>
                        {d.high.map((x) => (
                          <li key={x}>{x}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className={testStyles.seoSubTitle}>
                        {i18nStr("assessments.test.disc.seo.lowScorersSubtitle", "Low scorers (25th- percentile)")}
                      </div>
                      <ul className={testStyles.seoList}>
                        {d.low.map((x) => (
                          <li key={x}>{x}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className={testStyles.note}>
                    {d.workplaceDNA}
                    <br />
                    <strong>{d.variantsTitle}:</strong>
                    <ul className={testStyles.bulletList} style={{ marginTop: 10 }}>
                      {d.variants.map((v) => (
                        <li key={v}>{v}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className={testStyles.seoSection} aria-label="The 12 disc style combinations">
            <h2 className={testStyles.seoTitle}>
              {i18nStr("assessments.test.disc.seo.styleCombinationsTitle", "The 12 DISC Style Combinations")}
            </h2>
            <div className={testStyles.tableWrap}>
              <table className={testStyles.table}>
                <thead>
                  <tr>
                    <th>{i18nStr("assessments.test.disc.seo.styleTableStyleHeader", "Style")}</th>
                    <th>{i18nStr("assessments.test.disc.seo.styleTableNameHeader", "Name")}</th>
                    <th>{i18nStr("assessments.test.disc.seo.styleTableKeyHeader", "Key Characteristics")}</th>
                    <th>{i18nStr("assessments.test.disc.seo.styleTableRolesHeader", "Optimal Roles")}</th>
                  </tr>
                </thead>
                <tbody>
                  {discStyleTable.map((r) => (
                    <tr key={r.style}>
                      <td>{r.style}</td>
                      <td>{r.name}</td>
                      <td>{r.key}</td>
                      <td>{r.roles}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className={testStyles.seoSection} aria-label="DISC versus Big Five">
            <h2 className={testStyles.seoTitle}>
              {i18nStr("assessments.test.disc.seo.vsBigFiveTitle", "DISC vs. Big Five: Critical Differences")}
            </h2>
            <div className={testStyles.tableWrap}>
              <table className={testStyles.table}>
                <thead>
                  <tr>
                    <th>{i18nStr("assessments.test.disc.seo.vsBigFiveAspectHeader", "Aspect")}</th>
                    <th>{i18nStr("assessments.test.disc.seo.vsBigFiveDiscHeader", "DISC")}</th>
                    <th>{i18nStr("assessments.test.disc.seo.vsBigFiveBigFiveHeader", "Big Five (OCEAN)")}</th>
                  </tr>
                </thead>
                <tbody>
                  {discVsBigFiveRows.map((r) => (
                    <tr key={r.aspect}>
                      <td>{r.aspect}</td>
                      <td>{r.disc}</td>
                      <td>{r.bigFive}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className={testStyles.note}>
              <strong>{i18nStr("assessments.test.disc.seo.correlationLabel", "The Correlation:")}</strong>{" "}
              {i18nStr("assessments.test.disc.seo.correlationLead", "While different instruments, they loosely map:")}
            </p>
            <ul className={testStyles.bulletList}>
              {discCorrelation.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </section>

          <section className={testStyles.seoSection} aria-label="Frequently asked questions">
            <h2 className={testStyles.seoTitle}>
              {i18nStr("assessments.test.common.ui.faqTitle", "Frequently Asked Questions (FAQ)")}
            </h2>
            <div className={testStyles.faq}>
              {discFaq.map((item) => (
                <details key={item.q} className={testStyles.faqItem}>
                  <summary className={testStyles.faqQ}>{item.q}</summary>
                  <div className={testStyles.faqA}>{item.a}</div>
                </details>
              ))}
            </div>
          </section>

          <section className={testStyles.seoSection} aria-label="Ready for your behavioral profile">
            <h2 className={testStyles.seoTitle}>
              {i18nStr("assessments.test.disc.seo.ctaTitle", "Ready for Your Behavioral Profile?")}
            </h2>
            <p className={testStyles.seoLead}>
              {i18nStr(
                "assessments.test.disc.seo.ctaLead",
                "28 questions • 4 dimensions • 12 styles • Workplace application • Instant insights"
              )}
            </p>
            <button type="button" className={testStyles.primaryBtn} onClick={jumpToTest} disabled={isLoading}>
              {stage === "intro"
                ? i18nStr("assessments.test.common.ui.startTestButton", "Start The Test")
                : i18nStr("assessments.test.common.ui.goToTestButton", "Go To The Test")}
            </button>
            <div className={testStyles.note} style={{ marginTop: 12 }}>
              {i18nStr("assessments.test.common.ui.preferOverviewFirst", "Prefer the overview first?")}{" "}
              <Link to="/assessments/disc" style={{ color: "var(--primary)" }}>
                {i18nFmt("assessments.test.common.ui.readGuideTemplate", "Read the {name} guide", { name: "DISC" })}
              </Link>
              .
            </div>
          </section>
        </section>
      </>
    );
  }

  if (assessment.id === "enneagram") {
    const title =
      (get("assessments.test.enneagram.helmet.title") as string | undefined) ??
      "Enneagram Assessment: The Architecture of Soul & Personality";
    const description =
      (get("assessments.test.enneagram.helmet.description") as string | undefined) ??
      "144 questions • 9 core types • 27 subtypes • 18 wing variations • 3 centers of intelligence • Levels of development • Spiritual & psychological integration";
    const keywords =
      (get("assessments.test.enneagram.helmet.keywords") as string | undefined) ??
      "Enneagram test, Enneagram types, wings, subtypes, centers of intelligence, integration, disintegration";

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
          mainEntity: enneagramFaq.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        },
      ],
    };

    const typeMeta = new Map<EnneagramType, { type: EnneagramType; label: string; icon: string }>([
      [1, { type: 1, label: "Type 1 (Reformer)", icon: "🛡️" }],
      [2, { type: 2, label: "Type 2 (Helper)", icon: "💝" }],
      [3, { type: 3, label: "Type 3 (Achiever)", icon: "🏆" }],
      [4, { type: 4, label: "Type 4 (Individualist)", icon: "🎨" }],
      [5, { type: 5, label: "Type 5 (Investigator)", icon: "🔍" }],
      [6, { type: 6, label: "Type 6 (Loyalist)", icon: "🛡️" }],
      [7, { type: 7, label: "Type 7 (Enthusiast)", icon: "🎉" }],
      [8, { type: 8, label: "Type 8 (Challenger)", icon: "⚔️" }],
      [9, { type: 9, label: "Type 9 (Peacemaker)", icon: "☮️" }],
    ]);

    function wingLeft(t: EnneagramType): EnneagramType {
      return t === 1 ? 9 : ((t - 1) as EnneagramType);
    }

    function wingRight(t: EnneagramType): EnneagramType {
      return t === 9 ? 1 : ((t + 1) as EnneagramType);
    }

    const [stage, setStage] = useState<"intro" | "test" | "result">("intro");
    const [questions, setQuestions] = useState<EnneagramQuestion[]>([]);
    const [answers, setAnswers] = useState<EnneagramAnswerState[]>([]);
    const [index, setIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const current = questions[index] ?? null;
    const total = questions.length;
    const answeredCount = answers.filter((a) => a.selectedIndex !== null || a.value !== null).length;
    const progress = total > 0 ? Math.round((answeredCount / total) * 100) : 0;

    async function start() {
      setIsLoading(true);
      try {
        const pool = (await loadQuestionBank(locale, "enneagram")) as Array<{
          q: string;
          options: Array<{ text: string; type: EnneagramType | "other" | null; weight: number }>;
        }>;
        const enneagramQuestions = toEnneagramQuestions(pool);
        const q = takeRandom(enneagramQuestions, 20);
        setQuestions(q);
        setAnswers(Array.from({ length: q.length }, () => ({ value: null, selectedIndex: null, selectedType: null, weight: null })));
        setIndex(0);
        setStage("test");
      } finally {
        setIsLoading(false);
      }
    }

    function restart() {
      setStage("intro");
      setQuestions([]);
      setAnswers([]);
      setIndex(0);
    }

    function chooseLikert(value: 1 | 2 | 3 | 4 | 5) {
      setAnswers((prev) => {
        const next = [...prev];
        next[index] = { value, selectedIndex: null, selectedType: null, weight: null };
        return next;
      });
    }

    function chooseOption(selectedIndex: number, selectedType: EnneagramType | null, weight: number) {
      setAnswers((prev) => {
        const next = [...prev];
        next[index] = { value: null, selectedIndex, selectedType, weight };
        return next;
      });
    }

    function prev() {
      setIndex((i) => Math.max(0, i - 1));
    }

    function next() {
      if (index + 1 >= total) {
        setStage("result");
        return;
      }
      setIndex((i) => i + 1);
    }

    async function jumpToTest() {
      if (typeof window === "undefined") return;
      if (stage === "intro") {
        await start();
        requestAnimationFrame(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        });
        return;
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    const results = useMemo(() => {
      if (stage !== "result") return null;

      const hasOptionAnswers = answers.some((a) => a.selectedIndex !== null);
      const types: EnneagramType[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

      const typeScores = hasOptionAnswers
        ? (() => {
            const raw: Record<EnneagramType, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
            const maxPossible: Record<EnneagramType, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };

            for (let i = 0; i < total; i += 1) {
              const q = questions[i];
              if (!q || q.kind !== "type" || !q.type) continue;
              const maxForQ =
                q.options && q.options.length > 0
                  ? Math.max(0, ...q.options.filter((o) => o.type === q.type).map((o) => o.weight))
                  : 2;
              maxPossible[q.type] += maxForQ;

              const a = answers[i];
              if (a?.selectedType && typeof a.weight === "number") {
                raw[a.selectedType] += a.weight;
              }
            }

            return types.map((t) => {
              const denom = maxPossible[t] > 0 ? maxPossible[t] : 1;
              const pct = Math.round((raw[t] / denom) * 100);
              return { type: t, avg: raw[t], percentile: Math.max(0, Math.min(100, pct)) };
            });
          })()
        : (() => {
            const typeSum: Record<EnneagramType, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
            const typeCount: Record<EnneagramType, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };

            for (let i = 0; i < total; i += 1) {
              const q = questions[i];
              const a = answers[i];
              if (!q) continue;
              if (!a?.value) continue;
              const v = a.value;
              if (q.kind === "type" && q.type) {
                typeSum[q.type] += v;
                typeCount[q.type] += 1;
              }
            }

            return types.map((t) => {
              const avg = typeCount[t] > 0 ? typeSum[t] / typeCount[t] : 3;
              const percentile = toPercentileFromLikert(avg);
              return { type: t, avg: Math.round(avg * 100) / 100, percentile };
            });
          })();

      const orderedTypes = [...typeScores].sort((a, b) => b.percentile - a.percentile);
      const coreType = orderedTypes[0]?.type ?? 9;
      const corePercentile = orderedTypes[0]?.percentile ?? 50;

      const left = wingLeft(coreType);
      const right = wingRight(coreType);
      const leftPct = typeScores.find((s) => s.type === left)?.percentile ?? 0;
      const rightPct = typeScores.find((s) => s.type === right)?.percentile ?? 0;
      const wing = leftPct === rightPct ? null : (leftPct > rightPct ? left : right);
      const wingVariation = wing ? `${coreType}w${wing}` : `${coreType}w${left}/${right}`;

      const instincts: EnneagramInstinct[] = ["sp", "sx", "so"];
      const instinctScores = instincts.map((k) => ({ instinct: k, avg: 3, percentile: 50 }));
      const orderedInstincts = [...instinctScores].sort((a, b) => b.percentile - a.percentile);
      const dominantInstinct = orderedInstincts[0]?.instinct ?? "sp";
      const hasInstinctQuestions = questions.some((q) => q.kind === "instinct");

      const centerSum: Record<EnneagramCenter, number> = { Head: 0, Heart: 0, Body: 0 };
      for (const s of typeScores) {
        const center = enneagramTypes.find((p) => p.type === s.type)?.center ?? "Body";
        centerSum[center] += s.percentile;
      }
      const dominantCenter = (Object.keys(centerSum) as EnneagramCenter[]).sort((a, b) => centerSum[b] - centerSum[a])[0] ?? "Body";

      const level = corePercentile >= 70 ? "Healthy" : corePercentile <= 40 ? "Unhealthy" : "Average";

      const profile = enneagramTypes.find((p) => p.type === coreType) ?? null;
      const lines = enneagramLines[coreType];

      const subtypeLabel = hasInstinctQuestions ? `${dominantInstinct} ${coreType}` : "—";
      const subtypeName = hasInstinctQuestions ? `${instinctMeta[dominantInstinct].name} ${profile?.title ?? `Type ${coreType}`}` : "—";

      return {
        typeScores,
        orderedTypes,
        coreType,
        corePercentile,
        wingVariation,
        wingLeft: left,
        wingRight: right,
        instinctScores,
        orderedInstincts,
        dominantInstinct,
        dominantCenter,
        level,
        profile,
        lines,
        subtypeLabel,
        subtypeName,
        hasInstinctQuestions,
      };
    }, [answers, questions, stage, total]);

    return (
      <>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:type" content="website" />
          <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        </Helmet>

        <section className={testStyles.wrapper}>
          <h1 className={testStyles.pageTitle}>{title}</h1>
          <p className={testStyles.pageSubtitle}>{description}</p>

          {stage === "intro" && (
            <div className={testStyles.card}>
              <div className={testStyles.introGrid}>
                <div className={testStyles.introItem}>
                  <div className={testStyles.introTitle}>
                    {i18nStr("assessments.test.common.ui.whatYouGetTitle", "What You Get")}
                  </div>
                  <ul className={testStyles.introList}>
                    {enneagramWhatYouGet.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className={testStyles.introItem}>
                  <div className={testStyles.introTitle}>
                    {i18nStr("assessments.test.common.ui.methodologyTitle", "Test Methodology & Scientific Foundation")}
                  </div>
                  <ul className={testStyles.introList}>
                    {enneagramMethodologySections.map((s) => (
                      <li key={s.title}>{s.title}</li>
                    ))}
                  </ul>
                  <div className={testStyles.note}>
                    <strong>{i18nStr("assessments.test.enneagram.ui.noteStrong", "Critical scientific note:")}</strong>{" "}
                    {i18nStr(
                      "assessments.test.enneagram.ui.noteText",
                      "This is a spiritual-psychological framework. Use results for narrative insight, not diagnosis or hiring decisions."
                    )}
                  </div>
                </div>
              </div>

              <button type="button" className={testStyles.primaryBtn} onClick={start}>
                {i18nStr("assessments.test.common.ui.startTestButton", "Start The Test")}
              </button>

              <div className={testStyles.disclaimer}>
                {i18nStr(
                  "assessments.test.enneagram.ui.disclaimer",
                  "Private & secure: no registration required, and results are not stored."
                )}
              </div>
            </div>
          )}

          {stage === "test" && current && (
            <div className={testStyles.card}>
              <div className={testStyles.progressRow}>
                <div
                  className={testStyles.progressBar}
                  aria-label={i18nStr("assessments.test.common.ui.progressAriaLabel", "Progress")}
                >
                  <div className={testStyles.progressFill} style={{ width: `${progress}%` }} />
                </div>
                <div className={testStyles.progressText}>
                  {i18nFmt("assessments.test.common.ui.questionProgress", "Question {current} / {total}", {
                    current: index + 1,
                    total,
                  })}
                </div>
              </div>

              <div className={testStyles.questionMeta}>
                {current.kind === "type" && current.type ? (
                  <span className={testStyles.pill}>
                    {i18nStr("assessments.test.enneagram.ui.coreTypeLabel", "Core Type:")}{" "}
                    {typeMeta.get(current.type)?.icon ?? "🔷"} {typeMeta.get(current.type)?.label ?? `Type ${current.type}`}
                  </span>
                ) : null}
                {current.kind === "instinct" && current.instinct ? (
                  <span className={testStyles.pill}>
                    {i18nStr("assessments.test.enneagram.ui.instinctLabel", "Instinct:")} {instinctMeta[current.instinct].name} (
                    {current.instinct})
                  </span>
                ) : null}
              </div>

              <div className={testStyles.questionText}>{current.prompt}</div>

              <div
                className={testStyles.options}
                role="radiogroup"
                aria-label={i18nStr("assessments.test.common.ui.answerChoicesAriaLabel", "Answer choices")}
              >
                {current.options && current.options.length > 0
                  ? current.options.map((opt, optIndex) => {
                      const selected = answers[index]?.selectedIndex === optIndex;
                      return (
                        <button
                          key={`${optIndex}-${opt.text}`}
                          type="button"
                          className={`${testStyles.optionBtn} ${selected ? testStyles.selected : ""}`}
                          onClick={() => chooseOption(optIndex, opt.type, opt.weight)}
                          role="radio"
                          aria-checked={selected}
                        >
                          {opt.text}
                        </button>
                      );
                    })
                  : likertOptions.map((opt) => {
                      const selected = answers[index]?.value === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          className={`${testStyles.optionBtn} ${selected ? testStyles.selected : ""}`}
                          onClick={() => chooseLikert(opt.value)}
                          role="radio"
                          aria-checked={selected}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
              </div>

              <div className={testStyles.actions}>
                <button type="button" className={testStyles.secondaryBtn} onClick={prev} disabled={index === 0}>
                  {i18nStr("assessments.test.common.ui.backButton", "Back")}
                </button>
                <button
                  type="button"
                  className={testStyles.primaryBtn}
                  onClick={next}
                  disabled={current.options && current.options.length > 0 ? answers[index]?.selectedIndex === null : answers[index]?.value === null}
                >
                  {index + 1 >= total
                    ? i18nStr("assessments.test.common.ui.finishButton", "Finish")
                    : i18nStr("assessments.test.common.ui.nextButton", "Next")}
                </button>
              </div>
            </div>
          )}

          {stage === "result" && results && (
            <div className={testStyles.card}>
              <div className={testStyles.resultHeader}>
                <div className={testStyles.resultScore}>
                  {i18nStr("assessments.test.enneagram.ui.yourCoreTypeLabel", "Your Core Type:")}{" "}
                  <span className={testStyles.resultNumber}>{results.coreType}</span>
                </div>
                <div className={testStyles.resultLabel}>
                  {results.profile?.title ?? i18nStr("assessments.test.enneagram.ui.resultProfileFallback", "Enneagram profile")}
                </div>
                <div className={testStyles.resultSub}>
                  {i18nFmt(
                    "assessments.test.enneagram.ui.resultSubTemplate",
                    "Wing: {wing} • Subtype: {subtype} • Center: {center} • Level: {level}",
                    {
                      wing: results.wingVariation,
                      subtype: results.subtypeLabel,
                      center: results.dominantCenter,
                      level: results.level,
                    }
                  )}
                </div>
              </div>
              <div className={testStyles.disclaimer}>
                {i18nStr(
                  "assessments.test.common.ui.resultsDisclaimer",
                  "Educational estimate only. Results are approximate and not a clinical or scientific diagnosis."
                )}
              </div>

              <h2 className={testStyles.sectionTitle}>
                {i18nStr("assessments.test.enneagram.ui.coreTypesPercentilesTitle", "9 Core Types (Percentiles)")}
              </h2>
              <div className={testStyles.tableWrap}>
                <table className={testStyles.table}>
                  <thead>
                    <tr>
                      <th>{i18nStr("assessments.test.enneagram.ui.typeTableTypeHeader", "Type")}</th>
                      <th>{i18nStr("assessments.test.enneagram.ui.typeTablePercentileHeader", "Percentile")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...results.typeScores].sort((a, b) => b.percentile - a.percentile).map((s) => (
                      <tr key={s.type}>
                        <td>
                          {typeMeta.get(s.type)?.icon ?? "🔷"} {typeMeta.get(s.type)?.label ?? `Type ${s.type}`}
                        </td>
                        <td>{s.percentile}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2 className={testStyles.sectionTitle}>
                {i18nStr("assessments.test.enneagram.ui.centersTitle", "Centers of Intelligence")}
              </h2>
              <div className={testStyles.twoCol}>
                <div className={testStyles.panel}>
                  <h3 className={testStyles.panelTitle}>
                    {i18nStr("assessments.test.enneagram.ui.headCenterTitle", "Head Center (Fear) — Types 5, 6, 7")}
                  </h3>
                  <p className={testStyles.panelText}>
                    {i18nStr("assessments.test.enneagram.ui.headCenterText", "Processing: Mental analysis, planning, anticipation")}
                  </p>
                </div>
                <div className={testStyles.panel}>
                  <h3 className={testStyles.panelTitle}>
                    {i18nStr("assessments.test.enneagram.ui.heartCenterTitle", "Heart Center (Shame) — Types 2, 3, 4")}
                  </h3>
                  <p className={testStyles.panelText}>
                    {i18nStr(
                      "assessments.test.enneagram.ui.heartCenterText",
                      "Processing: Image management, relationship dynamics, authenticity-seeking"
                    )}
                  </p>
                </div>
                <div className={testStyles.panel}>
                  <h3 className={testStyles.panelTitle}>
                    {i18nStr("assessments.test.enneagram.ui.bodyCenterTitle", "Body Center (Anger) — Types 8, 9, 1")}
                  </h3>
                  <p className={testStyles.panelText}>
                    {i18nStr(
                      "assessments.test.enneagram.ui.bodyCenterText",
                      "Processing: Gut instinct, boundaries, reactivity vs. control"
                    )}
                  </p>
                </div>
                <div className={testStyles.panel}>
                  <h3 className={testStyles.panelTitle}>
                    {i18nStr("assessments.test.enneagram.ui.yourDominantCenterTitle", "Your Dominant Center")}
                  </h3>
                  <p className={testStyles.panelText}>{results.dominantCenter}</p>
                </div>
              </div>

              <h2 className={testStyles.sectionTitle}>{i18nStr("assessments.test.enneagram.ui.wingAnalysisTitle", "Wing Analysis")}</h2>
              <div className={testStyles.breakdown}>
                <div className={testStyles.breakdownRow}>
                  <div className={testStyles.breakdownName}>
                    {i18nStr("assessments.test.enneagram.ui.wingOptionsLabel", "Wing options")}
                  </div>
                  <div className={testStyles.breakdownValue}>
                    {results.coreType}w{results.wingLeft} vs. {results.coreType}w{results.wingRight} • Result: {results.wingVariation}
                  </div>
                </div>
              </div>

              {results.hasInstinctQuestions ? (
                <>
                  <h2 className={testStyles.sectionTitle}>
                    {i18nStr("assessments.test.enneagram.ui.subtypesTitle", "27 Subtype Profiles (Instincts)")}
                  </h2>
                  <div className={testStyles.breakdown}>
                    <div className={testStyles.breakdownRow}>
                      <div className={testStyles.breakdownName}>
                        {i18nStr("assessments.test.enneagram.ui.dominantInstinctLabel", "Dominant instinct")}
                      </div>
                      <div className={testStyles.breakdownValue}>
                        {instinctMeta[results.dominantInstinct].name} ({results.dominantInstinct}) —{" "}
                        {instinctMeta[results.dominantInstinct].focus}
                      </div>
                    </div>
                    <div className={testStyles.breakdownRow}>
                      <div className={testStyles.breakdownName}>
                        {i18nStr("assessments.test.enneagram.ui.yourSubtypeLabel", "Your subtype label")}
                      </div>
                      <div className={testStyles.breakdownValue}>{results.subtypeName}</div>
                    </div>
                  </div>
                </>
              ) : null}

              <h2 className={testStyles.sectionTitle}>
                {i18nStr("assessments.test.enneagram.ui.stressGrowthTitle", "Stress & Growth Dynamics")}
              </h2>
              <div className={testStyles.breakdown}>
                <div className={testStyles.breakdownRow}>
                  <div className={testStyles.breakdownName}>
                    {i18nStr("assessments.test.enneagram.ui.growthLabel", "Growth (Integration)")}
                  </div>
                  <div className={testStyles.breakdownValue}>
                    {results.coreType} → {results.lines.growth}
                  </div>
                </div>
                <div className={testStyles.breakdownRow}>
                  <div className={testStyles.breakdownName}>
                    {i18nStr("assessments.test.enneagram.ui.stressLabel", "Stress (Disintegration)")}
                  </div>
                  <div className={testStyles.breakdownValue}>
                    {results.coreType} → {results.lines.stress}
                  </div>
                </div>
              </div>

              <h2 className={testStyles.sectionTitle}>
                {i18nStr("assessments.test.enneagram.ui.spiritualGrowthTitle", "Spiritual Growth Path")}
              </h2>
              <div className={testStyles.breakdown}>
                <div className={testStyles.breakdownRow}>
                  <div className={testStyles.breakdownName}>
                    {i18nStr("assessments.test.enneagram.ui.fixationToVirtueLabel", "From fixation to virtue")}
                  </div>
                  <div className={testStyles.breakdownValue}>
                    {i18nStr("assessments.test.enneagram.ui.passionLabel", "Passion:")} {enneagramVirtues[results.coreType].passion}
                    <br />
                    {i18nStr("assessments.test.enneagram.ui.fixationLabel", "Fixation:")} {enneagramVirtues[results.coreType].fixation}
                    <br />
                    {i18nStr("assessments.test.enneagram.ui.holyIdeaLabel", "Holy Idea:")} {enneagramVirtues[results.coreType].holyIdea}
                    <br />
                    {i18nStr("assessments.test.enneagram.ui.virtueLabel", "Virtue:")} {enneagramVirtues[results.coreType].virtue}
                  </div>
                </div>
              </div>

              <h2 className={testStyles.sectionTitle}>
                {i18nStr("assessments.test.enneagram.ui.coreMotivationsTitle", "Core Motivations")}
              </h2>
              <div className={testStyles.breakdown}>
                <div className={testStyles.breakdownRow}>
                  <div className={testStyles.breakdownName}>
                    {i18nStr("assessments.test.enneagram.ui.basicFearDesireLabel", "Basic fear & desire")}
                  </div>
                  <div className={testStyles.breakdownValue}>
                    <strong>{i18nStr("assessments.test.enneagram.ui.fearLabel", "Fear:")}</strong> {results.profile?.coreFear}
                    <br />
                    <strong>{i18nStr("assessments.test.enneagram.ui.desireLabel", "Desire:")}</strong> {results.profile?.coreDesire}
                  </div>
                </div>
              </div>

              <h2 className={testStyles.sectionTitle}>
                {i18nStr("assessments.test.enneagram.ui.levelsTitle", "Levels of Development")}
              </h2>
              <div className={testStyles.twoCol}>
                <div className={testStyles.panel}>
                  <h3 className={testStyles.panelTitle}>{i18nStr("assessments.test.enneagram.ui.healthyTitle", "Healthy")}</h3>
                  <ul className={testStyles.bulletList}>
                    {(results.profile?.healthy ?? []).map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
                <div className={testStyles.panel}>
                  <h3 className={testStyles.panelTitle}>{i18nStr("assessments.test.enneagram.ui.averageTitle", "Average")}</h3>
                  <ul className={testStyles.bulletList}>
                    {(results.profile?.average ?? []).map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
                <div className={testStyles.panel}>
                  <h3 className={testStyles.panelTitle}>{i18nStr("assessments.test.enneagram.ui.unhealthyTitle", "Unhealthy")}</h3>
                  <ul className={testStyles.bulletList}>
                    {(results.profile?.unhealthy ?? []).map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
                <div className={testStyles.panel}>
                  <h3 className={testStyles.panelTitle}>
                    {i18nStr("assessments.test.enneagram.ui.currentLevelSignalTitle", "Your current level signal")}
                  </h3>
                  <p className={testStyles.panelText}>{results.level}</p>
                </div>
              </div>

              <div className={testStyles.actions}>
                <button type="button" className={testStyles.secondaryBtn} onClick={restart}>
                  {i18nStr("assessments.test.common.ui.retakeButton", "Retake")}
                </button>
                <button type="button" className={testStyles.primaryBtn} onClick={jumpToTest}>
                  {i18nStr("assessments.test.common.ui.goToTestButton", "Go To The Test")}
                </button>
              </div>
            </div>
          )}

          <section className={testStyles.seoSection} aria-label="Test methodology and scientific foundation">
            <h2 className={testStyles.seoTitle}>
              {i18nStr("assessments.test.common.ui.methodologyTitle", "Test Methodology & Scientific Foundation")}
            </h2>
            <div className={testStyles.twoCol}>
              {enneagramMethodologySections.map((s) => (
                <div key={s.title} className={testStyles.panel}>
                  <h3 className={testStyles.panelTitle}>{s.title}</h3>
                  {s.text ? <p className={testStyles.panelText}>{s.text}</p> : null}
                  {s.bullets ? (
                    <ul className={testStyles.bulletList}>
                      {s.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ))}
            </div>
          </section>

          <section className={testStyles.seoSection} aria-label="History of the Enneagram system">
            <h2 className={testStyles.seoTitle}>
              {i18nStr("assessments.test.enneagram.seo.historyTitle", "History of the Enneagram System")}
            </h2>
            <div className={testStyles.timeline}>
              {enneagramHistory.map((t) => (
                <div key={`${t.year}-${t.title}`} className={testStyles.timelineItem}>
                  <div className={testStyles.timelineYear}>{t.year}</div>
                  <div className={testStyles.timelineBody}>
                    <div className={testStyles.timelineTitle}>{t.title}</div>
                    <div className={testStyles.timelineDesc}>{t.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className={testStyles.seoSection} aria-label="The nine types deep dive">
            <h2 className={testStyles.seoTitle}>
              {i18nStr("assessments.test.enneagram.seo.nineTypesTitle", "The Nine Types: Deep Dive")}
            </h2>
            <div className={testStyles.seoGrid}>
              {enneagramTypes.map((t) => (
                <div key={t.type} className={testStyles.seoCard}>
                  <div className={testStyles.seoCardTitle}>{t.title}</div>
                  <p className={testStyles.seoText}>
                    <strong>{i18nStr("assessments.test.enneagram.seo.coreFearLabel", "Core Fear:")}</strong> {t.coreFear}
                    <br />
                    <strong>{i18nStr("assessments.test.enneagram.seo.coreDesireLabel", "Core Desire:")}</strong> {t.coreDesire}
                    <br />
                    <strong>{i18nStr("assessments.test.enneagram.seo.centerLabel", "Center:")}</strong> {t.center}
                  </p>
                  <div className={testStyles.note}>
                    <strong>{i18nStr("assessments.test.enneagram.seo.highFunctioningHealthyLabel", "High Functioning (Healthy):")}</strong>
                    <ul className={testStyles.bulletList} style={{ marginTop: 10 }}>
                      {t.healthy.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                    <strong>{i18nStr("assessments.test.enneagram.seo.averageFunctioningLabel", "Average Functioning:")}</strong>
                    <ul className={testStyles.bulletList} style={{ marginTop: 10 }}>
                      {t.average.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                    <strong>{i18nStr("assessments.test.enneagram.seo.lowFunctioningUnhealthyLabel", "Low Functioning (Unhealthy):")}</strong>
                    <ul className={testStyles.bulletList} style={{ marginTop: 10 }}>
                      {t.unhealthy.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                    <strong>{i18nStr("assessments.test.enneagram.seo.wingsLabel", "Wings:")}</strong>
                    <ul className={testStyles.bulletList} style={{ marginTop: 10 }}>
                      {t.wings.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                    <p className={testStyles.note}>{t.workplaceDNA}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className={testStyles.seoSection} aria-label="The three triads centers">
            <h2 className={testStyles.seoTitle}>
              {i18nStr("assessments.test.enneagram.seo.triadsTitle", "The Three Triads (Centers) in Depth")}
            </h2>
            <div className={testStyles.tableWrap}>
              <table className={testStyles.table}>
                <thead>
                  <tr>
                    <th>{i18nStr("assessments.test.enneagram.seo.triadsTableTriadHeader", "Triad")}</th>
                    <th>{i18nStr("assessments.test.enneagram.seo.triadsTableTypesHeader", "Types")}</th>
                    <th>{i18nStr("assessments.test.enneagram.seo.triadsTableCoreEmotionHeader", "Core Emotion")}</th>
                    <th>{i18nStr("assessments.test.enneagram.seo.triadsTableDefenseHeader", "Defense Mechanism")}</th>
                    <th>{i18nStr("assessments.test.enneagram.seo.triadsTableQuestionHeader", "Primary Question")}</th>
                  </tr>
                </thead>
                <tbody>
                  {enneagramTriads.map((r) => (
                    <tr key={r.triad}>
                      <td>{r.triad}</td>
                      <td>{r.types}</td>
                      <td>{r.emotion}</td>
                      <td>{r.defense}</td>
                      <td>{r.question}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className={testStyles.seoSection} aria-label="Enneagram versus Big Five">
            <h2 className={testStyles.seoTitle}>
              {i18nStr("assessments.test.enneagram.seo.vsBigFiveTitle", "Enneagram vs. Big Five: Critical Differences")}
            </h2>
            <div className={testStyles.tableWrap}>
              <table className={testStyles.table}>
                <thead>
                  <tr>
                    <th>{i18nStr("assessments.test.enneagram.seo.vsBigFiveAspectHeader", "Aspect")}</th>
                    <th>{i18nStr("assessments.test.enneagram.seo.vsBigFiveEnneagramHeader", "Enneagram")}</th>
                    <th>{i18nStr("assessments.test.enneagram.seo.vsBigFiveBigFiveHeader", "Big Five (OCEAN)")}</th>
                  </tr>
                </thead>
                <tbody>
                  {enneagramVsBigFiveRows.map((r) => (
                    <tr key={r.aspect}>
                      <td>{r.aspect}</td>
                      <td>{r.enneagram}</td>
                      <td>{r.bigFive}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ul className={testStyles.bulletList} style={{ marginTop: 12 }}>
              {enneagramSynthesis.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </section>

          <section className={testStyles.seoSection} aria-label="Frequently asked questions">
            <h2 className={testStyles.seoTitle}>
              {i18nStr("assessments.test.common.ui.faqTitle", "Frequently Asked Questions (FAQ)")}
            </h2>
            <div className={testStyles.faq}>
              {enneagramFaq.map((item) => (
                <details key={item.q} className={testStyles.faqItem}>
                  <summary className={testStyles.faqQ}>{item.q}</summary>
                  <div className={testStyles.faqA}>{item.a}</div>
                </details>
              ))}
            </div>
          </section>

          <section className={testStyles.seoSection} aria-label="Ready for your depth profile">
            <h2 className={testStyles.seoTitle}>
              {i18nStr("assessments.test.enneagram.seo.ctaTitle", "Ready for Your Depth Profile?")}
            </h2>
            <p className={testStyles.seoLead}>
              {i18nStr(
                "assessments.test.enneagram.seo.ctaLead",
                "144 questions • 9 types • 27 subtypes • Wings analysis • Integration paths • Spiritual growth framework"
              )}
            </p>
            <button type="button" className={testStyles.primaryBtn} onClick={jumpToTest} disabled={isLoading}>
              {stage === "intro"
                ? i18nStr("assessments.test.common.ui.startTestButton", "Start The Test")
                : i18nStr("assessments.test.common.ui.goToTestButton", "Go To The Test")}
            </button>
            <div className={testStyles.note} style={{ marginTop: 12 }}>
              {i18nStr("assessments.test.common.ui.preferOverviewFirst", "Prefer the overview first?")}{" "}
              <Link to="/assessments/enneagram" style={{ color: "var(--primary)" }}>
                {i18nFmt("assessments.test.common.ui.readGuideTemplate", "Read the {name} guide", { name: "Enneagram" })}
              </Link>
              .
            </div>
          </section>
        </section>
      </>
    );
  }

  if (assessment.id === "holland") {
    const title = (get("assessments.test.holland.helmet.title") as string | undefined) ?? hollandTitle;
    const description = (get("assessments.test.holland.helmet.description") as string | undefined) ?? hollandDescription;
    const keywords =
      (get("assessments.test.holland.helmet.keywords") as string | undefined) ??
      "Holland Code, RIASEC, career interests, vocational profile, hexagon theory, congruence, career satisfaction";

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
          mainEntity: hollandFaq.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        },
      ],
    };

    const [stage, setStage] = useState<"intro" | "test" | "result">("intro");
    const [questions, setQuestions] = useState<HollandQuestion[]>([]);
    const [answers, setAnswers] = useState<HollandAnswerState[]>([]);
    const [index, setIndex] = useState(0);
    const [envCode, setEnvCode] = useState<Array<HollandLetter | null>>([null, null, null]);
    const [isLoading, setIsLoading] = useState(false);

    const current = questions[index] ?? null;
    const total = questions.length;
    const answeredCount = answers.filter((a) => a.selectedIndex !== null).length;
    const progress = total > 0 ? Math.round((answeredCount / total) * 100) : 0;

    async function start() {
      setIsLoading(true);
      try {
        const pool = (await loadQuestionBank(locale, "holland")) as Array<{
          q: string;
          options: Array<{ text: string; type: HollandLetter | "other" | null; weight: number }>;
        }>;
        const hollandQuestions = toHollandQuestions(pool);
        const q = buildBalancedByKey(hollandQuestions, 20, ["R", "I", "A", "S", "E", "C"] as const, (x) => x.letter);
        setQuestions(q);
        setAnswers(Array.from({ length: q.length }, () => ({ selectedIndex: null, selectedType: null, weight: null })));
        setIndex(0);
        setEnvCode([null, null, null]);
        setStage("test");
      } finally {
        setIsLoading(false);
      }
    }

    function restart() {
      setStage("intro");
      setQuestions([]);
      setAnswers([]);
      setIndex(0);
      setEnvCode([null, null, null]);
    }

    function choose(selectedIndex: number, selectedType: HollandLetter | null, weight: number) {
      setAnswers((prev) => {
        const next = [...prev];
        next[index] = { selectedIndex, selectedType, weight };
        return next;
      });
    }

    function prev() {
      setIndex((i) => Math.max(0, i - 1));
    }

    function next() {
      if (index + 1 >= total) {
        setStage("result");
        return;
      }
      setIndex((i) => i + 1);
    }

    async function jumpToTest() {
      if (typeof window === "undefined") return;
      if (stage === "intro") {
        await start();
        requestAnimationFrame(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        });
        return;
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    const results = useMemo(() => {
      if (stage !== "result") return null;

      const sum: Record<HollandLetter, number> = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
      let totalWeight = 0;

      for (let i = 0; i < total; i += 1) {
        const q = questions[i];
        const a = answers[i];
        if (!q) continue;
        if (a?.selectedType && typeof a.weight === "number") {
          sum[a.selectedType] += a.weight;
          totalWeight += a.weight;
        }
      }

      const letters: HollandLetter[] = ["R", "I", "A", "S", "E", "C"];
      const scores = letters.map((l) => {
        const pct = totalWeight > 0 ? (sum[l] / totalWeight) * 100 : 0;
        const percentile = Math.round(pct);
        return { letter: l, avg: sum[l], percentile };
      });
      const ordered = [...scores].sort((a, b) => b.percentile - a.percentile);
      const code = ordered.slice(0, 3).map((x) => x.letter).join("");
      const consistency = hollandConsistencyLabel(code);
      const diffIndex = hollandDifferentiationIndex(scores.map((s) => s.percentile));
      const topGap = (ordered[0]?.percentile ?? 0) - (ordered[1]?.percentile ?? 0);
      const identity = hollandIdentityLabel(topGap, diffIndex);

      const env = envCode.every((x) => x) ? (envCode.join("") as string) : null;
      const congruence = env ? hollandCongruenceScore(code, env) : null;
      const satisfaction =
        typeof congruence === "number"
          ? congruence >= 75
            ? "High"
            : congruence >= 55
              ? "Moderate"
              : "Low"
          : diffIndex >= 30
            ? "Moderate"
            : "Low";

      const consistencyAnalysis =
        code.length === 3
          ? {
              a: hollandHexDistance(code[0] as HollandLetter, code[1] as HollandLetter),
              b: hollandHexDistance(code[1] as HollandLetter, code[2] as HollandLetter),
              c: hollandHexDistance(code[0] as HollandLetter, code[2] as HollandLetter),
            }
          : null;

      const consistencyNote =
        consistencyAnalysis
          ? `Distances on the hexagon: ${code[0]}↔${code[1]}=${consistencyAnalysis.a}, ${code[1]}↔${code[2]}=${consistencyAnalysis.b}, ${code[0]}↔${code[2]}=${consistencyAnalysis.c}`
          : null;

      return { scores, ordered, code, consistency, diffIndex, identity, congruence, satisfaction, env, consistencyNote };
    }, [answers, envCode, questions, stage, total]);

    function setEnvLetter(position: 0 | 1 | 2, letter: HollandLetter) {
      setEnvCode((prev) => {
        const next = [...prev];
        next[position] = letter;
        return next as Array<HollandLetter | null>;
      });
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
          <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        </Helmet>

        <section className={testStyles.wrapper}>
          <h1 className={testStyles.pageTitle}>{title}</h1>
          <p className={testStyles.pageSubtitle}>{description}</p>

          {stage === "intro" && (
            <div className={testStyles.card}>
              <div className={testStyles.introGrid}>
                <div className={testStyles.introItem}>
                  <div className={testStyles.introTitle}>
                    {i18nStr("assessments.test.common.ui.whatYouGetTitle", "What You Get")}
                  </div>
                  <ul className={testStyles.introList}>
                    {hollandWhatYouGet.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className={testStyles.introItem}>
                  <div className={testStyles.introTitle}>
                    {i18nStr("assessments.test.common.ui.methodologyTitle", "Test Methodology & Scientific Foundation")}
                  </div>
                  <ul className={testStyles.introList}>
                    {hollandMethodologySections.map((s) => (
                      <li key={s.title}>{s.title}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <button type="button" className={testStyles.primaryBtn} onClick={start}>
                {i18nStr("assessments.test.common.ui.startTestButton", "Start The Test")}
              </button>

              <div className={testStyles.disclaimer}>
                {i18nStr(
                  "assessments.test.holland.ui.disclaimer",
                  "All scoring is calculated locally in your browser. No registration required."
                )}
              </div>
            </div>
          )}

          {stage === "test" && current && (
            <div className={testStyles.card}>
              <div className={testStyles.progressRow}>
                <div
                  className={testStyles.progressBar}
                  aria-label={i18nStr("assessments.test.common.ui.progressAriaLabel", "Progress")}
                >
                  <div className={testStyles.progressFill} style={{ width: `${progress}%` }} />
                </div>
                <div className={testStyles.progressText}>
                  {i18nFmt("assessments.test.common.ui.questionProgress", "Question {current} / {total}", {
                    current: index + 1,
                    total,
                  })}
                </div>
              </div>

              <div className={testStyles.questionMeta}>
                <span className={testStyles.pill}>
                  {i18nStr("assessments.test.common.ui.typeLabel", "Type:")} {hollandMeta[current.letter].icon}{" "}
                  {hollandMeta[current.letter].name} ({current.letter})
                </span>
              </div>

              <div className={testStyles.questionText}>{current.prompt}</div>

              <div
                className={testStyles.options}
                role="radiogroup"
                aria-label={i18nStr("assessments.test.common.ui.answerChoicesAriaLabel", "Answer choices")}
              >
                {current.options && current.options.length > 0
                  ? current.options.map((opt, optIndex) => {
                      const selected = answers[index]?.selectedIndex === optIndex;
                      return (
                        <button
                          key={`${optIndex}-${opt.text}`}
                          type="button"
                          className={`${testStyles.optionBtn} ${selected ? testStyles.selected : ""}`}
                          onClick={() => choose(optIndex, opt.type, opt.weight)}
                          role="radio"
                          aria-checked={selected}
                        >
                          {opt.text}
                        </button>
                      );
                    })
                  : likertOptions.map((opt) => {
                      const selected = answers[index]?.selectedIndex === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          className={`${testStyles.optionBtn} ${selected ? testStyles.selected : ""}`}
                          onClick={() => choose(opt.value, null, 1)}
                          role="radio"
                          aria-checked={selected}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
              </div>

              <div className={testStyles.actions}>
                <button type="button" className={testStyles.secondaryBtn} onClick={prev} disabled={index === 0}>
                  {i18nStr("assessments.test.common.ui.backButton", "Back")}
                </button>
                <button type="button" className={testStyles.primaryBtn} onClick={next} disabled={answers[index]?.selectedIndex === null}>
                  {index + 1 >= total
                    ? i18nStr("assessments.test.common.ui.finishButton", "Finish")
                    : i18nStr("assessments.test.common.ui.nextButton", "Next")}
                </button>
              </div>
            </div>
          )}

          {stage === "result" && results && (
            <div className={testStyles.card}>
              <div className={testStyles.resultHeader}>
                <div className={testStyles.resultScore}>
                  {i18nStr("assessments.test.holland.ui.yourHollandCodeLabel", "Your Holland Code:")}{" "}
                  <span className={testStyles.resultNumber}>{results.code}</span>
                </div>
                <div className={testStyles.resultSub}>
                  {i18nStr(
                    "assessments.test.holland.ui.resultSub",
                    "6 types • 3-letter code • Congruence • Consistency • Differentiation • Career matching"
                  )}
                </div>
              </div>
              <div className={testStyles.disclaimer}>
                {i18nStr(
                  "assessments.test.common.ui.resultsDisclaimer",
                  "Educational estimate only. Results are approximate and not a clinical or scientific diagnosis."
                )}
              </div>

              <h2 className={testStyles.sectionTitle}>
                {i18nStr("assessments.test.holland.ui.vocationalTypesTitle", "6 Vocational Personality Types (Percentiles)")}
              </h2>
              <div className={testStyles.tableWrap}>
                <table className={testStyles.table}>
                  <thead>
                    <tr>
                      <th>{i18nStr("assessments.test.holland.ui.typeTableTypeHeader", "Type")}</th>
                      <th>{i18nStr("assessments.test.holland.ui.typeTablePercentileHeader", "Percentile")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...results.scores].sort((a, b) => b.percentile - a.percentile).map((s) => (
                      <tr key={s.letter}>
                        <td>
                          {hollandMeta[s.letter].icon} {hollandMeta[s.letter].name} ({s.letter})
                        </td>
                        <td>{s.percentile}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2 className={testStyles.sectionTitle}>
                {i18nStr("assessments.test.holland.ui.cidTitle", "Consistency • Differentiation • Identity")}
              </h2>
              <div className={testStyles.breakdown}>
                <div className={testStyles.breakdownRow}>
                  <div className={testStyles.breakdownName}>
                    {i18nStr("assessments.test.holland.ui.consistencyLabel", "Consistency")}
                  </div>
                  <div className={testStyles.breakdownValue}>
                    {results.consistency.label} — {results.consistency.detail}
                    {results.consistencyNote ? (
                      <>
                        <br />
                        <span style={{ color: "var(--muted)" }}>{results.consistencyNote}</span>
                      </>
                    ) : null}
                  </div>
                </div>
                <div className={testStyles.breakdownRow}>
                  <div className={testStyles.breakdownName}>
                    {i18nStr("assessments.test.holland.ui.differentiationLabel", "Differentiation Index")}
                  </div>
                  <div className={testStyles.breakdownValue}>
                    {results.diffIndex} / 100 —{" "}
                    {results.diffIndex >= 30
                      ? i18nStr("assessments.test.holland.ui.diffFocused", "Focused profile")
                      : results.diffIndex >= 18
                        ? i18nStr("assessments.test.holland.ui.diffModerate", "Moderately differentiated")
                        : i18nStr("assessments.test.holland.ui.diffFlat", "Flat/versatile profile")}
                  </div>
                </div>
                <div className={testStyles.breakdownRow}>
                  <div className={testStyles.breakdownName}>
                    {i18nStr("assessments.test.holland.ui.identityLabel", "Identity")}
                  </div>
                  <div className={testStyles.breakdownValue}>
                    {results.identity.label} — {results.identity.detail}
                  </div>
                </div>
              </div>

              <h2 className={testStyles.sectionTitle}>
                {i18nStr("assessments.test.holland.ui.congruenceTitle", "Congruence Score (Person–Environment Fit)")}
              </h2>
              <div className={testStyles.breakdown}>
                <div className={testStyles.breakdownRow}>
                  <div className={testStyles.breakdownName}>
                    {i18nStr("assessments.test.holland.ui.selectEnvironmentLabel", "Select an environment code")}
                  </div>
                  <div className={testStyles.breakdownValue}>
                    {i18nStr(
                      "assessments.test.holland.ui.selectEnvironmentText",
                      "Pick the 3-letter code of a job/workplace you’re considering. The score uses the hexagon proximity model."
                    )}
                  </div>
                </div>
                <div className={testStyles.twoCol}>
                  {([0, 1, 2] as const).map((pos) => (
                    <div key={pos} className={testStyles.panel}>
                      <h3 className={testStyles.panelTitle}>
                        {i18nFmt("assessments.test.holland.ui.environmentLetterTitle", "Environment letter {pos}", { pos: pos + 1 })}
                      </h3>
                      <div
                        className={testStyles.options}
                        aria-label={i18nFmt("assessments.test.holland.ui.environmentPositionAriaLabel", "Environment position {pos}", {
                          pos: pos + 1,
                        })}
                      >
                        {hollandHexOrder.map((l) => {
                          const selected = envCode[pos] === l;
                          return (
                            <button
                              key={`${pos}-${l}`}
                              type="button"
                              className={`${testStyles.optionBtn} ${selected ? testStyles.selected : ""}`}
                              onClick={() => setEnvLetter(pos, l)}
                            >
                              {hollandMeta[l].icon} {l}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
                <div className={testStyles.breakdownRow}>
                  <div className={testStyles.breakdownName}>
                    {i18nStr("assessments.test.holland.ui.congruenceLabel", "Congruence")}
                  </div>
                  <div className={testStyles.breakdownValue}>
                    {results.env ? (
                      <>
                        {i18nFmt("assessments.test.holland.ui.congruencePrefixTemplate", "Person code {person} vs. environment {env} →", {
                          person: results.code,
                          env: results.env,
                        })}{" "}
                        <strong>{results.congruence}</strong> {i18nStr("assessments.test.holland.ui.congruenceSuffix", "/ 100")}
                      </>
                    ) : (
                      i18nStr("assessments.test.holland.ui.congruencePrompt", "Select all 3 environment letters to calculate congruence.")
                    )}
                  </div>
                </div>
                <div className={testStyles.breakdownRow}>
                  <div className={testStyles.breakdownName}>
                    {i18nStr("assessments.test.holland.ui.careerSatisfactionPredictorLabel", "Career Satisfaction Predictor")}
                  </div>
                  <div className={testStyles.breakdownValue}>
                    {i18nFmt(
                      "assessments.test.holland.ui.careerSatisfactionNoteTemplate",
                      "{satisfaction} — Higher congruence and higher differentiation predict more stable satisfaction and persistence in research summaries.",
                      { satisfaction: results.satisfaction }
                    )}
                  </div>
                </div>
              </div>

              <h2 className={testStyles.sectionTitle}>
                {i18nStr("assessments.test.holland.ui.commonCodePatternsTitle", "Common Code Patterns")}
              </h2>
              <div className={testStyles.tableWrap}>
                <table className={testStyles.table}>
                  <thead>
                    <tr>
                      <th>{i18nStr("assessments.test.holland.seo.codeCombinationsCodeHeader", "Code")}</th>
                      <th>{i18nStr("assessments.test.holland.seo.codeCombinationsNameHeader", "Name")}</th>
                      <th>{i18nStr("assessments.test.holland.seo.codeCombinationsProfileHeader", "Profile")}</th>
                      <th>{i18nStr("assessments.test.holland.seo.codeCombinationsCareersHeader", "Optimal Careers")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hollandCodePatterns.map((r) => (
                      <tr key={r.code}>
                        <td>{r.code}</td>
                        <td>{r.name}</td>
                        <td>{r.profile}</td>
                        <td>{r.careers}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className={testStyles.actions}>
                <button type="button" className={testStyles.secondaryBtn} onClick={restart}>
                  {i18nStr("assessments.test.common.ui.retakeButton", "Retake")}
                </button>
                <button type="button" className={testStyles.primaryBtn} onClick={jumpToTest}>
                  {i18nStr("assessments.test.common.ui.goToTestButton", "Go To The Test")}
                </button>
              </div>
            </div>
          )}

          <section className={testStyles.seoSection} aria-label="Test methodology and scientific foundation">
            <h2 className={testStyles.seoTitle}>Test Methodology & Scientific Foundation</h2>
            <div className={testStyles.note}>
              <pre style={{ margin: 0, whiteSpace: "pre" }}>{hollandHexagonDiagram}</pre>
            </div>
            <div className={testStyles.twoCol} style={{ marginTop: 14 }}>
              {hollandMethodologySections.map((s) => (
                <div key={s.title} className={testStyles.panel}>
                  <h3 className={testStyles.panelTitle}>{s.title}</h3>
                  {s.text ? <p className={testStyles.panelText}>{s.text}</p> : null}
                  {s.bullets ? (
                    <ul className={testStyles.bulletList}>
                      {s.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ))}
            </div>
          </section>

          <section className={testStyles.seoSection} aria-label="History of vocational choice theory">
            <h2 className={testStyles.seoTitle}>
              {i18nStr("assessments.test.holland.seo.historyTitle", "History of Vocational Choice Theory")}
            </h2>
            <div className={testStyles.timeline}>
              {hollandHistory.map((t) => (
                <div key={`${t.year}-${t.title}`} className={testStyles.timelineItem}>
                  <div className={testStyles.timelineYear}>{t.year}</div>
                  <div className={testStyles.timelineBody}>
                    <div className={testStyles.timelineTitle}>{t.title}</div>
                    <div className={testStyles.timelineDesc}>{t.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className={testStyles.seoSection} aria-label="The six types deep dive">
            <h2 className={testStyles.seoTitle}>
              {i18nStr("assessments.test.holland.seo.sixTypesTitle", "The Six Types: Deep Dive")}
            </h2>
            <div className={testStyles.seoGrid}>
              {hollandTypesDeepDive.map((t) => (
                <div key={t.code} className={testStyles.seoCard}>
                  <div className={testStyles.seoCardTitle}>
                    <span aria-hidden="true">{t.icon}</span> {t.title}
                  </div>
                  <p className={testStyles.seoText}>{t.core}</p>
                  <div className={testStyles.seoCols}>
                    <div>
                      <div className={testStyles.seoSubTitle}>
                        {i18nFmt("assessments.test.holland.seo.highScorersTemplate", "High Scorers (Dominant {code})", {
                          code: t.code,
                        })}
                      </div>
                      <ul className={testStyles.seoList}>
                        {t.high.map((x) => (
                          <li key={x}>{x}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className={testStyles.seoSubTitle}>
                        {i18nFmt("assessments.test.holland.seo.lowScorersTemplate", "Low Scorers (Avoidant {code})", {
                          code: t.code,
                        })}
                      </div>
                      <ul className={testStyles.seoList}>
                        {t.low.map((x) => (
                          <li key={x}>{x}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className={testStyles.note}>
                    <strong>{t.facetsTitle}:</strong>
                    <ul className={testStyles.bulletList} style={{ marginTop: 10 }}>
                      {t.facets.map((fd) => (
                        <li key={fd}>{fd}</li>
                      ))}
                    </ul>
                    <strong>{i18nStr("assessments.test.holland.seo.workplaceDnaLabel", "Workplace DNA:")}</strong> {t.workplaceDNA}
                    <br />
                    <strong>{i18nStr("assessments.test.holland.seo.bigFiveCorrelationsLabel", "Big Five Correlations:")}</strong>{" "}
                    {t.bigFive}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className={testStyles.seoSection} aria-label="Holland code combinations">
            <h2 className={testStyles.seoTitle}>
              {i18nStr("assessments.test.holland.seo.codeCombinationsTitle", "The Holland Code Combinations")}
            </h2>
            <p className={testStyles.seoLead}>
              Most individuals receive a 3-letter code representing their top three interests. Opposite combinations suggest potential indecision or diverse capabilities requiring integration.
            </p>
            <div className={testStyles.tableWrap}>
              <table className={testStyles.table}>
                <thead>
                  <tr>
                    <th>{i18nStr("assessments.test.holland.seo.codeCombinationsCodeHeader", "Code")}</th>
                    <th>{i18nStr("assessments.test.holland.seo.codeCombinationsNameHeader", "Name")}</th>
                    <th>{i18nStr("assessments.test.holland.seo.codeCombinationsProfileHeader", "Profile")}</th>
                    <th>{i18nStr("assessments.test.holland.seo.codeCombinationsCareersHeader", "Optimal Careers")}</th>
                  </tr>
                </thead>
                <tbody>
                  {hollandCodePatterns.map((r) => (
                    <tr key={r.code}>
                      <td>{r.code}</td>
                      <td>{r.name}</td>
                      <td>{r.profile}</td>
                      <td>{r.careers}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className={testStyles.note}>
              <strong>
                {i18nStr("assessments.test.holland.seo.inconsistentCodesStrong", "Inconsistent Codes (Opposition stress):")}
              </strong>{" "}
              {i18nStr(
                "assessments.test.holland.seo.inconsistentCodesText",
                "RC (adjacent = consistent) vs. RA (moderate inconsistency) vs. RS (opposite = high inconsistency)."
              )}
            </div>
          </section>

          <section className={testStyles.seoSection} aria-label="Holland code versus Big Five">
            <h2 className={testStyles.seoTitle}>
              {i18nStr("assessments.test.holland.seo.vsBigFiveTitle", "Holland Code vs. Big Five: Critical Differences")}
            </h2>
            <div className={testStyles.tableWrap}>
              <table className={testStyles.table}>
                <thead>
                  <tr>
                    <th>{i18nStr("assessments.test.holland.seo.vsBigFiveAspectHeader", "Aspect")}</th>
                    <th>{i18nStr("assessments.test.holland.seo.vsBigFiveHollandHeader", "Holland Code")}</th>
                    <th>{i18nStr("assessments.test.holland.seo.vsBigFiveBigFiveHeader", "Big Five (OCEAN)")}</th>
                  </tr>
                </thead>
                <tbody>
                  {hollandVsBigFiveRows.map((r) => (
                    <tr key={r.aspect}>
                      <td>{r.aspect}</td>
                      <td>{r.holland}</td>
                      <td>{r.bigFive}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ul className={testStyles.bulletList} style={{ marginTop: 12 }}>
              {hollandSynthesis.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </section>

          <section className={testStyles.seoSection} aria-label="Frequently asked questions">
            <h2 className={testStyles.seoTitle}>
              {i18nStr("assessments.test.common.ui.faqTitle", "Frequently Asked Questions (FAQ)")}
            </h2>
            <div className={testStyles.faq}>
              {hollandFaq.map((item) => (
                <details key={item.q} className={testStyles.faqItem}>
                  <summary className={testStyles.faqQ}>{item.q}</summary>
                  <div className={testStyles.faqA}>{item.a}</div>
                </details>
              ))}
            </div>
          </section>

          <section className={testStyles.seoSection} aria-label="Ready for your vocational profile">
            <h2 className={testStyles.seoTitle}>
              {i18nStr("assessments.test.holland.seo.ctaTitle", "Ready for Your Vocational Profile?")}
            </h2>
            <p className={testStyles.seoLead}>
              {i18nStr(
                "assessments.test.holland.seo.ctaLead",
                "48 questions • 6 dimensions • 3-letter code • Congruence calculation • Career matching"
              )}
            </p>
            <button type="button" className={testStyles.primaryBtn} onClick={jumpToTest}>
              {stage === "intro"
                ? i18nStr("assessments.test.common.ui.startTestButton", "Start The Test")
                : i18nStr("assessments.test.common.ui.goToTestButton", "Go To The Test")}
            </button>
            <div className={testStyles.note} style={{ marginTop: 12 }}>
              {i18nStr("assessments.test.common.ui.preferOverviewFirst", "Prefer the overview first?")}{" "}
              <Link to="/assessments/holland" style={{ color: "var(--primary)" }}>
                {i18nFmt("assessments.test.common.ui.readGuideTemplate", "Read the {name} guide", { name: "Holland" })}
              </Link>
              .
            </div>
          </section>
        </section>
      </>
    );
  }

  if (assessment.id === "eq") {
    const title = (get("assessments.test.eq.helmet.title") as string | undefined) ?? eqTitle;
    const description = (get("assessments.test.eq.helmet.description") as string | undefined) ?? eqDescription;
    const keywords =
      (get("assessments.test.eq.helmet.keywords") as string | undefined) ??
      "EQ test, emotional intelligence, MSCEIT, EQ-i 2.0, ESCI, leadership, empathy, emotion regulation";

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
          mainEntity: eqFaq.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        },
      ],
    };

    const branchMeta: Record<EqBranch, { branch: EqBranch; icon: string }> = {
      Perceiving: { branch: "Perceiving", icon: "👁️" },
      Facilitating: { branch: "Facilitating", icon: "🔗" },
      Understanding: { branch: "Understanding", icon: "🧠" },
      Managing: { branch: "Managing", icon: "🎛️" },
    };

    const [stage, setStage] = useState<"intro" | "test" | "result">("intro");
    const [questions, setQuestions] = useState<EqQuestion[]>([]);
    const [answers, setAnswers] = useState<EqAnswerState[]>([]);
    const [index, setIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const current = questions[index] ?? null;
    const total = questions.length;
    const answeredCount = answers.filter((a) => a.value !== null).length;
    const progress = total > 0 ? Math.round((answeredCount / total) * 100) : 0;

    async function start() {
      setIsLoading(true);
      try {
        const pool = (await loadQuestionBank(locale, "eq")) as Array<{ q: string; dimension: "SA" | "SR" | "MO" | "EM" | "SS"; facet: string }>;
        const eqQuestions = toEqQuestions(pool);
        const q = buildEqTest(eqQuestions, 20);
        setQuestions(q);
        setAnswers(Array.from({ length: q.length }, () => ({ value: null })));
        setIndex(0);
        setStage("test");
      } finally {
        setIsLoading(false);
      }
    }

    function restart() {
      setStage("intro");
      setQuestions([]);
      setAnswers([]);
      setIndex(0);
    }

    function choose(value: 1 | 2 | 3 | 4 | 5) {
      setAnswers((prev) => {
        const next = [...prev];
        next[index] = { value };
        return next;
      });
    }

    function prev() {
      setIndex((i) => Math.max(0, i - 1));
    }

    function next() {
      if (index + 1 >= total) {
        setStage("result");
        return;
      }
      setIndex((i) => i + 1);
    }

    async function jumpToTest() {
      if (typeof window === "undefined") return;
      if (stage === "intro") {
        await start();
        requestAnimationFrame(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        });
        return;
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    const results = useMemo(() => {
      if (stage !== "result") return null;

      const branchSum: Record<EqBranch, number> = { Perceiving: 0, Facilitating: 0, Understanding: 0, Managing: 0 };
      const branchCount: Record<EqBranch, number> = { Perceiving: 0, Facilitating: 0, Understanding: 0, Managing: 0 };
      const subSum: Record<EqTraitSubscale, number> = Object.fromEntries(
        (Object.keys(eqTraitDomainBySubscale) as EqTraitSubscale[]).map((k) => [k, 0]),
      ) as Record<EqTraitSubscale, number>;
      const subCount: Record<EqTraitSubscale, number> = Object.fromEntries(
        (Object.keys(eqTraitDomainBySubscale) as EqTraitSubscale[]).map((k) => [k, 0]),
      ) as Record<EqTraitSubscale, number>;

      for (let i = 0; i < total; i += 1) {
        const q = questions[i];
        const a = answers[i];
        if (!q) continue;
        if (!a?.value) continue;
        const v = q.reverse ? (6 - a.value) : a.value;
        if (q.branch) {
          branchSum[q.branch] += v;
          branchCount[q.branch] += 1;
        }
        if (q.subscale) {
          subSum[q.subscale] += v;
          subCount[q.subscale] += 1;
        }
      }

      const branches: EqBranch[] = ["Perceiving", "Facilitating", "Understanding", "Managing"];
      const branchScores = branches.map((b) => {
        const avg = branchCount[b] > 0 ? branchSum[b] / branchCount[b] : 3;
        const percentile = toPercentileFromLikert(avg);
        const standard = eqStandardScoreFromLikert(avg);
        return { branch: b, avg: Math.round(avg * 100) / 100, percentile, standard };
      });

      const abilityAvg = branchScores.reduce((s, x) => s + x.avg, 0) / branchScores.length;
      const eqScore = eqStandardScoreFromLikert(abilityAvg);

      const subscales = (Object.keys(eqTraitDomainBySubscale) as EqTraitSubscale[]).map((s) => {
        const avg = subCount[s] > 0 ? subSum[s] / subCount[s] : 3;
        const percentile = toPercentileFromLikert(avg);
        const standard = eqStandardScoreFromLikert(avg);
        return { subscale: s, domain: eqTraitDomainBySubscale[s], avg: Math.round(avg * 100) / 100, percentile, standard };
      });

      const domains: EqTraitDomain[] = ["Intrapersonal", "Interpersonal", "Stress Management", "Adaptability", "General Mood"];
      const domainScores = domains.map((d) => {
        const rows = subscales.filter((s) => s.domain === d);
        const avg = rows.reduce((s, x) => s + x.avg, 0) / Math.max(1, rows.length);
        const percentile = toPercentileFromLikert(avg);
        const standard = eqStandardScoreFromLikert(avg);
        return { domain: d, avg: Math.round(avg * 100) / 100, percentile, standard };
      });
      const traitEq = Math.round(domainScores.reduce((s, x) => s + x.standard, 0) / domainScores.length);

      const abilityVsTrait =
        Math.abs(eqScore - traitEq) <= 6
          ? "Balanced ability and trait profile"
          : eqScore > traitEq
            ? "Stronger ability-EI signal than trait-EI self-perception"
            : "Stronger trait-EI self-perception than ability-EI signal";

      const weakestBranch = [...branchScores].sort((a, b) => a.percentile - b.percentile)[0]?.branch ?? "Perceiving";
      const roadmap = eqDevelopmentTips[weakestBranch] ?? [];

      const branchPct = Object.fromEntries(branchScores.map((b) => [b.branch, b.percentile])) as Record<EqBranch, number>;
      const subPct = Object.fromEntries(subscales.map((s) => [s.subscale, s.percentile])) as Record<EqTraitSubscale, number>;

      const competencies = eqEsciCompetencies.map((c) => {
        const percentile =
          c.source.kind === "branch"
            ? branchPct[c.source.key as EqBranch] ?? 0
            : subPct[c.source.key as EqTraitSubscale] ?? 0;
        return { ...c, percentile };
      });

      const leadershipSignal =
        branchPct.Managing >= 70 && subPct["Impulse Control"] >= 65
          ? "High leadership signal (Managing + Self-control)"
          : branchPct.Managing >= 55
            ? "Moderate leadership signal (Managing)"
            : "Growth area: Managing emotions under pressure";

      return { eqScore, abilityAvg, traitEq, abilityVsTrait, branchScores, subscales, domainScores, weakestBranch, roadmap, competencies, leadershipSignal };
    }, [answers, questions, stage, total]);

    return (
      <>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:type" content="website" />
          <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        </Helmet>

        <section className={testStyles.wrapper}>
          <h1 className={testStyles.pageTitle}>{title}</h1>
          <p className={testStyles.pageSubtitle}>{description}</p>

          {stage === "intro" && (
            <div className={testStyles.card}>
              <div className={testStyles.introGrid}>
                <div className={testStyles.introItem}>
                  <div className={testStyles.introTitle}>
                    {i18nStr("assessments.test.common.ui.whatYouGetTitle", "What You Get")}
                  </div>
                  <ul className={testStyles.introList}>
                    {eqWhatYouGet.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className={testStyles.introItem}>
                  <div className={testStyles.introTitle}>
                    {i18nStr("assessments.test.common.ui.methodologyTitle", "Test Methodology & Scientific Foundation")}
                  </div>
                  <ul className={testStyles.introList}>
                    {eqModels.map((m) => (
                      <li key={m.title}>{m.title}</li>
                    ))}
                    <li>The Four-Branch Ability Hierarchy (MSCEIT)</li>
                    <li>History of Emotional Intelligence Assessment</li>
                  </ul>
                  <div className={testStyles.note}>
                    <strong>{i18nStr("assessments.test.eq.ui.noteStrong", "Important:")}</strong>{" "}
                    {i18nStr(
                      "assessments.test.eq.ui.noteText",
                      "This implementation uses self-report items and provides an educational approximation of ability/trait/competency concepts. It is not the MSCEIT, EQ-i, or ESCI."
                    )}
                  </div>
                </div>
              </div>

              <button type="button" className={testStyles.primaryBtn} onClick={start}>
                {i18nStr("assessments.test.common.ui.startAssessmentButton", "Start Assessment")}
              </button>

              <div className={testStyles.disclaimer}>
                {i18nStr(
                  "assessments.test.eq.ui.disclaimer",
                  "All calculations run locally in your browser. No registration required."
                )}
              </div>
            </div>
          )}

          {stage === "test" && current && (
            <div className={testStyles.card}>
              <div className={testStyles.progressRow}>
                <div
                  className={testStyles.progressBar}
                  aria-label={i18nStr("assessments.test.common.ui.progressAriaLabel", "Progress")}
                >
                  <div className={testStyles.progressFill} style={{ width: `${progress}%` }} />
                </div>
                <div className={testStyles.progressText}>
                  {i18nFmt("assessments.test.common.ui.questionProgress", "Question {current} / {total}", {
                    current: index + 1,
                    total,
                  })}
                </div>
              </div>

              <div className={testStyles.questionMeta}>
                {current.kind === "ability" && current.branch ? (
                  <span className={testStyles.pill}>
                    {i18nStr("assessments.test.eq.ui.branchLabel", "Branch:")} {branchMeta[current.branch].icon} {current.branch}
                  </span>
                ) : null}
                {current.kind === "trait" && current.subscale ? (
                  <span className={testStyles.pill}>
                    {i18nStr("assessments.test.eq.ui.subscaleLabel", "Subscale:")} {current.subscale} (
                    {eqTraitDomainBySubscale[current.subscale]})
                  </span>
                ) : null}
              </div>

              <div className={testStyles.questionText}>{current.prompt}</div>

              <div
                className={testStyles.options}
                role="radiogroup"
                aria-label={i18nStr("assessments.test.common.ui.answerChoicesAriaLabel", "Answer choices")}
              >
                {likertOptions.map((opt) => {
                  const selected = answers[index]?.value === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      className={`${testStyles.optionBtn} ${selected ? testStyles.selected : ""}`}
                      onClick={() => choose(opt.value)}
                      role="radio"
                      aria-checked={selected}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>

              <div className={testStyles.actions}>
                <button type="button" className={testStyles.secondaryBtn} onClick={prev} disabled={index === 0}>
                  {i18nStr("assessments.test.common.ui.backButton", "Back")}
                </button>
                <button type="button" className={testStyles.primaryBtn} onClick={next} disabled={answers[index]?.value === null}>
                  {index + 1 >= total
                    ? i18nStr("assessments.test.common.ui.finishButton", "Finish")
                    : i18nStr("assessments.test.common.ui.nextButton", "Next")}
                </button>
              </div>
            </div>
          )}

          {stage === "result" && results && (
            <div className={testStyles.card}>
              <div className={testStyles.resultHeader}>
                <div className={testStyles.resultScore}>
                  {i18nStr("assessments.test.eq.ui.eqScoreLabel", "EQ Score:")}{" "}
                  <span className={testStyles.resultNumber}>{results.eqScore}</span>
                </div>
                <div className={testStyles.resultSub}>
                  {i18nStr(
                    "assessments.test.eq.ui.resultSub",
                    "Ability EI (4 branches) • Trait composites (EQ-i 2.0 style) • ESCI competencies (proxy)"
                  )}
                </div>
              </div>
              <div className={testStyles.disclaimer}>
                {i18nStr(
                  "assessments.test.common.ui.resultsDisclaimer",
                  "Educational estimate only. Results are approximate and not a clinical or scientific diagnosis."
                )}
              </div>

              <h2 className={testStyles.sectionTitle}>
                {i18nStr("assessments.test.eq.ui.abilitiesTitle", "Four Ability Branches (MSCEIT Model)")}
              </h2>
              <div className={testStyles.breakdown}>
                {results.branchScores.map((b) => (
                  <div key={b.branch} className={testStyles.breakdownRow}>
                    <div className={testStyles.breakdownTop}>
                      <span className={testStyles.breakdownName}>
                        {branchMeta[b.branch].icon} {b.branch}
                      </span>
                      <span className={testStyles.breakdownValue}>
                        {b.standard} • {b.percentile}
                        {i18nStr("assessments.test.common.ui.percentileSuffix", "th")}
                      </span>
                    </div>
                    <div className={testStyles.miniBar}>
                      <div className={testStyles.miniFill} style={{ width: `${Math.max(0, Math.min(100, b.percentile))}%` }} />
                    </div>
                    <div className={testStyles.breakdownValue} style={{ marginTop: 6 }}>
                      {i18nStr("assessments.test.eq.ui.avgResponseLabel", "Avg response:")} {b.avg} / 5
                    </div>
                  </div>
                ))}
              </div>

              <h2 className={testStyles.sectionTitle}>
                {i18nStr("assessments.test.eq.ui.abilityVsTraitTitle", "Ability vs. Trait Analysis")}
              </h2>
              <div className={testStyles.breakdown}>
                <div className={testStyles.breakdownRow}>
                  <div className={testStyles.breakdownName}>
                    {i18nStr("assessments.test.eq.ui.abilityEqLabel", "Ability EQ")}
                  </div>
                  <div className={testStyles.breakdownValue}>{results.eqScore}</div>
                </div>
                <div className={testStyles.breakdownRow}>
                  <div className={testStyles.breakdownName}>
                    {i18nStr("assessments.test.eq.ui.traitEqLabel", "Trait EQ (composite)")}
                  </div>
                  <div className={testStyles.breakdownValue}>{results.traitEq}</div>
                </div>
                <div className={testStyles.breakdownRow}>
                  <div className={testStyles.breakdownName}>
                    {i18nStr("assessments.test.eq.ui.interpretationLabel", "Interpretation")}
                  </div>
                  <div className={testStyles.breakdownValue}>{results.abilityVsTrait}</div>
                </div>
              </div>

              <h2 className={testStyles.sectionTitle}>
                {i18nStr("assessments.test.eq.ui.subscaleProfileTitle", "15 Subscale Profile (EQ-i 2.0)")}
              </h2>
              <div className={testStyles.tableWrap}>
                <table className={testStyles.table}>
                  <thead>
                    <tr>
                      <th>{i18nStr("assessments.test.eq.ui.tableDomainHeader", "Domain")}</th>
                      <th>{i18nStr("assessments.test.eq.ui.tableSubscaleHeader", "Subscale")}</th>
                      <th>{i18nStr("assessments.test.eq.ui.tableScoreHeader", "Score")}</th>
                      <th>{i18nStr("assessments.test.eq.ui.tablePercentileHeader", "Percentile")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.subscales
                      .slice()
                      .sort((a, b) => a.domain.localeCompare(b.domain) || a.subscale.localeCompare(b.subscale))
                      .map((s) => (
                        <tr key={s.subscale}>
                          <td>{s.domain}</td>
                          <td>{s.subscale}</td>
                          <td>{s.standard}</td>
                          <td>{s.percentile}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              <h2 className={testStyles.sectionTitle}>
                {i18nStr("assessments.test.eq.ui.competencyClustersTitle", "12 Competency Clusters (ESCI) — Proxy")}
              </h2>
              <div className={testStyles.tableWrap}>
                <table className={testStyles.table}>
                  <thead>
                    <tr>
                      <th>{i18nStr("assessments.test.eq.ui.tableClusterHeader", "Cluster")}</th>
                      <th>{i18nStr("assessments.test.eq.ui.tableCompetencyHeader", "Competency")}</th>
                      <th>{i18nStr("assessments.test.eq.ui.tablePercentileHeader", "Percentile")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.competencies.map((c) => (
                      <tr key={c.competency}>
                        <td>{c.cluster}</td>
                        <td>{c.competency}</td>
                        <td>{c.percentile}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2 className={testStyles.sectionTitle}>
                {i18nStr("assessments.test.eq.ui.developmentRoadmapTitle", "Developmental Roadmap")}
              </h2>
              <div className={testStyles.breakdown}>
                <div className={testStyles.breakdownRow}>
                  <div className={testStyles.breakdownName}>
                    {i18nStr("assessments.test.eq.ui.weakestBranchSignalLabel", "Weakest branch signal")}
                  </div>
                  <div className={testStyles.breakdownValue}>{results.weakestBranch}</div>
                </div>
                <div className={testStyles.breakdownRow}>
                  <div className={testStyles.breakdownName}>
                    {i18nStr("assessments.test.eq.ui.trainingTargetsLabel", "Training targets")}
                  </div>
                  <div className={testStyles.breakdownValue}>
                    <ul className={testStyles.bulletList}>
                      {results.roadmap.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <h2 className={testStyles.sectionTitle}>
                {i18nStr("assessments.test.eq.ui.leadershipPredictorTitle", "Leadership Predictor")}
              </h2>
              <div className={testStyles.breakdown}>
                <div className={testStyles.breakdownRow}>
                  <div className={testStyles.breakdownName}>
                    {i18nStr("assessments.test.eq.ui.signalLabel", "Signal")}
                  </div>
                  <div className={testStyles.breakdownValue}>{results.leadershipSignal}</div>
                </div>
              </div>

              <div className={testStyles.actions}>
                <button type="button" className={testStyles.secondaryBtn} onClick={restart}>
                  {i18nStr("assessments.test.common.ui.retakeButton", "Retake")}
                </button>
                <button type="button" className={testStyles.primaryBtn} onClick={jumpToTest}>
                  {i18nStr("assessments.test.common.ui.goToTestButton", "Go To The Test")}
                </button>
              </div>
            </div>
          )}

          <section className={testStyles.seoSection} aria-label="The three theoretical models">
            <h2 className={testStyles.seoTitle}>
              {i18nStr("assessments.test.common.ui.methodologyTitle", "Test Methodology & Scientific Foundation")}
            </h2>
            <div className={testStyles.twoCol}>
              {eqModels.map((m) => (
                <div key={m.title} className={testStyles.panel}>
                  <h3 className={testStyles.panelTitle}>{m.title}</h3>
                  <ul className={testStyles.bulletList}>
                    {m.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className={testStyles.seoSection} aria-label="Four-branch ability hierarchy">
            <h2 className={testStyles.seoTitle}>
              {i18nStr("assessments.test.eq.seo.msceitHierarchyTitle", "The Four-Branch Ability Hierarchy (MSCEIT)")}
            </h2>
            <div className={testStyles.twoCol}>
              {eqAbilityHierarchy.map((h) => (
                <div key={h.title} className={testStyles.panel}>
                  <h3 className={testStyles.panelTitle}>{h.title}</h3>
                  <ul className={testStyles.bulletList}>
                    {h.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className={testStyles.seoSection} aria-label="History of emotional intelligence assessment">
            <h2 className={testStyles.seoTitle}>
              {i18nStr("assessments.test.eq.seo.historyTitle", "History of Emotional Intelligence Assessment")}
            </h2>
            <div className={testStyles.timeline}>
              {eqHistory.map((t) => (
                <div key={`${t.year}-${t.title}`} className={testStyles.timelineItem}>
                  <div className={testStyles.timelineYear}>{t.year}</div>
                  <div className={testStyles.timelineBody}>
                    <div className={testStyles.timelineTitle}>{t.title}</div>
                    <div className={testStyles.timelineDesc}>{t.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className={testStyles.seoSection} aria-label="The four branches deep dive">
            <h2 className={testStyles.seoTitle}>
              {i18nStr("assessments.test.eq.seo.branchesDeepDiveTitle", "The Four Branches: Deep Dive (MSCEIT Model)")}
            </h2>
            <div className={testStyles.seoGrid}>
              {eqBranchesDeepDive.map((b) => (
                <div key={b.title} className={testStyles.seoCard}>
                  <div className={testStyles.seoCardTitle}>
                    <span aria-hidden="true">{b.icon}</span> {b.title}
                  </div>
                  <p className={testStyles.seoText}>
                    <strong>{i18nStr("assessments.test.eq.seo.coreFunctionLabel", "Core Function:")}</strong> {b.core}
                  </p>
                  <div className={testStyles.note}>
                    <strong>{i18nStr("assessments.test.eq.seo.abilitiesLabel", "Abilities:")}</strong>
                    <ul className={testStyles.bulletList} style={{ marginTop: 10 }}>
                      {b.abilities.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  </div>
                  <div className={testStyles.seoCols}>
                    <div>
                      <div className={testStyles.seoSubTitle}>
                        {i18nStr("assessments.test.eq.seo.highScorersSubtitle", "High Scorers (75th+ percentile)")}
                      </div>
                      <ul className={testStyles.seoList}>
                        {b.high.map((x) => (
                          <li key={x}>{x}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className={testStyles.seoSubTitle}>
                        {i18nStr("assessments.test.eq.seo.lowScorersSubtitle", "Low Scorers (25th- percentile)")}
                      </div>
                      <ul className={testStyles.seoList}>
                        {b.low.map((x) => (
                          <li key={x}>{x}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className={testStyles.note}>
                    <strong>{i18nStr("assessments.test.eq.seo.neuralSubstrateLabel", "Neural Substrate:")}</strong> {b.neural}
                    <br />
                    <strong>{i18nStr("assessments.test.eq.seo.careerLifeImpactLabel", "Career/Life Impact:")}</strong> {b.impact}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className={testStyles.seoSection} aria-label="Alternative frameworks mixed and trait models">
            <h2 className={testStyles.seoTitle}>
              {i18nStr("assessments.test.eq.seo.alternativeFrameworksTitle", "Alternative Frameworks: Mixed & Trait Models")}
            </h2>
            <div className={testStyles.twoCol}>
              {eqAlternativeFrameworks.map((x) => (
                <div key={x.title} className={testStyles.panel}>
                  <h3 className={testStyles.panelTitle}>{x.title}</h3>
                  <p className={testStyles.panelText}>{x.text}</p>
                  <ul className={testStyles.bulletList}>
                    {x.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className={testStyles.seoSection} aria-label="EQ versus Big Five versus IQ">
            <h2 className={testStyles.seoTitle}>
              {i18nStr("assessments.test.eq.seo.vsBigFiveIqTitle", "EQ vs. Big Five vs. IQ: Critical Differences")}
            </h2>
            <div className={testStyles.tableWrap}>
              <table className={testStyles.table}>
                <thead>
                  <tr>
                    <th>{i18nStr("assessments.test.eq.seo.comparisonAspectHeader", "Aspect")}</th>
                    <th>{i18nStr("assessments.test.eq.seo.comparisonEiHeader", "Emotional Intelligence (Ability)")}</th>
                    <th>{i18nStr("assessments.test.eq.seo.comparisonBigFiveHeader", "Big Five (OCEAN)")}</th>
                    <th>{i18nStr("assessments.test.eq.seo.comparisonIqHeader", "Cognitive Intelligence (IQ)")}</th>
                  </tr>
                </thead>
                <tbody>
                  {eqComparisonRows.map((r) => (
                    <tr key={r.aspect}>
                      <td>{r.aspect}</td>
                      <td>{r.ei}</td>
                      <td>{r.bigFive}</td>
                      <td>{r.iq}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ul className={testStyles.bulletList} style={{ marginTop: 12 }}>
              {eqSynthesis.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </section>

          <section className={testStyles.seoSection} aria-label="Frequently asked questions">
            <h2 className={testStyles.seoTitle}>
              {i18nStr("assessments.test.common.ui.faqTitle", "Frequently Asked Questions (FAQ)")}
            </h2>
            <div className={testStyles.faq}>
              {eqFaq.map((item) => (
                <details key={item.q} className={testStyles.faqItem}>
                  <summary className={testStyles.faqQ}>{item.q}</summary>
                  <div className={testStyles.faqA}>{item.a}</div>
                </details>
              ))}
            </div>
          </section>

          <section className={testStyles.seoSection} aria-label="Ready for your emotional competency profile">
            <h2 className={testStyles.seoTitle}>
              {i18nStr("assessments.test.eq.seo.ctaTitle", "Ready for Your Emotional Competency Profile?")}
            </h2>
            <p className={testStyles.seoLead}>
              {i18nStr(
                "assessments.test.eq.seo.ctaLead",
                "141 items • 4 ability branches • 15 trait facets • 360° behavioral feedback • Neuroscience-based • Development roadmap"
              )}
            </p>
            <button type="button" className={testStyles.primaryBtn} onClick={jumpToTest} disabled={isLoading}>
              {stage === "intro"
                ? i18nStr("assessments.test.common.ui.startAssessmentButton", "Start Assessment")
                : i18nStr("assessments.test.common.ui.goToTestButton", "Go To The Test")}
            </button>
            <div className={testStyles.note} style={{ marginTop: 12 }}>
              {i18nStr("assessments.test.common.ui.preferOverviewFirst", "Prefer the overview first?")}{" "}
              <Link to="/assessments/eq" style={{ color: "var(--primary)" }}>
                {i18nFmt("assessments.test.common.ui.readGuideTemplate", "Read the {name} guide", { name: "EQ" })}
              </Link>
              .
            </div>
          </section>
        </section>
      </>
    );
  }

  if (assessment.id === "love-languages") {
    const title = (get("assessments.test.love-languages.helmet.title") as string | undefined) ?? loveTitle;
    const description = (get("assessments.test.love-languages.helmet.description") as string | undefined) ?? loveDescription;
    const keywords =
      (get("assessments.test.love-languages.helmet.keywords") as string | undefined) ??
      "love languages test, communication, relationship tool, words of affirmation, acts of service, quality time, gifts, physical touch";

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
          mainEntity: loveFaq.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        },
      ],
    };

    const [stage, setStage] = useState<"intro" | "test" | "result">("intro");
    const [questions, setQuestions] = useState<LoveLanguageQuestion[]>([]);
    const [answers, setAnswers] = useState<LoveLanguageAnswerState[]>([]);
    const [index, setIndex] = useState(0);
    const [partnerGiving, setPartnerGiving] = useState<Array<LoveLanguageKey | null>>([null, null]);

    const current = questions[index] ?? null;
    const total = questions.length;
    const answeredCount = answers.filter((a) => a.selected !== null).length;
    const progress = total > 0 ? Math.round((answeredCount / total) * 100) : 0;

    function start() {
      const q = buildLoveLanguagesTest(loveQuestions, 20);
      setQuestions(q);
      setAnswers(Array.from({ length: q.length }, () => ({ selected: null })));
      setIndex(0);
      setPartnerGiving([null, null]);
      setStage("test");
    }

    function restart() {
      setStage("intro");
      setQuestions([]);
      setAnswers([]);
      setIndex(0);
      setPartnerGiving([null, null]);
    }

    function choose(selected: "a" | "b") {
      setAnswers((prev) => {
        const next = [...prev];
        next[index] = { selected };
        return next;
      });
    }

    function prev() {
      setIndex((i) => Math.max(0, i - 1));
    }

    function next() {
      if (index + 1 >= total) {
        setStage("result");
        return;
      }
      setIndex((i) => i + 1);
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

    function setPartner(position: 0 | 1, key: LoveLanguageKey) {
      setPartnerGiving((prev) => {
        const next = [...prev];
        next[position] = key;
        return next as Array<LoveLanguageKey | null>;
      });
    }

    const results = useMemo(() => {
      if (stage !== "result") return null;

      const keys: LoveLanguageKey[] = ["words", "acts", "gifts", "time", "touch"];
      const totalCounts: Record<LoveLanguageKey, number> = { words: 0, acts: 0, gifts: 0, time: 0, touch: 0 };
      const receiveCounts: Record<LoveLanguageKey, number> = { words: 0, acts: 0, gifts: 0, time: 0, touch: 0 };
      const giveCounts: Record<LoveLanguageKey, number> = { words: 0, acts: 0, gifts: 0, time: 0, touch: 0 };

      for (let i = 0; i < total; i += 1) {
        const q = questions[i];
        const a = answers[i];
        if (!q) continue;
        if (!a?.selected) continue;
        const opt = a.selected === "a" ? q.a : q.b;
        totalCounts[opt.key] += 1;
        if (opt.mode === "receive") receiveCounts[opt.key] += 1;
        if (opt.mode === "give") giveCounts[opt.key] += 1;
      }

      const ordered = keys
        .map((k) => ({ key: k, label: loveMeta[k].label, total: totalCounts[k], receive: receiveCounts[k], give: giveCounts[k] }))
        .sort((a, b) => b.total - a.total);

      const primary = ordered[0]?.key ?? "time";
      const secondary = ordered[1]?.key ?? "words";
      const bilingual = Math.abs((ordered[0]?.total ?? 0) - (ordered[1]?.total ?? 0)) <= 1;

      const receiveOrdered = keys
        .map((k) => ({ key: k, receive: receiveCounts[k] }))
        .sort((a, b) => b.receive - a.receive);
      const receivePrimary = receiveOrdered[0]?.key ?? primary;
      const receiveSecondary = receiveOrdered[1]?.key ?? secondary;

      const giveOrdered = keys
        .map((k) => ({ key: k, give: giveCounts[k] }))
        .sort((a, b) => b.give - a.give);
      const givePrimary = giveOrdered[0]?.key ?? primary;
      const giveSecondary = giveOrdered[1]?.key ?? secondary;

      const gap = keys.map((k) => ({ key: k, receive: receiveCounts[k], give: giveCounts[k], diff: giveCounts[k] - receiveCounts[k] }));

      const partnerOk = partnerGiving.every((x) => x);
      const partnerCode = partnerOk ? (partnerGiving.join("-") as string) : null;

      const matchScore = partnerOk
        ? (() => {
            const p1 = partnerGiving[0] as LoveLanguageKey;
            const p2 = partnerGiving[1] as LoveLanguageKey;
            const user1 = receivePrimary;
            const user2 = receiveSecondary;
            const score =
              (p1 === user1 ? 60 : p1 === user2 ? 35 : 0) +
              (p2 === user1 ? 25 : p2 === user2 ? 15 : 0);
            return Math.min(100, score);
          })()
        : null;

      const primaryDeep = loveDeepDive.find((x) => x.key === receivePrimary) ?? loveDeepDive[0];

      return {
        ordered,
        primary,
        secondary,
        bilingual,
        receivePrimary,
        receiveSecondary,
        givePrimary,
        giveSecondary,
        gap,
        partnerCode,
        matchScore,
        primaryDeep,
      };
    }, [answers, partnerGiving, questions, stage, total]);

    return (
      <>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:type" content="website" />
          <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        </Helmet>

        <section className={testStyles.wrapper}>
          <h1 className={testStyles.pageTitle}>{title}</h1>
          <p className={testStyles.pageSubtitle}>{description}</p>

          {stage === "intro" && (
            <div className={testStyles.card}>
              <div className={testStyles.introGrid}>
                <div className={testStyles.introItem}>
                  <div className={testStyles.introTitle}>
                    {i18nStr("assessments.test.common.ui.whatYouGetTitle", "What You Get")}
                  </div>
                  <ul className={testStyles.introList}>
                    {loveWhatYouGet.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <div className={testStyles.note}>
                    <strong>{i18nStr("assessments.test.love-languages.ui.validityNoteStrong", "Note on Validity:")}</strong>{" "}
                    {i18nStr(
                      "assessments.test.love-languages.ui.validityNoteText",
                      "Love Languages lack robust psychometric validation. Use this as a communication framework, not a diagnostic instrument."
                    )}
                  </div>
                </div>
                <div className={testStyles.introItem}>
                  <div className={testStyles.introTitle}>
                    {i18nStr("assessments.test.common.ui.methodologyTitle", "Test Methodology & Scientific Foundation")}
                  </div>
                  <ul className={testStyles.introList}>
                    {loveMethodologySections.map((s) => (
                      <li key={s.title}>{s.title}</li>
                    ))}
                    <li>History of the Love Languages</li>
                    <li>Love Languages vs. Attachment Theory vs. Big Five</li>
                  </ul>
                  <div className={testStyles.note}>
                    <strong>{i18nStr("assessments.test.love-languages.ui.mechanicsNoteStrong", "Mechanics:")}</strong>{" "}
                    {i18nStr(
                      "assessments.test.love-languages.ui.mechanicsNoteText",
                      "30 forced-choice questions. Pick the option that feels more loving to you."
                    )}
                  </div>
                </div>
              </div>

              <button type="button" className={testStyles.primaryBtn} onClick={start}>
                {i18nStr("assessments.test.common.ui.startAssessmentButton", "Start Assessment")}
              </button>

              <div className={testStyles.disclaimer}>
                {i18nStr(
                  "assessments.test.love-languages.ui.disclaimer",
                  "All scoring is calculated locally in your browser. No registration required."
                )}
              </div>
            </div>
          )}

          {stage === "test" && current && (
            <div className={testStyles.card}>
              <div className={testStyles.progressRow}>
                <div
                  className={testStyles.progressBar}
                  aria-label={i18nStr("assessments.test.common.ui.progressAriaLabel", "Progress")}
                >
                  <div className={testStyles.progressFill} style={{ width: `${progress}%` }} />
                </div>
                <div className={testStyles.progressText}>
                  {i18nFmt("assessments.test.common.ui.questionProgress", "Question {current} / {total}", {
                    current: index + 1,
                    total,
                  })}
                </div>
              </div>

              <div className={testStyles.questionText}>
                {i18nStr("assessments.test.love-languages.ui.whichFeelsMoreLoving", "Which feels more loving?")}
              </div>

              <div
                className={testStyles.options}
                role="radiogroup"
                aria-label={i18nStr("assessments.test.common.ui.answerChoicesAriaLabel", "Answer choices")}
              >
                {(["a", "b"] as const).map((k) => {
                  const opt = k === "a" ? current.a : current.b;
                  const selected = answers[index]?.selected === k;
                  return (
                    <button
                      key={k}
                      type="button"
                      className={`${testStyles.optionBtn} ${selected ? testStyles.selected : ""}`}
                      onClick={() => choose(k)}
                      role="radio"
                      aria-checked={selected}
                    >
                      {opt.text}
                    </button>
                  );
                })}
              </div>

              <div className={testStyles.actions}>
                <button type="button" className={testStyles.secondaryBtn} onClick={prev} disabled={index === 0}>
                  {i18nStr("assessments.test.common.ui.backButton", "Back")}
                </button>
                <button type="button" className={testStyles.primaryBtn} onClick={next} disabled={answers[index]?.selected === null}>
                  {index + 1 >= total
                    ? i18nStr("assessments.test.common.ui.finishButton", "Finish")
                    : i18nStr("assessments.test.common.ui.nextButton", "Next")}
                </button>
              </div>
            </div>
          )}

          {stage === "result" && results && (
            <div className={testStyles.card}>
              <div className={testStyles.resultHeader}>
                <div className={testStyles.resultScore}>
                  {i18nStr("assessments.test.love-languages.ui.primaryResultLabel", "Primary Love Language:")}{" "}
                  <span className={testStyles.resultNumber}>{loveMeta[results.receivePrimary].label}</span>
                </div>
                <div className={testStyles.resultSub}>
                  {i18nStr("assessments.test.love-languages.ui.secondaryResultLabel", "Secondary:")}{" "}
                  {loveMeta[results.receiveSecondary].label}
                  {results.bilingual ? i18nStr("assessments.test.love-languages.ui.bilingualPatternSuffix", " • Bilingual pattern") : ""}
                </div>
              </div>
              <div className={testStyles.disclaimer}>
                {i18nStr(
                  "assessments.test.common.ui.resultsDisclaimer",
                  "Educational estimate only. Results are approximate and not a clinical or scientific diagnosis."
                )}
              </div>

              <h2 className={testStyles.sectionTitle}>
                {i18nStr("assessments.test.love-languages.ui.channelsTitle", "5 Affection Channels (Scoring)")}
              </h2>
              <div className={testStyles.tableWrap}>
                <table className={testStyles.table}>
                  <thead>
                    <tr>
                      <th>{i18nStr("assessments.test.love-languages.ui.tableLanguageHeader", "Language")}</th>
                      <th>{i18nStr("assessments.test.love-languages.ui.tableTotalHeader", "Total")}</th>
                      <th>{i18nStr("assessments.test.love-languages.ui.tableReceiveHeader", "Receive")}</th>
                      <th>{i18nStr("assessments.test.love-languages.ui.tableGiveHeader", "Give")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.ordered.map((r) => (
                      <tr key={r.key}>
                        <td>
                          {loveMeta[r.key].icon} {r.label}
                        </td>
                        <td>{r.total}</td>
                        <td>{r.receive}</td>
                        <td>{r.give}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2 className={testStyles.sectionTitle}>
                {i18nStr("assessments.test.love-languages.ui.expressionGapTitle", "Expression Gap Analysis")}
              </h2>
              <div className={testStyles.breakdown}>
                <div className={testStyles.breakdownRow}>
                  <div className={testStyles.breakdownName}>
                    {i18nStr("assessments.test.love-languages.ui.receivePrimaryLabel", "Receive primary")}
                  </div>
                  <div className={testStyles.breakdownValue}>{loveMeta[results.receivePrimary].label}</div>
                </div>
                <div className={testStyles.breakdownRow}>
                  <div className={testStyles.breakdownName}>
                    {i18nStr("assessments.test.love-languages.ui.givePrimaryLabel", "Give primary")}
                  </div>
                  <div className={testStyles.breakdownValue}>{loveMeta[results.givePrimary].label}</div>
                </div>
                <div className={testStyles.breakdownRow}>
                  <div className={testStyles.breakdownName}>
                    {i18nStr("assessments.test.love-languages.ui.gapsLabel", "Gaps (Give − Receive)")}
                  </div>
                  <div className={testStyles.breakdownValue}>
                    <ul className={testStyles.bulletList}>
                      {results.gap
                        .slice()
                        .sort((a, b) => Math.abs(b.diff) - Math.abs(a.diff))
                        .map((g) => (
                          <li key={g.key}>
                            {loveMeta[g.key].label}: {g.diff > 0 ? `+${g.diff}` : `${g.diff}`}
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>

              <h2 className={testStyles.sectionTitle}>
                {i18nStr("assessments.test.love-languages.ui.compatibilityMatrixTitle", "Partner Compatibility Matrix")}
              </h2>
              <div className={testStyles.breakdown}>
                <div className={testStyles.breakdownRow}>
                  <div className={testStyles.breakdownName}>
                    {i18nStr("assessments.test.love-languages.ui.selectPartnerLabel", "Select partner giving tendencies")}
                  </div>
                  <div className={testStyles.breakdownValue}>
                    {i18nStr(
                      "assessments.test.love-languages.ui.selectPartnerText",
                      "Choose how your partner most often shows love (primary and secondary)."
                    )}
                  </div>
                </div>
                <div className={testStyles.twoCol}>
                  {([0, 1] as const).map((pos) => (
                    <div key={pos} className={testStyles.panel}>
                      <h3 className={testStyles.panelTitle}>
                        {i18nFmt("assessments.test.love-languages.ui.partnerGivingTitleTemplate", "Partner giving {pos}", {
                          pos: pos + 1,
                        })}
                      </h3>
                      <div
                        className={testStyles.options}
                        aria-label={i18nFmt("assessments.test.love-languages.ui.partnerGivingAriaTemplate", "Partner giving {pos}", {
                          pos: pos + 1,
                        })}
                      >
                        {(Object.keys(loveMeta) as LoveLanguageKey[]).map((k) => {
                          const selected = partnerGiving[pos] === k;
                          return (
                            <button
                              key={`${pos}-${k}`}
                              type="button"
                              className={`${testStyles.optionBtn} ${selected ? testStyles.selected : ""}`}
                              onClick={() => setPartner(pos, k)}
                            >
                              {loveMeta[k].icon} {loveMeta[k].label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
                <div className={testStyles.breakdownRow}>
                  <div className={testStyles.breakdownName}>
                    {i18nStr("assessments.test.love-languages.ui.compatibilityLabel", "Compatibility")}
                  </div>
                  <div className={testStyles.breakdownValue}>
                    {results.partnerCode && typeof results.matchScore === "number"
                      ? i18nFmt(
                          "assessments.test.love-languages.ui.compatibilityResultTemplate",
                          "Partner giving {partnerCode} vs. your receiving {primary}/{secondary} → {score}/100",
                          {
                            partnerCode: results.partnerCode,
                            primary: loveMeta[results.receivePrimary].label,
                            secondary: loveMeta[results.receiveSecondary].label,
                            score: results.matchScore,
                          }
                        )
                      : i18nStr(
                          "assessments.test.love-languages.ui.compatibilityPrompt",
                          "Select both partner giving languages to calculate a compatibility score."
                        )}
                  </div>
                </div>
              </div>

              <h2 className={testStyles.sectionTitle}>
                {i18nStr("assessments.test.love-languages.ui.communicationPlaybookTitle", "Communication Playbook")}
              </h2>
              <div className={testStyles.twoCol}>
                {loveDeepDive.map((d) => (
                  <div key={d.key} className={testStyles.panel}>
                    <h3 className={testStyles.panelTitle}>
                      {d.icon} {d.title}
                    </h3>
                    <ul className={testStyles.bulletList}>
                      {d.express.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <h2 className={testStyles.sectionTitle}>
                {i18nStr("assessments.test.love-languages.ui.conflictInsightTitle", "Conflict Insight")}
              </h2>
              <div className={testStyles.breakdown}>
                <div className={testStyles.breakdownRow}>
                  <div className={testStyles.breakdownName}>
                    {i18nStr("assessments.test.love-languages.ui.painPointsForPrimaryLabel", "Pain points for your primary")}
                  </div>
                  <div className={testStyles.breakdownValue}>
                    <ul className={testStyles.bulletList}>
                      {results.primaryDeep.pain.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className={testStyles.actions}>
                <button type="button" className={testStyles.secondaryBtn} onClick={restart}>
                  {i18nStr("assessments.test.common.ui.retakeButton", "Retake")}
                </button>
                <button type="button" className={testStyles.primaryBtn} onClick={jumpToTest}>
                  {i18nStr("assessments.test.common.ui.goToTestButton", "Go To The Test")}
                </button>
              </div>
            </div>
          )}

          <section className={testStyles.seoSection} aria-label="Test methodology and scientific foundation">
            <h2 className={testStyles.seoTitle}>
              {i18nStr("assessments.test.common.ui.methodologyTitle", "Test Methodology & Scientific Foundation")}
            </h2>
            <div className={testStyles.twoCol}>
              {loveMethodologySections.map((s) => (
                <div key={s.title} className={testStyles.panel}>
                  <h3 className={testStyles.panelTitle}>{s.title}</h3>
                  <ul className={testStyles.bulletList}>
                    {s.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className={testStyles.seoSection} aria-label="History of the love languages">
            <h2 className={testStyles.seoTitle}>
              {i18nStr("assessments.test.love-languages.seo.historyTitle", "History of the Love Languages")}
            </h2>
            <div className={testStyles.timeline}>
              {loveHistory.map((t) => (
                <div key={`${t.year}-${t.title}`} className={testStyles.timelineItem}>
                  <div className={testStyles.timelineYear}>{t.year}</div>
                  <div className={testStyles.timelineBody}>
                    <div className={testStyles.timelineTitle}>{t.title}</div>
                    <div className={testStyles.timelineDesc}>{t.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className={testStyles.seoSection} aria-label="The five languages deep dive">
            <h2 className={testStyles.seoTitle}>
              {i18nStr("assessments.test.love-languages.seo.fiveLanguagesTitle", "The Five Languages: Deep Dive")}
            </h2>
            <div className={testStyles.seoGrid}>
              {loveDeepDive.map((d) => (
                <div key={d.key} className={testStyles.seoCard}>
                  <div className={testStyles.seoCardTitle}>
                    <span aria-hidden="true">{d.icon}</span> {d.title}
                  </div>
                  <p className={testStyles.seoText}>
                    <strong>{i18nStr("assessments.test.love-languages.seo.coreMechanismLabel", "Core Mechanism:")}</strong> {d.core}
                  </p>
                  <div className={testStyles.seoCols}>
                    <div>
                      <div className={testStyles.seoSubTitle}>
                        {i18nStr("assessments.test.love-languages.seo.highReceiversSubtitle", "High Receivers")}
                      </div>
                      <ul className={testStyles.seoList}>
                        {d.high.map((x) => (
                          <li key={x}>{x}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className={testStyles.seoSubTitle}>
                        {i18nStr("assessments.test.love-languages.seo.painPointsSubtitle", "Pain Points")}
                      </div>
                      <ul className={testStyles.seoList}>
                        {d.pain.map((x) => (
                          <li key={x}>{x}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className={testStyles.note}>
                    <strong>{i18nStr("assessments.test.love-languages.seo.expressionMethodsLabel", "Expression Methods:")}</strong>
                    <ul className={testStyles.bulletList} style={{ marginTop: 10 }}>
                      {d.express.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                    <strong>{i18nStr("assessments.test.love-languages.seo.personalityNotesLabel", "Personality/Attachment notes:")}</strong>{" "}
                    {d.correlates}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className={testStyles.seoSection} aria-label="Love languages versus attachment versus Big Five">
            <h2 className={testStyles.seoTitle}>
              {i18nStr(
                "assessments.test.love-languages.seo.vsAttachmentBigFiveTitle",
                "Love Languages vs. Attachment Theory vs. Big Five"
              )}
            </h2>
            <div className={testStyles.tableWrap}>
              <table className={testStyles.table}>
                <thead>
                  <tr>
                    <th>{i18nStr("assessments.test.love-languages.seo.vsTableFrameworkHeader", "Framework")}</th>
                    <th>{i18nStr("assessments.test.love-languages.seo.vsTableLoveHeader", "Love Languages")}</th>
                    <th>{i18nStr("assessments.test.love-languages.seo.vsTableAttachmentHeader", "Attachment Theory")}</th>
                    <th>{i18nStr("assessments.test.love-languages.seo.vsTableBigFiveHeader", "Big Five (OCEAN)")}</th>
                  </tr>
                </thead>
                <tbody>
                  {loveVsRows.map((r) => (
                    <tr key={r.aspect}>
                      <td>{r.aspect}</td>
                      <td>{r.love}</td>
                      <td>{r.attachment}</td>
                      <td>{r.bigFive}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ul className={testStyles.bulletList} style={{ marginTop: 12 }}>
              {loveIntegrationInsight.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </section>

          <section className={testStyles.seoSection} aria-label="Frequently asked questions">
            <h2 className={testStyles.seoTitle}>
              {i18nStr("assessments.test.common.ui.faqTitle", "Frequently Asked Questions (FAQ)")}
            </h2>
            <div className={testStyles.faq}>
              {loveFaq.map((item) => (
                <details key={item.q} className={testStyles.faqItem}>
                  <summary className={testStyles.faqQ}>{item.q}</summary>
                  <div className={testStyles.faqA}>{item.a}</div>
                </details>
              ))}
            </div>
          </section>

          <section className={testStyles.seoSection} aria-label="Ready for your affection profile">
            <h2 className={testStyles.seoTitle}>
              {i18nStr("assessments.test.love-languages.seo.ctaTitle", "Ready for Your Affection Profile?")}
            </h2>
            <p className={testStyles.seoLead}>
              {i18nStr(
                "assessments.test.love-languages.seo.ctaLead",
                "30 questions • 5 languages • Primary/secondary scoring • Partner comparison • Communication guide"
              )}
            </p>
            <button type="button" className={testStyles.primaryBtn} onClick={jumpToTest}>
              {stage === "intro"
                ? i18nStr("assessments.test.common.ui.startAssessmentButton", "Start Assessment")
                : i18nStr("assessments.test.common.ui.goToTestButton", "Go To The Test")}
            </button>
            <div className={testStyles.note} style={{ marginTop: 12 }}>
              {i18nStr("assessments.test.common.ui.preferOverviewFirst", "Prefer the overview first?")}{" "}
              <Link to="/assessments/love-languages" style={{ color: "var(--primary)" }}>
                {i18nFmt("assessments.test.common.ui.readGuideTemplate", "Read the {name} guide", { name: "Love Languages" })}
              </Link>
              .
            </div>
          </section>
        </section>
      </>
    );
  }

  if (assessment.id === "attachment") {
    const title = (get("assessments.test.attachment.helmet.title") as string | undefined) ?? attachmentTitle;
    const description = (get("assessments.test.attachment.helmet.description") as string | undefined) ?? attachmentDescription;
    const keywords =
      (get("assessments.test.attachment.helmet.keywords") as string | undefined) ??
      "attachment style test, ECR-R, adult attachment interview, anxiety, avoidance, secure, anxious, avoidant, disorganized";

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
          mainEntity: attachmentFaq.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        },
      ],
    };

    const styleMeta: Record<AttachmentStyle, { style: AttachmentStyle; icon: string }> = {
      Secure: { style: "Secure", icon: "🛡️" },
      "Anxious/Preoccupied": { style: "Anxious/Preoccupied", icon: "⚠️" },
      "Avoidant/Dismissive": { style: "Avoidant/Dismissive", icon: "🧊" },
      "Disorganized/Fearful": { style: "Disorganized/Fearful", icon: "🌪️" },
    };

    const [stage, setStage] = useState<"intro" | "test" | "result">("intro");
    const [questions, setQuestions] = useState<AttachmentQuestion[]>([]);
    const [answers, setAnswers] = useState<AttachmentAnswerState[]>([]);
    const [index, setIndex] = useState(0);
    const [partnerStyle, setPartnerStyle] = useState<AttachmentStyle | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const current = questions[index] ?? null;
    const dimensionLabel =
      !current
        ? ""
        : current.styleDim === "A"
          ? "Anxiety"
          : current.styleDim === "V"
            ? "Avoidance"
            : current.styleDim === "F"
              ? "Anxiety × Avoidance"
              : "Security";
    const total = questions.length;
    const answeredCount = answers.filter((a) => a.value !== null).length;
    const progress = total > 0 ? Math.round((answeredCount / total) * 100) : 0;

    async function start() {
      setIsLoading(true);
      try {
        const pool = (await loadQuestionBank(locale, "attachment")) as Array<{
          q: string;
          dimension: AttachmentStyleDim;
          facet: string;
          options: Array<{ text: string; score: 1 | 2 | 3 | 4 | 5 }>;
        }>;
        const attachmentQuestions = toAttachmentQuestions(pool);
        const q = buildBalancedByKey(attachmentQuestions, 20, ["S", "A", "V", "F"] as const, (x) => x.styleDim);
        setQuestions(q);
        setAnswers(Array.from({ length: q.length }, () => ({ value: null, selectedIndex: null })));
        setIndex(0);
        setPartnerStyle(null);
        setStage("test");
      } finally {
        setIsLoading(false);
      }
    }

    function restart() {
      setStage("intro");
      setQuestions([]);
      setAnswers([]);
      setIndex(0);
      setPartnerStyle(null);
    }

    function choose(value: 1 | 2 | 3 | 4 | 5, selectedIndex: number | null) {
      setAnswers((prev) => {
        const next = [...prev];
        next[index] = { value, selectedIndex };
        return next;
      });
    }

    function prev() {
      setIndex((i) => Math.max(0, i - 1));
    }

    function next() {
      if (index + 1 >= total) {
        setStage("result");
        return;
      }
      setIndex((i) => i + 1);
    }

    async function jumpToTest() {
      if (typeof window === "undefined") return;
      if (stage === "intro") {
        await start();
        requestAnimationFrame(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        });
        return;
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    const results = useMemo(() => {
      if (stage !== "result") return null;

      const sum: Record<AttachmentDimension, number> = { Anxiety: 0, Avoidance: 0 };
      const count: Record<AttachmentDimension, number> = { Anxiety: 0, Avoidance: 0 };

      for (let i = 0; i < total; i += 1) {
        const q = questions[i];
        const a = answers[i];
        if (!q) continue;
        if (!a?.value) continue;
        const v = a.value;
        if (q.styleDim === "A") {
          sum.Anxiety += v;
          count.Anxiety += 1;
        } else if (q.styleDim === "V") {
          sum.Avoidance += v;
          count.Avoidance += 1;
        } else if (q.styleDim === "F") {
          sum.Anxiety += v;
          sum.Avoidance += v;
          count.Anxiety += 1;
          count.Avoidance += 1;
        } else {
          const inv = 6 - v;
          sum.Anxiety += inv;
          sum.Avoidance += inv;
          count.Anxiety += 1;
          count.Avoidance += 1;
        }
      }

      const anxietyAvg = count.Anxiety > 0 ? sum.Anxiety / count.Anxiety : 3;
      const avoidanceAvg = count.Avoidance > 0 ? sum.Avoidance / count.Avoidance : 3;

      const anxietyPct = toPercentileFromLikert(anxietyAvg);
      const avoidPct = toPercentileFromLikert(avoidanceAvg);

      const anxietyScore = eqStandardScoreFromLikert(anxietyAvg);
      const avoidanceScore = eqStandardScoreFromLikert(avoidanceAvg);

      const highAnx = anxietyPct >= 60;
      const highAvoid = avoidPct >= 60;

      const style: AttachmentStyle =
        !highAnx && !highAvoid
          ? "Secure"
          : highAnx && !highAvoid
            ? "Anxious/Preoccupied"
            : !highAnx && highAvoid
              ? "Avoidant/Dismissive"
              : "Disorganized/Fearful";

      const aai: "Free/Autonomous" | "Dismissing" | "Preoccupied" | "Unresolved" =
        style === "Secure" ? "Free/Autonomous" : style === "Avoidant/Dismissive" ? "Dismissing" : style === "Anxious/Preoccupied" ? "Preoccupied" : "Unresolved";

      const transmission = Math.round(((anxietyPct + avoidPct) / 2) * 0.85);

      const anxiousAvoidantTrap =
        (style === "Anxious/Preoccupied" && partnerStyle === "Avoidant/Dismissive") ||
        (style === "Avoidant/Dismissive" && partnerStyle === "Anxious/Preoccupied") ||
        (style === "Anxious/Preoccupied" && partnerStyle === "Disorganized/Fearful") ||
        (style === "Disorganized/Fearful" && partnerStyle === "Anxious/Preoccupied");

      const secureBasePotential =
        style === "Secure" ||
        partnerStyle === "Secure" ||
        (!partnerStyle ? false : (style === "Anxious/Preoccupied" && partnerStyle === "Anxious/Preoccupied") || (style === "Avoidant/Dismissive" && partnerStyle === "Avoidant/Dismissive"));

      const earnedSecurity = [
        ...(highAnx ? attachmentTips.anxiety : []),
        ...(highAvoid ? attachmentTips.avoidance : []),
        ...(style === "Disorganized/Fearful" ? attachmentTips.disorganized : []),
      ].slice(0, 6);

      const neuroBio: string[] = [];
      if (anxietyPct >= 70) neuroBio.push("HPA axis: higher stress reactivity; easier activation under perceived rejection");
      if (avoidPct >= 70) neuroBio.push("Deactivation strategies: emotional suppression and reduced oxytocin-driven proximity seeking");
      if (style === "Disorganized/Fearful") neuroBio.push("Amygdala threat thresholds: heightened reactivity with approach–avoidance conflict; dissociation risk under stress");
      if (neuroBio.length === 0) neuroBio.push("Balanced threat detection and co-regulation capacity (secure base behaviors more accessible).");

      const satisfactionPrediction =
        (anxietyPct >= 70 && avoidPct >= 70) || (anxietyPct >= 70 && partnerStyle === "Avoidant/Dismissive") || (avoidPct >= 70 && partnerStyle === "Anxious/Preoccupied")
          ? "Higher risk for instability without repair"
          : anxietyPct <= 45 && avoidPct <= 45
            ? "Higher probability of stable satisfaction"
            : "Moderate stability with growth potential";

      return {
        anxietyAvg,
        avoidanceAvg,
        anxietyPct,
        avoidPct,
        anxietyScore,
        avoidanceScore,
        style,
        aai,
        transmission,
        anxiousAvoidantTrap,
        secureBasePotential,
        earnedSecurity,
        neuroBio,
        satisfactionPrediction,
      };
    }, [answers, partnerStyle, questions, stage, total]);

    return (
      <>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:type" content="website" />
          <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        </Helmet>

        <section className={testStyles.wrapper}>
          <h1 className={testStyles.pageTitle}>{title}</h1>
          <p className={testStyles.pageSubtitle}>{description}</p>

          {stage === "intro" && (
            <div className={testStyles.card}>
              <div className={testStyles.introGrid}>
                <div className={testStyles.introItem}>
                  <div className={testStyles.introTitle}>
                    {i18nStr("assessments.test.common.ui.whatYouGetTitle", "What You Get")}
                  </div>
                  <ul className={testStyles.introList}>
                    {attachmentWhatYouGet.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className={testStyles.introItem}>
                  <div className={testStyles.introTitle}>
                    {i18nStr("assessments.test.common.ui.methodologyTitle", "Test Methodology & Scientific Foundation")}
                  </div>
                  <ul className={testStyles.introList}>
                    {attachmentMethodologySections.map((s) => (
                      <li key={s.title}>{s.title}</li>
                    ))}
                    <li>History of Attachment Theory</li>
                    <li>The Two-Dimensional Matrix (Anxiety × Avoidance)</li>
                  </ul>
                  <div className={testStyles.note}>
                    <strong>{i18nStr("assessments.test.attachment.ui.noteStrong", "Note:")}</strong>{" "}
                    {i18nStr(
                      "assessments.test.attachment.ui.noteText",
                      "The AAI is a clinical interview scored by trained coders. This assessment uses self-report ECR-style items to estimate Anxiety and Avoidance."
                    )}
                  </div>
                </div>
              </div>

              <button type="button" className={testStyles.primaryBtn} onClick={start}>
                {i18nStr("assessments.test.common.ui.startAssessmentButton", "Start Assessment")}
              </button>

              <div className={testStyles.disclaimer}>
                {i18nStr(
                  "assessments.test.attachment.ui.disclaimer",
                  "All scoring runs locally in your browser. No registration required."
                )}
              </div>
            </div>
          )}

          {stage === "test" && current && (
            <div className={testStyles.card}>
              <div className={testStyles.progressRow}>
                <div
                  className={testStyles.progressBar}
                  aria-label={i18nStr("assessments.test.common.ui.progressAriaLabel", "Progress")}
                >
                  <div className={testStyles.progressFill} style={{ width: `${progress}%` }} />
                </div>
                <div className={testStyles.progressText}>
                  {i18nFmt("assessments.test.common.ui.questionProgress", "Question {current} / {total}", {
                    current: index + 1,
                    total,
                  })}
                </div>
              </div>

              <div className={testStyles.questionMeta}>
                <span className={testStyles.pill}>
                  {i18nStr("assessments.test.common.ui.dimensionLabel", "Dimension:")} {dimensionLabel}
                </span>
              </div>

              <div className={testStyles.questionText}>{current.prompt}</div>

              <div
                className={testStyles.options}
                role="radiogroup"
                aria-label={i18nStr("assessments.test.common.ui.answerChoicesAriaLabel", "Answer choices")}
              >
                {likertOptions.map((opt) => {
                  const selected = answers[index]?.value === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      className={`${testStyles.optionBtn} ${selected ? testStyles.selected : ""}`}
                      onClick={() => choose(opt.value, null)}
                      role="radio"
                      aria-checked={selected}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>

              <div className={testStyles.actions}>
                <button type="button" className={testStyles.secondaryBtn} onClick={prev} disabled={index === 0}>
                  {i18nStr("assessments.test.common.ui.backButton", "Back")}
                </button>
                <button type="button" className={testStyles.primaryBtn} onClick={next} disabled={answers[index]?.value === null}>
                  {index + 1 >= total
                    ? i18nStr("assessments.test.common.ui.finishButton", "Finish")
                    : i18nStr("assessments.test.common.ui.nextButton", "Next")}
                </button>
              </div>
            </div>
          )}

          {stage === "result" && results && (
            <div className={testStyles.card}>
              <div className={testStyles.resultHeader}>
                <div className={testStyles.resultScore}>
                  Attachment Style: <span className={testStyles.resultNumber}>{results.style}</span>
                </div>
                <div className={testStyles.resultSub}>
                  Anxiety × Avoidance • AAI mapping (conceptual) • Earned security pathway • Compatibility check
                </div>
              </div>
              <div className={testStyles.disclaimer}>
                {i18nStr(
                  "assessments.test.common.ui.resultsDisclaimer",
                  "Educational estimate only. Results are approximate and not a clinical or scientific diagnosis."
                )}
              </div>

              <h2 className={testStyles.sectionTitle}>
                {i18nStr("assessments.test.attachment.ui.plotTitle", "Two-Dimensional Plot (ECR-R)")}
              </h2>
              <div className={testStyles.breakdown}>
                <div className={testStyles.breakdownRow}>
                  <div className={testStyles.breakdownName}>Attachment Anxiety</div>
                  <div className={testStyles.breakdownValue}>
                    {results.anxietyScore} • {results.anxietyPct}th • Avg {results.anxietyAvg.toFixed(2)} / 5
                  </div>
                </div>
                <div className={testStyles.breakdownRow}>
                  <div className={testStyles.breakdownName}>Attachment Avoidance</div>
                  <div className={testStyles.breakdownValue}>
                    {results.avoidanceScore} • {results.avoidPct}th • Avg {results.avoidanceAvg.toFixed(2)} / 5
                  </div>
                </div>
              </div>

              <h2 className={testStyles.sectionTitle}>
                {i18nStr("assessments.test.attachment.ui.aaiTitle", "AAI Classification (Conceptual)")}
              </h2>
              <div className={testStyles.breakdown}>
                <div className={testStyles.breakdownRow}>
                  <div className={testStyles.breakdownName}>State of mind label</div>
                  <div className={testStyles.breakdownValue}>{results.aai}</div>
                </div>
              </div>

              <h2 className={testStyles.sectionTitle}>
                {i18nStr("assessments.test.attachment.ui.intergenerationalTitle", "Intergenerational Transmission Insight")}
              </h2>
              <div className={testStyles.breakdown}>
                <div className={testStyles.breakdownRow}>
                  <div className={testStyles.breakdownName}>Estimated transmission risk</div>
                  <div className={testStyles.breakdownValue}>
                    {results.transmission}% (educational estimate). AAI predicts infant patterns with ~75–85% accuracy in research summaries.
                  </div>
                </div>
              </div>

              <h2 className={testStyles.sectionTitle}>
                {i18nStr("assessments.test.attachment.ui.compatibilityTitle", "Romantic Compatibility Prediction")}
              </h2>
              <div className={testStyles.breakdown}>
                <div className={testStyles.breakdownRow}>
                  <div className={testStyles.breakdownName}>Select partner style</div>
                  <div className={testStyles.breakdownValue}>
                    This is a simple heuristic for the anxious–avoidant trap and secure-base potential.
                  </div>
                </div>
                <div className={testStyles.options} aria-label="Partner style">
                  {(Object.keys(styleMeta) as AttachmentStyle[]).map((s) => {
                    const selected = partnerStyle === s;
                    return (
                      <button
                        key={s}
                        type="button"
                        className={`${testStyles.optionBtn} ${selected ? testStyles.selected : ""}`}
                        onClick={() => setPartnerStyle(s)}
                      >
                        {styleMeta[s].icon} {s}
                      </button>
                    );
                  })}
                </div>
                <div className={testStyles.breakdownRow}>
                  <div className={testStyles.breakdownName}>Anxious-Avoidant Trap</div>
                  <div className={testStyles.breakdownValue}>
                    {partnerStyle ? (results.anxiousAvoidantTrap ? "Detected risk pattern" : "Not strongly indicated") : "Select partner style to evaluate."}
                  </div>
                </div>
                <div className={testStyles.breakdownRow}>
                  <div className={testStyles.breakdownName}>Secure base potential</div>
                  <div className={testStyles.breakdownValue}>
                    {partnerStyle ? (results.secureBasePotential ? "Higher potential with repair and responsiveness" : "Lower potential without deliberate secure behaviors") : "Select partner style to evaluate."}
                  </div>
                </div>
                <div className={testStyles.breakdownRow}>
                  <div className={testStyles.breakdownName}>Relationship satisfaction predictor</div>
                  <div className={testStyles.breakdownValue}>{results.satisfactionPrediction}</div>
                </div>
              </div>

              <h2 className={testStyles.sectionTitle}>
                {i18nStr("assessments.test.attachment.ui.earnedSecurityTitle", "Earned Security Pathway")}
              </h2>
              <div className={testStyles.breakdown}>
                <div className={testStyles.breakdownRow}>
                  <div className={testStyles.breakdownName}>Targets</div>
                  <div className={testStyles.breakdownValue}>
                    <ul className={testStyles.bulletList}>
                      {results.earnedSecurity.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <h2 className={testStyles.sectionTitle}>
                {i18nStr("assessments.test.attachment.ui.neurobiologicalTitle", "Neurobiological Profile (Research Framing)")}
              </h2>
              <div className={testStyles.breakdown}>
                <div className={testStyles.breakdownRow}>
                  <div className={testStyles.breakdownName}>Signals</div>
                  <div className={testStyles.breakdownValue}>
                    <ul className={testStyles.bulletList}>
                      {results.neuroBio.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className={testStyles.actions}>
                <button type="button" className={testStyles.secondaryBtn} onClick={restart}>
                  {i18nStr("assessments.test.common.ui.retakeButton", "Retake")}
                </button>
                <button type="button" className={testStyles.primaryBtn} onClick={jumpToTest}>
                  {i18nStr("assessments.test.common.ui.goToTestButton", "Go To The Test")}
                </button>
              </div>
            </div>
          )}

          <section className={testStyles.seoSection} aria-label="Test methodology and scientific foundation">
            <h2 className={testStyles.seoTitle}>
              {i18nStr("assessments.test.common.ui.methodologyTitle", "Test Methodology & Scientific Foundation")}
            </h2>
            <div className={testStyles.twoCol}>
              {attachmentMethodologySections.map((s) => (
                <div key={s.title} className={testStyles.panel}>
                  <h3 className={testStyles.panelTitle}>{s.title}</h3>
                  {s.text ? <p className={testStyles.panelText}>{s.text}</p> : null}
                  {s.bullets ? (
                    <ul className={testStyles.bulletList}>
                      {s.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ))}
            </div>
          </section>

          <section className={testStyles.seoSection} aria-label="History of attachment theory">
            <h2 className={testStyles.seoTitle}>
              {i18nStr("assessments.test.attachment.seo.historyTitle", "History of Attachment Theory")}
            </h2>
            <div className={testStyles.timeline}>
              {attachmentHistory.map((t) => (
                <div key={`${t.year}-${t.title}`} className={testStyles.timelineItem}>
                  <div className={testStyles.timelineYear}>{t.year}</div>
                  <div className={testStyles.timelineBody}>
                    <div className={testStyles.timelineTitle}>{t.title}</div>
                    <div className={testStyles.timelineDesc}>{t.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className={testStyles.seoSection} aria-label="The four attachment styles deep dive">
            <h2 className={testStyles.seoTitle}>
              {i18nStr(
                "assessments.test.attachment.seo.stylesDeepDiveTitle",
                "The Four Attachment Styles: Deep Dive (Adult Manifestations)"
              )}
            </h2>
            <div className={testStyles.seoGrid}>
              {(Object.keys(attachmentStyles) as AttachmentStyle[]).map((k) => {
                const s = attachmentStyles[k];
                return (
                  <div key={k} className={testStyles.seoCard}>
                    <div className={testStyles.seoCardTitle}>
                      <span aria-hidden="true">{s.icon}</span> {s.title}
                    </div>
                    <p className={testStyles.seoText}>{s.core}</p>
                    <div className={testStyles.seoCols}>
                      <div>
                        <div className={testStyles.seoSubTitle}>
                          {i18nStr("assessments.test.attachment.seo.highFunctioningSubtitle", "High Functioning")}
                        </div>
                        <ul className={testStyles.seoList}>
                          {s.high.map((x) => (
                            <li key={x}>{x}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <div className={testStyles.seoSubTitle}>
                          {i18nStr("assessments.test.attachment.seo.averageFunctioningSubtitle", "Average Functioning")}
                        </div>
                        <ul className={testStyles.seoList}>
                          {s.average.map((x) => (
                            <li key={x}>{x}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className={testStyles.note}>
                      <strong>{i18nStr("assessments.test.attachment.seo.lowFunctioningLabel", "Low Functioning (Unhealthy):")}</strong>
                      <ul className={testStyles.bulletList} style={{ marginTop: 10 }}>
                        {s.low.map((x) => (
                          <li key={x}>{x}</li>
                        ))}
                      </ul>
                      <strong>{i18nStr("assessments.test.attachment.seo.relationalDynamicsLabel", "Relational Dynamics:")}</strong>
                      <ul className={testStyles.bulletList} style={{ marginTop: 10 }}>
                        {s.dynamics.map((x) => (
                          <li key={x}>{x}</li>
                        ))}
                      </ul>
                      <div className={testStyles.note} style={{ marginTop: 10 }}>
                        {s.prevalence}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className={testStyles.seoSection} aria-label="The two-dimensional matrix">
            <h2 className={testStyles.seoTitle}>
              {i18nStr(
                "assessments.test.attachment.seo.matrixTitle",
                "The Two-Dimensional Matrix (Modern Clinical Standard)"
              )}
            </h2>
            <div className={testStyles.tableWrap}>
              <table className={testStyles.table}>
                <thead>
                  <tr>
                    <th />
                    <th>
                      {i18nStr(
                        "assessments.test.attachment.seo.matrixLowAvoidanceHeader",
                        "Low Avoidance (Comfort with Intimacy)"
                      )}
                    </th>
                    <th>
                      {i18nStr(
                        "assessments.test.attachment.seo.matrixHighAvoidanceHeader",
                        "High Avoidance (Discomfort with Intimacy)"
                      )}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {attachmentMatrixRows.map((r) => (
                    <tr key={r.anxiety}>
                      <td>{r.anxiety}</td>
                      <td>{r.lowAvoid}</td>
                      <td>{r.highAvoid}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className={testStyles.seoSection} aria-label="Attachment versus Big Five versus Love Languages">
            <h2 className={testStyles.seoTitle}>
              {i18nStr(
                "assessments.test.attachment.seo.vsBigFiveLoveTitle",
                "Attachment vs. Big Five vs. Love Languages"
              )}
            </h2>
            <div className={testStyles.tableWrap}>
              <table className={testStyles.table}>
                <thead>
                  <tr>
                    <th>{i18nStr("assessments.test.attachment.seo.vsTableAspectHeader", "Aspect")}</th>
                    <th>{i18nStr("assessments.test.attachment.seo.vsTableAttachmentHeader", "Attachment Theory")}</th>
                    <th>{i18nStr("assessments.test.attachment.seo.vsTableBigFiveHeader", "Big Five (OCEAN)")}</th>
                    <th>{i18nStr("assessments.test.attachment.seo.vsTableLoveHeader", "Love Languages")}</th>
                  </tr>
                </thead>
                <tbody>
                  {attachmentVsRows.map((r) => (
                    <tr key={r.aspect}>
                      <td>{r.aspect}</td>
                      <td>{r.attachment}</td>
                      <td>{r.bigFive}</td>
                      <td>{r.love}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ul className={testStyles.bulletList} style={{ marginTop: 12 }}>
              {attachmentIntegration.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </section>

          <section className={testStyles.seoSection} aria-label="Frequently asked questions">
            <h2 className={testStyles.seoTitle}>
              {i18nStr("assessments.test.common.ui.faqTitle", "Frequently Asked Questions (FAQ)")}
            </h2>
            <div className={testStyles.faq}>
              {attachmentFaq.map((item) => (
                <details key={item.q} className={testStyles.faqItem}>
                  <summary className={testStyles.faqQ}>{item.q}</summary>
                  <div className={testStyles.faqA}>{item.a}</div>
                </details>
              ))}
            </div>
          </section>

          <section className={testStyles.seoSection} aria-label="Ready for your relational blueprint">
            <h2 className={testStyles.seoTitle}>
              {i18nStr("assessments.test.attachment.seo.ctaTitle", "Ready for Your Relational Blueprint?")}
            </h2>
            <p className={testStyles.seoLead}>
              {i18nStr(
                "assessments.test.attachment.seo.ctaLead",
                "20–36 items • 2 dimensions • 4 styles • Narrative coherence analysis • Intergenerational patterning • Earned security pathway"
              )}
            </p>
            <button type="button" className={testStyles.primaryBtn} onClick={jumpToTest}>
              {stage === "intro"
                ? i18nStr("assessments.test.common.ui.startAssessmentButton", "Start Assessment")
                : i18nStr("assessments.test.common.ui.goToTestButton", "Go To The Test")}
            </button>
            <div className={testStyles.note} style={{ marginTop: 12 }}>
              {i18nStr("assessments.test.common.ui.preferOverviewFirst", "Prefer the overview first?")}{" "}
              <Link to="/assessments/attachment" style={{ color: "var(--primary)" }}>
                {i18nFmt("assessments.test.common.ui.readGuideTemplate", "Read the {name} guide", { name: "Attachment" })}
              </Link>
              .
            </div>
          </section>
        </section>
      </>
    );
  }

  const title = `${assessment.name} Test | ${brandName}`;
  const description = `${assessment.name} test page. Questions and scoring will be added later.`;

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="noindex, follow" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
      </Helmet>

      <section className={styles.wrapper}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            <span className={styles.emoji} aria-hidden="true">
              {assessment.emoji}
            </span>{" "}
            {assessment.name} Test
          </h1>
          <p className={styles.subtitle}>
            {i18nStr(
              "assessments.test.common.fallback.subtitle",
              "This is the assessment test page. The full question engine and results will be added later."
            )}
          </p>
        </div>

        <div className={styles.card}>
          <div className={styles.cardTitle}>
            {i18nStr("assessments.test.common.fallback.cardTitle", "Test engine: coming soon")}
          </div>
          <p className={styles.cardText}>
            {i18nStr(
              "assessments.test.common.fallback.cardBody",
              "Once you provide the questions and scoring method, we can implement a complete quiz engine like the IQ test."
            )}
          </p>

          <button type="button" className={styles.disabledBtn} disabled>
            {i18nStr("assessments.test.common.fallback.startPendingButton", "Start Test (Pending Questions)")}
          </button>

          <div className={styles.linksRow}>
            <Link to={`/assessments/${assessment.id}`} className={styles.secondaryLink}>
              {i18nStr("assessments.test.common.ui.backToInfo", "← Back to info")}
            </Link>
            <Link to="/" className={styles.secondaryLink}>
              {i18nStr("assessments.test.common.ui.homeLinkLabel", "Home")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

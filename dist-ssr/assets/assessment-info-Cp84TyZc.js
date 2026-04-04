import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { H as Helmet } from "./vendor-BMz5C6pv.js";
import { useParams, Navigate, Link } from "react-router-dom";
import { g as getAssessmentById, a as assessments } from "./iq-test-page-BIOHOohz.js";
import { u as useI18n, h as homeStyles } from "./home-Hplm1lpP.js";
const wrapper = "_wrapper_tklek_1";
const header = "_header_tklek_5";
const title = "_title_tklek_9";
const emoji = "_emoji_tklek_15";
const subtitle = "_subtitle_tklek_19";
const card = "_card_tklek_25";
const cardTitle = "_cardTitle_tklek_34";
const cardText = "_cardText_tklek_39";
const primaryLink = "_primaryLink_tklek_44";
const disabledBtn = "_disabledBtn_tklek_54";
const linksRow = "_linksRow_tklek_64";
const secondaryLink = "_secondaryLink_tklek_72";
const section = "_section_tklek_78";
const sectionTitle = "_sectionTitle_tklek_87";
const grid = "_grid_tklek_91";
const gridCard = "_gridCard_tklek_97";
const gridTitle = "_gridTitle_tklek_107";
const gridDesc = "_gridDesc_tklek_112";
const styles = {
  wrapper,
  header,
  title,
  emoji,
  subtitle,
  card,
  cardTitle,
  cardText,
  primaryLink,
  disabledBtn,
  linksRow,
  secondaryLink,
  section,
  sectionTitle,
  grid,
  gridCard,
  gridTitle,
  gridDesc
};
const mbtiBadges = ["🔬 Jungian-based theory", "🧠 Cognitive functions analysis", "📈 Personal growth roadmap", "🔒 Confidential results"];
const bigFiveBadges = [
  "🔬 Empirically validated across cultures",
  "🧠 Facet-level precision",
  "📈 Predictive of life outcomes (career, relationships, health)",
  "🔒 Research-grade privacy"
];
const bigFiveDimensions = [
  {
    icon: "🎨",
    title: "1. Openness to Experience (Intellect/Imagination)",
    summary: "Curiosity • Creativity • Preference for novelty • Abstract thinking",
    high: "Imaginative, artistic, intellectually curious; loves complex ideas and creative pursuits; comfortable with ambiguity and unconventional thinking.",
    low: "Practical, traditional, prefers concrete facts; enjoys routine and familiar experiences; down-to-earth, focused on execution.",
    facets: "Fantasy, Aesthetics, Feelings, Actions, Ideas, Values"
  },
  {
    icon: "📋",
    title: "2. Conscientiousness (Self-Discipline)",
    summary: "Organization • Dependability • Goal-orientation • Impulse control",
    high: "Organized, thorough, plans ahead; strong sense of duty and self-discipline; persistent, achievement-striving, detail-oriented.",
    low: "Flexible, spontaneous, prefers casual approaches; may procrastinate or be less organized; adaptable, lives in the moment.",
    facets: "Competence, Order, Dutifulness, Achievement Striving, Self-Discipline, Deliberation"
  },
  {
    icon: "🗣️",
    title: "3. Extraversion (Positive Emotionality)",
    summary: "Sociability • Energy • Assertiveness • Reward sensitivity",
    high: "Energetic, talkative, enjoys social gatherings; positive emotions, enthusiasm, action-oriented; assertive, seeks stimulation and excitement.",
    low: "Reserved, reflective, prefers solitude; independent, steady temperament; listens more than speaks, deep focus.",
    facets: "Warmth, Gregariousness, Assertiveness, Activity, Excitement-Seeking, Positive Emotions"
  },
  {
    icon: "💝",
    title: "4. Agreeableness (Cooperation)",
    summary: "Trust • Altruism • Empathy • Conflict avoidance",
    high: "Cooperative, trusting, helpful and altruistic; empathetic, cares about others’ feelings; humble, avoids conflict, service-oriented.",
    low: "Competitive, skeptical, challenging; straightforward (sometimes blunt), self-interested; critical thinking, tough in negotiations.",
    facets: "Trust, Straightforwardness, Altruism, Compliance, Modesty, Tender-Mindedness"
  },
  {
    icon: "🛡️",
    title: "5. Neuroticism (Emotional Stability inverse)",
    summary: "Anxiety • Moodiness • Emotional volatility • Stress reactivity",
    high: "Experiences negative emotions frequently (worry, sadness, anger); sensitive to stress, mood fluctuations; perfectionistic concerns, risk-aware.",
    low: "Calm, secure, resilient under pressure; rarely anxious, emotionally even-keeled; confident, handles stress well.",
    facets: "Anxiety, Angry Hostility, Depression, Self-Consciousness, Impulsiveness, Vulnerability"
  }
];
const bigFiveApplications = [
  {
    title: "1. Career Alignment by Trait",
    text: "High Conscientiousness + High Openness often fits R&D. High Extraversion + High Agreeableness often fits Sales & HR. Match your profile to occupational demands.",
    benefits: "Job satisfaction, peak performance, sustainable career"
  },
  {
    title: "2. Optimize Learning Style",
    text: "High Openness learners need theoretical frameworks first; High Conscientiousness learners need structured curricula; Low Neuroticism handles exam pressure better.",
    benefits: "Faster skill acquisition, academic confidence"
  },
  {
    title: "3. Communication Calibration",
    text: "High Agreeableness: practice assertiveness. Low Agreeableness: practice diplomacy. High Neuroticism: validate emotions before problem-solving.",
    benefits: "Clearer boundaries, better teamwork"
  },
  {
    title: "4. Energy Management",
    text: "High Extraversion needs social breaks; Low Extraversion needs alone time to recharge. Respect your E-level for sustainable productivity.",
    benefits: "Prevent burnout, maintain flow states"
  },
  {
    title: "5. Stress Resilience Building",
    text: "If high Neuroticism: build routines (C) to create predictability. Practice mindfulness to reduce emotional reactivity.",
    benefits: "Emotional regulation, better health outcomes"
  },
  {
    title: "6. Sleep Hygiene by Personality",
    text: "High Conscientiousness naturally maintains sleep schedules. High Neuroticism benefits from worry journals before bed. High Openness benefits from wind-down routines.",
    benefits: "Sleep quality, cognitive restoration"
  },
  {
    title: "7. Relationship Compatibility",
    text: "Complementary traits often work best: High A with High A can mean harmony but conflict avoidance; High C with Low C can mean structure vs spontaneity tension.",
    benefits: "Relationship longevity, reduced conflict"
  },
  {
    title: "8. Leadership Development",
    text: "High C leaders excel at execution; High O leaders excel at vision; High E leaders excel at motivation. Develop your secondary traits for versatile leadership.",
    benefits: "Authentic influence, team trust"
  },
  {
    title: "9. Financial Decision Making",
    text: "High Conscientiousness = better saving. Low Conscientiousness needs automation. High Neuroticism = risk-averse investing. High Openness = prone to speculative investments.",
    benefits: "Financial stability, reduced money anxiety"
  },
  {
    title: "10. Remote Work Setup",
    text: "High C thrives with self-directed schedules. High E suffers in isolation—needs virtual co-working. High O needs stimulating environments.",
    benefits: "Productivity, work satisfaction"
  },
  {
    title: "11. Health Behavior Change",
    text: "High Conscientiousness sticks to exercise regimens. High Neuroticism needs stress management first. High Agreeableness benefits from workout partners.",
    benefits: "Physical health, longevity"
  },
  {
    title: "12. Creative Performance",
    text: "High Openness is primary for creativity, but High C is needed for completion. Low A helps critical editing of creative work.",
    benefits: "Creative output, innovation"
  },
  {
    title: "13. Conflict Resolution Strategy",
    text: "Low A individuals need to check competitiveness. High N individuals need to manage emotional flooding. High C individuals need to avoid rigidity.",
    benefits: "Effective mediation, preserved relationships"
  },
  {
    title: "14. Team Assembly",
    text: "Ideal teams need: High C for execution, High O for innovation, High A for cohesion, moderated E for communication, Low N for crisis stability.",
    benefits: "Team synergy, diverse problem-solving"
  },
  {
    title: "15. Personal Growth Targeting",
    text: "Choose ONE trait to develop over 6 months. If low C: build morning routines. If high N: practice cognitive reframing. If low O: expose yourself to new cuisines/art weekly.",
    benefits: "Measurable personality development, increased adaptability"
  }
];
const bigFiveChecklist = [
  "Measure baseline: Take test in your native language when well-rested (state affects trait measurement).",
  "Check facet scores: Don’t just look at broad traits—check if you’re high on Ideas but low on Art (common in scientists).",
  "Compare to population: Note your percentile ranks (e.g., 85th percentile in Conscientiousness = more disciplined than 85% of people).",
  "Identify shadow costs: High C may mean rigidity; High A may mean people-pleasing; High O may mean distractibility.",
  "Environment match: Ensure your job/relationship matches your top 2 traits and accommodates your bottom 1 vulnerabilities.",
  "Retest annually: Track stability or intentional changes. Major therapy or life events can shift scores meaningfully."
];
const discBadges = [
  "🔬 Observable behaviors (not internal traits)",
  "🎯 Workplace performance focused",
  "📈 Adaptability strategies",
  "🔒 Confidential professional profile"
];
const discDimensions = [
  {
    icon: "🎯",
    title: "D — Dominance (Results & Control)",
    summary: "Direct • Decisive • Competitive • Problem-solver • Risk-taker",
    high: "Fast-paced, task-focused, challenges the status quo; values results, efficiency, and bottom-line outcomes; comfortable with conflict, seeks authority and autonomy; impatient with details, wants the big picture now.",
    low: "Collaborative, cautious about change, researches before acting; values stability and consensus over quick wins; diplomatic, avoids direct confrontation when possible; patient with process, comfortable following leadership.",
    facets: "Challenge, Results, Action, Directness, Authority"
  },
  {
    icon: "🌟",
    title: "I — Influence (Enthusiasm & Interaction)",
    summary: "Optimistic • Persuasive • Social • Enthusiastic • Trusting",
    high: "Fast-paced, people-focused, loves collaboration and recognition; values enthusiasm, creativity, and building relationships; communicates with stories and emotions; dislikes isolation, routine, or complex data without context.",
    low: "Reserved, fact-based, skeptical until trust is earned; values privacy, data accuracy, and logical persuasion; prefers written communication; independent worker, comfortable with solitude.",
    facets: "Recognition, Enthusiasm, Interaction, Optimism, Persuasion"
  },
  {
    icon: "🤝",
    title: "S — Steadiness (Support & Stability)",
    summary: "Patient • Predictable • Supportive • Loyal • Good listener",
    high: "Slower-paced, people-focused, resistant to sudden change; values harmony, team cohesion, and steady routines; excellent active listener, builds deep long-term relationships; dislikes aggression, instability, or rushed decisions.",
    low: "Adaptable, thrives in variety, multitasks easily; values flexibility, innovation, and fast-paced environments; impatient with slow processes or repetitive tasks; comfortable with ambiguity and frequent changes.",
    facets: "Stability, Support, Listening, Loyalty, Consistency"
  },
  {
    icon: "📊",
    title: "C — Conscientiousness (Accuracy & Analysis)",
    summary: "Analytical • Systematic • Precise • Private • Quality-focused",
    high: "Slower-paced, task-focused, detail-oriented perfectionist; values accuracy, logic, and proven methodologies; plans thoroughly, minimizes risk, checks facts multiple times; dislikes casual errors, emotional decisions, or vague instructions.",
    low: "Big-picture thinker, delegates details, adaptable standards; values speed and quantity over perfect precision; comfortable with good enough to meet deadlines; flexible with rules if outcome is achieved.",
    facets: "Accuracy, Analysis, Quality, Compliance, Precision"
  }
];
const discStrategies = [
  {
    title: "1. Pace Yourself Correctly",
    text: "Fast styles (D & I): schedule thinking time before reacting. Slow styles (S & C): prepare for urgency by pre-planning contingencies.",
    benefits: "Reduced stress reactions, better decision quality"
  },
  {
    title: "2. Adapt to Your Audience",
    text: "Presenting to High D? Lead with results. High I? Start with a story. High S? Emphasize team impact. High C? Provide data first.",
    benefits: "Persuasion power, reduced miscommunication"
  },
  {
    title: "3. Conflict Resolution by Type",
    text: "With High D: be brief, focus on solutions. With High I: allow them to vent. With High S: show empathy and patience. With High C: stick to facts and logic.",
    benefits: "Faster resolution, preserved relationships"
  },
  {
    title: "4. Team Role Alignment",
    text: "Place High D in leadership/decision roles. High I in client relations. High S in support/HR roles. High C in quality control/analysis.",
    benefits: "Natural productivity, reduced turnover, job satisfaction"
  },
  {
    title: "5. Stress Management",
    text: "High D stress = loss of control. High I = loss of recognition. High S = instability. High C = criticism of work quality. Identify yours and create safeguards.",
    benefits: "Emotional resilience, sustained performance"
  },
  {
    title: "6. Communication Preferences",
    text: "D wants bullet points. I wants brainstorming sessions. S wants one-on-one check-ins. C wants written documentation. Match the medium to the recipient.",
    benefits: "Information retention, faster execution"
  },
  {
    title: "7. Leadership Flexibility",
    text: "If you're High D leading High S: slow down, explain why. If High C leading High I: allow social time, don't over-systematize creativity.",
    benefits: "Team morale, diverse talent retention"
  },
  {
    title: "8. Sales & Negotiation",
    text: "High D buyers: focus on ROI and speed. High I: popularity and vision. High S: support and guarantees. High C: specs and warranties.",
    benefits: "Higher close rates, customer satisfaction"
  },
  {
    title: "9. Project Management",
    text: "High D starts strong but may skip steps. High C plans perfectly but delays execution. Pair complementary styles or add a project manager who balances the team.",
    benefits: "On-time delivery, quality outcomes"
  },
  {
    title: "10. Remote Work Optimization",
    text: "High D needs autonomy and challenges. High I needs video calls and social channels. High S needs stable routines and clear expectations. High C needs detailed briefs and async focus time.",
    benefits: "Distributed team productivity"
  },
  {
    title: "11. Email Effectiveness",
    text: "D: subject line = action needed. I: warm greeting and context. S: personal connection and appreciation. C: structured bullets and attachments.",
    benefits: "Response rates, clarity"
  },
  {
    title: "12. Hiring & Onboarding",
    text: "Don’t hire clones. High-performing teams need all four styles. During onboarding, assign mentors who match the newcomer’s primary dimension.",
    benefits: "Faster integration, cultural fit"
  },
  {
    title: "13. Meeting Facilitation",
    text: "Control High D dominance by going around the room. Engage High I for brainstorming. Check High S comfort before decisions. Provide High C with pre-reads.",
    benefits: "Inclusive decisions, balanced participation"
  },
  {
    title: "14. Managing Up",
    text: "Boss High D: be brief, bring solutions. High I: share wins enthusiastically. High S: check in regularly, build rapport. High C: prepare data before meetings.",
    benefits: "Career advancement, better boss relationships"
  },
  {
    title: "15. Behavioral Flexibility Training",
    text: "Practice your opposite: If High D, practice active listening. If High C, practice making quick decisions with 70% information. Flexibility increases career longevity.",
    benefits: "Leadership readiness, adaptability"
  }
];
const discChecklist = [
  "Measure baseline: Take test thinking about your natural self (relaxed home environment), then adapted self (work stress).",
  "Identify your backup style: Most people are High in 1 dimension and Secondary in another (e.g., High D/Secondary C = Driver-Analyzer).",
  "Map your team: Create a DISC grid of your department to identify gaps (too many High Ds = conflict; too many High S = slow decisions).",
  "Check environment fit: Sales roles often need High I; Engineering needs High C; Surgery needs High D; Counseling needs High S.",
  "Adaptation energy: Note how draining it is to act opposite your style—plan recovery time.",
  "Retest after role change: New jobs often require temporary adaptation that can become permanent."
];
const enneagramBadges = [
  "🔬 Motivation-based (not behavior-based)",
  "🧠 Triad intelligence centers (Body/Heart/Head)",
  "📈 Health levels & integration paths",
  "🔒 Deep psychological privacy"
];
const enneagramTriads = [
  {
    title: "🔥 Gut Triad (8–9–1): The Body Center",
    coreEmotion: "Anger (manifested differently in each)",
    types: [
      {
        name: "8 — The Challenger (Protector)",
        fear: "Being controlled, harmed, vulnerable",
        desire: "Protecting self, being in control of destiny",
        pattern: "Denies vulnerability, expresses anger openly, enlarges self to dominate environment.",
        best: "Empowering leader, justice-seeker, magnanimous protector",
        worst: "Controlling, vengeful, violent aggression"
      },
      {
        name: "9 — The Peacemaker (Mediator)",
        fear: "Separation, conflict, being overlooked",
        desire: "Internal stability, peace of mind, harmony with others",
        pattern: 'Denies anger (numbs out), merges with others’ agendas, "forgotten" self.',
        best: "Unifying diplomat, patient reconciler, accepting presence",
        worst: "Stubborn passivity, dissociated, self-abandoning"
      },
      {
        name: "1 — The Reformer (Perfectionist)",
        fear: "Being corrupt, defective, wrong",
        desire: "Integrity, goodness, being right/beyond criticism",
        pattern: "Represses anger into resentment, critical inner voice, rigid standards.",
        best: "Ethical teacher, wise discernment, principled action",
        worst: "Judgmental rigidity, obsessive criticism, suppressed rage"
      }
    ]
  },
  {
    title: "💝 Heart Triad (2–3–4): The Feeling Center",
    coreEmotion: "Shame (identity/image based)",
    types: [
      {
        name: "2 — The Helper (Giver)",
        fear: "Being unloved, unwanted, worthless without serving",
        desire: "Being loved, needed, expressing feelings for others",
        pattern: 'Represses own needs, pride in being indispensable, manipulates through "helping".',
        best: "Unconditional generosity, intuitive caregiving, humble service",
        worst: "Martyrdom, possessive love, covert control through neediness"
      },
      {
        name: "3 — The Achiever (Performer)",
        fear: "Being worthless, failing, unadmired",
        desire: "Being valuable, successful, admired",
        pattern: "Represses feelings to perform, adapts persona to audience, efficiency over authenticity.",
        best: "Inspiring excellence, authentic achievement, motivating others",
        worst: "Deceptive image-management, exploitative narcissism, burnout emptiness"
      },
      {
        name: "4 — The Individualist (Romantic)",
        fear: "Having no identity, insignificance, mundane existence",
        desire: "Being unique, special, authentically understood",
        pattern: 'Absorbs shame into identity, envies others’ "normalcy," dwells in what is missing.',
        best: "Creative depth, emotional honesty, beauty-making, empathic witness",
        worst: "Melodramatic self-absorption, elitism, depression from envy"
      }
    ]
  },
  {
    title: "🧠 Head Triad (5–6–7): The Thinking Center",
    coreEmotion: "Fear (anxiety/security based)",
    types: [
      {
        name: "5 — The Investigator (Observer)",
        fear: "Being incompetent, overwhelmed, depleted by demands",
        desire: "Being capable, knowledgeable, self-sufficient",
        pattern: "Retracts from world to conserve energy, hoards resources/knowledge, detached observation.",
        best: "Pioneering genius, objective clarity, concentrated expertise",
        worst: "Schizoid isolation, arrogance, withholding stinginess"
      },
      {
        name: "6 — The Loyalist (Skeptic)",
        fear: "Being unsupported, abandoned, unable to survive alone",
        desire: "Security, guidance, reassurance",
        pattern: "Projects fear outward (paranoia) or seeks authority (submission), hyper-vigilant, tests loyalty.",
        best: "Committed teamwork, courageous questioning, faithful friendship",
        worst: "Panic-driven reactivity, authoritarian following, projection of blame"
      },
      {
        name: "7 — The Enthusiast (Epicure)",
        fear: "Being trapped in pain, deprived, limited by boredom",
        desire: "Freedom, happiness, variety of experience",
        pattern: "Reframes pain into positive, scatters attention to avoid depth, future-planning escape.",
        best: "Joyful appreciation, integrative vision, resilient optimism",
        worst: "Addiction to novelty, narcissistic hedonism, fleeing commitment"
      }
    ]
  }
];
const enneagramPaths = [
  {
    title: "1. Identify Your Wing",
    text: "You’re not pure type—you lean toward an adjacent number. Wings flavor your expression without changing core motivation.",
    benefits: "Nuanced self-understanding, explains variations within type"
  },
  {
    title: "2. Track Your Health Levels",
    text: "Learn healthy/average/unhealthy levels for your type. Notice when you drop under stress and what triggers it.",
    benefits: "Early warning system, emotional regulation"
  },
  {
    title: "3. Recognize Your Stress Line",
    text: "Each type disintegrates to another under stress (e.g., 1→4, 2→8, 3→9). Spotting this pattern breaks reactivity.",
    benefits: "Shorter recovery time from stress states"
  },
  {
    title: "4. Grow Toward Integration",
    text: "Security/integration lines show your growth path (e.g., 4→1, 5→8, 9→3). Practice those healthy traits.",
    benefits: "Accelerated maturity, balanced functioning"
  },
  {
    title: "5. Triad Balancing Practice",
    text: "Head types: body grounding. Gut types: emotional naming. Heart types: logic systems. Access all three centers.",
    benefits: "Access to all three intelligence centers"
  },
  {
    title: "6. Childhood Origin Exploration",
    text: "Each type formed as a protection strategy. Understanding the origin reduces shame and loosens old patterns.",
    benefits: "Self-compassion, releasing survival patterns"
  },
  {
    title: "7. Instinctual Variant Stacking",
    text: "Self-preservation (resources), One-to-one (intensity), Social (tribe). Stacking explains how your type shows up.",
    benefits: "Explains relationship patterns, career choices"
  },
  {
    title: "8. Typing Others Ethically",
    text: "Don’t use types to judge—use them to ask: what fear is driving this behavior?",
    benefits: "Reduced conflict, empathy expansion"
  },
  {
    title: "9. Spiritual Integration",
    text: "Each type has a higher quality beyond ego fixation. Practice presence to access that quality.",
    benefits: "Transcendent purpose, ego relaxation"
  },
  {
    title: "10. Workplace Type Dynamics",
    text: "Different types need different leadership signals: autonomy, clarity, meaning, or recognition.",
    benefits: "Professional harmony, talent retention"
  },
  {
    title: "11. Relationship Compatibility",
    text: "No pairing is doomed, but some require translation. Build communication protocols for triggering dynamics.",
    benefits: "Deeper intimacy, conflict prevention"
  },
  {
    title: "12. Artistic Expression by Type",
    text: "Align creative medium with motivation: processing feelings, understanding systems, refining form, sharing joy.",
    benefits: "Authentic creative voice, reduced blocks"
  },
  {
    title: "13. Parenting by Type",
    text: "Avoid parenting from your type bias. Support the child’s core needs and reduce mismatch trauma.",
    benefits: "Child’s authentic development, reduced family friction"
  },
  {
    title: "14. Therapy & Coaching Selection",
    text: "Choose helpers who match your type’s needs: trust, frameworks, permission to receive, respect/power balance.",
    benefits: "Better alliance, faster progress"
  },
  {
    title: "15. The Essence Practice",
    text: "When fear relaxes, each type expresses an essence quality (wisdom, freedom, hope, equanimity, non-attachment, faith, work, truth, love).",
    benefits: "Transcending type limitations, presence"
  }
];
const enneagramChecklist = [
  "Verify core vs. wing: Core triggers fear/shame when denied; wing is flavor.",
  "Check stress/security: In crisis, do you act like your disintegration number?",
  "Childhood pattern: Does the type’s origin story resonate with early memories?",
  "Avoid type as excuse: Growth means choice within pattern, not identity armor.",
  "Study all 9: Learn harmonic groups to understand others’ patterns.",
  "Retest after major life events: Core doesn’t change, but health level/wing may shift.",
  "Find type community: Shared stories reveal blind spots."
];
const hollandBadges = [
  "🔬 John Holland's Hexagon Theory (60+ years validation)",
  "🎯 Career congruence & satisfaction prediction",
  "📈 Environmental matching strategies",
  "🔒 Professional path clarity"
];
const hollandTypes = [
  {
    icon: "🔧",
    code: "R",
    name: "Realistic (The Doers)",
    summary: "Hands-on • Tools • Machines • Outdoors • Physical • Practical",
    characteristics: [
      "Prefers working with objects, machines, tools, plants, or animals",
      "Values practical, concrete, tangible results over abstract theory",
      "Enjoys being outdoors, using physical skills, building or repairing",
      "Dislikes social demands, paperwork, or ambiguous ideas without application"
    ],
    environments: "Workshops, construction sites, farms, labs (hands-on), emergency services, engineering fields, kitchens",
    careers: "Civil engineer, orthopedic surgeon, aircraft mechanic, chef, electrician, forensic technician, agriculture specialist",
    avoid: "Counseling, marketing, theoretical research (too abstract/social)"
  },
  {
    icon: "🔬",
    code: "I",
    name: "Investigative (The Thinkers)",
    summary: "Analytical • Intellectual • Scientific • Curious • Research-oriented",
    characteristics: [
      "Prefers observing, learning, investigating, analyzing, evaluating, problem-solving",
      "Values ideas, knowledge, and understanding how things work",
      "Enjoys independent work with data, theories, or complex systems",
      "Dislikes sales, persuasion, or repetitive routine tasks"
    ],
    environments: "Research labs, universities, hospitals (diagnostics), tech companies, libraries, analytics departments",
    careers: "Data scientist, microbiologist, software developer, pharmacist, economist, investigative journalist, psychiatrist",
    avoid: "Customer service, retail management, performing arts (too social/performative)"
  },
  {
    icon: "🎨",
    code: "A",
    name: "Artistic (The Creators)",
    summary: "Expressive • Original • Unconventional • Intuitive • Non-structured",
    characteristics: [
      "Prefers working with ideas, concepts, designs, or human experiences",
      "Values self-expression, originality, beauty, and emotional impact",
      "Enjoys ambiguity, freedom from rigid structure, creating new forms",
      "Dislikes routine, strict rules, or conventional business environments"
    ],
    environments: "Studios, design firms, startups, media companies, theaters, freelance platforms, marketing (creative side)",
    careers: "UX designer, architect, writer, filmmaker, musician, art therapist, brand strategist, landscape architect",
    avoid: "Accounting, factory work, military hierarchy (too rigid/conventional)"
  },
  {
    icon: "💝",
    code: "S",
    name: "Social (The Helpers)",
    summary: "Teaching • Healing • Serving • Counseling • Collaborative • Empathetic",
    characteristics: [
      "Prefers working with people to inform, teach, treat, counsel, or serve",
      "Values helping others, human development, and community wellbeing",
      "Enjoys communication, empathy, teamwork, and interpersonal dynamics",
      "Dislikes isolated technical work or competitive win-lose environments"
    ],
    environments: "Schools, hospitals, nonprofits, HR departments, counseling centers, community organizations",
    careers: "Clinical psychologist, teacher, HR manager, nurse practitioner, social worker, corporate trainer, mediator",
    avoid: "Stock trading, solo software engineering, audit work (too isolated/analytical)"
  },
  {
    icon: "💼",
    code: "E",
    name: "Enterprising (The Persuaders)",
    summary: "Leadership • Risk-taking • Ambition • Competition • Influence • Business",
    characteristics: [
      "Prefers working with people to lead, manage, organize, or achieve economic goals",
      "Values status, influence, financial success, and recognition",
      "Enjoys persuasion, negotiation, entrepreneurship, and strategic decision-making",
      "Dislikes detailed paperwork, solitary research, or being subordinate without autonomy"
    ],
    environments: "Corporate offices, sales floors, startups, political campaigns, law firms, investment banks, real estate",
    careers: "Investment banker, corporate lawyer, sales director, startup founder, political consultant, PR executive",
    avoid: "Lab research, archival work, pure mathematics (too isolated/non-competitive)"
  },
  {
    icon: "📊",
    code: "C",
    name: "Conventional (The Organizers)",
    summary: "Detail-oriented • Systematic • Accuracy • Structure • Data • Compliance",
    characteristics: [
      "Prefers working with data, systems, numbers, or established procedures",
      "Values accuracy, stability, efficiency, and clear hierarchies",
      "Enjoys organizing, categorizing, processing information, and maintaining standards",
      "Dislikes ambiguity or unpredictable social demands"
    ],
    environments: "Government agencies, banks, accounting firms, corporate admin, IT support, quality control, libraries",
    careers: "Accountant, auditor, database administrator, insurance underwriter, paralegal, supply chain manager, actuary",
    avoid: "Fine arts, early-stage startups (chaos), counseling (too emotional/ambiguous)"
  }
];
const hollandStrategies = [
  {
    title: "1. Decode Your 3-Letter Code",
    text: "Most people score high in 2–3 adjacent types. Opposite codes indicate tension—you may need hybrid careers or separate hobbies to satisfy both.",
    benefits: "Clarifies why past jobs felt off, validates multipotentiality"
  },
  {
    title: "2. Environmental Scanning",
    text: "Don’t just match job title—assess workplace culture. Same skill can thrive in different environments depending on your code.",
    benefits: "Prevents right job, wrong company syndrome"
  },
  {
    title: "3. Skill vs. Interest Distinction",
    text: "You may be skilled at something you don’t enjoy. Separate competence from interest to avoid burnout.",
    benefits: "Realistic career planning, avoiding competency traps"
  },
  {
    title: "4. The Hexagon Distance Rule",
    text: "Adjacent types on the hexagon are compatible; opposites create friction. If your code is scattered, you need variety; if clustered, you need depth.",
    benefits: "Understanding workplace friction sources"
  },
  {
    title: "5. Career Pivoting Strategy",
    text: "To switch fields, keep one letter constant. Changing all three at once increases identity friction.",
    benefits: "Manageable transitions, transferable identity"
  },
  {
    title: "6. Side Project Alignment",
    text: "If your job is heavy in one code, use hobbies to satisfy a different code for recovery and balance.",
    benefits: "Sustainable energy, preventing burnout"
  },
  {
    title: "7. Team Role Balancing",
    text: "Effective teams need all six: builders, researchers, innovators, culture, dealmakers, and quality-control. Know what’s missing.",
    benefits: "Project success, reduced team conflict"
  },
  {
    title: "8. Education Path Optimization",
    text: "Match training to type: apprenticeships, graduate school, portfolios, practicum, networks, certifications.",
    benefits: "Educational ROI, completion rates"
  },
  {
    title: "9. Job Search Filtering",
    text: "Scan job descriptions for code keywords (competitive, supportive, structured, independent) to filter faster.",
    benefits: "Efficient targeting, higher interview success"
  },
  {
    title: "10. Remote Work Compatibility",
    text: "Some types thrive remote (independent/structured). Others need people or physical space. Negotiate accordingly.",
    benefits: "Work-from-home sustainability"
  },
  {
    title: "11. Salary vs. Satisfaction Trade-offs",
    text: "Some profiles tolerate mismatch longer; others burn out faster. Budget for congruence based on your code.",
    benefits: "Financial planning aligned with values"
  },
  {
    title: "12. Portfolio Career Design",
    text: "Modern careers often combine codes across roles or time blocks. Intentional splits prevent compromise.",
    benefits: "Wholeness without single-job perfection"
  },
  {
    title: "13. Managing the Shadow Code",
    text: "Your lowest score is an avoidance area. Don’t force it 40 hours/week—outsource, partner, or redesign the role.",
    benefits: "Focus on strengths, smart delegation"
  },
  {
    title: "14. Mentorship Matching",
    text: "Seek mentors with similar codes but higher level. Mismatched mentors create advice friction.",
    benefits: "Accelerated growth, relevant advice"
  },
  {
    title: "15. Lifelong Vocational Adjustment",
    text: "Interests can shift slightly with age. Reassess periodically to evolve without crisis.",
    benefits: "Intentional growth, reduced career anxiety"
  }
];
const hollandChecklist = [
  "Measure baseline: Answer what you’d do if money didn’t matter, not what you’re good at (skills ≠ interests).",
  "Check hexagon consistency: Are your top 3 adjacent or scattered? Scattered = portfolio career; adjacent = specialization.",
  "Avoidance check: Ensure your job doesn’t require 40hrs/week of your lowest activity.",
  "Shadow exploration: Sometimes low scores are suppressed interests—try a class to verify.",
  "Environmental audit: Describe your workplace using the 6 types. Does it match your code?",
  "Congruence calculation: 70%+ overlap is ideal; under 50% suggests planning an exit.",
  "Retest after major life events: Stress or role shifts can change what you need day-to-day."
];
const eqBadges = [
  "🔬 Mayer-Salovey-Caruso Model / Goleman Framework",
  "🎯 Predicts leadership success better than IQ",
  "📈 Developable skill (unlike personality)",
  "🔒 Personal growth roadmap"
];
const eqBranches = [
  {
    icon: "🎯",
    title: "1. Perceiving Emotions (Awareness)",
    desc: "Recognizing emotions in faces, voices, body language, and art.",
    high: "Reads micro-expressions, detects sarcasm, notices team mood shifts before they escalate.",
    low: "Surprised by others’ reactions, misses social cues, walking emotional blind."
  },
  {
    icon: "🔄",
    title: "2. Using Emotions (Facilitation)",
    desc: "Harnessing feelings to enhance thinking, creativity, and focus.",
    high: "Uses anxiety to prepare thoroughly, channels anger into advocacy, matches music to tasks for optimal arousal.",
    low: "Emotional hijacking, procrastination from stress, creative blocks from mood swings."
  },
  {
    icon: "🧠",
    title: "3. Understanding Emotions (Language)",
    desc: "Comprehending emotional complexity, blends, and transitions.",
    high: "Distinguishes shame from guilt, knows anger masks fear, predicts emotional trajectories.",
    low: "Binary emotional vocabulary (good/bad), confused by mixed feelings, mislabels emotions."
  },
  {
    icon: "⚡",
    title: "4. Managing Emotions (Regulation)",
    desc: "Modulating emotions in self and influencing others effectively.",
    high: "Recovers quickly from setbacks, defuses conflicts, motivates teams through fear without panic.",
    low: "Emotional explosions, suppression then burnout, escalates others’ distress unintentionally."
  }
];
const eqStrategies = [
  {
    title: "1. Emotion Labeling Precision",
    text: 'Expand beyond "good/stressed." Use granular terms. Specificity reduces amygdala reactivity and speeds recovery.',
    benefits: "Faster emotional recovery, better self-knowledge"
  },
  {
    title: '2. The "Meta-Moment" Practice',
    text: "When triggered, pause a few seconds. Ask: What would my best self do?",
    benefits: "Impulse control, reduced regret"
  },
  {
    title: "3. Active Emotional Listening",
    text: "Track tone, pacing, and what’s not said. Reflect back: You sound frustrated about…",
    benefits: "Deeper relationships, trust building"
  },
  {
    title: "4. Body Scanning",
    text: "Emotions show up in the body first. Daily short scans increase interoceptive accuracy.",
    benefits: "Early warning system for emotional shifts"
  },
  {
    title: "5. Emotional Granularity Journaling",
    text: "Write what you felt (at least 3 distinct emotions), not just what happened.",
    benefits: "Improved vocabulary, pattern recognition"
  },
  {
    title: "6. Sleep Hygiene for Amygdala",
    text: "Sleep deprivation reduces EQ sharply. Prioritize consistent sleep for emotional processing.",
    benefits: "Stable mood, accurate perception"
  },
  {
    title: "7. Perspective-Taking Drills",
    text: "In conflict, write 3 sentences from the other person’s emotional reality.",
    benefits: "Empathy, reduced polarization"
  },
  {
    title: '8. The "Emotion Wheel" Tool',
    text: "Use an emotion wheel to identify primary vs secondary emotions. Often anger is secondary to hurt.",
    benefits: "Root cause analysis, authentic expression"
  },
  {
    title: "9. Strategic Disclosure",
    text: "High EQ isn’t hiding emotions—it’s sharing appropriately. Time vulnerability for connection.",
    benefits: "Authentic leadership, psychological safety"
  },
  {
    title: "10. Stress Inoculation",
    text: "Deliberately expose yourself to low-level stressors to build regulation capacity.",
    benefits: "Nervous system regulation, grace under pressure"
  },
  {
    title: "11. Feedback Seeking",
    text: "Ask trusted people: How did I come across? Perception gaps reveal blind spots.",
    benefits: "Accurate self-assessment, continuous improvement"
  },
  {
    title: "12. Art & Music Practice",
    text: "Engage with complex art/music to train recognition and ambiguity tolerance.",
    benefits: "Emotional range expansion, creativity"
  },
  {
    title: '13. The "Emotion Audit"',
    text: "Review your day: When did I react? When did I respond? What’s the pattern?",
    benefits: "Conscious choice, breaking reactive habits"
  },
  {
    title: "14. Social Baseline Monitoring",
    text: "Check room emotional temperature before leading. Adjust tone to calm or energize.",
    benefits: "Influence, group emotional regulation"
  },
  {
    title: "15. Repair Attempts Mastery",
    text: "Apologize effectively: own impact (not intent), validate feelings, commit to change.",
    benefits: "Relationship repair, trust rebuilding"
  }
];
const eqChecklist = [
  "Measure baseline: Test under normal stress (not crisis/sleep deprivation).",
  "360-degree view: Self-estimates can be biased; get peer ratings for accuracy.",
  "Focus on weakest branch: Fix your lowest quadrant first instead of training evenly.",
  "Track behavior metrics: e.g., I paused before reacting 5 times today.",
  "Retest quarterly: EQ changes faster than personality—track growth."
];
const loveBadges = [
  "💝 Dr. Gary Chapman's Framework",
  "❤️ Applies to romantic, familial, and professional relationships",
  "🎯 Prevents the #1 divorce cause: emotional disconnection",
  "🔒 Relationship intimacy roadmap"
];
const loveLanguages = [
  {
    icon: "🗣️",
    title: "1. Words of Affirmation",
    summary: "Verbal compliments, encouragement, appreciation, kind words.",
    need: 'I love you, I’m proud of you, specific praise like: "You handled that client brilliantly."',
    feel: "Empty with silence or criticism, even if help is given without verbal warmth.",
    danger: "Harsh words cause deep wounds that actions can’t heal quickly."
  },
  {
    icon: "⏰",
    title: "2. Quality Time",
    summary: "Undivided attention, meaningful conversation, shared activities.",
    need: "Eye contact, phones away, active listening, just being together.",
    feel: "Abandoned when physically present but distracted; proximity ≠ connection.",
    danger: "Cancelling plans or distracted presence feels like rejection."
  },
  {
    icon: "🎁",
    title: "3. Receiving Gifts",
    summary: "Tangible symbols of thoughtfulness, visual reminders of love.",
    need: "Surprises (not necessarily expensive), handwritten notes, I saw this and thought of you.",
    feel: "Forgotten when occasions are missed; gifts mean you were on my mind.",
    danger: "Last-minute or obligatory gifts feel worse than none."
  },
  {
    icon: "💪",
    title: "4. Acts of Service",
    summary: "Helping with tasks, easing burdens, let me do that for you.",
    need: "Chores without asking, fixing what’s broken, taking over when they’re tired.",
    feel: "Unloved when workload is ignored; laziness = lack of care.",
    danger: "Helping that creates more work (messy help) backfires."
  },
  {
    icon: "🤗",
    title: "5. Physical Touch",
    summary: "Hugs, holding hands, sitting close, affectionate touch.",
    need: "Non-sexual touch, greeting hugs, shoulder contact, consistent warmth.",
    feel: "Isolated in a touch-desert; distance = emotional distance.",
    danger: "Withholding touch as punishment causes deep trauma."
  }
];
const loveApplications = [
  {
    title: "1. The Discovery Conversation",
    text: "Share results without judgment. Name needs clearly and negotiate: words vs touch, time vs service.",
    benefits: "Prevents years of frustration"
  },
  {
    title: "2. The Language Switch",
    text: "Intentionally speak their language daily, even if it feels unnatural at first.",
    benefits: "Filled love tanks, reciprocal generosity"
  },
  {
    title: "3. The Apology Repair",
    text: "When you hurt them, apologize in their language, not yours.",
    benefits: "Effective reconciliation"
  },
  {
    title: "4. Workplace Adaptation",
    text: "Translate to appreciation at work: praise (words), mentorship time, bonuses (gifts), workload help (service), high-fives (touch).",
    benefits: "Retention, engagement"
  },
  {
    title: "5. Child Rearing",
    text: "Don’t project your language. A child who needs words is harmed by silence even if you serve them.",
    benefits: "Secure attachment"
  },
  {
    title: '6. The "Tank Check"',
    text: "Weekly 1–10 rating: How full is your tank? Address before it reaches empty.",
    benefits: "Preventive relationship care"
  },
  {
    title: "7. Long-Distance Hacks",
    text: "Adapt each language: voice notes, video calls, mailed surprises, ordering help, acknowledging touch limits with care.",
    benefits: "Sustained intimacy across distance"
  },
  {
    title: "8. The Stress Response",
    text: "Under stress, people revert to receiving their primary language. Give extra during hard times.",
    benefits: "Crisis support"
  },
  {
    title: "9. The Love Language Date",
    text: "Alternate planning dates in each other’s languages to learn through experience.",
    benefits: "Mutual understanding"
  },
  {
    title: "10. Digital Adaptation",
    text: "Translate love into modern channels: intentional calls, texts, e-gifts, managing tasks, comfort objects.",
    benefits: "Modern relationship maintenance"
  },
  {
    title: '11. The "Dialect" Precision',
    text: "Within each language, preferences differ. Learn the sub-type: compliments vs encouragement, chores vs errands.",
    benefits: "Precision love"
  },
  {
    title: "12. The Non-Negotiable",
    text: "Pick one daily minimum for each partner’s primary language (e.g., morning hug, one compliment).",
    benefits: "Consistency beats intensity"
  },
  {
    title: "13. The Conflict Bridge",
    text: "In conflict, use their language to de-escalate while you disagree respectfully.",
    benefits: "Safe conflict, faster repair"
  },
  {
    title: "14. The Self-Love Application",
    text: "Speak your own language to yourself too—don’t outsource your entire tank.",
    benefits: "Self-esteem, reduced resentment"
  },
  {
    title: "15. The Annual Retest",
    text: "Languages can shift with life stages. Retest after major changes.",
    benefits: "Evolving intimacy"
  }
];
const loveChecklist = [
  "Measure baseline: Answer what fills you, not what you wish filled you.",
  "Observe resentment: Your complaints often reveal your primary language.",
  "Check giving vs receiving: They can differ (you give gifts but need words).",
  "Test with colleagues: Workplace appreciation can differ from romance.",
  "Retest after major changes: Babies, promotions, illness shift priorities."
];
const attachmentBadges = [
  "🧠 Bowlby/Ainsworth Theory (Adult Attachment Interview)",
  '💔 Explains "why I always pick the same type"',
  "🔄 Earned secure attachment is possible through therapy",
  "🔒 Relational healing roadmap"
];
const attachmentStyles = [
  {
    icon: "😊",
    title: "1. Secure (50–60% of population)",
    summary: "Comfortable with intimacy and independence.",
    signs: "Communicates needs directly, trusts partners, handles conflict calmly, doesn’t play games.",
    childhood: "Consistent, responsive caregiving.",
    mantra: "I’m okay, you’re okay."
  },
  {
    icon: "😰",
    title: "2. Anxious-Preoccupied (20–25%)",
    summary: "Craves closeness, fears abandonment.",
    signs: "Needs constant reassurance, hypervigilant to partner’s moods, fears being too much, emotional escalation.",
    childhood: "Inconsistent caregiving (sometimes available, sometimes neglectful).",
    mantra: "I’m too much, they’ll leave me."
  },
  {
    icon: "😶",
    title: "3. Dismissive-Avoidant (20–25%)",
    summary: "Values independence, uncomfortable with closeness.",
    signs: "Pulls away when things get serious, intellectualizes emotions, I don’t need anyone, dismisses partner’s needs.",
    childhood: "Emotionally neglectful or invasive caregiving (learned self-reliance).",
    mantra: "I’ll lose myself if I get close."
  },
  {
    icon: "😵",
    title: "4. Fearful-Avoidant (Disorganized) (5–10%)",
    summary: "Wants closeness but terrified of it.",
    signs: "Hot-and-cold behavior, come here/go away, attracted to unavailable people, internal chaos.",
    childhood: "Traumatic, abusive, or frightening caregiving.",
    mantra: "I need you but you hurt me."
  }
];
const attachmentPaths = [
  {
    title: "1. Identify Your Trigger",
    text: "Notice what activates your alarm: anxious (no text back), avoidant (we need to talk). Track body signals.",
    benefits: "Choice over reactivity"
  },
  {
    title: "2. The Protest Behavior Pause",
    text: "Anxious: don’t send the 5th text. Avoidant: don’t shut down for 3 days. Sit with discomfort before acting.",
    benefits: "Breaking patterns"
  },
  {
    title: "3. Need Translation",
    text: "Replace blame with vulnerability: I feel anxious when I don’t hear from you. Can we check in daily?",
    benefits: "Vulnerability without attack"
  },
  {
    title: "4. The 20-Minute Rule",
    text: "Avoidants: agree to discuss emotions for 20 minutes, then break. Gradually extend tolerance.",
    benefits: "Emotional endurance building"
  },
  {
    title: "5. Secure Attachment Modeling",
    text: "Study secure friends. Imitate their scripts during conflict and repair.",
    benefits: "New neural pathways"
  },
  {
    title: "6. Somatic Regulation",
    text: "Anxious: grounding (5-4-3-2-1 senses). Avoidant: heart-breathing to reconnect to body signals.",
    benefits: "Nervous system regulation"
  },
  {
    title: "7. The Fantasy Audit",
    text: "Reality-check: list 5 annoying traits. Make sure you love the person, not the fantasy.",
    benefits: "Real intimacy"
  },
  {
    title: "8. Therapy for Disorganized",
    text: "Fearful-avoidant often needs trauma-informed support (e.g., EMDR) before deep relationship work.",
    benefits: "Safety first"
  },
  {
    title: "9. The Pursuit–Distancer Dance",
    text: "Anxious chases, avoidant runs. Reverse intentionally: anxious gives space; avoidant leans in.",
    benefits: "Pattern interruption"
  },
  {
    title: "10. Attachment-Based Dating",
    text: "Choose partners with secure patterns or clear growth work. Avoid chronic mismatch loops.",
    benefits: "Compatible pairing"
  },
  {
    title: "11. The Inner Child Dialogue",
    text: "Write to your childhood self: Adult me is here now. I won’t abandon you.",
    benefits: "Self-reparenting"
  },
  {
    title: "12. Consistency Experiments",
    text: "Do one daily commitment for 30 days. Build internal security through self-trust.",
    benefits: "Self-efficacy"
  },
  {
    title: "13. The Trigger Log",
    text: "Track: Event → Feeling → Behavior → Consequence. Patterns become visible and changeable.",
    benefits: "Metacognition"
  },
  {
    title: "14. Secure Relationships as Healing",
    text: "Corrective experiences with secure people can build earned security over time.",
    benefits: "Neuroplasticity in action"
  },
  {
    title: "15. The Breakup Analysis",
    text: "Ask: did I leave because it was wrong, or because the attachment alarm sounded?",
    benefits: "Discerning intuition vs fear"
  }
];
const attachmentChecklist = [
  "Measure baseline: Answer based on typical patterns, not honeymoon phase or recent therapy progress.",
  "Check romantic vs friendship: Styles can vary by context.",
  "Partner assessment: Knowing their style helps you not take behavior personally.",
  "Retest after 1 year of therapy: Earned security should show on re-test."
];
const mbtiDichotomies = [
  {
    title: "1. Energy Orientation",
    leftTitle: "Extraversion (E)",
    leftText: "Drawn outward to people/action; energized by interaction; breadth of interests.",
    rightTitle: "Introversion (I)",
    rightText: "Drawn inward to thoughts/ideas; energized by solitude; depth of focus."
  },
  {
    title: "2. Perception Function",
    leftTitle: "Sensing (S)",
    leftText: "Concrete, practical, detail-oriented, trusts experience and facts.",
    rightTitle: "Intuition (N)",
    rightText: "Abstract, theoretical, pattern-seeking, trusts imagination and possibilities."
  },
  {
    title: "3. Decision Function",
    leftTitle: "Thinking (T)",
    leftText: "Objective logic, cause-and-effect, fairness through principles.",
    rightTitle: "Feeling (F)",
    rightText: "Subjective values, empathy, harmony through compassion."
  },
  {
    title: "4. External Orientation",
    leftTitle: "Judging (J)",
    leftText: "Structured, planned, closure-seeking, likes control and decisiveness.",
    rightTitle: "Perceiving (P)",
    rightText: "Flexible, spontaneous, options-keeping, likes adaptability and flow."
  }
];
const mbtiTypeGroups = [
  {
    title: "Analysts (NT) — Rational & Strategic",
    items: [
      "INTJ — Architect: Strategic masterminds, long-term planners",
      "INTP — Logician: Theoretical innovators, system designers",
      "ENTJ — Commander: Natural leaders, efficiency drivers",
      "ENTP — Debater: Clever innovators, devil’s advocates"
    ]
  },
  {
    title: "Diplomats (NF) — Idealistic & Empathetic",
    items: [
      "INFJ — Advocate: Quiet visionaries, complex and inspiring",
      "INFP — Mediator: Poetic souls, value-driven creatives",
      "ENFJ — Protagonist: Charismatic motivators, growth catalysts",
      "ENFP — Campaigner: Enthusiastic crusaders, idea generators"
    ]
  },
  {
    title: "Sentinels (SJ) — Practical & Organized",
    items: [
      "ISTJ — Logistician: Reliable organizers, fact-based realists",
      "ISFJ — Defender: Warm protectors, detail-oriented caregivers",
      "ESTJ — Executive: Efficient administrators, tradition upholders",
      "ESFJ — Consul: Cooperative helpers, relationship builders"
    ]
  },
  {
    title: "Explorers (SP) — Spontaneous & Practical",
    items: [
      "ISTP — Virtuoso: Practical experimenters, troubleshooters",
      "ISFP — Adventurer: Flexible artists, present-moment enjoyers",
      "ESTP — Entrepreneur: Energetic doers, risk-taking opportunists",
      "ESFP — Entertainer: Spontaneous performers, enthusiastic helpers"
    ]
  }
];
const mbtiApplications = [
  {
    title: "1. Optimize Your Environment",
    text: "Arrange workspace based on your E/I preference. Extroverts need collaborative spaces; Introverts need quiet zones.",
    benefits: "Sustained focus, reduced fatigue, better output"
  },
  {
    title: "2. Develop Your Inferior Function",
    text: 'Each type has a "blind spot" (4th function). Consciously practice this weak area for balanced growth.',
    benefits: "Reduced stress reactions, increased adaptability, maturity"
  },
  {
    title: "3. Adapt Communication Styles",
    text: "S-types need concrete examples; N-types need conceptual frameworks. Match your listener.",
    benefits: "Clearer messaging, fewer misunderstandings, better teamwork"
  },
  {
    title: "4. Manage Energy Cycles",
    text: "Honor your natural rhythms. J-types work best with schedules; P-types need flexibility blocks.",
    benefits: "Sustainable productivity, less burnout, natural flow"
  },
  {
    title: "5. Choose Compatible Careers",
    text: "Align work environment with type. INFJs often thrive in counseling; ESTPs often excel in sales/trading.",
    benefits: "Job satisfaction, natural competence, career longevity"
  },
  {
    title: "6. Navigate Stress Patterns",
    text: 'Each type has a "grip" stress reaction. Recognize yours early (e.g., INTJs can become impulsive under extreme stress).',
    benefits: "Emotional regulation, faster recovery, self-awareness"
  },
  {
    title: "7. Improve Relationships",
    text: "Understand type dynamics: opposite types attract but need translation; similar types comfort but may amplify blind spots.",
    benefits: "Empathy, conflict resolution, deeper connections"
  },
  {
    title: "8. Study Effectively",
    text: "S-types memorize facts; N-types grasp theories first. T-types use logic trees; F-types use personal relevance.",
    benefits: "Faster learning, better retention, academic confidence"
  },
  {
    title: "9. Lead Authentically",
    text: "Don’t mimic other leadership styles. INTJs lead through vision; ESFJs through team cohesion.",
    benefits: "Authentic influence, trusted leadership, team performance"
  },
  {
    title: "10. Build Better Teams",
    text: "Diverse teams need all functions: Sensors for execution, Intuitives for innovation, Thinkers for analysis, Feelers for morale.",
    benefits: "Innovation, thoroughness, team harmony"
  },
  {
    title: "11. Make Decisions Clearly",
    text: "T-types: check emotional impact. F-types: verify logical consistency. Both need balance.",
    benefits: "Wise choices, fewer regrets, stakeholder buy-in"
  },
  {
    title: "12. Parent to Type",
    text: "Your child’s type may differ from yours. Support their natural wiring, not your preferences.",
    benefits: "Confident children, reduced family friction, healthy development"
  },
  {
    title: "13. Handle Conflict",
    text: "TJ-types want quick resolution; FP-types need emotional processing first. Adjust approach.",
    benefits: "Effective mediation, preserved relationships, solutions that stick"
  },
  {
    title: "14. Network Strategically",
    text: "Extroverts cast wide nets; Introverts go deep. Both work if aligned with authentic energy.",
    benefits: "Quality connections, career opportunities, social satisfaction"
  },
  {
    title: "15. Continuous Type Development",
    text: "Your type isn’t a cage. Middle age often brings stronger use of all 8 functions. Keep growing.",
    benefits: "Wisdom, flexibility, integrated personality"
  }
];
const mbtiApplicationIcons = ["🧩", "🎵", "🗣️", "🏃", "🥑", "😴", "🧘", "📚", "♟️", "💻", "🧮", "🎨", "🔎", "👥", "🔄"];
const mbtiDichotomyIcons = ["🔄", "👁️", "⚖️", "📋"];
const mbtiChecklist = [
  "Measure baseline: Take the test in a calm state, answer instinctively not aspirationally.",
  "Verify with cognitive functions: Read about your 4-letter type’s function stack (dominant, auxiliary, tertiary, inferior).",
  "Find your flow state: Notice when you lose track of time—this often reveals your dominant function.",
  "Identify stress triggers: Learn your type’s shadow-mode warning signs.",
  "Read opposite types: Study your complete opposite to understand perspectives you naturally miss.",
  "Join type communities: Engage with others of your type for validation and growth tips.",
  "Retest after 6 months: Preferences stabilize, but stress or major life changes can temporarily shift results."
];
function AssessmentInfoPage() {
  const { get } = useI18n();
  const params = useParams();
  const assessment = getAssessmentById(params.assessmentId ?? "");
  const brandName = get("site.brandName") ?? "PersonaCheck";
  if (!assessment) return /* @__PURE__ */ jsx(Navigate, { to: "/", replace: true });
  if (assessment.id === "iq") return /* @__PURE__ */ jsx(Navigate, { to: "/", replace: true });
  const defaultTitle = assessment.id === "mbti" ? "How to Understand Your Personality Type: The Complete MBTI Guide" : assessment.id === "big-five" ? "How to Map Your Personality DNA: The Science of Big Five Traits" : assessment.id === "disc" ? "How to Decode Your Behavioral Style: The Complete DISC Guide" : assessment.id === "enneagram" ? "How to Reveal Your Core Fear & Desire: The Complete Enneagram Guide" : assessment.id === "holland" ? "How to Find Your Career DNA: The Complete Holland Code (RIASEC) Guide" : assessment.id === "eq" ? "How to Master Your Emotions: The Complete EQ Assessment" : assessment.id === "love-languages" ? "How to Speak Love Fluently: The Love Languages Assessment" : assessment.id === "attachment" ? "How to Understand Your Relational Blueprint: The Attachment Assessment" : `${assessment.name} Information | ${brandName}`;
  const defaultDescription = assessment.id === "mbti" ? "Discover your psychological preferences in perception and decision-making, then take the assessment to reveal your four-letter type code." : assessment.id === "big-five" ? "Discover your position on the five fundamental dimensions of personality used by psychologists worldwide, based on decades of cross-cultural research." : assessment.id === "disc" ? "Understand your natural and adapted behaviors in workplace and social settings, then discover how to communicate effectively with every personality type." : assessment.id === "enneagram" ? "Uncover the unconscious motivation driving your decisions, relationships, and stress patterns through the ancient 9-type system validated by modern psychology." : assessment.id === "holland" ? "Discover the work environments where you'll thrive, avoid career mismatch burnout, and build a professional life aligned with your deepest interests and values." : assessment.id === "eq" ? "Measure your ability to perceive, use, understand, and manage emotions—in yourself and others—to improve relationships, decision-making, and leadership effectiveness." : assessment.id === "love-languages" ? "Discover how you give and receive affection to prevent relationship miscommunication and build lasting intimacy." : assessment.id === "attachment" ? "Discover your unconscious relational patterns formed in childhood and how they shape your adult intimacy, conflict style, and emotional needs." : `${assessment.name} information page. Content and questions will be added later.`;
  const infoBaseKey = `assessments.info.${assessment.id}`;
  const title2 = get(`${infoBaseKey}.helmet.title`) ?? defaultTitle;
  const description = get(`${infoBaseKey}.helmet.description`) ?? defaultDescription;
  const i18nStr = (keyPath, fallback) => {
    const v = get(keyPath);
    return typeof v === "string" ? v : fallback;
  };
  const startHref = `/assessments/${assessment.id}/test`;
  const configuredSiteUrl = "https://personacheck.pro".trim().replace(/\/+$/, "");
  const origin = configuredSiteUrl !== "" ? configuredSiteUrl : typeof window !== "undefined" ? window.location.origin : "";
  const canonical = origin ? `${origin}/assessments/${assessment.id}` : `/assessments/${assessment.id}`;
  const breadcrumbJson = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: origin ? `${origin}/` : "/" },
      { "@type": "ListItem", position: 2, name: "Assessments", item: origin ? `${origin}/assessments` : "/assessments" },
      { "@type": "ListItem", position: 3, name: assessment.name, item: canonical }
    ]
  };
  if (assessment.id === "mbti") {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs(Helmet, { children: [
        /* @__PURE__ */ jsx("title", { children: title2 }),
        /* @__PURE__ */ jsx("meta", { name: "description", content: description }),
        /* @__PURE__ */ jsx("meta", { name: "robots", content: "index, follow" }),
        /* @__PURE__ */ jsx("meta", { property: "og:title", content: title2 }),
        /* @__PURE__ */ jsx("meta", { property: "og:description", content: description }),
        /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" }),
        /* @__PURE__ */ jsx("meta", { property: "og:url", content: canonical }),
        /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: title2,
          description,
          author: { "@type": "Organization", name: brandName },
          mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
          articleSection: i18nStr(`${infoBaseKey}.helmet.articleSection`, "Personality"),
          keywords: i18nStr(
            `${infoBaseKey}.helmet.keywords`,
            "MBTI, personality type, cognitive functions, Jungian theory, introversion, extraversion"
          )
        }) }),
        /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(breadcrumbJson) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: homeStyles.hero, children: [
        /* @__PURE__ */ jsx("h1", { className: homeStyles.title, children: title2 }),
        /* @__PURE__ */ jsx("p", { className: homeStyles.subtitle, children: description }),
        /* @__PURE__ */ jsx("div", { className: homeStyles.badges, "aria-label": "Highlights", children: (get(`${infoBaseKey}.badges`) ?? mbtiBadges).map((b) => /* @__PURE__ */ jsx("span", { className: homeStyles.badge, children: b }, b)) }),
        /* @__PURE__ */ jsxs("div", { className: homeStyles.cta, children: [
          /* @__PURE__ */ jsx("h2", { className: homeStyles.ctaTitle, children: i18nStr(`${infoBaseKey}.cta.title`, "Start with your type assessment") }),
          /* @__PURE__ */ jsx("p", { className: homeStyles.ctaText, children: i18nStr(`${infoBaseKey}.cta.text`, "20 questions • 4 dichotomies • instant profile") }),
          /* @__PURE__ */ jsx(Link, { to: startHref, className: homeStyles.ctaButton, children: i18nStr(`${infoBaseKey}.cta.button`, "🧪 Take the MBTI Assessment") })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: homeStyles.section, children: [
        /* @__PURE__ */ jsx("h2", { className: homeStyles.sectionTitle, children: "Is personality fixed or fluid?" }),
        /* @__PURE__ */ jsx("div", { className: homeStyles.snippet, role: "note", "aria-label": "Key takeaway", children: "While core preferences tend to remain stable through adulthood, understanding your type helps you develop weaker cognitive functions and adapt behaviors without changing your essential nature." }),
        /* @__PURE__ */ jsxs("div", { className: homeStyles.cards, children: [
          /* @__PURE__ */ jsxs("div", { className: homeStyles.card, children: [
            /* @__PURE__ */ jsx("div", { className: homeStyles.cardTitle, children: "Cognitive Functions" }),
            /* @__PURE__ */ jsx("div", { className: homeStyles.cardText, children: "MBTI is based on 8 cognitive functions (ways of processing information) stacked in a specific order for each type. Your dominant and auxiliary functions shape how you see the world and make decisions." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: homeStyles.card, children: [
            /* @__PURE__ */ jsx("div", { className: homeStyles.cardTitle, children: "What to explore first" }),
            /* @__PURE__ */ jsx("div", { className: homeStyles.cardText, children: "Understanding your energy direction (E/I), information gathering (S/N), decision making (T/F), and lifestyle approach (J/P) creates immediate clarity about natural strengths and blind spots." })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: homeStyles.section, children: [
        /* @__PURE__ */ jsx("h2", { className: homeStyles.sectionTitle, children: "The 4 Dichotomies Explained" }),
        /* @__PURE__ */ jsx("div", { className: homeStyles.grid, "aria-label": "Dichotomies", children: mbtiDichotomies.map((d, idx) => /* @__PURE__ */ jsxs("article", { className: homeStyles.methodCard, children: [
          /* @__PURE__ */ jsx("div", { className: homeStyles.methodIcon, "aria-hidden": "true", children: mbtiDichotomyIcons[idx] ?? "🧭" }),
          /* @__PURE__ */ jsx("div", { className: homeStyles.methodTitle, children: d.title }),
          /* @__PURE__ */ jsxs("div", { className: homeStyles.methodDesc, children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("strong", { children: [
                d.leftTitle,
                ":"
              ] }),
              " ",
              d.leftText
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("strong", { children: [
                d.rightTitle,
                ":"
              ] }),
              " ",
              d.rightText
            ] })
          ] })
        ] }, d.title)) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: homeStyles.section, children: [
        /* @__PURE__ */ jsx("h2", { className: homeStyles.sectionTitle, children: "The 16 Personality Types at a Glance" }),
        /* @__PURE__ */ jsx("div", { className: homeStyles.grid, "aria-label": "Type groups", children: mbtiTypeGroups.map((g) => /* @__PURE__ */ jsxs("div", { className: homeStyles.listCard, children: [
          /* @__PURE__ */ jsx("div", { className: homeStyles.cardTitle, children: g.title }),
          /* @__PURE__ */ jsx("ul", { className: homeStyles.list, children: g.items.map((t) => /* @__PURE__ */ jsx("li", { children: t }, t)) })
        ] }, g.title)) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: homeStyles.section, children: [
        /* @__PURE__ */ jsx("h2", { className: homeStyles.sectionTitle, children: "15 Ways to Apply Your Type Knowledge" }),
        /* @__PURE__ */ jsx("div", { className: homeStyles.grid, "aria-label": "Applications", children: mbtiApplications.map((s, idx) => /* @__PURE__ */ jsxs("article", { className: homeStyles.methodCard, children: [
          /* @__PURE__ */ jsx("div", { className: homeStyles.methodIcon, "aria-hidden": "true", children: mbtiApplicationIcons[idx] ?? "🧩" }),
          /* @__PURE__ */ jsx("div", { className: homeStyles.methodTitle, children: s.title }),
          /* @__PURE__ */ jsx("div", { className: homeStyles.methodDesc, children: s.text }),
          /* @__PURE__ */ jsxs("div", { className: homeStyles.methodBenefits, children: [
            /* @__PURE__ */ jsx("strong", { children: "Benefits:" }),
            " ",
            s.benefits
          ] })
        ] }, s.title)) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: homeStyles.section, children: [
        /* @__PURE__ */ jsx("h2", { className: homeStyles.sectionTitle, children: "Extra Checklist (Simple, High-Impact)" }),
        /* @__PURE__ */ jsxs("div", { className: homeStyles.listCard, children: [
          /* @__PURE__ */ jsx("ul", { className: homeStyles.list, children: mbtiChecklist.map((c) => /* @__PURE__ */ jsx("li", { children: c }, c)) }),
          /* @__PURE__ */ jsx(Link, { to: startHref, className: homeStyles.secondaryButton, children: "Start the test →" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: homeStyles.section, children: [
        /* @__PURE__ */ jsx("h2", { className: homeStyles.sectionTitle, children: "Other assessments" }),
        /* @__PURE__ */ jsx("div", { className: homeStyles.grid, "aria-label": "Other assessments", children: assessments.filter((a) => a.id !== assessment.id).map((a) => /* @__PURE__ */ jsxs(
          Link,
          {
            to: a.id === "iq" ? "/" : `/assessments/${a.id}`,
            className: `${homeStyles.methodCard} ${homeStyles.linkCard}`,
            children: [
              /* @__PURE__ */ jsx("div", { className: homeStyles.methodIcon, "aria-hidden": "true", children: a.emoji }),
              /* @__PURE__ */ jsx("div", { className: homeStyles.methodTitle, children: a.name }),
              /* @__PURE__ */ jsx("div", { className: homeStyles.methodDesc, children: "Info page → start test" })
            ]
          },
          a.id
        )) })
      ] })
    ] });
  }
  if (assessment.id === "big-five") {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs(Helmet, { children: [
        /* @__PURE__ */ jsx("title", { children: title2 }),
        /* @__PURE__ */ jsx("meta", { name: "description", content: description }),
        /* @__PURE__ */ jsx("meta", { name: "robots", content: "index, follow" }),
        /* @__PURE__ */ jsx("meta", { property: "og:title", content: title2 }),
        /* @__PURE__ */ jsx("meta", { property: "og:description", content: description }),
        /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" }),
        /* @__PURE__ */ jsx("meta", { property: "og:url", content: canonical }),
        /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: title2,
          description,
          author: { "@type": "Organization", name: brandName },
          mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
          articleSection: i18nStr(`${infoBaseKey}.helmet.articleSection`, "Personality"),
          keywords: i18nStr(
            `${infoBaseKey}.helmet.keywords`,
            "Big Five, personality traits, OCEAN, openness, conscientiousness, extraversion, agreeableness, neuroticism"
          )
        }) }),
        /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(breadcrumbJson) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: homeStyles.hero, children: [
        /* @__PURE__ */ jsx("h1", { className: homeStyles.title, children: title2 }),
        /* @__PURE__ */ jsx("p", { className: homeStyles.subtitle, children: description }),
        /* @__PURE__ */ jsx("div", { className: homeStyles.badges, "aria-label": "Highlights", children: (get(`${infoBaseKey}.badges`) ?? bigFiveBadges).map((b) => /* @__PURE__ */ jsx("span", { className: homeStyles.badge, children: b }, b)) }),
        /* @__PURE__ */ jsxs("div", { className: homeStyles.cta, children: [
          /* @__PURE__ */ jsx("h2", { className: homeStyles.ctaTitle, children: i18nStr(`${infoBaseKey}.cta.title`, "Start with your trait profile") }),
          /* @__PURE__ */ jsx("p", { className: homeStyles.ctaText, children: i18nStr(`${infoBaseKey}.cta.text`, "20 questions • 5 dimensions • percentile scoring • instant report") }),
          /* @__PURE__ */ jsx(Link, { to: startHref, className: homeStyles.ctaButton, children: i18nStr(`${infoBaseKey}.cta.button`, "🧪 Take the Big Five Assessment") })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: homeStyles.section, children: [
        /* @__PURE__ */ jsx("h2", { className: homeStyles.sectionTitle, children: "Can personality change?" }),
        /* @__PURE__ */ jsx("div", { className: homeStyles.snippet, role: "note", "aria-label": "Key takeaway", children: "The Big Five traits are relatively stable after age 30, but deliberate intervention—especially in therapy, coaching, or major life transitions—can shift your standing by 10–20 percentile points over time." }),
        /* @__PURE__ */ jsxs("div", { className: homeStyles.cards, children: [
          /* @__PURE__ */ jsxs("div", { className: homeStyles.card, children: [
            /* @__PURE__ */ jsx("div", { className: homeStyles.cardTitle, children: "Trait vs. Type" }),
            /* @__PURE__ */ jsx("div", { className: homeStyles.cardText, children: "Unlike MBTI types (either/or), Big Five traits are continuous dimensions (spectrums). You can be high, average, or low on each trait, creating many unique combinations." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: homeStyles.card, children: [
            /* @__PURE__ */ jsx("div", { className: homeStyles.cardTitle, children: "What predicts success" }),
            /* @__PURE__ */ jsx("div", { className: homeStyles.cardText, children: "Meta-analyses show Conscientiousness predicts job performance strongly; Emotional Stability (low Neuroticism) predicts relationship satisfaction; Openness predicts creativity." })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: homeStyles.section, children: [
        /* @__PURE__ */ jsx("h2", { className: homeStyles.sectionTitle, children: "The Five Dimensions Explained" }),
        /* @__PURE__ */ jsx("div", { className: homeStyles.grid, "aria-label": "Dimensions", children: bigFiveDimensions.map((d) => /* @__PURE__ */ jsxs("div", { className: homeStyles.listCard, children: [
          /* @__PURE__ */ jsxs("div", { className: homeStyles.cardTitle, children: [
            /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: d.icon }),
            " ",
            d.title
          ] }),
          /* @__PURE__ */ jsx("div", { className: homeStyles.cardText, children: d.summary }),
          /* @__PURE__ */ jsxs("ul", { className: homeStyles.list, children: [
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "High:" }),
              " ",
              d.high
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Low:" }),
              " ",
              d.low
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Facets:" }),
              " ",
              d.facets
            ] })
          ] })
        ] }, d.title)) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: homeStyles.section, children: [
        /* @__PURE__ */ jsx("h2", { className: homeStyles.sectionTitle, children: "15 Evidence-Based Applications of Your Big Five Profile" }),
        /* @__PURE__ */ jsx("div", { className: homeStyles.grid, "aria-label": "Applications", children: bigFiveApplications.map((s, idx) => /* @__PURE__ */ jsxs("article", { className: homeStyles.methodCard, children: [
          /* @__PURE__ */ jsx("div", { className: homeStyles.methodIcon, "aria-hidden": "true", children: mbtiApplicationIcons[idx] ?? "🧩" }),
          /* @__PURE__ */ jsx("div", { className: homeStyles.methodTitle, children: s.title }),
          /* @__PURE__ */ jsx("div", { className: homeStyles.methodDesc, children: s.text }),
          /* @__PURE__ */ jsxs("div", { className: homeStyles.methodBenefits, children: [
            /* @__PURE__ */ jsx("strong", { children: "Benefits:" }),
            " ",
            s.benefits
          ] })
        ] }, s.title)) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: homeStyles.section, children: [
        /* @__PURE__ */ jsx("h2", { className: homeStyles.sectionTitle, children: "Extra Checklist (Precision & Application)" }),
        /* @__PURE__ */ jsxs("div", { className: homeStyles.listCard, children: [
          /* @__PURE__ */ jsx("ul", { className: homeStyles.list, children: bigFiveChecklist.map((c) => /* @__PURE__ */ jsx("li", { children: c }, c)) }),
          /* @__PURE__ */ jsx(Link, { to: startHref, className: homeStyles.secondaryButton, children: "Start the test →" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: homeStyles.section, children: [
        /* @__PURE__ */ jsx("h2", { className: homeStyles.sectionTitle, children: "Other assessments" }),
        /* @__PURE__ */ jsx("div", { className: homeStyles.grid, "aria-label": "Other assessments", children: assessments.filter((a) => a.id !== assessment.id).map((a) => /* @__PURE__ */ jsxs(
          Link,
          {
            to: a.id === "iq" ? "/" : `/assessments/${a.id}`,
            className: `${homeStyles.methodCard} ${homeStyles.linkCard}`,
            children: [
              /* @__PURE__ */ jsx("div", { className: homeStyles.methodIcon, "aria-hidden": "true", children: a.emoji }),
              /* @__PURE__ */ jsx("div", { className: homeStyles.methodTitle, children: a.name }),
              /* @__PURE__ */ jsx("div", { className: homeStyles.methodDesc, children: "Info page → start test" })
            ]
          },
          a.id
        )) })
      ] })
    ] });
  }
  if (assessment.id === "disc") {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs(Helmet, { children: [
        /* @__PURE__ */ jsx("title", { children: title2 }),
        /* @__PURE__ */ jsx("meta", { name: "description", content: description }),
        /* @__PURE__ */ jsx("meta", { name: "robots", content: "index, follow" }),
        /* @__PURE__ */ jsx("meta", { property: "og:title", content: title2 }),
        /* @__PURE__ */ jsx("meta", { property: "og:description", content: description }),
        /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" }),
        /* @__PURE__ */ jsx("meta", { property: "og:url", content: canonical }),
        /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: title2,
          description,
          author: { "@type": "Organization", name: brandName },
          mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
          articleSection: i18nStr(`${infoBaseKey}.helmet.articleSection`, "Personality"),
          keywords: i18nStr(
            `${infoBaseKey}.helmet.keywords`,
            "DISC, behavioral style, dominance, influence, steadiness, conscientiousness, workplace communication"
          )
        }) }),
        /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(breadcrumbJson) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: homeStyles.hero, children: [
        /* @__PURE__ */ jsx("h1", { className: homeStyles.title, children: title2 }),
        /* @__PURE__ */ jsx("p", { className: homeStyles.subtitle, children: description }),
        /* @__PURE__ */ jsx("div", { className: homeStyles.badges, "aria-label": "Highlights", children: (get(`${infoBaseKey}.badges`) ?? discBadges).map((b) => /* @__PURE__ */ jsx("span", { className: homeStyles.badge, children: b }, b)) }),
        /* @__PURE__ */ jsxs("div", { className: homeStyles.cta, children: [
          /* @__PURE__ */ jsx("h2", { className: homeStyles.ctaTitle, children: i18nStr(`${infoBaseKey}.cta.title`, "Start with your behavioral profile") }),
          /* @__PURE__ */ jsx("p", { className: homeStyles.ctaText, children: i18nStr(`${infoBaseKey}.cta.text`, "16 questions • 4 quadrants • priority stacking • instant report") }),
          /* @__PURE__ */ jsx(Link, { to: startHref, className: homeStyles.ctaButton, children: i18nStr(`${infoBaseKey}.cta.button`, "🧪 Take the DISC Assessment") })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: homeStyles.section, children: [
        /* @__PURE__ */ jsx("h2", { className: homeStyles.sectionTitle, children: "Is behavior destiny?" }),
        /* @__PURE__ */ jsx("div", { className: homeStyles.snippet, role: "note", "aria-label": "Key takeaway", children: "DISC measures natural tendencies (how you prefer to act) and adapted behaviors (how you act under pressure). Behaviors can be consciously modified to match context without changing who you are." }),
        /* @__PURE__ */ jsxs("div", { className: homeStyles.cards, children: [
          /* @__PURE__ */ jsxs("div", { className: homeStyles.card, children: [
            /* @__PURE__ */ jsx("div", { className: homeStyles.cardTitle, children: "Observable vs. Internal" }),
            /* @__PURE__ */ jsx("div", { className: homeStyles.cardText, children: "DISC measures what people see (external behavior), not why you do it (motivation). Two people may show High Dominance for different reasons, but the observable behavior is similar." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: homeStyles.card, children: [
            /* @__PURE__ */ jsx("div", { className: homeStyles.cardTitle, children: "What to optimize first" }),
            /* @__PURE__ */ jsx("div", { className: homeStyles.cardText, children: "Understanding your primary pace (fast vs slow) and priority (task vs people) improves team communication and reduces workplace friction." })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: homeStyles.section, children: [
        /* @__PURE__ */ jsx("h2", { className: homeStyles.sectionTitle, children: "The Four Behavioral Dimensions Explained" }),
        /* @__PURE__ */ jsx("div", { className: homeStyles.grid, "aria-label": "Dimensions", children: discDimensions.map((d) => /* @__PURE__ */ jsxs("div", { className: homeStyles.listCard, children: [
          /* @__PURE__ */ jsxs("div", { className: homeStyles.cardTitle, children: [
            /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: d.icon }),
            " ",
            d.title
          ] }),
          /* @__PURE__ */ jsx("div", { className: homeStyles.cardText, children: d.summary }),
          /* @__PURE__ */ jsxs("ul", { className: homeStyles.list, children: [
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "High:" }),
              " ",
              d.high
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Low:" }),
              " ",
              d.low
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Keywords:" }),
              " ",
              d.facets
            ] })
          ] })
        ] }, d.title)) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: homeStyles.section, children: [
        /* @__PURE__ */ jsx("h2", { className: homeStyles.sectionTitle, children: "15 Strategies to Leverage Your DISC Style" }),
        /* @__PURE__ */ jsx("div", { className: homeStyles.grid, "aria-label": "Strategies", children: discStrategies.map((s, idx) => /* @__PURE__ */ jsxs("article", { className: homeStyles.methodCard, children: [
          /* @__PURE__ */ jsx("div", { className: homeStyles.methodIcon, "aria-hidden": "true", children: mbtiApplicationIcons[idx] ?? "🧩" }),
          /* @__PURE__ */ jsx("div", { className: homeStyles.methodTitle, children: s.title }),
          /* @__PURE__ */ jsx("div", { className: homeStyles.methodDesc, children: s.text }),
          /* @__PURE__ */ jsxs("div", { className: homeStyles.methodBenefits, children: [
            /* @__PURE__ */ jsx("strong", { children: "Benefits:" }),
            " ",
            s.benefits
          ] })
        ] }, s.title)) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: homeStyles.section, children: [
        /* @__PURE__ */ jsx("h2", { className: homeStyles.sectionTitle, children: "Extra Checklist (Workplace Application)" }),
        /* @__PURE__ */ jsxs("div", { className: homeStyles.listCard, children: [
          /* @__PURE__ */ jsx("ul", { className: homeStyles.list, children: discChecklist.map((c) => /* @__PURE__ */ jsx("li", { children: c }, c)) }),
          /* @__PURE__ */ jsx(Link, { to: startHref, className: homeStyles.secondaryButton, children: "Start the test →" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: homeStyles.section, children: [
        /* @__PURE__ */ jsx("h2", { className: homeStyles.sectionTitle, children: "Other assessments" }),
        /* @__PURE__ */ jsx("div", { className: homeStyles.grid, "aria-label": "Other assessments", children: assessments.filter((a) => a.id !== assessment.id).map((a) => /* @__PURE__ */ jsxs(
          Link,
          {
            to: a.id === "iq" ? "/" : `/assessments/${a.id}`,
            className: `${homeStyles.methodCard} ${homeStyles.linkCard}`,
            children: [
              /* @__PURE__ */ jsx("div", { className: homeStyles.methodIcon, "aria-hidden": "true", children: a.emoji }),
              /* @__PURE__ */ jsx("div", { className: homeStyles.methodTitle, children: a.name }),
              /* @__PURE__ */ jsx("div", { className: homeStyles.methodDesc, children: "Info page → start test" })
            ]
          },
          a.id
        )) })
      ] })
    ] });
  }
  if (assessment.id === "enneagram") {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs(Helmet, { children: [
        /* @__PURE__ */ jsx("title", { children: title2 }),
        /* @__PURE__ */ jsx("meta", { name: "description", content: description }),
        /* @__PURE__ */ jsx("meta", { name: "robots", content: "index, follow" }),
        /* @__PURE__ */ jsx("meta", { property: "og:title", content: title2 }),
        /* @__PURE__ */ jsx("meta", { property: "og:description", content: description }),
        /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" }),
        /* @__PURE__ */ jsx("meta", { property: "og:url", content: canonical }),
        /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: title2,
          description,
          author: { "@type": "Organization", name: brandName },
          mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
          articleSection: i18nStr(`${infoBaseKey}.helmet.articleSection`, "Personality"),
          keywords: i18nStr(
            `${infoBaseKey}.helmet.keywords`,
            "Enneagram, core fear, core desire, triads, integration lines, stress lines, wings, health levels"
          )
        }) }),
        /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(breadcrumbJson) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: homeStyles.hero, children: [
        /* @__PURE__ */ jsx("h1", { className: homeStyles.title, children: title2 }),
        /* @__PURE__ */ jsx("p", { className: homeStyles.subtitle, children: description }),
        /* @__PURE__ */ jsx("div", { className: homeStyles.badges, "aria-label": "Highlights", children: (get(`${infoBaseKey}.badges`) ?? enneagramBadges).map((b) => /* @__PURE__ */ jsx("span", { className: homeStyles.badge, children: b }, b)) }),
        /* @__PURE__ */ jsxs("div", { className: homeStyles.cta, children: [
          /* @__PURE__ */ jsx("h2", { className: homeStyles.ctaTitle, children: i18nStr(`${infoBaseKey}.cta.title`, "Start with your core type discovery") }),
          /* @__PURE__ */ jsx("p", { className: homeStyles.ctaText, children: i18nStr(
            `${infoBaseKey}.cta.text`,
            "20 questions • 9 types • wing analysis • stress/security lines • instant report"
          ) }),
          /* @__PURE__ */ jsx(Link, { to: startHref, className: homeStyles.ctaButton, children: i18nStr(`${infoBaseKey}.cta.button`, "🧪 Take the Enneagram Assessment") })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: homeStyles.section, children: [
        /* @__PURE__ */ jsx("h2", { className: homeStyles.sectionTitle, children: "Can your type change?" }),
        /* @__PURE__ */ jsx("div", { className: homeStyles.snippet, role: "note", "aria-label": "Key takeaway", children: "Your core type remains constant—it forms early as a survival strategy. What changes is your health level (how balanced you are) and how flexibly you access other patterns." }),
        /* @__PURE__ */ jsxs("div", { className: homeStyles.cards, children: [
          /* @__PURE__ */ jsxs("div", { className: homeStyles.card, children: [
            /* @__PURE__ */ jsx("div", { className: homeStyles.cardTitle, children: "Type vs. Behavior" }),
            /* @__PURE__ */ jsx("div", { className: homeStyles.cardText, children: "Two people may act identically (e.g., workaholics) for opposite reasons. Enneagram reveals the why behind the what." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: homeStyles.card, children: [
            /* @__PURE__ */ jsx("div", { className: homeStyles.cardTitle, children: "What to optimize first" }),
            /* @__PURE__ */ jsx("div", { className: homeStyles.cardText, children: "Identify your Triad Center (Gut/Heart/Head). Balance the center you ignore: body, emotion, or thinking." })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: homeStyles.section, children: [
        /* @__PURE__ */ jsx("h2", { className: homeStyles.sectionTitle, children: "The Nine Types Explained by Triads" }),
        /* @__PURE__ */ jsx("div", { className: homeStyles.grid, "aria-label": "Triads", children: enneagramTriads.map((triad) => /* @__PURE__ */ jsxs("div", { className: homeStyles.listCard, children: [
          /* @__PURE__ */ jsx("div", { className: homeStyles.cardTitle, children: triad.title }),
          /* @__PURE__ */ jsxs("div", { className: homeStyles.cardText, children: [
            /* @__PURE__ */ jsx("strong", { children: "Core emotion:" }),
            " ",
            triad.coreEmotion
          ] }),
          /* @__PURE__ */ jsx("ul", { className: homeStyles.list, children: triad.types.map((t) => /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: t.name }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Core fear:" }),
              " ",
              t.fear
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Core desire:" }),
              " ",
              t.desire
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Pattern:" }),
              " ",
              t.pattern
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("strong", { children: "At best:" }),
              " ",
              t.best
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("strong", { children: "At worst:" }),
              " ",
              t.worst
            ] })
          ] }, t.name)) })
        ] }, triad.title)) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: homeStyles.section, children: [
        /* @__PURE__ */ jsx("h2", { className: homeStyles.sectionTitle, children: "15 Paths to Psychological Integration" }),
        /* @__PURE__ */ jsx("div", { className: homeStyles.grid, "aria-label": "Integration paths", children: enneagramPaths.map((s, idx) => /* @__PURE__ */ jsxs("article", { className: homeStyles.methodCard, children: [
          /* @__PURE__ */ jsx("div", { className: homeStyles.methodIcon, "aria-hidden": "true", children: mbtiApplicationIcons[idx] ?? "🧩" }),
          /* @__PURE__ */ jsx("div", { className: homeStyles.methodTitle, children: s.title }),
          /* @__PURE__ */ jsx("div", { className: homeStyles.methodDesc, children: s.text }),
          /* @__PURE__ */ jsxs("div", { className: homeStyles.methodBenefits, children: [
            /* @__PURE__ */ jsx("strong", { children: "Benefits:" }),
            " ",
            s.benefits
          ] })
        ] }, s.title)) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: homeStyles.section, children: [
        /* @__PURE__ */ jsx("h2", { className: homeStyles.sectionTitle, children: "Extra Checklist (Deep Work)" }),
        /* @__PURE__ */ jsxs("div", { className: homeStyles.listCard, children: [
          /* @__PURE__ */ jsx("ul", { className: homeStyles.list, children: enneagramChecklist.map((c) => /* @__PURE__ */ jsx("li", { children: c }, c)) }),
          /* @__PURE__ */ jsx(Link, { to: startHref, className: homeStyles.secondaryButton, children: "Start the test →" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: homeStyles.section, children: [
        /* @__PURE__ */ jsx("h2", { className: homeStyles.sectionTitle, children: "Other assessments" }),
        /* @__PURE__ */ jsx("div", { className: homeStyles.grid, "aria-label": "Other assessments", children: assessments.filter((a) => a.id !== assessment.id).map((a) => /* @__PURE__ */ jsxs(
          Link,
          {
            to: a.id === "iq" ? "/" : `/assessments/${a.id}`,
            className: `${homeStyles.methodCard} ${homeStyles.linkCard}`,
            children: [
              /* @__PURE__ */ jsx("div", { className: homeStyles.methodIcon, "aria-hidden": "true", children: a.emoji }),
              /* @__PURE__ */ jsx("div", { className: homeStyles.methodTitle, children: a.name }),
              /* @__PURE__ */ jsx("div", { className: homeStyles.methodDesc, children: "Info page → start test" })
            ]
          },
          a.id
        )) })
      ] })
    ] });
  }
  if (assessment.id === "holland") {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs(Helmet, { children: [
        /* @__PURE__ */ jsx("title", { children: title2 }),
        /* @__PURE__ */ jsx("meta", { name: "description", content: description }),
        /* @__PURE__ */ jsx("meta", { name: "robots", content: "index, follow" }),
        /* @__PURE__ */ jsx("meta", { property: "og:title", content: title2 }),
        /* @__PURE__ */ jsx("meta", { property: "og:description", content: description }),
        /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" }),
        /* @__PURE__ */ jsx("meta", { property: "og:url", content: canonical }),
        /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: title2,
          description,
          author: { "@type": "Organization", name: brandName },
          mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
          articleSection: i18nStr(`${infoBaseKey}.helmet.articleSection`, "Career"),
          keywords: i18nStr(
            `${infoBaseKey}.helmet.keywords`,
            "Holland Code, RIASEC, career interests, vocational profile, hexagon theory, career congruence, job satisfaction"
          )
        }) }),
        /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(breadcrumbJson) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: homeStyles.hero, children: [
        /* @__PURE__ */ jsx("h1", { className: homeStyles.title, children: title2 }),
        /* @__PURE__ */ jsx("p", { className: homeStyles.subtitle, children: description }),
        /* @__PURE__ */ jsx("div", { className: homeStyles.badges, "aria-label": "Highlights", children: (get(`${infoBaseKey}.badges`) ?? hollandBadges).map((b) => /* @__PURE__ */ jsx("span", { className: homeStyles.badge, children: b }, b)) }),
        /* @__PURE__ */ jsxs("div", { className: homeStyles.cta, children: [
          /* @__PURE__ */ jsx("h2", { className: homeStyles.ctaTitle, children: i18nStr(`${infoBaseKey}.cta.title`, "Start with your vocational profile") }),
          /* @__PURE__ */ jsx("p", { className: homeStyles.ctaText, children: i18nStr(
            `${infoBaseKey}.cta.text`,
            "48 questions • 6 personality types • 3-letter code • congruence scoring • career matching"
          ) }),
          /* @__PURE__ */ jsx(Link, { to: startHref, className: homeStyles.ctaButton, children: i18nStr(`${infoBaseKey}.cta.button`, "🧪 Take the RIASEC Assessment") })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: homeStyles.section, children: [
        /* @__PURE__ */ jsx("h2", { className: homeStyles.sectionTitle, children: "Is career destiny fixed?" }),
        /* @__PURE__ */ jsx("div", { className: homeStyles.snippet, role: "note", "aria-label": "Key takeaway", children: "Interests stabilize by age 25–30, but skills can be developed. The goal is finding the intersection: where your natural interests meet marketable abilities." }),
        /* @__PURE__ */ jsxs("div", { className: homeStyles.cards, children: [
          /* @__PURE__ */ jsxs("div", { className: homeStyles.card, children: [
            /* @__PURE__ */ jsx("div", { className: homeStyles.cardTitle, children: "Congruence = Satisfaction" }),
            /* @__PURE__ */ jsx("div", { className: homeStyles.cardText, children: "When your interests match your work environment, satisfaction rises and turnover drops. Mismatch creates daily friction that leads to burnout." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: homeStyles.card, children: [
            /* @__PURE__ */ jsx("div", { className: homeStyles.cardTitle, children: "What to optimize first" }),
            /* @__PURE__ */ jsx("div", { className: homeStyles.cardText, children: "Identify your 3-letter code (e.g., ASE, RIC, SEC). The first letter is your anchor; the third often shows avoidance areas (what drains you)." })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: homeStyles.section, children: [
        /* @__PURE__ */ jsx("h2", { className: homeStyles.sectionTitle, children: "The Six Interest Types Explained" }),
        /* @__PURE__ */ jsx("div", { className: homeStyles.grid, "aria-label": "RIASEC types", children: hollandTypes.map((t) => /* @__PURE__ */ jsxs("div", { className: homeStyles.listCard, children: [
          /* @__PURE__ */ jsxs("div", { className: homeStyles.cardTitle, children: [
            /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: t.icon }),
            " ",
            t.code,
            " — ",
            t.name
          ] }),
          /* @__PURE__ */ jsx("div", { className: homeStyles.cardText, children: t.summary }),
          /* @__PURE__ */ jsxs("ul", { className: homeStyles.list, children: [
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Core characteristics:" }),
              /* @__PURE__ */ jsx("ul", { className: homeStyles.list, children: t.characteristics.map((c) => /* @__PURE__ */ jsx("li", { children: c }, c)) })
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Ideal environments:" }),
              " ",
              t.environments
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Sample careers:" }),
              " ",
              t.careers
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Avoid:" }),
              " ",
              t.avoid
            ] })
          ] })
        ] }, t.code)) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: homeStyles.section, children: [
        /* @__PURE__ */ jsx("h2", { className: homeStyles.sectionTitle, children: "15 Strategies for Career Congruence" }),
        /* @__PURE__ */ jsx("div", { className: homeStyles.grid, "aria-label": "Strategies", children: hollandStrategies.map((s, idx) => /* @__PURE__ */ jsxs("article", { className: homeStyles.methodCard, children: [
          /* @__PURE__ */ jsx("div", { className: homeStyles.methodIcon, "aria-hidden": "true", children: mbtiApplicationIcons[idx] ?? "🧩" }),
          /* @__PURE__ */ jsx("div", { className: homeStyles.methodTitle, children: s.title }),
          /* @__PURE__ */ jsx("div", { className: homeStyles.methodDesc, children: s.text }),
          /* @__PURE__ */ jsxs("div", { className: homeStyles.methodBenefits, children: [
            /* @__PURE__ */ jsx("strong", { children: "Benefits:" }),
            " ",
            s.benefits
          ] })
        ] }, s.title)) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: homeStyles.section, children: [
        /* @__PURE__ */ jsx("h2", { className: homeStyles.sectionTitle, children: "Extra Checklist (Career Clarity)" }),
        /* @__PURE__ */ jsxs("div", { className: homeStyles.listCard, children: [
          /* @__PURE__ */ jsx("ul", { className: homeStyles.list, children: hollandChecklist.map((c) => /* @__PURE__ */ jsx("li", { children: c }, c)) }),
          /* @__PURE__ */ jsx(Link, { to: startHref, className: homeStyles.secondaryButton, children: "Start the test →" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: homeStyles.section, children: [
        /* @__PURE__ */ jsx("h2", { className: homeStyles.sectionTitle, children: "Other assessments" }),
        /* @__PURE__ */ jsx("div", { className: homeStyles.grid, "aria-label": "Other assessments", children: assessments.filter((a) => a.id !== assessment.id).map((a) => /* @__PURE__ */ jsxs(
          Link,
          {
            to: a.id === "iq" ? "/" : `/assessments/${a.id}`,
            className: `${homeStyles.methodCard} ${homeStyles.linkCard}`,
            children: [
              /* @__PURE__ */ jsx("div", { className: homeStyles.methodIcon, "aria-hidden": "true", children: a.emoji }),
              /* @__PURE__ */ jsx("div", { className: homeStyles.methodTitle, children: a.name }),
              /* @__PURE__ */ jsx("div", { className: homeStyles.methodDesc, children: "Info page → start test" })
            ]
          },
          a.id
        )) })
      ] })
    ] });
  }
  if (assessment.id === "eq") {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs(Helmet, { children: [
        /* @__PURE__ */ jsx("title", { children: title2 }),
        /* @__PURE__ */ jsx("meta", { name: "description", content: description }),
        /* @__PURE__ */ jsx("meta", { name: "robots", content: "index, follow" }),
        /* @__PURE__ */ jsx("meta", { property: "og:title", content: title2 }),
        /* @__PURE__ */ jsx("meta", { property: "og:description", content: description }),
        /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" }),
        /* @__PURE__ */ jsx("meta", { property: "og:url", content: canonical }),
        /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: title2,
          description,
          author: { "@type": "Organization", name: brandName },
          mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
          articleSection: i18nStr(`${infoBaseKey}.helmet.articleSection`, "Skills"),
          keywords: i18nStr(
            `${infoBaseKey}.helmet.keywords`,
            "Emotional intelligence, EQ test, emotional regulation, empathy, self-awareness, social skills, Mayer Salovey Caruso, Goleman"
          )
        }) }),
        /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(breadcrumbJson) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: homeStyles.hero, children: [
        /* @__PURE__ */ jsx("h1", { className: homeStyles.title, children: title2 }),
        /* @__PURE__ */ jsx("p", { className: homeStyles.subtitle, children: description }),
        /* @__PURE__ */ jsx("div", { className: homeStyles.badges, "aria-label": "Highlights", children: (get(`${infoBaseKey}.badges`) ?? eqBadges).map((b) => /* @__PURE__ */ jsx("span", { className: homeStyles.badge, children: b }, b)) }),
        /* @__PURE__ */ jsxs("div", { className: homeStyles.cta, children: [
          /* @__PURE__ */ jsx("h2", { className: homeStyles.ctaTitle, children: i18nStr(`${infoBaseKey}.cta.title`, "Start with your emotional profile") }),
          /* @__PURE__ */ jsx("p", { className: homeStyles.ctaText, children: i18nStr(`${infoBaseKey}.cta.text`, "25 questions • 4 branches • skill-based scoring • development plan") }),
          /* @__PURE__ */ jsx(Link, { to: startHref, className: homeStyles.ctaButton, children: i18nStr(`${infoBaseKey}.cta.button`, "🧪 Take the EQ Assessment") })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: homeStyles.section, children: [
        /* @__PURE__ */ jsx("h2", { className: homeStyles.sectionTitle, children: "Can EQ be learned?" }),
        /* @__PURE__ */ jsx("div", { className: homeStyles.snippet, role: "note", "aria-label": "Key takeaway", children: "Yes—unlike personality types, emotional intelligence is a cognitive skill set. With deliberate practice, EQ can improve noticeably within months." }),
        /* @__PURE__ */ jsxs("div", { className: homeStyles.cards, children: [
          /* @__PURE__ */ jsxs("div", { className: homeStyles.card, children: [
            /* @__PURE__ */ jsx("div", { className: homeStyles.cardTitle, children: "EQ vs. Personality" }),
            /* @__PURE__ */ jsx("div", { className: homeStyles.cardText, children: "An introvert can have high EQ. A conscientious person can have low EQ. EQ measures competence, not preference." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: homeStyles.card, children: [
            /* @__PURE__ */ jsx("div", { className: homeStyles.cardTitle, children: "What drives success" }),
            /* @__PURE__ */ jsx("div", { className: homeStyles.cardText, children: "EQ supports better relationships, decision-making, and leadership. IQ can open doors; EQ helps you grow inside the role." })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: homeStyles.section, children: [
        /* @__PURE__ */ jsx("h2", { className: homeStyles.sectionTitle, children: "The Four Branches of Emotional Intelligence" }),
        /* @__PURE__ */ jsx("div", { className: homeStyles.grid, "aria-label": "EQ branches", children: eqBranches.map((b) => /* @__PURE__ */ jsxs("div", { className: homeStyles.listCard, children: [
          /* @__PURE__ */ jsxs("div", { className: homeStyles.cardTitle, children: [
            /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: b.icon }),
            " ",
            b.title
          ] }),
          /* @__PURE__ */ jsx("div", { className: homeStyles.cardText, children: b.desc }),
          /* @__PURE__ */ jsxs("ul", { className: homeStyles.list, children: [
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "High:" }),
              " ",
              b.high
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Low:" }),
              " ",
              b.low
            ] })
          ] })
        ] }, b.title)) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: homeStyles.section, children: [
        /* @__PURE__ */ jsx("h2", { className: homeStyles.sectionTitle, children: "15 Strategies to Develop Your EQ" }),
        /* @__PURE__ */ jsx("div", { className: homeStyles.grid, "aria-label": "EQ strategies", children: eqStrategies.map((s, idx) => /* @__PURE__ */ jsxs("article", { className: homeStyles.methodCard, children: [
          /* @__PURE__ */ jsx("div", { className: homeStyles.methodIcon, "aria-hidden": "true", children: mbtiApplicationIcons[idx] ?? "🧩" }),
          /* @__PURE__ */ jsx("div", { className: homeStyles.methodTitle, children: s.title }),
          /* @__PURE__ */ jsx("div", { className: homeStyles.methodDesc, children: s.text }),
          /* @__PURE__ */ jsxs("div", { className: homeStyles.methodBenefits, children: [
            /* @__PURE__ */ jsx("strong", { children: "Benefits:" }),
            " ",
            s.benefits
          ] })
        ] }, s.title)) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: homeStyles.section, children: [
        /* @__PURE__ */ jsx("h2", { className: homeStyles.sectionTitle, children: "Extra Checklist" }),
        /* @__PURE__ */ jsxs("div", { className: homeStyles.listCard, children: [
          /* @__PURE__ */ jsx("ul", { className: homeStyles.list, children: eqChecklist.map((c) => /* @__PURE__ */ jsx("li", { children: c }, c)) }),
          /* @__PURE__ */ jsx(Link, { to: startHref, className: homeStyles.secondaryButton, children: "Start the test →" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: homeStyles.section, children: [
        /* @__PURE__ */ jsx("h2", { className: homeStyles.sectionTitle, children: "Other assessments" }),
        /* @__PURE__ */ jsx("div", { className: homeStyles.grid, "aria-label": "Other assessments", children: assessments.filter((a) => a.id !== assessment.id).map((a) => /* @__PURE__ */ jsxs(
          Link,
          {
            to: a.id === "iq" ? "/" : `/assessments/${a.id}`,
            className: `${homeStyles.methodCard} ${homeStyles.linkCard}`,
            children: [
              /* @__PURE__ */ jsx("div", { className: homeStyles.methodIcon, "aria-hidden": "true", children: a.emoji }),
              /* @__PURE__ */ jsx("div", { className: homeStyles.methodTitle, children: a.name }),
              /* @__PURE__ */ jsx("div", { className: homeStyles.methodDesc, children: "Info page → start test" })
            ]
          },
          a.id
        )) })
      ] })
    ] });
  }
  if (assessment.id === "love-languages") {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs(Helmet, { children: [
        /* @__PURE__ */ jsx("title", { children: title2 }),
        /* @__PURE__ */ jsx("meta", { name: "description", content: description }),
        /* @__PURE__ */ jsx("meta", { name: "robots", content: "index, follow" }),
        /* @__PURE__ */ jsx("meta", { property: "og:title", content: title2 }),
        /* @__PURE__ */ jsx("meta", { property: "og:description", content: description }),
        /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" }),
        /* @__PURE__ */ jsx("meta", { property: "og:url", content: canonical }),
        /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: title2,
          description,
          author: { "@type": "Organization", name: brandName },
          mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
          articleSection: i18nStr(`${infoBaseKey}.helmet.articleSection`, "Relationships"),
          keywords: i18nStr(
            `${infoBaseKey}.helmet.keywords`,
            "Love languages, Gary Chapman, relationship communication, intimacy, words of affirmation, quality time, gifts, acts of service, physical touch"
          )
        }) }),
        /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(breadcrumbJson) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: homeStyles.hero, children: [
        /* @__PURE__ */ jsx("h1", { className: homeStyles.title, children: title2 }),
        /* @__PURE__ */ jsx("p", { className: homeStyles.subtitle, children: description }),
        /* @__PURE__ */ jsx("div", { className: homeStyles.badges, "aria-label": "Highlights", children: (get(`${infoBaseKey}.badges`) ?? loveBadges).map((b) => /* @__PURE__ */ jsx("span", { className: homeStyles.badge, children: b }, b)) }),
        /* @__PURE__ */ jsxs("div", { className: homeStyles.cta, children: [
          /* @__PURE__ */ jsx("h2", { className: homeStyles.ctaTitle, children: i18nStr(`${infoBaseKey}.cta.title`, "Start with your love profile") }),
          /* @__PURE__ */ jsx("p", { className: homeStyles.ctaText, children: i18nStr(
            `${infoBaseKey}.cta.text`,
            "15 questions • 5 languages • primary + secondary scoring • compatibility guide"
          ) }),
          /* @__PURE__ */ jsx(Link, { to: startHref, className: homeStyles.ctaButton, children: i18nStr(`${infoBaseKey}.cta.button`, "🧪 Take the Love Languages Assessment") })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: homeStyles.section, children: [
        /* @__PURE__ */ jsx("h2", { className: homeStyles.sectionTitle, children: "Why do relationships fail?" }),
        /* @__PURE__ */ jsx("div", { className: homeStyles.snippet, role: "note", "aria-label": "Key takeaway", children: "Not because love ends, but because miscommunication begins. You give what you want to receive, while your partner needs something else. Languages bridge this gap." }),
        /* @__PURE__ */ jsxs("div", { className: homeStyles.cards, children: [
          /* @__PURE__ */ jsxs("div", { className: homeStyles.card, children: [
            /* @__PURE__ */ jsx("div", { className: homeStyles.cardTitle, children: "Universal but prioritized" }),
            /* @__PURE__ */ jsx("div", { className: homeStyles.cardText, children: "Everyone appreciates all five, but each person has a primary tank that fills fastest and drains slowest. Secondary languages help; speaking the primary transforms." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: homeStyles.card, children: [
            /* @__PURE__ */ jsx("div", { className: homeStyles.cardTitle, children: "Beyond romance" }),
            /* @__PURE__ */ jsx("div", { className: homeStyles.cardText, children: "Children have love languages. Teams have appreciation languages. Understanding yourself prevents resentment; understanding others prevents neglect." })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: homeStyles.section, children: [
        /* @__PURE__ */ jsx("h2", { className: homeStyles.sectionTitle, children: "The Five Love Languages Explained" }),
        /* @__PURE__ */ jsx("div", { className: homeStyles.grid, "aria-label": "Love languages", children: loveLanguages.map((l) => /* @__PURE__ */ jsxs("div", { className: homeStyles.listCard, children: [
          /* @__PURE__ */ jsxs("div", { className: homeStyles.cardTitle, children: [
            /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: l.icon }),
            " ",
            l.title
          ] }),
          /* @__PURE__ */ jsx("div", { className: homeStyles.cardText, children: l.summary }),
          /* @__PURE__ */ jsxs("ul", { className: homeStyles.list, children: [
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Speakers need:" }),
              " ",
              l.need
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Speakers feel:" }),
              " ",
              l.feel
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Danger zone:" }),
              " ",
              l.danger
            ] })
          ] })
        ] }, l.title)) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: homeStyles.section, children: [
        /* @__PURE__ */ jsx("h2", { className: homeStyles.sectionTitle, children: "15 Applications for Deeper Connection" }),
        /* @__PURE__ */ jsx("div", { className: homeStyles.grid, "aria-label": "Applications", children: loveApplications.map((s, idx) => /* @__PURE__ */ jsxs("article", { className: homeStyles.methodCard, children: [
          /* @__PURE__ */ jsx("div", { className: homeStyles.methodIcon, "aria-hidden": "true", children: mbtiApplicationIcons[idx] ?? "🧩" }),
          /* @__PURE__ */ jsx("div", { className: homeStyles.methodTitle, children: s.title }),
          /* @__PURE__ */ jsx("div", { className: homeStyles.methodDesc, children: s.text }),
          /* @__PURE__ */ jsxs("div", { className: homeStyles.methodBenefits, children: [
            /* @__PURE__ */ jsx("strong", { children: "Benefits:" }),
            " ",
            s.benefits
          ] })
        ] }, s.title)) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: homeStyles.section, children: [
        /* @__PURE__ */ jsx("h2", { className: homeStyles.sectionTitle, children: "Extra Checklist" }),
        /* @__PURE__ */ jsxs("div", { className: homeStyles.listCard, children: [
          /* @__PURE__ */ jsx("ul", { className: homeStyles.list, children: loveChecklist.map((c) => /* @__PURE__ */ jsx("li", { children: c }, c)) }),
          /* @__PURE__ */ jsx(Link, { to: startHref, className: homeStyles.secondaryButton, children: "Start the test →" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: homeStyles.section, children: [
        /* @__PURE__ */ jsx("h2", { className: homeStyles.sectionTitle, children: "Other assessments" }),
        /* @__PURE__ */ jsx("div", { className: homeStyles.grid, "aria-label": "Other assessments", children: assessments.filter((a) => a.id !== assessment.id).map((a) => /* @__PURE__ */ jsxs(
          Link,
          {
            to: a.id === "iq" ? "/" : `/assessments/${a.id}`,
            className: `${homeStyles.methodCard} ${homeStyles.linkCard}`,
            children: [
              /* @__PURE__ */ jsx("div", { className: homeStyles.methodIcon, "aria-hidden": "true", children: a.emoji }),
              /* @__PURE__ */ jsx("div", { className: homeStyles.methodTitle, children: a.name }),
              /* @__PURE__ */ jsx("div", { className: homeStyles.methodDesc, children: "Info page → start test" })
            ]
          },
          a.id
        )) })
      ] })
    ] });
  }
  if (assessment.id === "attachment") {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs(Helmet, { children: [
        /* @__PURE__ */ jsx("title", { children: title2 }),
        /* @__PURE__ */ jsx("meta", { name: "description", content: description }),
        /* @__PURE__ */ jsx("meta", { name: "robots", content: "index, follow" }),
        /* @__PURE__ */ jsx("meta", { property: "og:title", content: title2 }),
        /* @__PURE__ */ jsx("meta", { property: "og:description", content: description }),
        /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" }),
        /* @__PURE__ */ jsx("meta", { property: "og:url", content: canonical }),
        /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: title2,
          description,
          author: { "@type": "Organization", name: brandName },
          mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
          articleSection: i18nStr(`${infoBaseKey}.helmet.articleSection`, "Relationships"),
          keywords: i18nStr(
            `${infoBaseKey}.helmet.keywords`,
            "Attachment theory, Bowlby, Ainsworth, adult attachment, secure attachment, anxious attachment, avoidant attachment, earned security"
          )
        }) }),
        /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(breadcrumbJson) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: homeStyles.hero, children: [
        /* @__PURE__ */ jsx("h1", { className: homeStyles.title, children: title2 }),
        /* @__PURE__ */ jsx("p", { className: homeStyles.subtitle, children: description }),
        /* @__PURE__ */ jsx("div", { className: homeStyles.badges, "aria-label": "Highlights", children: (get(`${infoBaseKey}.badges`) ?? attachmentBadges).map((b) => /* @__PURE__ */ jsx("span", { className: homeStyles.badge, children: b }, b)) }),
        /* @__PURE__ */ jsxs("div", { className: homeStyles.cta, children: [
          /* @__PURE__ */ jsx("h2", { className: homeStyles.ctaTitle, children: i18nStr(`${infoBaseKey}.cta.title`, "Start with your attachment profile") }),
          /* @__PURE__ */ jsx("p", { className: homeStyles.ctaText, children: i18nStr(`${infoBaseKey}.cta.text`, "20 questions • 4 styles • anxiety/avoidance axes • healing strategies") }),
          /* @__PURE__ */ jsx(Link, { to: startHref, className: homeStyles.ctaButton, children: i18nStr(`${infoBaseKey}.cta.button`, "🧪 Take the Attachment Assessment") })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: homeStyles.section, children: [
        /* @__PURE__ */ jsx("h2", { className: homeStyles.sectionTitle, children: "Is attachment destiny?" }),
        /* @__PURE__ */ jsx("div", { className: homeStyles.snippet, role: "note", "aria-label": "Key takeaway", children: "Attachment is partly stable and partly changeable through earned security. Your childhood template predicts but doesn’t condemn: awareness + corrective experiences = transformation." }),
        /* @__PURE__ */ jsxs("div", { className: homeStyles.cards, children: [
          /* @__PURE__ */ jsxs("div", { className: homeStyles.card, children: [
            /* @__PURE__ */ jsx("div", { className: homeStyles.cardTitle, children: "The internal working model" }),
            /* @__PURE__ */ jsx("div", { className: homeStyles.cardText, children: "Attachment forms a nervous-system script: Are others reliable? Am I worthy of love? This script runs on autopilot until examined." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: homeStyles.card, children: [
            /* @__PURE__ */ jsx("div", { className: homeStyles.cardTitle, children: "Beyond romance" }),
            /* @__PURE__ */ jsx("div", { className: homeStyles.cardText, children: "Attachment affects friendships, parenting, and even workplace dynamics (how you relate to bosses can echo early caregiver dynamics)." })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: homeStyles.section, children: [
        /* @__PURE__ */ jsx("h2", { className: homeStyles.sectionTitle, children: "The Four Attachment Styles Explained" }),
        /* @__PURE__ */ jsx("div", { className: homeStyles.grid, "aria-label": "Attachment styles", children: attachmentStyles.map((s) => /* @__PURE__ */ jsxs("div", { className: homeStyles.listCard, children: [
          /* @__PURE__ */ jsxs("div", { className: homeStyles.cardTitle, children: [
            /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: s.icon }),
            " ",
            s.title
          ] }),
          /* @__PURE__ */ jsx("div", { className: homeStyles.cardText, children: s.summary }),
          /* @__PURE__ */ jsxs("ul", { className: homeStyles.list, children: [
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Signs:" }),
              " ",
              s.signs
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Childhood:" }),
              " ",
              s.childhood
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Mantra:" }),
              " ",
              s.mantra
            ] })
          ] })
        ] }, s.title)) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: homeStyles.section, children: [
        /* @__PURE__ */ jsx("h2", { className: homeStyles.sectionTitle, children: "15 Paths to Earned Security" }),
        /* @__PURE__ */ jsx("div", { className: homeStyles.grid, "aria-label": "Earned security paths", children: attachmentPaths.map((p, idx) => /* @__PURE__ */ jsxs("article", { className: homeStyles.methodCard, children: [
          /* @__PURE__ */ jsx("div", { className: homeStyles.methodIcon, "aria-hidden": "true", children: mbtiApplicationIcons[idx] ?? "🧩" }),
          /* @__PURE__ */ jsx("div", { className: homeStyles.methodTitle, children: p.title }),
          /* @__PURE__ */ jsx("div", { className: homeStyles.methodDesc, children: p.text }),
          /* @__PURE__ */ jsxs("div", { className: homeStyles.methodBenefits, children: [
            /* @__PURE__ */ jsx("strong", { children: "Benefits:" }),
            " ",
            p.benefits
          ] })
        ] }, p.title)) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: homeStyles.section, children: [
        /* @__PURE__ */ jsx("h2", { className: homeStyles.sectionTitle, children: "Extra Checklist" }),
        /* @__PURE__ */ jsxs("div", { className: homeStyles.listCard, children: [
          /* @__PURE__ */ jsx("ul", { className: homeStyles.list, children: attachmentChecklist.map((c) => /* @__PURE__ */ jsx("li", { children: c }, c)) }),
          /* @__PURE__ */ jsx(Link, { to: startHref, className: homeStyles.secondaryButton, children: "Start the test →" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: homeStyles.section, children: [
        /* @__PURE__ */ jsx("h2", { className: homeStyles.sectionTitle, children: "Other assessments" }),
        /* @__PURE__ */ jsx("div", { className: homeStyles.grid, "aria-label": "Other assessments", children: assessments.filter((a) => a.id !== assessment.id).map((a) => /* @__PURE__ */ jsxs(
          Link,
          {
            to: a.id === "iq" ? "/" : `/assessments/${a.id}`,
            className: `${homeStyles.methodCard} ${homeStyles.linkCard}`,
            children: [
              /* @__PURE__ */ jsx("div", { className: homeStyles.methodIcon, "aria-hidden": "true", children: a.emoji }),
              /* @__PURE__ */ jsx("div", { className: homeStyles.methodTitle, children: a.name }),
              /* @__PURE__ */ jsx("div", { className: homeStyles.methodDesc, children: "Info page → start test" })
            ]
          },
          a.id
        )) })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: title2 }),
      /* @__PURE__ */ jsx("meta", { name: "description", content: description }),
      /* @__PURE__ */ jsx("meta", { name: "robots", content: "index, follow" }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: title2 }),
      /* @__PURE__ */ jsx("meta", { property: "og:description", content: description }),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" }),
      /* @__PURE__ */ jsx("meta", { property: "og:url", content: canonical })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: styles.wrapper, children: [
      /* @__PURE__ */ jsxs("div", { className: styles.header, children: [
        /* @__PURE__ */ jsxs("h1", { className: styles.title, children: [
          /* @__PURE__ */ jsx("span", { className: styles.emoji, "aria-hidden": "true", children: assessment.emoji }),
          " ",
          assessment.name,
          " (Info)"
        ] }),
        /* @__PURE__ */ jsx("p", { className: styles.subtitle, children: "Hadi saf7a dyal l-ma3loumat." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: styles.card, children: [
        /* @__PURE__ */ jsx("div", { className: styles.cardTitle, children: "Ready to take the test?" }),
        /* @__PURE__ */ jsx("p", { className: styles.cardText, children: "Saf7at l-ikhtibar mوجدa daba كهيكلة فقط. Ghadi tji b الأسئلة و scoring من بعد." }),
        /* @__PURE__ */ jsxs(Link, { className: styles.primaryLink, to: startHref, children: [
          "Go to ",
          assessment.name,
          " Test →"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: styles.section, children: [
        /* @__PURE__ */ jsx("h2", { className: styles.sectionTitle, children: "Other assessments" }),
        /* @__PURE__ */ jsx("div", { className: styles.grid, children: assessments.filter((a) => a.id !== assessment.id).map((a) => /* @__PURE__ */ jsxs(Link, { to: a.id === "iq" ? "/" : `/assessments/${a.id}`, className: styles.gridCard, children: [
          /* @__PURE__ */ jsxs("div", { className: styles.gridTitle, children: [
            /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: a.emoji }),
            " ",
            a.name
          ] }),
          /* @__PURE__ */ jsx("div", { className: styles.gridDesc, children: "Info page → start test" })
        ] }, a.id)) })
      ] })
    ] })
  ] });
}
export {
  AssessmentInfoPage as A,
  styles as s
};

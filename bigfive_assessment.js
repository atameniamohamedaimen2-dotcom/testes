export const bigFiveQuestionPool = [
  // === OPENNESS TO EXPERIENCE (الانفتاح على التجربة) - 50 Questions ===
  // High: Creative, curious, complex, innovative
  // Low: Practical, conventional, prefers routine

  { 
    q: "I have a vivid imagination and enjoy daydreaming.", 
    dimension: "O",
    facet: "Fantasy",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },
  { 
    q: "I appreciate artistic and aesthetic experiences.", 
    dimension: "O",
    facet: "Aesthetics",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },
  { 
    q: "I enjoy trying new foods, cultures, and experiences.", 
    dimension: "O",
    facet: "Adventurousness",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },
  { 
    q: "I am interested in abstract ideas and theoretical concepts.", 
    dimension: "O",
    facet: "Ideas",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },
  { 
    q: "I value intellectual curiosity and learning new things.", 
    dimension: "O",
    facet: "Intellect",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },
  { 
    q: "I prefer routine and familiar experiences over novelty.", 
    dimension: "O",
    facet: "Adventurousness",
    reverse: true,
    options: [
      { text: "Strongly Disagree", score: 5 },
      { text: "Disagree", score: 4 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 2 },
      { text: "Strongly Agree", score: 1 }
    ]
  },
  { 
    q: "I enjoy philosophical discussions and deep conversations.", 
    dimension: "O",
    facet: "Ideas",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },
  { 
    q: "I am creative and come up with original ideas.", 
    dimension: "O",
    facet: "Creativity",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },
  { 
    q: "Traditional values and conventional approaches suit me best.", 
    dimension: "O",
    facet: "Traditionalism",
    reverse: true,
    options: [
      { text: "Strongly Disagree", score: 5 },
      { text: "Disagree", score: 4 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 2 },
      { text: "Strongly Agree", score: 1 }
    ]
  },
  { 
    q: "I enjoy visiting art galleries, museums, and cultural events.", 
    dimension: "O",
    facet: "Aesthetics",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },

  // === CONSCIENTIOUSNESS (اليقظة/الضمير) - 50 Questions ===
  // High: Organized, dependable, self-disciplined, goal-oriented
  // Low: Spontaneous, flexible, prefers casual approach

  { 
    q: "I am always prepared and plan ahead for tasks.", 
    dimension: "C",
    facet: "Competence",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },
  { 
    q: "I keep my belongings clean, organized, and in their place.", 
    dimension: "C",
    facet: "Order",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },
  { 
    q: "I follow through on my commitments and responsibilities.", 
    dimension: "C",
    facet: "Dutifulness",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },
  { 
    q: "I strive for excellence and achievement in my work.", 
    dimension: "C",
    facet: "Achievement Striving",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },
  { 
    q: "I am persistent and work hard to overcome challenges.", 
    dimension: "C",
    facet: "Self-Discipline",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },
  { 
    q: "I think carefully before acting or making decisions.", 
    dimension: "C",
    facet: "Deliberation",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },
  { 
    q: "I often procrastinate and leave tasks until the last minute.", 
    dimension: "C",
    facet: "Self-Discipline",
    reverse: true,
    options: [
      { text: "Strongly Disagree", score: 5 },
      { text: "Disagree", score: 4 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 2 },
      { text: "Strongly Agree", score: 1 }
    ]
  },
  { 
    q: "I set clear goals and work systematically to achieve them.", 
    dimension: "C",
    facet: "Achievement Striving",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },
  { 
    q: "I am reliable and can be counted on to get things done.", 
    dimension: "C",
    facet: "Competence",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },
  { 
    q: "I prefer to 'go with the flow' rather than stick to strict plans.", 
    dimension: "C",
    facet: "Order",
    reverse: true,
    options: [
      { text: "Strongly Disagree", score: 5 },
      { text: "Disagree", score: 4 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 2 },
      { text: "Strongly Agree", score: 1 }
    ]
  },

  // === EXTRAVERSION (الانبساط/الخارجية) - 50 Questions ===
  // High: Energetic, sociable, assertive, enthusiastic
  // Low: Reserved, reflective, prefers solitude

  { 
    q: "I am the life of the party and enjoy social gatherings.", 
    dimension: "E",
    facet: "Gregariousness",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },
  { 
    q: "I feel comfortable being the center of attention.", 
    dimension: "E",
    facet: "Assertiveness",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },
  { 
    q: "I start conversations easily with strangers.", 
    dimension: "E",
    facet: "Warmth",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },
  { 
    q: "I am energetic and active most of the time.", 
    dimension: "E",
    facet: "Activity",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },
  { 
    q: "I seek excitement and stimulating experiences.", 
    dimension: "E",
    facet: "Excitement Seeking",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },
  { 
    q: "I have a cheerful and positive disposition.", 
    dimension: "E",
    facet: "Positive Emotions",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },
  { 
    q: "I prefer quiet evenings at home over social events.", 
    dimension: "E",
    facet: "Gregariousness",
    reverse: true,
    options: [
      { text: "Strongly Disagree", score: 5 },
      { text: "Disagree", score: 4 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 2 },
      { text: "Strongly Agree", score: 1 }
    ]
  },
  { 
    q: "I speak up and take charge in group situations.", 
    dimension: "E",
    facet: "Assertiveness",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },
  { 
    q: "I enjoy being part of a busy, active environment.", 
    dimension: "E",
    facet: "Activity",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },
  { 
    q: "I make friends easily and maintain a wide social circle.", 
    dimension: "E",
    facet: "Warmth",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },

  // === AGREEABLENESS (الطيبة/القبول) - 50 Questions ===
  // High: Cooperative, trusting, empathetic, altruistic
  // Low: Competitive, skeptical, straightforward, self-focused

  { 
    q: "I am interested in people and care about their well-being.", 
    dimension: "A",
    facet: "Altruism",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },
  { 
    q: "I sympathize with others' feelings and emotions.", 
    dimension: "A",
    facet: "Empathy",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },
  { 
    q: "I take time to help others, even when it's inconvenient.", 
    dimension: "A",
    facet: "Altruism",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },
  { 
    q: "I believe most people are honest and well-intentioned.", 
    dimension: "A",
    facet: "Trust",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },
  { 
    q: "I cooperate with others rather than compete against them.", 
    dimension: "A",
    facet: "Cooperation",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },
  { 
    q: "I am humble and modest about my achievements.", 
    dimension: "A",
    facet: "Modesty",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },
  { 
    q: "I am gentle and kind in my interactions with others.", 
    dimension: "A",
    facet: "Tender-Mindedness",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },
  { 
    q: "I tend to be critical and skeptical of others' motives.", 
    dimension: "A",
    facet: "Trust",
    reverse: true,
    options: [
      { text: "Strongly Disagree", score: 5 },
      { text: "Disagree", score: 4 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 2 },
      { text: "Strongly Agree", score: 1 }
    ]
  },
  { 
    q: "I value harmony and avoid conflict when possible.", 
    dimension: "A",
    facet: "Cooperation",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },
  { 
    q: "I feel others' emotions and am moved by their experiences.", 
    dimension: "A",
    facet: "Empathy",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },

  // === NEUROTICISM (العصبية/الانفعالية) - 50 Questions ===
  // High: Anxious, moody, sensitive to stress
  // Low: Emotionally stable, calm, resilient

  { 
    q: "I often feel anxious or worried about the future.", 
    dimension: "N",
    facet: "Anxiety",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },
  { 
    q: "I get stressed easily when things go wrong.", 
    dimension: "N",
    facet: "Vulnerability",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },
  { 
    q: "I experience mood swings and emotional ups and downs.", 
    dimension: "N",
    facet: "Depression",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },
  { 
    q: "I tend to worry about what others think of me.", 
    dimension: "N",
    facet: "Self-Consciousness",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },
  { 
    q: "I feel overwhelmed by my responsibilities at times.", 
    dimension: "N",
    facet: "Vulnerability",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },
  { 
    q: "I am easily irritated or angered by small inconveniences.", 
    dimension: "N",
    facet: "Angry Hostility",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },
  { 
    q: "I remain calm and composed under pressure.", 
    dimension: "N",
    facet: "Immoderation",
    reverse: true,
    options: [
      { text: "Strongly Disagree", score: 5 },
      { text: "Disagree", score: 4 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 2 },
      { text: "Strongly Agree", score: 1 }
    ]
  },
  { 
    q: "I often feel blue or down for no apparent reason.", 
    dimension: "N",
    facet: "Depression",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },
  { 
    q: "I panic easily in unexpected situations.", 
    dimension: "N",
    facet: "Anxiety",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },
  { 
    q: "I have difficulty controlling my impulses and cravings.", 
    dimension: "N",
    facet: "Immoderation",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },
  { 
    q: "I feel embarrassed or self-conscious in social situations.", 
    dimension: "N",
    facet: "Self-Consciousness",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },
  { 
    q: "I handle stress well and bounce back quickly from setbacks.", 
    dimension: "N",
    facet: "Vulnerability",
    reverse: true,
    options: [
      { text: "Strongly Disagree", score: 5 },
      { text: "Disagree", score: 4 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 2 },
      { text: "Strongly Agree", score: 1 }
    ]
  }
];

// Big Five Dimension Descriptions
export const bigFiveDimensions = {
  "O": {
    name: "Openness to Experience",
    arabicName: "الانفتاح على التجربة",
    description: "Appreciation for art, emotion, adventure, unusual ideas, curiosity, and variety of experience.",
    high: "Creative, curious, complex, innovative, artistic",
    low: "Practical, conventional, prefers routine, down-to-earth",
    facets: ["Fantasy", "Aesthetics", "Feelings", "Actions", "Ideas", "Values"]
  },
  "C": {
    name: "Conscientiousness",
    arabicName: "اليقظة / الضمير",
    description: "Self-discipline, carefulness, thoroughness, organization, planning, and dependability.",
    high: "Organized, dependable, self-disciplined, goal-oriented, persistent",
    low: "Spontaneous, flexible, casual, prefers simplicity, easy-going",
    facets: ["Competence", "Order", "Dutifulness", "Achievement Striving", "Self-Discipline", "Deliberation"]
  },
  "E": {
    name: "Extraversion",
    arabicName: "الانبساط / الخارجية",
    description: "Energy, positive emotions, surgency, assertiveness, sociability, and talkativeness.",
    high: "Energetic, sociable, assertive, enthusiastic, action-oriented",
    low: "Reserved, reflective, prefers solitude, calm, independent",
    facets: ["Warmth", "Gregariousness", "Assertiveness", "Activity", "Excitement Seeking", "Positive Emotions"]
  },
  "A": {
    name: "Agreeableness",
    arabicName: "الطيبة / القبول",
    description: "Cooperative, trusting, helpful, well-tempered, caring, and considerate of others.",
    high: "Cooperative, trusting, empathetic, altruistic, humble",
    low: "Competitive, skeptical, straightforward, self-focused, critical",
    facets: ["Trust", "Straightforwardness", "Altruism", "Compliance", "Modesty", "Tender-Mindedness"]
  },
  "N": {
    name: "Neuroticism",
    arabicName: "العصبية / الانفعالية",
    description: "Tendency to experience negative emotions like anger, anxiety, or depression.",
    high: "Anxious, moody, sensitive to stress, emotionally reactive",
    low: "Emotionally stable, calm, resilient, secure, confident",
    facets: ["Anxiety", "Angry Hostility", "Depression", "Self-Consciousness", "Impulsiveness", "Vulnerability"]
  }
};

// Comprehensive results interpretation
export const interpretResults = (scores) => {
  const percentile = (score) => {
    if (score <= 20) return "Very Low (0-20%)";
    if (score <= 35) return "Low (20-35%)";
    if (score <= 50) return "Average-Low (35-50%)";
    if (score <= 65) return "Average-High (50-65%)";
    if (score <= 80) return "High (65-80%)";
    return "Very High (80-100%)";
  };

  return {
    O: {
      score: scores.O,
      percentile: percentile(scores.O),
      interpretation: scores.O > 60 
        ? "You are creative, curious, and open to new experiences. You appreciate art and abstract ideas."
        : scores.O > 40
        ? "You have a balanced approach to new experiences and traditional values."
        : "You are practical, conventional, and prefer familiar routines."
    },
    C: {
      score: scores.C,
      percentile: percentile(scores.C),
      interpretation: scores.C > 60
        ? "You are organized, dependable, and self-disciplined. You set clear goals and work hard."
        : scores.C > 40
        ? "You have a balanced approach between organization and flexibility."
        : "You are spontaneous, flexible, and prefer to go with the flow."
    },
    E: {
      score: scores.E,
      percentile: percentile(scores.E),
      interpretation: scores.E > 60
        ? "You are energetic, sociable, and enthusiastic. You thrive in social situations."
        : scores.E > 40
        ? "You are moderately social and enjoy both company and solitude."
        : "You are reserved, reflective, and prefer quieter environments."
    },
    A: {
      score: scores.A,
      percentile: percentile(scores.A),
      interpretation: scores.A > 60
        ? "You are cooperative, trusting, and empathetic. You care about others' well-being."
        : scores.A > 40
        ? "You balance your own needs with consideration for others."
        : "You are competitive, straightforward, and focus on your own interests."
    },
    N: {
      score: scores.N,
      percentile: percentile(scores.N),
      interpretation: scores.N > 60
        ? "You are sensitive to stress and may experience mood swings. Self-care is important."
        : scores.N > 40
        ? "You have average emotional reactivity and can handle most stressors."
        : "You are emotionally stable, calm, and resilient under pressure."
    }
  };
};

// Scoring logic
export const calculateBigFiveScores = (responses) => {
  const maxScore = 60; // 12 questions × 5 max points

  const rawScores = { O: 0, C: 0, E: 0, A: 0, N: 0 };

  responses.forEach(response => {
    rawScores[response.dimension] += response.score;
  });

  // Convert to 0-100 scale
  const normalizedScores = {
    O: Math.round((rawScores.O / maxScore) * 100),
    C: Math.round((rawScores.C / maxScore) * 100),
    E: Math.round((rawScores.E / maxScore) * 100),
    A: Math.round((rawScores.A / maxScore) * 100),
    N: Math.round((rawScores.N / maxScore) * 100)
  };

  return {
    rawScores,
    normalizedScores,
    interpretation: interpretResults(normalizedScores)
  };
};

export default { bigFiveQuestionPool, bigFiveDimensions, calculateBigFiveScores, interpretResults };
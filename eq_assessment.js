// eq_assessment.js
// Emotional Intelligence (EQ) Assessment - The Emotional Competency Inventory
// 48 questions (8 per dimension) with Likert scale options

export const eqQuestionPool = [
  // === SELF-AWARENESS (SA) - Recognizing one's own emotions, strengths, limits ===
  {
    q: "I am aware of my emotions as I experience them.",
    dimension: "SA",
    facet: "Emotional Awareness",
    options: [
      { text: "Never", score: 1 },
      { text: "Rarely", score: 2 },
      { text: "Sometimes", score: 3 },
      { text: "Often", score: 4 },
      { text: "Always", score: 5 }
    ]
  },
  {
    q: "I understand why I feel the way I feel.",
    dimension: "SA",
    facet: "Emotional Clarity",
    options: [
      { text: "Never", score: 1 },
      { text: "Rarely", score: 2 },
      { text: "Sometimes", score: 3 },
      { text: "Often", score: 4 },
      { text: "Always", score: 5 }
    ]
  },
  {
    q: "I recognize how my emotions affect my thoughts and decisions.",
    dimension: "SA",
    facet: "Impact Awareness",
    options: [
      { text: "Never", score: 1 },
      { text: "Rarely", score: 2 },
      { text: "Sometimes", score: 3 },
      { text: "Often", score: 4 },
      { text: "Always", score: 5 }
    ]
  },
  {
    q: "I am aware of my strengths and weaknesses without being defensive.",
    dimension: "SA",
    facet: "Self-Accuracy",
    options: [
      { text: "Never", score: 1 },
      { text: "Rarely", score: 2 },
      { text: "Sometimes", score: 3 },
      { text: "Often", score: 4 },
      { text: "Always", score: 5 }
    ]
  },
  {
    q: "I notice physical signs of stress or emotion in my body.",
    dimension: "SA",
    facet: "Somatic Awareness",
    options: [
      { text: "Never", score: 1 },
      { text: "Rarely", score: 2 },
      { text: "Sometimes", score: 3 },
      { text: "Often", score: 4 },
      { text: "Always", score: 5 }
    ]
  },
  {
    q: "I can name my emotions with precision (e.g., frustrated vs. angry).",
    dimension: "SA",
    facet: "Emotional Vocabulary",
    options: [
      { text: "Never", score: 1 },
      { text: "Rarely", score: 2 },
      { text: "Sometimes", score: 3 },
      { text: "Often", score: 4 },
      { text: "Always", score: 5 }
    ]
  },
  {
    q: "I understand how my past experiences shape my emotional reactions.",
    dimension: "SA",
    facet: "Psychological Insight",
    options: [
      { text: "Never", score: 1 },
      { text: "Rarely", score: 2 },
      { text: "Sometimes", score: 3 },
      { text: "Often", score: 4 },
      { text: "Always", score: 5 }
    ]
  },
  {
    q: "I can accurately describe my emotional state to others.",
    dimension: "SA",
    facet: "Emotional Expression",
    options: [
      { text: "Never", score: 1 },
      { text: "Rarely", score: 2 },
      { text: "Sometimes", score: 3 },
      { text: "Often", score: 4 },
      { text: "Always", score: 5 }
    ]
  },

  // === SELF-REGULATION (SR) - Managing one's own emotions, impulses, adaptability ===
  {
    q: "I can calm myself down when I feel upset or angry.",
    dimension: "SR",
    facet: "Emotional Control",
    options: [
      { text: "Never", score: 1 },
      { text: "Rarely", score: 2 },
      { text: "Sometimes", score: 3 },
      { text: "Often", score: 4 },
      { text: "Always", score: 5 }
    ]
  },
  {
    q: "I think before I speak, especially when emotional.",
    dimension: "SR",
    facet: "Impulse Control",
    options: [
      { text: "Never", score: 1 },
      { text: "Rarely", score: 2 },
      { text: "Sometimes", score: 3 },
      { text: "Often", score: 4 },
      { text: "Always", score: 5 }
    ]
  },
  {
    q: "I adapt well to changes and unexpected situations.",
    dimension: "SR",
    facet: "Adaptability",
    options: [
      { text: "Never", score: 1 },
      { text: "Rarely", score: 2 },
      { text: "Sometimes", score: 3 },
      { text: "Often", score: 4 },
      { text: "Always", score: 5 }
    ]
  },
  {
    q: "I can resist temptation and delay gratification.",
    dimension: "SR",
    facet: "Self-Discipline",
    options: [
      { text: "Never", score: 1 },
      { text: "Rarely", score: 2 },
      { text: "Sometimes", score: 3 },
      { text: "Often", score: 4 },
      { text: "Always", score: 5 }
    ]
  },
  {
    q: "I take responsibility for my mistakes rather than blaming others.",
    dimension: "SR",
    facet: "Accountability",
    options: [
      { text: "Never", score: 1 },
      { text: "Rarely", score: 2 },
      { text: "Sometimes", score: 3 },
      { text: "Often", score: 4 },
      { text: "Always", score: 5 }
    ]
  },
  {
    q: "I remain calm and composed under pressure.",
    dimension: "SR",
    facet: "Stress Tolerance",
    options: [
      { text: "Never", score: 1 },
      { text: "Rarely", score: 2 },
      { text: "Sometimes", score: 3 },
      { text: "Often", score: 4 },
      { text: "Always", score: 5 }
    ]
  },
  {
    q: "I can bounce back quickly from setbacks or disappointments.",
    dimension: "SR",
    facet: "Resilience",
    options: [
      { text: "Never", score: 1 },
      { text: "Rarely", score: 2 },
      { text: "Sometimes", score: 3 },
      { text: "Often", score: 4 },
      { text: "Always", score: 5 }
    ]
  },
  {
    q: "I control my negative thoughts and avoid spiraling into pessimism.",
    dimension: "SR",
    facet: "Cognitive Reappraisal",
    options: [
      { text: "Never", score: 1 },
      { text: "Rarely", score: 2 },
      { text: "Sometimes", score: 3 },
      { text: "Often", score: 4 },
      { text: "Always", score: 5 }
    ]
  },

  // === MOTIVATION (MO) - Internal drive, optimism, commitment, initiative ===
  {
    q: "I set personal goals and work consistently toward them.",
    dimension: "MO",
    facet: "Achievement Drive",
    options: [
      { text: "Never", score: 1 },
      { text: "Rarely", score: 2 },
      { text: "Sometimes", score: 3 },
      { text: "Often", score: 4 },
      { text: "Always", score: 5 }
    ]
  },
  {
    q: "I take initiative without waiting for others to tell me what to do.",
    dimension: "MO",
    facet: "Initiative",
    options: [
      { text: "Never", score: 1 },
      { text: "Rarely", score: 2 },
      { text: "Sometimes", score: 3 },
      { text: "Often", score: 4 },
      { text: "Always", score: 5 }
    ]
  },
  {
    q: "I remain optimistic even when things don't go my way.",
    dimension: "MO",
    facet: "Optimism",
    options: [
      { text: "Never", score: 1 },
      { text: "Rarely", score: 2 },
      { text: "Sometimes", score: 3 },
      { text: "Often", score: 4 },
      { text: "Always", score: 5 }
    ]
  },
  {
    q: "I am committed to my work and follow through on promises.",
    dimension: "MO",
    facet: "Commitment",
    options: [
      { text: "Never", score: 1 },
      { text: "Rarely", score: 2 },
      { text: "Sometimes", score: 3 },
      { text: "Often", score: 4 },
      { text: "Always", score: 5 }
    ]
  },
  {
    q: "I seek challenges because they help me grow.",
    dimension: "MO",
    facet: "Learning Orientation",
    options: [
      { text: "Never", score: 1 },
      { text: "Rarely", score: 2 },
      { text: "Sometimes", score: 3 },
      { text: "Often", score: 4 },
      { text: "Always", score: 5 }
    ]
  },
  {
    q: "I persist in the face of obstacles and don't give up easily.",
    dimension: "MO",
    facet: "Persistence",
    options: [
      { text: "Never", score: 1 },
      { text: "Rarely", score: 2 },
      { text: "Sometimes", score: 3 },
      { text: "Often", score: 4 },
      { text: "Always", score: 5 }
    ]
  },
  {
    q: "I find meaning and purpose in what I do, even during difficult times.",
    dimension: "MO",
    facet: "Purpose",
    options: [
      { text: "Never", score: 1 },
      { text: "Rarely", score: 2 },
      { text: "Sometimes", score: 3 },
      { text: "Often", score: 4 },
      { text: "Always", score: 5 }
    ]
  },
  {
    q: "I am motivated by internal satisfaction more than external rewards.",
    dimension: "MO",
    facet: "Intrinsic Motivation",
    options: [
      { text: "Never", score: 1 },
      { text: "Rarely", score: 2 },
      { text: "Sometimes", score: 3 },
      { text: "Often", score: 4 },
      { text: "Always", score: 5 }
    ]
  },

  // === EMPATHY (EM) - Understanding others' feelings, perspective-taking ===
  {
    q: "I can tell when someone is feeling upset even if they don't say it.",
    dimension: "EM",
    facet: "Emotional Perception",
    options: [
      { text: "Never", score: 1 },
      { text: "Rarely", score: 2 },
      { text: "Sometimes", score: 3 },
      { text: "Often", score: 4 },
      { text: "Always", score: 5 }
    ]
  },
  {
    q: "I listen to others without interrupting or judging.",
    dimension: "EM",
    facet: "Active Listening",
    options: [
      { text: "Never", score: 1 },
      { text: "Rarely", score: 2 },
      { text: "Sometimes", score: 3 },
      { text: "Often", score: 4 },
      { text: "Always", score: 5 }
    ]
  },
  {
    q: "I can see things from another person's perspective, even if I disagree.",
    dimension: "EM",
    facet: "Perspective Taking",
    options: [
      { text: "Never", score: 1 },
      { text: "Rarely", score: 2 },
      { text: "Sometimes", score: 3 },
      { text: "Often", score: 4 },
      { text: "Always", score: 5 }
    ]
  },
  {
    q: "I feel genuine concern when others are suffering.",
    dimension: "EM",
    facet: "Compassion",
    options: [
      { text: "Never", score: 1 },
      { text: "Rarely", score: 2 },
      { text: "Sometimes", score: 3 },
      { text: "Often", score: 4 },
      { text: "Always", score: 5 }
    ]
  },
  {
    q: "I am sensitive to nonverbal cues (tone, body language, facial expression).",
    dimension: "EM",
    facet: "Nonverbal Sensitivity",
    options: [
      { text: "Never", score: 1 },
      { text: "Rarely", score: 2 },
      { text: "Sometimes", score: 3 },
      { text: "Often", score: 4 },
      { text: "Always", score: 5 }
    ]
  },
  {
    q: "I can understand why someone might react differently than I would.",
    dimension: "EM",
    facet: "Cognitive Empathy",
    options: [
      { text: "Never", score: 1 },
      { text: "Rarely", score: 2 },
      { text: "Sometimes", score: 3 },
      { text: "Often", score: 4 },
      { text: "Always", score: 5 }
    ]
  },
  {
    q: "I ask questions to better understand how others feel.",
    dimension: "EM",
    facet: "Curiosity about Others",
    options: [
      { text: "Never", score: 1 },
      { text: "Rarely", score: 2 },
      { text: "Sometimes", score: 3 },
      { text: "Often", score: 4 },
      { text: "Always", score: 5 }
    ]
  },
  {
    q: "I am tolerant of people with different backgrounds or beliefs.",
    dimension: "EM",
    facet: "Open-mindedness",
    options: [
      { text: "Never", score: 1 },
      { text: "Rarely", score: 2 },
      { text: "Sometimes", score: 3 },
      { text: "Often", score: 4 },
      { text: "Always", score: 5 }
    ]
  },

  // === SOCIAL SKILLS (SS) - Relationship management, communication, influence ===
  {
    q: "I communicate clearly and assertively without being aggressive.",
    dimension: "SS",
    facet: "Assertive Communication",
    options: [
      { text: "Never", score: 1 },
      { text: "Rarely", score: 2 },
      { text: "Sometimes", score: 3 },
      { text: "Often", score: 4 },
      { text: "Always", score: 5 }
    ]
  },
  {
    q: "I resolve conflicts constructively and find win-win solutions.",
    dimension: "SS",
    facet: "Conflict Resolution",
    options: [
      { text: "Never", score: 1 },
      { text: "Rarely", score: 2 },
      { text: "Sometimes", score: 3 },
      { text: "Often", score: 4 },
      { text: "Always", score: 5 }
    ]
  },
  {
    q: "I build and maintain positive relationships easily.",
    dimension: "SS",
    facet: "Relationship Building",
    options: [
      { text: "Never", score: 1 },
      { text: "Rarely", score: 2 },
      { text: "Sometimes", score: 3 },
      { text: "Often", score: 4 },
      { text: "Always", score: 5 }
    ]
  },
  {
    q: "I can influence others without manipulating or forcing.",
    dimension: "SS",
    facet: "Influence",
    options: [
      { text: "Never", score: 1 },
      { text: "Rarely", score: 2 },
      { text: "Sometimes", score: 3 },
      { text: "Often", score: 4 },
      { text: "Always", score: 5 }
    ]
  },
  {
    q: "I work well in teams and contribute to group harmony.",
    dimension: "SS",
    facet: "Collaboration",
    options: [
      { text: "Never", score: 1 },
      { text: "Rarely", score: 2 },
      { text: "Sometimes", score: 3 },
      { text: "Often", score: 4 },
      { text: "Always", score: 5 }
    ]
  },
  {
    q: "I give and receive feedback effectively without defensiveness.",
    dimension: "SS",
    facet: "Feedback Skills",
    options: [
      { text: "Never", score: 1 },
      { text: "Rarely", score: 2 },
      { text: "Sometimes", score: 3 },
      { text: "Often", score: 4 },
      { text: "Always", score: 5 }
    ]
  },
  {
    q: "I lead or inspire others when opportunities arise.",
    dimension: "SS",
    facet: "Leadership",
    options: [
      { text: "Never", score: 1 },
      { text: "Rarely", score: 2 },
      { text: "Sometimes", score: 3 },
      { text: "Often", score: 4 },
      { text: "Always", score: 5 }
    ]
  },
  {
    q: "I am comfortable initiating conversations with strangers.",
    dimension: "SS",
    facet: "Social Initiation",
    options: [
      { text: "Never", score: 1 },
      { text: "Rarely", score: 2 },
      { text: "Sometimes", score: 3 },
      { text: "Often", score: 4 },
      { text: "Always", score: 5 }
    ]
  }
];

// EQ Dimension Descriptions
export const eqDimensions = {
  "SA": {
    name: "Self-Awareness",
    arabicName: "الوعي الذاتي",
    description: "Ability to recognize and understand your own emotions, strengths, weaknesses, and values.",
    high: "Emotionally insightful, reflective, authentic",
    low: "Emotionally disconnected, unaware of triggers, reactive",
    facets: ["Emotional Awareness", "Emotional Clarity", "Impact Awareness", "Self-Accuracy"]
  },
  "SR": {
    name: "Self-Regulation",
    arabicName: "التنظيم الذاتي",
    description: "Ability to manage your emotions, impulses, and adapt to changing circumstances.",
    high: "Calm under pressure, resilient, trustworthy",
    low: "Impulsive, volatile, easily stressed",
    facets: ["Emotional Control", "Impulse Control", "Adaptability", "Stress Tolerance"]
  },
  "MO": {
    name: "Motivation",
    arabicName: "الدافع الذاتي",
    description: "Inner drive to achieve, persist, and find meaning beyond external rewards.",
    high: "Goal-oriented, optimistic, self-disciplined",
    low: "Apathetic, easily discouraged, lacking direction",
    facets: ["Achievement Drive", "Initiative", "Optimism", "Persistence"]
  },
  "EM": {
    name: "Empathy",
    arabicName: "التعاطف",
    description: "Ability to understand and share the feelings of others.",
    high: "Compassionate, good listener, perceptive",
    low: "Insensitive, self-absorbed, poor perspective-taking",
    facets: ["Emotional Perception", "Active Listening", "Perspective Taking", "Compassion"]
  },
  "SS": {
    name: "Social Skills",
    arabicName: "المهارات الاجتماعية",
    description: "Proficiency in managing relationships, communicating, and influencing others.",
    high: "Charismatic, collaborative, persuasive",
    low: "Awkward, conflict-prone, isolated",
    facets: ["Assertive Communication", "Conflict Resolution", "Relationship Building", "Influence"]
  }
};

// Calculate EQ scores and overall EQ
export const calculateEQScores = (responses) => {
  // 8 questions per dimension, max 5 each = 40 max per dimension
  const maxPerDimension = 40;
  const dimensions = ["SA", "SR", "MO", "EM", "SS"];
  const rawScores = { SA: 0, SR: 0, MO: 0, EM: 0, SS: 0 };

  responses.forEach(response => {
    rawScores[response.dimension] += response.score;
  });

  // Normalize to 0-100
  const normalizedScores = {};
  for (let dim of dimensions) {
    normalizedScores[dim] = Math.round((rawScores[dim] / maxPerDimension) * 100);
  }

  // Overall EQ score (average of 5 dimensions)
  const overallEQ = Math.round(
    (normalizedScores.SA + normalizedScores.SR + normalizedScores.MO + 
     normalizedScores.EM + normalizedScores.SS) / 5
  );

  return {
    rawScores,
    normalizedScores,
    overallEQ
  };
};

// Interpret EQ scores with percentiles and actionable advice
export const interpretEQ = (scores) => {
  const percentile = (score) => {
    if (score <= 20) return "Very Low (0-20%)";
    if (score <= 40) return "Low (20-40%)";
    if (score <= 60) return "Moderate (40-60%)";
    if (score <= 80) return "High (60-80%)";
    return "Very High (80-100%)";
  };

  const getInterpretation = (dim, score) => {
    if (dim === "SA") {
      if (score >= 70) return "You have strong self-awareness. You understand your emotions and their impact.";
      if (score >= 40) return "You have moderate self-awareness. Journaling or mindfulness can deepen it.";
      return "You may struggle to recognize your emotions. Practice identifying feelings daily.";
    }
    if (dim === "SR") {
      if (score >= 70) return "You manage emotions well and stay calm under pressure.";
      if (score >= 40) return "You regulate emotions sometimes but can be reactive. Try deep breathing.";
      return "You may have difficulty controlling impulses. Practice pause before reacting.";
    }
    if (dim === "MO") {
      if (score >= 70) return "You are highly motivated and optimistic. Great resilience.";
      if (score >= 40) return "You have good drive but can lose focus. Set small achievable goals.";
      return "You may lack inner motivation. Connect tasks to meaningful values.";
    }
    if (dim === "EM") {
      if (score >= 70) return "You are very empathetic and perceptive of others' feelings.";
      if (score >= 40) return "You show empathy sometimes. Practice active listening.";
      return "You may miss emotional cues. Ask more questions about how others feel.";
    }
    if (dim === "SS") {
      if (score >= 70) return "You have excellent social skills and build strong relationships.";
      if (score >= 40) return "Your social skills are developing. Work on assertiveness.";
      return "Social interactions may be challenging. Seek feedback and practice small talk.";
    }
    return "";
  };

  const strengths = [];
  const weaknesses = [];
  for (let dim of ["SA", "SR", "MO", "EM", "SS"]) {
    if (scores.normalizedScores[dim] >= 70) strengths.push(eqDimensions[dim].name);
    if (scores.normalizedScores[dim] <= 35) weaknesses.push(eqDimensions[dim].name);
  }

  let overallLevel = "";
  if (scores.overallEQ >= 70) overallLevel = "High Emotional Intelligence";
  else if (scores.overallEQ >= 50) overallLevel = "Moderate Emotional Intelligence";
  else overallLevel = "Developing Emotional Intelligence";

  return {
    overallEQ: scores.overallEQ,
    overallLevel,
    dimensions: {
      SA: {
        score: scores.normalizedScores.SA,
        percentile: percentile(scores.normalizedScores.SA),
        interpretation: getInterpretation("SA", scores.normalizedScores.SA)
      },
      SR: {
        score: scores.normalizedScores.SR,
        percentile: percentile(scores.normalizedScores.SR),
        interpretation: getInterpretation("SR", scores.normalizedScores.SR)
      },
      MO: {
        score: scores.normalizedScores.MO,
        percentile: percentile(scores.normalizedScores.MO),
        interpretation: getInterpretation("MO", scores.normalizedScores.MO)
      },
      EM: {
        score: scores.normalizedScores.EM,
        percentile: percentile(scores.normalizedScores.EM),
        interpretation: getInterpretation("EM", scores.normalizedScores.EM)
      },
      SS: {
        score: scores.normalizedScores.SS,
        percentile: percentile(scores.normalizedScores.SS),
        interpretation: getInterpretation("SS", scores.normalizedScores.SS)
      }
    },
    strengths: strengths.length ? strengths : ["No dominant strength yet – keep developing all areas"],
    areasForGrowth: weaknesses.length ? weaknesses : ["All areas are balanced – focus on maintaining"],
    advice: overallLevel === "High Emotional Intelligence" 
      ? "You are emotionally competent. Use your skills to mentor others and lead with empathy."
      : overallLevel === "Moderate Emotional Intelligence"
      ? "You have a solid foundation. Focus on your lowest-scoring dimension for the biggest gains."
      : "Emotional intelligence is learnable. Start with self-awareness practices like daily emotion journaling."
  };
};

// Export default
export default { eqQuestionPool, eqDimensions, calculateEQScores, interpretEQ };
// DISC_assessment.js
// DISC Personality Assessment - Behavioral Style Inventory
// 48 questions (12 per dimension) with weighted options for D, I, S, C

export const discQuestionPool = [
  // === DOMINANCE (D) - Direct, forceful, results-oriented ===
  // === INFLUENCE (I) - Outgoing, enthusiastic, people-oriented ===
  // === STEADINESS (S) - Patient, stable, team-oriented ===
  // === CONSCIENTIOUSNESS (C) - Precise, analytical, task-oriented ===

  // Question 1
  {
    q: "In a team project, you tend to:",
    options: [
      { text: "Take charge and drive the team toward results", type: "D", weight: 2 },
      { text: "Energize the team with enthusiasm and ideas", type: "I", weight: 2 },
      { text: "Support team harmony and ensure everyone is included", type: "S", weight: 2 },
      { text: "Focus on details, quality, and following procedures", type: "C", weight: 2 }
    ]
  },
  // Question 2
  {
    q: "When facing a challenge, your first instinct is to:",
    options: [
      { text: "Confront it head-on and find a quick solution", type: "D", weight: 2 },
      { text: "Talk it over with others and brainstorm ideas", type: "I", weight: 2 },
      { text: "Take time to think and avoid rushing into action", type: "S", weight: 2 },
      { text: "Analyze the problem carefully before acting", type: "C", weight: 2 }
    ]
  },
  // Question 3
  {
    q: "How do others typically describe you?",
    options: [
      { text: "Decisive, competitive, and direct", type: "D", weight: 2 },
      { text: "Charming, optimistic, and sociable", type: "I", weight: 2 },
      { text: "Patient, calm, and a good listener", type: "S", weight: 2 },
      { text: "Accurate, systematic, and thorough", type: "C", weight: 2 }
    ]
  },
  // Question 4
  {
    q: "In a fast-paced environment, you:",
    options: [
      { text: "Thrive and push for rapid results", type: "D", weight: 2 },
      { text: "Enjoy the energy and social interaction", type: "I", weight: 2 },
      { text: "Prefer a steady, predictable pace", type: "S", weight: 2 },
      { text: "Need time to ensure accuracy and quality", type: "C", weight: 2 }
    ]
  },
  // Question 5
  {
    q: "When making an important decision, you rely most on:",
    options: [
      { text: "Your gut instinct and desire to win", type: "D", weight: 2 },
      { text: "Other people's opinions and group consensus", type: "I", weight: 2 },
      { text: "Past experience and what feels stable", type: "S", weight: 2 },
      { text: "Facts, data, and logical analysis", type: "C", weight: 2 }
    ]
  },
  // Question 6
  {
    q: "Your preferred leadership style is:",
    options: [
      { text: "Authoritative and results-driven", type: "D", weight: 2 },
      { text: "Participative and inspirational", type: "I", weight: 2 },
      { text: "Supportive and relationship-focused", type: "S", weight: 2 },
      { text: "Methodical and detail-oriented", type: "C", weight: 2 }
    ]
  },
  // Question 7
  {
    q: "When there is conflict in a group, you typically:",
    options: [
      { text: "Confront the issue directly and demand resolution", type: "D", weight: 2 },
      { text: "Try to lighten the mood and get everyone talking", type: "I", weight: 2 },
      { text: "Seek harmony and avoid taking sides", type: "S", weight: 2 },
      { text: "Analyze the cause logically and propose a system", type: "C", weight: 2 }
    ]
  },
  // Question 8
  {
    q: "What motivates you most at work?",
    options: [
      { text: "Winning, achieving targets, and being in charge", type: "D", weight: 2 },
      { text: "Recognition, social connection, and fun", type: "I", weight: 2 },
      { text: "Stability, appreciation, and teamwork", type: "S", weight: 2 },
      { text: "Precision, quality, and following standards", type: "C", weight: 2 }
    ]
  },
  // Question 9
  {
    q: "Your communication style is best described as:",
    options: [
      { text: "Direct, brief, and to the point", type: "D", weight: 2 },
      { text: "Expressive, animated, and persuasive", type: "I", weight: 2 },
      { text: "Calm, warm, and patient", type: "S", weight: 2 },
      { text: "Detailed, precise, and factual", type: "C", weight: 2 }
    ]
  },
  // Question 10
  {
    q: "When following rules and procedures, you:",
    options: [
      { text: "Follow them if they help achieve goals, otherwise bend them", type: "D", weight: 2 },
      { text: "Find them boring and prefer flexibility", type: "I", weight: 2 },
      { text: "Respect them because they create stability", type: "S", weight: 2 },
      { text: "Adhere to them strictly and expect others to do the same", type: "C", weight: 2 }
    ]
  },
  // Question 11
  {
    q: "What stresses you out the most?",
    options: [
      { text: "Incompetence, indecisiveness, and losing control", type: "D", weight: 2 },
      { text: "Boredom, isolation, and being ignored", type: "I", weight: 2 },
      { text: "Sudden change, conflict, and pressure", type: "S", weight: 2 },
      { text: "Disorder, mistakes, and lack of standards", type: "C", weight: 2 }
    ]
  },
  // Question 12
  {
    q: "In a new situation, you are most likely to:",
    options: [
      { text: "Take control and show others what to do", type: "D", weight: 2 },
      { text: "Meet everyone and create a fun atmosphere", type: "I", weight: 2 },
      { text: "Observe and see how you can fit in", type: "S", weight: 2 },
      { text: "Evaluate the facts and gather information", type: "C", weight: 2 }
    ]
  },
  // === Second set (questions 13-24) with weight 1 options for nuance ===
  {
    q: "You prefer tasks that are:",
    options: [
      { text: "Challenging and competitive", type: "D", weight: 1 },
      { text: "Collaborative and social", type: "I", weight: 1 },
      { text: "Familiar and consistent", type: "S", weight: 1 },
      { text: "Well-defined and detail-oriented", type: "C", weight: 1 }
    ]
  },
  {
    q: "How do you react to criticism?",
    options: [
      { text: "I see it as a challenge and defend my position", type: "D", weight: 1 },
      { text: "I take it personally but quickly move on", type: "I", weight: 1 },
      { text: "I internalize it and try to keep peace", type: "S", weight: 1 },
      { text: "I analyze it logically and correct any errors", type: "C", weight: 1 }
    ]
  },
  {
    q: "Your ideal work environment is:",
    options: [
      { text: "Dynamic, with opportunities to lead and achieve", type: "D", weight: 1 },
      { text: "Fun, social, and recognition-oriented", type: "I", weight: 1 },
      { text: "Stable, supportive, and team-based", type: "S", weight: 1 },
      { text: "Orderly, structured, and quality-focused", type: "C", weight: 1 }
    ]
  },
  {
    q: "When solving a problem, you are more likely to:",
    options: [
      { text: "Act quickly and learn as you go", type: "D", weight: 1 },
      { text: "Brainstorm with others for creative ideas", type: "I", weight: 1 },
      { text: "Follow proven methods that have worked before", type: "S", weight: 1 },
      { text: "Research and plan extensively before acting", type: "C", weight: 1 }
    ]
  },
  {
    q: "You feel most appreciated when:",
    options: [
      { text: "Your results and authority are recognized", type: "D", weight: 1 },
      { text: "You receive public praise and admiration", type: "I", weight: 1 },
      { text: "People show loyalty and trust in you", type: "S", weight: 1 },
      { text: "Your attention to detail and accuracy is valued", type: "C", weight: 1 }
    ]
  },
  {
    q: "How do you handle multiple deadlines?",
    options: [
      { text: "I prioritize aggressively and push through", type: "D", weight: 1 },
      { text: "I delegate and collaborate to get things done", type: "I", weight: 1 },
      { text: "I work steadily and avoid rushing", type: "S", weight: 1 },
      { text: "I plan meticulously and track every detail", type: "C", weight: 1 }
    ]
  },
  {
    q: "What is your approach to risk?",
    options: [
      { text: "I embrace risk for high rewards", type: "D", weight: 1 },
      { text: "I enjoy calculated risks with social benefits", type: "I", weight: 1 },
      { text: "I prefer low-risk, stable situations", type: "S", weight: 1 },
      { text: "I avoid risk by thorough analysis", type: "C", weight: 1 }
    ]
  },
  {
    q: "In a meeting, you typically:",
    options: [
      { text: "Lead the discussion and drive decisions", type: "D", weight: 1 },
      { text: "Share stories and keep energy high", type: "I", weight: 1 },
      { text: "Listen carefully and support others' ideas", type: "S", weight: 1 },
      { text: "Take notes and ask clarifying questions", type: "C", weight: 1 }
    ]
  },
  {
    q: "Your greatest strength is:",
    options: [
      { text: "Determination and ability to get results", type: "D", weight: 1 },
      { text: "Enthusiasm and ability to influence others", type: "I", weight: 1 },
      { text: "Patience and ability to create harmony", type: "S", weight: 1 },
      { text: "Precision and ability to ensure quality", type: "C", weight: 1 }
    ]
  },
  {
    q: "What do you dislike most?",
    options: [
      { text: "Indecision and lack of direction", type: "D", weight: 1 },
      { text: "Routine and being alone", type: "I", weight: 1 },
      { text: "Conflict and sudden change", type: "S", weight: 1 },
      { text: "Carelessness and disorganization", type: "C", weight: 1 }
    ]
  },
  {
    q: "When learning something new, you prefer:",
    options: [
      { text: "Hands-on practice with immediate results", type: "D", weight: 1 },
      { text: "Group discussions and interactive sessions", type: "I", weight: 1 },
      { text: "Step-by-step guidance and repetition", type: "S", weight: 1 },
      { text: "Detailed manuals and structured courses", type: "C", weight: 1 }
    ]
  },
  {
    q: "How do you make decisions under pressure?",
    options: [
      { text: "Quickly, based on intuition and goals", type: "D", weight: 1 },
      { text: "By consulting others for quick input", type: "I", weight: 1 },
      { text: "Carefully, avoiding hasty choices", type: "S", weight: 1 },
      { text: "Systematically, using data available", type: "C", weight: 1 }
    ]
  },
  // === Third set (25-36) with varied weights (1 or 2) ===
  {
    q: "Your ideal boss is someone who:",
    options: [
      { text: "Gives clear direction and lets you take charge", type: "D", weight: 2 },
      { text: "Is enthusiastic, supportive, and sociable", type: "I", weight: 2 },
      { text: "Is consistent, fair, and values teamwork", type: "S", weight: 2 },
      { text: "Is organized, precise, and respects rules", type: "C", weight: 2 }
    ]
  },
  {
    q: "When you have free time, you prefer to:",
    options: [
      { text: "Engage in competitive activities or sports", type: "D", weight: 1 },
      { text: "Socialize with friends or attend events", type: "I", weight: 2 },
      { text: "Relax at home or spend time with family", type: "S", weight: 2 },
      { text: "Read, learn, or work on a hobby", type: "C", weight: 1 }
    ]
  },
  {
    q: "What is your attitude toward change?",
    options: [
      { text: "I drive change and see it as opportunity", type: "D", weight: 2 },
      { text: "I embrace change if it's exciting", type: "I", weight: 1 },
      { text: "I resist change unless proven necessary", type: "S", weight: 2 },
      { text: "I analyze change carefully before accepting", type: "C", weight: 1 }
    ]
  },
  {
    q: "You are most productive when:",
    options: [
      { text: "Working independently toward a clear goal", type: "D", weight: 2 },
      { text: "Collaborating with an energetic team", type: "I", weight: 1 },
      { text: "Having a stable routine with minimal interruptions", type: "S", weight: 1 },
      { text: "Following a detailed plan and checklist", type: "C", weight: 2 }
    ]
  },
  {
    q: "How do you handle routine tasks?",
    options: [
      { text: "I delegate them to focus on bigger goals", type: "D", weight: 1 },
      { text: "I try to make them fun or social", type: "I", weight: 1 },
      { text: "I do them diligently and reliably", type: "S", weight: 2 },
      { text: "I systematize them for maximum efficiency", type: "C", weight: 2 }
    ]
  },
  {
    q: "What is your decision-making style?",
    options: [
      { text: "Fast and decisive, based on bottom line", type: "D", weight: 2 },
      { text: "Collaborative, seeking input and consensus", type: "I", weight: 2 },
      { text: "Cautious, avoiding conflict and risk", type: "S", weight: 1 },
      { text: "Methodical, weighing pros and cons", type: "C", weight: 1 }
    ]
  },
  {
    q: "You value in colleagues:",
    options: [
      { text: "Competence and drive", type: "D", weight: 2 },
      { text: "Friendliness and optimism", type: "I", weight: 2 },
      { text: "Loyalty and patience", type: "S", weight: 2 },
      { text: "Accuracy and reliability", type: "C", weight: 2 }
    ]
  },
  {
    q: "When things go wrong, you:",
    options: [
      { text: "Take immediate action to fix the problem", type: "D", weight: 2 },
      { text: "Talk it out and get support from others", type: "I", weight: 1 },
      { text: "Stay calm and wait for the situation to settle", type: "S", weight: 1 },
      { text: "Analyze what went wrong and document it", type: "C", weight: 2 }
    ]
  },
  {
    q: "Your communication weakness is:",
    options: [
      { text: "Being too blunt or impatient", type: "D", weight: 2 },
      { text: "Talking too much or not listening", type: "I", weight: 2 },
      { text: "Being too passive or avoiding topics", type: "S", weight: 2 },
      { text: "Being overly detailed or cold", type: "C", weight: 2 }
    ]
  },
  {
    q: "What type of rewards motivate you most?",
    options: [
      { text: "Promotions, titles, and authority", type: "D", weight: 2 },
      { text: "Public recognition and social events", type: "I", weight: 2 },
      { text: "Job security and appreciation", type: "S", weight: 1 },
      { text: "Bonuses tied to quality metrics", type: "C", weight: 1 }
    ]
  },
  {
    q: "You prefer to work at a pace that is:",
    options: [
      { text: "Fast, urgent, and high-energy", type: "D", weight: 2 },
      { text: "Spontaneous and flexible", type: "I", weight: 1 },
      { text: "Steady, consistent, and unhurried", type: "S", weight: 2 },
      { text: "Methodical and deliberate", type: "C", weight: 1 }
    ]
  },
  {
    q: "Your ideal role in a group is:",
    options: [
      { text: "Leader or decision-maker", type: "D", weight: 2 },
      { text: "Motivator or spokesperson", type: "I", weight: 2 },
      { text: "Supporter or mediator", type: "S", weight: 2 },
      { text: "Quality controller or analyst", type: "C", weight: 2 }
    ]
  },
  // === Final set (37-48) ===
  {
    q: "How do you respond to pressure?",
    options: [
      { text: "I become more competitive and focused", type: "D", weight: 2 },
      { text: "I become more animated and talkative", type: "I", weight: 1 },
      { text: "I become quiet and try to maintain stability", type: "S", weight: 2 },
      { text: "I become more meticulous and detail-oriented", type: "C", weight: 1 }
    ]
  },
  {
    q: "You prefer to receive feedback that is:",
    options: [
      { text: "Direct, honest, and actionable", type: "D", weight: 2 },
      { text: "Positive, encouraging, and public", type: "I", weight: 2 },
      { text: "Gentle, private, and supportive", type: "S", weight: 2 },
      { text: "Specific, objective, and documented", type: "C", weight: 2 }
    ]
  },
  {
    q: "What is your approach to planning?",
    options: [
      { text: "I set big goals and figure out details later", type: "D", weight: 1 },
      { text: "I plan loosely to keep options open", type: "I", weight: 1 },
      { text: "I prefer a consistent, predictable plan", type: "S", weight: 2 },
      { text: "I create detailed, step-by-step plans", type: "C", weight: 2 }
    ]
  },
  {
    q: "You are most frustrated when:",
    options: [
      { text: "People waste time or lack ambition", type: "D", weight: 2 },
      { text: "You are ignored or bored", type: "I", weight: 2 },
      { text: "You face constant change or conflict", type: "S", weight: 2 },
      { text: "People are disorganized or careless", type: "C", weight: 2 }
    ]
  },
  {
    q: "What do you prioritize in a relationship?",
    options: [
      { text: "Respect and achievement", type: "D", weight: 1 },
      { text: "Fun and shared activities", type: "I", weight: 2 },
      { text: "Loyalty and reliability", type: "S", weight: 2 },
      { text: "Honesty and intellectual compatibility", type: "C", weight: 1 }
    ]
  },
  {
    q: "Your energy level is usually:",
    options: [
      { text: "High and intense", type: "D", weight: 2 },
      { text: "Bubbly and enthusiastic", type: "I", weight: 2 },
      { text: "Calm and even", type: "S", weight: 2 },
      { text: "Reserved and focused", type: "C", weight: 1 }
    ]
  },
  {
    q: "When selling an idea, you rely on:",
    options: [
      { text: "Results and benefits", type: "D", weight: 2 },
      { text: "Emotion and personal connection", type: "I", weight: 2 },
      { text: "Trust and long-term relationship", type: "S", weight: 1 },
      { text: "Facts and logical proof", type: "C", weight: 1 }
    ]
  },
  {
    q: "Your personal workspace is:",
    options: [
      { text: "Minimalist, with only what you need", type: "D", weight: 1 },
      { text: "Cluttered with personal items and photos", type: "I", weight: 1 },
      { text: "Comfortable and homelike", type: "S", weight: 2 },
      { text: "Very organized and labeled", type: "C", weight: 2 }
    ]
  },
  {
    q: "You are most likely to volunteer for:",
    options: [
      { text: "Leadership or high-visibility roles", type: "D", weight: 2 },
      { text: "Social or event planning committees", type: "I", weight: 2 },
      { text: "Support or team-building activities", type: "S", weight: 2 },
      { text: "Quality or process improvement teams", type: "C", weight: 2 }
    ]
  },
  {
    q: "How do you handle disagreements?",
    options: [
      { text: "I argue my point until I win", type: "D", weight: 2 },
      { text: "I charm or persuade others to agree", type: "I", weight: 1 },
      { text: "I avoid conflict and give in", type: "S", weight: 2 },
      { text: "I debate logically using evidence", type: "C", weight: 1 }
    ]
  },
  {
    q: "Your favorite type of project is:",
    options: [
      { text: "One with high stakes and clear winners", type: "D", weight: 2 },
      { text: "One that involves people and creativity", type: "I", weight: 2 },
      { text: "One that is familiar and low-pressure", type: "S", weight: 1 },
      { text: "One that requires precision and analysis", type: "C", weight: 1 }
    ]
  },
  {
    q: "You would describe yourself as:",
    options: [
      { text: "Assertive and goal-driven", type: "D", weight: 2 },
      { text: "Outgoing and optimistic", type: "I", weight: 2 },
      { text: "Steady and accommodating", type: "S", weight: 2 },
      { text: "Conscientious and precise", type: "C", weight: 2 }
    ]
  }
];

// DISC Dimension Descriptions (including Arabic names for consistency)
export const discDimensions = {
  "D": {
    name: "Dominance",
    arabicName: "الهيمنة",
    description: "Direct, firm, strong-willed, and results-oriented. Focuses on bottom-line outcomes and challenges.",
    high: "Assertive, competitive, decisive, goal-driven, risk-taking",
    low: "Cautious, cooperative, agreeable, modest, avoids confrontation",
    strengths: ["Leadership", "Quick decisions", "Problem-solving", "Initiative"],
    weaknesses: ["Impatience", "Insensitivity", "Stubbornness", "Domineering"]
  },
  "I": {
    name: "Influence",
    arabicName: "التأثير",
    description: "Outgoing, enthusiastic, optimistic, and people-oriented. Focuses on relationships and recognition.",
    high: "Persuasive, sociable, energetic, expressive, optimistic",
    low: "Reserved, introspective, quiet, analytical, self-contained",
    strengths: ["Communication", "Team building", "Motivation", "Creativity"],
    weaknesses: ["Disorganization", "Impulsiveness", "Overpromising", "Attention-seeking"]
  },
  "S": {
    name: "Steadiness",
    arabicName: "الثبات",
    description: "Patient, stable, supportive, and team-oriented. Focuses on loyalty and consistency.",
    high: "Dependable, calm, humble, good listener, patient",
    low: "Restless, impulsive, change-oriented, fast-paced, competitive",
    strengths: ["Reliability", "Empathy", "Stability", "Conflict avoidance"],
    weaknesses: ["Resistance to change", "Over-accommodating", "Indecisiveness", "Slowness"]
  },
  "C": {
    name: "Conscientiousness",
    arabicName: "الالتزام",
    description: "Precise, analytical, detail-oriented, and systematic. Focuses on quality and accuracy.",
    high: "Organized, methodical, thorough, fact-driven, perfectionist",
    low: "Flexible, spontaneous, informal, less structured, big-picture",
    strengths: ["Quality control", "Planning", "Problem analysis", "Consistency"],
    weaknesses: ["Overcritical", "Rigid", "Slow decisions", "Detached"]
  }
};

// Comprehensive results interpretation with percentiles
export const interpretDISCScores = (scores) => {
  const percentile = (score) => {
    if (score <= 20) return "Very Low (0-20%)";
    if (score <= 40) return "Low (20-40%)";
    if (score <= 60) return "Moderate (40-60%)";
    if (score <= 80) return "High (60-80%)";
    return "Very High (80-100%)";
  };

  const getInterpretation = (type, score) => {
    if (type === "D") {
      return score > 60
        ? "You are assertive, driven, and results-oriented. You thrive on challenges and take charge naturally."
        : score > 40
        ? "You can be direct when needed but also know when to step back and collaborate."
        : "You prefer a cooperative, low-key approach. You avoid unnecessary confrontation and value harmony.";
    }
    if (type === "I") {
      return score > 60
        ? "You are outgoing, enthusiastic, and love interacting with people. You energize others and enjoy recognition."
        : score > 40
        ? "You are sociable but also value time alone. You balance enthusiasm with reflection."
        : "You are reserved and prefer meaningful one-on-one interactions over large groups.";
    }
    if (type === "S") {
      return score > 60
        ? "You are patient, stable, and supportive. You value consistency and long-term relationships."
        : score > 40
        ? "You are adaptable – you can be steady but also embrace change when necessary."
        : "You are action-oriented and prefer variety. You may become impatient with routine or slow pace.";
    }
    if (type === "C") {
      return score > 60
        ? "You are precise, analytical, and detail-oriented. You value accuracy and systematic approaches."
        : score > 40
        ? "You pay attention to details but also see the bigger picture. You balance quality with flexibility."
        : "You are more intuitive than analytical. You prefer big-picture thinking over meticulous details.";
    }
    return "";
  };

  return {
    D: {
      score: scores.D,
      percentile: percentile(scores.D),
      interpretation: getInterpretation("D", scores.D)
    },
    I: {
      score: scores.I,
      percentile: percentile(scores.I),
      interpretation: getInterpretation("I", scores.I)
    },
    S: {
      score: scores.S,
      percentile: percentile(scores.S),
      interpretation: getInterpretation("S", scores.S)
    },
    C: {
      score: scores.C,
      percentile: percentile(scores.C),
      interpretation: getInterpretation("C", scores.C)
    }
  };
};

// Primary scoring function
export const calculateDISCScores = (responses) => {
  // Max possible raw score per type: 48 questions * max weight 2 = 96
  const maxRawScore = 96;
  
  const rawScores = { D: 0, I: 0, S: 0, C: 0 };

  responses.forEach(response => {
    rawScores[response.type] += response.weight;
  });

  // Normalize to 0-100 scale
  const normalizedScores = {
    D: Math.round((rawScores.D / maxRawScore) * 100),
    I: Math.round((rawScores.I / maxRawScore) * 100),
    S: Math.round((rawScores.S / maxRawScore) * 100),
    C: Math.round((rawScores.C / maxRawScore) * 100)
  };

  // Identify primary and secondary DISC styles (highest two)
  const sorted = Object.entries(normalizedScores).sort((a,b) => b[1] - a[1]);
  const primaryType = sorted[0][0];
  const secondaryType = sorted[1][0];
  const discProfile = `${primaryType}${secondaryType}`;

  // Basic profile descriptions
  const profileDescriptions = {
    "DI": "Driving-Influential – Results-oriented and persuasive, likes to lead and inspire.",
    "DS": "Driving-Steady – Goal-driven but patient, balances ambition with loyalty.",
    "DC": "Driving-Conscientious – Assertive and analytical, focuses on quality results.",
    "ID": "Influential-Driving – Enthusiastic leader who motivates others toward goals.",
    "IS": "Influential-Steady – Warm, supportive, and sociable team player.",
    "IC": "Influential-Conscientious – Creative yet detail-oriented, balances ideas with precision.",
    "SD": "Steady-Driving – Patient but determined, works steadily toward long-term goals.",
    "SI": "Steady-Influential – Friendly and dependable, builds strong relationships.",
    "SC": "Steady-Conscientious – Reliable and precise, values quality and stability.",
    "CD": "Conscientious-Driving – Analytical leader who values accuracy and results.",
    "CI": "Conscientious-Influential – Detail-oriented communicator who enjoys planning and presenting.",
    "CS": "Conscientious-Steady – Methodical and supportive, ensures quality and harmony."
  };

  return {
    rawScores,
    normalizedScores,
    primaryStyle: primaryType,
    secondaryStyle: secondaryType,
    discProfile: discProfile,
    profileDescription: profileDescriptions[discProfile] || "Balanced profile across all styles.",
    interpretation: interpretDISCScores(normalizedScores)
  };
};

// Export default object for convenience
export default { discQuestionPool, discDimensions, calculateDISCScores, interpretDISCScores };
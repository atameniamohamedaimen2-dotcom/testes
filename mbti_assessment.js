export const mbtiQuestionPool = [
  // === DIMENSION 1: ENERGY SOURCE (E vs I) - 50 Questions ===
  // Extraversion (E): Gain energy from external world, people, activities
  // Introversion (I): Gain energy from internal world, ideas, solitude

  { 
    q: "After a long week, what energizes you most?", 
    dimension: "EI",
    options: [
      { text: "Going out with friends to a lively social event", type: "E", weight: 2 },
      { text: "Having a small get-together with close friends", type: "E", weight: 1 },
      { text: "Spending quiet time alone reading or relaxing", type: "I", weight: 1 },
      { text: "Complete solitude to recharge without any interaction", type: "I", weight: 2 }
    ]
  },
  { 
    q: "When meeting new people at a party, you typically:", 
    dimension: "EI",
    options: [
      { text: "Start conversations easily and enjoy mingling with many people", type: "E", weight: 2 },
      { text: "Talk to several people but prefer familiar faces", type: "E", weight: 1 },
      { text: "Stick with people you know or wait for others to approach", type: "I", weight: 1 },
      { text: "Feel uncomfortable and prefer to leave early or avoid such events", type: "I", weight: 2 }
    ]
  },
  { 
    q: "How do you prefer to process your thoughts?", 
    dimension: "EI",
    options: [
      { text: "By talking them through with others out loud", type: "E", weight: 2 },
      { text: "Through discussion, but I need some time to organize ideas first", type: "E", weight: 1 },
      { text: "By reflecting internally before sharing with select people", type: "I", weight: 1 },
      { text: "By thinking deeply alone; I rarely need to verbalize them", type: "I", weight: 2 }
    ]
  },
  { 
    q: "In a work meeting, you usually:", 
    dimension: "EI",
    options: [
      { text: "Think out loud and contribute ideas spontaneously", type: "E", weight: 2 },
      { text: "Participate actively but prefer prepared remarks", type: "E", weight: 1 },
      { text: "Listen more than speak, sharing only well-formed thoughts", type: "I", weight: 1 },
      { text: "Observe quietly and prefer to follow up in writing later", type: "I", weight: 2 }
    ]
  },
  { 
    q: "Your ideal weekend involves:", 
    dimension: "EI",
    options: [
      { text: "Multiple social activities and being around people", type: "E", weight: 2 },
      { text: "A balance of social time and personal activities", type: "E", weight: 1 },
      { text: "Mostly quiet time with perhaps one small social gathering", type: "I", weight: 1 },
      { text: "Complete solitude to pursue personal hobbies or rest", type: "I", weight: 2 }
    ]
  },
  { 
    q: "When facing a problem, you prefer to:", 
    dimension: "EI",
    options: [
      { text: "Discuss it immediately with others to brainstorm solutions", type: "E", weight: 2 },
      { text: "Talk to a few trusted people after brief consideration", type: "E", weight: 1 },
      { text: "Analyze it alone first, then consult someone if needed", type: "I", weight: 1 },
      { text: "Work through it independently without external input", type: "I", weight: 2 }
    ]
  },
  { 
    q: "In group projects, you typically:", 
    dimension: "EI",
    options: [
      { text: "Take the lead and energize the team with enthusiasm", type: "E", weight: 2 },
      { text: "Collaborate actively and enjoy the group dynamic", type: "E", weight: 1 },
      { text: "Contribute meaningfully but prefer defined individual tasks", type: "I", weight: 1 },
      { text: "Find group work draining; prefer working alone", type: "I", weight: 2 }
    ]
  },
  { 
    q: "How do you feel about being the center of attention?", 
    dimension: "EI",
    options: [
      { text: "Love it; I feel energized and in my element", type: "E", weight: 2 },
      { text: "Comfortable with it when necessary", type: "E", weight: 1 },
      { text: "Uncomfortable; I avoid it when possible", type: "I", weight: 1 },
      { text: "Extremely uncomfortable; it drains me significantly", type: "I", weight: 2 }
    ]
  },
  { 
    q: "Your communication style is best described as:", 
    dimension: "EI",
    options: [
      { text: "Expressive and animated; I think by speaking", type: "E", weight: 2 },
      { text: "Open and direct; I communicate freely", type: "E", weight: 1 },
      { text: "Thoughtful and measured; I choose words carefully", type: "I", weight: 1 },
      { text: "Reserved and concise; I speak only when necessary", type: "I", weight: 2 }
    ]
  },
  { 
    q: "After intense social interaction, you feel:", 
    dimension: "EI",
    options: [
      { text: "Energized and excited for more", type: "E", weight: 2 },
      { text: "Content but ready to wind down eventually", type: "E", weight: 1 },
      { text: "Tired and needing some alone time to recover", type: "I", weight: 1 },
      { text: "Completely drained and require extended solitude", type: "I", weight: 2 }
    ]
  },
  { 
    q: "You prefer to have:", 
    dimension: "EI",
    options: [
      { text: "A wide circle of acquaintances and many friends", type: "E", weight: 2 },
      { text: "Several friend groups for different activities", type: "E", weight: 1 },
      { text: "A few close, deep friendships", type: "I", weight: 1 },
      { text: "One or two intimate connections; quality over quantity", type: "I", weight: 2 }
    ]
  },
  { 
    q: "When learning something new, you prefer:", 
    dimension: "EI",
    options: [
      { text: "Group workshops and interactive discussions", type: "E", weight: 2 },
      { text: "Classes with some participation allowed", type: "E", weight: 1 },
      { text: "Independent study with occasional questions", type: "I", weight: 1 },
      { text: "Self-paced learning with books or videos alone", type: "I", weight: 2 }
    ]
  },

  // === DIMENSION 2: INFORMATION GATHERING (S vs N) - 50 Questions ===
  // Sensing (S): Focus on concrete facts, details, present reality
  // Intuition (N): Focus on patterns, possibilities, future potential

  { 
    q: "When planning a vacation, you focus most on:", 
    dimension: "SN",
    options: [
      { text: "Specific hotels, flights, restaurants, and exact itineraries", type: "S", weight: 2 },
      { text: "Practical logistics and confirmed reservations", type: "S", weight: 1 },
      { text: "The overall vibe and potential adventures", type: "N", weight: 1 },
      { text: "The cultural experience and what you might discover", type: "N", weight: 2 }
    ]
  },
  { 
    q: "You are more interested in:", 
    dimension: "SN",
    options: [
      { text: "What is actual, tangible, and verifiable right now", type: "S", weight: 2 },
      { text: "Concrete details and practical applications", type: "S", weight: 1 },
      { text: "Theoretical concepts and hidden meanings", type: "N", weight: 1 },
      { text: "What could be, abstract ideas, and future possibilities", type: "N", weight: 2 }
    ]
  },
  { 
    q: "When reading a story, you notice:", 
    dimension: "SN",
    options: [
      { text: "Specific descriptions, facts, and literal details", type: "S", weight: 2 },
      { text: "The sequence of events and concrete actions", type: "S", weight: 1 },
      { text: "Underlying themes and symbolic meanings", type: "N", weight: 1 },
      { text: "Metaphors, patterns, and future implications", type: "N", weight: 2 }
    ]
  },
  { 
    q: "You trust information more when it is:", 
    dimension: "SN",
    options: [
      { text: "Proven by past experience and concrete evidence", type: "S", weight: 2 },
      { text: "Based on facts, data, and practical results", type: "S", weight: 1 },
      { text: "Connected to patterns and theoretical frameworks", type: "N", weight: 1 },
      { text: "Novel, innovative, and aligned with future trends", type: "N", weight: 2 }
    ]
  },
  { 
    q: "You prefer instructions that are:", 
    dimension: "SN",
    options: [
      { text: "Step-by-step, detailed, and proven methods", type: "S", weight: 2 },
      { text: "Clear, specific, and based on established practices", type: "S", weight: 1 },
      { text: "General guidelines allowing for creative adaptation", type: "N", weight: 1 },
      { text: "Conceptual overviews that inspire new approaches", type: "N", weight: 2 }
    ]
  },
  { 
    q: "In conversations, you prefer discussing:", 
    dimension: "SN",
    options: [
      { text: "Real experiences, current events, and practical matters", type: "S", weight: 2 },
      { text: "Concrete topics with tangible outcomes", type: "S", weight: 1 },
      { text: "Ideas, theories, and innovative concepts", type: "N", weight: 1 },
      { text: "Philosophy, future possibilities, and abstract theories", type: "N", weight: 2 }
    ]
  },
  { 
    q: "You are better at:", 
    dimension: "SN",
    options: [
      { text: "Remembering specific details, dates, and facts", type: "S", weight: 2 },
      { text: "Managing practical details and logistics", type: "S", weight: 1 },
      { text: "Seeing connections between unrelated concepts", type: "N", weight: 1 },
      { text: "Envisioning future scenarios and big picture patterns", type: "N", weight: 2 }
    ]
  },
  { 
    q: "When solving problems, you rely more on:", 
    dimension: "SN",
    options: [
      { text: "Previous experience and established methods", type: "S", weight: 2 },
      { text: "Practical solutions that have worked before", type: "S", weight: 1 },
      { text: "Creative new approaches and experimentation", type: "N", weight: 1 },
      { text: "Intuition and unconventional innovative ideas", type: "N", weight: 2 }
    ]
  },
  { 
    q: "You are more drawn to:", 
    dimension: "SN",
    options: [
      { text: "Hands-on activities and concrete results", type: "S", weight: 2 },
      { text: "Practical skills and useful knowledge", type: "S", weight: 1 },
      { text: "Brainstorming sessions and conceptual exploration", type: "N", weight: 1 },
      { text: "Theoretical discussions and imaginative speculation", type: "N", weight: 2 }
    ]
  },
  { 
    q: "When someone describes a new concept, you ask:", 
    dimension: "SN",
    options: [
      { text: "\"What are the specific facts and evidence?\"", type: "S", weight: 2 },
      { text: "\"How does this work in practice?\"", type: "S", weight: 1 },
      { text: "\"What are the implications and possibilities?\"", type: "N", weight: 1 },
      { text: "\"What does this mean for the future or big picture?\"", type: "N", weight: 2 }
    ]
  },
  { 
    q: "You prefer work that involves:", 
    dimension: "SN",
    options: [
      { text: "Clear tasks, specific objectives, and measurable results", type: "S", weight: 2 },
      { text: "Practical application and attention to detail", type: "S", weight: 1 },
      { text: "Innovation, strategy, and conceptual thinking", type: "N", weight: 1 },
      { text: "Vision, creativity, and exploring new frontiers", type: "N", weight: 2 }
    ]
  },
  { 
    q: "You notice more:", 
    dimension: "SN",
    options: [
      { text: "The immediate environment and what's actually happening", type: "S", weight: 2 },
      { text: "Physical details and practical realities", type: "S", weight: 1 },
      { text: "Hidden meanings and future potential", type: "N", weight: 1 },
      { text: "Abstract patterns and theoretical connections", type: "N", weight: 2 }
    ]
  },

  // === DIMENSION 3: DECISION MAKING (T vs F) - 50 Questions ===
  // Thinking (T): Decisions based on logic, objective analysis, consistency
  // Feeling (F): Decisions based on values, harmony, impact on people

  { 
    q: "When making an important decision, you prioritize:", 
    dimension: "TF",
    options: [
      { text: "Logical analysis, objective facts, and consistent principles", type: "T", weight: 2 },
      { text: "Reasonable outcomes and fair, logical conclusions", type: "T", weight: 1 },
      { text: "How it affects people and maintains harmony", type: "F", weight: 1 },
      { text: "Personal values, emotional impact, and authenticity", type: "F", weight: 2 }
    ]
  },
  { 
    q: "In a disagreement, you focus more on:", 
    dimension: "TF",
    options: [
      { text: "Finding the logical truth and correcting errors", type: "T", weight: 2 },
      { text: "Analyzing the issue objectively and finding the right answer", type: "T", weight: 1 },
      { text: "Understanding everyone's feelings and maintaining relationships", type: "F", weight: 1 },
      { text: "Preserving harmony and respecting individual values", type: "F", weight: 2 }
    ]
  },
  { 
    q: "You value more in yourself:", 
    dimension: "TF",
    options: [
      { text: "Competence, rationality, and intellectual honesty", type: "T", weight: 2 },
      { text: "Objectivity and the ability to analyze critically", type: "T", weight: 1 },
      { text: "Compassion, empathy, and emotional intelligence", type: "F", weight: 1 },
      { text: "Authenticity and staying true to personal values", type: "F", weight: 2 }
    ]
  },
  { 
    q: "When giving feedback, you typically:", 
    dimension: "TF",
    options: [
      { text: "Focus directly on the issue, even if it seems blunt", type: "T", weight: 2 },
      { text: "Be straightforward about problems and improvements needed", type: "T", weight: 1 },
      { text: "Consider the person's feelings while being honest", type: "F", weight: 1 },
      { text: "Frame it gently to avoid hurting their feelings", type: "F", weight: 2 }
    ]
  },
  { 
    q: "You are more convinced by:", 
    dimension: "TF",
    options: [
      { text: "Solid evidence, logical arguments, and proven facts", type: "T", weight: 2 },
      { text: "Rational analysis and objective data", type: "T", weight: 1 },
      { text: "Personal stories and how it affects people emotionally", type: "F", weight: 1 },
      { text: "Values, beliefs, and the human element", type: "F", weight: 2 }
    ]
  },
  { 
    q: "In team settings, you prioritize:", 
    dimension: "TF",
    options: [
      { text: "Efficiency, productivity, and achieving objectives", type: "T", weight: 2 },
      { text: "Results and logical task completion", type: "T", weight: 1 },
      { text: "Team morale and collaborative harmony", type: "F", weight: 1 },
      { text: "Making sure everyone feels valued and included", type: "F", weight: 2 }
    ]
  },
  { 
    q: "You consider yourself more:", 
    dimension: "TF",
    options: [
      { text: "Tough-minded, analytical, and justice-oriented", type: "T", weight: 2 },
      { text: "Reasonable and driven by logic", type: "T", weight: 1 },
      { text: "Warm, empathetic, and harmony-oriented", type: "F", weight: 1 },
      { text: "Sensitive, caring, and value-driven", type: "F", weight: 2 }
    ]
  },
  { 
    q: "When someone makes a mistake, you:", 
    dimension: "TF",
    options: [
      { text: "Point out the error directly so they can improve", type: "T", weight: 2 },
      { text: "Analyze what went wrong logically", type: "T", weight: 1 },
      { text: "Consider their feelings while addressing the issue", type: "F", weight: 1 },
      { text: "Offer reassurance and emotional support first", type: "F", weight: 2 }
    ]
  },
  { 
    q: "You prefer to be described as:", 
    dimension: "TF",
    options: [
      { text: "Competent, knowledgeable, and fair", type: "T", weight: 2 },
      { text: "Rational and objective", type: "T", weight: 1 },
      { text: "Kind, supportive, and understanding", type: "F", weight: 1 },
      { text: "Compassionate and authentic", type: "F", weight: 2 }
    ]
  },
  { 
    q: "In conflicts, you value:", 
    dimension: "TF",
    options: [
      { text: "Justice, truth, and logical resolution", type: "T", weight: 2 },
      { text: "Fairness and objective standards", type: "T", weight: 1 },
      { text: "Forgiveness and emotional healing", type: "F", weight: 1 },
      { text: "Harmony and mutual understanding", type: "F", weight: 2 }
    ]
  },
  { 
    q: "When choosing a career, you prioritize:", 
    dimension: "TF",
    options: [
      { text: "Intellectual challenge and logical problem-solving", type: "T", weight: 2 },
      { text: "Practical results and measurable success", type: "T", weight: 1 },
      { text: "Helping others and making a positive impact", type: "F", weight: 1 },
      { text: "Meaning and alignment with personal values", type: "F", weight: 2 }
    ]
  },
  { 
    q: "You are more critical of:", 
    dimension: "TF",
    options: [
      { text: "Illogical reasoning and inconsistent arguments", type: "T", weight: 2 },
      { text: "Inefficiency and poor analysis", type: "T", weight: 1 },
      { text: "Insensitivity and disregard for feelings", type: "F", weight: 1 },
      { text: "Dishonesty and lack of authenticity", type: "F", weight: 2 }
    ]
  },

  // === DIMENSION 4: LIFESTYLE (J vs P) - 50 Questions ===
  // Judging (J): Structured, planned, organized, closure-oriented
  // Perceiving (P): Flexible, spontaneous, adaptable, open-ended

  { 
    q: "How do you prefer to organize your daily life?", 
    dimension: "JP",
    options: [
      { text: "With detailed schedules, lists, and structured routines", type: "J", weight: 2 },
      { text: "Planned ahead with clear goals and deadlines", type: "J", weight: 1 },
      { text: "Flexible with general goals but adaptable", type: "P", weight: 1 },
      { text: "Spontaneously, keeping options open and going with the flow", type: "P", weight: 2 }
    ]
  },
  { 
    q: "When approaching a deadline, you typically:", 
    dimension: "JP",
    options: [
      { text: "Complete tasks well ahead of time to be safe", type: "J", weight: 2 },
      { text: "Work steadily to finish early or on time", type: "J", weight: 1 },
      { text: "Work in bursts of energy as inspiration strikes", type: "P", weight: 1 },
      { text: "Thrive under pressure and often finish at the last minute", type: "P", weight: 2 }
    ]
  },
  { 
    q: "Your workspace is usually:", 
    dimension: "JP",
    options: [
      { text: "Neat, organized, with everything in its place", type: "J", weight: 2 },
      { text: "Tidy with systems for finding things easily", type: "J", weight: 1 },
      { text: "Somewhat cluttered but you know where things are", type: "P", weight: 1 },
      { text: "Organized chaos; you work best with creative mess", type: "P", weight: 2 }
    ]
  },
  { 
    q: "You prefer to:", 
    dimension: "JP",
    options: [
      { text: "Make decisions quickly and stick to them", type: "J", weight: 2 },
      { text: "Settle things promptly to have closure", type: "J", weight: 1 },
      { text: "Keep options open in case something better comes up", type: "P", weight: 1 },
      { text: "Stay flexible and adapt as situations change", type: "P", weight: 2 }
    ]
  },
  { 
    q: "When planning a trip, you prefer to:", 
    dimension: "JP",
    options: [
      { text: "Have every day planned with confirmed reservations", type: "J", weight: 2 },
      { text: "Create a detailed itinerary with backup plans", type: "J", weight: 1 },
      { text: "Have a rough outline but decide details as you go", type: "P", weight: 1 },
      { text: "Book minimal plans and explore spontaneously", type: "P", weight: 2 }
    ]
  },
  { 
    q: "Unexpected changes to your plans make you feel:", 
    dimension: "JP",
    options: [
      { text: "Stressed and anxious; you prefer stability", type: "J", weight: 2 },
      { text: "Somewhat uncomfortable; you like knowing what to expect", type: "J", weight: 1 },
      { text: "Okay; you can adjust relatively easily", type: "P", weight: 1 },
      { text: "Excited; you love surprises and new opportunities", type: "P", weight: 2 }
    ]
  },
  { 
    q: "You work best when:", 
    dimension: "JP",
    options: [
      { text: "Following a clear plan with specific milestones", type: "J", weight: 2 },
      { text: "Having structure and defined expectations", type: "J", weight: 1 },
      { text: "Adapting to circumstances as they arise", type: "P", weight: 1 },
      { text: "Having freedom to change direction as needed", type: "P", weight: 2 }
    ]
  },
  { 
    q: "Tasks are more satisfying when:", 
    dimension: "JP",
    options: [
      { text: "Completed, checked off, and done decisively", type: "J", weight: 2 },
      { text: "Finished according to schedule", type: "J", weight: 1 },
      { text: "Still open for improvement and new ideas", type: "P", weight: 1 },
      { text: "Left flexible for future exploration", type: "P", weight: 2 }
    ]
  },
  { 
    q: "You prefer environments that are:", 
    dimension: "JP",
    options: [
      { text: "Predictable, stable, and well-organized", type: "J", weight: 2 },
      { text: "Structured with clear rules and expectations", type: "J", weight: 1 },
      { text: "Dynamic with variety and new experiences", type: "P", weight: 1 },
      { text: "Flexible and open to change at any moment", type: "P", weight: 2 }
    ]
  },
  { 
    q: "When starting a new project, you prefer to:", 
    dimension: "JP",
    options: [
      { text: "Have a complete plan before taking any action", type: "J", weight: 2 },
      { text: "Outline clear steps and objectives first", type: "J", weight: 1 },
      { text: "Dive in and figure it out as you progress", type: "P", weight: 1 },
      { text: "Start experimenting and see where it leads", type: "P", weight: 2 }
    ]
  },
  { 
    q: "Your approach to rules and procedures is:", 
    dimension: "JP",
    options: [
      { text: "Follow them; they exist for good reasons", type: "J", weight: 2 },
      { text: "Respect structure and established methods", type: "J", weight: 1 },
      { text: "Follow them if they make sense, bend if needed", type: "P", weight: 1 },
      { text: "Question them and create new ways when possible", type: "P", weight: 2 }
    ]
  },
  { 
    q: "You feel better when:", 
    dimension: "JP",
    options: [
      { text: "Decisions are made and plans are set in stone", type: "J", weight: 2 },
      { text: "Things are settled and organized", type: "J", weight: 1 },
      { text: "You have options and room to maneuver", type: "P", weight: 1 },
      { text: "Life is spontaneous and full of possibilities", type: "P", weight: 2 }
    ]
  }
];

// MBTI Type Descriptions
export const mbtiTypes = {
  "ISTJ": {
    name: "The Logistician",
    description: "Practical, fact-minded individuals whose reliability cannot be doubted.",
    strengths: ["Honest", "Direct", "Strong-willed", "Dutiful", "Responsible"],
    careers: ["Accountant", "Manager", "Military Officer", "Judge", "Auditor"]
  },
  "ISFJ": {
    name: "The Defender",
    description: "Very dedicated and warm protectors, always ready to defend their loved ones.",
    strengths: ["Supportive", "Reliable", "Patient", "Imaginative", "Observant"],
    careers: ["Nurse", "Teacher", "Social Worker", "HR Specialist", "Administrator"]
  },
  "INFJ": {
    name: "The Advocate",
    description: "Quiet and mystical, yet very inspiring and tireless idealists.",
    strengths: ["Creative", "Insightful", "Principled", "Passionate", "Altruistic"],
    careers: ["Counselor", "Writer", "Psychologist", "Teacher", "Non-profit Director"]
  },
  "INTJ": {
    name: "The Architect",
    description: "Imaginative and strategic thinkers, with a plan for everything.",
    strengths: ["Strategic", "Independent", "Confident", "Hard-working", "Decisive"],
    careers: ["Scientist", "Engineer", "Investment Banker", "Software Developer", "Strategist"]
  },
  "ISTP": {
    name: "The Virtuoso",
    description: "Bold and practical experimenters, masters of all kinds of tools.",
    strengths: ["Optimistic", "Energetic", "Creative", "Practical", "Spontaneous"],
    careers: ["Engineer", "Pilot", "Forensic Scientist", "Athlete", "Firefighter"]
  },
  "ISFP": {
    name: "The Adventurer",
    description: "Flexible and charming artists, always ready to explore and experience something new.",
    strengths: ["Charming", "Sensitive", "Imaginative", "Passionate", "Curious"],
    careers: ["Artist", "Musician", "Chef", "Fashion Designer", "Physical Therapist"]
  },
  "INFP": {
    name: "The Mediator",
    description: "Poetic, kind and altruistic people, always eager to help a good cause.",
    strengths: ["Empathetic", "Generous", "Open-minded", "Creative", "Passionate"],
    careers: ["Writer", "Psychologist", "Graphic Designer", "Librarian", "Translator"]
  },
  "INTP": {
    name: "The Logician",
    description: "Innovative inventors with an unquenchable thirst for knowledge.",
    strengths: ["Analytical", "Original", "Open-minded", "Curious", "Objective"],
    careers: ["Mathematician", "Software Architect", "Professor", "Scientist", "Economist"]
  },
  "ESTP": {
    name: "The Entrepreneur",
    description: "Smart, energetic and very perceptive people, who truly enjoy living on the edge.",
    strengths: ["Bold", "Rational", "Practical", "Original", "Perceptive"],
    careers: ["Entrepreneur", "Marketing Director", "Paramedic", "Sales Manager", "Athlete"]
  },
  "ESFP": {
    name: "The Entertainer",
    description: "Spontaneous, energetic and enthusiastic people – life is never boring around them.",
    strengths: ["Bold", "Original", "Showmanship", "Practical", "Observant"],
    careers: ["Actor", "Event Planner", "Sales Representative", "Tour Guide", "Cosmetologist"]
  },
  "ENFP": {
    name: "The Campaigner",
    description: "Enthusiastic, creative and sociable free spirits, who can always find a reason to smile.",
    strengths: ["Curious", "Perceptive", "Energetic", "Enthusiastic", "People-oriented"],
    careers: ["Journalist", "Consultant", "Actor", "Teacher", "Public Relations"]
  },
  "ENTP": {
    name: "The Debater",
    description: "Smart and curious thinkers who cannot resist an intellectual challenge.",
    strengths: ["Knowledgeable", "Quick-thinking", "Original", "Excellent brainstormers", "Charismatic"],
    careers: ["Attorney", "Psychologist", "Consultant", "Entrepreneur", "Creative Director"]
  },
  "ESTJ": {
    name: "The Executive",
    description: "Excellent administrators, unsurpassed at managing things – or people.",
    strengths: ["Dedicated", "Strong-willed", "Direct", "Honest", "Loyal"],
    careers: ["Judge", "Financial Officer", "School Principal", "Military Leader", "Project Manager"]
  },
  "ESFJ": {
    name: "The Consul",
    description: "Extraordinarily caring, social and popular people, always eager to help.",
    strengths: ["Strong practical skills", "Strong sense of duty", "Loyal", "Patient", "Good at connecting"],
    careers: ["Nurse", "Teacher", "Office Manager", "HR Manager", "Social Worker"]
  },
  "ENFJ": {
    name: "The Protagonist",
    description: "Charismatic and inspiring leaders, able to mesmerize their listeners.",
    strengths: ["Tolerant", "Reliable", "Charismatic", "Altruistic", "Natural leaders"],
    careers: ["Teacher", "HR Manager", "Sales Manager", "Public Relations", "Counselor"]
  },
  "ENTJ": {
    name: "The Commander",
    description: "Bold, imaginative and strong-willed leaders, always finding a way – or making one.",
    strengths: ["Efficient", "Energetic", "Self-confident", "Strong-willed", "Strategic"],
    careers: ["Executive", "Lawyer", "Management Consultant", "Entrepreneur", "University Professor"]
  }
};

// Scoring logic helper
export const calculateMBTIType = (responses) => {
  const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

  responses.forEach(response => {
    scores[response.type] += response.weight;
  });

  const type = 
    (scores.E >= scores.I ? 'E' : 'I') +
    (scores.S >= scores.N ? 'S' : 'N') +
    (scores.T >= scores.F ? 'T' : 'F') +
    (scores.J >= scores.P ? 'J' : 'P');

  return {
    type,
    scores,
    description: mbtiTypes[type]
  };
};

export default { mbtiQuestionPool, mbtiTypes, calculateMBTIType };

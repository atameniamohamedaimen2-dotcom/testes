// holland_assessment.js
// Holland Code (RIASEC) Assessment - The Vocational Fit Inventory
// 72 questions (12 per type) with weighted options for R, I, A, S, E, C

export const hollandQuestionPool = [
  // === REALISTIC (R) - Practical, hands-on, mechanical, physical ===
  // Core: building, fixing, working with tools, outdoor activities
  {
    q: "I enjoy working with my hands and building or repairing things.",
    options: [
      { text: "Strongly Agree", type: "R", weight: 2 },
      { text: "Agree", type: "R", weight: 1 },
      { text: "Neutral", type: null, weight: 0 },
      { text: "Disagree", type: "other", weight: 0 },
      { text: "Strongly Disagree", type: "other", weight: 0 }
    ]
  },
  {
    q: "I prefer outdoor or physical work over sitting at a desk all day.",
    options: [
      { text: "Strongly Agree", type: "R", weight: 2 },
      { text: "Agree", type: "R", weight: 1 },
      { text: "Neutral", type: null, weight: 0 },
      { text: "Disagree", type: "other", weight: 0 },
      { text: "Strongly Disagree", type: "other", weight: 0 }
    ]
  },
  {
    q: "I am good at operating machinery, tools, or vehicles.",
    options: [
      { text: "Strongly Agree", type: "R", weight: 2 },
      { text: "Agree", type: "R", weight: 1 },
      { text: "Neutral", type: null, weight: 0 },
      { text: "Disagree", type: "other", weight: 0 },
      { text: "Strongly Disagree", type: "other", weight: 0 }
    ]
  },
  {
    q: "I enjoy activities like woodworking, gardening, mechanics, or sports.",
    options: [
      { text: "Strongly Agree", type: "R", weight: 2 },
      { text: "Agree", type: "R", weight: 1 },
      { text: "Neutral", type: null, weight: 0 },
      { text: "Disagree", type: "other", weight: 0 },
      { text: "Strongly Disagree", type: "other", weight: 0 }
    ]
  },
  {
    q: "I would rather be a mechanic, engineer, or farmer than a writer or artist.",
    options: [
      { text: "Strongly Agree", type: "R", weight: 2 },
      { text: "Agree", type: "R", weight: 1 },
      { text: "Neutral", type: null, weight: 0 },
      { text: "Disagree", type: "other", weight: 0 },
      { text: "Strongly Disagree", type: "other", weight: 0 }
    ]
  },
  {
    q: "I learn best by doing and practicing rather than reading or listening.",
    options: [
      { text: "Strongly Agree", type: "R", weight: 2 },
      { text: "Agree", type: "R", weight: 1 },
      { text: "Neutral", type: null, weight: 0 },
      { text: "Disagree", type: "other", weight: 0 },
      { text: "Strongly Disagree", type: "other", weight: 0 }
    ]
  },
  {
    q: "I enjoy fixing things that are broken (cars, appliances, electronics).",
    options: [
      { text: "Strongly Agree", type: "R", weight: 2 },
      { text: "Agree", type: "R", weight: 1 },
      { text: "Neutral", type: null, weight: 0 },
      { text: "Disagree", type: "other", weight: 0 },
      { text: "Strongly Disagree", type: "other", weight: 0 }
    ]
  },
  {
    q: "I am physically active and enjoy using my body for work or play.",
    options: [
      { text: "Strongly Agree", type: "R", weight: 2 },
      { text: "Agree", type: "R", weight: 1 },
      { text: "Neutral", type: null, weight: 0 },
      { text: "Disagree", type: "other", weight: 0 },
      { text: "Strongly Disagree", type: "other", weight: 0 }
    ]
  },
  {
    q: "I like concrete, tangible results over abstract ideas.",
    options: [
      { text: "Strongly Agree", type: "R", weight: 2 },
      { text: "Agree", type: "R", weight: 1 },
      { text: "Neutral", type: null, weight: 0 },
      { text: "Disagree", type: "other", weight: 0 },
      { text: "Strongly Disagree", type: "other", weight: 0 }
    ]
  },
  {
    q: "I enjoy jobs that require physical strength or endurance.",
    options: [
      { text: "Strongly Agree", type: "R", weight: 2 },
      { text: "Agree", type: "R", weight: 1 },
      { text: "Neutral", type: null, weight: 0 },
      { text: "Disagree", type: "other", weight: 0 },
      { text: "Strongly Disagree", type: "other", weight: 0 }
    ]
  },
  {
    q: "I am good at following technical blueprints or diagrams.",
    options: [
      { text: "Strongly Agree", type: "R", weight: 2 },
      { text: "Agree", type: "R", weight: 1 },
      { text: "Neutral", type: null, weight: 0 },
      { text: "Disagree", type: "other", weight: 0 },
      { text: "Strongly Disagree", type: "other", weight: 0 }
    ]
  },
  {
    q: "I prefer practical problems over theoretical puzzles.",
    options: [
      { text: "Strongly Agree", type: "R", weight: 2 },
      { text: "Agree", type: "R", weight: 1 },
      { text: "Neutral", type: null, weight: 0 },
      { text: "Disagree", type: "other", weight: 0 },
      { text: "Strongly Disagree", type: "other", weight: 0 }
    ]
  },

  // === INVESTIGATIVE (I) - Analytical, curious, scientific, research-oriented ===
  {
    q: "I love solving complex problems and puzzles.",
    options: [
      { text: "Strongly Agree", type: "I", weight: 2 },
      { text: "Agree", type: "I", weight: 1 },
      { text: "Neutral", type: null, weight: 0 },
      { text: "Disagree", type: "other", weight: 0 },
      { text: "Strongly Disagree", type: "other", weight: 0 }
    ]
  },
  {
    q: "I enjoy science, math, or research activities.",
    options: [
      { text: "Strongly Agree", type: "I", weight: 2 },
      { text: "Agree", type: "I", weight: 1 },
      { text: "Neutral", type: null, weight: 0 },
      { text: "Disagree", type: "other", weight: 0 },
      { text: "Strongly Disagree", type: "other", weight: 0 }
    ]
  },
  {
    q: "I like to understand how things work at a deep level.",
    options: [
      { text: "Strongly Agree", type: "I", weight: 2 },
      { text: "Agree", type: "I", weight: 1 },
      { text: "Neutral", type: null, weight: 0 },
      { text: "Disagree", type: "other", weight: 0 },
      { text: "Strongly Disagree", type: "other", weight: 0 }
    ]
  },
  {
    q: "I enjoy collecting and analyzing data to find patterns.",
    options: [
      { text: "Strongly Agree", type: "I", weight: 2 },
      { text: "Agree", type: "I", weight: 1 },
      { text: "Neutral", type: null, weight: 0 },
      { text: "Disagree", type: "other", weight: 0 },
      { text: "Strongly Disagree", type: "other", weight: 0 }
    ]
  },
  {
    q: "I would rather be a scientist, lab technician, or researcher than a salesperson.",
    options: [
      { text: "Strongly Agree", type: "I", weight: 2 },
      { text: "Agree", type: "I", weight: 1 },
      { text: "Neutral", type: null, weight: 0 },
      { text: "Disagree", type: "other", weight: 0 },
      { text: "Strongly Disagree", type: "other", weight: 0 }
    ]
  },
  {
    q: "I enjoy reading scientific articles, journals, or technical books.",
    options: [
      { text: "Strongly Agree", type: "I", weight: 2 },
      { text: "Agree", type: "I", weight: 1 },
      { text: "Neutral", type: null, weight: 0 },
      { text: "Disagree", type: "other", weight: 0 },
      { text: "Strongly Disagree", type: "other", weight: 0 }
    ]
  },
  {
    q: "I am curious and ask 'why' or 'how' questions constantly.",
    options: [
      { text: "Strongly Agree", type: "I", weight: 2 },
      { text: "Agree", type: "I", weight: 1 },
      { text: "Neutral", type: null, weight: 0 },
      { text: "Disagree", type: "other", weight: 0 },
      { text: "Strongly Disagree", type: "other", weight: 0 }
    ]
  },
  {
    q: "I prefer working independently on intellectual tasks.",
    options: [
      { text: "Strongly Agree", type: "I", weight: 2 },
      { text: "Agree", type: "I", weight: 1 },
      { text: "Neutral", type: null, weight: 0 },
      { text: "Disagree", type: "other", weight: 0 },
      { text: "Strongly Disagree", type: "other", weight: 0 }
    ]
  },
  {
    q: "I enjoy using logic and critical thinking to solve problems.",
    options: [
      { text: "Strongly Agree", type: "I", weight: 2 },
      { text: "Agree", type: "I", weight: 1 },
      { text: "Neutral", type: null, weight: 0 },
      { text: "Disagree", type: "other", weight: 0 },
      { text: "Strongly Disagree", type: "other", weight: 0 }
    ]
  },
  {
    q: "I like exploring new theories and abstract concepts.",
    options: [
      { text: "Strongly Agree", type: "I", weight: 2 },
      { text: "Agree", type: "I", weight: 1 },
      { text: "Neutral", type: null, weight: 0 },
      { text: "Disagree", type: "other", weight: 0 },
      { text: "Strongly Disagree", type: "other", weight: 0 }
    ]
  },
  {
    q: "I would enjoy a career in medicine, engineering, or data science.",
    options: [
      { text: "Strongly Agree", type: "I", weight: 2 },
      { text: "Agree", type: "I", weight: 1 },
      { text: "Neutral", type: null, weight: 0 },
      { text: "Disagree", type: "other", weight: 0 },
      { text: "Strongly Disagree", type: "other", weight: 0 }
    ]
  },
  {
    q: "I prefer to figure things out on my own rather than ask for help.",
    options: [
      { text: "Strongly Agree", type: "I", weight: 2 },
      { text: "Agree", type: "I", weight: 1 },
      { text: "Neutral", type: null, weight: 0 },
      { text: "Disagree", type: "other", weight: 0 },
      { text: "Strongly Disagree", type: "other", weight: 0 }
    ]
  },

  // === ARTISTIC (A) - Creative, expressive, imaginative, intuitive ===
  {
    q: "I enjoy creative activities like writing, painting, music, or design.",
    options: [
      { text: "Strongly Agree", type: "A", weight: 2 },
      { text: "Agree", type: "A", weight: 1 },
      { text: "Neutral", type: null, weight: 0 },
      { text: "Disagree", type: "other", weight: 0 },
      { text: "Strongly Disagree", type: "other", weight: 0 }
    ]
  },
  {
    q: "I value self-expression and originality over following rules.",
    options: [
      { text: "Strongly Agree", type: "A", weight: 2 },
      { text: "Agree", type: "A", weight: 1 },
      { text: "Neutral", type: null, weight: 0 },
      { text: "Disagree", type: "other", weight: 0 },
      { text: "Strongly Disagree", type: "other", weight: 0 }
    ]
  },
  {
    q: "I enjoy going to art galleries, concerts, or theater performances.",
    options: [
      { text: "Strongly Agree", type: "A", weight: 2 },
      { text: "Agree", type: "A", weight: 1 },
      { text: "Neutral", type: null, weight: 0 },
      { text: "Disagree", type: "other", weight: 0 },
      { text: "Strongly Disagree", type: "other", weight: 0 }
    ]
  },
  {
    q: "I would rather be a writer, musician, or designer than an accountant.",
    options: [
      { text: "Strongly Agree", type: "A", weight: 2 },
      { text: "Agree", type: "A", weight: 1 },
      { text: "Neutral", type: null, weight: 0 },
      { text: "Disagree", type: "other", weight: 0 },
      { text: "Strongly Disagree", type: "other", weight: 0 }
    ]
  },
  {
    q: "I enjoy creating things that are beautiful or meaningful.",
    options: [
      { text: "Strongly Agree", type: "A", weight: 2 },
      { text: "Agree", type: "A", weight: 1 },
      { text: "Neutral", type: null, weight: 0 },
      { text: "Disagree", type: "other", weight: 0 },
      { text: "Strongly Disagree", type: "other", weight: 0 }
    ]
  },
  {
    q: "I often have vivid imagination and daydream frequently.",
    options: [
      { text: "Strongly Agree", type: "A", weight: 2 },
      { text: "Agree", type: "A", weight: 1 },
      { text: "Neutral", type: null, weight: 0 },
      { text: "Disagree", type: "other", weight: 0 },
      { text: "Strongly Disagree", type: "other", weight: 0 }
    ]
  },
  {
    q: "I enjoy tasks that allow me to be innovative and unconventional.",
    options: [
      { text: "Strongly Agree", type: "A", weight: 2 },
      { text: "Agree", type: "A", weight: 1 },
      { text: "Neutral", type: null, weight: 0 },
      { text: "Disagree", type: "other", weight: 0 },
      { text: "Strongly Disagree", type: "other", weight: 0 }
    ]
  },
  {
    q: "I prefer working in unstructured, flexible environments.",
    options: [
      { text: "Strongly Agree", type: "A", weight: 2 },
      { text: "Agree", type: "A", weight: 1 },
      { text: "Neutral", type: null, weight: 0 },
      { text: "Disagree", type: "other", weight: 0 },
      { text: "Strongly Disagree", type: "other", weight: 0 }
    ]
  },
  {
    q: "I enjoy learning about art, literature, or music theory.",
    options: [
      { text: "Strongly Agree", type: "A", weight: 2 },
      { text: "Agree", type: "A", weight: 1 },
      { text: "Neutral", type: null, weight: 0 },
      { text: "Disagree", type: "other", weight: 0 },
      { text: "Strongly Disagree", type: "other", weight: 0 }
    ]
  },
  {
    q: "I am often told that I am creative or have a unique perspective.",
    options: [
      { text: "Strongly Agree", type: "A", weight: 2 },
      { text: "Agree", type: "A", weight: 1 },
      { text: "Neutral", type: null, weight: 0 },
      { text: "Disagree", type: "other", weight: 0 },
      { text: "Strongly Disagree", type: "other", weight: 0 }
    ]
  },
  {
    q: "I enjoy expressing my feelings through art, music, or writing.",
    options: [
      { text: "Strongly Agree", type: "A", weight: 2 },
      { text: "Agree", type: "A", weight: 1 },
      { text: "Neutral", type: null, weight: 0 },
      { text: "Disagree", type: "other", weight: 0 },
      { text: "Strongly Disagree", type: "other", weight: 0 }
    ]
  },
  {
    q: "I dislike repetitive, routine tasks that don't allow creativity.",
    options: [
      { text: "Strongly Agree", type: "A", weight: 2 },
      { text: "Agree", type: "A", weight: 1 },
      { text: "Neutral", type: null, weight: 0 },
      { text: "Disagree", type: "other", weight: 0 },
      { text: "Strongly Disagree", type: "other", weight: 0 }
    ]
  },

  // === SOCIAL (S) - Helping, teaching, counseling, people-oriented ===
  {
    q: "I enjoy helping, teaching, or counseling others.",
    options: [
      { text: "Strongly Agree", type: "S", weight: 2 },
      { text: "Agree", type: "S", weight: 1 },
      { text: "Neutral", type: null, weight: 0 },
      { text: "Disagree", type: "other", weight: 0 },
      { text: "Strongly Disagree", type: "other", weight: 0 }
    ]
  },
  {
    q: "I am good at understanding other people's feelings and perspectives.",
    options: [
      { text: "Strongly Agree", type: "S", weight: 2 },
      { text: "Agree", type: "S", weight: 1 },
      { text: "Neutral", type: null, weight: 0 },
      { text: "Disagree", type: "other", weight: 0 },
      { text: "Strongly Disagree", type: "other", weight: 0 }
    ]
  },
  {
    q: "I prefer teamwork and collaboration over working alone.",
    options: [
      { text: "Strongly Agree", type: "S", weight: 2 },
      { text: "Agree", type: "S", weight: 1 },
      { text: "Neutral", type: null, weight: 0 },
      { text: "Disagree", type: "other", weight: 0 },
      { text: "Strongly Disagree", type: "other", weight: 0 }
    ]
  },
  {
    q: "I would rather be a teacher, nurse, or social worker than a programmer.",
    options: [
      { text: "Strongly Agree", type: "S", weight: 2 },
      { text: "Agree", type: "S", weight: 1 },
      { text: "Neutral", type: null, weight: 0 },
      { text: "Disagree", type: "other", weight: 0 },
      { text: "Strongly Disagree", type: "other", weight: 0 }
    ]
  },
  {
    q: "I enjoy volunteering and contributing to my community.",
    options: [
      { text: "Strongly Agree", type: "S", weight: 2 },
      { text: "Agree", type: "S", weight: 1 },
      { text: "Neutral", type: null, weight: 0 },
      { text: "Disagree", type: "other", weight: 0 },
      { text: "Strongly Disagree", type: "other", weight: 0 }
    ]
  },
  {
    q: "I am patient and enjoy mentoring or guiding others.",
    options: [
      { text: "Strongly Agree", type: "S", weight: 2 },
      { text: "Agree", type: "S", weight: 1 },
      { text: "Neutral", type: null, weight: 0 },
      { text: "Disagree", type: "other", weight: 0 },
      { text: "Strongly Disagree", type: "other", weight: 0 }
    ]
  },
  {
    q: "I am often described as warm, empathetic, and approachable.",
    options: [
      { text: "Strongly Agree", type: "S", weight: 2 },
      { text: "Agree", type: "S", weight: 1 },
      { text: "Neutral", type: null, weight: 0 },
      { text: "Disagree", type: "other", weight: 0 },
      { text: "Strongly Disagree", type: "other", weight: 0 }
    ]
  },
  {
    q: "I enjoy jobs that involve helping people solve personal or practical problems.",
    options: [
      { text: "Strongly Agree", type: "S", weight: 2 },
      { text: "Agree", type: "S", weight: 1 },
      { text: "Neutral", type: null, weight: 0 },
      { text: "Disagree", type: "other", weight: 0 },
      { text: "Strongly Disagree", type: "other", weight: 0 }
    ]
  },
  {
    q: "I value harmony and enjoy resolving conflicts between people.",
    options: [
      { text: "Strongly Agree", type: "S", weight: 2 },
      { text: "Agree", type: "S", weight: 1 },
      { text: "Neutral", type: null, weight: 0 },
      { text: "Disagree", type: "other", weight: 0 },
      { text: "Strongly Disagree", type: "other", weight: 0 }
    ]
  },
  {
    q: "I am more interested in people than in things or data.",
    options: [
      { text: "Strongly Agree", type: "S", weight: 2 },
      { text: "Agree", type: "S", weight: 1 },
      { text: "Neutral", type: null, weight: 0 },
      { text: "Disagree", type: "other", weight: 0 },
      { text: "Strongly Disagree", type: "other", weight: 0 }
    ]
  },
  {
    q: "I enjoy facilitating group discussions or leading support groups.",
    options: [
      { text: "Strongly Agree", type: "S", weight: 2 },
      { text: "Agree", type: "S", weight: 1 },
      { text: "Neutral", type: null, weight: 0 },
      { text: "Disagree", type: "other", weight: 0 },
      { text: "Strongly Disagree", type: "other", weight: 0 }
    ]
  },
  {
    q: "I find fulfillment in making a positive difference in others' lives.",
    options: [
      { text: "Strongly Agree", type: "S", weight: 2 },
      { text: "Agree", type: "S", weight: 1 },
      { text: "Neutral", type: null, weight: 0 },
      { text: "Disagree", type: "other", weight: 0 },
      { text: "Strongly Disagree", type: "other", weight: 0 }
    ]
  },

  // === ENTERPRISING (E) - Persuasive, ambitious, leadership, business ===
  {
    q: "I enjoy leading, persuading, and influencing others.",
    options: [
      { text: "Strongly Agree", type: "E", weight: 2 },
      { text: "Agree", type: "E", weight: 1 },
      { text: "Neutral", type: null, weight: 0 },
      { text: "Disagree", type: "other", weight: 0 },
      { text: "Strongly Disagree", type: "other", weight: 0 }
    ]
  },
  {
    q: "I am ambitious and want to achieve positions of power or status.",
    options: [
      { text: "Strongly Agree", type: "E", weight: 2 },
      { text: "Agree", type: "E", weight: 1 },
      { text: "Neutral", type: null, weight: 0 },
      { text: "Disagree", type: "other", weight: 0 },
      { text: "Strongly Disagree", type: "other", weight: 0 }
    ]
  },
  {
    q: "I enjoy sales, marketing, or entrepreneurial activities.",
    options: [
      { text: "Strongly Agree", type: "E", weight: 2 },
      { text: "Agree", type: "E", weight: 1 },
      { text: "Neutral", type: null, weight: 0 },
      { text: "Disagree", type: "other", weight: 0 },
      { text: "Strongly Disagree", type: "other", weight: 0 }
    ]
  },
  {
    q: "I would rather be a manager, CEO, or business owner than a librarian.",
    options: [
      { text: "Strongly Agree", type: "E", weight: 2 },
      { text: "Agree", type: "E", weight: 1 },
      { text: "Neutral", type: null, weight: 0 },
      { text: "Disagree", type: "other", weight: 0 },
      { text: "Strongly Disagree", type: "other", weight: 0 }
    ]
  },
  {
    q: "I am confident speaking in public and presenting ideas.",
    options: [
      { text: "Strongly Agree", type: "E", weight: 2 },
      { text: "Agree", type: "E", weight: 1 },
      { text: "Neutral", type: null, weight: 0 },
      { text: "Disagree", type: "other", weight: 0 },
      { text: "Strongly Disagree", type: "other", weight: 0 }
    ]
  },
  {
    q: "I enjoy taking risks and making decisions that affect outcomes.",
    options: [
      { text: "Strongly Agree", type: "E", weight: 2 },
      { text: "Agree", type: "E", weight: 1 },
      { text: "Neutral", type: null, weight: 0 },
      { text: "Disagree", type: "other", weight: 0 },
      { text: "Strongly Disagree", type: "other", weight: 0 }
    ]
  },
  {
    q: "I am competitive and enjoy winning in business or negotiations.",
    options: [
      { text: "Strongly Agree", type: "E", weight: 2 },
      { text: "Agree", type: "E", weight: 1 },
      { text: "Neutral", type: null, weight: 0 },
      { text: "Disagree", type: "other", weight: 0 },
      { text: "Strongly Disagree", type: "other", weight: 0 }
    ]
  },
  {
    q: "I like to initiate projects and motivate others to take action.",
    options: [
      { text: "Strongly Agree", type: "E", weight: 2 },
      { text: "Agree", type: "E", weight: 1 },
      { text: "Neutral", type: null, weight: 0 },
      { text: "Disagree", type: "other", weight: 0 },
      { text: "Strongly Disagree", type: "other", weight: 0 }
    ]
  },
  {
    q: "I enjoy networking and building professional relationships.",
    options: [
      { text: "Strongly Agree", type: "E", weight: 2 },
      { text: "Agree", type: "E", weight: 1 },
      { text: "Neutral", type: null, weight: 0 },
      { text: "Disagree", type: "other", weight: 0 },
      { text: "Strongly Disagree", type: "other", weight: 0 }
    ]
  },
  {
    q: "I am persuasive and good at convincing others to see my point of view.",
    options: [
      { text: "Strongly Agree", type: "E", weight: 2 },
      { text: "Agree", type: "E", weight: 1 },
      { text: "Neutral", type: null, weight: 0 },
      { text: "Disagree", type: "other", weight: 0 },
      { text: "Strongly Disagree", type: "other", weight: 0 }
    ]
  },
  {
    q: "I prefer to be in charge rather than take orders.",
    options: [
      { text: "Strongly Agree", type: "E", weight: 2 },
      { text: "Agree", type: "E", weight: 1 },
      { text: "Neutral", type: null, weight: 0 },
      { text: "Disagree", type: "other", weight: 0 },
      { text: "Strongly Disagree", type: "other", weight: 0 }
    ]
  },
  {
    q: "I am driven by financial rewards and career advancement.",
    options: [
      { text: "Strongly Agree", type: "E", weight: 2 },
      { text: "Agree", type: "E", weight: 1 },
      { text: "Neutral", type: null, weight: 0 },
      { text: "Disagree", type: "other", weight: 0 },
      { text: "Strongly Disagree", type: "other", weight: 0 }
    ]
  },

  // === CONVENTIONAL (C) - Organized, detail-oriented, systematic, clerical ===
  {
    q: "I enjoy organizing, categorizing, and maintaining order.",
    options: [
      { text: "Strongly Agree", type: "C", weight: 2 },
      { text: "Agree", type: "C", weight: 1 },
      { text: "Neutral", type: null, weight: 0 },
      { text: "Disagree", type: "other", weight: 0 },
      { text: "Strongly Disagree", type: "other", weight: 0 }
    ]
  },
  {
    q: "I am good at following procedures, rules, and regulations.",
    options: [
      { text: "Strongly Agree", type: "C", weight: 2 },
      { text: "Agree", type: "C", weight: 1 },
      { text: "Neutral", type: null, weight: 0 },
      { text: "Disagree", type: "other", weight: 0 },
      { text: "Strongly Disagree", type: "other", weight: 0 }
    ]
  },
  {
    q: "I prefer working with data, numbers, or records over people.",
    options: [
      { text: "Strongly Agree", type: "C", weight: 2 },
      { text: "Agree", type: "C", weight: 1 },
      { text: "Neutral", type: null, weight: 0 },
      { text: "Disagree", type: "other", weight: 0 },
      { text: "Strongly Disagree", type: "other", weight: 0 }
    ]
  },
  {
    q: "I would rather be an accountant, data entry specialist, or administrator than an artist.",
    options: [
      { text: "Strongly Agree", type: "C", weight: 2 },
      { text: "Agree", type: "C", weight: 1 },
      { text: "Neutral", type: null, weight: 0 },
      { text: "Disagree", type: "other", weight: 0 },
      { text: "Strongly Disagree", type: "other", weight: 0 }
    ]
  },
  {
    q: "I am detail-oriented and notice errors or inconsistencies easily.",
    options: [
      { text: "Strongly Agree", type: "C", weight: 2 },
      { text: "Agree", type: "C", weight: 1 },
      { text: "Neutral", type: null, weight: 0 },
      { text: "Disagree", type: "other", weight: 0 },
      { text: "Strongly Disagree", type: "other", weight: 0 }
    ]
  },
  {
    q: "I like having clear instructions and structured tasks.",
    options: [
      { text: "Strongly Agree", type: "C", weight: 2 },
      { text: "Agree", type: "C", weight: 1 },
      { text: "Neutral", type: null, weight: 0 },
      { text: "Disagree", type: "other", weight: 0 },
      { text: "Strongly Disagree", type: "other", weight: 0 }
    ]
  },
  {
    q: "I enjoy using spreadsheets, databases, or accounting software.",
    options: [
      { text: "Strongly Agree", type: "C", weight: 2 },
      { text: "Agree", type: "C", weight: 1 },
      { text: "Neutral", type: null, weight: 0 },
      { text: "Disagree", type: "other", weight: 0 },
      { text: "Strongly Disagree", type: "other", weight: 0 }
    ]
  },
  {
    q: "I value punctuality, accuracy, and dependability.",
    options: [
      { text: "Strongly Agree", type: "C", weight: 2 },
      { text: "Agree", type: "C", weight: 1 },
      { text: "Neutral", type: null, weight: 0 },
      { text: "Disagree", type: "other", weight: 0 },
      { text: "Strongly Disagree", type: "other", weight: 0 }
    ]
  },
  {
    q: "I prefer predictable routines over unpredictable challenges.",
    options: [
      { text: "Strongly Agree", type: "C", weight: 2 },
      { text: "Agree", type: "C", weight: 1 },
      { text: "Neutral", type: null, weight: 0 },
      { text: "Disagree", type: "other", weight: 0 },
      { text: "Strongly Disagree", type: "other", weight: 0 }
    ]
  },
  {
    q: "I enjoy tasks that require attention to detail, like proofreading or data entry.",
    options: [
      { text: "Strongly Agree", type: "C", weight: 2 },
      { text: "Agree", type: "C", weight: 1 },
      { text: "Neutral", type: null, weight: 0 },
      { text: "Disagree", type: "other", weight: 0 },
      { text: "Strongly Disagree", type: "other", weight: 0 }
    ]
  },
  {
    q: "I like to keep my workspace neat and systematically organized.",
    options: [
      { text: "Strongly Agree", type: "C", weight: 2 },
      { text: "Agree", type: "C", weight: 1 },
      { text: "Neutral", type: null, weight: 0 },
      { text: "Disagree", type: "other", weight: 0 },
      { text: "Strongly Disagree", type: "other", weight: 0 }
    ]
  },
  {
    q: "I prefer careers with clear hierarchies and established policies.",
    options: [
      { text: "Strongly Agree", type: "C", weight: 2 },
      { text: "Agree", type: "C", weight: 1 },
      { text: "Neutral", type: null, weight: 0 },
      { text: "Disagree", type: "other", weight: 0 },
      { text: "Strongly Disagree", type: "other", weight: 0 }
    ]
  }
];

// Holland Code Type Descriptions
export const hollandTypes = {
  "R": {
    name: "Realistic",
    arabicName: "واقعي",
    description: "Hands-on, practical, physically active. Enjoys working with tools, machines, animals, or nature.",
    strengths: ["Mechanical", "Physical coordination", "Practical problem-solving", "Reliable"],
    careers: ["Mechanic", "Engineer", "Electrician", "Farmer", "Construction worker", "Pilot", "Athlete"],
    workEnv: ["Outdoor", "Workshop", "Factory", "Construction site", "Laboratory (applied)"],
    values: ["Tangibility", "Action", "Concrete results", "Physical work"]
  },
  "I": {
    name: "Investigative",
    arabicName: "استقصائي",
    description: "Analytical, curious, scientific. Enjoys research, problem-solving, and theoretical exploration.",
    strengths: ["Critical thinking", "Data analysis", "Research skills", "Logical reasoning"],
    careers: ["Scientist", "Doctor", "Engineer (R&D)", "Researcher", "Mathematician", "Data analyst"],
    workEnv: ["Laboratory", "University", "Hospital", "Research facility", "Library"],
    values: ["Knowledge", "Precision", "Innovation", "Intellectual challenge"]
  },
  "A": {
    name: "Artistic",
    arabicName: "فني",
    description: "Creative, expressive, intuitive. Enjoys art, writing, music, design, and self-expression.",
    strengths: ["Creativity", "Imagination", "Self-expression", "Originality"],
    careers: ["Writer", "Musician", "Painter", "Graphic designer", "Actor", "Architect", "Photographer"],
    workEnv: ["Studio", "Theater", "Gallery", "Design firm", "Freelance"],
    values: ["Beauty", "Authenticity", "Freedom", "Emotional expression"]
  },
  "S": {
    name: "Social",
    arabicName: "اجتماعي",
    description: "Helpful, empathetic, people-oriented. Enjoys teaching, counseling, and serving others.",
    strengths: ["Empathy", "Communication", "Cooperation", "Patience"],
    careers: ["Teacher", "Nurse", "Counselor", "Social worker", "Psychologist", "HR specialist"],
    workEnv: ["School", "Hospital", "Clinic", "Community center", "Office"],
    values: ["Service", "Harmony", "Connection", "Making a difference"]
  },
  "E": {
    name: "Enterprising",
    arabicName: "مغامر",
    description: "Ambitious, persuasive, leadership-oriented. Enjoys sales, management, and entrepreneurship.",
    strengths: ["Leadership", "Persuasion", "Risk-taking", "Communication"],
    careers: ["Manager", "CEO", "Salesperson", "Entrepreneur", "Lawyer", "Politician"],
    workEnv: ["Office", "Corporate", "Field sales", "Boardroom", "Startup"],
    values: ["Success", "Status", "Wealth", "Influence"]
  },
  "C": {
    name: "Conventional",
    arabicName: "تقليدي",
    description: "Organized, detail-focused, systematic. Enjoys data processing, record-keeping, and procedures.",
    strengths: ["Organization", "Accuracy", "Attention to detail", "Reliability"],
    careers: ["Accountant", "Data entry", "Administrator", "Banker", "Paralegal", "Auditor"],
    workEnv: ["Office", "Bank", "Government", "Data center", "Library"],
    values: ["Order", "Precision", "Stability", "Efficiency"]
  }
};

// Calculate Holland Code (3-letter code) based on top 3 scores
export const calculateHollandCode = (responses) => {
  // Max raw per type: 12 questions * max weight 2 = 24
  const maxRawPerType = 24;
  const rawScores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };

  responses.forEach(response => {
    if (response.type !== "other" && response.type !== null) {
      rawScores[response.type] += response.weight;
    }
  });

  // Normalize to 0-100 scale
  const normalizedScores = {};
  for (let type of ["R", "I", "A", "S", "E", "C"]) {
    normalizedScores[type] = Math.round((rawScores[type] / maxRawPerType) * 100);
  }

  // Get sorted types by score (descending)
  const sorted = Object.entries(normalizedScores).sort((a, b) => b[1] - a[1]);
  const primary = sorted[0][0];
  const secondary = sorted[1][0];
  const tertiary = sorted[2][0];
  const hollandCode = `${primary}${secondary}${tertiary}`;

  // Personality fit description based on consistency (adjacent vs opposite types)
  const order = ["R", "I", "A", "S", "E", "C"];
  const isConsistent = (code) => {
    const positions = code.split("").map(c => order.indexOf(c));
    // Check if each consecutive pair is adjacent in the hexagon
    for (let i = 0; i < positions.length - 1; i++) {
      if (Math.abs(positions[i] - positions[i + 1]) > 1 && 
          !(positions[i] === 0 && positions[i+1] === 5) && 
          !(positions[i] === 5 && positions[i+1] === 0)) {
        return false;
      }
    }
    return true;
  };

  const consistency = isConsistent(hollandCode) ? "High (adjacent types)" : "Low (opposite types)";

  // Differentiation (how much higher top score is than bottom)
  const topScore = sorted[0][1];
  const bottomScore = sorted[5][1];
  const differentiation = topScore - bottomScore;
  const differentiationLevel = differentiation > 30 ? "High (clear preferences)" : 
                               differentiation > 15 ? "Moderate" : "Low (flat profile)";

  return {
    rawScores,
    normalizedScores,
    hollandCode,
    primaryType: { code: primary, ...hollandTypes[primary] },
    secondaryType: { code: secondary, ...hollandTypes[secondary] },
    tertiaryType: { code: tertiary, ...hollandTypes[tertiary] },
    consistency,
    differentiation: differentiationLevel,
    sortedScores: sorted
  };
};

// Comprehensive career recommendations based on Holland Code
export const interpretHollandCode = (result) => {
  const code = result.hollandCode;
  const primary = result.primaryType.code;
  const secondary = result.secondaryType.code;
  const tertiary = result.tertiaryType.code;

  // Common career clusters for two-letter combinations
  const careerSuggestions = {
    "RI": ["Mechanical Engineer", "Industrial Designer", "Agricultural Scientist", "Forester"],
    "RC": ["Construction Manager", "Quality Control Inspector", "Civil Engineer Technician"],
    "RE": ["Construction Project Manager", "Real Estate Developer", "Industrial Sales"],
    "RS": ["Physical Therapist", "Firefighter", "Police Officer", "Athletic Trainer"],
    "RA": ["Landscape Architect", "Craft Artist", "Jeweler", "Chef"],
    "IR": ["Biomedical Engineer", "Environmental Scientist", "Geologist"],
    "IC": ["Data Analyst", "Statistician", "Lab Technician", "Technical Writer"],
    "IE": ["Technology Consultant", "Patent Attorney", "Business Analyst"],
    "IS": ["Clinical Psychologist", "Epidemiologist", "Medical Researcher"],
    "IA": ["Scientific Illustrator", "Art Conservator", "Museum Curator"],
    "AR": ["Architect", "Industrial Designer", "Furniture Designer"],
    "AI": ["Art Therapist", "Creative Director (tech)", "UX Designer"],
    "AS": ["Art Teacher", "Music Therapist", "Creative Writer (social topics)"],
    "AE": ["Fashion Merchandiser", "Creative Director", "Marketing Designer"],
    "AC": ["Graphic Designer (corporate)", "Web Designer", "Technical Illustrator"],
    "SR": ["Occupational Therapist", "Recreation Therapist", "Physical Education Teacher"],
    "SI": ["School Psychologist", "Guidance Counselor", "Speech Pathologist"],
    "SA": ["Drama Teacher", "Art Therapist", "Music Teacher"],
    "SE": ["HR Manager", "Corporate Trainer", "Public Relations Specialist"],
    "SC": ["Social Services Administrator", "Office Manager (non-profit)", "School Administrator"],
    "ER": ["Real Estate Agent (commercial)", "Construction Supervisor", "Sports Manager"],
    "EI": ["Management Consultant", "Technology Sales", "Investment Banker"],
    "EA": ["Advertising Executive", "Event Planner", "Creative Director"],
    "ES": ["Sales Manager", "Politician", "Non-profit Director"],
    "EC": ["Financial Manager", "Operations Manager", "Compliance Officer"],
    "CR": ["Logistics Manager", "Supply Chain Analyst", "Inventory Specialist"],
    "CI": ["Financial Analyst", "Auditor", "Database Administrator"],
    "CA": ["Technical Editor", "Publishing Assistant", "Legal Secretary"],
    "CE": ["Executive Assistant", "Office Manager", "Bank Branch Manager"],
    "CS": ["Medical Records Administrator", "HR Assistant", "Customer Service Manager"]
  };

  const primarySecondary = `${primary}${secondary}`;
  const suggestions = careerSuggestions[primarySecondary] || 
                     careerSuggestions[`${secondary}${primary}`] ||
                     ["Counselor", "Teacher", "Manager", "Analyst", "Specialist"];

  // Work environment descriptions
  const workEnvSummary = `${hollandTypes[primary].workEnv[0]}, ${hollandTypes[secondary].workEnv[0]} environment`;

  return {
    hollandCode: code,
    primaryInterest: result.primaryType.name,
    secondaryInterest: result.secondaryType.name,
    tertiaryInterest: result.tertiaryType.name,
    consistency: result.consistency,
    differentiation: result.differentiation,
    careerRecommendations: suggestions.slice(0, 6),
    recommendedWorkEnvironment: workEnvSummary,
    summary: `Your Holland Code (${code}) suggests you are primarily ${result.primaryType.name.toLowerCase()}, secondarily ${result.secondaryType.name.toLowerCase()}. You thrive in ${workEnvSummary.toLowerCase()} roles that involve ${hollandTypes[primary].description.toLowerCase()}.`
  };
};

// Export default
export default { hollandQuestionPool, hollandTypes, calculateHollandCode, interpretHollandCode };
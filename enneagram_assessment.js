// enneagram_assessment.js
// Enneagram Personality Assessment - The Architecture of Soul & Personality
// 54 questions (6 per type) with weighted options for Types 1-9

export const enneagramQuestionPool = [
  // === TYPE 1: The Reformer / Perfectionist ===
  // Core motivation: to be good, right, and improve things
  { 
    q: "You have a strong inner critic that pushes you to do things 'the right way.'",
    options: [
      { text: "This describes me very well", type: 1, weight: 2 },
      { text: "This describes me somewhat", type: 1, weight: 1 },
      { text: "Neutral or not sure", type: null, weight: 0 },
      { text: "This does not fit me well", type: "other", weight: 0 }
    ]
  },
  { 
    q: "You often notice what's wrong or could be improved in any situation.",
    options: [
      { text: "Always – I see flaws and fixes everywhere", type: 1, weight: 2 },
      { text: "Often – I have high standards", type: 1, weight: 1 },
      { text: "Sometimes", type: null, weight: 0 },
      { text: "Rarely – I'm more accepting", type: "other", weight: 0 }
    ]
  },
  { 
    q: "You are highly organized and value order, rules, and integrity.",
    options: [
      { text: "Very true – I need structure and ethics", type: 1, weight: 2 },
      { text: "Somewhat true", type: 1, weight: 1 },
      { text: "Not especially", type: null, weight: 0 },
      { text: "I prefer flexibility", type: "other", weight: 0 }
    ]
  },
  { 
    q: "You are often frustrated when others don't follow the rules or meet your standards.",
    options: [
      { text: "Yes, it bothers me deeply", type: 1, weight: 2 },
      { text: "It bothers me sometimes", type: 1, weight: 1 },
      { text: "I rarely get frustrated about that", type: null, weight: 0 },
      { text: "I'm very tolerant", type: "other", weight: 0 }
    ]
  },
  { 
    q: "You have a strong sense of right and wrong and act according to your principles.",
    options: [
      { text: "Absolutely – principles guide my life", type: 1, weight: 2 },
      { text: "Mostly", type: 1, weight: 1 },
      { text: "Sometimes", type: null, weight: 0 },
      { text: "I'm more pragmatic than principled", type: "other", weight: 0 }
    ]
  },
  { 
    q: "You are critical of yourself and strive for self-improvement constantly.",
    options: [
      { text: "Very critical – I'm never satisfied", type: 1, weight: 2 },
      { text: "Moderately self-critical", type: 1, weight: 1 },
      { text: "I'm fairly self-accepting", type: null, weight: 0 },
      { text: "I don't dwell on self-criticism", type: "other", weight: 0 }
    ]
  },

  // === TYPE 2: The Helper / Giver ===
  // Core motivation: to be loved, needed, and appreciated by helping others
  { 
    q: "You go out of your way to make others feel cared for and supported.",
    options: [
      { text: "This is central to who I am", type: 2, weight: 2 },
      { text: "I do this often", type: 2, weight: 1 },
      { text: "Sometimes", type: null, weight: 0 },
      { text: "I prioritize my own needs first", type: "other", weight: 0 }
    ]
  },
  { 
    q: "You feel most valued when you are helping someone or being needed.",
    options: [
      { text: "Absolutely – helping defines my worth", type: 2, weight: 2 },
      { text: "Yes, it's a big part of my identity", type: 2, weight: 1 },
      { text: "Somewhat", type: null, weight: 0 },
      { text: "Not really – I value independence more", type: "other", weight: 0 }
    ]
  },
  { 
    q: "You often put others' needs ahead of your own, sometimes to your detriment.",
    options: [
      { text: "Yes, I struggle with that", type: 2, weight: 2 },
      { text: "Occasionally I do", type: 2, weight: 1 },
      { text: "I try to balance", type: null, weight: 0 },
      { text: "I put myself first usually", type: "other", weight: 0 }
    ]
  },
  { 
    q: "You are warm, generous, and enjoy making people feel special.",
    options: [
      { text: "Very much so – it's natural to me", type: 2, weight: 2 },
      { text: "Yes, I'm a giving person", type: 2, weight: 1 },
      { text: "I'm friendly but not overly giving", type: null, weight: 0 },
      { text: "I'm more reserved", type: "other", weight: 0 }
    ]
  },
  { 
    q: "You have difficulty saying no or setting boundaries with people you care about.",
    options: [
      { text: "Yes, it's a real challenge", type: 2, weight: 2 },
      { text: "Sometimes it's hard", type: 2, weight: 1 },
      { text: "I'm usually good with boundaries", type: null, weight: 0 },
      { text: "I say no easily", type: "other", weight: 0 }
    ]
  },
  { 
    q: "You secretly want to be appreciated and may feel hurt if your help goes unnoticed.",
    options: [
      { text: "Yes, I need appreciation", type: 2, weight: 2 },
      { text: "Somewhat – it's nice to be thanked", type: 2, weight: 1 },
      { text: "I don't need recognition", type: null, weight: 0 },
      { text: "I prefer to help anonymously", type: "other", weight: 0 }
    ]
  },

  // === TYPE 3: The Achiever / Performer ===
  // Core motivation: to be successful, admired, and avoid failure
  { 
    q: "You are highly driven to achieve goals and be seen as successful.",
    options: [
      { text: "Yes, success is my main driver", type: 3, weight: 2 },
      { text: "I am ambitious", type: 3, weight: 1 },
      { text: "Moderately driven", type: null, weight: 0 },
      { text: "I'm more focused on happiness than success", type: "other", weight: 0 }
    ]
  },
  { 
    q: "You adapt your image to fit what's expected or admired in different settings.",
    options: [
      { text: "I'm very good at adapting my persona", type: 3, weight: 2 },
      { text: "I do this somewhat", type: 3, weight: 1 },
      { text: "I'm mostly authentic across situations", type: null, weight: 0 },
      { text: "I dislike pretending", type: "other", weight: 0 }
    ]
  },
  { 
    q: "You are competitive and want to be the best at what you do.",
    options: [
      { text: "Extremely competitive", type: 3, weight: 2 },
      { text: "Fairly competitive", type: 3, weight: 1 },
      { text: "I compete when necessary", type: null, weight: 0 },
      { text: "I'm not competitive at all", type: "other", weight: 0 }
    ]
  },
  { 
    q: "You care deeply about your public image, status, and reputation.",
    options: [
      { text: "Very much – image matters a lot", type: 3, weight: 2 },
      { text: "Somewhat important", type: 3, weight: 1 },
      { text: "Neutral", type: null, weight: 0 },
      { text: "I don't care about image", type: "other", weight: 0 }
    ]
  },
  { 
    q: "You are efficient, productive, and feel uncomfortable when not accomplishing something.",
    options: [
      { text: "Yes, I always need to be doing", type: 3, weight: 2 },
      { text: "I like being productive", type: 3, weight: 1 },
      { text: "I can relax easily", type: null, weight: 0 },
      { text: "I prefer leisure over work", type: "other", weight: 0 }
    ]
  },
  { 
    q: "Failure or looking incompetent is one of your biggest fears.",
    options: [
      { text: "Yes, I fear failure intensely", type: 3, weight: 2 },
      { text: "I avoid failure", type: 3, weight: 1 },
      { text: "I'm okay with failing sometimes", type: null, weight: 0 },
      { text: "Failure doesn't scare me", type: "other", weight: 0 }
    ]
  },

  // === TYPE 4: The Individualist / Romantic ===
  // Core motivation: to be unique, authentic, and find meaning
  { 
    q: "You often feel different or unique compared to others, sometimes like an outsider.",
    options: [
      { text: "Very true – I feel different", type: 4, weight: 2 },
      { text: "Somewhat true", type: 4, weight: 1 },
      { text: "I feel like I fit in mostly", type: null, weight: 0 },
      { text: "I'm very conventional", type: "other", weight: 0 }
    ]
  },
  { 
    q: "You are drawn to art, beauty, and self-expression as a way to understand yourself.",
    options: [
      { text: "Absolutely – art is my soul", type: 4, weight: 2 },
      { text: "I appreciate creativity", type: 4, weight: 1 },
      { text: "I like art but not central", type: null, weight: 0 },
      { text: "I'm not artistic", type: "other", weight: 0 }
    ]
  },
  { 
    q: "You tend to focus on what's missing or what you don't have, longing for something more.",
    options: [
      { text: "Yes, I often feel a sense of lack", type: 4, weight: 2 },
      { text: "Sometimes I feel that way", type: 4, weight: 1 },
      { text: "I'm grateful for what I have", type: null, weight: 0 },
      { text: "I rarely feel longing", type: "other", weight: 0 }
    ]
  },
  { 
    q: "Your emotions are intense, and you value authenticity over social norms.",
    options: [
      { text: "Yes – I feel deeply and stay true", type: 4, weight: 2 },
      { text: "I'm emotional and authentic", type: 4, weight: 1 },
      { text: "I'm more balanced", type: null, weight: 0 },
      { text: "I prefer to be practical", type: "other", weight: 0 }
    ]
  },
  { 
    q: "You sometimes feel envious of others who seem to have happiness or fulfillment you lack.",
    options: [
      { text: "Yes, envy is a struggle", type: 4, weight: 2 },
      { text: "Occasionally I feel envious", type: 4, weight: 1 },
      { text: "Rarely", type: null, weight: 0 },
      { text: "Never – I'm content", type: "other", weight: 0 }
    ]
  },
  { 
    q: "You prefer to be seen as unique and original rather than conventional or ordinary.",
    options: [
      { text: "Yes, uniqueness is vital", type: 4, weight: 2 },
      { text: "I like being different", type: 4, weight: 1 },
      { text: "I don't mind being ordinary", type: null, weight: 0 },
      { text: "I prefer fitting in", type: "other", weight: 0 }
    ]
  },

  // === TYPE 5: The Investigator / Observer ===
  // Core motivation: to be capable, knowledgeable, and avoid intrusion
  { 
    q: "You prefer to observe and analyze before participating in social situations.",
    options: [
      { text: "Yes, I'm a keen observer", type: 5, weight: 2 },
      { text: "I tend to hang back", type: 5, weight: 1 },
      { text: "I'm comfortable jumping in", type: null, weight: 0 },
      { text: "I'm very social", type: "other", weight: 0 }
    ]
  },
  { 
    q: "You value knowledge, expertise, and understanding how things work.",
    options: [
      { text: "Knowledge is my top value", type: 5, weight: 2 },
      { text: "I'm intellectually curious", type: 5, weight: 1 },
      { text: "I like learning but not obsessed", type: null, weight: 0 },
      { text: "I prefer practical doing over theory", type: "other", weight: 0 }
    ]
  },
  { 
    q: "You need a lot of alone time to recharge and feel drained by too much social interaction.",
    options: [
      { text: "Absolutely – solitude is essential", type: 5, weight: 2 },
      { text: "I need significant alone time", type: 5, weight: 1 },
      { text: "I balance alone and social time", type: null, weight: 0 },
      { text: "I'm energized by people", type: "other", weight: 0 }
    ]
  },
  { 
    q: "You are private and guard your personal space and energy from intrusions.",
    options: [
      { text: "Very private – I set strong boundaries", type: 5, weight: 2 },
      { text: "I'm selective about sharing", type: 5, weight: 1 },
      { text: "I'm fairly open", type: null, weight: 0 },
      { text: "I'm an open book", type: "other", weight: 0 }
    ]
  },
  { 
    q: "You often feel that you need to prepare or research extensively before taking action.",
    options: [
      { text: "Yes, I over-prepare", type: 5, weight: 2 },
      { text: "I like to be prepared", type: 5, weight: 1 },
      { text: "I prefer learning by doing", type: null, weight: 0 },
      { text: "I act on instinct", type: "other", weight: 0 }
    ]
  },
  { 
    q: "You can become detached from emotions and rely on logic to navigate life.",
    options: [
      { text: "Yes, I'm very cerebral", type: 5, weight: 2 },
      { text: "I lean toward logic", type: 5, weight: 1 },
      { text: "I balance heart and head", type: null, weight: 0 },
      { text: "I'm more emotional", type: "other", weight: 0 }
    ]
  },

  // === TYPE 6: The Loyalist / Skeptic ===
  // Core motivation: to feel secure, supported, and avoid danger
  { 
    q: "You often anticipate problems and worst-case scenarios to prepare yourself.",
    options: [
      { text: "Yes, I'm always thinking ahead to risks", type: 6, weight: 2 },
      { text: "I'm cautious and plan for trouble", type: 6, weight: 1 },
      { text: "I'm more optimistic", type: null, weight: 0 },
      { text: "I rarely worry", type: "other", weight: 0 }
    ]
  },
  { 
    q: "Loyalty is extremely important to you, and you are deeply committed to trusted people.",
    options: [
      { text: "Loyalty is my core value", type: 6, weight: 2 },
      { text: "I'm very loyal", type: 6, weight: 1 },
      { text: "I'm loyal but not obsessive", type: null, weight: 0 },
      { text: "I prioritize independence", type: "other", weight: 0 }
    ]
  },
  { 
    q: "You seek reassurance and approval from authorities or trusted sources before making decisions.",
    options: [
      { text: "Yes, I need validation", type: 6, weight: 2 },
      { text: "I like to check with others", type: 6, weight: 1 },
      { text: "I trust my own judgment", type: null, weight: 0 },
      { text: "I decide alone", type: "other", weight: 0 }
    ]
  },
  { 
    q: "You can be both very supportive and also questioning or suspicious, depending on the situation.",
    options: [
      { text: "Yes, I oscillate between trust and doubt", type: 6, weight: 2 },
      { text: "I'm cautious but loyal", type: 6, weight: 1 },
      { text: "I'm generally trusting", type: null, weight: 0 },
      { text: "I'm generally skeptical", type: "other", weight: 0 }
    ]
  },
  { 
    q: "Security and stability are major priorities in your life choices.",
    options: [
      { text: "Yes, security comes first", type: 6, weight: 2 },
      { text: "It's very important", type: 6, weight: 1 },
      { text: "I value freedom over security", type: null, weight: 0 },
      { text: "I'm a risk-taker", type: "other", weight: 0 }
    ]
  },
  { 
    q: "You tend to test people's loyalty or question their intentions to feel safe.",
    options: [
      { text: "I do that often", type: 6, weight: 2 },
      { text: "Sometimes I'm wary", type: 6, weight: 1 },
      { text: "Rarely", type: null, weight: 0 },
      { text: "I trust easily", type: "other", weight: 0 }
    ]
  },

  // === TYPE 7: The Enthusiast / Epicure ===
  // Core motivation: to be satisfied, happy, and avoid pain/boredom
  { 
    q: "You are always looking for new experiences, adventures, and exciting possibilities.",
    options: [
      { text: "Yes, variety is the spice of life", type: 7, weight: 2 },
      { text: "I love novelty", type: 7, weight: 1 },
      { text: "I like some routine", type: null, weight: 0 },
      { text: "I prefer stability", type: "other", weight: 0 }
    ]
  },
  { 
    q: "You avoid negative emotions by staying busy or focusing on positive plans.",
    options: [
      { text: "Yes, I distract myself from pain", type: 7, weight: 2 },
      { text: "I tend to look on the bright side", type: 7, weight: 1 },
      { text: "I face negative feelings directly", type: null, weight: 0 },
      { text: "I dwell on problems", type: "other", weight: 0 }
    ]
  },
  { 
    q: "You have many interests and projects but sometimes struggle to finish them.",
    options: [
      { text: "Yes, I'm a starter, not a finisher", type: 7, weight: 2 },
      { text: "I have many hobbies", type: 7, weight: 1 },
      { text: "I complete most things", type: null, weight: 0 },
      { text: "I'm highly focused", type: "other", weight: 0 }
    ]
  },
  { 
    q: "You fear being trapped, bored, or limited in your options.",
    options: [
      { text: "That's a big fear for me", type: 7, weight: 2 },
      { text: "I dislike limitations", type: 7, weight: 1 },
      { text: "I'm okay with commitments", type: null, weight: 0 },
      { text: "I find comfort in limits", type: "other", weight: 0 }
    ]
  },
  { 
    q: "You are spontaneous, optimistic, and love planning fun activities.",
    options: [
      { text: "Yes, I'm the fun planner", type: 7, weight: 2 },
      { text: "I enjoy spontaneity", type: 7, weight: 1 },
      { text: "I'm more serious", type: null, weight: 0 },
      { text: "I prefer structure", type: "other", weight: 0 }
    ]
  },
  { 
    q: "You reframe challenges as opportunities and rarely stay down for long.",
    options: [
      { text: "Yes, I bounce back quickly", type: 7, weight: 2 },
      { text: "I'm resilient", type: 7, weight: 1 },
      { text: "I dwell on setbacks", type: null, weight: 0 },
      { text: "I'm realistic about challenges", type: "other", weight: 0 }
    ]
  },

  // === TYPE 8: The Challenger / Protector ===
  // Core motivation: to be strong, in control, and avoid vulnerability
  { 
    q: "You are assertive, direct, and not afraid of confrontation.",
    options: [
      { text: "Yes, I speak my mind", type: 8, weight: 2 },
      { text: "I can be confrontational", type: 8, weight: 1 },
      { text: "I avoid conflict", type: null, weight: 0 },
      { text: "I'm passive", type: "other", weight: 0 }
    ]
  },
  { 
    q: "You value strength, justice, and protecting the vulnerable.",
    options: [
      { text: "That's my mission", type: 8, weight: 2 },
      { text: "I stand up for others", type: 8, weight: 1 },
      { text: "I care but less intensely", type: null, weight: 0 },
      { text: "I focus on myself", type: "other", weight: 0 }
    ]
  },
  { 
    q: "You have a hard time showing vulnerability or admitting weakness.",
    options: [
      { text: "Yes, I hate appearing weak", type: 8, weight: 2 },
      { text: "I guard my vulnerability", type: 8, weight: 1 },
      { text: "I'm comfortable being vulnerable", type: null, weight: 0 },
      { text: "I openly share struggles", type: "other", weight: 0 }
    ]
  },
  { 
    q: "You like to be in charge and take control of situations and people.",
    options: [
      { text: "Yes, I naturally lead", type: 8, weight: 2 },
      { text: "I take charge when needed", type: 8, weight: 1 },
      { text: "I prefer to follow", type: null, weight: 0 },
      { text: "I avoid responsibility", type: "other", weight: 0 }
    ]
  },
  { 
    q: "You are intense, energetic, and have a big presence that others notice.",
    options: [
      { text: "Yes, people see my energy", type: 8, weight: 2 },
      { text: "I have a strong presence", type: 8, weight: 1 },
      { text: "I'm more low-key", type: null, weight: 0 },
      { text: "I blend in", type: "other", weight: 0 }
    ]
  },
  { 
    q: "You dislike being controlled or told what to do by others.",
    options: [
      { text: "I resist authority", type: 8, weight: 2 },
      { text: "I value my autonomy", type: 8, weight: 1 },
      { text: "I'm fine with guidance", type: null, weight: 0 },
      { text: "I prefer being told", type: "other", weight: 0 }
    ]
  },

  // === TYPE 9: The Peacemaker / Mediator ===
  // Core motivation: to maintain peace, harmony, and avoid conflict
  { 
    q: "You go along with others to keep the peace, even if you have a different opinion.",
    options: [
      { text: "Yes, I avoid rocking the boat", type: 9, weight: 2 },
      { text: "I often accommodate", type: 9, weight: 1 },
      { text: "I express my views", type: null, weight: 0 },
      { text: "I prioritize my own needs", type: "other", weight: 0 }
    ]
  },
  { 
    q: "You have a calming presence and often mediate conflicts between others.",
    options: [
      { text: "Yes, I'm a natural mediator", type: 9, weight: 2 },
      { text: "I help create harmony", type: 9, weight: 1 },
      { text: "I stay out of conflicts", type: null, weight: 0 },
      { text: "I escalate conflicts", type: "other", weight: 0 }
    ]
  },
  { 
    q: "You sometimes numb out or distract yourself to avoid discomfort or tension.",
    options: [
      { text: "Yes, I use distractions", type: 9, weight: 2 },
      { text: "I tend to zone out", type: 9, weight: 1 },
      { text: "I face discomfort directly", type: null, weight: 0 },
      { text: "I'm very present", type: "other", weight: 0 }
    ]
  },
  { 
    q: "You have difficulty knowing your own wants and priorities because you focus on others.",
    options: [
      { text: "Yes, I neglect my own needs", type: 9, weight: 2 },
      { text: "Sometimes I lose myself", type: 9, weight: 1 },
      { text: "I know what I want", type: null, weight: 0 },
      { text: "I'm self-focused", type: "other", weight: 0 }
    ]
  },
  { 
    q: "You prefer a simple, comfortable, and predictable lifestyle.",
    options: [
      { text: "Yes, peace and ease are my goals", type: 9, weight: 2 },
      { text: "I like comfort", type: 9, weight: 1 },
      { text: "I need excitement", type: null, weight: 0 },
      { text: "I thrive on challenge", type: "other", weight: 0 }
    ]
  },
  { 
    q: "You tend to procrastinate on important tasks because you avoid pressure.",
    options: [
      { text: "Yes, I put things off", type: 9, weight: 2 },
      { text: "I delay sometimes", type: 9, weight: 1 },
      { text: "I'm proactive", type: null, weight: 0 },
      { text: "I work well under pressure", type: "other", weight: 0 }
    ]
  }
];

// Enneagram Type Descriptions with wings, arrows, and core traits
export const enneagramTypes = {
  1: {
    name: "The Reformer",
    arabicName: "المصلح",
    coreFear: "Being corrupt, evil, or defective",
    coreDesire: "To be good, have integrity, be balanced",
    strengths: ["Principled", "Purposeful", "Self-controlled", "Perfectionistic"],
    weaknesses: ["Resentful", "Non-adaptable", "Judgmental", "Obsessive"],
    wings: {
      "1w9": "The Idealist – more calm, detached, principled",
      "1w2": "The Advocate – more warm, helpful, activist"
    },
    arrowTo: 7,  // in growth: moves to 7 (spontaneous joy)
    arrowFrom: 4, // in stress: moves to 4 (melancholy)
    advice: "Allow yourself to make mistakes. Perfection is not the goal – progress is."
  },
  2: {
    name: "The Helper",
    arabicName: "المساعد",
    coreFear: "Being unloved, unwanted, or unworthy",
    coreDesire: "To be loved and appreciated",
    strengths: ["Generous", "Caring", "Empathetic", "Interpersonal"],
    weaknesses: ["Manipulative", "Possessive", "Prideful", "People-pleasing"],
    wings: {
      "2w1": "The Servant – more principled, perfectionist helper",
      "2w3": "The Host – more ambitious, image-conscious helper"
    },
    arrowTo: 4,  // growth: moves to 4 (self-care, authenticity)
    arrowFrom: 8, // stress: moves to 8 (aggressive, controlling)
    advice: "Learn to give to yourself as freely as you give to others. Set boundaries."
  },
  3: {
    name: "The Achiever",
    arabicName: "الناجح",
    coreFear: "Being worthless or unsuccessful",
    coreDesire: "To be valuable, admired, and successful",
    strengths: ["Adaptable", "Driven", "Efficient", "Goal-oriented"],
    weaknesses: ["Deceptive", "Workaholic", "Image-obsessed", "Competitive"],
    wings: {
      "3w2": "The Charmer – more sociable, helpful achiever",
      "3w4": "The Professional – more individualistic, authentic achiever"
    },
    arrowTo: 6,  // growth: moves to 6 (loyalty, cooperation)
    arrowFrom: 9, // stress: moves to 9 (disengagement, apathy)
    advice: "Your worth is not measured by your achievements. Rest is productive."
  },
  4: {
    name: "The Individualist",
    arabicName: "الفردي",
    coreFear: "Having no identity or significance",
    coreDesire: "To be unique, authentic, and find meaning",
    strengths: ["Creative", "Sensitive", "Authentic", "Expressive"],
    weaknesses: ["Melancholic", "Self-absorbed", "Envious", "Dramatic"],
    wings: {
      "4w3": "The Aristocrat – more ambitious, competitive individualist",
      "4w5": "The Bohemian – more withdrawn, intellectual individualist"
    },
    arrowTo: 1,  // growth: moves to 1 (principled action)
    arrowFrom: 2, // stress: moves to 2 (clingy, needy)
    advice: "You are not your feelings. Observe them without becoming them."
  },
  5: {
    name: "The Investigator",
    arabicName: "المحقق",
    coreFear: "Being incapable, useless, or overwhelmed",
    coreDesire: "To be capable and knowledgeable",
    strengths: ["Perceptive", "Innovative", "Focused", "Independent"],
    weaknesses: ["Isolated", "Nihilistic", "Detached", "Stingy with energy"],
    wings: {
      "5w4": "The Iconoclast – more creative, sensitive investigator",
      "5w6": "The Problem Solver – more loyal, analytical investigator"
    },
    arrowTo: 8,  // growth: moves to 8 (assertiveness, action)
    arrowFrom: 7, // stress: moves to 7 (scattered, hyperactive)
    advice: "Engage with the world. Knowledge without action is incomplete."
  },
  6: {
    name: "The Loyalist",
    arabicName: "المخلص",
    coreFear: "Being without support or guidance",
    coreDesire: "To have security and certainty",
    strengths: ["Engaging", "Responsible", "Trustworthy", "Good at troubleshooting"],
    weaknesses: ["Anxious", "Suspicious", "Indecisive", "Reactive"],
    wings: {
      "6w5": "The Defender – more analytical, cautious loyalist",
      "6w7": "The Buddy – more playful, friendly loyalist"
    },
    arrowTo: 9,  // growth: moves to 9 (peace, acceptance)
    arrowFrom: 3, // stress: moves to 3 (competitiveness, overwork)
    advice: "Your fears are not facts. Courage is acting despite uncertainty."
  },
  7: {
    name: "The Enthusiast",
    arabicName: "المتحمس",
    coreFear: "Being trapped in pain or boredom",
    coreDesire: "To be satisfied and have freedom",
    strengths: ["Spontaneous", "Versatile", "Optimistic", "Visionary"],
    weaknesses: ["Impulsive", "Self-centered", "Uncommitted", "Evasive"],
    wings: {
      "7w6": "The Entertainer – more loyal, anxious enthusiast",
      "7w8": "The Realist – more assertive, ambitious enthusiast"
    },
    arrowTo: 5,  // growth: moves to 5 (focus, depth)
    arrowFrom: 1, // stress: moves to 1 (critical, perfectionist)
    advice: "True freedom comes from embracing all emotions, not avoiding them."
  },
  8: {
    name: "The Challenger",
    arabicName: "المتحدي",
    coreFear: "Being harmed, controlled, or vulnerable",
    coreDesire: "To protect self and be in control",
    strengths: ["Decisive", "Self-confident", "Protective", "Leader-like"],
    weaknesses: ["Domineering", "Revengeful", "Excessive", "Vulnerability-phobic"],
    wings: {
      "8w7": "The Maverick – more energetic, entrepreneurial challenger",
      "8w9": "The Bear – more calm, peaceful challenger"
    },
    arrowTo: 2,  // growth: moves to 2 (caring, softness)
    arrowFrom: 5, // stress: moves to 5 (withdrawal, isolation)
    advice: "True strength includes vulnerability. Let others in."
  },
  9: {
    name: "The Peacemaker",
    arabicName: "صانع السلام",
    coreFear: "Loss, separation, or conflict",
    coreDesire: "To have inner stability and harmony",
    strengths: ["Accepting", "Trusting", "Mediating", "Easygoing"],
    weaknesses: ["Apathetic", "Neglectful", "Stubborn", "Self-forgetting"],
    wings: {
      "9w8": "The Referee – more assertive, grounded peacemaker",
      "9w1": "The Dreamer – more principled, idealistic peacemaker"
    },
    arrowTo: 3,  // growth: moves to 3 (assertiveness, engagement)
    arrowFrom: 6, // stress: moves to 6 (anxiety, worry)
    advice: "Your presence matters. Speak your truth – peace includes you."
  }
};

// Calculate dominant type and wings
export const calculateEnneagramType = (responses) => {
  // Max possible raw score per type: 6 questions * max weight 2 = 12
  const maxRawPerType = 12;
  const rawScores = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };

  responses.forEach(response => {
    if (response.type !== "other" && response.type !== null) {
      rawScores[response.type] += response.weight;
    }
  });

  // Normalize to 0-100 scale
  const normalizedScores = {};
  for (let t = 1; t <= 9; t++) {
    normalizedScores[t] = Math.round((rawScores[t] / maxRawPerType) * 100);
  }

  // Find primary type (highest score)
  let primaryType = 1;
  let highestScore = 0;
  for (let t = 1; t <= 9; t++) {
    if (normalizedScores[t] > highestScore) {
      highestScore = normalizedScores[t];
      primaryType = t;
    }
  }

  // Determine wing (adjacent type with higher score)
  const leftWing = primaryType === 1 ? 9 : primaryType - 1;
  const rightWing = primaryType === 9 ? 1 : primaryType + 1;
  const wing = normalizedScores[leftWing] >= normalizedScores[rightWing] ? leftWing : rightWing;
  const wingType = `${primaryType}w${wing}`;

  // Determine stress/growth arrows
  const stressArrow = enneagramTypes[primaryType].arrowFrom;
  const growthArrow = enneagramTypes[primaryType].arrowTo;

  // Level of health (simplified: based on score distribution)
  let healthLevel = "Average";
  if (highestScore > 75) {
    healthLevel = "Unhealthy (strong fixation)";
  } else if (highestScore < 40) {
    healthLevel = "Healthy (low fixation)";
  } else {
    healthLevel = "Average";
  }

  return {
    primaryType,
    primaryTypeName: enneagramTypes[primaryType].name,
    wing: wingType,
    wingDescription: enneagramTypes[primaryType].wings[wingType] || "",
    scores: normalizedScores,
    rawScores,
    stressArrow,
    growthArrow,
    healthLevel,
    description: enneagramTypes[primaryType]
  };
};

// Comprehensive interpretation including triads (Heart, Head, Gut)
export const interpretEnneagram = (result) => {
  const type = result.primaryType;
  const typeInfo = enneagramTypes[type];
  
  // Triads
  const triads = {
    1: "Gut / Anger Triad",
    2: "Heart / Feeling Triad",
    3: "Heart / Feeling Triad",
    4: "Heart / Feeling Triad",
    5: "Head / Fear Triad",
    6: "Head / Fear Triad",
    7: "Head / Fear Triad",
    8: "Gut / Anger Triad",
    9: "Gut / Anger Triad"
  };
  
  const hornevianGroups = {
    1: "Compliant (moving against)",
    2: "Compliant (moving toward)",
    3: "Assertive",
    4: "Withdrawn",
    5: "Withdrawn",
    6: "Compliant (moving toward)",
    7: "Assertive",
    8: "Assertive",
    9: "Withdrawn"
  };
  
  const harmonicGroups = {
    1: "Competency",
    2: "Positive Outlook",
    3: "Competency",
    4: "Reactive",
    5: "Competency",
    6: "Reactive",
    7: "Positive Outlook",
    8: "Reactive",
    9: "Positive Outlook"
  };
  
  return {
    type: type,
    name: typeInfo.name,
    arabicName: typeInfo.arabicName,
    coreFear: typeInfo.coreFear,
    coreDesire: typeInfo.coreDesire,
    strengths: typeInfo.strengths,
    weaknesses: typeInfo.weaknesses,
    wing: result.wing,
    wingDescription: result.wingDescription,
    triad: triads[type],
    hornevianGroup: hornevianGroups[type],
    harmonicGroup: harmonicGroups[type],
    growthArrow: `In growth, move toward Type ${result.growthArrow}: ${enneagramTypes[result.growthArrow].name}`,
    stressArrow: `In stress, move toward Type ${result.stressArrow}: ${enneagramTypes[result.stressArrow].name}`,
    advice: typeInfo.advice,
    healthLevel: result.healthLevel
  };
};

// Export default
export default { enneagramQuestionPool, enneagramTypes, calculateEnneagramType, interpretEnneagram };
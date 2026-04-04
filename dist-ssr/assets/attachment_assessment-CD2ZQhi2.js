const attachmentQuestionPool = [
  // === SECURE (S) - Comfortable with intimacy, trusts others, balanced ===
  {
    q: "I find it easy to get close to others and depend on them.",
    dimension: "S",
    facet: "Comfort with Closeness",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },
  {
    q: "I am comfortable relying on my partner when I need support.",
    dimension: "S",
    facet: "Trust in Others",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },
  {
    q: "I feel worthy of love and affection from others.",
    dimension: "S",
    facet: "Self-Worth",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },
  {
    q: "I can be alone without feeling anxious or abandoned.",
    dimension: "S",
    facet: "Emotional Autonomy",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },
  {
    q: "When conflicts arise, I can express my feelings without fear.",
    dimension: "S",
    facet: "Conflict Navigation",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },
  {
    q: "I believe that most people are fundamentally good and trustworthy.",
    dimension: "S",
    facet: "Positive Worldview",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },
  {
    q: "I am able to ask for help when I need it without feeling ashamed.",
    dimension: "S",
    facet: "Help-Seeking",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },
  {
    q: "My past relationships have generally been positive and stable.",
    dimension: "S",
    facet: "Relational History",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },
  {
    q: "I feel secure even when my partner is not immediately available.",
    dimension: "S",
    facet: "Object Constancy",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },
  {
    q: "I can forgive my partner after a disagreement and move forward.",
    dimension: "S",
    facet: "Forgiveness",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },
  // === ANXIOUS (A) - Fear of abandonment, high need for reassurance, clingy ===
  {
    q: "I worry that my partner will stop loving me or leave me.",
    dimension: "A",
    facet: "Fear of Abandonment",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },
  {
    q: "I need constant reassurance that I am loved and valued.",
    dimension: "A",
    facet: "Reassurance Seeking",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },
  {
    q: "I feel jealous or possessive in romantic relationships.",
    dimension: "A",
    facet: "Jealousy",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },
  {
    q: "I often feel that my partner doesn't care as much as I do.",
    dimension: "A",
    facet: "Perceived Imbalance",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },
  {
    q: "I become anxious when my partner spends time with friends without me.",
    dimension: "A",
    facet: "Separation Anxiety",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },
  {
    q: "I tend to overthink my partner's words and actions for hidden meanings.",
    dimension: "A",
    facet: "Hypervigilance",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },
  {
    q: "I fear that I am not 'enough' for my partner to stay.",
    dimension: "A",
    facet: "Inadequacy",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },
  {
    q: "When my partner is distant, I try harder to get their attention.",
    dimension: "A",
    facet: "Protest Behavior",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },
  {
    q: "I feel a strong need for constant contact (texts, calls, presence).",
    dimension: "A",
    facet: "Contact Seeking",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },
  {
    q: "Breakups feel devastating and I struggle to recover for a long time.",
    dimension: "A",
    facet: "Breakup Sensitivity",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },
  // === AVOIDANT (V) - Discomfort with closeness, values independence, dismissive ===
  {
    q: "I prefer not to rely on others and don't want them to rely on me.",
    dimension: "V",
    facet: "Counter-Dependence",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },
  {
    q: "I feel trapped or suffocated by emotional intimacy.",
    dimension: "V",
    facet: "Intimacy Avoidance",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },
  {
    q: "I am uncomfortable sharing my deepest feelings, even with a partner.",
    dimension: "V",
    facet: "Emotional Withholding",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },
  {
    q: "I value my independence more than being in a relationship.",
    dimension: "V",
    facet: "Autonomy Priority",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },
  {
    q: "When my partner gets too close, I pull away or create distance.",
    dimension: "V",
    facet: "Deactivating Strategies",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },
  {
    q: "I prefer casual relationships over serious commitments.",
    dimension: "V",
    facet: "Commitment Avoidance",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },
  {
    q: "I rarely miss my partner when we are apart.",
    dimension: "V",
    facet: "Emotional Detachment",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },
  {
    q: "I think people who need emotional support are weak.",
    dimension: "V",
    facet: "Dismissive Beliefs",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },
  {
    q: "I avoid talking about the future of my relationships.",
    dimension: "V",
    facet: "Future Avoidance",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },
  {
    q: "I am more comfortable being alone than dealing with relationship drama.",
    dimension: "V",
    facet: "Solitude Preference",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },
  // === FEARFUL (F) - Disorganized, wants closeness but fears it, trauma history ===
  {
    q: "I want intimacy but I am afraid to get too close.",
    dimension: "F",
    facet: "Approach-Avoidance",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },
  {
    q: "I have been hurt badly in past relationships and fear it happening again.",
    dimension: "F",
    facet: "Relational Trauma",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },
  {
    q: "My emotions in relationships feel chaotic and unpredictable.",
    dimension: "F",
    facet: "Emotional Dysregulation",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },
  {
    q: "I sometimes feel that my partner will hurt me, even without reason.",
    dimension: "F",
    facet: "Mistrust",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },
  {
    q: "I crave love but push people away when they get close.",
    dimension: "F",
    facet: "Push-Pull Dynamic",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },
  {
    q: "I often feel confused about what I want in a relationship.",
    dimension: "F",
    facet: "Ambivalence",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },
  {
    q: "My mood toward my partner can swing from loving to angry very quickly.",
    dimension: "F",
    facet: "Mood Lability",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },
  {
    q: "I have experienced abuse or neglect in childhood or past relationships.",
    dimension: "F",
    facet: "Developmental Trauma",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },
  {
    q: "I worry that if I let someone in, they will leave me eventually.",
    dimension: "F",
    facet: "Fear of Abandonment (Complex)",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  },
  {
    q: "I sometimes freeze or dissociate during relationship conflicts.",
    dimension: "F",
    facet: "Disorganized Response",
    options: [
      { text: "Strongly Disagree", score: 1 },
      { text: "Disagree", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Agree", score: 4 },
      { text: "Strongly Agree", score: 5 }
    ]
  }
];
export {
  attachmentQuestionPool as a
};

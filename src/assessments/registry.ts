export type AssessmentId =
  | "iq"
  | "mbti"
  | "big-five"
  | "disc"
  | "enneagram"
  | "holland"
  | "eq"
  | "love-languages"
  | "attachment";

export type Assessment = {
  id: AssessmentId;
  name: string;
  emoji: string;
};

export const assessments: Assessment[] = [
  { id: "iq", name: "IQ Test", emoji: "🧠" },
  { id: "mbti", name: "MBTI", emoji: "🔥" },
  { id: "big-five", name: "Big Five", emoji: "🌊" },
  { id: "disc", name: "DISC", emoji: "💼" },
  { id: "enneagram", name: "Enneagram", emoji: "🔢" },
  { id: "holland", name: "Holland Code", emoji: "🎓" },
  { id: "eq", name: "EQ (Emotional Intelligence)", emoji: "💛" },
  { id: "love-languages", name: "Love Languages", emoji: "💞" },
  { id: "attachment", name: "Attachment", emoji: "🧷" },
];

export function getAssessmentById(id: string): Assessment | null {
  return assessments.find((a) => a.id === id) ?? null;
}

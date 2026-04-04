declare module "../../Qwen_javascript_20251107_fa17bdxqj.js" {
  export type Question = {
    q: string;
    a: string;
    opts: string[];
    difficulty: number;
    category: string;
  };

  export const questionPool: Question[];
  const _default: Question[];
  export default _default;
}

declare module "../../questionPool_professional.js" {
  export type Question = {
    q: string;
    a: string;
    opts: string[];
    difficulty: number;
    category: string;
  };

  export const questionPool: Question[];
  const _default: Question[];
  export default _default;
}

declare module "../../mbti_assessment.js" {
  export type MbtiQuestionPoolItem = {
    q: string;
    dimension: "EI" | "SN" | "TF" | "JP";
    options: Array<{
      text: string;
      type: "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";
      weight?: number;
    }>;
  };

  export const mbtiQuestionPool: MbtiQuestionPoolItem[];
  const _default: MbtiQuestionPoolItem[];
  export default _default;
}

declare module "../../DISC_assessment.js" {
  export type DiscQuestionPoolItem = {
    q: string;
    options: Array<{
      text: string;
      type: "D" | "I" | "S" | "C";
      weight?: number;
    }>;
  };

  export const discQuestionPool: DiscQuestionPoolItem[];
  const _default: DiscQuestionPoolItem[];
  export default _default;
}

declare module "../../holland_assessment.js" {
  export type HollandQuestionPoolItem = {
    q: string;
    options: Array<{
      text: string;
      type: "R" | "I" | "A" | "S" | "E" | "C" | "other" | null;
      weight: number;
    }>;
  };

  export const hollandQuestionPool: HollandQuestionPoolItem[];
  const _default: HollandQuestionPoolItem[];
  export default _default;
}

declare module "../../enneagram_assessment.js" {
  export type EnneagramQuestionPoolItem = {
    q: string;
    options: Array<{
      text: string;
      type: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | "other" | null;
      weight: number;
    }>;
  };

  export const enneagramQuestionPool: EnneagramQuestionPoolItem[];
  const _default: EnneagramQuestionPoolItem[];
  export default _default;
}

declare module "../../eq_assessment.js" {
  export type EqQuestionPoolItem = {
    q: string;
    dimension: "SA" | "SR" | "MO" | "EM" | "SS";
    facet: string;
    options: Array<{
      text: string;
      score: 1 | 2 | 3 | 4 | 5;
    }>;
  };

  export const eqQuestionPool: EqQuestionPoolItem[];
  const _default: EqQuestionPoolItem[];
  export default _default;
}

declare module "../../attachment_assessment.js" {
  export type AttachmentQuestionPoolItem = {
    q: string;
    dimension: "S" | "A" | "V" | "F";
    facet: string;
    options: Array<{
      text: string;
      score: 1 | 2 | 3 | 4 | 5;
    }>;
  };

  export const attachmentQuestionPool: AttachmentQuestionPoolItem[];
  const _default: AttachmentQuestionPoolItem[];
  export default _default;
}

declare module "../../../questionPool_professional.js" {
  export type Question = {
    q: string;
    a: string;
    opts: string[];
    difficulty: number;
    category: string;
  };

  export const questionPool: Question[];
  const _default: Question[];
  export default _default;
}

declare module "../../../mbti_assessment.js" {
  export type MbtiQuestionPoolItem = {
    q: string;
    dimension: "EI" | "SN" | "TF" | "JP";
    options: Array<{
      text: string;
      type: "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";
      weight?: number;
    }>;
  };

  export const mbtiQuestionPool: MbtiQuestionPoolItem[];
  const _default: MbtiQuestionPoolItem[];
  export default _default;
}

declare module "../../../DISC_assessment.js" {
  export type DiscQuestionPoolItem = {
    q: string;
    options: Array<{
      text: string;
      type: "D" | "I" | "S" | "C";
      weight?: number;
    }>;
  };

  export const discQuestionPool: DiscQuestionPoolItem[];
  const _default: DiscQuestionPoolItem[];
  export default _default;
}

declare module "../../../holland_assessment.js" {
  export type HollandQuestionPoolItem = {
    q: string;
    options: Array<{
      text: string;
      type: "R" | "I" | "A" | "S" | "E" | "C" | "other" | null;
      weight: number;
    }>;
  };

  export const hollandQuestionPool: HollandQuestionPoolItem[];
  const _default: HollandQuestionPoolItem[];
  export default _default;
}

declare module "../../../enneagram_assessment.js" {
  export type EnneagramQuestionPoolItem = {
    q: string;
    options: Array<{
      text: string;
      type: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | "other" | null;
      weight: number;
    }>;
  };

  export const enneagramQuestionPool: EnneagramQuestionPoolItem[];
  const _default: EnneagramQuestionPoolItem[];
  export default _default;
}

declare module "../../../eq_assessment.js" {
  export type EqQuestionPoolItem = {
    q: string;
    dimension: "SA" | "SR" | "MO" | "EM" | "SS";
    facet: string;
    options: Array<{
      text: string;
      score: 1 | 2 | 3 | 4 | 5;
    }>;
  };

  export const eqQuestionPool: EqQuestionPoolItem[];
  const _default: EqQuestionPoolItem[];
  export default _default;
}

declare module "../../../attachment_assessment.js" {
  export type AttachmentQuestionPoolItem = {
    q: string;
    dimension: "S" | "A" | "V" | "F";
    facet: string;
    options: Array<{
      text: string;
      score: 1 | 2 | 3 | 4 | 5;
    }>;
  };

  export const attachmentQuestionPool: AttachmentQuestionPoolItem[];
  const _default: AttachmentQuestionPoolItem[];
  export default _default;
}

export type QuestionBankId = "iq" | "mbti" | "disc" | "holland" | "enneagram" | "eq" | "attachment";

type BankModule = { default: unknown };

const modules = import.meta.glob<BankModule>("./*/*.js");

export async function loadQuestionBank(locale: string, bankId: QuestionBankId): Promise<unknown> {
  const normalizedLocale = locale || "en";
  const key = `./${normalizedLocale}/${bankId}.js`;
  const fallbackKey = `./en/${bankId}.js`;

  const loader = modules[key] ?? modules[fallbackKey];
  if (!loader) throw new Error(`Question bank not found: ${key} (fallback: ${fallbackKey})`);

  const mod = await loader();
  return mod.default;
}

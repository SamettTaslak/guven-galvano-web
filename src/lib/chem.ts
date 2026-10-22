const SUB: Record<string, string> = { '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄', '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉' }

/**
 * Formüldeki atom sayılarını alt simgeye çevirir: "NiSO4·6H2O" → "NiSO₄·6H₂O".
 * Yalnızca harf veya kapanış parantezinden sonra gelen rakamlar dönüştürülür; "·6H₂O"daki katsayı korunur.
 */
export const formatFormula = (formula: string): string =>
  formula.replace(/(?<=[A-Za-z)\]])\d+/g, (digits) => digits.replace(/\d/g, (d) => SUB[d]))

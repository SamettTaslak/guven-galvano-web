/**
 * Panel parola kuralı (NIST SP 800-63B esinli): uzunluk öncelikli, en az 3 karakter türü,
 * yaygın/tahmin edilebilir parolalar ve e-postanın kendisi yasak. Proxy (edge) ve sunucu tarafında ortaktır.
 */
export const PASSWORD_MIN_LENGTH = 12

const COMMON = [
  'password', 'parola', 'sifre', 'şifre', '123456', 'qwerty', 'admin', 'yonetici', 'yönetici',
  'galvano', 'guven', 'güven', 'kimya', 'welcome', 'letmein', 'iloveyou', 'abc123', '111111',
]

export function checkPassword(password: unknown, email?: string | null): string | null {
  if (typeof password !== 'string' || !password) return 'Parola zorunludur.'
  if (password.length < PASSWORD_MIN_LENGTH) return `Parola en az ${PASSWORD_MIN_LENGTH} karakter olmalıdır.`
  if (password.length > 128) return 'Parola en fazla 128 karakter olabilir.'

  const classes = [/[a-zçğıöşü]/, /[A-ZÇĞİÖŞÜ]/, /\d/, /[^\p{L}\d]/u].filter((re) => re.test(password)).length
  if (classes < 3) return 'Parola şu 4 türden en az 3’ünü içermelidir: küçük harf, büyük harf, rakam, sembol.'

  const lower = password.toLocaleLowerCase('tr')
  if (/(.)\1{3,}/.test(password)) return 'Parola aynı karakteri 4 kez üst üste içeremez.'
  if (COMMON.some((w) => lower.includes(w))) return 'Parola yaygın veya firmayla ilgili tahmin edilebilir bir kelime içeriyor (ör. "galvano", "admin", "123456").'
  const local = email?.split('@')[0]?.toLocaleLowerCase('tr')
  if (local && local.length >= 4 && lower.includes(local)) return 'Parola e-posta adınızı içeremez.'
  return null
}

export const EMAIL_REGEXP = /^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/;
export const PHONE_REGEXP = /^1[3456789]\d{9}$/;

export function isValidEmail(email: string): boolean {
  return EMAIL_REGEXP.test(email);
}
export function isValidPhone(phone: string): boolean {
  return PHONE_REGEXP.test(phone);
}

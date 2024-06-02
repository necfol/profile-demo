export const EMAIL_REGEXP = /^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/;
export const PHONE_REGEXP = /^1[3456789]\d{9}$/;

export const cx = (...classNames: (string | boolean)[]) => classNames.filter(Boolean).join(' ');

export const getFirstChar = (str: string): string => {
  if (!str) {
    return '';
  }
  return str.charAt(0);
};

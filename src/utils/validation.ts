export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): { isValid: boolean; message?: string } => {
  if (password.length < 8) {
    return { isValid: false, message: 'Password must be at least 8 characters long' };
  }

  if (!/(?=.*[a-z])(?=.*[A-Z])/.test(password)) {
    return { isValid: false, message: 'Password must contain both uppercase and lowercase letters' };
  }

  if (!/(?=.*\d)/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one number' };
  }

  return { isValid: true };
};

export const validateUrl = (url: string): boolean => {
  if (!url) return true; // Optional field

  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Input validation utilities for JanSeva forms
 */

export function validateEmail(email) {
  if (!email) return 'Email is required';
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(email)) return 'Please enter a valid email address';
  return null;
}

export function validatePassword(password) {
  if (!password) return 'Password is required';
  if (password.length < 6) return 'Password must be at least 6 characters long';
  return null;
}

export function validateAge(age) {
  if (age === undefined || age === null || age === '') return null; // voluntary unless checked
  const num = Number(age);
  if (isNaN(num) || num < 0 || num > 125) {
    return 'Please enter a valid age between 0 and 125';
  }
  return null;
}

export function validateIncome(income) {
  if (income === undefined || income === null || income === '') return null;
  const num = Number(income);
  if (isNaN(num) || num < 0) {
    return 'Please enter a valid non-negative income amount';
  }
  return null;
}

export function validateUrl(url) {
  if (!url) return null;
  try {
    new URL(url);
    return null;
  } catch {
    return 'Please enter a valid URL (e.g. https://example.gov.in)';
  }
}

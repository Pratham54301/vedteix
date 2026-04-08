const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeString(value, { max = 5000, fallback = '' } = {}) {
  if (typeof value !== 'string') {
    return fallback;
  }

  return value.trim().slice(0, max);
}

function isNonEmptyString(value, { min = 1, max = 5000 } = {}) {
  return typeof value === 'string' && value.trim().length >= min && value.trim().length <= max;
}

function isValidEmail(email) {
  return typeof email === 'string' && EMAIL_REGEX.test(email.trim()) && email.trim().length <= 254;
}

function isValidUrl(value) {
  if (typeof value !== 'string' || value.trim().length === 0) {
    return false;
  }

  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch (error) {
    return false;
  }
}

function isValidPhone(value) {
  if (typeof value !== 'string') {
    return false;
  }

  const normalized = value.replace(/[^\d+]/g, '');
  return normalized.length >= 7 && normalized.length <= 16;
}

function normalizeStringArray(value, { maxItemLength = 120 } = {}) {
  const items = Array.isArray(value)
    ? value
    : typeof value === 'string'
      ? value.split(',')
      : [];

  return [...new Set(
    items
      .map((item) => normalizeString(item, { max: maxItemLength }))
      .filter(Boolean)
  )];
}

function toBoolean(value) {
  return value === true || value === 'true' || value === 1 || value === '1';
}

module.exports = {
  isNonEmptyString,
  isValidEmail,
  isValidPhone,
  isValidUrl,
  normalizeString,
  normalizeStringArray,
  toBoolean,
};

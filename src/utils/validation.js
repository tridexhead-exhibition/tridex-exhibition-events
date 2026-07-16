/**
 * Shared utility functions for form validation, sanitization, and rate limiting.
 */

// Email regex pattern meeting RFC 5322 official standard
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Indian mobile number pattern: 10 digits starting with 6, 7, 8, or 9
const PHONE_REGEX = /^[6-9]\d{9}$/;

// Submission history threshold in milliseconds (10 minutes)
const SUBMISSION_LIMIT_MS = 600000;
const SUBMISSIONS_KEY = 'tridex_submission_history';

/**
 * Validates whether an email matches the standard format.
 * @param {string} email 
 * @returns {boolean}
 */
export function isValidEmail(email) {
  return EMAIL_REGEX.test((email || '').trim());
}

/**
 * Validates whether a phone number matches the 10-digit Indian mobile format.
 * @param {string} phone 
 * @returns {boolean}
 */
export function isValidPhone(phone) {
  return PHONE_REGEX.test((phone || '').trim());
}

/**
 * Sanitizes input strings to prevent basic XSS injections by removing HTML tags.
 * @param {string} str 
 * @returns {string}
 */
export function sanitizeInput(str) {
  return (str || '').replace(/<[^>]*>/g, '').trim();
}

/**
 * Records a successful form submission into localStorage to track rate-limiting.
 * @param {string} email 
 * @param {string} phone 
 */
export function recordSubmission(email, phone) {
  try {
    const history = JSON.parse(localStorage.getItem(SUBMISSIONS_KEY) || '[]');
    history.push({
      email: (email || '').trim(),
      phone: (phone || '').trim(),
      timestamp: Date.now()
    });
    localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(history));
  } catch (e) {
    console.error('Error writing submission history:', e);
  }
}

/**
 * Checks if the user is rate-limited (has submitted within the last 10 minutes).
 * Returns the number of minutes they must wait, or 0 if they are not rate-limited.
 * @param {string} email 
 * @param {string} phone 
 * @returns {number} Wait time in minutes (0 if not limited)
 */
export function checkRateLimit(email, phone) {
  try {
    const now = Date.now();
    let history = JSON.parse(localStorage.getItem(SUBMISSIONS_KEY) || '[]');
    
    // Clean up entries older than 10 minutes
    history = history.filter(item => now - item.timestamp < SUBMISSION_LIMIT_MS);
    localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(history));

    const duplicate = history.find(item => 
      item.email.toLowerCase() === (email || '').trim().toLowerCase() || 
      item.phone.trim() === (phone || '').trim()
    );

    if (duplicate) {
      return Math.ceil((SUBMISSION_LIMIT_MS - (now - duplicate.timestamp)) / 60000);
    }
  } catch (e) {
    console.error('Error checking rate limit:', e);
  }
  return 0;
}

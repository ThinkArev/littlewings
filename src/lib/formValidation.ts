/**
 * Form validation utilities with security measures
 */

/**
 * Validates email format
 */
export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
};

/**
 * Validates Indian mobile number
 * Must be 10 digits and start with 6, 7, 8, or 9
 */
export const validateIndianMobile = (mobile: string): boolean => {
    // Remove spaces, dashes, and +91 prefix
    const cleaned = mobile.replace(/[\s\-+]/g, '');

    // Check for +91 prefix and remove it
    const numberWithoutPrefix = cleaned.startsWith('91') && cleaned.length === 12
        ? cleaned.substring(2)
        : cleaned;

    // Must be exactly 10 digits and start with 6, 7, 8, or 9
    const mobileRegex = /^[6-9]\d{9}$/;
    return mobileRegex.test(numberWithoutPrefix);
};

/**
 * Sanitizes text input to prevent XSS attacks
 * Removes potentially dangerous HTML/script tags and special characters
 */
export const sanitizeInput = (input: string): string => {
    if (!input) return '';

    return input
        // Remove HTML tags
        .replace(/<[^>]*>/g, '')
        // Remove script tags even if partially formed
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        // Remove event handlers like onclick, onerror, etc.
        .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
        // Remove javascript: protocol
        .replace(/javascript:/gi, '')
        // Remove data: protocol (can be used for XSS)
        .replace(/data:text\/html/gi, '')
        // Trim whitespace
        .trim();
};

/**
 * Validates textarea content for SQL injection patterns and XSS
 */
export const validateTextarea = (text: string): { isValid: boolean; message: string } => {
    if (!text || text.trim().length === 0) {
        return { isValid: false, message: 'This field is required' };
    }

    // Check for SQL injection patterns
    const sqlPatterns = [
        /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE)\b)/gi,
        /(--|\#|\/\*|\*\/)/g,  // SQL comments
        /('\s*(OR|AND)\s*'?\d)/gi,  // Classic SQL injection
        /(\bUNION\b.*\bSELECT\b)/gi,
    ];

    for (const pattern of sqlPatterns) {
        if (pattern.test(text)) {
            return { isValid: false, message: 'Invalid characters detected. Please remove SQL-like syntax.' };
        }
    }

    // Check for suspicious script patterns
    const scriptPatterns = [
        /<script/gi,
        /javascript:/gi,
        /onerror\s*=/gi,
        /onclick\s*=/gi,
        /onload\s*=/gi,
        /<iframe/gi,
    ];

    for (const pattern of scriptPatterns) {
        if (pattern.test(text)) {
            return { isValid: false, message: 'Invalid characters detected. Please remove HTML/script tags.' };
        }
    }

    const sanitized = sanitizeInput(text);
    if (sanitized.length < 10) {
        return { isValid: false, message: 'Message must be at least 10 characters long' };
    }

    if (sanitized.length > 1000) {
        return { isValid: false, message: 'Message must not exceed 1000 characters' };
    }

    return { isValid: true, message: '' };
};

/**
 * Validates name field (no numbers or special characters except spaces, hyphens, and apostrophes)
 */
export const validateName = (name: string): boolean => {
    if (!name || name.trim().length < 2) return false;

    // Allow letters, spaces, hyphens, and apostrophes only
    const nameRegex = /^[a-zA-Z\s\-']+$/;
    return nameRegex.test(name.trim());
};

/**
 * Format Indian mobile number for display
 * Converts 9876543210 to +91 98765 43210
 */
export const formatIndianMobile = (mobile: string): string => {
    const cleaned = mobile.replace(/[\s\-+]/g, '');
    const numberWithoutPrefix = cleaned.startsWith('91') && cleaned.length === 12
        ? cleaned.substring(2)
        : cleaned;

    if (numberWithoutPrefix.length === 10) {
        return `+91 ${numberWithoutPrefix.substring(0, 5)} ${numberWithoutPrefix.substring(5)}`;
    }

    return mobile;
};

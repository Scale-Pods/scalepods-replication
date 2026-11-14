/**
 * Robust Email and Phone Validation for ScalePods Webinar Registration
 */

export interface ValidationResult {
  valid: boolean;
  error?: string;
  formatted?: string;
}

// Common dummy/fake test emails to block
const BLOCKED_DUMMY_EMAILS = new Set([
  "test@test.com",
  "admin@admin.com",
  "a@a.com",
  "xyz@xyz.com",
  "abc@abc.com",
  "demo@demo.com",
  "temp@temp.com",
  "fake@fake.com",
  "123@123.com",
  "user@example.com",
  "test@example.com",
]);

// Common fake Indian mobile patterns
const BLOCKED_DUMMY_PHONES = new Set([
  "1234567890",
  "0123456789",
  "9876543210",
  "0987654321",
  "0000000000",
  "1111111111",
  "2222222222",
  "3333333333",
  "4444444444",
  "5555555555",
  "6666666666",
  "7777777777",
  "8888888888",
  "9999999999",
  "1212121212",
  "9898989898",
  "9999988888",
  "8888899999",
]);

export function validateEmail(email: string): ValidationResult {
  const trimmed = (email || "").trim().toLowerCase();

  if (!trimmed) {
    return { valid: false, error: "Work email is required." };
  }

  // Strict RFC-compliant email regex
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(trimmed)) {
    return {
      valid: false,
      error: "Please enter a valid email address (e.g. name@company.com).",
    };
  }

  // Block obvious dummy emails
  if (BLOCKED_DUMMY_EMAILS.has(trimmed)) {
    return {
      valid: false,
      error: "Please enter your genuine active work or personal email.",
    };
  }

  const parts = trimmed.split("@");
  if (parts.length !== 2) {
    return { valid: false, error: "Please enter a valid email address." };
  }

  const [local, domain] = parts;
  if (local.length < 2) {
    return { valid: false, error: "Email username is too short." };
  }

  if (!domain.includes(".") || domain.startsWith(".") || domain.endsWith(".")) {
    return { valid: false, error: "Please enter a valid email domain." };
  }

  return { valid: true, formatted: trimmed };
}

export function validatePhone(
  phone: string,
  countryCode: string = "+91",
  customCode: string = ""
): ValidationResult {
  const rawInput = (phone || "").trim();
  if (!rawInput) {
    return { valid: false, error: "WhatsApp phone number is required." };
  }

  // Extract pure digits
  let digits = rawInput.replace(/\D/g, "");

  // Determine active dial code
  let dial = countryCode;
  if (countryCode === "Custom") {
    dial = customCode.trim()
      ? customCode.trim().startsWith("+")
        ? customCode.trim()
        : `+${customCode.trim()}`
      : "+91";
  }

  const isIndia = dial === "+91" || dial === "91";

  if (isIndia) {
    // If the user included +91 or 91 in the input field itself, strip it
    if (digits.length === 12 && digits.startsWith("91")) {
      digits = digits.slice(2);
    } else if (digits.length === 11 && digits.startsWith("0")) {
      // Strip leading trunk prefix 0
      digits = digits.slice(1);
    }

    // Must be exactly 10 digits
    if (digits.length !== 10) {
      return {
        valid: false,
        error: `Indian mobile number must be 10 digits (currently ${digits.length} digits).`,
      };
    }

    // TRAI standard: Indian mobile numbers must start with 6, 7, 8, or 9
    const firstDigit = digits.charAt(0);
    if (!["6", "7", "8", "9"].includes(firstDigit)) {
      return {
        valid: false,
        error: "Indian mobile numbers must start with 6, 7, 8, or 9.",
      };
    }

    // Check dummy sequences and repeated digits
    if (BLOCKED_DUMMY_PHONES.has(digits)) {
      return {
        valid: false,
        error: "Please enter your genuine 10-digit WhatsApp phone number.",
      };
    }

    // Check for 6 or more identical consecutive digits (e.g., 9888888812)
    if (/(\d)\1{5,}/.test(digits)) {
      return {
        valid: false,
        error: "Please enter a valid active mobile number.",
      };
    }

    return {
      valid: true,
      formatted: `+91 ${digits}`,
    };
  }

  // International phone numbers (E.164: 7 to 15 digits)
  if (digits.length < 7 || digits.length > 15) {
    return {
      valid: false,
      error: `Phone number must be between 7 and 15 digits (currently ${digits.length}).`,
    };
  }

  // Reject all identical digits (e.g. 11111111)
  if (/^(\d)\1+$/.test(digits)) {
    return {
      valid: false,
      error: "Please enter a valid mobile number.",
    };
  }

  return {
    valid: true,
    formatted: `${dial} ${digits}`,
  };
}

export function validateFullName(name: string): ValidationResult {
  const trimmed = (name || "").trim();
  if (!trimmed) {
    return { valid: false, error: "Full name is required." };
  }
  if (trimmed.length < 2) {
    return { valid: false, error: "Please enter your full name." };
  }
  // Disallow pure numeric or punctuation names
  if (/^[\d\W]+$/.test(trimmed)) {
    return { valid: false, error: "Please enter a valid full name." };
  }
  return { valid: true, formatted: trimmed };
}


export function validateCompanyName(company: string): ValidationResult {
  const trimmed = (company || "").trim();
  if (!trimmed) {
    return { valid: false, error: "Company name is required." };
  }
  if (trimmed.length < 2) {
    return { valid: false, error: "Please enter your company or business name." };
  }
  if (/^[\d\W]+$/.test(trimmed)) {
    return { valid: false, error: "Please enter a valid company name." };
  }
  return { valid: true, formatted: trimmed };
}

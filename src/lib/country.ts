import { useEffect } from "react";

export function getDetectedCountryCode(): string {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz) {
      const lowerTz = tz.toLowerCase();
      if (lowerTz.includes("kolkata") || lowerTz.includes("calcutta") || lowerTz.includes("india")) {
        return "+91";
      }
      if (lowerTz.includes("dubai") || lowerTz.includes("abu_dhabi") || lowerTz.includes("muscat")) {
        return "+971";
      }
      if (lowerTz.includes("london") || lowerTz.includes("europe/london")) {
        return "+44";
      }
      if (lowerTz.includes("america/") || lowerTz.includes("us/") || lowerTz.includes("canada")) {
        return "+1";
      }
      if (lowerTz.includes("singapore")) {
        return "+65";
      }
      if (lowerTz.includes("sydney") || lowerTz.includes("melbourne") || lowerTz.includes("australia")) {
        return "+61";
      }
      if (lowerTz.includes("tokyo") || lowerTz.includes("asia/tokyo")) {
        return "+81";
      }
      if (lowerTz.includes("paris") || lowerTz.includes("europe/paris")) {
        return "+33";
      }
      if (lowerTz.includes("berlin") || lowerTz.includes("europe/berlin")) {
        return "+49";
      }
      if (lowerTz.includes("riyadh") || lowerTz.includes("asia/riyadh")) {
        return "+966";
      }
      if (lowerTz.includes("doha") || lowerTz.includes("asia/doha")) {
        return "+974";
      }
    }
  } catch (e) {
    // Ignore timezone detection errors
  }
  // Default fallback is +91 (India)
  return "+91";
}

export function useCountryDetection(
  countries: { name: string; code: string; flag: string }[],
  setCountryCode: (code: string) => void,
  setCustomCode?: (code: string) => void
) {
  useEffect(() => {
    // 1. Timezone check (Immediate synchronous guess)
    const tzGuess = getDetectedCountryCode();
    const matchTz = countries.find(c => c.code === tzGuess);
    if (matchTz) {
      setCountryCode(tzGuess);
    } else if (setCustomCode) {
      setCountryCode("Custom");
      setCustomCode(tzGuess);
    }

    // 2. Fetch API for precise IP location (Non-blocking async query)
    let isMounted = true;
    fetch("https://ipapi.co/json/")
      .then(res => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then(data => {
        if (isMounted && data && data.country_calling_code) {
          const rawCode = data.country_calling_code;
          const code = rawCode.startsWith("+") ? rawCode : `+${rawCode}`;
          const matchGeo = countries.find(c => c.code === code);
          if (matchGeo) {
            setCountryCode(code);
          } else if (setCustomCode) {
            setCountryCode("Custom");
            setCustomCode(code);
          }
        }
      })
      .catch(() => {
        // Fallback silently if blocked or failed
      });

    return () => {
      isMounted = false;
    };
  }, [countries, setCountryCode, setCustomCode]);
}

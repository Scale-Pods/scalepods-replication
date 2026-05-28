import { ClarityProvider } from "./providers/clarity";
import { GSCProvider } from "./providers/gsc";
import { AnalyticsProvider } from "@/types/analytics";

// GA4 and GSC use their own data shapes — imported directly in their routes/pages.
// Only Clarity conforms to the legacy AnalyticsProvider interface.
export const providers: Record<string, AnalyticsProvider> = {
  clarity: ClarityProvider,
  gsc: GSCProvider,
};

export { ClarityProvider };
export { GA4Provider } from "./providers/ga4";

export function getProvider(name: string): AnalyticsProvider {
  const provider = providers[name.toLowerCase()];
  if (!provider) {
    throw new Error(`Unknown analytics provider: ${name}`);
  }
  return provider;
}

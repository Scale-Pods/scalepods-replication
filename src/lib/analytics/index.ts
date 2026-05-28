import { ClarityProvider } from "./providers/clarity";
import { GA4Provider } from "./providers/ga4";
import { GSCProvider } from "./providers/gsc";
import { AnalyticsProvider } from "@/types/analytics";

export const providers: Record<string, AnalyticsProvider> = {
  clarity: ClarityProvider,
  ga4: GA4Provider,
  gsc: GSCProvider,
};

export function getProvider(name: string): AnalyticsProvider {
  const provider = providers[name.toLowerCase()];
  if (!provider) {
    throw new Error(`Unknown analytics provider: ${name}`);
  }
  return provider;
}

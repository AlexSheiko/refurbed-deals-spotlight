import type { FeatureFlags } from "./data/remoteConfigClient";
import { fetchFlag } from "./data/remoteConfigClient";

export function getFlag<K extends keyof FeatureFlags>(key: K): FeatureFlags[K] {
  return fetchFlag(key);
}

export function useShowDealsSpotlight(): boolean {
  return fetchFlag("showDealsSpotlight");
}

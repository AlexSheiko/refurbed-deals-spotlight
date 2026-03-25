export type FeatureFlags = {
  showDealsSpotlight: boolean;
};

const mockFlags: FeatureFlags = {
  showDealsSpotlight: true,
};

export function fetchFlag<K extends keyof FeatureFlags>(
  key: K,
): FeatureFlags[K] {
  return mockFlags[key];
}

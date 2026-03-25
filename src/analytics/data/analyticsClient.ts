export type RawEvent = {
  name: string;
  properties?: Record<string, unknown>;
};

export function sendEvent({ name, properties }: RawEvent): void {
  if (__DEV__) {
    console.log(`[Analytics] ${name}`, properties ?? {});
  }
}

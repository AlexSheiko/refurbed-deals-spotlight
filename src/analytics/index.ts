import { sendEvent } from "./data/analyticsClient";

export function trackDealImpression(dealId: string, dealTitle: string): void {
  sendEvent({ name: "deal_impression", properties: { dealId, dealTitle } });
}

export function trackDealClick(dealId: string, dealTitle: string): void {
  sendEvent({ name: "deal_click", properties: { dealId, dealTitle } });
}

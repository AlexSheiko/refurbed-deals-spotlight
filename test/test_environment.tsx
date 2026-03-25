import { render } from "@testing-library/react-native";
import React from "react";
import { useDeals } from "../src/deals/logic/useDeals";

jest.mock("../src/deals/logic/useDeals");

import type { Deal } from "../src/deals/data/model/Deal";

export const mockUseDeals = useDeals as jest.MockedFunction<typeof useDeals>;

export function mockDeal(overrides: Partial<Deal> = {}): Deal {
  return {
    id: "deal-1",
    title: "Test Deal",
    price: { amount: 100, currency: "EUR" },
    discountPercentage: 10,
    refurbedScore: 80,
    ...overrides,
  };
}

export class TestEnvironment {
  deals = mockUseDeals;

  openWith(ui: React.ReactElement) {
    return render(ui);
  }
}

import { screen } from "@testing-library/react-native";
import React from "react";
import { TestCommons } from "../test_commons";
import { DealsListScreen } from "../../src/deals/view/DealsListScreen";
import { mockDeal, TestEnvironment } from "../test_environment";

const env = new TestEnvironment();

const cheapDeal = mockDeal({
  id: "deal-cheap",
  title: "Budget Phone",
  price: { amount: 99, currency: "EUR" },
});
const expensiveDeal = mockDeal({
  id: "deal-expensive",
  title: "Premium Phone",
  price: { amount: 499, currency: "EUR" },
});

const renderScreen = () => env.openWith(<DealsListScreen />);

describe("Deals list screen", () => {
  describe("IF loading failed", () => {
    it("THEN shows error message", async () => {
      env.deals.mockReturnValue({
        status: "error",
        errorMessage: TestCommons.errorMessage,
      });

      renderScreen();

      expect(
        await screen.findByText(`Error: ${TestCommons.errorMessage}`),
      ).toBeTruthy();
    });
  });

  describe("IF user clicks price descending", () => {
    it("THEN cheaper deal is shown below the expensive deal", async () => {
      env.deals.mockReturnValue({
        status: "success",
        deals: [cheapDeal, expensiveDeal],
      });

      renderScreen();

      await screen.findByText(cheapDeal.title);
      await screen.findByText(expensiveDeal.title);

      TestCommons.pressButton("Price ↓");

      const allTitles = screen.getAllByText(/Phone/);
      expect(allTitles[0]).toHaveTextContent(expensiveDeal.title);
      expect(allTitles[1]).toHaveTextContent(cheapDeal.title);
    });
  });
});

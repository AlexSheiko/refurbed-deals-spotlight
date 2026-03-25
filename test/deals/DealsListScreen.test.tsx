import { screen, waitFor } from "@testing-library/react-native";
import { render } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { TestCommons } from "../test_commons";
import { DealsListScreen } from "../../src/deals/view/DealsListScreen";
import { mockedDeal } from "../../src/deals/data/model/Deal";
import { dealsRepository } from "../../src/deals/data/repository/DealsRepository";

const errorMessage = "Request failed";

const cheapDeal = mockedDeal({
  id: "deal-cheap",
  title: "Budget Phone",
  price: { amount: 99, currency: "EUR" },
});
const expensiveDeal = mockedDeal({
  id: "deal-expensive",
  title: "Premium Phone",
  price: { amount: 499, currency: "EUR" },
});

const renderScreen = () =>
  render(
    <NavigationContainer>
      <DealsListScreen />
    </NavigationContainer>,
  );

describe("Deals list screen", () => {
  beforeEach(() => {
    jest.spyOn(dealsRepository, "fetchDeals").mockReset();
  });

  describe("IF loading failed", () => {
    it("THEN shows error message", async () => {
      jest.spyOn(dealsRepository, "fetchDeals").mockRejectedValueOnce(new Error(errorMessage));

      renderScreen();

      expect(await screen.findByText(`Error: ${errorMessage}`)).toBeTruthy();
    });
  });

  describe("IF user clicks price descending", () => {
    it("THEN cheaper deal is shown below the expensive deal", async () => {
      jest.spyOn(dealsRepository, "fetchDeals").mockResolvedValueOnce([cheapDeal, expensiveDeal]);

      renderScreen();

      await screen.findByText(cheapDeal.title);
      await screen.findByText(expensiveDeal.title);

      TestCommons.pressButton("Price ↓");

      await waitFor(() => {
        const allTitles = screen.getAllByText(/Phone/).map((item) => item.props.children);
        expect(allTitles).toEqual([expensiveDeal.title, cheapDeal.title]);
      });
    });
  });
});

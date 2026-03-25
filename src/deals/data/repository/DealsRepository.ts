import { Deal, mockedDeal } from "../model/Deal";

export type DealsRepository = {
  fetchDeals: () => Promise<Deal[]>;
};

export const dealsRepository: DealsRepository = {
  fetchDeals: async () =>
    Promise.resolve([
      mockedDeal(),
      mockedDeal({ title: "Another deal", discountPercentage: 20 }),
    ]),
};

import z from "zod";
import { MoneySchema } from "./Money";

const DealSchema = z.object({
  id: z.uuid(),
  title: z.string().min(1),
  price: MoneySchema,
});

type Deal = z.infer<typeof DealSchema>;

export const mockedDeal = (overrides?: Partial<Deal>): Deal => ({
  id: "mocked-id",
  title: "Mocked title",
  price: { amount: 199, currency: "USD" },
  ...overrides,
});

export const copyDeal = (deal: Deal, overrides: Partial<Deal>): Deal => ({
  ...deal,
  ...overrides,
})

export const dealFromJson = (json: unknown): Deal => DealSchema.parse(json);

export const dealToJson = (deal: Deal): unknown => DealSchema.parse(deal);

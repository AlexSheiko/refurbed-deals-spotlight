import z from "zod";
import { MoneySchema } from "./Money";
import * as Crypto from "expo-crypto";

const DealSchema = z.object({
  id: z.uuid(),
  title: z.string().min(1),
  price: MoneySchema,
  discountPercentage: z.number().int().min(0).max(100),
  refurbedScore: z.number().int().min(0).max(100),
});

export type Deal = z.infer<typeof DealSchema>;

export const mockedDeal = (overrides?: Partial<Deal>): Deal => ({
  id: Crypto.randomUUID(),
  title: "Mocked title",
  price: { amount: 199, currency: "USD" },
  discountPercentage: 10,
  refurbedScore: 85,
  ...overrides,
});

export const copyDeal = (deal: Deal, overrides: Partial<Deal>): Deal => ({
  ...deal,
  ...overrides,
});

export const dealFromJson = (json: unknown): Deal => DealSchema.parse(json);
export const dealToJson = (deal: Deal): unknown => DealSchema.parse(deal);

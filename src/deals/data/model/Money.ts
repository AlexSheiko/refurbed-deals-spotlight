import { z } from "zod";

export const MoneySchema = z.object({
  amount: z.number().int().positive(), // amount in cents
  currency: z.enum(["USD", "EUR", "GBP", "PLN"]),
});

type Money = z.infer<typeof MoneySchema>;
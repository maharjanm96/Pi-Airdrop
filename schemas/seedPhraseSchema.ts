// lib/validation.ts
import { z } from "zod";

export const seedPhraseSchema = z.object({
  seedPhrase: z
    .string()
    .trim()
    .min(1, "Seed phrase is required")
    .refine((val) => val.split(/\s+/).length === 24, {
      message: "Seed phrase must contain exactly 24 words",
    })
    .refine((val) => /^[a-z\s]+$/.test(val), {
      message: "Seed phrase must contain only lowercase letters and spaces",
    }),
});

export type SeedPhraseSchema = z.infer<typeof seedPhraseSchema>;

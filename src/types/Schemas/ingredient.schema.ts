import { z } from "zod";

export const IngredientSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
  image: z.string().url(),
  type: z.string(),
});

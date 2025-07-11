import { z } from "zod";

export const IngredientSchema = z.object({
  _id: z.string().min(1),
  name: z.string().min(1),
  description: z.string(),
  image: z.string().url(),
  type: z.string(),
});

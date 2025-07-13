import { z } from "zod";

import { IngredientSchema } from "./ingredient.schema";
import { mealSchema } from "./meal.schema";

export const productSchema = z.object({
  _id: z.string().min(1),
  name: z.string().min(1),
  type: z.enum(["ingredient", "kit"]),
  ingredient: IngredientSchema.optional(),
  meal: mealSchema.optional(),
  price: z.number().nonnegative().min(0),
  stock: z.number().default(0),
  image: z.string().url().optional(),
  visible: z.boolean().default(true),
});

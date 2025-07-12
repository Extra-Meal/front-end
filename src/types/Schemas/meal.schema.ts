import { z } from "zod";

import { areaSchema } from "./area.schema";
import { categorySchema } from "./category.schema";
import { IngredientSchema } from "./ingredient.schema";

export const mealSchema = z.object({
  _id: z.string(),
  name: z.string().min(1),
  thumbnail: z.string().url(),
  category: categorySchema,
  area: areaSchema,
  instructions: z.string().optional(),
  tags: z.array(z.string()).default([]).optional(),
  youtube: z.string().url().optional(),
  source: z.string().url().optional(),
  ingredients: z
    .array(
      z.object({
        ingredient: IngredientSchema,
        measure: z.string().optional(),
      })
    )
    .default([]),
  kitProduct: z.string().optional(),
});

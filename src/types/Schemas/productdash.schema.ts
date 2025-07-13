import { z } from "zod";

export const mealIngredientSchema = z.object({
  ingredient: z.string().min(1),
  measure: z.string().min(1),
});

export const mealInputSchema = z.object({
  name: z.string().min(1),
  thumbnail: z.string().url().optional(),
  category: z.string().min(1),
  area: z.string().min(1),
  instructions: z.string().optional(),
  tags: z.array(z.string()).optional(),
  youtube: z.string().url().optional(),
  source: z.string().url().optional(),
  ingredients: z.array(mealIngredientSchema),
  preparationTime: z.number().min(1).optional(),
  difficulty: z.enum(["easy", "medium", "hard"]).optional(),
});

export const productSchema = z.object({
  name: z.string().min(1),
  type: z.enum(["ingredient", "kit"]),
  price: z.number().min(0),
  stock: z.number().optional(),
  image: z.string().url().optional(),
  visible: z.boolean().optional(),
  sold: z.number().optional(),
  views: z.number().optional(),
  discount: z.number().optional(),
  ratingAverage: z.number().min(0).max(5).optional(),
  ratingCount: z.number().optional(),
  ingredient: z.string().optional(),
  meal: z.union([mealInputSchema, z.string()]).optional(),
});

import type { z } from "zod";

import type { IngredientSchema } from "./Schemas/ingredient.schema";

export type Ingredient = z.infer<typeof IngredientSchema>;

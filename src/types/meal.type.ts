import type { z } from "zod";

import type { mealSchema } from "./Schemas/meal.schema";

export type Meal = z.infer<typeof mealSchema>;

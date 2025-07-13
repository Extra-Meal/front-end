import type { z } from "zod";

import type { categorySanitizedSchema, categorySchema } from "./Schemas/category.schema";

export type SanitizedCategory = z.infer<typeof categorySanitizedSchema>;
import { categorySchema } from "./Schemas/category.schema";

export type Category = z.infer<typeof categorySchema>;

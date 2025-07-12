
import type { z } from "zod";

import type { categorySchema } from "./Schemas/category.schema";

export type Category = z.infer<typeof categorySchema>;

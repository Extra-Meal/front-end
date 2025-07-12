import type { z } from "zod";

import { categorySchema } from "./Schemas/category.schema";

export type Category = z.infer<typeof categorySchema>;

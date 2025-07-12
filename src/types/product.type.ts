import type { z } from "zod";

import type { productSchema } from "./Schemas/product.schema";

export type Product = z.infer<typeof productSchema>;

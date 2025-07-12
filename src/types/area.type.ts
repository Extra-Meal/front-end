import type { z } from "zod";

import { areaSchema } from "./Schemas/area.schema";

export type Area = z.infer<typeof areaSchema>;


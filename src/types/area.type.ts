import type { z } from "zod";

import type { areaSchema } from "./Schemas/area.schema";

export type Area = z.infer<typeof areaSchema>;

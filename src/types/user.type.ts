import type { z } from "zod";

import type { userSchema } from "./Schemas/user.schema";

export type User = z.infer<typeof userSchema>;

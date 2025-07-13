import { z } from "zod";

export const areaSchema = z.object({
  _id: z.string(),
  name: z.string().min(1, "Name is required"),
});

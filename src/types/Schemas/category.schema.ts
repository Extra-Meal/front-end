import { z } from "zod";

export const categorySchema = z.object({
  _id: z.string(),
  name: z.string().min(1, "Name is required"),
  thumbnail: z.union([z.string().url("Thumbnail must be a valid URL"), z.instanceof(File), z.null()]),
  description: z
    .string({
      required_error: "Description is required",
      invalid_type_error: "Description must be a string",
    })
    .min(1, "Description is required"),
});

export const updateCategorySchema = categorySchema.partial();

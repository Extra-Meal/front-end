import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useGetData, useGetDataWithParams, usePostData } from "@/hooks/useApi";

import { productSchema } from "../types/Schemas/productdash.schema";
import { toast } from "sonner";

type Cat = {
  _id: string;
  name: string;
};
type Area = {
  _id: string;
  name: string;
};
type Ingredient = {
  _id: string;
  name: string;
};

const ProductForm = () => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      type: "kit",
      price: 0,
      stock: 0,
      image: "",
      visible: true,
      discount: 0,
      meal: {
        name: "",
        category: "",
        area: "",
        instructions: "",
        tags: [],
        youtube: "",
        source: "",
        thumbnail: "",
        preparationTime: undefined,
        difficulty: undefined,
        ingredients: [{ ingredient: "", measure: "" }],
      },
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "meal.ingredients",
  });

  const categories = useGetData("/category");
  const areas = useGetData("/areas");
  const ingredients = useGetDataWithParams("/ingredient");
  const { mutate } = usePostData("/products");

  const onSubmit = (data: z.infer<typeof productSchema>) => {
    console.log("✅ Form submitted:", data);
    mutate(data, {
      onSuccess: () => {
        console.log("Product created successfully");
      },
      onError: (error) => {
        console.error("Failed to create product:", error);
      },
    });
    toast.success("Product created successfully!");
  };

  const getErrorMessage = (path: string): string | undefined => {
    const keys = path.split(".");
    let current: unknown = errors;

    for (const key of keys) {
      if (typeof current === "object" && current !== null && key in current) {
        current = (current as Record<string, unknown>)[key];
      } else {
        return;
      }
    }

    if (
      typeof current === "object" &&
      current !== null &&
      "message" in current &&
      typeof (current as { message: unknown }).message === "string"
    ) {
      return (current as { message: string }).message;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <Label>Product Name</Label>
          <Input {...register("name")} placeholder="e.g. Chicken Meal" />
          {getErrorMessage("name") && <p className="text-sm text-red-500">{getErrorMessage("name")}</p>}
        </div>

        <div>
          <Label>Price ($)</Label>
          <Input type="number" step="0.01" {...register("price", { valueAsNumber: true })} />
          {getErrorMessage("price") && <p className="text-sm text-red-500">{getErrorMessage("price")}</p>}
        </div>

        <div>
          <Label>Stock</Label>
          <Input type="number" {...register("stock", { valueAsNumber: true })} />
          {getErrorMessage("stock") && <p className="text-sm text-red-500">{getErrorMessage("stock")}</p>}
        </div>

        <div>
          <Label>Image URL</Label>
          <Input {...register("image")} />
          {getErrorMessage("image") && <p className="text-sm text-red-500">{getErrorMessage("image")}</p>}
        </div>

        <div>
          <Label>Type</Label>
          <Select onValueChange={(val) => setValue("type", val as "kit" | "ingredient")} defaultValue="kit">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="kit">Kit</SelectItem>
              <SelectItem value="ingredient">Ingredient</SelectItem>
            </SelectContent>
          </Select>
          {getErrorMessage("type") && <p className="text-sm text-red-500">{getErrorMessage("type")}</p>}
        </div>

        <div>
          <Label>Discount (%)</Label>
          <Input type="number" {...register("discount", { valueAsNumber: true })} />
          {getErrorMessage("discount") && <p className="text-sm text-red-500">{getErrorMessage("discount")}</p>}
        </div>

        <div className="flex items-center gap-3 pt-2">
          <Label>Visible</Label>
          <Switch checked={watch("visible")} onCheckedChange={(val) => setValue("visible", val)} />
        </div>
      </div>

      {/* Meal Info */}
      {watch("visible") && typeof watch("meal") === "object" && (
        <div className="rounded-2xl border p-6">
          <h3 className="mb-4 text-lg font-semibold">Meal Info</h3>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <Label>Meal Name</Label>
              <Input {...register("meal.name")} />
              {getErrorMessage("meal.name") && <p className="text-sm text-red-500">{getErrorMessage("meal.name")}</p>}
            </div>

            <div>
              <Label>Category</Label>
              <Select onValueChange={(val) => setValue("meal.category", val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.data?.data.map((c: Cat) => (
                    <SelectItem key={c._id} value={c._id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {getErrorMessage("meal.category") && (
                <p className="text-sm text-red-500">{getErrorMessage("meal.category")}</p>
              )}
            </div>

            <div>
              <Label>Area</Label>
              <Select onValueChange={(val) => setValue("meal.area", val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Area" />
                </SelectTrigger>
                <SelectContent>
                  {areas.data?.data.map((a: Area) => (
                    <SelectItem key={a._id} value={a._id}>
                      {a.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {getErrorMessage("meal.area") && <p className="text-sm text-red-500">{getErrorMessage("meal.area")}</p>}
            </div>

            <div>
              <Label>Thumbnail URL</Label>
              <Input {...register("meal.thumbnail")} />
              {getErrorMessage("meal.thumbnail") && (
                <p className="text-sm text-red-500">{getErrorMessage("meal.thumbnail")}</p>
              )}
            </div>

            <div>
              <Label>Youtube URL</Label>
              <Input {...register("meal.youtube")} />
              {getErrorMessage("meal.youtube") && (
                <p className="text-sm text-red-500">{getErrorMessage("meal.youtube")}</p>
              )}
            </div>

            <div>
              <Label>Source URL</Label>
              <Input {...register("meal.source")} />
              {getErrorMessage("meal.source") && (
                <p className="text-sm text-red-500">{getErrorMessage("meal.source")}</p>
              )}
            </div>

            <div>
              <Label>Preparation Time (min)</Label>
              <Input type="number" {...register("meal.preparationTime", { valueAsNumber: true })} />
              {getErrorMessage("meal.preparationTime") && (
                <p className="text-sm text-red-500">{getErrorMessage("meal.preparationTime")}</p>
              )}
            </div>

            <div>
              <Label>Difficulty</Label>
              <Select onValueChange={(val) => setValue("meal.difficulty", val as "easy" | "medium" | "hard")}>
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
              {getErrorMessage("meal.difficulty") && (
                <p className="text-sm text-red-500">{getErrorMessage("meal.difficulty")}</p>
              )}
            </div>

            <div className="sm:col-span-2">
              <Label>Instructions</Label>
              <Textarea {...register("meal.instructions")} />
              {getErrorMessage("meal.instructions") && (
                <p className="text-sm text-red-500">{getErrorMessage("meal.instructions")}</p>
              )}
            </div>

            <div className="sm:col-span-2">
              <Label>Tags (comma-separated)</Label>
              <Input {...register("meal.tags")} />
              {getErrorMessage("meal.tags") && <p className="text-sm text-red-500">{getErrorMessage("meal.tags")}</p>}
            </div>
          </div>

          <div className="mt-6">
            <h4 className="mb-3 text-sm font-medium">Ingredients</h4>
            {fields.map((field, index) => (
              <div key={field.id} className="mb-3 flex items-center gap-2">
                <Select onValueChange={(val) => setValue(`meal.ingredients.${index}.ingredient`, val)}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select Ingredient" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.isArray(ingredients.data?.data?.ingredients) &&
                      ingredients.data.data.ingredients.map((ing: Ingredient) => (
                        <SelectItem key={ing._id} value={ing._id}>
                          {ing.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <Input className="flex-1" {...register(`meal.ingredients.${index}.measure`)} placeholder="Measure" />
                <Button type="button" size="icon" variant="destructive" onClick={() => remove(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={() => append({ ingredient: "", measure: "" })}>
              <Plus className="h-4 w-4" /> Add Ingredient
            </Button>
          </div>
        </div>
      )}

      <div className="flex justify-end gap-3 pt-4">
        <Button variant="outline" type="button">
          Cancel
        </Button>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};

export default ProductForm;

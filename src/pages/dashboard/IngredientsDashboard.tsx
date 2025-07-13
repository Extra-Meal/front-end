import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import PaginationComponent from "@/components/paginationComponent";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useDeleteData, useGetDataWithParams, usePostData } from "@/hooks/useApi";
import { ingredientTypes } from "@/lib/consts";
import type { APISuccess } from "@/types/api.type";
import type { Ingredient } from "@/types/ingredient.type";

type ProductWithIngredient = {
  _id: string;
  image: string;
  ingredient: Ingredient;
  stock: number;
  price: number;
};

type Response = {
  products: ProductWithIngredient[];
  pagination: {
    page: number;
    totalPages: number;
    totalProducts: number;
    limit: number;
  };
};

const ingredientFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  type: z.string().min(1, "Type is required"),
  price: z.string().min(1, "Price is required"),
  stock: z.string().min(1, "Stock is required"),
  image: z.string().url("Enter a valid image URL"),
});

type IngredientFormValues = z.infer<typeof ingredientFormSchema>;

export default function IngredientsDashboard() {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const form = useForm<IngredientFormValues>({
    resolver: zodResolver(ingredientFormSchema),
    defaultValues: {
      name: "",
      description: "",
      type: "Other",
      price: "",
      stock: "",
      image: "",
    },
  });

  const { data, isLoading, refetch } = useGetDataWithParams<APISuccess<Response>>("/products/ingredients");
  const postIngredient = usePostData("/products");
  const deleteIngredient = useDeleteData("/products");

  const totalPages = data?.data?.pagination.totalPages || 1;
  const products = data?.data?.products || [];

  const onSubmit = async (values: IngredientFormValues) => {
    try {
      await postIngredient.mutateAsync({
        name: values.name,
        price: +values.price,
        stock: +values.stock,
        image: values.image,
        type: "ingredient",
        ingredient: {
          name: values.name,
          description: values.description,
          type: values.type,
        },
      });
      toast.success("Ingredient added successfully!");
      refetch();
      form.reset();
      setDialogOpen(false);
    } catch {
      toast.error("Failed to add ingredient.");
    }
  };

  const handleDeleteIngredient = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this ingredient?");
    if (!confirmDelete) return;

    try {
      await deleteIngredient.mutateAsync(id);
      toast.success("Ingredient deleted successfully!");
      refetch();
    } catch {
      toast.error("Failed to delete ingredient.");
    }
  };

  if (isLoading) {
    return (
      <div className="bg-background flex h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" />
          <p className="text-muted-foreground text-sm">please wait...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full py-6">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold sm:text-2xl">Ingredients Management</h1>
            <p className="text-muted-foreground mt-2">{data?.data?.pagination.totalProducts || 0} ingredients found</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>Add Ingredient</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Ingredient</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input placeholder="description" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {ingredientTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="price" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="stock"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stock</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="stock" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image URL</FormLabel>
                        <FormControl>
                          <Input placeholder="image url" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full">
                    Add Ingredient
                  </Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Table>
        <TableHeader className="bg-primary text-primary-foreground rounded-md">
          <TableRow>
            <TableHead className="text-primary-foreground">Image</TableHead>
            <TableHead className="text-primary-foreground">Name</TableHead>
            <TableHead className="text-primary-foreground">Description</TableHead>
            <TableHead className="text-primary-foreground">Type</TableHead>
            <TableHead className="text-primary-foreground">Stock</TableHead>
            <TableHead className="text-primary-foreground">Price</TableHead>
            <TableHead className="text-primary-foreground text-right">Delete</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.map((product) => (
            <TableRow key={product._id}>
              <TableCell>
                <img src={product.image} alt={product.ingredient.name} className="h-12 w-12 rounded object-cover" />
              </TableCell>
              <TableCell>{product.ingredient.name}</TableCell>
              <TableCell className="max-w-[300px] truncate">
                {product.ingredient.description || "No Description Available"}
              </TableCell>
              <TableCell>{product.ingredient.type}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell className="text-right">
                <Button variant="destructive" size="sm" onClick={() => handleDeleteIngredient(product._id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {totalPages > 1 && (
        <div className="mt-8">
          <PaginationComponent totalPages={totalPages} />
        </div>
      )}
    </>
  );
}

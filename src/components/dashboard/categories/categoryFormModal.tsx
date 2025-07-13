import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Upload, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { usePatchData, usePostData } from "@/hooks/useApi";
import { categorySanitizedSchema } from "@/types/Schemas/category.schema";
import type { Category, SanitizedCategory } from "@/types/category.type";

type CategoryFormModalProps = {
  children: React.ReactNode;
  category?: Category;
};
function CategoryFormModal({ children, category }: CategoryFormModalProps) {
  const [open, setOpen] = useState(false);
  const [, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const { mutate: createCategory } = usePostData(
    "category",
    {},
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  const { mutate: updateCategory } = usePatchData(
    category ? `category/${category._id}` : "",
    {},
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  const form = useForm<SanitizedCategory>({
    resolver: zodResolver(categorySanitizedSchema),
    defaultValues: category || {
      name: "",
      description: "",
      thumbnail: null,
    },
  });

  const onSubmit = async (data: SanitizedCategory) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    if (data.thumbnail instanceof File) {
      formData.append("thumbnail", data.thumbnail);
    }
    console.log("Form Data:", formData);

    if (category) {
      updateCategory(formData, {
        onSuccess: () => {
          toast.success("Category updated successfully!");
          queryClient.invalidateQueries({ queryKey: ["/category"] });
        },
        onError: (error) => {
          toast.error(error?.data?.message || "Failed to update category.");
        },
      });
    } else {
      createCategory(formData, {
        onSuccess: () => {
          toast.success("Category created successfully!");
          queryClient.invalidateQueries({ queryKey: ["/category"] });
        },
        onError: (error) => {
          toast.error(error?.data?.message || "Failed to create category.");
        },
      });
    }

    form.reset();
    setImageFile(null);
    setImagePreviewUrl(null);
    setOpen(false);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      form.setValue("thumbnail", file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreviewUrl(null);
    form.setValue("thumbnail", null);
    const input = document.getElementById("image") as HTMLInputElement | null;
    if (input) input.value = "";
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="from-primary bg-gradient-to-r to-gray-600 bg-clip-text text-2xl font-bold text-transparent">
            {category ? "Edit" : "Add New"} Category
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter category name" {...field} />
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
                      <Input placeholder="Enter description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="thumbnail"
                render={() => (
                  <FormItem>
                    <FormLabel>Category Image</FormLabel>
                    <FormControl>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Button
                            type="button"
                            variant="outline"
                            className="relative border-2 border-dashed transition-colors"
                          >
                            <Upload className="mr-2 h-4 w-4" />
                            Upload Image
                            <input
                              id="image"
                              type="file"
                              accept="image/*"
                              onChange={handleImageChange}
                              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                            />
                          </Button>
                        </div>

                        {imagePreviewUrl && (
                          <div className="relative inline-block">
                            <img
                              src={imagePreviewUrl}
                              alt="Category preview"
                              className="h-32 w-32 rounded-lg border-2 border-green-200 object-cover"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={removeImage}
                              className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end gap-4 border-t pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={form.formState.isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="from-primary min-w-[120px] bg-gradient-to-r to-gray-600 text-white transition-colors hover:to-teal-800"
              >
                {form.formState.isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    {!category ? "Adding..." : "Updating..."}
                  </div>
                ) : category ? (
                  "Edit Category"
                ) : (
                  "Add Category"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default CategoryFormModal;

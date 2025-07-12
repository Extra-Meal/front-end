import { zodResolver } from "@hookform/resolvers/zod";
import { Upload, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { usePatchData, usePostData } from "@/hooks/useApi";
import { categorySchema } from "@/types/Schemas/category.schema";
import type { Category } from "@/types/category.type";

function CategoryFormModal({ children, category }: { children: React.ReactNode; category?: Category }) {
  const { mutate: createCategory } = usePostData<Category>("categories");
  const { mutate: updateCategory } = usePatchData<Category>("categories");

  const [open, setOpen] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const form = useForm<Category>({
    resolver: zodResolver(categorySchema),
    defaultValues: category || {
      name: "",
      description: "",
      thumbnail: "",
    },
  });
  const onSubmit = async (data: Category) => {
    if (category) {
      updateCategory(category.id, data);
    } else {
      createCategory(data);
    }
    form.reset();
    setOpen(false);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      form.setValue("thumbnail", file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreviewUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreviewUrl(null);
    form.setValue("thumbnail", null);
    document.getElementById("image").value = "";
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="from-primary bg-gradient-to-r to-teal-600 bg-clip-text text-2xl font-bold text-transparent">
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
                      <Input placeholder="auto-generated from name" className="bg-gray-50" readOnly {...field} />
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

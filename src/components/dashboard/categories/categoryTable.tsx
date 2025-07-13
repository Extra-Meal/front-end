import { Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useDeleteData, useGetData } from "@/hooks/useApi";
import type { Category } from "@/types/category.type";

import { Button } from "../../ui/button";
import CategoryFormModal from "./categoryFormModal";

function CategoryTable() {
  const { data, isLoading, error, isError, refetch } = useGetData<{
    success: boolean;
    message: string;
    data: Category[];
  }>("/category");

  const deleteMutation = useDeleteData("/category", {
    onSuccess: () => {
      toast.success("Category deleted successfully!");
      refetch();
    },
    onError: (error) => {
      toast.error(error?.data?.message || "Failed to delete category.");
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error?.data?.message}</p>;

  const categories = data?.data || [];

  return (
    <div className="mx-auto py-6">
      <Table>
        <TableHeader className="bg-primary rounded-md">
          <TableRow>
            <TableHead className="text-primary-foreground">Image</TableHead>
            <TableHead className="text-primary-foreground">Category Name</TableHead>
            <TableHead className="text-primary-foreground w-100">Description</TableHead>
            <TableHead className="text-primary-foreground text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category._id}>
              <TableCell className="font-medium">
                <img src={category.thumbnail} alt={category.name} className="h-25 w-25" />
              </TableCell>
              <TableCell className="font-medium">{category.name}</TableCell>
              <TableCell className="w-[200px] font-medium whitespace-normal">
                {category.description.split(".")[0].trim()}.
              </TableCell>
              <TableCell className="flex justify-center gap-2">
                <CategoryFormModal key={category.name + category.description} category={category}>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </CategoryFormModal>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteMutation.mutate(category._id)}
                  disabled={deleteMutation.isPending}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default CategoryTable;

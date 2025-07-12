import { Edit, Trash2 } from "lucide-react";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useDeleteData } from "@/hooks/useApi";
import type { Category } from "@/types/category.type";

import { Button } from "../../ui/button";
import CategoryFormModal from "./categoryFormModal";

function CategoryTable({ categories }: { categories: Category[] }) {
  console.log("categories table", categories);
  const handleDelete = (id: string) => useDeleteData(`http://localhost:3000/api/category/${id}`);
  return (
    <div className="mx-auto py-6">
      <div className="border">
        <Table>
          <TableHeader className="bg-primary text-primary-foreground rounded-md">
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Category Name</TableHead>
              <TableHead className="w-100">Description</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.name}>
                <TableCell className="font-medium">
                  <img src={category.thumbnail} alt={category.name} className="h-25 w-25" />
                </TableCell>
                <TableCell className="font-medium">{category.name}</TableCell>
                <TableCell className="w-[200px] font-medium whitespace-normal">
                  {category.description.split(".")[0].trim()}.
                </TableCell>
                <TableCell className="flex justify-center gap-2">
                  <CategoryFormModal category={category}>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </CategoryFormModal>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(category._id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default CategoryTable;

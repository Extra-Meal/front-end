import { Plus } from "lucide-react";

import CategoryFormModal from "@/components/dashboard/categories/categoryFormModal";
import CategoryTable from "@/components/dashboard/categories/categoryTable";
import { Button } from "@/components/ui/button";
import { useGetData } from "@/hooks/useApi";
import type { Category } from "@/types/category.type";

function CategoriesDashboard() {
  const { data, isLoading, error, isError } = useGetData<{
    success: boolean;
    message: string;
    data: Category[];
  }>("http://localhost:3000/api/category");
  console.log(data);
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error?.data.message}</p>;

  return (
    <main className="container mx-auto p-6">
      <div className="mb-6 flex flex-col items-center justify-between gap-3 sm:flex-row">
        <h1 className="text-xl font-bold sm:text-2xl">Category Management</h1>
        <div>
          <CategoryFormModal>
            <Button className="w-full sm:w-fit">
              <Plus className="mr-2 h-4 w-4" />
              Add New Category
            </Button>
          </CategoryFormModal>
        </div>
      </div>
      <CategoryTable categories={data?.data} />
    </main>
  );
}

export default CategoriesDashboard;

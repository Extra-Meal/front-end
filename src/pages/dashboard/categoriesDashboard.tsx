import { Plus } from "lucide-react";

import CategoryFormModal from "@/components/dashboard/categories/categoryFormModal";
import CategoryTable from "@/components/dashboard/categories/categoryTable";
import { Button } from "@/components/ui/button";

function CategoriesDashboard() {
  return (
    <main className="py-6">
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
      <CategoryTable />
    </main>
  );
}

export default CategoriesDashboard;

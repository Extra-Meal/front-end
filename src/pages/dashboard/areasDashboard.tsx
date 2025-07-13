import { Plus } from "lucide-react";

import AreasFormModal from "@/components/dashboard/areas/areasFormModal";
import AreasTable from "@/components/dashboard/areas/areasTable";
import { Button } from "@/components/ui/button";

function AreasDashboard() {
  return (
    <main className="container mx-auto p-6">
      <div className="mb-6 flex flex-col items-center justify-between gap-3 sm:flex-row">
        <h1 className="text-xl font-bold sm:text-2xl">Areas Management</h1>
        <div>
          <AreasFormModal>
            <Button className="w-full sm:w-fit">
              <Plus className="mr-2 h-4 w-4" />
              Add New Area
            </Button>
          </AreasFormModal>
        </div>
      </div>
      <AreasTable />
    </main>
  );
}

export default AreasDashboard;

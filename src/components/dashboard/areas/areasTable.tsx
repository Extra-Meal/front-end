import { Edit, Trash2 } from "lucide-react";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useDeleteData } from "@/hooks/useApi";
import type { Area } from "@/types/area.type";

import { Button } from "../../ui/button";
import AreasFormModal from "./areasFormModal";

function AreasTable({ areas }: { areas: Area[] }) {
  const handleDelete = (id: string) => useDeleteData(`http://localhost:3000/api/areas/${id}`);
  return (
    <div className="mx-auto py-6">
      <div className="border">
        <Table>
          <TableHeader className="bg-primary text-primary-foreground rounded-md">
            <TableRow>
              <TableHead>Area Name</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {areas.map((area) => (
              <TableRow key={area.name}>
                <TableCell className="font-medium">{area.name}</TableCell>
                <TableCell className="flex justify-center gap-2">
                  <AreasFormModal area={area}>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </AreasFormModal>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(area._id)}>
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

export default AreasTable;

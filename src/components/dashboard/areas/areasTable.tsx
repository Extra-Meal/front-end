import { Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useDeleteData, useGetData } from "@/hooks/useApi";
import type { Area } from "@/types/area.type";

import { Button } from "../../ui/button";
import AreasFormModal from "./areasFormModal";

function AreasTable() {
  const { data, isLoading, error, isError, refetch } = useGetData<{
    success: boolean;
    message: string;
    data: Area[];
  }>("/areas");

  const deleteMutation = useDeleteData("/areas", {
    onSuccess: () => {
      toast.success("Area deleted successfully!");
      refetch();
    },
    onError: (error) => {
      toast.error(error?.data?.message || "Failed to delete area.");
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error?.data?.message}</p>;

  const areas = data?.data || [];

  return (
    <div className="mx-auto py-6">
      <Table>
        <TableHeader className="bg-primary rounded-md">
          <TableRow>
            <TableHead className="text-primary-foreground">Area Name</TableHead>
            <TableHead className="text-primary-foreground text-end">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {areas.map((area) => (
            <TableRow key={area._id}>
              <TableCell className="font-medium">{area.name}</TableCell>
              <TableCell className="flex justify-end gap-2">
                <AreasFormModal area={area}>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </AreasFormModal>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteMutation.mutate(area._id)}
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

export default AreasTable;

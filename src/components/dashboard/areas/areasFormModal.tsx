import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { usePatchData, usePostData } from "@/hooks/useApi";
import { areaSchema } from "@/types/Schemas/area.schema";
import type { Area } from "@/types/area.type";

function AreaFormModal({ children, area, refetch }: { children: React.ReactNode; area?: Area; refetch?: () => void }) {
  const { mutate: createArea, isPending: creating } = usePostData<Area>("http://localhost:3000/api/areas", {
    onSuccess: () => {
      toast.success("Area created successfully!");
      refetch?.();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to create area.");
    },
  });

  const { mutate: updateArea, isPending: updating } = usePatchData<Area>(
    area ? `http://localhost:3000/api/areas/${area._id}` : "",
    {
      onSuccess: () => {
        toast.success("Area updated successfully!");
        refetch?.();
      },
    }
  );

  const [open, setOpen] = useState(false);

  const form = useForm<Area>({
    resolver: zodResolver(areaSchema),
    defaultValues: {
      _id: "",
      name: "",
    },
  });

  useEffect(() => {
    if (area) {
      form.reset(area);
    }
  }, [area, form]);

  const onSubmit = async (data: Area) => {
    console.log("SUBMIT DATA", data);

    if (area) {
      updateArea(data);
    } else {
      createArea(data);
    }

    form.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="from-primary bg-gradient-to-r to-teal-600 bg-clip-text text-2xl font-bold text-transparent">
            {area ? "Edit" : "Add New"} Area
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
                    <FormLabel>Area Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter area name" {...field} />
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
                disabled={creating || updating}
                className="from-primary min-w-[120px] bg-gradient-to-r to-gray-600 text-white transition-colors hover:to-teal-800"
              >
                {creating || updating ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    {!area ? "Adding..." : "Updating..."}
                  </div>
                ) : area ? (
                  "Edit Area"
                ) : (
                  "Add Area"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default AreaFormModal;

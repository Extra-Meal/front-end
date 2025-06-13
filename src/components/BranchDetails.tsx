import { useNavigate } from "react-router";

import { useBranches } from "@/contexts/BranchesContext";

export default function BranchDetails() {
  const { currentBranch } = useBranches();
  const navigate = useNavigate();

  if (!currentBranch) return null;

  const { cityName, countryName, detailedAddress, famousDish, position } = currentBranch;

  return (
    <div className="bg-background border-border mx-auto mt-10 max-w-xl rounded-2xl border p-6 shadow-md">
      <h2 className="text-primary mb-4 text-center text-2xl font-bold">Branch Details</h2>

      <div className="text-foreground space-y-4 text-base">
        <div className="flex justify-between">
          <span className="font-medium">City:</span>
          <span>{cityName}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Country:</span>
          <span>{countryName}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Address:</span>
          <span>{detailedAddress}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Famous Dish:</span>
          <span>{famousDish}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Latitude:</span>
          <span>{position.lat}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Longitude:</span>
          <span>{position.lng}</span>
        </div>
      </div>

      {/* Back Button */}
      <div className="mt-8 text-center">
        <button
          onClick={() => navigate(-1)}
          className="border-border bg-accent text-accent-foreground hover:bg-accent/80 inline-flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition"
        >
          &larr; Back
        </button>
      </div>
    </div>
  );
}

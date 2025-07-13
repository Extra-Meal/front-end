import { SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const FilterModal = () => {
  const [open, setOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const [formState, setFormState] = useState({
    search: searchParams.get("search") || "",
    type: searchParams.get("type") || "",
    stock: searchParams.get("stock") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = (e: React.FormEvent) => {
    e.preventDefault();
    const newParams = new URLSearchParams();
    Object.entries(formState).forEach(([key, value]) => {
      if (value) newParams.set(key, value);
    });
    newParams.set("page", "1");
    setSearchParams(newParams);
    setOpen(false);
  };

  const clearFilters = () => {
    setFormState({
      search: "",
      type: "",
      stock: "",
      minPrice: "",
      maxPrice: "",
    });
    const clearedParams = new URLSearchParams(searchParams);
    ["search", "type", "stock", "minPrice", "maxPrice", "page"].forEach((param) => clearedParams.delete(param));
    setSearchParams(clearedParams);
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        className="text-primary hover:bg-primary/10 mt-2 ml-2 cursor-pointer rounded p-2"
        onClick={() => setOpen(true)}
        aria-label="Open filters"
      >
        <SlidersHorizontal className="h-10 w-6" />
      </button>

      {open && (
        <div className="bg-background/90 text-foreground fixed inset-0 z-50 flex items-center justify-center">
          <form
            onSubmit={applyFilters}
            className="bg-card text-card-foreground border-border relative w-[90%] max-w-md rounded-xl border p-6 shadow-xl"
          >
            <button
              type="button"
              className="text-destructive hover:text-destructive-foreground absolute top-3 right-3"
              onClick={() => setOpen(false)}
              aria-label="Close filters"
            >
              <X className="h-5 w-5 cursor-pointer" />
            </button>

            <h2 className="text-primary mb-4 text-lg font-semibold">Filter Meals</h2>

            <div className="space-y-4">
              <input
                name="search"
                placeholder="Search by name..."
                value={formState.search}
                onChange={handleChange}
                className="border-border bg-input text-foreground placeholder:text-muted-foreground w-full rounded-md border p-2"
              />

              <select
                name="type"
                value={formState.type}
                onChange={handleChange}
                className="border-border bg-input text-foreground w-full rounded-md border p-2"
              >
                <option value="">All Types</option>
                <option value="ingredient">Ingredient</option>
                <option value="kit">Kit</option>
              </select>

              <select
                name="stock"
                value={formState.stock}
                onChange={handleChange}
                className="border-border bg-input text-foreground w-full rounded-md border p-2"
              >
                <option value="">All Stock</option>
                <option value="in-stock">In Stock</option>
                <option value="out-of-stock">Out of Stock</option>
              </select>

              <div className="flex gap-2">
                <input
                  type="number"
                  name="minPrice"
                  placeholder="Min Price"
                  value={formState.minPrice}
                  onChange={handleChange}
                  className="border-border bg-input text-foreground placeholder:text-muted-foreground w-1/2 rounded-md border p-2"
                />
                <input
                  type="number"
                  name="maxPrice"
                  placeholder="Max Price"
                  value={formState.maxPrice}
                  onChange={handleChange}
                  className="border-border bg-input text-foreground placeholder:text-muted-foreground w-1/2 rounded-md border p-2"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-between gap-3">
              <button
                type="submit"
                className="bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground flex-1 cursor-pointer rounded-md py-2 font-semibold transition-all"
              >
                Apply Filter
              </button>

              <button
                type="button"
                onClick={clearFilters}
                className="bg-muted text-muted-foreground hover:bg-destructive hover:text-destructive-foreground flex-1 cursor-pointer rounded-md py-2 font-semibold transition-all"
              >
                Clear All
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default FilterModal;

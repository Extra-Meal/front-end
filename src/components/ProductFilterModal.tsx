import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { X, SlidersHorizontal } from "lucide-react";

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
    ["search", "type", "stock", "minPrice", "maxPrice", "page"].forEach((param) =>
      clearedParams.delete(param)
    );
    setSearchParams(clearedParams);
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        className="ml-2 mt-2 text-primary hover:text-accent cursor-pointer"
        onClick={() => setOpen(true)}
        aria-label="Open filters"
      >
        <SlidersHorizontal className="w-6 h-6" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-background/90 text-foreground flex items-center justify-center">
          <form
            onSubmit={applyFilters}
            className="bg-card text-card-foreground p-6 rounded-xl shadow-xl w-[90%] max-w-md relative border border-border"
          >
            <button
              type="button"
              className="absolute top-3 right-3 text-destructive hover:text-destructive-foreground"
              onClick={() => setOpen(false)}
              aria-label="Close filters"
            >
              <X className="w-5 h-5 cursor-pointer" />
            </button>

            <h2 className="text-lg font-semibold mb-4 text-primary">Filter Meals</h2>

            <div className="space-y-4">
              <input
                name="search"
                placeholder="Search by name..."
                value={formState.search}
                onChange={handleChange}
                className="w-full p-2 rounded-md border border-border bg-input text-foreground placeholder:text-muted-foreground"
              />

              <select
                name="type"
                value={formState.type}
                onChange={handleChange}
                className="w-full p-2 rounded-md border border-border bg-input text-foreground"
              >
                <option value="">All Types</option>
                <option value="ingredient">Ingredient</option>
                <option value="kit">Kit</option>
              </select>

              <select
                name="stock"
                value={formState.stock}
                onChange={handleChange}
                className="w-full p-2 rounded-md border border-border bg-input text-foreground"
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
                  className="w-1/2 p-2 rounded-md border border-border bg-input text-foreground placeholder:text-muted-foreground"
                />
                <input
                  type="number"
                  name="maxPrice"
                  placeholder="Max Price"
                  value={formState.maxPrice}
                  onChange={handleChange}
                  className="w-1/2 p-2 rounded-md border border-border bg-input text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-between gap-3">
              <button
                type="submit"
                className="cursor-pointer flex-1 bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground font-semibold py-2 rounded-md transition-all"
              >
                Apply Filter
              </button>

              <button
                type="button"
                onClick={clearFilters}
                className="cursor-pointer flex-1 bg-muted text-muted-foreground hover:bg-destructive hover:text-destructive-foreground font-semibold py-2 rounded-md transition-all"
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

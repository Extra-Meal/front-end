import { Plus, SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import FilterModal from "@/components/ProductFilterModal";
import ProductForm from "@/components/ProductForm";
import { useGetDataWithParams } from "@/hooks/useApi";
import type { APISuccess } from "@/types/api.type";

export type MealIngredientInput = {
  ingredient: string;
  measure: string;
};

export type MealInput = {
  name: string;
  thumbnail?: string;
  category: string;
  area: string;
  instructions?: string;
  tags?: string[];
  youtube?: string;
  source?: string;
  ingredients: MealIngredientInput[];
  preparationTime?: number;
  difficulty?: "easy" | "medium" | "hard";
};

export type CreateProductInput = {
  name: string;
  type: "ingredient" | "kit";
  price: number;
  stock?: number;
  image?: string;
  visible?: boolean;
  sold?: number;
  views?: number;
  discount?: number;
  ratingAverage?: number;
  ratingCount?: number;
  ingredient?: string;
  meal?: MealInput | string;
};

type Response = {
  products: CreateProductInput[];
  pagination: {
    page: number;
    limit: number;
    totalProducts: number;
    totalPages: number;
  };
};

export default function MealsDashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const intialPage = Number(searchParams.get("page")) || 1;
  const [page, setPage] = useState(intialPage);

  const { data, isLoading } = useGetDataWithParams<APISuccess<Response>>("/products/kits");
  const totalPages = data?.data?.pagination.totalPages || 1;
  const meals = data?.data?.products || [];
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setSearchParams({ page: page.toString() });
  }, [page]);

  if (isLoading) {
    return (
      <div className="bg-background flex h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" />
          <p className="text-muted-foreground text-sm">please wait...</p>
        </div>
      </div>
    );
  }
  if (showForm) {
    return (
      <>
        <ProductForm />
        <button onClick={() => setShowForm(false)} className="bg-primary mt-4 w-full rounded py-2 text-white">
          Close
        </button>
      </>
    );
  }
  return (
    <div className="w-full">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="text-foreground text-2xl font-bold">Meals Dashboard</h1>
          <p className="text-foreground mt-2">{data?.data?.pagination.totalProducts} meals found</p>
        </div>
        <div className="mt-2 flex w-[100px] max-w-lg items-center justify-between">
          <button
            onClick={() => setShowForm(true)}
            className="text-primary hover:bg-primary/10 cursor-pointer rounded p-2"
          >
            <Plus />
          </button>
          <FilterModal />
        </div>
      </div>

      <MealsTable meals={meals} />

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="bg-primary rounded px-3 py-1 text-sm disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm">
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          className="bg-primary rounded px-3 py-1 text-sm disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

type MealsTableProps = {
  meals: CreateProductInput[];
};

function MealsTable({ meals }: MealsTableProps) {
  return (
    <div className="min-h-[69vh]">
      <table className="min-w-full border-separate border-spacing-y-4 text-center text-[14px]">
        <thead className="text-sm uppercase">
          <tr>
            <th className="px-6 py-3 text-[11px] font-semibold">#</th>
            <th className="px-6 py-3 text-[11px] font-semibold">Name</th>
            <th className="px-6 py-3 text-[11px] font-semibold">Price</th>
            <th className="px-6 py-3 text-[11px] font-semibold">Stock</th>
            <th className="px-6 py-3 text-[11px] font-semibold">Rating</th>
            <th className="px-6 py-3 text-[11px] font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {meals.length > 0 ? (
            meals.map((meal, index) => (
              <tr
                key={index}
                className="hover:bg-primary group overflow-hidden rounded-2xl shadow-sm transition-all duration-200 hover:scale-102"
              >
                <td className="rounded-l-2xl px-6 py-3">{index + 1}</td>
                <td className="px-6 py-3">{meal.name}</td>
                <td className="px-6 py-3">${meal.price.toFixed(2)}</td>
                <td className="px-6 py-3">{meal.stock ?? "N/A"}</td>
                <td className="px-6 py-3">
                  {meal.ratingAverage ?? "N/A"} ★ ({meal.ratingCount ?? 0})
                </td>
                <td className="space-x-2 rounded-r-2xl px-6 py-3">
                  <button className="rounded bg-blue-500 px-2 py-1 text-xs text-white">Edit</button>
                  <button className="bg-primary group-hover:border-background rounded px-2 py-1 text-xs text-white transition-all group-hover:border-1">
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-primary px-6 py-3 text-sm">
                No meals found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

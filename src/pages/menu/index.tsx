import { useSearchParams } from "react-router-dom";

import MealCard from "@/components/mealCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useGetDataWithParams } from "@/hooks/useApi";
import type { APISuccess } from "@/types/api.type";
import type { Meal } from "@/types/meal.type";

type Response = {
  meals: Array<Meal>;
  pagination: {
    page: number;
    limit: number;
    totalMeals: number;
    totalPages: number;
  };
};

export default function MenuPage() {
  const [params, setParams] = useSearchParams();
  const page = Number(params.get("page") || 1);

  const { data, isPending } = useGetDataWithParams<APISuccess<Response>>("/products/kits");

  const totalPages = data?.data?.pagination.totalPages || 1;
  const meals = data?.data?.products || [];

  const goToPage = (pageNumber: number) => {
    const newParams = new URLSearchParams(params);
    newParams.set("page", String(pageNumber));
    setParams(newParams);
  };

  if (isPending) {
    return <div className="container">Loading...</div>;
  }

  return (
    <div className="container space-y-8">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5">
        {meals.map((meal) => (
          <MealCard key={meal._id} meal={meal} />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={() => goToPage(Math.max(1, page - 1))} />
            </PaginationItem>

            {[...Array(totalPages)].map((_, index) => {
              const current = index + 1;
              return (
                <PaginationItem key={current}>
                  <PaginationLink isActive={current === page} onClick={() => goToPage(current)}>
                    {current}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            <PaginationItem>
              <PaginationNext onClick={() => goToPage(Math.min(totalPages, page + 1))} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}

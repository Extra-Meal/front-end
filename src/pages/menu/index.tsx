import { useSearchParams } from "react-router-dom";

import FilterModal from "@/components/ProductFilterModal";
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
import type { Product } from "@/types/product.type";

type Response = {
  products: Array<Product>;
  pagination: {
    page: number;
    limit: number;
    totalMeals: number;
    totalPages: number;
  };
};

const getPageRange = (current: number, total: number, pageSize = 4): number[] => {
  const ranges: number[][] = [];
  for (let i = 1; i <= total; i += pageSize) {
    ranges.push(Array.from({ length: Math.min(pageSize, total - i + 1) }, (_, j) => i + j));
  }
  return ranges.find((range) => range.includes(current)) || [];
};

export default function MenuPage() {
  const [params, setParams] = useSearchParams();
  const page = Number(params.get("page") || 1);

  const { data, isPending } = useGetDataWithParams<APISuccess<Response>>("/products/kits");

  const totalPages = data?.data?.pagination.totalPages || 1;
  const products = data?.data?.products || [];

  const goToPage = (pageNumber: number) => {
    const newParams = new URLSearchParams(params);
    newParams.set("page", String(pageNumber));
    setParams(newParams);
  };

  const currentRange = getPageRange(page, totalPages);

  if (isPending) {
    return <div className="container">Loading...</div>;
  }

  return (
    <div className="container space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-primary text-2xl font-semibold">Meals</h1>
        <FilterModal />
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5">
        {products.map((product) => (
          <MealCard key={product._id} meal={product.meal} />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={() => goToPage(Math.max(1, page - 1))} />
            </PaginationItem>

            {currentRange[0] > 1 && (
              <PaginationItem>
                <PaginationLink
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    goToPage(currentRange[0] - 1);
                  }}
                >
                  ...
                </PaginationLink>
              </PaginationItem>
            )}

            {currentRange.map((num) => (
              <PaginationItem key={num}>
                <PaginationLink
                  to="#"
                  isActive={num === page}
                  onClick={(e) => {
                    e.preventDefault();
                    goToPage(num);
                  }}
                >
                  {num}
                </PaginationLink>
              </PaginationItem>
            ))}

            {currentRange[currentRange.length - 1] < totalPages && (
              <PaginationItem>
                <PaginationLink
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    goToPage(currentRange[currentRange.length - 1] + 1);
                  }}
                >
                  ...
                </PaginationLink>
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationNext onClick={() => goToPage(Math.min(totalPages, page + 1))} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}

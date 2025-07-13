import FilterModal from "@/components/ProductFilterModal";
import MealCard from "@/components/mealCard";
import PaginationComponent from "@/components/paginationComponent";
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

export default function MenuPage() {
  const { data, isPending } = useGetDataWithParams<APISuccess<Response>>("/products/kits");

  const totalPages = data?.data?.pagination.totalPages || 1;
  const products = data?.data?.products || [];

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
          <MealCard key={product._id} product={product} />
        ))}
      </div>

      <PaginationComponent totalPages={totalPages} />
    </div>
  );
}

import IngredientCard from "@/components/ingredientCard";
import PaginationComponent from "@/components/paginationComponent";
import { useGetDataWithParams } from "@/hooks/useApi";
import type { APISuccess } from "@/types/api.type";
import type { Product } from "@/types/product.type";
import HeroSubPage from "@/components/heroSubPage";
type Response = {
  products: Array<Product>;
  pagination: {
    page: number;
    limit: number;
    totalIngredients: number;
    totalPages: number;
  };
};
export default function IngredientsPage() {
  const { data, isLoading, isError } = useGetDataWithParams<APISuccess<Response>>("/products/ingredients");

  if (isLoading) {
    return <div className="container">Loading...</div>;
  }
  if (isError) {
    return <div className="container">Error loading ingredients.</div>;
  }
  const { products, pagination } = data?.data || {};
  return (
    <>
 <HeroSubPage title="Ingredients" />
      <main className="container space-y-10 py-20">
        <section className="grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-4">
          {products?.map((product) => <IngredientCard key={product._id} product={product} />)}
        </section>
        <PaginationComponent totalPages={pagination?.totalPages} />
      </main>
    </>
  );
}

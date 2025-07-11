import IngredientCard from "@/components/ingredientCard";
import PaginationComponent from "@/components/paginationComponent";
import { useGetDataWithParams } from "@/hooks/useApi";
import type { APISuccess } from "@/types/api.type";
import type { Ingredient } from "@/types/ingredient.type";

type Response = {
  ingredients: Array<Ingredient>;
  pagination: {
    page: number;
    limit: number;
    totalIngredients: number;
    totalPages: number;
  };
};
export default function IngredientsPage() {
  const { data, isLoading, isError } = useGetDataWithParams<APISuccess<Response>>("/ingredient");

  if (isLoading) {
    return <div className="container">Loading...</div>;
  }
  if (isError) {
    return <div className="container">Error loading ingredients.</div>;
  }
  const { ingredients, pagination } = data?.data || {};
  return (
    <>
      <header className="bg-primary py-10">
        <div className="container space-y-3">
          <h1 className="text-3xl font-semibold">Ingredients</h1>
          <p className="max-w-4xl">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam sit quidem dolore, perspiciatis vel
            repudiandae tenetur expedita quisquam rem cupiditate, odio id molestiae ad alias labore placeat qui illum
            laboriosam.
          </p>
        </div>
      </header>
      <main className="container space-y-10 py-20">
        <section className="grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-4">
          {ingredients?.map((ingredient) => <IngredientCard key={ingredient._id} ingredient={ingredient} />)}
        </section>
        <PaginationComponent totalPages={pagination?.totalPages} />
      </main>
    </>
  );
}

import { Link, useParams } from "react-router";

import CartButton from "@/components/cartButton";
import { Badge } from "@/components/ui/badge";
import WishListButton from "@/components/wishListButton";
import { useGetData } from "@/hooks/useApi";
import { currencyFormatter } from "@/lib/currency";
import { getYouTubeEmbedUrl } from "@/lib/youtube";
import type { APISuccess } from "@/types/api.type";
import type { Product } from "@/types/product.type";

export default function MealPage() {
  const { mealId } = useParams();
  const { data, isLoading } = useGetData<APISuccess<Product>>(`/products/${mealId}`);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!data) {
    return <div>Meal not found</div>;
  }
  const product = data?.data;
  const { meal } = product;
  if (!meal) {
    return <div>Meal details not available</div>;
  }
  return (
    <main className="container py-10">
      <section className="grid grid-cols-1 gap-5 md:grid-cols-[3fr_2fr]">
        <aside className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-semibold">{product.name}</h1>
            {meal.tags && meal.tags.length > 0 && (
              <div>
                <Badge>{meal.tags.join(", ")}</Badge>
              </div>
            )}
          </div>
          <div className="mt-2 flex flex-col gap-2">
            <p className="text-secondary">{meal.category.name}</p>
            <p className="text-secondary">{meal.area.name}</p>
            {meal.ingredients?.length > 0 && (
              <div>
                <h2 className="text-primary mt-3 text-xl font-semibold">Ingredients:</h2>
                <div className="mt-1 flex flex-wrap gap-3">
                  {meal.ingredients.map(({ ingredient, measure }, idx) => (
                    <Link
                      to={`/ingredients/${ingredient._id}`}
                      key={idx}
                      className="bg-primary/20 rounded-lg px-3 py-1 text-sm"
                    >
                      {ingredient.name} - {measure || "as needed"}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            <p className="text-primary ml-auto text-3xl font-extrabold">{currencyFormatter(product.price)}</p>

            <div className="flex-1" />
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <WishListButton altText="Remove from Wish List" productId={product._id} className="w-full">
                Add to Wish List{" "}
              </WishListButton>
              <CartButton productId={product._id} />
            </div>
          </div>
        </aside>

        <aside className="row-start-1 md:row-start-auto">
          <img className="aspect-[4/3] rounded-lg" src={product.image} alt={product.name} />
        </aside>
      </section>
      <section>
        <h2 className="text-primary mt-3 text-xl font-semibold">How to Prepare it</h2>
        <ul className="mt-4 list-decimal pl-5">
          {meal.instructions?.split(". ").map((sentence, idx) => (
            <li key={idx} className="pl-1 leading-8">
              {sentence.trim()}
            </li>
          ))}
        </ul>
        {meal.youtube && (
          <>
            <h2 className="text-primary mt-3 text-xl font-semibold">Watch the Preparation</h2>
            <iframe
              className="mt-4 aspect-video w-full max-w-1/2 rounded-lg"
              src={getYouTubeEmbedUrl(meal.youtube) || ""}
              title="YouTube video player"
              allowFullScreen
            />
          </>
        )}
      </section>
    </main>
  );
}

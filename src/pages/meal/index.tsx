import { useParams } from "react-router";

import { Badge } from "@/components/ui/badge";
import { useGetData } from "@/hooks/useApi";
import { currencyFormatter } from "@/lib/currency";
import type { APISuccess } from "@/types/api.type";
import type { Product } from "@/types/product.type";

function getYouTubeEmbedUrl(url: string): string | null {
  const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu.be\/)([\w\-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

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
    <main className="container">
      <section className="grid grid-cols-1 gap-4 md:grid-cols-[3fr_2fr]">
        <aside>
          <div className="flex justify-between">
            <h1 className="text-xl font-semibold">{product.name}</h1>
            <p className="text-primary text-3xl font-semibold">{currencyFormatter(product.price)}</p>
          </div>
          <p className="text-secondary">{meal.category.name}</p>
          <p className="text-secondary">{meal.area.name}</p>
          <h2 className="text-primary mt-3 text-xl font-semibold">How to Prepare it</h2>
          <ul className="max-w-[40rem]">
            {meal.instructions?.split(". ").map((sentence, idx) => (
              <li key={idx} className="leading-8">
                {idx + 1}- {sentence.trim()}
              </li>
            ))}
          </ul>
          {meal.ingredients?.length > 0 && (
            <div>
              <h2 className="text-primary mt-3 text-xl font-semibold">Ingredients:</h2>
              <ul className="flex flex-wrap gap-3">
                {meal.ingredients.map(({ ingredient, measure }, idx) => (
                  <li key={idx}>
                    {ingredient.name} - {measure || "as needed"}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {meal.tags && meal.tags.length > 0 && (
            <div>
              <Badge>{meal.tags.join(", ")}</Badge>
            </div>
          )}
          {meal.youtube && (
            <iframe
              className="mt-4 aspect-video w-full rounded-lg"
              src={getYouTubeEmbedUrl(meal.youtube) || ""}
              title="YouTube video player"
              allowFullScreen
            />
          )}
        </aside>

        <aside className="row-start-1 md:row-start-auto">
          <img className="aspect-[4/3] rounded-lg" src={product.image} alt={product.name} />
        </aside>
      </section>
    </main>
  );
}

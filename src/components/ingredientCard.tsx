import type { Ingredient } from "@/types/ingredient.type";

import { Button } from "./ui/button";
import WishListButton from "./wishListButton";

type IngredientCardProps = {
  ingredient: Ingredient;
};
export default function IngredientCard({ ingredient }: IngredientCardProps) {
  return (
    <div className="bg-accent/20 relative overflow-clip rounded-2xl pt-40 shadow-2xl" key={ingredient._id}>
      <img
        src={`https://www.themealdb.com/images/ingredients/${ingredient.name}.png`}
        alt={ingredient.name}
        className="absolute inset-0 -z-20 h-full w-full rounded-lg object-cover"
      />
      <div className="relative flex h-full flex-col gap-4 p-4">
        <div className="bg-background/90 absolute inset-0 -z-10 h-full w-full rounded-lg mask-t-from-28" />
        <div className="mt-2">
          <h2 className="text-xl font-semibold">{ingredient.name}</h2>
          <p className="text-secondary line-clamp-2">{ingredient.description}</p>
        </div>
        <div className="flex-1"></div>
        <div className="flex justify-between">
          {ingredient.type && (
            <span className="bg-secondary/50 text-primary text-shadow-2xl mt-2 rounded-full px-3 py-1 text-xs font-semibold">
              {ingredient.type}
            </span>
          )}
          <div className="flex items-center gap-2">
            <WishListButton productId={ingredient._id} />
            <Button>Add to Cart</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

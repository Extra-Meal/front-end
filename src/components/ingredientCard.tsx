import { currencyFormatter } from "@/lib/currency";
import type { Product } from "@/types/product.type";

import CartButton from "./cartButton";
import WishListButton from "./wishListButton";

type IngredientCardProps = {
  product: Product;
};
export default function IngredientCard({ product }: IngredientCardProps) {
  const ingredient = product.ingredient!;
  return (
    <div className="bg-accent/20 relative overflow-clip rounded-2xl pt-40 shadow-2xl">
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
          <div className="flex flex-col">
            <span className="text-2xl font-semibold">{currencyFormatter(product.price)}</span>
            <div className="text-secondary text-sm">per Unit</div>
          </div>
          <div className="flex items-center gap-2">
            <WishListButton productId={product._id} />
            <CartButton productId={product._id}>Add to Cart</CartButton>
          </div>
        </div>
      </div>
    </div>
  );
}

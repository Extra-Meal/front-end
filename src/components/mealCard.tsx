import { Link } from "react-router";

import { currencyFormatter } from "@/lib/currency";
import type { Meal } from "@/types/meal.type";
import type { Product } from "@/types/product.type";

import CartButton from "./cartButton";
import WishListButton from "./wishListButton";

type Props = {
  product: Product;
};
export default function MealCard({ product }: Props) {
  const meal: Meal = product.meal!;
  return (
    <Link to={`/menu/${product._id}`} className="relative grid overflow-clip rounded-lg shadow-2xl">
      <div className="relative -z-10">
        <img className="aspect-video w-full object-cover" src={meal.thumbnail} alt={meal.name} />
        <div className="absolute inset-0 bg-black opacity-30" />
      </div>
      <main className="bg-background -mt-10 space-y-2 overflow-clip rounded-t-2xl p-4">
        <h3 className="text-xl font-semibold">{meal.name}</h3>
        <div className="flex items-center justify-between">
          <span className="text-primary text-xl font-bold">{currencyFormatter(product.price)}</span>
          <span className="text-sm text-gray-500">In Stock: {product.stock}</span>
        </div>
        <aside className="flex items-end justify-between gap-3">
          <h4 className="text-sm">{meal.category.name}</h4>
          <h5 className="text-sm text-gray-500">{meal.area.name}</h5>
        </aside>
        <p className="line-clamp-2 text-sm text-gray-500">{meal.instructions}</p>
        <CartButton productId={product._id} className="flex w-full justify-center gap-2" />
      </main>
      <WishListButton productId={product._id} className="absolute top-4 right-4 rounded-full" />
    </Link>
  );
}

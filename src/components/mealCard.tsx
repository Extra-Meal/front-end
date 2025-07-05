import { Heart, ShoppingCart } from "lucide-react";

import type { Meal } from "@/types/meal.type";

import { Button } from "./ui/button";

type Props = {
  meal: Meal;
};
export default function MealCard({ meal }: Props) {
  return (
    <section className="relative grid overflow-clip rounded-lg shadow-2xl">
      <div className="relative -z-10">
        <img className="aspect-video w-full object-cover" src={meal.thumbnail} alt={meal.name} />
        <div className="absolute inset-0 bg-black opacity-30" />
      </div>
      <main className="bg-background -mt-10 space-y-4 overflow-clip rounded-t-2xl p-4">
        <h3 className="text-xl font-semibold">{meal.name}</h3>
        <aside className="flex items-end justify-between gap-3">
          <h4 className="text-sm">{meal.category.name}</h4>
          <h5 className="text-sm text-gray-500">{meal.area.name}</h5>
        </aside>
        <p className="line-clamp-2 text-sm text-gray-500">{meal.instructions}</p>
        <Button className="flex w-full justify-center gap-2">
          <span>Add to cart</span>
          <ShoppingCart />
        </Button>
      </main>
      <Button variant={"secondary"} size={"icon"} className="absolute top-4 right-4 rounded-full">
        <Heart />
      </Button>
    </section>
  );
}

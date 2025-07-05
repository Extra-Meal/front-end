import MealCard from "@/components/mealCard";
import { useGetData } from "@/hooks/useApi";
import type { APISuccess } from "@/types/api.type";
import type { Meal } from "@/types/meal.type";

type Response = {
  meals: Array<Meal>;
  pagination: {
    page: number;
    limit: number;
    totalMeals: number;
    totalPages: number;
  };
};
export default function MenuPage() {
  const { data, isPending } = useGetData<APISuccess<Response>>("/meal", {});
  const { meals } = data?.data || {};
  if (isPending) {
    return <div className="container">Loading...</div>;
  }
  return (
    <div className="container grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5">
      {meals?.map((meal) => <MealCard key={meal._id} meal={meal} />)}
    </div>
  );
}

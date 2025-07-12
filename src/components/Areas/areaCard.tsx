import { useEffect, useState } from "react";

import { getRequest } from "@/lib/api";

import img from "../../assets/meal.jfif";
import type { Area } from "../../types/area.type";
import type { Meal } from "../../types/meal.type";

function AreaCard({ area }: { area: Area }) {
  const [matchingMeal, setMatchingMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAll() {
      const first = await getRequest<{
        success: boolean;
        message: string;
        data: {
          meals: Meal[];
          pagination: { totalPages: number };
        };
      }>("http://localhost:3000/api/meal");

      let allMeals = first.data.meals;
      const totalPages = first.data.pagination.totalPages;

      for (let page = 2; page <= totalPages; page++) {
        const res = await getRequest<{
          success: boolean;
          message: string;
          data: {
            meals: Meal[];
          };
        }>(`http://localhost:3000/api/meal?page=${page}`);

        allMeals = allMeals.concat(res.data.meals);
      }

      const found = allMeals.find((meal) => meal.area.name === area.name);

      setMatchingMeal(found || null);
      setLoading(false);
    }

    fetchAll();
  }, [area.name]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="area relative w-fit">
      <div className="box relative w-fit overflow-hidden rounded-3xl">
        <img src={matchingMeal?.thumbnail || img} alt={area.name} className="h-70 w-65 rounded-3xl" />
      </div>
      <span className="caption text-3xl font-bold">{area.name} Plates</span>
    </div>
  );
}

export default AreaCard;

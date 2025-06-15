import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";

interface Meal {
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strTags: string | null;
  strArea: string;
}

export default function Meals() {
  const [mealsWithTags, setMealsWithTags] = useState<{ meal: Meal; tags: string[] | null }[]>([]);

  useEffect(() => {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/search.php?s=")
      .then((response) => {
        const meals: Meal[] = response.data.meals.slice(0, 6) || [];

        const taggedMeals = meals.map((meal) => ({
          meal,
          tags: meal.strTags ? meal.strTags.split(",").map((tag) => tag.trim()) : null,
        }));

        setMealsWithTags(taggedMeals);
      })
      .catch((error) => {
        console.error("Error fetching meals:", error);
      });
  }, []);

  return (
    <div className="bg-secondary/5">
      <div className="container">
        <div className="meals flex flex-col items-center gap-5 py-20">
          <span className="text-secondary md:text-md block transform text-center text-sm font-light uppercase">
            BestSeller Meals
          </span>
          <h2 className="before:bg-primary relative pb-4 text-center text-xl font-bold before:absolute before:bottom-0 before:left-1/2 before:h-1 before:w-1/4 before:-translate-x-1/2 before:content-[''] md:text-4xl">
            Meet the Stars of the Menu
          </h2>
          <div className="meals-box mt-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {mealsWithTags.map(({ meal, tags }) => (
                <div key={meal.strMeal} className="meal rounded-2xl border-1 border-primary flex flex-col  overflow-hidden">
                  <div className="tags flex flex-wrap gap-2 bg-primary  p-3 ">
                    {tags
                          ? tags.map((tag) => (
                              <span key={tag} className="text-white text-xs mr-2">
                                # {tag}
                              </span>

                            ))
                          : <span className="text-xs italic text-white">New Item</span>}
                  </div>
                  <div className="content flex gap-4 p-3">
                    <div className="thumb">
                        <img src={meal.strMealThumb} alt="" className="w-15 h-15 md:w-20 mdh-20 rounded-full" />
                    </div>
                    <div className="info flex justify-between gap-7 flex-1">
                        <div className="title flex flex-col gap-1 w-full">
                            <div className="flex gap-4 items-center "> 
                                <h3 className="text-foreground font-bold text-xl md:text-2xl">{meal.strMeal}</h3>
                                <div className="border-foreground my-4 border-t border-dashed flex-grow-1" />
                                <h3 className="text-primary font-extrabold ">10 LE</h3>
                            </div>
                            <p className="text-foreground  text-sm md:text-md">Try this delicious {meal.strCategory} recipe from {meal.strArea}!</p>
                        </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <Button>
              <Link to="/meals">Order Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "../ui/button";

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
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {mealsWithTags.map(({ meal, tags }) => (
                <div
                  key={meal.strMeal}
                  className="meal border-primary flex flex-col overflow-hidden rounded-2xl border-1"
                >
                  <div className="tags bg-primary flex flex-wrap gap-2 p-3">
                    {tags ? (
                      tags.map((tag) => (
                        <span key={tag} className="mr-2 text-xs text-white">
                          # {tag}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-white italic">New Item</span>
                    )}
                  </div>
                  <div className="content flex gap-4 p-3">
                    <div className="thumb">
                      <img src={meal.strMealThumb} alt="" className="mdh-20 h-15 w-15 rounded-full md:w-20" />
                    </div>
                    <div className="info flex flex-1 justify-between gap-7">
                      <div className="title flex w-full flex-col gap-1">
                        <div className="flex items-center gap-4">
                          <h3 className="text-foreground text-xl font-bold md:text-2xl">{meal.strMeal}</h3>
                          <div className="border-foreground my-4 flex-grow-1 border-t border-dashed" />
                          <h3 className="text-primary font-extrabold">10 LE</h3>
                        </div>
                        <p className="text-foreground md:text-md text-sm">
                          Try this delicious {meal.strCategory} recipe from {meal.strArea}!
                        </p>
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

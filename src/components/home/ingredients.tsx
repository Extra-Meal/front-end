import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "../ui/button";

interface Ingredient {
  strIngredient: string;
  strDescription: string;
}

export default function Ingredients() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/list.php?i=list")
      .then((response) => {
        setIngredients(response.data.meals.slice(0, 3));
      })
      .catch((error) => {
        console.error("Error fetching ingredients:", error);
      });
  }, []);

  return (
    <div className="py-20">
      <div className="container">
        <div className="ingredients flex flex-col items-center gap-5">
          <span className="text-secondary md:text-md block transform text-center text-sm font-light uppercase">
            Organic Shop
          </span>
          <h2 className="before:bg-primary relative pb-4 text-center text-xl font-bold before:absolute before:bottom-0 before:left-1/2 before:h-1 before:w-1/4 before:-translate-x-1/2 before:content-[''] md:text-4xl">
            Our Organic Products
          </h2>
          <div className="ingredients-list mt-2 w-full">
            <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
              {ingredients.map((ingredient) => (
                <div className="product-item relative z-10 mt-[120px] mb-[80px] px-[35px] text-center">
                  <div className="product-img -mb-[120px] flex -translate-y-[140px] transform items-end justify-center">
                    <Link to={`/ingredients/${ingredient.strIngredient}`}>
                      <img
                        src={`https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png`}
                        alt=""
                        className="h-70 w-70 translate-y-0 transform object-cover transition-all"
                      />
                    </Link>
                  </div>
                  <div className="product-content px-[20px] pb-[40px]">
                    <h4 className="title mb-[20px] transform text-3xl font-bold uppercase">
                      <Link to={`/ingredients/${ingredient.strIngredient}`}>{ingredient.strIngredient}</Link>
                    </h4>
                    <h6 className="price text-primary mb-2 text-2xl">$4.99</h6>
                    <p className="desc text-muted-foreground text-base font-light">
                      {ingredient.strDescription.split(".")[0]}.
                    </p>
                  </div>
                  <div className="product-shape absolute top-0 left-0 -z-1 h-full w-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 401 314"
                      preserveAspectRatio="none"
                      fill="rgba(175, 62, 62, 0.1)"
                      className="absolute block h-full w-full overflow-visible"
                    >
                      <path
                        d="M331.5,1829h361a20,20,0,0,1,20,20l-29,274a20,20,0,0,1-20,20h-292a20,20,0,0,1-20-20l-40-274A20,20,0,0,1,331.5,1829Z"
                        transform="translate(-311.5 -1829)"
                      ></path>
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <Button>
              <Link to="/ingredients">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

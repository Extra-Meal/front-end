import { GiMeal } from "react-icons/gi";
import { TbRosetteDiscountFilled } from "react-icons/tb";

import { Button } from "../ui/button";
import Receipt from "./Receipt";

export default function Firstorder() {
  return (
    <div className="bg-primary/9 relative overflow-hidden">
      <div id="parallelogram" className="bg-primary w-8/10"></div>
      <TbRosetteDiscountFilled className="text-background/50 absolute -top-30 right-0 md:text-[400px] lg:text-[500px]" />
      <div className="overlay absolute top-0 left-0 flex h-full w-full justify-center">
        <div className="container">
          <div className="firstorder flex h-full flex-wrap justify-between gap-7 py-5 md:flex-nowrap">
            <div className="content flex w-full flex-col justify-center gap-5 md:w-1/2">
              <GiMeal className="text-4xl lg:text-6xl" />
              <h2 className="text-2xl font-bold sm:text-3xl lg:text-5xl">Tastes Better When It’s Discounted !</h2>
              <p className="sm:text-lg lg:text-xl">
                Start your Mealify journey with a tasty treat ,get <span className="font-extrabold">15% off</span> your
                first order!
              </p>
              <p className="sm:text-lg lg:text-xl">
                {" "}
                Delicious meals, delivered fast. Now with extra savings on your plate! No code needed. Just order, and
                the discount is automatically applied!
              </p>
              <div>
                <Button className="bg-background hover:bg-background/90 text-foreground">Order Now</Button>
              </div>
            </div>
            <div className="receipt flex flex-1 flex-col items-center justify-center gap-5 md:items-start">
              <div className="w-3/4 md:w-full lg:w-1/2">
                <Receipt
                  items={[
                    { name: "Pasta", quantity: 2, price: 3.5 },
                    { name: "Salmon", quantity: 1, price: 7.0 },
                    { name: "Avocado", quantity: 3, price: 1.2 },
                  ]}
                  orderId="M-30241"
                  taxRate={0.02}
                  discount={{ type: "percent", value: 15 }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

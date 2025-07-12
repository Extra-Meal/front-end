import CircleType from "circletype";
import { useLayoutEffect, useRef } from "react";
import { GiMeal } from "react-icons/gi";
import { Link } from "react-router";

import market from "../../assets/market2.jfif";
import meal from "../../assets/meal.jfif";
import { Button } from "../ui/button";

export default function AboutUs() {
  const textRef = useRef(null);

  useLayoutEffect(() => {
    if (textRef.current) {
      new CircleType(textRef.current).radius(10).dir(1).forceHeight(false);
    }
  }, []);

  return (
    <div className="about pt-30 pb-10 lg:-mb-10 lg:pb-0">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="banner relative -mb-10 flex justify-center md:mb-0">
            <div className="relative h-3/4 w-3/4 md:w-1/2">
              <img src={market} alt="" className="h-full w-full" />
              <img src={meal} alt="" className="absolute top-40 -right-10 h-1/2 w-50 md:top-30 md:-right-20 md:w-60" />
              <div className="rotate-infinite absolute -top-20 -left-10 h-50 w-50 rounded-full md:-left-20">
                <h2
                  ref={textRef}
                  className="text-primary transform text-center text-sm font-light tracking-widest whitespace-nowrap capitalize"
                >
                  {" "}
                  Feed Your Cravings . One Click at a Time . Mealify to the Rescue .
                </h2>
              </div>
            </div>
          </div>
          <div className="content flex w-full flex-col gap-5 md:w-3/4">
            <GiMeal className="text-primary text-4xl" />
            <span className="text-secondary md:text-md transform text-sm font-light uppercase">
              Welcome to Mealify Grocery Store
            </span>
            <h2 className="text-2xl font-bold md:text-4xl">Delicious Decisions, Powered by Mealify.</h2>
            <p className="md:text-md text-sm">
              An Intelligent partner for smarter grocery shopping and inspired home cooking. Mealify blends technology
              and taste to simplify your entire food journey, from planning your meals to stocking your pantry.
            </p>
            <p className="md:text-md text-sm">
              Whether you're a busy parent, a health-conscious foodie, or someone looking to reduce food waste and save
              money, Mealify helps you shop with intention and cook with confidence. It's not just a grocery app — it's
              a smarter way to eat well every day.
            </p>
            <div>
              <Button>
                <Link to="/about">Read More About Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

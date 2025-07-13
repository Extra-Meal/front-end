// import "@fontsource/dancing-script";
import CircleType from "circletype";
import { useLayoutEffect, useRef } from "react";

import sandwich from "../../assets/2-Ph.png";
import bg from "../../assets/bg.jfif";
import { Button } from "../ui/button";
import { Link } from "react-router";

export default function Hero() {
  const textRef = useRef(null);

  useLayoutEffect(() => {
    if (textRef.current) {
      new CircleType(textRef.current).radius(160).dir(1).forceHeight(false);
    }
  }, []);

  return (
    <div
      className="relative -mt-20 flex h-[100dvh] flex-col items-center justify-center bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div
        className="overlay absolute top-0 left-0 flex h-full w-full items-center justify-center"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.82)" }}
      >
        <div className="container">
          <div className="content flex flex-col items-center justify-center gap-5">
            <h1 className="text-accent-foreground font-dancing flex items-center text-6xl font-bold sm:text-7xl md:text-9xl lg:text-[220px]">
              H
              <div className="relative">
                <div id="lock" className="relative z-50">
                  <img
                    src={sandwich}
                    alt="burger"
                    className="absolute -top-5 left-0 h-25 w-30 sm:h-32 md:-top-9 md:-left-1 md:h-40 md:w-80 lg:h-50"
                  />
                </div>
                <h2
                  ref={textRef}
                  className="deco text-primary absolute -top-18 left-1/2 inline-block -translate-x-1/2 transform text-center text-4xl font-bold sm:-top-20 sm:text-5xl md:-top-26"
                  style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
                >
                  Are you
                </h2>
              </div>
              NGRY?
            </h1>
            <p className="text-accent-foreground md:2-3/4 text-md text-center sm:text-xl lg:w-1/2">
              With Mealify, you can browse curated meals, add all the ingredients with one click, or build your own dish
              from scratch. It’s your kitchen, upgraded.
            </p>
            <Button>
               <Link to="/menu">Make your meal</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

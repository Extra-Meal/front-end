import { GiMeal } from "react-icons/gi";

import bg from "../assets/categories.jpg";

function HeroSubPage({ title }: { title: string }) {
  return (
    <div
      className="heroCategory bg-background relative isolate mb-20 h-100 w-full shadow"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "bottom",
      }}
    >
      <div className="absolute inset-0 -z-10 bg-black/50" />
      <div className="info container flex h-full flex-col items-center justify-center">
        <GiMeal className="text-primary text-6xl" />
        <h2 className="text-primary text-7xl font-bold">{title}</h2>
      </div>
    </div>
  );
}

export default HeroSubPage;

import AboutUs from "@/components/home/aboutus";
import Areas from "@/components/home/areas";
import Firstorder from "@/components/home/firstorder";
import Hero from "@/components/home/hero.tsx";
import Ingredients from "@/components/home/ingredients";
import Meals from "@/components/home/meals";
import SmartAi from "@/components/home/smartAi";

function Home() {
  return (
    <div>
      <Hero />
      <AboutUs />
      <Meals />
      <Firstorder />
      <Ingredients />
      <Areas />
      <SmartAi />
    </div>
  );
}

export default Home;

import { GiMeal } from "react-icons/gi";
import { Button } from "../ui/button";
import { Link } from "react-router";
import kitchen from "../../assets/kitchen.jfif";

export default function SmartAi (){

    return (
        <div style={{ backgroundImage: `url(${kitchen})`  }} className="bg-cover bg-no-repeat bg-fixed bg-center" >
            <div className="overlay bg-black/60">
                <div className="container">
                    <div className="smart flex flex-col items-center gap-5 py-20 ">
                        <GiMeal className="text-4xl lg:text-6xl text-primary" />
                        <h2 className="text-2xl font-bold sm:text-3xl lg:text-5xl text-white">Your Brain’s on Break. Let Ours Cook.</h2>
                        <p className="text-white text-lg w-1/2 text-center">Tired of food indecision ? Mealify uses AI to serve up recipe suggestions, smart shopping lists, and meal plans that match your mood.</p>
                        <Button>
                            <Link to="/ai">Start Cooking</Link>
                        </Button>
                    </div>
            </div>
            </div>
        </div>
    );
}
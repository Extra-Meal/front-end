import img from "../../assets/meal.jfif";
import type { Area } from "../../types/area.type";

function AreaCard({ area }: { area: Area }) {
  return (
    <div className="area relative w-fit">
      <div className="box relative w-fit overflow-hidden rounded-3xl">
        <img src={img} alt={area.name} className="h-70 w-65 rounded-3xl" />
      </div>
      <span className="caption text-3xl font-bold">{area.name} Plates</span>
    </div>
  );
}

export default AreaCard;

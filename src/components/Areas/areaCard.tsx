import img from "../../assets/meal.jfif";

function AreaCard({ area }: any) {
  return (
    <div className="area relative w-fit">
      <div className="box relative w-fit overflow-hidden rounded-3xl">
        <img src={img} alt="" className="h-70 w-65 rounded-3xl" />
      </div>
      <span className="caption text-3xl font-bold">{area.strArea} Plates</span>
    </div>
  );
}

export default AreaCard;

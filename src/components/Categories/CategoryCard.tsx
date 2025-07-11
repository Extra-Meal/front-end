import { Coffee } from "lucide-react";

import areas from "../../assets/areas.jfif";

function CategoryCard() {
  return (
    <div>
      <div className="service-item relative mb-30 overflow-hidden rounded-2xl">
        <img src={areas} alt="" className="w-full" />
        <div className="content absolute bottom-0 left-0 z-10 flex w-full flex-col items-center gap-3 pb-[50px] text-center transition-all duration-400">
          <Coffee className="text-white transition-all duration-400" size={40} />
          <div className="title">
            <a href="#" className="text-4xl font-bold text-white">
              <span>-</span> Coffee <span>-</span>
            </a>
          </div>
          <p className="text-white transition-all duration-400">
            Alienum phaedrum torquatos nec eu, vis detraxit periculis ex.
          </p>
        </div>
      </div>
    </div>
  );
}

export default CategoryCard;

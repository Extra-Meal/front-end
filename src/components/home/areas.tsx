import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import "swiper/css";
import { A11y, Autoplay, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import img from "../../assets/meal.jfif";
import { Button } from "../ui/button";

interface Area {
  strArea: string;
}

export default function Areas() {
  const [areas, setAreas] = useState<Area[]>([]);

  useEffect(() => {
    axios.get("https://www.themealdb.com/api/json/v1/1/list.php?a=list").then((response) => {
      setAreas(response.data.meals.slice(0, 10));
    });
  }, []);

  return (
    <div className="bg-secondary/5 py-20">
      <div className="container">
        <div className="areas flex flex-col items-center gap-5">
          <span className="text-secondary md:text-md block transform text-center text-sm font-light uppercase">
            Different Areas for Different Meals
          </span>
          <h2 className="before:bg-primary relative pb-4 text-center text-xl font-bold before:absolute before:bottom-0 before:left-1/2 before:h-1 before:w-1/4 before:-translate-x-1/2 before:content-[''] md:text-4xl">
            Craving culture ? We've got it on a plate !
          </h2>
          <div className="areas-meals mt-2 w-full">
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
              autoplay={{ delay: 2000 }}
              spaceBetween={20}
              slidesPerView={5}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                },
                640: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 3,
                },
                1024: {
                  slidesPerView: 4,
                },
                1280: {
                  slidesPerView: 5,
                },
              }}
            >
              {areas.map((area) => (
                <SwiperSlide key={area.strArea} style={{ display: "flex", justifyContent: "center" }}>
                  <div className="area relative w-fit">
                    <div className="box relative w-fit overflow-hidden rounded-3xl">
                      <img src={img} alt="" className="h-70 w-65 rounded-3xl" />
                    </div>
                    <span className="caption text-3xl font-bold">{area.strArea} Plates</span>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div>
            <Button>
              <Link to="/areas">View All</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

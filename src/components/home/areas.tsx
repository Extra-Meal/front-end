
import { Link } from "react-router";
import { A11y, Autoplay, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

import { useGetData } from "@/hooks/useApi";
import type { Area } from "@/types/area.type";

import AreaCard from "../Areas/areaCard";
import { Button } from "../ui/button";

export default function Areas() {
  const { data, isLoading, error, isError } = useGetData<{
    success: boolean;
    message: string;
    data: Area[];
  }>("http://localhost:3000/api/areas");
  console.log(data);
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error?.data.message}</p>;

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
              {data?.data?.map((area) => (
                <SwiperSlide key={area.name} style={{ display: "flex", justifyContent: "center" }}>
                  <AreaCard area={area} />
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

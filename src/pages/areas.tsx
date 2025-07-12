import AreaCard from "@/components/Areas/areaCard";
import HeroSubPage from "@/components/heroSubPage";
import { useGetData } from "@/hooks/useApi";
import type { Area } from "@/types/area.type";

function Areas() {
  const { data, isLoading, error, isError } = useGetData<{
    success: boolean;
    message: string;
    data: Area[];
  }>("/areas");
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error?.data.message}</p>;

  return (
    <div>
      <HeroSubPage title="Areas" />
      <div className="container">
        <div className="container">
          <div className="grid grid-cols-5 gap-x-6 gap-y-7">
            {data?.data?.map((area) => <AreaCard key={area.name} area={area} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Areas;

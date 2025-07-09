import AreaCard from "@/components/Areas/areaCard";
import HeroSubPage from "@/components/heroSubPage";

function Areas() {
  return (
    <div>
      <HeroSubPage title="Areas" />
      <div className="container">
        <div className="grid grid-cols-5 gap-5">
          {/* <AreaCard/>
            <AreaCard/>
            <AreaCard/> */}
        </div>
      </div>
    </div>
  );
}

export default Areas;

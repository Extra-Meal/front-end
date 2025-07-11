import CategoryCard from "@/components/Categories/CategoryCard";
import HeroSubPage from "@/components/heroSubPage";

function Categories() {
  return (
    <div>
      <HeroSubPage title="Categories" />
      <div className="container">
        <div className="grid grid-cols-5 gap-5">
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
        </div>
      </div>
    </div>
  );
}

export default Categories;

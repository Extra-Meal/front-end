import CategoryCard from "@/components/Categories/CategoryCard";
import HeroSubPage from "@/components/heroSubPage";
import { useGetData } from "@/hooks/useApi";
import type { Category } from "@/types/category.type";

function Categories() {
  const { data, isLoading, error, isError } = useGetData<{
    success: boolean;
    message: string;
    data: Category[];
  }>("http://localhost:3000/api/category");
  console.log(data);
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error?.data.message}</p>;

  return (
    <div>
      <HeroSubPage title="Categories" />
      <div className="container">
        <div className="container">
          <div className="grid grid-cols-4 gap-x-6 gap-y-7">
            {data?.data?.map((category) => <CategoryCard key={category.name} category={category} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categories;

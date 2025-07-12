function CategoryCard({ category }: any) {
  return (
    <div>
      <div className="service-item relative overflow-hidden rounded-2xl">
        <img src={category.thumbnail} alt="" className="w-full" />
        <div className="content absolute bottom-0 left-0 z-10 flex w-full flex-col items-center gap-3 pb-[50px] text-center transition-all duration-400">
          <div className="title">
            <a href="#" className="text-3xl font-bold text-white">
              {category.name}
            </a>
          </div>
          <p className="text-sm text-white transition-all duration-400">{category.description.slice(0, 70)}.</p>
        </div>
      </div>
    </div>
  );
}

export default CategoryCard;

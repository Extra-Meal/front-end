export default function Ingredients() {
  return (
    <div>
      <div className="container">
        <div className="meals flex flex-col items-center gap-5">
          <span className="text-secondary md:text-md block transform text-center text-sm font-light uppercase">
            Organic Shop
          </span>
          <h2 className="before:bg-primary relative pb-4 text-center text-xl font-bold before:absolute before:bottom-0 before:left-1/2 before:h-1 before:w-1/4 before:-translate-x-1/2 before:content-[''] md:text-4xl">
            Our Organic Products
          </h2>
        </div>
      </div>
    </div>
  );
}

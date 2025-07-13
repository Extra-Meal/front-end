import { useState } from "react";
import { useParams } from "react-router";

import CartButton from "@/components/cartButton";
import IngredientCard from "@/components/ingredientCard";
import { QuantityInput } from "@/components/quantityInput";
import { Badge } from "@/components/ui/badge";
import WishListButton from "@/components/wishListButton";
import { useGetData } from "@/hooks/useApi";
import { useCart } from "@/hooks/useCart";
import { currencyFormatter } from "@/lib/currency";
import type { APISuccess } from "@/types/api.type";
import type { Product } from "@/types/product.type";

export default function IngredientPage() {
  const [quantity, setQuantity] = useState(1);
  const { isProductInCart, updateProductQuantity } = useCart();
  const { ingredientId } = useParams();
  const { data, isLoading } = useGetData<APISuccess<Product>>(`/products/ingredients/${ingredientId}`);
  function handleQuantityChange(newQuantity: number) {
    setQuantity(newQuantity);
    if (isProductInCart(product._id)) {
      updateProductQuantity(product._id, newQuantity);
    }
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!data) {
    return <div>Ingredient not found</div>;
  }
  const product = data?.data;
  const { ingredient } = product;
  if (!ingredient) {
    return <div>Ingredient details not available</div>;
  }
  return (
    <main className="container py-10">
      <section className="grid grid-cols-1 gap-5 md:grid-cols-[3fr_2fr]">
        <aside className="flex h-full flex-col gap-5">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-semibold">{product.name}</h1>
            <Badge>{ingredient.type}</Badge>
          </div>
          <div className="mt-2 flex flex-1 flex-col gap-2">
            <p className="leading-relaxed">{ingredient.description}</p>
            <p className="text-secondary">{product.stock} left of this ingredient</p>
            <div className="flex-1" />
            <div className="mt-5 flex flex-col justify-between gap-2 sm:flex-row">
              <QuantityInput quantity={quantity} onQuantityChange={handleQuantityChange} />
              <p className="text-primary ml-auto text-3xl font-extrabold">{currencyFormatter(product.price)}</p>
            </div>

            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <WishListButton altText="Remove from Wish List" productId={product._id} className="w-full">
                Add to Wish List
              </WishListButton>
              <CartButton quantity={quantity} productId={product._id} />
            </div>
          </div>
        </aside>

        <aside className="row-start-1 md:row-start-auto">
          <img className="aspect-[4/3] rounded-lg" src={product.image} alt={product.name} />
        </aside>
      </section>
      <section className="mt-10">
        <h2 className="text-primary text-3xl font-semibold">Similar Ingredients</h2>
        <SimilarIngredientsList type={ingredient.type} />
      </section>
    </main>
  );
}
type ResponseSimilarIngredients = {
  products: Array<Product>;
  pagination: {
    page: number;
    limit: number;
    totalIngredients: number;
    totalPages: number;
  };
};

function SimilarIngredientsList({ type }: { type: string }) {
  const { data, isLoading } = useGetData<APISuccess<ResponseSimilarIngredients>>(
    `/products/ingredients?ingredientType=${type}`
  );
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!data || !data.data) {
    return <div>No similar ingredients found</div>;
  }
  const products = data.data.products;
  return (
    <div className="mt-4 grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-4">
      {products.slice(0, 3).map((product) => (
        <IngredientCard key={product._id} product={product} />
      ))}
    </div>
  );
}

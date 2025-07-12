import { ShoppingBasket, X } from "lucide-react";
import { Link } from "react-router";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useCart } from "@/hooks/useCart";
import { currencyFormatter } from "@/lib/currency";
import type { FullCart } from "@/types/cart.type";

import CartButton from "./cartButton";
import { QuantityInput } from "./quantityInput";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

export default function Cart() {
  const { cart, isLoading } = useCart();
  return (
    <Drawer>
      <DrawerTrigger className="hover:bg-accent/10 cursor-pointer rounded-full p-2">
        <ShoppingBasket className="text-primary" />
      </DrawerTrigger>
      <DrawerContent className="">
        <DrawerClose asChild className="absolute top-4 right-4 hidden md:flex">
          <Button variant="ghost" size="icon" className="rounded-full">
            <X />
          </Button>
        </DrawerClose>
        <DrawerHeader>
          <DrawerTitle className="flex items-center justify-center gap-2 text-2xl">
            YOUR CART <ShoppingBasket className="text-primary size-8" />
          </DrawerTitle>
          <DrawerDescription className="text-sm">
            {cart && cart.length > 0 && `You have ${cart.length} items in your cart`}
          </DrawerDescription>
        </DrawerHeader>
        <ScrollArea className="h-80">
          <main className="p-4">{isLoading ? <p>Loading...</p> : <CartContent cart={cart} />}</main>
        </ScrollArea>

        <DrawerFooter>
          <Button asChild size={"lg"}>
            <Link to="/checkout">Checkout</Link>
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

type CartContentProps = {
  cart: FullCart | undefined;
};
function CartContent({ cart }: CartContentProps) {
  if (!cart || cart.length === 0) {
    return <p className="text-center">Your cart is empty</p>;
  }
  return (
    <ul>
      {cart.map((item) => (
        <CartItem key={item.product._id} item={item} />
      ))}
    </ul>
  );
}

function CartItem({ item }: { item: FullCart[number] }) {
  const { updateProductQuantity } = useCart();
  function handleQuantityChange(newQuantity: number) {
    updateProductQuantity(item.product._id, newQuantity);
  }
  return (
    <li className="bg-accent/10 mb-4 flex gap-4 rounded-2xl p-2">
      <img className="aspect-square size-24 rounded-xl" src={item.product.image} alt={item.product.name} />
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col justify-between">
          <span className="font-semibold">{item.product.name}</span>
          <span className="text-sm">quantity: {item.quantity}</span>
          <span className="text-sm">{currencyFormatter(item.product.price)}</span>
        </div>
        <aside className="flex gap-4">
          <div>
            <QuantityInput quantity={item.quantity} onQuantityChange={handleQuantityChange} />
          </div>
          <div className="flex flex-col items-end gap-4">
            <span className="text-lg font-semibold">
              total: {currencyFormatter(item.product.price * item.quantity)}
            </span>
            <CartButton productId={item.product._id} />
          </div>
        </aside>
      </div>
    </li>
  );
}

// function MealIngredients({ ingredients }: { ingredients: Meal["ingredients"] }) {
//   return (
//     <ul className="list-disc pl-4">
//       {ingredients.map((ingredient, index) => (
//         <li key={index} className="text-sm">
//           {ingredient.ingredient.name} - {ingredient.measure}
//         </li>
//       ))}
//     </ul>
//   );
// }

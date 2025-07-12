import type { VariantProps } from "class-variance-authority";
import { ShoppingCart } from "lucide-react";
import React from "react";

import { useCart } from "@/hooks/useCart";

import { Button, buttonVariants } from "./ui/button";

type CartButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    children?: React.ReactNode;
    altText?: string;
    productId: string;
    quantity?: number;
  };
export default function CartButton({ children, productId, quantity, altText, ...ButtonProps }: CartButtonProps) {
  const { addProductToCart, isProductInCart, isAdding, removeProductFromCart, isRemoving } = useCart();
  const isInCart = isProductInCart(productId);
  const handleClick = () => {
    if (isInCart) {
      removeProductFromCart(productId);
    } else {
      addProductToCart(productId, quantity || 1);
    }
  };
  return (
    <Button disabled={isRemoving || isAdding} onClick={handleClick} className={buttonVariants()} {...ButtonProps}>
      <ShoppingCart />
      {!isInCart ? children || "Add to Cart" : altText || "Remove from Cart"}
    </Button>
  );
}

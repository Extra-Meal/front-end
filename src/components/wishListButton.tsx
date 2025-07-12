import type { VariantProps } from "class-variance-authority";
import { Heart } from "lucide-react";
import React from "react";

import { useWishList } from "@/hooks/useWishList";
import { cn } from "@/lib/utils";

import { Button, buttonVariants } from "./ui/button";

type WishListButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    children?: React.ReactNode;
    altText?: string;
    productId: string;
  };
export default function WishListButton({ children, productId, altText,className, ...ButtonProps }: WishListButtonProps) {
  const { addProductToWishlist, removeProductFromWishlist, isProductInWishlist, isAdding, isRemoving } = useWishList();
  const isInWishList = isProductInWishlist(productId);

  function handleCLick() {
    if (isInWishList) {
      removeProductFromWishlist(productId);
    } else {
      addProductToWishlist(productId);
    }
  }
  return (
    <Button
      onClick={handleCLick}
      className={cn(buttonVariants({ variant: "secondary", size: "icon" }), className)}
      {...ButtonProps}
    >
      {isInWishList ? (
        <Heart className={isRemoving ? "animate-pulse" : ""} fill="var(--color-secondary-foreground)" />
      ) : (
        <Heart className={isAdding ? "animate-pulse" : ""} />
      )}
      {!isInWishList ? children : altText}
    </Button>
  );
}

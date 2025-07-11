import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import type { APISuccess } from "@/types/api.type";
import type { FullCart } from "@/types/cart.type";

import { useDeleteData, useGetData, usePostData } from "./useApi";
import { useAuth } from "./useAuth";

export function useCart() {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuth();
  const { data, isLoading, isError } = useGetData<APISuccess<FullCart>>("/cart", { enabled: isAuthenticated });
  const cart = data?.data;
  const { mutate: addToCart, isPending: isAdding } = usePostData("/cart", {
    onSuccess: () => {
      // Invalidate the cart query to refetch the updated cart
      queryClient.invalidateQueries({ queryKey: ["/cart"] });
      toast.success("Product added to cart successfully!");
    },
    onError: () => {
      toast.error("Failed to add product to cart.");
    },
  });

  const { mutate: removeFromCart, isPending: isRemoving } = useDeleteData("/cart/remove", {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/cart"] });
      toast.success("Product removed from cart successfully!");
    },
    onError: () => {
      toast.error("Failed to remove product from cart.");
    },
  });

  function addProductToCart(productId: string, quantity: number) {
    if (!isAuthenticated) {
      toast.error("You must be logged in to add items to the cart.");
      return;
    }
    addToCart({ product: productId, quantity });
  }

  function removeProductFromCart(productId: string) {
    if (!isAuthenticated) {
      toast.error("You must be logged in to remove items from the cart.");
      return;
    }
    removeFromCart(productId);
  }

  function isProductInCart(productId: string) {
    if (!cart) return false;
    return cart?.some((item) => item.product._id === productId);
  }
  return {
    cart,
    addProductToCart,
    removeProductFromCart,
    isProductInCart,
    isRemoving,
    isAdding,
    isLoading,
    isError,
  };
}

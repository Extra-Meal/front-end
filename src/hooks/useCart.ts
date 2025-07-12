import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import type { APISuccess } from "@/types/api.type";
import type { FullCart } from "@/types/cart.type";

import { useDeleteData, useGetData, usePatchData, usePostData } from "./useApi";
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
    onError: (error) => {
      toast.error(error.data?.message || "Failed to add product to cart.");
    },
  });

  const { mutate: removeFromCart, isPending: isRemoving } = useDeleteData("/cart", {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/cart"] });
      toast.success("Product removed from cart successfully!");
    },
    onError: (error) => {
      toast.error(error.data?.message || "Failed to remove product from cart.");
    },
  });

  const { mutate: updateCartQuantity, isPending: isUpdatingQuantity } = usePatchData("/cart", {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/cart"] });
      toast.success("Cart quantity updated successfully!");
    },
    onError: (error) => {
      toast.error(error.data?.message || "Failed to update cart quantity.");
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

  function updateProductQuantity(productId: string, quantity: number) {
    if (!isAuthenticated) {
      toast.error("You must be logged in to update cart items.");
      return;
    }
    updateCartQuantity({ product: productId, quantity });
  }

  function isProductInCart(productId: string) {
    if (!cart) return false;
    return cart?.some((item) => item.product._id === productId);
  }

  return {
    cart,
    addProductToCart,
    removeProductFromCart,
    updateProductQuantity,
    isProductInCart,
    isRemoving,
    isAdding,
    isLoading,
    isUpdatingQuantity,
    isError,
  };
}

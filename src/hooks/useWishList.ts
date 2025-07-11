import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import type { APISuccess } from "@/types/api.type";
import type { WishListItem, fullWishList } from "@/types/wishList.type";

import { useDeleteData, useGetData, usePostData } from "./useApi";
import { useAuth } from "./useAuth";

type payload = {
  productId: WishListItem;
};
export function useWishList() {
  const queryCLient = useQueryClient();
  const { isAuthenticated } = useAuth();

  const { data, isLoading, isError } = useGetData<APISuccess<fullWishList>>("/wishlist", { enabled: isAuthenticated });
  const wishlistItems = data?.data;
  const { mutate: addToWishlist, isPending: isAdding } = usePostData<payload>("/wishlist", {
    onSuccess: () => {
      toast.success("Product added to wishlist successfully!");
      queryCLient.invalidateQueries({ queryKey: ["/wishlist"] });
    },
    onError: () => {
      toast.error("Failed to add product to wishlist.");
    },
  });
  const { mutate: removeFromWishlist, isPending: isRemoving } = useDeleteData("/wishlist", {
    onSuccess: () => {
      toast.success("Product removed from wishlist successfully!");
      queryCLient.invalidateQueries({ queryKey: ["/wishlist"] });
    },
    onError: () => {
      toast.error("Failed to remove product from wishlist.");
    },
  });
  function addProductToWishlist(productId: string) {
    if (!isAuthenticated) {
      toast.error("You must be logged in to add items to the wishlist.");
      return;
    }
    addToWishlist({ productId });
  }
  function removeProductFromWishlist(productId: string) {
    if (!isAuthenticated) {
      toast.error("You must be logged in to remove items from the wishlist.");
      return;
    }
    removeFromWishlist(productId);
  }

  function isProductInWishlist(productId: string) {
    if (!wishlistItems) return false;
    return wishlistItems?.some((item) => item._id === productId);
  }
  return {
    wishlistItems,
    isLoading,
    isError,
    addProductToWishlist,
    removeProductFromWishlist,
    isAdding,
    isRemoving,
    isProductInWishlist,
  };
}

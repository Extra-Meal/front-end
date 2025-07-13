import CartButton from "@/components/cartButton";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WishListButton from "@/components/wishListButton";
import { useWishList } from "@/hooks/useWishList";
import { currencyFormatter } from "@/lib/currency";
import type { fullWishList } from "@/types/wishList.type";

export default function WishList() {
  const { wishlistItems, isLoading } = useWishList();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  const kits = wishlistItems?.filter((item) => item.type === "kit");
  const ingredients = wishlistItems?.filter((item) => item.type === "ingredient");
  return (
    <main className="container space-y-4 py-10">
      <h1 className="text-primary text-4xl font-extrabold tracking-wide">WishList</h1>
      <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
        <h2 className="text-secondary text-xl font-semibold">Your wish is our command</h2>
        <p className="text-sm text-gray-600">You have {wishlistItems?.length} Products in Your wishlist</p>
      </div>
      <Tabs defaultValue="Meals">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="Meals">
            Meals
            <Badge className="size-5" variant={"secondary"}>
              {kits?.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="Ingredients">
            Ingredients
            <Badge className="size-5" variant={"secondary"}>
              {ingredients?.length}
            </Badge>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="Meals">
          <div className="grid grid-cols-1 gap-4">
            {kits?.map((item) => <WishListItem key={item._id} item={item} />)}
          </div>
        </TabsContent>
        <TabsContent value="Ingredients">
          <div className="grid grid-cols-1 gap-4">
            {ingredients?.map((item) => <WishListItem key={item._id} item={item} />)}
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}

function WishListItem({ item }: { item: fullWishList[number] }) {
  return (
    <div className="relative flex items-end gap-4 border-b p-4">
      <img className="aspect-square size-24 rounded-xl" src={item.image} alt={item.name} />
      <div className="flex h-full flex-col justify-between p-1">
        <h3 className="text-lg font-semibold">{item.name}</h3>
        <span className="text-2xl font-bold">{currencyFormatter(item.price)}</span>
      </div>
      <div className="flex-1"></div>
      <div className="flex items-center gap-2">
        <CartButton productId={item._id} />
      </div>
      <WishListButton className="absolute top-5 right-5 rounded-full" productId={item._id} />
    </div>
  );
}

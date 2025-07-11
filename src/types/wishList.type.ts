import type { z } from "zod";

import type { wishlistItemSchema } from "./Schemas/user.schema";
import type { Product } from "./product.type";

export type WishListItem = z.infer<typeof wishlistItemSchema>;
export type WishList = WishListItem[];

export type fullWishList = Product[];

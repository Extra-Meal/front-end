import type { z } from "zod";

import type { cartItemSchema } from "./Schemas/cart.schema";
import type { Product } from "./product.type";

export type CartItem = z.infer<typeof cartItemSchema>;
export type Cart = CartItem[];
export type FullCart = {
  product: Product;
  quantity: number;
}[];

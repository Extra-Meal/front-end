import { useEffect, useState } from "react";
import { GiMeal } from "react-icons/gi";
import QRCode from "react-qr-code";

interface ReceiptItem {
  name: string;
  quantity: number;
  price: number;
}

interface ReceiptProps {
  items: ReceiptItem[];
  orderId: string;
  taxRate?: number;
  discount?: {
    type: "percent" | "fixed";
    value: number;
  };
}

export default function Receipt({ items, orderId, taxRate = 0.1, discount }: ReceiptProps) {
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    const now = new Date();
    setDateTime(now.toLocaleString());
  }, []);

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const discountAmount =
    discount?.type === "percent" ? (discount.value / 100) * subtotal : discount?.type === "fixed" ? discount.value : 0;

  const discountedSubtotal = subtotal - discountAmount;
  const tax = discountedSubtotal * taxRate;
  const total = discountedSubtotal + tax;

  return (
    <div className="bg-background border-background max-w-xs rounded border p-4 text-sm shadow-xl">
      <div className="flex flex-col items-center">
        <GiMeal className="text-primary text-3xl" />
        <span className="text-primary mb-2 text-2xl font-bold tracking-wider md:text-3xl">Mealify</span>
      </div>
      <div className="text-secondary mb-2 hidden text-center text-xs md:block">{dateTime}</div>
      <div className="mb-4 hidden text-center text-xs md:block">Order ID: #{orderId}</div>

      <div className="border-foreground my-2 border-t border-dashed" />

      {items.map((item, idx) => (
        <div key={idx} className="flex justify-between py-0.5">
          <span>
            {item.name} x{item.quantity}
          </span>
          <span>{(item.price * item.quantity).toFixed(2)} LE</span>
        </div>
      ))}

      <div className="border-foreground my-2 border-t border-dashed" />

      <div className="space-y-1">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{subtotal.toFixed(2)} LE</span>
        </div>

        {discount && (
          <div className="flex justify-between font-bold text-red-500">
            <span>Discount {discount.type === "percent" ? `(${discount.value}%)` : ""}</span>
            <span>-{discountAmount.toFixed(2)} LE</span>
          </div>
        )}

        <div className="flex justify-between">
          <span>Tax ({(taxRate * 100).toFixed(0)}%)</span>
          <span>{tax.toFixed(2)} LE</span>
        </div>

        <div className="border-foreground flex justify-between border-t pt-2 font-bold">
          <span>Total</span>
          <span>{total.toFixed(2)} LE</span>
        </div>
      </div>

      <div className="border-foreground my-4 border-t border-dashed" />

      <div className="text-foreground mb-1 hidden text-center text-xs md:block">Scan to Reorder !</div>
      <div className="mb-4 hidden justify-center md:flex">
        <QRCode value={`https://mealify.shop/order/${orderId}`} size={64} />
      </div>

      <div className="text-secondary text-center text-[11px] tracking-wide">Thank you for choosing Mealify!</div>
    </div>
  );
}

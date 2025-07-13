import { Minus, Plus } from "lucide-react";
import { useRef, useState } from "react";

import { Button } from "./ui/button";

type QuantityInputProps = {
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
};
export function QuantityInput({ quantity, onQuantityChange }: QuantityInputProps) {
  const [currentQuantity, setCurrentQuantity] = useState(+quantity);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  function handleQuantityChange(newQuantity: number) {
    console.log("🚀 ~ handleQuantityChange ~ newQuantity:", newQuantity);
    if (isNaN(newQuantity) || newQuantity < 1) {
      return;
    }
    setCurrentQuantity(newQuantity);
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      onQuantityChange(newQuantity);
    }, 500);
  }
  function handleIncrement() {
    handleQuantityChange(currentQuantity + 1);
  }
  function handleDecrement() {
    handleQuantityChange(currentQuantity - 1);
  }
  return (
    <div className="flex h-full items-center justify-center gap-4">
      <Button variant="outline" size="icon" className="rounded-full" onClick={handleDecrement}>
        <Minus className="h-4 w-4" />
      </Button>
      <span>{currentQuantity}</span>
      <Button variant="outline" size="icon" className="rounded-full" onClick={handleIncrement}>
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}

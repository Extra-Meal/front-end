import { CreditCard, Smartphone } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { currencyFormatter } from "@/lib/currency";

interface CheckoutButtonProps {
  amount: number;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  onCreatePaymentIntent: () => void;
  onCreateCheckoutSession: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({
  amount,
  items,
  onCreatePaymentIntent,
  onCreateCheckoutSession,
  isLoading = false,
  disabled = false,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Checkout Options</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <p className="text-primary text-2xl font-bold">Total: {currencyFormatter(amount / 100)}</p>
          <p className="text-muted-foreground text-sm">
            {items.reduce((total, item) => total + item.quantity, 0)} items
          </p>
        </div>

        <div className="space-y-2">
          <Button onClick={onCreatePaymentIntent} disabled={disabled || isLoading} className="w-full" variant="default">
            <CreditCard className="mr-2 h-4 w-4" />
            Pay with Card (Custom Form)
          </Button>

          <Button
            onClick={onCreateCheckoutSession}
            disabled={disabled || isLoading}
            className="w-full"
            variant="outline"
          >
            <Smartphone className="mr-2 h-4 w-4" />
            Pay with Stripe Checkout
          </Button>
        </div>

        <div className="text-muted-foreground text-center text-xs">
          <p>Secure payment powered by Stripe</p>
          <p>All major credit cards accepted</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CheckoutButton;

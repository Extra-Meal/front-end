import { ArrowLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import CheckoutButton from "@/components/payments/CheckoutButton";
import StripeProvider from "@/components/payments/StripeProvider";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { usePayment } from "@/hooks/usePayment";
import type { PaymentRequest } from "@/types/payment.type";

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { cart } = useCart();
  const {
    createPaymentIntent,
    createCheckoutSession,
    isCreatingPaymentIntent,
    isCreatingCheckoutSession,
    paymentIntentData,
    paymentIntentSuccess,
  } = usePayment();
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  // Handle successful payment intent creation
  useEffect(() => {
    console.log(
      "Payment intent data:",
      paymentIntentSuccess,
      paymentIntentData,
      paymentIntentData?.data.payment_intent_id
    );
    if (paymentIntentSuccess && paymentIntentData && paymentIntentData.data.payment_intent_id) {
      console.log(paymentIntentData);
      setClientSecret(paymentIntentData.data.client_secret);
    }
  }, [paymentIntentSuccess, paymentIntentData]);

  if (!cart || cart.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold">Your cart is empty</h2>
          <Button onClick={() => navigate("/")}>Continue Shopping</Button>
        </div>
      </div>
    );
  }

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0) * 100; // Convert to cents for Stripe
  const items = cart.map((item) => ({
    id: item.product._id,
    name: item.product.name,
    price: item.product.price * 100, // Convert to cents
    quantity: item.quantity,
  }));

  const handleCreatePaymentIntent = () => {
    const paymentRequest: PaymentRequest = {
      amount: total,
      currency: "usd",
      items,
    };

    createPaymentIntent(paymentRequest);
  };

  const handleCreateCheckoutSession = () => {
    const paymentRequest: PaymentRequest = {
      amount: total,
      currency: "usd",
      items,
    };

    createCheckoutSession(paymentRequest);
  };

  const handlePaymentSuccess = () => {
    navigate("/payment/success");
  };

  const handlePaymentError = (error: string) => {
    console.error("Payment error:", error);
    // Could show error toast or redirect to error page
  };

  return (
    <div className="min-h-screen p-4">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <Button onClick={() => navigate("/")} variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          <h1 className="text-3xl font-bold">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Order Summary */}
          <div>
            <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.product._id} className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <h3 className="font-medium">{item.product.name}</h3>
                    <p className="text-muted-foreground text-sm">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-semibold">${(item.product.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
              <div className="border-t pt-4">
                <div className="flex items-center justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>${(total / 100).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div>
            {!clientSecret ? (
              <CheckoutButton
                amount={total}
                items={items}
                onCreatePaymentIntent={handleCreatePaymentIntent}
                onCreateCheckoutSession={handleCreateCheckoutSession}
                isLoading={isCreatingPaymentIntent || isCreatingCheckoutSession}
              />
            ) : (
              <StripeProvider
                clientSecret={clientSecret}
                amount={total}
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

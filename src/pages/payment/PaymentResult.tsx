import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePayment } from "@/hooks/usePayment";

const PaymentResult: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { confirmPayment, isConfirmingPayment } = usePayment();

  const paymentIntent = searchParams.get("payment_intent");
  const paymentIntentClientSecret = searchParams.get("payment_intent_client_secret");
  const redirectStatus = searchParams.get("redirect_status");

  useEffect(() => {
    if (paymentIntent && redirectStatus === "succeeded") {
      // Confirm the payment on your backend
      confirmPayment({
        paymentIntentId: paymentIntent,
        clientSecret: paymentIntentClientSecret || undefined,
      });
    }
  }, [paymentIntent, redirectStatus, confirmPayment, paymentIntentClientSecret]);

  const renderContent = () => {
    if (isConfirmingPayment) {
      return (
        <Card className="mx-auto w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Processing Payment...</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <Loader2 className="text-primary mx-auto mb-4 h-16 w-16 animate-spin" />
            <p>Please wait while we confirm your payment.</p>
          </CardContent>
        </Card>
      );
    }

    if (redirectStatus === "succeeded") {
      return (
        <Card className="mx-auto w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-green-600">Payment Successful!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <CheckCircle2 className="mx-auto h-16 w-16 text-green-600" />
            <div>
              <p className="text-lg font-semibold">Thank you for your purchase!</p>
              <p className="text-muted-foreground">Your payment has been processed successfully.</p>
              {paymentIntent && <p className="text-muted-foreground mt-2 text-sm">Payment ID: {paymentIntent}</p>}
            </div>
            <div className="space-y-2">
              <Button onClick={() => navigate("/")} className="w-full">
                Continue Shopping
              </Button>
              <Button onClick={() => navigate("/orders")} variant="outline" className="w-full">
                View Orders
              </Button>
            </div>
          </CardContent>
        </Card>
      );
    }

    // Payment failed or was cancelled
    return (
      <Card className="mx-auto w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-red-600">Payment Failed</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <XCircle className="mx-auto h-16 w-16 text-red-600" />
          <div>
            <p className="text-lg font-semibold">Payment was not completed</p>
            <p className="text-muted-foreground">
              {redirectStatus === "failed"
                ? "Your payment could not be processed. Please try again."
                : "Payment was cancelled or interrupted."}
            </p>
          </div>
          <div className="space-y-2">
            <Button onClick={() => navigate("/cart")} className="w-full">
              Return to Cart
            </Button>
            <Button onClick={() => navigate("/")} variant="outline" className="w-full">
              Continue Shopping
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return <div className="flex min-h-screen items-center justify-center p-4">{renderContent()}</div>;
};

export default PaymentResult;

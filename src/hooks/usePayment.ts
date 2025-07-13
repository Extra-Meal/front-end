import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import type { APISuccess } from "@/types/api.type";
import type { PaymentRequest, PaymentResponse, paymentIntentResponse } from "@/types/payment.type";

import { usePostData } from "./useApi";

export function usePayment() {
  const queryClient = useQueryClient();

  // Create Payment Intent for card payments
  const {
    mutate: createPaymentIntent,
    isPending: isCreatingPaymentIntent,
    data: paymentIntentData,
    error: paymentIntentError,
    isSuccess: paymentIntentSuccess,
  } = usePostData<PaymentRequest, APISuccess<paymentIntentResponse>>("/payment/payment-intent", {
    onSuccess: (data) => {
      console.log("🚀 ~ usePayment ~ data:", data.data);
      if (data.status === "success") {
        toast.success("Payment intent created successfully!");
      }
    },
    onError: (error) => {
      console.log("🚀 ~ usePayment ~ error:", error);
      toast.error(error.data?.message || "Failed to create payment intent");
    },
  });

  // Create Checkout Session for hosted checkout
  const createCheckoutSessionMutation = usePostData<PaymentRequest, APISuccess<PaymentResponse>>(
    "/payment/checkout-session",
    {
      onSuccess: (data) => {
        console.log("🚀 ~ usePayment ~ data:", data);

        if (data.data.success && data.data.checkoutSession?.url) {
          // Redirect to Stripe Checkout
          window.location.href = data.data.checkoutSession.url;
        } else {
          toast.error(data.data.error || "Failed to create checkout session");
        }
      },
      onError: (error) => {
        toast.error(error.data?.message || "Failed to create checkout session");
      },
    }
  );

  // Confirm payment and clear cart
  const confirmPaymentMutation = usePostData<{ paymentIntentId: string; clientSecret?: string }, { success: boolean }>(
    "/payment/confirm-payment",
    {
      onSuccess: () => {
        // Invalidate cart and other related queries
        queryClient.invalidateQueries({ queryKey: ["/cart"] });
        toast.success("Payment confirmed successfully!");
      },
      onError: (error) => {
        toast.error(error.data?.message || "Failed to confirm payment");
      },
    }
  );
  return {
    createPaymentIntent,
    isCreatingPaymentIntent,
    createCheckoutSession: createCheckoutSessionMutation.mutate,
    isCreatingCheckoutSession: createCheckoutSessionMutation.isPending,
    confirmPayment: confirmPaymentMutation.mutate,
    isConfirmingPayment: confirmPaymentMutation.isPending,
    // Expose mutation data for manual handling
    paymentIntentData,
    paymentIntentError,
    paymentIntentSuccess,
  };
}

import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import type { PaymentRequest, PaymentResponse } from "@/types/payment.type";

import { usePostData } from "./useApi";

export function usePayment() {
  const queryClient = useQueryClient();

  // Create Payment Intent for card payments
  const createPaymentIntentMutation = usePostData<PaymentRequest, PaymentResponse>("/payments/create-payment-intent", {
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Payment intent created successfully!");
      } else {
        toast.error(data.error || "Failed to create payment intent");
      }
    },
    onError: (error) => {
      toast.error(error.data?.message || "Failed to create payment intent");
    },
  });

  // Create Checkout Session for hosted checkout
  const createCheckoutSessionMutation = usePostData<PaymentRequest, PaymentResponse>(
    "/payments/create-checkout-session",
    {
      onSuccess: (data) => {
        if (data.success && data.checkoutSession?.url) {
          // Redirect to Stripe Checkout
          window.location.href = data.checkoutSession.url;
        } else {
          toast.error(data.error || "Failed to create checkout session");
        }
      },
      onError: (error) => {
        toast.error(error.data?.message || "Failed to create checkout session");
      },
    }
  );

  // Confirm payment and clear cart
  const confirmPaymentMutation = usePostData<{ paymentIntentId: string; clientSecret?: string }, { success: boolean }>(
    "/payments/confirm",
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
    createPaymentIntent: createPaymentIntentMutation.mutate,
    isCreatingPaymentIntent: createPaymentIntentMutation.isPending,
    createCheckoutSession: createCheckoutSessionMutation.mutate,
    isCreatingCheckoutSession: createCheckoutSessionMutation.isPending,
    confirmPayment: confirmPaymentMutation.mutate,
    isConfirmingPayment: confirmPaymentMutation.isPending,
    // Expose mutation data for manual handling
    paymentIntentData: createPaymentIntentMutation.data,
    paymentIntentError: createPaymentIntentMutation.error,
    paymentIntentSuccess: createPaymentIntentMutation.isSuccess,
  };
}

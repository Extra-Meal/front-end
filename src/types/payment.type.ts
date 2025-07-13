export interface StripePaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status:
    | "requires_payment_method"
    | "requires_confirmation"
    | "requires_action"
    | "processing"
    | "requires_capture"
    | "canceled"
    | "succeeded";
  client_secret: string;
}

export interface StripeCheckoutSession {
  id: string;
  url: string;
  payment_status: "paid" | "unpaid" | "no_payment_required";
}

export interface PaymentRequest {
  amount: number;
  currency?: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
}

export interface PaymentResponse {
  success: boolean;
  paymentIntent?: StripePaymentIntent;
  checkoutSession?: StripeCheckoutSession;
  error?: string;
}

export interface paymentIntentResponse {
  client_id: string;
  client_secret: string;
  payment_intent_id: string;
}

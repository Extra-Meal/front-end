import { Elements } from "@stripe/react-stripe-js";
import React from "react";

import { stripePromise } from "@/lib/stripe";

import PaymentForm from "./PaymentForm";

interface StripeProviderProps {
  clientSecret: string;
  amount: number;
  onSuccess: () => void;
  onError: (error: string) => void;
}

const StripeProvider: React.FC<StripeProviderProps> = ({ clientSecret, amount, onSuccess, onError }) => {
  const options = {
    clientSecret,
    appearance: {
      theme: "stripe" as const,
      variables: {
        colorPrimary: "#0570de",
        colorBackground: "#ffffff",
        colorText: "#30313d",
        colorDanger: "#df1b41",
        fontFamily: "system-ui, sans-serif",
        spacingUnit: "2px",
        borderRadius: "8px",
      },
    },
  };

  return (
    <Elements options={options} stripe={stripePromise}>
      <PaymentForm amount={amount} onSuccess={onSuccess} onError={onError} />
    </Elements>
  );
};

export default StripeProvider;

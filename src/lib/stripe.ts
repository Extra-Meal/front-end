import { loadStripe } from "@stripe/stripe-js";

// Make sure to replace this with your actual Stripe publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "");

export { stripePromise };

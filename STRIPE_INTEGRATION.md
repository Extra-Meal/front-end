# Stripe Integration Documentation

## Overview

This integration provides secure payment processing using Stripe for your React application. It supports both custom card payment forms and hosted Stripe Checkout sessions.

## Features

- **React Query Integration**: Built on top of your existing React Query setup for consistent data fetching
- **Custom Payment Forms**: Accept card payments with a custom-styled form
- **Stripe Checkout**: Redirect users to Stripe's hosted checkout page
- **Payment Confirmation**: Handle payment success/failure states
- **Cart Integration**: Seamless integration with existing cart system
- **TypeScript Support**: Full type safety throughout the payment flow
- **Optimistic Updates**: Automatic cart invalidation after successful payments

## Setup

### 1. Install Dependencies

The following packages have been installed:

- `@stripe/stripe-js` - Stripe JavaScript SDK
- `@stripe/react-stripe-js` - Stripe React components

### 2. Environment Variables

Create a `.env.local` file in your project root:

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
VITE_API_URL=http://localhost:3000/api
```

**Important**: Replace `pk_test_your_stripe_publishable_key_here` with your actual Stripe publishable key.

### 3. Backend Setup

You'll need to implement the following API endpoints on your backend:

#### POST `/api/payments/create-payment-intent`

Creates a payment intent for card payments.

**Request Body:**

```json
{
  "amount": 2000,
  "currency": "usd",
  "items": [
    {
      "id": "product_id",
      "name": "Product Name",
      "price": 1000,
      "quantity": 2
    }
  ]
}
```

**Response:**

```json
{
  "success": true,
  "paymentIntent": {
    "id": "pi_xxxxx",
    "amount": 2000,
    "currency": "usd",
    "status": "requires_payment_method",
    "client_secret": "pi_xxxxx_secret_xxxxx"
  }
}
```

#### POST `/api/payments/create-checkout-session`

Creates a Stripe Checkout session.

**Request Body:** Same as payment intent

**Response:**

```json
{
  "success": true,
  "checkoutSession": {
    "id": "cs_xxxxx",
    "url": "https://checkout.stripe.com/pay/cs_xxxxx",
    "payment_status": "unpaid"
  }
}
```

#### POST `/api/payments/confirm`

Confirms a successful payment and clears the cart.

**Request Body:**

```json
{
  "paymentIntentId": "pi_xxxxx",
  "clientSecret": "pi_xxxxx_secret_xxxxx"
}
```

**Response:**

```json
{
  "success": true
}
```

## Usage

### React Query Integration

The payment system is built on top of React Query, providing these benefits:

- **Automatic Loading States**: Track payment processing states automatically
- **Error Handling**: Consistent error handling across all payment operations
- **Cache Invalidation**: Automatic cart updates after successful payments
- **Retry Logic**: Built-in retry mechanism for failed requests
- **Optimistic Updates**: Immediate UI feedback with server reconciliation

### 1. Checkout Flow

Users can access the checkout page from the cart by clicking "Proceed to Checkout". The checkout page offers two payment options:

1. **Custom Payment Form**: Uses Stripe Elements for a custom-styled card form
2. **Stripe Checkout**: Redirects to Stripe's hosted checkout page

### 2. Payment Success/Failure

After payment completion, users are redirected to:

- `/payment/success` for successful payments
- The same page with error handling for failed payments

### 3. Components

#### `CheckoutButton`

Displays payment options and handles the initial payment setup.

#### `StripeProvider`

Wraps the payment form with Stripe Elements context.

#### `PaymentForm`

Custom card payment form using Stripe Elements.

#### `PaymentResult`

Handles post-payment redirect and displays success/failure messages.

### 4. Hooks

#### `usePayment`

Built on top of React Query, this hook provides functions for:

- Creating payment intents with automatic caching and error handling
- Creating checkout sessions with redirect handling
- Confirming payments with cart invalidation
- Accessing mutation states (loading, success, error)

The hook leverages your existing `usePostData` utility for consistent API interaction patterns.

## File Structure

```
src/
├── components/
│   └── payments/
│       ├── CheckoutButton.tsx
│       ├── PaymentForm.tsx
│       └── StripeProvider.tsx
├── hooks/
│   └── usePayment.ts
├── lib/
│   └── stripe.ts
├── pages/
│   └── payment/
│       ├── CheckoutPage.tsx
│       └── PaymentResult.tsx
└── types/
    └── payment.type.ts
```

## Security Considerations

1. **Never expose your secret key**: Only use publishable keys in the frontend
2. **Validate on backend**: Always validate payment amounts and cart contents on your backend
3. **Use HTTPS**: Ensure all payment pages are served over HTTPS in production
4. **Webhook verification**: Implement Stripe webhooks for reliable payment confirmation

## Testing

Use Stripe's test card numbers:

- `4242424242424242` - Visa (Success)
- `4000000000000002` - Visa (Decline)
- `4000000000009995` - Visa (Insufficient funds)

## Customization

The payment components use your existing UI components and can be styled to match your application's design. The Stripe Elements appearance can be customized in `StripeProvider.tsx`.

## Error Handling

The integration includes comprehensive error handling:

- Network errors
- Payment failures
- Invalid card information
- Server errors

All errors are displayed to users via toast notifications using the `sonner` library.

## Support

For Stripe-specific questions, refer to the [Stripe Documentation](https://stripe.com/docs).
For implementation questions, check the component files and type definitions.

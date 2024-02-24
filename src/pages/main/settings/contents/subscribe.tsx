import React from 'react'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Payment from './payment';

// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_TEST_CLIENT_KEY!);
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY!);
type Props = { clientSecret: string, action?: any }
function SubscribeContent({ clientSecret, action }: Props) {
  if(!clientSecret) return null;
  return (
    <Elements
      stripe={stripePromise}
      options={{ clientSecret }}
    >
      <Payment action={action} />
    </Elements>
  )
}

export default SubscribeContent
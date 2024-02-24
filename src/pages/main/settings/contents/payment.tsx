import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { Button, Form, notification } from 'antd'
import React, { useState } from 'react'

type Props = { action?: any }
function Payment({ action }: Props) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    setIsLoading(true)
    if (!stripe || !elements) return null;

    await stripe.confirmPayment({
      elements,
      redirect: "if_required",
      confirmParams: { return_url: window.location.href },
    }).then((res) => action(res)).catch((err: any) => notification.error({
      description: err?.message || "Payment failed!",
      message: "Error!",
    }));
    setIsLoading(false)
  };
  return (
    <Form onFinish={handleSubmit} className='space-y-5'>
      <PaymentElement />
      <Button
        block
        type='primary'
        htmlType='submit'
        loading={isLoading}
        className='bg-primary'
        disabled={!stripe || !elements}
      >Pay</Button>
    </Form>
  )
}

export default Payment
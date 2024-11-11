import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckOutForm from './checkout-form';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
const CheckOut = (props) => {
  return (
    <>
      <Elements stripe={stripePromise}>
        <CheckOutForm {...props}></CheckOutForm>
      </Elements>
    </>
  );
};

CheckOut.propTypes = {};

export default CheckOut;

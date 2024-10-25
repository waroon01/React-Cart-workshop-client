import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { payment } from "../../api/strips";
import useEcomStore from "../../Store/ecom-store";
import CheckoutForm from "../../components/CheckoutForm";

const stripePromise = loadStripe("pk_test_51QDS6JLuwL13cLHbgLagzrjlF3YcNoJlKibIk8auCuiKCAi904E1On9CKcNdf5K5wJUgc2yS8viXrzxJoUyOYnpY00zA7cAYJ0");

const Payment = () => {
  const token = useEcomStore((state)=>state.token)
  const [clientSecret, setClientSecret] = useState("");

  useEffect(()=>{
    payment(token)
    .then((res)=>{
      console.log(res)
      setClientSecret(res.data.clientSecret)
    })
    .catch((err)=>{
      console.log(err)
    })
  },[])

  const appearance = {
    theme: 'stripe',
  };
  // Enable the skeleton loader UI for optimal loading.
  const loader = 'auto';

  return (
    <div>
      {
        clientSecret && (
          <Elements options={{clientSecret, appearance, loader}} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        )
      }

    </div>
  )
}

export default Payment
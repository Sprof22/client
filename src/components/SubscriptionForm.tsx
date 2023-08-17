import React, { useState, useEffect } from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
  PaymentElementProps
} from "@stripe/react-stripe-js";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [clientSecret, setClientSecret] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const secretFromURL = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (secretFromURL) {
      setClientSecret(secretFromURL);
    }
  }, [stripe]);

  useEffect(() => {
    if (clientSecret && stripe) {
      stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
        if (paymentIntent) {
          switch (paymentIntent.status) {
            case "succeeded":
              setMessage("Payment succeeded!");
              break;
            case "processing":
              setMessage("Your payment is processing.");
              break;
            case "requires_payment_method":
              setMessage("Your payment was not successful, please try again.");
              break;
            default:
              setMessage("Something went wrong.");
              break;
          }
        }
      });
    }
  }, [clientSecret, stripe]);

  useEffect(() => {
    fetch("/api/create-sub-intent")
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000",
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error && (error.type === "card_error" || error.type === "validation_error")) {
      setMessage(error.message ?? "An unexpected error occurred.");
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions: any = {
    layout: "tabs",
    // business: "RocketRides"
  };


  return (
    <div className="min-h-screen flex items-center justify-center">
    <div className="w-1/2 bg-white p-8 flex">
      <div>
      <h1 className="text-2xl font-bold mb-4 text-blue-800">Enter details to complete subscription</h1>
      <div>
        an image should be here
        <p>The price  of this item should also be here</p>
      </div>
      </div>
      <form id="payment-form" onSubmit={handleSubmit}>
        <LinkAuthenticationElement
          id="link-authentication-element"
          onChange={(e: any) => setEmail(e?.target?.value)}
        />
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button
          disabled={isLoading || !stripe || !elements}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
          id="submit"
        >
          <span id="button-text">
            {isLoading ? <div className="spinner" id="spinner"></div> : 'Pay now'}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
    </div>
  </div>
  );
}

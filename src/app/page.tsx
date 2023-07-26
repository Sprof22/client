"use client"
import React from "react";
import { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {useSearchParams } from "next/navigation";
import Image from "next/image";

const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '';
loadStripe(stripePublishableKey);

const HomePage = () => {
  const searchParams = useSearchParams();
  const success = searchParams?.get("success");
  const canceled = searchParams?.get("canceled");

  useEffect(() => {
    if (success !== undefined || canceled !== undefined) {
      if (success) {
        console.log("Order placed! You will receive an email confirmation.");
      }

      if (canceled) {
        console.log(
          "Order canceled -- continue to shop around and checkout when you’re ready."
        );
      }
    }
  }, [success, canceled]);

  return (
    <form action="/api/checkout_sessions" method="POST">
      <section>
        <div>
          <Image
						className='image'
						src='https://stripe-camo.global.ssl.fastly.net/b18fe038498c9b166931cf20037616601b9ba31c04a59e18278763776895d0c5/68747470733a2f2f66696c65732e7374726970652e636f6d2f6c696e6b732f4d44423859574e6a64463878536c564554306445525646745a316c725454684b66475a735833526c6333526656306c775757746d5a4735544d6e52796454645853335a585255747a596a564930304c393934647a3174'
						alt='Green Soap'
						width={150}
						height={150}
					/>
          <div className="description">
            <h3 className="heading">Green Soap</h3>
            <h5 className="price">$34.99</h5>
          </div>
        </div>
        <button type="submit" role="link">
          Checkout
        </button>
      </section>
      <style jsx>
        {`
          .description {
            float: right;
            margin-left: 10px;
          }
          .image {
            float: left;
          }
          .heading {
            font-size: 28px;
            font-weight: 200;
          }
          .price {
            font-size: 18px;
            font-weight: bold;
          }
          section {
            background: #ffffff;
            display: flex;
            flex-direction: column;
            width: 450px;
            height: 112px;
            border-radius: 6px;
            justify-content: space-between;
          }
          button {
            height: 45px;
            padding: 10px;
            background: #556cd6;
            border-radius: 4px;
            color: white;
            border: 0;
            font-size: 18px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
          }
          button:hover {
            opacity: 0.8;
          }
        `}
      </style>
    </form>
  );
};

export default HomePage;

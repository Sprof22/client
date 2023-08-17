import Cookies from 'js-cookie';
import NextAuth from "next-auth";
import { GetSessionParams, getSession, useSession } from "next-auth/react";
import GoogleProvider from "next-auth/providers/google";
import Stripe from "stripe";
import { stripeCreateCustomer } from "../../../src/utils/stripe-utils"; // Update the path as needed

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  // Set your Stripe API version here
  apiVersion: "2020-08-27",
});

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "", // Use an empty string as default
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "", // Use an empty string as default
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn(user, account, profile, req) {
      try {
        console.log(user);

        // Create a Stripe customer
        const customer = await stripe.customers.create({
          email: user.user.email,
          name: user.user.name,
        });

        console.log(customer.id)
        console.log(customer)

        // Set a cookie with the stripeCustomerId
        Cookies.set( "stripeCustomerId", customer.id,{ expires: 7 });
        console.log("Cookie saved:", Cookies.get("stripeCustomerId"));

        const updatedSession = {
          ...user,
          stripeCustomerId: customer.id,
        };
        console.log("start", updatedSession, "end");
        return Promise.resolve(updatedSession);
      } catch (error) {
        console.error("Error creating Stripe customer:", error);
        throw error;
      }
    },
  },
};

export default NextAuth(authOptions);

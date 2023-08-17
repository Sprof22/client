
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  // Set your Stripe API version here
  apiVersion: "2020-08-27",
});

export async function stripeCreateCustomer(email) {
  console.log(email)
  try {
    const customer = await stripe.customers.create({
      email: email,
    });
    console.log(customer, "this should be the customer")
    return customer;
  } catch (error) {
    console.error("Error creating Stripe customer:", error);
    throw error;
  }
}

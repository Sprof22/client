const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const calculateOrderAmount = async (items: any) => {
  // Instead of returning a fixed value, get the price details from Stripe and calculate the order amount
  try {
    const priceId = "price_1NY6L8DEQmgYkM8JIrgKJlYR"; // Replace this with the actual price ID from Stripe
    const price = await stripe.prices.retrieve(priceId);

    if (!price) {
      throw new Error('Price not found in Stripe');
    }

    // Calculate the order amount based on the price unit_amount and quantity (assuming quantity is 1 in this example)
    const orderAmount = price.unit_amount * 1; // Assuming quantity is 1 for this example

    return orderAmount;
  } catch (error: any) {
    // Handle any errors that might occur while fetching price details
    console.error('Error fetching price from Stripe:', error.message);
    return 0; // Return a default value or handle the error based on your use case
  }
};

export default async function handler(req: any, res: any) {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: await calculateOrderAmount(items), // Use the calculated order amount here
    currency: "eur",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};

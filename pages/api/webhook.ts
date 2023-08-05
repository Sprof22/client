import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET!;

const webhookHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      res.status(405).json({ error: { message: "Method Not Allowed" } });
      return;
    }

    const buf = await req.body;
    const sig = req.headers["stripe-signature"] as string;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      console.log(err);
      console.log(`❌ Error message: ${errorMessage}`);

      res.status(400).json({
        error: {
          message: `Webhook Error: ${errorMessage}`,
        },
      });
      return;
    }

    // Successfully constructed event.
    console.log("✅ Success:", event.id);

    // Getting to the data we want from the event
    const subscription = event.data.object as Stripe.Subscription;
    const subscriptionId = subscription.id;

    switch (event.type) {
      case "invoice.payment_succeeded":
        // Handle customer subscription created event
        // Here, you can interact with your database to store the subscription details
        break;
      case "customer.subscription.deleted":
        // Handle customer subscription deleted event
        // Here, you can interact with your database to mark the subscription as inactive or remove it
        break;
      default:
        console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
        break;
    }

    // Return a response to acknowledge receipt of the event.
    res.status(200).json({ received: true });
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ error: { message: "Internal Server Error" } });
  }
};

export default webhookHandler;

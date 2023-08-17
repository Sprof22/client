import { NextApiRequest, NextApiResponse } from "next";
import { parse } from "cookie";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const cookies = parse(req.headers.cookie || "");
  const stripeCustomerId = cookies.stripeCustomerId;

  if (!stripeCustomerId) {
    res.status(400).json({ message: "Stripe customer ID cookie not found." });
    return;
  }

  // Now you can use stripeCustomerId to fetch subscription status
  // ... (fetch and update subscriptionStatus)
}

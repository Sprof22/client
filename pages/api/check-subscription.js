import { getSession } from 'next-auth/react';
import { stripe } from '../../utils/stripe'; // Initialize Stripe instance

export default async (req, res) => {
  const session = await getSession({ req });
  console.log(session)

  if (!session || !session.user || !session.stripeCustomerId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  try {
    const subscriptions = await stripe.subscriptions.list({
      customer: session.stripeCustomerId,
    });

    const hasActiveSubscription = subscriptions.data.some(
      (subscription) => subscription.status === 'active'
    );

    return res.status(200).json({ hasActiveSubscription });
  } catch (error) {
    return res.status(500).json({ error: 'Error checking subscription' });
  }
};

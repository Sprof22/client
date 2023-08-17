"use client"
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

function HomePage() {
  const { data: session } = useSession();
  console.log(session, )
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);

  useEffect(() => {
    async function checkSubscription() {
      try {
        const response = await axios.get('/api/check-subscription');
        setHasActiveSubscription(response.data.hasActiveSubscription);
      } catch (error) {
        console.error('Error checking subscription:', error);
      }
    }

    if (session?.user?.stripeCustomerId) {
      checkSubscription();
    }
  }, [session]);

  return (
    <div>
      {hasActiveSubscription ? (
        <p>You have an active subscription.</p>
      ) : (
        <p>You do not have an active subscription.</p>
      )}
    </div>
  );
}

export default HomePage;
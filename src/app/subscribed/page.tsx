"use client"
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function SubscriptionPage() {
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);

  useEffect(() => {
    const stripeCustomerId = Cookies.get("stripeCustomerId");
    console.log(stripeCustomerId)
    if (stripeCustomerId) {
      // Fetch subscription status using the stripeCustomerId
      fetch(`/api/sub-status?customerId=${stripeCustomerId}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
          setSubscriptionStatus(data.status);
        })
        .catch((error) => {
          console.error("Error checking subscription:", error);
        });
    } else {
        alert(`Please sign in to continue`);
    }
  }, []);
  return (
    <div>
      <h1>Subscription Status</h1>
      {subscriptionStatus === "subscribed" ? (
        <p>You are subscribed!</p>
      ) : subscriptionStatus === "not_subscribed" ? (
        <p>You are not currently subscribed.</p>
      ) : (
        <p>Checking subscription status...</p>
      )}
    </div>
  );
}

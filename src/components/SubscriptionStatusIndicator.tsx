"use client"
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

const SubscriptionStatusIndicator = () => {
  const { data: session, status } = useSession();
  const [subscriptionStatus, setSubscriptionStatus] = useState('Loading');
  const [error, setError] = useState<string | null>(null);

  console.log(session)

  useEffect(() => {
    if (status === 'authenticated') {
      const fetchSubscriptionStatus = async () => {
        try {
          console.log(session?.user?.email)
          const response = await fetch(`/api/check-subscription?email=${session?.user?.email}`);
          const data = await response.json();
          console.log(data)

          if (data.subscribed) {
            setSubscriptionStatus('Subscribed');
            setError(null);
          } else {
            setSubscriptionStatus('Not subscribed');
            setError('Subscription status not available');
          }
        } catch (error) {
          console.error('Error fetching subscription status:', error);
          setError('Error fetching subscription status');
        }
      };

      fetchSubscriptionStatus();
    }
  }, [status, session]);

  return (
    <div>
      {status === 'authenticated' ? (
        <div>
          {subscriptionStatus !== 'Loading' ? (
            <p>Subscription status: {subscriptionStatus}</p>
          ) : (
            <p>Loading subscription status...</p>
          )}
        </div>
      ) : (
        <p>User not logged in</p>
      )}

      {error && <p>{error}</p>}
    </div>
  );
};

export default SubscriptionStatusIndicator;

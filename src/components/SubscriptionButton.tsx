import { useState, useEffect } from 'react';

function SubscriptionButton() {
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    // Fetch the subscription status when the component mounts
    fetch('/api/check-subscription-status?customerId=YOUR_CUSTOMER_ID')
      .then((response) => response.json())
      .then((data) => {
        setIsSubscribed(data.isSubscribed);
      })
      .catch((error) => {
        console.error('Error fetching subscription status:', error);
      });
  }, []);

  const handleButtonClick = () => {
    if (isSubscribed) {
      // Handle unsubscribe logic
    } else {
      // Handle subscribe logic
    }
  };

  return (
    <button onClick={handleButtonClick}>
      {isSubscribed ? 'Subscribed' : 'Not Subscribed'}
    </button>
  );
}

export default SubscriptionButton;

// components/WebhookTriggerButton.tsx

"use client"
import { useState } from 'react';
const WebhookTriggerButton: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    try {
      setIsLoading(true);
      // Make a POST request to your serverless function URL
      const response = await fetch('/api/webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),

      });
      // Handle the response if needed
      if (response.ok) {
        const data = await response.json();
        console.log('Webhook triggered successfully:', data);
      } else {
        console.error('Failed to trigger webhook:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('An error occurred while triggering webhook:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button onClick={handleClick} disabled={isLoading}>
      {isLoading ? 'Loading...' : 'Trigger Webhook'}
    </button>
  );
};

export default WebhookTriggerButton;


const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


export default async function handler(req: any, res: any) {
    if (req.method === 'POST') {
      try {
        const items = req.body.items; // Extract the "items" array from the request body
        console.log(items, "we passed")
  
        let lineItems: any = [];
        items.forEach((item: any) => {
          lineItems.push({
            price: item.id,
            quantity: item.quantity
          });
        });
  
        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
          line_items: lineItems,
          mode: 'payment',
          success_url: `${req.headers.origin}/?success=true`,
          cancel_url: `${req.headers.origin}/?canceled=true`,
        });
          res.send(JSON.stringify({
        url: session.url
    }));
      } catch (err: any) {
        res.status(err.statusCode || 500).json(err.message);
      }
    } else {
      res.setHeader('Allow', 'POST');
      res.status(405).end('Method Not Allowed');
    }
  }
  

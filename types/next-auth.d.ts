// next-auth.d.ts

declare module "next-auth" {
    interface Session {
      stripeCustomerId: string; // Add your custom property here
    }
  }
"use server"

import stripe from "@/lib/stripe"
import { currentUser } from "@clerk/nextjs/server"

export async function createCheckoutSession(priceId: string) {
  const user = await currentUser()

  if (!user) {
    throw new Error("User not authenticated")
  }

  const session = await stripe.checkout.sessions.create({
    line_items: [{ price: priceId, quantity: 1 }],
    mode: "subscription",
    success_url: `${process.env.NEXT_PUBLIC_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/cancel`,
    customer_email: user.emailAddresses[0]?.emailAddress,
    subscription_data: {
      metadata: {
        userId: user.id,
      },
    },
  })

  if (!session.url) {
    throw new Error("Failed to create checkout session")
  }

  return session.url
}

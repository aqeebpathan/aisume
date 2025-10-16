"use client"

import React from "react"
import { toast } from "sonner"
import { Check } from "lucide-react"

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { createCheckoutSession } from "@/actions"
import { useRouter } from "next/navigation"

export default function SubscriptionPlans() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for trying out the AI Resume Builder.",
      features: [
        "1 AI-generated resume",
        "Basic formatting templates",
        "Export as PDF",
      ],
      buttonText: "Get Started",
      highlighted: false,
    },
    {
      name: "Pro",
      price: "$9.99 / month",
      description: "For job seekers who want polished, standout resumes.",
      features: [
        "Unlimited AI-generated resumes",
        "Premium templates & customization",
        "Cover letter generator",
        "AI feedback & optimization tips",
        "Priority support",
      ],
      buttonText: "Upgrade to Pro",
      highlighted: true,
    },
  ]

  const redirect = useRouter()

  const handleSubscribe = async (priceId: string) => {
    try {
      const redirectUrl = await createCheckoutSession(priceId)
      window.location.href = redirectUrl
    } catch (error) {
      console.log(error)
      toast.error("Failed to create checkout session. Please try again.")
    }
  }

  return (
    <section
      id="pricing"
      className="bg-background flex min-h-screen flex-col items-center justify-center px-4 py-20"
    >
      <h1 className="text-foreground mb-12 text-center text-4xl font-bold tracking-tight md:text-5xl">
        Choose Your Plan
      </h1>

      <div className="grid w-full max-w-5xl gap-8 md:grid-cols-2">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`flex flex-col justify-between rounded-2xl border transition-all duration-300 ${
              plan.highlighted
                ? "border-primary bg-card/60 ring-primary/40 shadow-lg ring-2 backdrop-blur"
                : "border-muted bg-card"
            }`}
          >
            <CardHeader>
              <CardTitle
                className={`text-2xl font-semibold ${
                  plan.highlighted ? "text-primary" : "text-foreground"
                }`}
              >
                {plan.name}
              </CardTitle>
              <p className="text-muted-foreground mt-2 text-sm">
                {plan.description}
              </p>
            </CardHeader>

            <CardContent>
              <p className="text-foreground mb-4 text-3xl font-bold">
                {plan.price}
              </p>
              <ul className="space-y-2">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="text-muted-foreground flex items-center"
                  >
                    <Check className="text-primary mr-2 h-4 w-4" /> {feature}
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter>
              <Button
                className={`w-full py-2 font-medium ${
                  plan.highlighted
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-muted text-foreground hover:bg-muted/70"
                }`}
                onClick={
                  plan.name === "Pro"
                    ? () =>
                        handleSubscribe(
                          process.env.NEXT_PUBLIC_STRIPE_PRICE_ID!,
                        )
                    : () => redirect.push("/resumes")
                }
              >
                {plan.buttonText}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}

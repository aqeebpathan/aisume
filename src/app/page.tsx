import Link from "next/link"
import { ArrowRight, Brain, Clock, Sparkles, Target } from "lucide-react"

import Navbar from "./(main)/Navbar"
import Footer from "./(main)/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="relative min-h-screen overflow-hidden bg-white dark:bg-neutral-950">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <div className="absolute top-20 left-10 h-72 w-72 animate-pulse rounded-full border border-black dark:border-white"></div>
          <div className="absolute top-40 right-20 h-96 w-96 animate-pulse rounded-full border border-black delay-700 dark:border-white"></div>
          <div className="absolute bottom-20 left-1/3 h-64 w-64 animate-pulse rounded-full border border-black delay-1000 dark:border-white"></div>
        </div>

        {/* Hero Section */}
        <main className="relative z-10 container mx-auto px-4 py-20">
          <div className="mx-auto max-w-5xl text-center">
            <div className="mb-8">
              <Badge className="mb-4 inline-flex transform items-center rounded-full border-black bg-black px-5 py-1.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 dark:border-white dark:bg-white dark:text-black">
                <Sparkles className="mr-2 h-4 w-4 animate-pulse" />
                AI-Powered Resume Builder
              </Badge>
            </div>

            {/* Typography */}
            <div className="mb-8">
              <h1 className="mb-4 text-5xl leading-none font-black tracking-tight text-black md:text-7xl dark:text-white">
                <span className="relative inline-block">
                  Create
                  <div className="absolute -bottom-2 left-0 h-1 w-full bg-black opacity-20 dark:bg-white"></div>
                </span>
                <br />
                <span className="relative inline-block">
                  Your Perfect
                  <div className="absolute top-0 right-0 rotate-12 transform rounded bg-black px-2 py-1 text-xs text-white dark:bg-white dark:text-black">
                    AI
                  </div>
                </span>
                <br />
                <span className="inline-block transform cursor-default transition-transform hover:scale-105">
                  Resume
                </span>
              </h1>
            </div>

            <p className="mx-auto mb-12 max-w-3xl text-xl leading-relaxed font-light text-neutral-600 md:text-2xl dark:text-neutral-300">
              Stop spending hours formatting. Let our AI analyze your experience
              and craft a
              <span className="font-semibold text-black dark:text-white">
                {" "}
                professional resume{" "}
              </span>
              that gets you noticed.
            </p>

            {/* CTA */}
            <div className="mb-16">
              <Link href="/resumes">
                <Button
                  size="lg"
                  className="group h-16 transform bg-black px-12 text-lg font-semibold text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
                >
                  Start Building Now
                  <div className="ml-3 flex items-center">
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    <div className="ml-1 h-2 w-2 animate-pulse rounded-full bg-white dark:bg-black"></div>
                  </div>
                </Button>
              </Link>
              <p className="mt-4 flex items-center justify-center gap-2 text-sm font-medium text-neutral-500 dark:text-neutral-400">
                <span>✨ Free forever</span> • <span>⚡ 2-minute setup</span> •
                {"  "}
                <span>🎯 ATS-optimized</span>
              </p>
            </div>

            {/* Stats */}
            <div className="mx-auto mb-20 grid max-w-2xl grid-cols-3 gap-8">
              <div className="group text-center">
                <div className="relative mb-1 text-3xl font-black text-black transition-transform group-hover:scale-110 dark:text-white">
                  <span className="line-through opacity-50">50K+</span>
                </div>
                <div className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                  Resumes Created
                </div>
              </div>
              <div className="group text-center">
                <div className="mb-1 text-3xl font-black text-black transition-transform group-hover:scale-110 dark:text-white">
                  95%
                </div>
                <div className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                  Success Rate
                </div>
              </div>
              <div className="group text-center">
                <div className="mb-1 text-3xl font-black text-black transition-transform group-hover:scale-110 dark:text-white">
                  2min
                </div>
                <div className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                  Average Time
                </div>
              </div>
            </div>

            {/* Feature Cards */}
            <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
              <div className="group relative">
                <div className="transform rounded-2xl border-2 border-neutral-100 bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:border-black hover:shadow-xl dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-white">
                  <div className="absolute -top-4 left-8">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black dark:bg-white">
                      <Brain className="h-4 w-4 text-white dark:text-black" />
                    </div>
                  </div>
                  <div className="pt-4">
                    <h3 className="mb-3 text-xl font-bold text-black dark:text-white">
                      AI Content Generation
                    </h3>
                    <p className="leading-relaxed text-neutral-600 dark:text-neutral-300">
                      Smart algorithms analyze your experience and generate
                      compelling, industry-specific content that resonates with
                      hiring managers.
                    </p>
                  </div>
                </div>
              </div>

              <div className="group relative">
                <div className="transform rounded-2xl border-2 border-neutral-100 bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:border-black hover:shadow-xl dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-white">
                  <div className="absolute -top-4 left-8">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black dark:bg-white">
                      <Target className="h-4 w-4 text-white dark:text-black" />
                    </div>
                  </div>
                  <div className="pt-4">
                    <h3 className="mb-3 text-xl font-bold text-black dark:text-white">
                      ATS Optimization
                    </h3>
                    <p className="leading-relaxed text-neutral-600 dark:text-neutral-300">
                      Built-in ATS scanner ensures your resume passes through
                      applicant tracking systems and reaches human recruiters.
                    </p>
                  </div>
                </div>
              </div>

              <div className="group relative">
                <div className="transform rounded-2xl border-2 border-neutral-100 bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:border-black hover:shadow-xl dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-white">
                  <div className="absolute -top-4 left-8">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black dark:bg-white">
                      <Clock className="h-4 w-4 text-white dark:text-black" />
                    </div>
                  </div>
                  <div className="pt-4">
                    <h3 className="mb-3 text-xl font-bold text-black dark:text-white">
                      Instant Results
                    </h3>
                    <p className="leading-relaxed text-neutral-600 dark:text-neutral-300">
                      From draft to download in minutes. Multiple formats,
                      real-time preview, and instant PDF generation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  )
}

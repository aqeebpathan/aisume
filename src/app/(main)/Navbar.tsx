"use client"

import Link from "next/link"
import { Brain } from "lucide-react"
import { UserButton, useUser } from "@clerk/nextjs"

import Logo from "@/assets/icon.svg"
import { Button } from "@/components/ui/button"
import ThemeToggle from "@/components/ThemeToggle"

const Navbar = () => {
  const { isSignedIn } = useUser()

  return (
    <header className="relative z-20 border-b border-neutral-100 bg-white/80 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        {/* Logo */}
        <Link href="/" className="group flex items-center space-x-3">
          <div className="relative">
            <div className="flex h-10 w-10 transform items-center justify-center rounded-xl bg-black transition-transform duration-300 group-hover:rotate-12 dark:bg-white">
              <Logo className="h-6 w-6 text-white dark:text-black" />
            </div>
            <div className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-black bg-white dark:border-white dark:bg-neutral-950">
              <Brain className="h-2 w-2 text-black dark:text-white" />
            </div>
          </div>
          <div>
            <span className="text-2xl font-black tracking-tight text-black dark:text-white">
              AIsume
            </span>
            <div className="-mt-1 text-xs text-neutral-600 dark:text-neutral-400">
              AI-Powered Resumes
            </div>
          </div>
        </Link>

        {/* Right side navigation */}
        <div className="flex items-center gap-4">
          {/* Navigation links (hidden on mobile) */}
          <div className="hidden items-center space-x-6 md:flex">
            <a
              href="#features"
              className="group relative font-medium text-neutral-600 transition-colors hover:text-black dark:text-neutral-300 dark:hover:text-white"
            >
              Features
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-black transition-all group-hover:w-full dark:bg-white"></span>
            </a>
            <a
              href="#pricing"
              className="group relative font-medium text-neutral-600 transition-colors hover:text-black dark:text-neutral-300 dark:hover:text-white"
            >
              Pricing
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-black transition-all group-hover:w-full dark:bg-white"></span>
            </a>
          </div>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Authentication */}
          {isSignedIn ? (
            <UserButton
              appearance={{
                elements: {
                  avatarBox: { width: 36, height: 36 },
                  userButtonAvatarBox:
                    "border-2 border-black dark:border-white",
                },
              }}
            />
          ) : (
            <Button
              variant="outline"
              className="border-2 border-black font-medium text-black hover:bg-black hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black"
              asChild
            >
              <Link href="/sign-in">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar

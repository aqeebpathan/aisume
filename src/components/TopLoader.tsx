// components/TopLoader.tsx
"use client"

import { useTheme } from "next-themes"
import NextTopLoader from "nextjs-toploader"
import { useEffect, useState } from "react"

export default function TopLoader() {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const currentTheme = theme === "system" ? resolvedTheme : theme

  return (
    <NextTopLoader
      color={currentTheme === "dark" ? "#ffffff" : "#000000"}
      height={3}
      showSpinner={false}
      shadow={
        currentTheme === "dark"
          ? "0 0 10px #ffffff,0 0 5px #ffffff"
          : "0 0 10px #000000,0 0 5px #000000"
      }
    />
  )
}

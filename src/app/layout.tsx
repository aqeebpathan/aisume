import "./globals.css"
import type { Metadata } from "next"
import { Inter_Tight } from "next/font/google"

import { ThemeProvider } from "next-themes"
import { ClerkProvider } from "@clerk/nextjs"

export const metadata: Metadata = {
  title: {
    template: "%s - AIsume",
    absolute: "AIsume - AI Resume Builder",
  },
  description: "An AI Resume Builder",
}

const interTight = Inter_Tight({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${interTight.className} antialiased`}>
          <ThemeProvider
            enableSystem
            attribute="class"
            defaultTheme="light"
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}

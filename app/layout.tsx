import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"

export const metadata: Metadata = {
  title: "Moon Phase Tracker | Current Lunar Phases & Calendar 2024",
  description:
    "Track current moon phases, lunar cycles, and astronomy events with our beautiful moon phase calendar. View today's moon phase, 7-day forecast, and monthly lunar calendar with accurate astronomical data.",
  keywords: [
    "moon phases",
    "lunar calendar",
    "moon phase tracker",
    "current moon phase",
    "lunar cycles",
    "astronomy",
    "moon phase calendar",
    "waxing crescent",
    "full moon",
    "new moon",
    "waning gibbous",
    "lunar phases 2024",
    "moon tracker",
    "astronomical calendar",
  ],
  authors: [{ name: "Lunar Phases Team" }],
  creator: "v0.app",
  publisher: "Lunar Phases",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://moon-phases.vercel.app",
    title: "Moon Phase Tracker | Current Lunar Phases & Calendar",
    description:
      "Track current moon phases, lunar cycles, and astronomy events with our beautiful moon phase calendar.",
    siteName: "Lunar Phases",
    images: [
      {
        url: "/beautiful-moon-phases-calendar-with-dark-theme.png",
        width: 1200,
        height: 630,
        alt: "Moon Phase Tracker - Current Lunar Phases Calendar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Moon Phase Tracker | Current Lunar Phases & Calendar",
    description:
      "Track current moon phases, lunar cycles, and astronomy events with our beautiful moon phase calendar.",
    images: ["/beautiful-moon-phases-calendar-with-dark-theme.png"],
  },
  alternates: {
    canonical: "https://moon-phases.vercel.app",
  },
  category: "astronomy",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Moon Phase Tracker",
              description:
                "Track current moon phases, lunar cycles, and astronomy events with our beautiful moon phase calendar.",
              url: "https://moon-phases.vercel.app",
              applicationCategory: "EducationalApplication",
              operatingSystem: "Web Browser",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              author: {
                "@type": "Organization",
                name: "Lunar Phases Team",
              },
              keywords: "moon phases, lunar calendar, astronomy, moon tracker, lunar cycles",
            }),
          }}
        />
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">{children}</body>
    </html>
  )
}

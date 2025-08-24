"use client"

import { useState, useEffect } from "react"
import { MoonDisplay } from "./moon-display"
import { getMoonPhase, type MoonPhase } from "./moon-phase-calculator"

export function CurrentPhase() {
  const [currentPhase, setCurrentPhase] = useState<MoonPhase | null>(null)
  const [currentDate, setCurrentDate] = useState<Date>(new Date())

  useEffect(() => {
    const updatePhase = () => {
      const now = new Date()
      setCurrentDate(now)
      setCurrentPhase(getMoonPhase(now))
    }

    updatePhase()
    const interval = setInterval(updatePhase, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  if (!currentPhase) {
    return (
      <div className="text-center py-8">
        <div className="animate-pulse">
          <div className="w-32 h-32 bg-muted rounded-full mx-auto mb-4"></div>
          <div className="h-6 bg-muted rounded w-48 mx-auto mb-2"></div>
          <div className="h-4 bg-muted rounded w-64 mx-auto"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="text-center py-8">
      <div className="mb-6">
        <MoonDisplay moonPhase={currentPhase} size="xl" showGlow />
      </div>

      <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
        {currentPhase.name}
      </h1>

      <p className="text-muted-foreground mb-4 max-w-md mx-auto">{currentPhase.description}</p>

      <p className="text-sm text-muted-foreground">
        {currentDate.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
    </div>
  )
}

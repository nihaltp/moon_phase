"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { MoonDisplay } from "./moon-display"
import { getMoonPhase, type MoonPhase } from "./moon-phase-calculator"

export function DatePickerView() {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split("T")[0])
  const [moonPhase, setMoonPhase] = useState<MoonPhase>(getMoonPhase(new Date()))

  const handleDateChange = (dateString: string) => {
    setSelectedDate(dateString)
    const date = new Date(dateString)
    setMoonPhase(getMoonPhase(date))
  }

  const selectedDateObj = new Date(selectedDate)

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-center mb-6">Choose a Date</h2>

      <div className="max-w-sm mx-auto">
        <Input
          type="date"
          value={selectedDate}
          onChange={(e) => handleDateChange(e.target.value)}
          className="w-full text-center bg-input border-border focus:ring-accent"
        />
      </div>

      <div className="moon-phase-card rounded-lg p-6 text-center">
        <div className="mb-4">
          <MoonDisplay moonPhase={moonPhase} size="lg" showGlow />
        </div>

        <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
          {moonPhase.name}
        </h3>

        <p className="text-muted-foreground mb-4">{moonPhase.description}</p>

        <p className="text-sm text-muted-foreground">
          {selectedDateObj.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
    </div>
  )
}

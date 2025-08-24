"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CurrentPhase } from "@/components/current-phase"
import { SevenDayForecast } from "@/components/seven-day-forecast"
import { DatePickerView } from "@/components/date-picker-view"
import { CalendarView } from "@/components/calendar-view"

type View = "current" | "forecast" | "datePicker" | "calendar"

export default function MoonPhasePage() {
  const [currentView, setCurrentView] = useState<View>("current")

  const renderView = () => {
    switch (currentView) {
      case "current":
        return <CurrentPhase />
      case "forecast":
        return <SevenDayForecast />
      case "datePicker":
        return <DatePickerView />
      case "calendar":
        return <CalendarView />
      default:
        return <CurrentPhase />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-card/20">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent">
            Lunar Phases
          </h1>
          <p className="text-muted-foreground">Track the moon's journey through its phases</p>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <Button
            variant={currentView === "current" ? "default" : "ghost"}
            onClick={() => setCurrentView("current")}
            className="bg-primary hover:bg-primary/80"
          >
            Current Phase
          </Button>
          <Button
            variant={currentView === "forecast" ? "default" : "ghost"}
            onClick={() => setCurrentView("forecast")}
            className="bg-primary hover:bg-primary/80"
          >
            Next 7 Days
          </Button>
          <Button
            variant={currentView === "datePicker" ? "default" : "ghost"}
            onClick={() => setCurrentView("datePicker")}
            className="bg-primary hover:bg-primary/80"
          >
            Choose Date
          </Button>
          <Button
            variant={currentView === "calendar" ? "default" : "ghost"}
            onClick={() => setCurrentView("calendar")}
            className="bg-primary hover:bg-primary/80"
          >
            Show Calendar
          </Button>
        </div>

        {/* Main Content */}
        <div className="bg-card/30 backdrop-blur-sm rounded-2xl border border-border/50 p-6">{renderView()}</div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>Moon phase calculations are approximate and based on astronomical data</p>
        </div>
      </div>
    </div>
  )
}

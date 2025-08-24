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
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent">
            Moon Phase Tracker - Current Lunar Phases
          </h1>
          <p className="text-muted-foreground text-lg">
            Track the moon's journey through its phases with accurate astronomical data and beautiful visualizations
          </p>
        </header>

        <nav className="flex flex-wrap justify-center gap-2 mb-8" aria-label="Moon phase navigation">
          <Button
            variant={currentView === "current" ? "default" : "ghost"}
            onClick={() => setCurrentView("current")}
            className="bg-primary hover:bg-primary/80"
            aria-label="View current moon phase"
          >
            Current Phase
          </Button>
          <Button
            variant={currentView === "forecast" ? "default" : "ghost"}
            onClick={() => setCurrentView("forecast")}
            className="bg-primary hover:bg-primary/80"
            aria-label="View 7-day moon phase forecast"
          >
            Next 7 Days
          </Button>
          <Button
            variant={currentView === "datePicker" ? "default" : "ghost"}
            onClick={() => setCurrentView("datePicker")}
            className="bg-primary hover:bg-primary/80"
            aria-label="Choose specific date for moon phase"
          >
            Choose Date
          </Button>
          <Button
            variant={currentView === "calendar" ? "default" : "ghost"}
            onClick={() => setCurrentView("calendar")}
            className="bg-primary hover:bg-primary/80"
            aria-label="View monthly moon phase calendar"
          >
            Show Calendar
          </Button>
        </nav>

        <main className="bg-card/30 backdrop-blur-sm rounded-2xl border border-border/50 p-6">{renderView()}</main>

        <footer className="text-center mt-8 text-sm text-muted-foreground">
          <p className="mb-2">
            Moon phase calculations are based on precise astronomical algorithms and lunar cycle data
          </p>
          <p>Explore lunar cycles, track moon phases, and discover the beauty of our celestial companion</p>
        </footer>
      </div>
    </div>
  )
}

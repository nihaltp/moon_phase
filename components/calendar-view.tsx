"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { MoonDisplay } from "./moon-display"
import { getMonthCalendar } from "./moon-phase-calculator"

export function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const calendar = getMonthCalendar(year, month)
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)
    if (direction === "prev") {
      newDate.setMonth(month - 1)
    } else {
      newDate.setMonth(month + 1)
    }
    setCurrentDate(newDate)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={() => navigateMonth("prev")} className="hover:bg-accent/20">
          <ChevronLeft className="w-4 h-4" />
        </Button>

        <h2 className="text-xl font-semibold">
          {monthNames[month]} {year}
        </h2>

        <Button variant="ghost" size="sm" onClick={() => navigateMonth("next")} className="hover:bg-accent/20">
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {dayNames.map((day) => (
          <div key={day} className="text-center text-sm font-medium text-muted-foreground p-2">
            {day}
          </div>
        ))}

        {calendar.map((week, weekIndex) =>
          week.map((day, dayIndex) => (
            <div key={`${weekIndex}-${dayIndex}`} className="aspect-square p-1">
              {day ? (
                <div className="moon-phase-card rounded-lg h-full flex flex-col items-center justify-center gap-1 text-center">
                  <MoonDisplay moonPhase={day.moonPhase} size="sm" />
                  <span className="text-xs font-medium">{day.date.getDate()}</span>
                </div>
              ) : (
                <div className="h-full"></div>
              )}
            </div>
          )),
        )}
      </div>
    </div>
  )
}

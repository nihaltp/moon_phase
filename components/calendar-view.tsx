"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { MoonDisplay } from "./moon-display"
import { getMonthCalendar } from "./moon-phase-calculator"

export function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const calendarRef = useRef<HTMLDivElement>(null)

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

  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      navigateMonth("next")
    } else if (isRightSwipe) {
      navigateMonth("prev")
    }
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex items-center justify-between px-2">
        <Button
          variant="ghost"
          size="lg"
          onClick={() => navigateMonth("prev")}
          className="hover:bg-accent/20 h-12 w-12 md:h-10 md:w-10 rounded-full"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-5 h-5 md:w-4 md:h-4" />
        </Button>

        <h2 className="text-lg md:text-xl font-semibold text-center flex-1 px-4">
          {monthNames[month]} {year}
        </h2>

        <Button
          variant="ghost"
          size="lg"
          onClick={() => navigateMonth("next")}
          className="hover:bg-accent/20 h-12 w-12 md:h-10 md:w-10 rounded-full"
          aria-label="Next month"
        >
          <ChevronRight className="w-5 h-5 md:w-4 md:h-4" />
        </Button>
      </div>

      <div
        ref={calendarRef}
        className="select-none"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="grid grid-cols-7 gap-0.5 md:gap-1">
          {dayNames.map((day) => (
            <div key={day} className="text-center text-xs md:text-sm font-medium text-muted-foreground p-1 md:p-2">
              <span className="hidden sm:inline">{day}</span>
              <span className="sm:hidden">{day.slice(0, 1)}</span>
            </div>
          ))}

          {calendar.map((week, weekIndex) =>
            week.map((day, dayIndex) => (
              <div key={`${weekIndex}-${dayIndex}`} className="aspect-square p-0.5 md:p-1">
                {day ? (
                  <div className="moon-phase-card rounded-md md:rounded-lg h-full flex flex-col items-center justify-center gap-0.5 md:gap-1 text-center min-h-[60px] md:min-h-[80px]">
                    <div className="flex-shrink-0">
                      <MoonDisplay moonPhase={day.moonPhase} size="xs" className="md:hidden" />
                      <MoonDisplay moonPhase={day.moonPhase} size="sm" className="hidden md:block" />
                    </div>
                    <span className="text-xs md:text-sm font-medium leading-none">{day.date.getDate()}</span>
                  </div>
                ) : (
                  <div className="h-full min-h-[60px] md:min-h-[80px]"></div>
                )}
              </div>
            )),
          )}
        </div>
      </div>

      <div className="text-center md:hidden">
        <p className="text-xs text-muted-foreground">Swipe left or right to navigate months</p>
      </div>
    </div>
  )
}

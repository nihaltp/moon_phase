"use client"

import { MoonDisplay } from "./moon-display"
import { getNext7Days } from "./moon-phase-calculator"

export function SevenDayForecast() {
  const forecast = getNext7Days()

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-center mb-6">Next 7 Days</h2>

      <div className="grid gap-3">
        {forecast.map(({ date, moonPhase }, index) => (
          <div key={index} className="moon-phase-card rounded-lg p-4 flex items-center gap-4">
            <MoonDisplay moonPhase={moonPhase} size="md" />

            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-foreground">{moonPhase.name}</h3>
                  <p className="text-sm text-muted-foreground">{moonPhase.description}</p>
                </div>

                <div className="text-right">
                  <p className="text-sm font-medium">
                    {date.toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

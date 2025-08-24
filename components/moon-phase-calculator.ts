// Moon phase calculation utilities
export interface MoonPhase {
  phase: number // 0-1, where 0 and 1 are new moon, 0.5 is full moon
  name: string
  emoji: string
  description: string
}

export function getMoonPhase(date: Date): MoonPhase {
  // Known new moon date: January 6, 2000, 18:14 UTC
  const knownNewMoon = new Date("2000-01-06T18:14:00Z")
  const synodicMonth = 29.530588853 // Average length of lunar cycle in days

  const daysSinceKnownNewMoon = (date.getTime() - knownNewMoon.getTime()) / (1000 * 60 * 60 * 24)
  const phase = (daysSinceKnownNewMoon % synodicMonth) / synodicMonth

  return {
    phase,
    ...getMoonPhaseInfo(phase),
  }
}

function getMoonPhaseInfo(phase: number): Omit<MoonPhase, "phase"> {
  if (phase < 0.0625 || phase >= 0.9375) {
    return {
      name: "New Moon",
      emoji: "🌑",
      description: "The moon is not visible from Earth",
    }
  } else if (phase < 0.1875) {
    return {
      name: "Waxing Crescent",
      emoji: "🌒",
      description: "A thin crescent of light appears",
    }
  } else if (phase < 0.3125) {
    return {
      name: "First Quarter",
      emoji: "🌓",
      description: "Half of the moon is illuminated",
    }
  } else if (phase < 0.4375) {
    return {
      name: "Waxing Gibbous",
      emoji: "🌔",
      description: "More than half of the moon is illuminated",
    }
  } else if (phase < 0.5625) {
    return {
      name: "Full Moon",
      emoji: "🌕",
      description: "The entire moon is illuminated",
    }
  } else if (phase < 0.6875) {
    return {
      name: "Waning Gibbous",
      emoji: "🌖",
      description: "The illuminated area is decreasing",
    }
  } else if (phase < 0.8125) {
    return {
      name: "Last Quarter",
      emoji: "🌗",
      description: "Half of the moon is illuminated",
    }
  } else {
    return {
      name: "Waning Crescent",
      emoji: "🌘",
      description: "A thin crescent of light remains",
    }
  }
}

export function getNext7Days(): Array<{ date: Date; moonPhase: MoonPhase }> {
  const result = []
  const today = new Date()

  for (let i = 1; i <= 7; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    result.push({
      date,
      moonPhase: getMoonPhase(date),
    })
  }

  return result
}

export function getMonthCalendar(
  year: number,
  month: number,
): Array<Array<{ date: Date; moonPhase: MoonPhase } | null>> {
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startDate = new Date(firstDay)
  startDate.setDate(startDate.getDate() - firstDay.getDay())

  const calendar = []
  let currentWeek = []

  for (let i = 0; i < 42; i++) {
    // 6 weeks max
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + i)

    if (date.getMonth() === month) {
      currentWeek.push({
        date: new Date(date),
        moonPhase: getMoonPhase(date),
      })
    } else {
      currentWeek.push(null)
    }

    if (currentWeek.length === 7) {
      calendar.push(currentWeek)
      currentWeek = []
    }
  }

  return calendar
}

import type { MoonPhase } from "./moon-phase-calculator"

interface MoonDisplayProps {
  moonPhase: MoonPhase
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  showGlow?: boolean
  className?: string
}

export function MoonDisplay({ moonPhase, size = "md", showGlow = false, className = "" }: MoonDisplayProps) {
  const sizeClasses = {
    xs: "w-6 h-6",
    sm: "w-8 h-8",
    md: "w-16 h-16",
    lg: "w-24 h-24",
    xl: "w-32 h-32",
  }

  const getMoonPhaseImageSrc = (phase: MoonPhase): string => {
    const phaseImageMap: Record<string, string> = {
      "New Moon": "/images/new-moon.png",
      "Waxing Crescent": "/images/waxing-crescent.png",
      "First Quarter": "/images/first-quarter.png",
      "Waxing Gibbous": "/images/waxing-gibbous.png",
      "Full Moon": "/images/full-moon.png",
      "Waning Gibbous": "/images/waning-gibbous.png",
      "Third Quarter": "/images/third-quarter.png",
      "Waning Crescent": "/images/waning-crescent.png",
    }

    return phaseImageMap[phase.name] || "/images/new-moon.png"
  }

  const getDetailedAltText = (phase: MoonPhase) => {
    const illuminationPercent = Math.round(phase.illumination * 100)
    return `${phase.name} moon phase - ${illuminationPercent}% illuminated lunar phase`
  }

  return (
    <div
      className={`
        relative flex items-center justify-center rounded-full backdrop-blur-sm
        ${sizeClasses[size]}
        ${showGlow ? "moon-glow" : ""}
        ${className}
        transition-all duration-300 hover:scale-105
      `}
    >
      <img
        src={getMoonPhaseImageSrc(moonPhase) || "/placeholder.svg"}
        alt={getDetailedAltText(moonPhase)}
        title={`${moonPhase.name} - ${Math.round(moonPhase.illumination * 100)}% illuminated`}
        className={`
          ${sizeClasses[size]} 
          rounded-full object-cover
          ${showGlow ? "drop-shadow-[0_0_20px_rgba(168,85,247,0.4)]" : ""}
        `}
        loading="lazy"
      />

      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle at 30% 30%, transparent 40%, hsl(280 30% 30% / 0.1) 100%)",
        }}
      />
    </div>
  )
}

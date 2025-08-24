import type { MoonPhase } from "./moon-phase-calculator"

interface MoonDisplayProps {
  moonPhase: MoonPhase
  size?: "sm" | "md" | "lg" | "xl"
  showGlow?: boolean
}

export function MoonDisplay({ moonPhase, size = "md", showGlow = false }: MoonDisplayProps) {
  const sizeClasses = {
    sm: "w-8 h-8 text-2xl",
    md: "w-16 h-16 text-4xl",
    lg: "w-24 h-24 text-6xl",
    xl: "w-32 h-32 text-8xl",
  }

  return (
    <div
      className={`
      flex items-center justify-center rounded-full bg-card/50 backdrop-blur-sm
      ${sizeClasses[size]}
      ${showGlow ? "moon-glow" : ""}
      transition-all duration-300
    `}
    >
      <span className="select-none" role="img" aria-label={moonPhase.name}>
        {moonPhase.emoji}
      </span>
    </div>
  )
}

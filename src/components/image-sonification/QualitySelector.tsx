import type { QualityMode } from "@/services/sonification"

interface QualitySelectorProps {
  quality: QualityMode
  onQualityChange: (quality: QualityMode) => void
  disabled?: boolean
}

export function QualitySelector({ quality, onQualityChange, disabled = false }: QualitySelectorProps) {
  return (
    <div className="rounded-lg border bg-muted/30 p-4">
      <p className="mb-3 text-sm font-medium">Output Mode</p>
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => onQualityChange("compressed")}
          disabled={disabled}
          className={`rounded-lg border p-3 text-left transition-all ${
            quality === "compressed"
              ? "border-primary bg-primary/10 text-primary"
              : "border-border hover:border-primary/50"
          } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <p className="font-medium text-sm">Compact</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            JPEG, ~100KB-1MB
          </p>
        </button>
        <button
          type="button"
          onClick={() => onQualityChange("full")}
          disabled={disabled}
          className={`rounded-lg border p-3 text-left transition-all ${
            quality === "full"
              ? "border-primary bg-primary/10 text-primary"
              : "border-border hover:border-primary/50"
          } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <p className="font-medium text-sm">Lossless</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            PNG quality, larger
          </p>
        </button>
      </div>
    </div>
  )
}

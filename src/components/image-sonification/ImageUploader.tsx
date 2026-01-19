import { FileUpload } from "@/components/ui/file-upload"
import type { Mode } from "./types"

interface ImageUploaderProps {
  mode: Mode
  onFileChange: (files: File[]) => void
  multiple?: boolean
}

export function ImageUploader({ mode, onFileChange, multiple = false }: ImageUploaderProps) {
  return (
    <div className="relative overflow-hidden rounded-lg border-2 border-dashed border-muted-foreground/25 transition-colors hover:border-primary/50">
      <FileUpload onChange={onFileChange} multiple={multiple} />
      <div className="pointer-events-none absolute bottom-4 left-0 right-0 text-center">
        <p className="text-xs text-muted-foreground">
          {multiple 
            ? "Select multiple images (PNG, JPG, WEBP)"
            : `Accepted: ${mode === "image-to-wav" ? "PNG, JPG, WEBP" : "WAV audio files"}`
          }
        </p>
      </div>
    </div>
  )
}

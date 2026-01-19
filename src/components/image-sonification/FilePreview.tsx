import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { IconPhoto, IconMusic, IconRefresh } from "@tabler/icons-react"
import type { Mode } from "./types"

interface FilePreviewProps {
  file: File
  previewUrl: string | null
  mode: Mode
  onReset: () => void
}

export function FilePreview({ file, previewUrl, mode, onReset }: FilePreviewProps) {
  return (
    <div className="rounded-lg border bg-muted/30 p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          {mode === "image-to-wav" ? (
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="h-12 w-12 rounded-lg object-cover"
                />
              ) : (
                <IconPhoto className="h-6 w-6 text-primary" />
              )}
            </div>
          ) : (
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <IconMusic className="h-6 w-6 text-primary" />
            </div>
          )}
          <div className="min-w-0">
            <p className="truncate font-medium">{file.name}</p>
            <p className="text-sm text-muted-foreground">
              {(file.size / (1024 * 1024)).toFixed(2)} MB
            </p>
          </div>
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={onReset}
              className="shrink-0"
            >
              <IconRefresh className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Upload a different file</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  )
}

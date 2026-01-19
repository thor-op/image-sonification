import { Button } from "@/components/ui/button"
import { IconDownload, IconPhoto, IconMusic } from "@tabler/icons-react"
import type { QualityMode } from "@/services/sonification"
import type { Mode } from "./types"
import { FilePreview } from "./FilePreview"
import { QualitySelector } from "./QualitySelector"
import { AudioPreview } from "./AudioPreview"
import { ShareButtons } from "./ShareButtons"

interface SingleFileViewProps {
  file: File
  previewUrl: string | null
  mode: Mode
  isProcessing: boolean
  resultUrl: string | null
  resultBlob: Blob | null
  resultInfo: {
    size?: string
    duration?: string
    dimensions?: string
    compressionRatio?: string
  } | null
  quality?: QualityMode
  onQualityChange?: (quality: QualityMode) => void
  onReset: () => void
  onProcess: () => void
  onDownload: () => void
}

export function SingleFileView({
  file,
  previewUrl,
  mode,
  isProcessing,
  resultUrl,
  resultBlob,
  resultInfo,
  quality,
  onQualityChange,
  onReset,
  onProcess,
  onDownload,
}: SingleFileViewProps) {
  const fileName = mode === "image-to-wav"
    ? `${file.name.split(".")[0] || "sonified"}.wav`
    : `${file.name.split(".")[0] || "reconstructed"}.png`

  return (
    <div className="space-y-4">
      <FilePreview 
        file={file}
        previewUrl={previewUrl}
        mode={mode}
        onReset={onReset}
      />

      {mode === "image-to-wav" && !resultUrl && quality && onQualityChange && (
        <QualitySelector
          quality={quality}
          onQualityChange={onQualityChange}
        />
      )}

      {!resultUrl && (
        <Button
          className="w-full"
          size="lg"
          onClick={onProcess}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Processing...
            </>
          ) : mode === "image-to-wav" ? (
            "Convert to Sound"
          ) : (
            "Convert to Image"
          )}
        </Button>
      )}

      {resultUrl && (
        <div className="space-y-4">
          <div className="rounded-lg border border-primary/20 bg-primary/10 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                {mode === "image-to-wav" ? (
                  <IconMusic className="h-5 w-5 text-primary" />
                ) : (
                  <IconPhoto className="h-5 w-5 text-primary" />
                )}
              </div>
              <div className="flex-1">
                <p className="font-medium text-primary">Conversion Complete</p>
                <p className="text-sm text-muted-foreground">
                  Your {mode === "image-to-wav" ? "audio" : "image"} file is ready
                </p>
                {resultInfo && (
                  <div className="mt-1 flex flex-wrap gap-x-3 text-xs text-muted-foreground">
                    {resultInfo.size && <span>Size: {resultInfo.size}</span>}
                    {resultInfo.duration && <span>Duration: {resultInfo.duration}</span>}
                    {resultInfo.dimensions && <span>Dimensions: {resultInfo.dimensions}</span>}
                    {resultInfo.compressionRatio && <span>Compression: {resultInfo.compressionRatio}</span>}
                  </div>
                )}
              </div>
            </div>
          </div>

          {mode === "image-to-wav" && <AudioPreview audioUrl={resultUrl} />}

          {mode === "wav-to-image" && (
            <div className="rounded-lg border p-4">
              <p className="mb-2 text-sm font-medium">Preview</p>
              <img
                src={resultUrl}
                alt="Reconstructed"
                className="mx-auto max-h-64 rounded-lg object-contain"
              />
            </div>
          )}

          <div className="flex gap-2">
            <Button className="flex-1" size="lg" onClick={onDownload}>
              <IconDownload className="h-4 w-4" />
              Download
            </Button>
            <ShareButtons 
              resultBlob={resultBlob}
              fileName={fileName}
              mode={mode}
            />
          </div>
        </div>
      )}
    </div>
  )
}

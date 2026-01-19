import * as React from "react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { AudioWaveform } from "@/components/ui/waveform"
import { IconPlayerPlay, IconPlayerPause } from "@tabler/icons-react"

interface AudioPreviewProps {
  audioUrl: string
  title?: string
}

export function AudioPreview({ audioUrl, title = "Preview" }: AudioPreviewProps) {
  const audioRef = React.useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = React.useState(false)

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <div className="rounded-lg border p-4 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">{title}</p>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={togglePlayPause}
              className="shrink-0"
            >
              {isPlaying ? (
                <IconPlayerPause className="h-4 w-4" />
              ) : (
                <IconPlayerPlay className="h-4 w-4" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isPlaying ? "Pause" : "Play"} audio</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="rounded-lg bg-muted/30 p-2">
        <AudioWaveform
          audioRef={audioRef}
          playing={isPlaying}
          height={48}
          barWidth={3}
          barGap={2}
          barRadius={1}
          barColor="#e11d48"
        />
      </div>
      <audio
        ref={audioRef}
        src={audioUrl}
        onEnded={() => setIsPlaying(false)}
        className="hidden"
        crossOrigin="anonymous"
      />
    </div>
  )
}

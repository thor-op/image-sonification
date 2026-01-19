import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { IconShare, IconBrandX } from "@tabler/icons-react"
import type { Mode } from "./types"

interface ShareButtonsProps {
  resultBlob: Blob | null
  fileName: string
  mode: Mode
}

export function ShareButtons({ resultBlob, fileName, mode }: ShareButtonsProps) {
  const handleShare = async () => {
    if (!resultBlob) return

    const fileToShare = new File(
      [resultBlob],
      fileName,
      { type: resultBlob.type }
    )

    if (navigator.share && navigator.canShare({ files: [fileToShare] })) {
      try {
        await navigator.share({
          title: "Image Sonification",
          text: mode === "image-to-wav"
            ? "Check out this image converted to sound!"
            : "Check out this image reconstructed from sound!",
          files: [fileToShare],
        })
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          console.error("Share failed:", err)
        }
      }
    } else {
      alert("Sharing is not supported on this device. Please use the download button.")
    }
  }

  const handleShareToTwitter = () => {
    const text = mode === "image-to-wav"
      ? "Just converted an image to sound using Image Sonification! 🎵🖼️"
      : "Just reconstructed an image from sound using Image Sonification! 🖼️🎵"
    const url = "https://sonification.shiva.codes"
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
    window.open(tweetUrl, "_blank", "noopener,noreferrer")
  }

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="lg" onClick={handleShare}>
            <IconShare className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Share {mode === "image-to-wav" ? "audio" : "image"}</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="lg" onClick={handleShareToTwitter}>
            <IconBrandX className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Share on X (Twitter)</p>
        </TooltipContent>
      </Tooltip>
    </>
  )
}

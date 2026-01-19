import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface ImageMagnifierDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  imageUrl: string
  fileName: string
}

export function ImageMagnifierDialog({
  open,
  onOpenChange,
  imageUrl,
  fileName,
}: ImageMagnifierDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[90vw] max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>{fileName}</DialogTitle>
          <DialogDescription>
            Click anywhere outside to close
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center">
          <img
            src={imageUrl}
            alt={fileName}
            className="max-w-full max-h-[75vh] object-contain rounded-lg"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

import { Card, CardContent } from "@/components/ui/card"
import { IconPhoto, IconMusic } from "@tabler/icons-react"

export function InfoSection() {
  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2">
      <Card className="bg-muted/30">
        <CardContent className="pt-4">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <IconPhoto className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="font-medium">Image to Sound</p>
              <p className="text-sm text-muted-foreground">
                Upload PNG, JPG, or WEBP images to convert them into unique
                audio signatures
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-muted/30">
        <CardContent className="pt-4">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <IconMusic className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="font-medium">Sound to Image</p>
              <p className="text-sm text-muted-foreground">
                Upload a previously generated WAV file to reconstruct the
                original image
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

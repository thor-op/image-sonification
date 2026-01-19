import * as React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { IconPhoto, IconMusic } from "@tabler/icons-react"
import { useTheme } from "@/components/theme-provider"
import type { QualityMode } from "@/services/sonification"
import type { Mode, BulkState } from "./types"
import { Header } from "./Header"
import { ImageToAudioTab } from "./ImageToAudioTab"
import { AudioToImageTab } from "./AudioToImageTab"
import { InfoSection } from "./InfoSection"
import { FAQSection } from "./FAQSection"
import { useImageSonificationHandlers } from "./useImageSonificationHandlers"

export function ImageSonification() {
  const [mode, setMode] = React.useState<Mode>("image-to-wav")
  const [quality, setQuality] = React.useState<QualityMode>("compressed")
  
  const [imageToWavBulkState, setImageToWavBulkState] = React.useState<BulkState>({
    files: [],
    processedFiles: [],
    isProcessing: false,
    currentIndex: 0,
  })
  
  const [wavToImageBulkState, setWavToImageBulkState] = React.useState<BulkState>({
    files: [],
    processedFiles: [],
    isProcessing: false,
    currentIndex: 0,
  })
  
  const currentBulkState = mode === "image-to-wav" ? imageToWavBulkState : wavToImageBulkState
  const setCurrentBulkState = mode === "image-to-wav" ? setImageToWavBulkState : setWavToImageBulkState
  
  const { theme, setTheme } = useTheme()

  const handlers = useImageSonificationHandlers({
    mode,
    quality,
    bulkState: currentBulkState,
    setBulkState: setCurrentBulkState,
  })

  const cycleTheme = () => {
    const themes: Array<"light" | "dark" | "system"> = ["light", "dark", "system"]
    const currentIndex = themes.indexOf(theme as "light" | "dark" | "system")
    const nextIndex = (currentIndex + 1) % themes.length
    setTheme(themes[nextIndex])
  }

  const getThemeLabel = () => {
    switch (theme) {
      case "light":
        return "Light"
      case "dark":
        return "Dark"
      default:
        return "System"
    }
  }

  const handleModeChange = (value: string) => {
    setMode(value as Mode)
  }

  return (
    <div className="min-h-screen bg-background px-4 py-8 md:py-12">
      <div className="mx-auto max-w-2xl">
        <Header 
          theme={theme}
          onThemeChange={cycleTheme}
          getThemeLabel={getThemeLabel}
        />

        <Tabs value={mode} onValueChange={handleModeChange} className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="image-to-wav" className="flex-1 gap-2 cursor-pointer">
              <IconPhoto className="h-4 w-4" />
              <span className="hidden sm:inline">Image to Sound</span>
              <span className="sm:hidden">Img to Audio</span>
            </TabsTrigger>
            <TabsTrigger value="wav-to-image" className="flex-1 gap-2">
              <IconMusic className="h-4 w-4" />
              <span className="hidden sm:inline">Sound to Image</span>
              <span className="sm:hidden">Audio to Img</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="image-to-wav" className="mt-6">
            <ImageToAudioTab
              bulkState={currentBulkState}
              quality={quality}
              onQualityChange={setQuality}
              onFileChange={handlers.handleFileChange}
              onBulkProcess={handlers.handleBulkProcess}
              onBulkDownloadAll={handlers.handleBulkDownloadAll}
              onRemoveBulkFile={handlers.handleRemoveBulkFile}
              onReset={handlers.handleReset}
            />
          </TabsContent>

          <TabsContent value="wav-to-image" className="mt-6">
            <AudioToImageTab
              bulkState={currentBulkState}
              onFileChange={handlers.handleFileChange}
              onBulkProcess={handlers.handleBulkProcess}
              onBulkDownloadAll={handlers.handleBulkDownloadAll}
              onRemoveBulkFile={handlers.handleRemoveBulkFile}
              onReset={handlers.handleReset}
            />
          </TabsContent>
        </Tabs>

        <InfoSection />
        <FAQSection />

        <footer className="mt-12 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>© Shiva Bhattacharjee {new Date().getFullYear()}</p>
        </footer>
      </div>
    </div>
  )
}

export default ImageSonification

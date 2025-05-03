"use client"

import type React from "react"

import { useState } from "react"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"
import { Progress } from "@/components/ui/progress"

export function DownloadButton({
  fileName,
  fileUrl = "#", // In a real app, this would be a real URL
  children,
  variant = "outline",
  size = "sm",
}: {
  fileName: string
  fileUrl?: string
  children?: React.ReactNode
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}) {
  const [downloading, setDownloading] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleDownload = () => {
    setDownloading(true)
    setProgress(0)

    // Simulate download progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 10
        if (newProgress >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setDownloading(false)
            toast({
              title: "Download complete",
              description: `${fileName} has been downloaded successfully.`,
            })
          }, 500)
        }
        return newProgress
      })
    }, 300)

    // In a real app, you would use something like:
    // const link = document.createElement('a')
    // link.href = fileUrl
    // link.download = fileName
    // document.body.appendChild(link)
    // link.click()
    // document.body.removeChild(link)
  }

  return (
    <div className="relative">
      <Button variant={variant} size={size} onClick={handleDownload} disabled={downloading}>
        {!downloading && <Download className="w-4 h-4 mr-2" />}
        {children || "Download"}
      </Button>

      {downloading && (
        <div className="absolute -bottom-6 left-0 right-0 flex items-center gap-2">
          <Progress value={progress} className="h-1" />
          <span className="text-xs text-white/60">{progress}%</span>
        </div>
      )}
    </div>
  )
}

"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"
import { DownloadButton } from "@/components/download-handler"

export function PDFViewer({
  title,
  fileName = "document.pdf",
}: {
  title: string
  pdfUrl?: string
  fileName?: string
}) {
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages] = useState(5) // Mock total pages
  const [zoom, setZoom] = useState(100)
  const [isLoading, setIsLoading] = useState(false)

  // Always use placeholder for preview in this demo
  const placeholderUrl = "/placeholder.svg?height=800&width=600"

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Link copied!",
        description: "The link has been copied to your clipboard.",
      })
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handleZoomIn = () => {
    if (zoom < 200) {
      setZoom(zoom + 25)
    }
  }

  const handleZoomOut = () => {
    if (zoom > 50) {
      setZoom(zoom - 25)
    }
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-white">{title}</h3>
        <div className="flex gap-2">
          <DownloadButton fileName={fileName}>Download PDF</DownloadButton>
          <Button variant="outline" size="sm" onClick={handleShare}>
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      <div className="w-full bg-black/30 rounded-lg overflow-hidden">
        <div className="flex items-center justify-between p-2 bg-white/5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={handlePrevPage} disabled={currentPage === 1}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm text-white/70">
              Page {currentPage} of {totalPages}
            </span>
            <Button variant="ghost" size="sm" onClick={handleNextPage} disabled={currentPage === totalPages}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={handleZoomOut} disabled={zoom <= 50}>
              <ZoomOut className="w-4 h-4" />
            </Button>
            <span className="text-sm text-white/70">{zoom}%</span>
            <Button variant="ghost" size="sm" onClick={handleZoomIn} disabled={zoom >= 200}>
              <ZoomIn className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="aspect-[4/3] w-full flex items-center justify-center bg-white/5 p-4">
          {/* This is a placeholder for a real PDF viewer */}
          <div
            className="w-full h-full bg-white rounded-lg flex items-center justify-center overflow-hidden"
            style={{ transform: `scale(${zoom / 100})`, transition: "transform 0.2s ease" }}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center p-8">
                <img
                  src={placeholderUrl || "/placeholder.svg"}
                  alt="PDF Preview"
                  className="w-full h-full object-contain"
                />
                <div className="mt-4 text-gray-700">
                  <h3 className="font-medium text-lg">{title}</h3>
                  <p className="text-sm mt-2">This is a placeholder for the actual PDF content.</p>
                  <p className="text-sm mt-1">
                    In a production environment, this would display the actual PDF document.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

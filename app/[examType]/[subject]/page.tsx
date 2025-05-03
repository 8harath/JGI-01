"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Pacifico } from "next/font/google"
import Link from "next/link"
import { ArrowLeft, BookOpen, FileText, Layers, Link2, Share2 } from "lucide-react"
import { cn } from "@/lib/utils"
import ElegantShape from "@/components/elegant-shape"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"
import { Footer } from "@/components/footer"
import { PDFViewer } from "@/components/pdf-viewer"
import { DownloadButton } from "@/components/download-handler"

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
})

// Define the tabs for the subject page
const tabs = [
  { id: "tlep", label: "TLEP", icon: <FileText className="w-5 h-5" /> },
  { id: "cheatsheet", label: "Cheat Sheet", icon: <BookOpen className="w-5 h-5" /> },
  { id: "modules", label: "Modules", icon: <Layers className="w-5 h-5" /> },
  { id: "resources", label: "Resources", icon: <Link2 className="w-5 h-5" /> },
]

export default function SubjectPage({ params }: { params: { examType: string; subject: string } }) {
  const [activeTab, setActiveTab] = useState("tlep")
  const [currentModule, setCurrentModule] = useState(3)

  // Format the subject name and exam type for display
  const formattedSubject = params.subject
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  const formattedExamType = params.examType.charAt(0).toUpperCase() + params.examType.slice(1)

  // Generate folder path for resources
  const resourcePath = `/documents/${params.examType}/${params.subject}`

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.2 + i * 0.1,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  }

  // Function to handle sharing/copying link
  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Link copied!",
        description: "The link has been copied to your clipboard.",
      })
    } else {
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement("textarea")
      textArea.value = window.location.href
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      document.execCommand("copy")
      document.body.removeChild(textArea)
      toast({
        title: "Link copied!",
        description: "The link has been copied to your clipboard.",
      })
    }
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center overflow-hidden bg-[#030303]">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />

      {/* Background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={600}
          height={140}
          rotate={12}
          gradient="from-indigo-500/[0.15]"
          className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
        />

        <ElegantShape
          delay={0.5}
          width={500}
          height={120}
          rotate={-15}
          gradient="from-rose-500/[0.15]"
          className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6 py-8 w-full max-w-5xl">
        {/* Back button and title */}
        <div className="mb-8">
          <Link
            href={`/${params.examType}`}
            className="inline-flex items-center text-white/60 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to {formattedExamType}
          </Link>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <motion.div custom={0} variants={fadeUpVariants} initial="hidden" animate="visible">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{formattedSubject}</h1>
              <p
                className={cn(
                  "text-xl md:text-2xl",
                  "bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300",
                  pacifico.className,
                )}
              >
                {formattedExamType} Examination
              </p>
            </motion.div>

            <motion.div
              custom={1}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="mt-4 md:mt-0"
            >
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Tab navigation */}
        <motion.div custom={1} variants={fadeUpVariants} initial="hidden" animate="visible" className="mb-8">
          <div className="flex flex-wrap gap-2 md:gap-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full transition-all",
                  "backdrop-blur-sm border",
                  activeTab === tab.id
                    ? "bg-white/10 border-white/20 text-white"
                    : "bg-white/[0.03] border-white/[0.08] text-white/60 hover:text-white/90",
                )}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab content */}
        <motion.div
          custom={2}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="w-full backdrop-blur-sm bg-white/[0.03] border border-white/[0.08] rounded-xl p-6"
        >
          {activeTab === "tlep" && (
            <div>
              <PDFViewer title="TLEP Document" fileName={`${resourcePath}/TLEP Document.pdf`} />
            </div>
          )}

          {activeTab === "cheatsheet" && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-white">Cheat Sheet</h2>
                <DownloadButton fileName={`${resourcePath}/Cheat Sheet.pdf`}>Download</DownloadButton>
              </div>

              <div className="space-y-6">
                <div className="bg-white/[0.03] rounded-lg p-4">
                  <h3 className="text-lg font-medium text-white mb-2">Marks Division Blueprint</h3>
                  <p className="text-white/70">Detailed breakdown of mark allocation for the exam.</p>
                </div>

                <div className="bg-white/[0.03] rounded-lg p-4">
                  <h3 className="text-lg font-medium text-white mb-2">Important Questions</h3>
                  <ul className="list-disc list-inside text-white/70 space-y-2">
                    <li>Key question 1 for this subject</li>
                    <li>Key question 2 for this subject</li>
                    <li>Key question 3 for this subject</li>
                  </ul>
                </div>

                <div className="bg-white/[0.03] rounded-lg p-4">
                  <h3 className="text-lg font-medium text-white mb-2">Reporting Questions</h3>
                  <p className="text-white/70">Questions that are likely to appear in the reporting section.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "modules" && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-white">Modules</h2>
                <DownloadButton fileName={`${resourcePath}/All Modules.zip`}>Download All</DownloadButton>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Show different number of modules based on exam type */}
                {params.examType === "preparatory"
                  ? [1, 2, 3].map((moduleNum) => (
                      <div
                        key={moduleNum}
                        className="bg-white/[0.03] hover:bg-white/[0.08] transition-colors rounded-lg p-4"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-medium text-white">Module {moduleNum}</h3>
                          <DownloadButton
                            fileName={`${resourcePath}/Module ${moduleNum}.pdf`}
                            variant="ghost"
                            size="sm"
                          >
                            <span className="sr-only">Download Module {moduleNum}</span>
                          </DownloadButton>
                        </div>
                        <p className="text-white/70 mb-3">Presentation slides and materials for Module {moduleNum}.</p>
                        <button
                          onClick={() => {
                            setActiveTab("viewModule")
                            setCurrentModule(moduleNum)
                          }}
                          className="text-indigo-300 hover:text-indigo-200 transition-colors text-sm flex items-center"
                        >
                          <FileText className="w-4 h-4 mr-1" /> View Presentation
                        </button>
                      </div>
                    ))
                  : [1, 2, 3, 4, 5].map((moduleNum) => (
                      <div
                        key={moduleNum}
                        className="bg-white/[0.03] hover:bg-white/[0.08] transition-colors rounded-lg p-4"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-medium text-white">Module {moduleNum}</h3>
                          <DownloadButton
                            fileName={`${resourcePath}/Module ${moduleNum}.pdf`}
                            variant="ghost"
                            size="sm"
                          >
                            <span className="sr-only">Download Module {moduleNum}</span>
                          </DownloadButton>
                        </div>
                        <p className="text-white/70 mb-3">Presentation slides and materials for Module {moduleNum}.</p>
                        <button
                          onClick={() => {
                            setActiveTab("viewModule")
                            setCurrentModule(moduleNum)
                          }}
                          className="text-indigo-300 hover:text-indigo-200 transition-colors text-sm flex items-center"
                        >
                          <FileText className="w-4 h-4 mr-1" /> View Presentation
                        </button>
                      </div>
                    ))}
              </div>
            </div>
          )}

          {activeTab === "viewModule" && (
            <div>
              <div className="flex items-center mb-4">
                <button
                  onClick={() => setActiveTab("modules")}
                  className="mr-4 text-white/60 hover:text-white transition-colors flex items-center"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" /> Back to Modules
                </button>
                <h2 className="text-xl font-semibold text-white">Module {currentModule} Presentation</h2>
              </div>
              <PDFViewer
                title={`Module ${currentModule} Presentation`}
                fileName={`${resourcePath}/Module ${currentModule}.pdf`}
              />
            </div>
          )}

          {activeTab === "resources" && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-white">Additional Resources</h2>
                <DownloadButton fileName={`${resourcePath}/All Resources.zip`}>Download All</DownloadButton>
              </div>

              <div className="space-y-6">
                <div className="bg-white/[0.03] rounded-lg p-4">
                  <h3 className="text-lg font-medium text-white mb-2">External Resources</h3>
                  <ul className="space-y-3">
                    <li className="flex justify-between items-center">
                      <a href="#" className="text-indigo-300 hover:text-indigo-200 transition-colors flex items-center">
                        <Link2 className="w-4 h-4 mr-2" /> Resource Link 1
                      </a>
                      <DownloadButton fileName={`${resourcePath}/Resource 1.pdf`} variant="ghost" size="sm">
                        <span className="sr-only">Download Resource 1</span>
                      </DownloadButton>
                    </li>
                    <li className="flex justify-between items-center">
                      <a href="#" className="text-indigo-300 hover:text-indigo-200 transition-colors flex items-center">
                        <Link2 className="w-4 h-4 mr-2" /> Resource Link 2
                      </a>
                      <DownloadButton fileName={`${resourcePath}/Resource 2.pdf`} variant="ghost" size="sm">
                        <span className="sr-only">Download Resource 2</span>
                      </DownloadButton>
                    </li>
                    <li className="flex justify-between items-center">
                      <a href="#" className="text-indigo-300 hover:text-indigo-200 transition-colors flex items-center">
                        <Link2 className="w-4 h-4 mr-2" /> Resource Link 3
                      </a>
                      <DownloadButton fileName={`${resourcePath}/Resource 3.pdf`} variant="ghost" size="sm">
                        <span className="sr-only">Download Resource 3</span>
                      </DownloadButton>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/[0.03] rounded-lg p-4">
                  <h3 className="text-lg font-medium text-white mb-2">Additional Notes</h3>
                  <p className="text-white/70 mb-3">Supplementary study materials and notes for this subject.</p>
                  <div className="flex justify-end">
                    <DownloadButton fileName={`${resourcePath}/Additional Notes.pdf`} variant="ghost" size="sm">
                      Download Notes
                    </DownloadButton>
                  </div>
                </div>

                {/* PDF Viewer at the end of resources section */}
                <div className="bg-white/[0.03] rounded-lg p-4">
                  <PDFViewer title="Reference Material" fileName={`${resourcePath}/Reference Material.pdf`} />
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      <Footer />

      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
    </div>
  )
}

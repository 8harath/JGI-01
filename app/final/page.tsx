"use client"

import { motion } from "framer-motion"
import { Pacifico } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import ElegantShape from "@/components/elegant-shape"
import { Footer } from "@/components/footer"

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
})

const subjects = [
  "Introduction to Data Analytics",
  "Probability and Statistics",
  "Programming in Python",
  "Indian Constitution",
  "Entrepreneurship",
]

export default function FinalPage() {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.3 + i * 0.1,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
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
        {/* Back button */}
        <Link href="/" className="inline-flex items-center text-white/60 hover:text-white transition-colors mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        {/* Header with title and image */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <motion.div custom={0} variants={fadeUpVariants} initial="hidden" animate="visible" className="max-w-2xl">
            <h1
              className={cn(
                "text-4xl md:text-6xl font-bold tracking-tight mb-4",
                "bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300",
                pacifico.className,
              )}
            >
              Final
            </h1>
            <p className="text-white/70 text-lg leading-relaxed">
              The Final examinations are the culmination of your semester's work in the Data Analytics program. These
              comprehensive assessments evaluate your understanding of all five core subjects and determine your
              semester grade. Prepare thoroughly with our curated resources.
            </p>
          </motion.div>

          <motion.div
            custom={1}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="mt-6 md:mt-0 w-full md:w-64 h-40 bg-white/10 rounded-lg overflow-hidden flex-shrink-0"
          >
            <Image
              src="/placeholder.svg?height=160&width=256"
              alt="Final Timetable"
              width={256}
              height={160}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        {/* Subjects Grid */}
        <motion.div custom={2} variants={fadeUpVariants} initial="hidden" animate="visible">
          <h2 className="text-2xl font-bold text-white mb-6">Subjects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject, index) => (
              <Link
                key={index}
                href={`/final/${subject.toLowerCase().replace(/\s+/g, "-")}`}
                className="backdrop-blur-sm bg-white/[0.03] border border-white/[0.08] rounded-xl p-6 hover:bg-white/[0.05] transition-all hover:scale-[1.02]"
              >
                <h3 className="text-xl font-semibold text-white mb-3">{subject}</h3>
                <p className="text-white/60 mb-4">Access study materials and resources for this subject.</p>
                <div className="inline-flex items-center text-indigo-300">
                  <span>View Details</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>

      <Footer />

      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
    </div>
  )
}

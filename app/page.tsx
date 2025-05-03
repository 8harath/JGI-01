"use client"

import { motion } from "framer-motion"
import { Pacifico } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import ElegantShape from "@/components/elegant-shape"
import { Footer } from "@/components/footer"

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
})

export default function HomePage() {
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

        <ElegantShape
          delay={0.4}
          width={300}
          height={80}
          rotate={-8}
          gradient="from-violet-500/[0.15]"
          className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6 py-12 w-full max-w-4xl">
        {/* Title */}
        <motion.div
          custom={0}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-16"
        >
          <h1
            className={cn(
              "text-6xl md:text-8xl font-bold tracking-tight",
              "bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300",
              pacifico.className,
            )}
          >
            AVALON
          </h1>
          <p className="text-white/40 mt-4 text-lg">4th Semester Data Analytics, BCA, D Section</p>
        </motion.div>

        {/* Section Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Preparatory Section Card */}
          <motion.div custom={1} variants={fadeUpVariants} initial="hidden" animate="visible" className="w-full h-full">
            <Link
              href="/preparatory"
              className="block h-full backdrop-blur-sm bg-white/[0.03] border border-white/[0.08] rounded-xl p-6 hover:bg-white/[0.05] transition-all hover:scale-[1.02] hover:shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]"
            >
              <div className="flex flex-col h-full">
                <h2 className="text-2xl font-bold text-white mb-4">Preparatory</h2>
                <div className="w-full h-40 bg-white/10 rounded-md mb-4 overflow-hidden">
                  <Image
                  src="/images/TT-pREP.png"
                  alt="Preparatory Examination"
                  width={320}
                  height={160}
                  className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-white/60 mb-4 flex-grow">
                  Access study materials, cheat sheets, and resources for your preparatory examinations.
                </p>
                <div className="inline-flex items-center text-indigo-300">
                  <span>Explore Preparatory</span>
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
              </div>
            </Link>
          </motion.div>

          {/* Final Section Card */}
          <motion.div custom={2} variants={fadeUpVariants} initial="hidden" animate="visible" className="w-full h-full">
            <Link
              href="/final"
              className="block h-full backdrop-blur-sm bg-white/[0.03] border border-white/[0.08] rounded-xl p-6 hover:bg-white/[0.05] transition-all hover:scale-[1.02] hover:shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]"
            >
              <div className="flex flex-col h-full">
                <h2 className="text-2xl font-bold text-white mb-4">Final</h2>
                <div className="w-full h-40 bg-white/10 rounded-md mb-4 overflow-hidden">
                  <Image
                  src="/images/tt-final.png"
                  alt="Final Examination"
                  width={320}
                  height={160}
                  className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-white/60 mb-4 flex-grow">
                  Comprehensive materials and resources to prepare for your final semester examinations.
                </p>
                <div className="inline-flex items-center text-indigo-300">
                  <span>Explore Final</span>
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
              </div>
            </Link>
          </motion.div>
        </div>
      </div>

      <Footer />

      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
    </div>
  )
}

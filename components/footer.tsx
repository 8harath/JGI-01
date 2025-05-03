import Link from "next/link"
import { cn } from "@/lib/utils"
import { Pacifico } from "next/font/google"

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
})

export function Footer() {
  return (
    <footer className="relative z-10 w-full py-6 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center">
          <div className="mb-4">
            <span
              className={cn(
                "text-2xl",
                "bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300",
                pacifico.className,
              )}
            >
              AVALON
            </span>
          </div>

          <p className="text-white/60 text-center">
            Built with care by{" "}
            <Link
              href="https://bharath.studio"
              target="_blank"
              className="text-indigo-300 hover:text-indigo-200 transition-colors"
            >
              Bharath
            </Link>
          </p>

          <p className="text-white/40 text-sm mt-2">© {new Date().getFullYear()} AVALON. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

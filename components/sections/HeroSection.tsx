'use client'

import Image from "next/image"
import heroImage from "@/assets/hero-section.png"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/featured/Navbar"

export function HeroSection() {
  return (
    <section className="relative h-[760px] overflow-hidden bg-gradient-to-b from-sky-100 to-sky-200">

      {/* Hero Background Image */}
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt="Welcome to Sunshine Preschool"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col h-full">

        {/* Navbar */}
        <header>
          <Navbar />
        </header>

        {/* Hero Content */}
        <div className="flex-1 flex lg:my-40 my-10 md:my-20">
          <div className="container mx-auto px-6">
            <div className="max-w-lg">

              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4 leading-tight">
                Welcome to <br /> Sunshine Preschool!
              </h2>

              <p className="text-base md:text-lg text-slate-700 mb-8">
                A happy place for little learners to grow, play, and explore!
              </p>

              <div className="flex flex-wrap gap-4">

                <Button className="bg-amber-400 hover:bg-amber-500 text-white rounded-full px-8 py-5 text-base font-semibold shadow-md transition-all">
                  • Learn More •
                </Button>

                <Button className="bg-red-500 hover:bg-red-600 text-white rounded-full px-8 py-5 text-base font-semibold shadow-md transition-all">
                  Schedule a Visit
                </Button>

              </div>

            </div>
          </div>
        </div>

      </div>

{/* Bottom Convex Curve */}
<div className="absolute bottom-0 left-0 w-full leading-none">
  <svg
    viewBox="0 0 1440 150"
    className="w-full h-[120px]"
    preserveAspectRatio="none"
  >
    <path
      d="M0,0 C360,140 1080,140 1440,0 L1440,150 L0,150 Z"
      className="fill-white"
    />
  </svg>
</div>



    </section>
  )
}
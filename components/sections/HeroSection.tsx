import Image from 'next/image';
import heroImage from '@/assets/hero-section.png';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/featured/Navbar';

export function HeroSection() {
  return (
    <section className="relative h-[760px] overflow-hidden bg-gradient-to-b from-sky-100 to-sky-200">
      {/* Hero illustration pinned to bottom-right */}
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt="Welcome to Sunshine Preschool"
          fill
          priority
          className="object-cover object-bottom"
        />
      </div>

      {/* Navbar + centered hero text */}
      <div className="relative z-10 flex flex-col h-full">
        <header>
          <Navbar />
        </header>

        {/* Hero Text — vertically centered within remaining space */}
        <div className="flex-1 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-lg">
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4 leading-tight">
                Welcome to<br />Sunshine Preschool!
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
    </section>
  );
}
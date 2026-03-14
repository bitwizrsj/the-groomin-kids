'use client';

import { useRef, useState, useEffect } from 'react';
import { useScroll, motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';

import feature1 from '@/assets/feature1.png';
import feature2 from '@/assets/feature2.png';
import feature3 from '@/assets/feature3.png';

const features = [
  {
    title: 'Loving Environment',
    description: 'We provide a safe, nurturing and playful atmosphere where every child feels welcomed, valued, and free to express themselves with confidence.',
    titleColor: '#EF4444',
    sectionBg: 'linear-gradient(135deg, #FFF1F2 0%, #FFE4E6 50%, #FECDD3 100%)',
    image: feature1,
  },
  {
    title: 'Experienced Teachers',
    description: 'Our caring and qualified early childhood educators bring warmth, expertise, and creativity to guide each child through their unique learning journey.',
    titleColor: '#F97316',
    sectionBg: 'linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 50%, #FED7AA 100%)',
    image: feature2,
  },
  {
    title: 'Fun Activities',
    description: 'Creative and engaging learning experiences designed to spark curiosity, build skills, and make every school day an adventure to look forward to.',
    titleColor: '#EAB308',
    sectionBg: 'linear-gradient(135deg, #FEFCE8 0%, #FEF9C3 50%, #FEF08A 100%)',
    image: feature3,
  },
];

export function WhyChooseUsSection() {
  const containerRef = useRef<HTMLElement>(null);
  // FIX 1: Default to 0 so the layout is pre-calculated
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (value) => {
      // Calculate index based on scroll
      const index = Math.min(
        Math.floor(value * features.length),
        features.length - 1
      );
      setActiveIndex(index);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  const currentBg = features[activeIndex].sectionBg;

  return (
    <section
      id="why-choose-us"
      ref={containerRef}
      className="relative"
      style={{ height: `${features.length * 100}vh` }} // Adjusted height logic
    >
      <div
        className="sticky top-0 h-screen w-full transition-colors duration-700"
        style={{ background: currentBg }}
      >
        {/* FIX 2: items-start and pt-24/32 keeps the header fixed at the top */}
        <div className="h-full flex items-start pt-24 md:pt-32">
          <div className="max-w-7xl mx-auto w-full px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-10">

            {/* LEFT */}
            <div className="flex flex-col">
              <p className="text-sky-500 text-sm font-semibold uppercase tracking-widest mb-3">
                Why Choose Us?
              </p>

              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-800 mb-8 leading-tight">
                A place where <br /> children truly thrive
              </h2>

              <div className="space-y-4 hidden md:block">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    animate={{
                      opacity: activeIndex === index ? 1 : 0.4,
                      x: activeIndex === index ? 10 : 0
                    }}
                    transition={{ duration: 0.4 }}
                    className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${
                      activeIndex === index ? 'bg-white/40 border border-white/60' : ''
                    }`}
                  >
                    <div
                      className="rounded-full flex-shrink-0"
                      style={{
                        width: '10px',
                        height: '10px',
                        backgroundColor: activeIndex === index ? feature.titleColor : '#CBD5E1',
                      }}
                    />
                    <span
                      className="text-base md:text-lg font-semibold"
                      style={{ color: activeIndex === index ? feature.titleColor : '#94A3B8' }}
                    >
                      {feature.title}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex justify-center lg:pt-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="rounded-3xl p-6 max-w-md w-full bg-white/20 backdrop-blur-sm lg:bg-transparent"
                >
                  <div className="w-full h-44 md:h-64 relative mb-6">
                    <Image
                      src={features[activeIndex].image}
                      alt={features[activeIndex].title}
                      fill
                      className="object-contain"
                      priority // Ensures image is ready
                    />
                  </div>

                  <span
                    className="text-xs font-mono tracking-widest font-bold"
                    style={{ color: features[activeIndex].titleColor }}
                  >
                    0{activeIndex + 1}
                  </span>

                  <h3
                    className="text-xl md:text-2xl font-extrabold mt-1 mb-3"
                    style={{ color: features[activeIndex].titleColor }}
                  >
                    {features[activeIndex].title}
                  </h3>

                  <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                    {features[activeIndex].description}
                  </p>

                  <button
                    className="mt-6 flex items-center gap-1 text-sm font-semibold"
                    style={{ color: features[activeIndex].titleColor }}
                  >
                    Learn More <ChevronRight size={15} />
                  </button>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
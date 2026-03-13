'use client';

import { useRef, useState, useEffect } from 'react';
import { useScroll } from 'framer-motion';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';

import feature1 from '@/assets/feature1.png';
import feature2 from '@/assets/feature2.png';
import feature3 from '@/assets/feature3.png';

const features = [
  {
    title: 'Loving Environment',
    description:
      'We provide a safe, nurturing and playful atmosphere where every child feels welcomed, valued, and free to express themselves with confidence.',
    titleColor: '#EF4444',
    sectionBg: 'linear-gradient(135deg, #FFF1F2 0%, #FFE4E6 50%, #FECDD3 100%)',
    image: feature1,
  },
  {
    title: 'Experienced Teachers',
    description:
      'Our caring and qualified early childhood educators bring warmth, expertise, and creativity to guide each child through their unique learning journey.',
    titleColor: '#F97316',
    sectionBg: 'linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 50%, #FED7AA 100%)',
    image: feature2,
  },
  {
    title: 'Fun Activities',
    description:
      'Creative and engaging learning experiences designed to spark curiosity, build skills, and make every school day an adventure to look forward to.',
    titleColor: '#EAB308',
    sectionBg: 'linear-gradient(135deg, #FEFCE8 0%, #FEF9C3 50%, #FEF08A 100%)',
    image: feature3,
  },
];

export function WhyChooseUsSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (value) => {
      if (value <= 0) {
        setActiveIndex(null);
        return;
      }
      const index = Math.min(
        Math.floor(value * features.length),
        features.length - 1
      );
      setActiveIndex(index);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const currentBg =
    activeIndex !== null
      ? features[activeIndex].sectionBg
      : 'linear-gradient(135deg, #ffffff 0%, #ffffff 100%)';

  return (
    <section
      id="why-choose-us"
      ref={containerRef}
      className="relative"
      style={{ height: `${features.length * 100 + 100}vh` }}
    >
      <div
        className="sticky top-0 h-screen w-full transition-all duration-700 ease-in-out"
        style={{ background: currentBg }}
      >
        <div className="h-full flex items-center overflow-hidden">
          <div className="max-w-7xl mx-auto w-full px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center">

            {/* Left — list */}
            <div className="flex flex-col justify-center">
              <p className="text-sky-500 text-sm font-semibold uppercase tracking-widest mb-3">
                Why Choose Us?
              </p>
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-8 leading-tight">
                A place where children truly thrive
              </h2>

              <div className="space-y-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-500 ${
                      activeIndex === index
                        ? 'bg-white/40 border border-white/60'
                        : 'opacity-50 hover:opacity-80'
                    }`}
                  >
                    <div
                      className="rounded-full flex-shrink-0 transition-all duration-500"
                      style={{
                        width: activeIndex === index ? '14px' : '8px',
                        height: activeIndex === index ? '14px' : '8px',
                        backgroundColor:
                          activeIndex === index ? feature.titleColor : '#CBD5E1',
                      }}
                    />
                    <span
                      className="text-lg font-semibold transition-colors duration-500"
                      style={{
                        color: activeIndex === index ? feature.titleColor : '#94A3B8',
                      }}
                    >
                      {feature.title}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right — card blends into bg, no shadow, no border */}
            <div className="flex items-center justify-center">
              <AnimatePresence mode="wait">
                {activeIndex !== null ? (
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 50, scale: 0.93 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -50, scale: 0.93 }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                    // No shadow, no border, transparent bg — blends with section
                    className="rounded-3xl p-8 max-w-md w-full bg-transparent"
                  >
                    <div className="w-full h-56 relative mb-6">
                      <Image
                        src={features[activeIndex].image}
                        alt={features[activeIndex].title}
                        fill
                        className="object-contain"
                      />
                    </div>

                    <span
                      className="text-xs font-mono tracking-widest font-bold"
                      style={{ color: features[activeIndex].titleColor }}
                    >
                      0{activeIndex + 1}
                    </span>

                    <h3
                      className="text-2xl font-extrabold mt-1 mb-3"
                      style={{ color: features[activeIndex].titleColor }}
                    >
                      {features[activeIndex].title}
                    </h3>

                    <p className="text-slate-600 leading-relaxed text-sm">
                      {features[activeIndex].description}
                    </p>

                    <button
                      className="mt-6 flex items-center gap-1 text-sm font-semibold"
                      style={{ color: features[activeIndex].titleColor }}
                    >
                      Learn More <ChevronRight size={15} />
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="max-w-md w-full h-72 flex flex-col items-center justify-center text-slate-300"
                  >
                    <p className="text-lg font-semibold">Scroll to explore ↓</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
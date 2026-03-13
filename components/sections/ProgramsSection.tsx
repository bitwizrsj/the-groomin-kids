import { Button } from '@/components/ui/button';
import Image from 'next/image';

import kid1 from '@/assets/kid1.png';
import kid2 from '@/assets/kid2.png';
import kid3 from '@/assets/kid3.png';
import kid4 from '@/assets/kid4.png';

type Program = {
  id: string;
  title: string;
  description: string;
  age_group: string;
  icon: string;
  order_index: number;
};

interface ProgramsSectionProps {
  programs: Program[];
}

const programCards = [
  {
    title: 'Play Group',
    description: 'Safe, nurturing and playful atmosphere for your little ones.',
    bg: 'bg-indigo-50',
    titleColor: 'text-indigo-700',
    image: kid1,
  },
  {
    title: 'Nursery',
    description: 'Caring and qualified early childhood educators.',
    bg: 'bg-orange-50',
    titleColor: 'text-red-500',
    image: kid2,
  },
  {
    title: 'Kindergarten',
    description: 'Creative and engaging learning experiences for curious minds.',
    bg: 'bg-green-50',
    titleColor: 'text-green-600',
    image: kid3,
  },
  {
    title: 'Prep',
    description: 'Fun activities, routines, and building confident learners.',
    bg: 'bg-yellow-50',
    titleColor: 'text-amber-500',
    image: kid4,
  },
];

export function ProgramsSection({ programs }: ProgramsSectionProps) {
  return (
    <section id="programs" className="py-20 bg-white relative overflow-hidden">
      {/* Subtle decorative dot */}
      <div className="absolute top-8 left-8 w-3 h-3 rounded-full bg-blue-200 opacity-60" />

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Our Programs
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Fun and educational programs tailored to your child's age and needs.
          </p>
        </div>

        {/* Cards Grid — 4 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {programCards.map((card) => (
            <div
              key={card.title}
              className={`${card.bg} rounded-2xl p-5 flex flex-col hover:shadow-lg transition-shadow duration-300`}
            >
              {/* Illustration */}
              <div className="w-full h-44 relative mb-4">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Title */}
              <h3 className={`text-xl font-bold mb-2 ${card.titleColor}`}>
                {card.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-slate-600 leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button className="bg-amber-400 hover:bg-amber-500 text-white font-semibold rounded-full px-10 py-6 text-base shadow-md transition-all">
            View All Programs &rsaquo;
          </Button>
        </div>
      </div>
    </section>
  );
}
import Image from 'next/image';

import activity1 from '@/assets/activity1.png'; // Activities image
import activity2 from '@/assets/activity2.png'; // Events image
import activity3 from '@/assets/activity3.png'; // Admissions image

type Activity = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  category: string;
};

interface ActivitiesSectionProps {
  activities: Activity[];
}

const categoryConfig = [
  {
    key: 'activities',
    label: 'Activities',
    image: activity1,
    emoji: '🔥',
    emojiBg: 'bg-orange-100',
  },
  {
    key: 'events',
    label: 'Events',
    image: activity2,
    emoji: '👜',
    emojiBg: 'bg-blue-100',
  },
  {
    key: 'admissions',
    label: 'Admissions',
    image: activity3,
    emoji: '📋',
    emojiBg: 'bg-amber-100',
  },
];

export function ActivitiesSection({ activities }: ActivitiesSectionProps) {
  return (
    <section id="activities" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header — left aligned like the image */}
        <div className="mb-8 flex items-center gap-3">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800">
            Exciting Activities &amp; Happy Moments
          </h2>
          {/* Decorative dots */}
          <div className="flex gap-1 items-end mb-1">
            <span className="w-2 h-2 rounded-full bg-sky-300 inline-block" />
            <span className="w-3 h-3 rounded-full bg-sky-400 inline-block" />
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {categoryConfig.map((cat) => (
            <div
              key={cat.key}
              className="rounded-2xl overflow-hidden border border-slate-100 bg-white hover:shadow-md transition-shadow duration-300 group"
            >
              {/* Image — tall, fills top of card */}
              <div className="relative w-full h-52 overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Bottom label row */}
              <div className="flex items-center gap-3 px-4 py-3">
                <div className={`w-9 h-9 rounded-lg ${cat.emojiBg} flex items-center justify-center text-lg flex-shrink-0`}>
                  {cat.emoji}
                </div>
                <span className="text-base font-semibold text-slate-700">
                  {cat.label}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
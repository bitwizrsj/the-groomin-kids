"use client";

import { useEffect, useState } from "react";
import { HeroSection } from '@/components/sections/HeroSection';
import { ProgramsSection } from '@/components/sections/ProgramsSection';
import { WhyChooseUsSection } from '@/components/sections/WhyChooseUsSection';
import { ActivitiesSection } from '@/components/sections/ActivitiesSection';
import { SiteFooter } from '@/components/sections/SiteFooter';

interface Program {
  id: string;
  title: string;
  description: string;
  age_group: string;
  icon: string;
  order_index: number;
}

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  order_index: number;
}

interface Activity {
  id: string;
  title: string;
  description: string;
  image_url: string;
  category: string;
}

export default function Home() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [features, setFeatures] = useState<Feature[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const [programsRes, featuresRes, activitiesRes] = await Promise.all([
        fetch('/api/programs'),
        fetch('/api/features'),
        fetch('/api/activities'),
      ]);

      const [programsData, featuresData, activitiesData] = await Promise.all([
        programsRes.json(),
        featuresRes.json(),
        activitiesRes.json(),
      ]);

      setPrograms(programsData);
      setFeatures(featuresData);
      setActivities(activitiesData);
    } catch (error) {
      console.error('Failed to load data', error);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      <HeroSection />
      <ProgramsSection programs={programs} />
      <WhyChooseUsSection features={features} />
      <ActivitiesSection activities={activities} />
      <SiteFooter />
    </div>
  );
}

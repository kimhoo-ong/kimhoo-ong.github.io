"use client";

import { useMemo, useState } from "react";
import { AutoRunnerTimeline } from "@/components/AutoRunnerTimeline";
import { HeroSection } from "@/components/HeroSection";
import { SkillInventory } from "@/components/SkillInventory";
import { skills, timelineStages } from "@/data/portfolio";

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);

  const unlockedSkills = useMemo(() => {
    const visibleStages = timelineStages.slice(0, activeIndex + 1);
    return visibleStages.flatMap((stage) => stage.unlockedSkills);
  }, [activeIndex]);

  return (
    <main className="min-h-screen bg-[#fff7ec] text-slate-950">
      <HeroSection
        skillsPanel={
          <SkillInventory skills={skills} unlockedSkills={unlockedSkills} />
        }
      />
      <AutoRunnerTimeline activeIndex={activeIndex} onCollect={setActiveIndex} />
    </main>
  );
}

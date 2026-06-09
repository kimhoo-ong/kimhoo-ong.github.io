"use client";

import { Sparkles } from "lucide-react";
import type { Skill } from "@/data/portfolio";
import { SkillBadge } from "./SkillBadge";

type SkillInventoryProps = {
  skills: Skill[];
  unlockedSkills: string[];
};

export function SkillInventory({ skills, unlockedSkills }: SkillInventoryProps) {
  const unlocked = new Set(unlockedSkills);

  return (
    <section id="skills" className="mx-auto w-full max-w-3xl lg:max-w-none">
      <div className="mb-5 flex items-center justify-center gap-3 lg:mb-2.5 lg:justify-start">
        <h2 className="text-2xl font-black tracking-normal text-slate-950 lg:text-[1.35rem] xl:text-2xl">
          Skills Unlocked
        </h2>
        <Sparkles className="size-6 text-amber-400" aria-hidden="true" />
      </div>
      <div className="grid grid-cols-3 gap-x-5 gap-y-6 sm:grid-cols-5 lg:grid-cols-8 lg:gap-x-3 lg:gap-y-2.5 xl:gap-x-4 xl:gap-y-3">
        {skills.map((skill) => {
          const unlockKeys = skill.unlockWhen ?? [skill.name];
          const active = unlockKeys.some((key) => unlocked.has(key));

          return <SkillBadge key={skill.name} skill={skill} active={active} />;
        })}
      </div>
      <div className="mt-8 rounded-md border border-[#eadcc8] bg-[#fff8ed] px-4 py-3 text-sm leading-6 text-[#172747] shadow-sm sm:px-5 lg:mt-2 lg:px-3 lg:py-1.5 lg:text-[0.7rem] lg:leading-[1.15] xl:text-sm xl:leading-6">
        <span className="mr-2 text-base text-[#f26d7d]">♥</span>
        I combine technical skills with business understanding to build
        solutions that people actually use and value.
      </div>
    </section>
  );
}

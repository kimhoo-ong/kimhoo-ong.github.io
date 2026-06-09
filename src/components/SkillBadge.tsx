"use client";

import { motion } from "motion/react";
import type { Skill } from "@/data/portfolio";

type SkillBadgeProps = {
  skill: Skill;
  active: boolean;
};

export function SkillBadge({ skill, active }: SkillBadgeProps) {
  const Icon = skill.icon;

  return (
    <motion.div
      animate={{
        opacity: active ? 1 : 0.34,
        scale: active ? [1, 1.14, 1] : 0.96,
        y: active ? [0, -3, 0] : 0,
      }}
      transition={{ duration: 0.42, ease: "easeOut" }}
      className="group flex min-w-0 flex-col items-center gap-2 lg:gap-1"
    >
      <div
        className={[
          "pixel-badge relative grid size-14 place-items-center border-2 bg-white shadow-[4px_4px_0_rgba(20,31,54,0.22)] transition duration-300 sm:size-16 lg:size-11 xl:size-12",
          active
            ? "border-amber-400 text-slate-900"
            : "border-slate-300 grayscale",
        ].join(" ")}
        data-color={skill.color}
      >
        <Icon
          className="size-7 stroke-[2.4] sm:size-8 lg:size-5 xl:size-6"
          aria-hidden="true"
        />
        {active ? (
          <span className="absolute -right-1 -top-2 text-xs text-amber-400">
            +
          </span>
        ) : null}
      </div>
      <span className="max-w-20 text-center text-xs font-semibold leading-tight text-slate-950 lg:max-w-[5.5rem] lg:text-[0.65rem] xl:text-xs">
        {skill.name}
      </span>
    </motion.div>
  );
}

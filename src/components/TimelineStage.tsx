import type { CSSProperties } from "react";
import type { TimelineStage as TimelineStageData } from "@/data/portfolio";

type TimelineStageProps = {
  stage: TimelineStageData;
  active: boolean;
};

export function TimelineStage({ stage, active }: TimelineStageProps) {
  return (
    <article
      className={["milestone-card", active ? "milestone-card-active" : ""].join(
        " ",
      )}
      style={{ "--accent": stage.accent } as CSSProperties}
    >
      <p className="text-sm font-black" style={{ color: stage.accent }}>
        {stage.period}
      </p>
      <h3 className="mt-1 text-lg font-black leading-tight text-slate-950">
        {stage.title}
      </h3>
      <p className="stage-organization mt-1 text-xs font-black uppercase tracking-[0.08em] text-slate-500">
        {stage.organization}
      </p>
      <p className="stage-story mt-2 text-sm leading-6 text-slate-800">
        {stage.shortStory}
      </p>
      <div className="stage-skill-list mt-2 flex flex-wrap gap-1.5">
        {stage.unlockedSkills.map((skill) => (
          <span key={skill} className="pixel-chip">
            {skill}
          </span>
        ))}
      </div>
    </article>
  );
}

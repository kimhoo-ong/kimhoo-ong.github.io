import type { TimelineStage } from "@/data/portfolio";

type CurrentUnlockPanelProps = {
  stage: TimelineStage;
};

export function CurrentUnlockPanel({ stage }: CurrentUnlockPanelProps) {
  return (
    <div className="current-message">
      <p className="text-xs font-black uppercase tracking-[0.16em] text-amber-300">
        Current Unlock
      </p>
      <h3 className="mt-1 text-lg font-black text-white">
        {stage.unlockLabel}
      </h3>
      <p className="mt-0.5 text-sm font-black text-white">{stage.title}</p>
      <p className="mt-1 text-sm leading-5 text-slate-200">{stage.shortStory}</p>
      <p className="mt-1.5 text-xs font-bold text-amber-100">
        {stage.unlockedSkills.slice(0, 5).join(" · ")}
      </p>
    </div>
  );
}

type CurrentlyLearningPanelProps = {
  items: string[];
};

export function CurrentlyLearningPanel({ items }: CurrentlyLearningPanelProps) {
  return (
    <div className="learning-box">
      <p className="text-[0.65rem] font-black uppercase tracking-[0.16em] text-slate-300">
        Currently Learning
      </p>
      <div className="mt-1.5 flex flex-wrap gap-1.5 text-[0.7rem] text-white">
        {items.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </div>
  );
}

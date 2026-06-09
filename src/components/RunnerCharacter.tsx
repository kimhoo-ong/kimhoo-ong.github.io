type RunnerCharacterProps = {
  era: "before-2020" | "after-2020";
};

export function RunnerCharacter({ era }: RunnerCharacterProps) {
  return (
    <div
      className="runner"
      data-era={era}
      aria-label="Leone running through the timeline"
    >
      <div className="runner-shadow" />
      <div className="runner-sprite" />
    </div>
  );
}

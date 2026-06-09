"use client";

import { motion, useMotionValue, useTransform } from "motion/react";
import {
  Award,
  BarChart3,
  BrainCircuit,
  GraduationCap,
  Pause,
  Plane,
  Play,
  Rocket,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { CSSProperties } from "react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { currentlyLearning, timelineStages } from "@/data/portfolio";
import type { TimelineStage as TimelineStageData } from "@/data/portfolio";
import { CurrentlyLearningPanel } from "./CurrentlyLearningPanel";
import { RunnerCharacter } from "./RunnerCharacter";
import { TimelineStage } from "./TimelineStage";

const LOOP_MS = 18000;
const COLLECT_DEBOUNCE_MS = 1500;

const PROP_ICON: Record<string, LucideIcon> = {
  graduation: GraduationCap,
  scroll: Plane,
  dashboard: BarChart3,
  platform: Rocket,
  badge: Award,
  portal: BrainCircuit,
};

function propIcon(gameObject: string): LucideIcon {
  return PROP_ICON[gameObject] ?? Award;
}

type AutoRunnerTimelineProps = {
  activeIndex: number;
  onCollect: (index: number) => void;
};

type Burst = {
  id: number;
  kind: "prop" | "coin";
  stageIndex: number;
  x: number;
  bottom: number;
};

export function AutoRunnerTimeline({
  activeIndex,
  onCollect,
}: AutoRunnerTimelineProps) {
  const progress = useMotionValue(0);
  const skylineRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [bursts, setBursts] = useState<Burst[]>([]);
  const [paused, setPaused] = useState(false);
  const detailRef = useRef<HTMLElement>(null);
  const [detail, setDetail] = useState<{
    stage: TimelineStageData;
    left: number;
    bottom: number;
    width: number;
    maxH: number;
    measured: boolean;
  } | null>(null);

  const openDetail = (stage: TimelineStageData, el: HTMLElement) => {
    const sec = sectionRef.current;
    if (!sec) return;
    const sr = sec.getBoundingClientRect();
    const cr = el.getBoundingClientRect();
    const bottom = Math.round(sr.bottom - cr.bottom);
    const width = Math.min(
      Math.max(Math.round(cr.width), 320),
      Math.round(sr.width - 28),
    );
    let left = cr.left + cr.width / 2 - sr.left;
    left = Math.min(Math.max(left, width / 2 + 10), sr.width - width / 2 - 10);
    setDetail({
      stage,
      left: Math.round(left),
      bottom,
      width,
      maxH: Math.round(sr.height - bottom - 8),
      measured: false,
    });
  };

  const closeDetail = () => {
    setDetail(null);
  };

  // after the panel renders, grow it upward to the top first, then extend the
  // bottom downward into the scene if the content still doesn't fit
  useLayoutEffect(() => {
    if (!detail || detail.measured) return;
    const sec = sectionRef.current;
    const el = detailRef.current;
    if (!sec || !el) return;
    const secH = sec.getBoundingClientRect().height;
    const contentH = el.scrollHeight;
    const desiredH = Math.min(contentH, Math.round(secH - 16));
    const topIfKept = secH - detail.bottom - desiredH;
    const bottom =
      topIfKept >= 8 ? detail.bottom : Math.max(8, Math.round(secH - 8 - desiredH));
    setDetail((d) =>
      d ? { ...d, bottom, maxH: desiredH, measured: true } : d,
    );
  }, [detail]);

  // mutable per-element crossing state, kept out of render
  const prevSide = useRef<Record<string, number>>({});
  const lastCollectAt = useRef<Record<number, number>>({});
  const lastCoinAt = useRef<Record<string, number>>({});
  const burstSeq = useRef(0);
  const pausedRef = useRef(false);
  const elapsedRef = useRef(0);
  const lastTsRef = useRef(0);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    let frame = 0;
    lastTsRef.current = performance.now();

    const tick = (now: number) => {
      const dt = now - lastTsRef.current;
      lastTsRef.current = now;

      if (pausedRef.current) {
        frame = requestAnimationFrame(tick);
        return;
      }

      elapsedRef.current += dt;
      const elapsed = elapsedRef.current;
      progress.set((elapsed % LOOP_MS) / LOOP_MS);

      const sky = skylineRef.current;
      const runner = sky?.querySelector<HTMLElement>(".runner");
      if (sky && runner) {
        const skyRect = sky.getBoundingClientRect();
        const rRect = runner.getBoundingClientRect();
        const runnerCx = rRect.left + rRect.width / 2;

        const spawnBurst = (kind: "prop" | "coin", stageIndex: number) => {
          const id = ++burstSeq.current;
          const burst: Burst = {
            id,
            kind,
            stageIndex,
            x: runnerCx - skyRect.left,
            bottom: skyRect.bottom - rRect.top - 8,
          };
          setBursts((list) => [...list, burst]);
          window.setTimeout(
            () => setBursts((list) => list.filter((b) => b.id !== id)),
            kind === "coin" ? 750 : 1100,
          );
        };

        // props: crossing fires the stage collect + highlight
        sky.querySelectorAll<HTMLElement>(".stage-object").forEach((obj) => {
          const uid = obj.dataset.uid ?? "";
          const stageIndex = Number(obj.dataset.stage ?? "0");
          const oRect = obj.getBoundingClientRect();
          const side = oRect.left + oRect.width / 2 >= runnerCx ? 1 : -1;
          const prev = prevSide.current[uid];
          prevSide.current[uid] = side;

          // crossing from right (1) to left (-1) = runner reached the prop
          // (skip the first frames so positions settle before firing)
          if (prev === 1 && side === -1 && elapsed > 400) {
            const last = lastCollectAt.current[stageIndex] ?? -Infinity;
            if (now - last > COLLECT_DEBOUNCE_MS) {
              lastCollectAt.current[stageIndex] = now;
              onCollect(stageIndex);
              spawnBurst("prop", stageIndex);
            }
          }
        });

        // coins: crossing fires a light pickup sparkle
        sky.querySelectorAll<HTMLElement>(".coin").forEach((coinEl) => {
          const uid = coinEl.dataset.coinUid ?? "";
          const cRect = coinEl.getBoundingClientRect();
          const side = cRect.left + cRect.width / 2 >= runnerCx ? 1 : -1;
          const key = `coin-${uid}`;
          const prev = prevSide.current[key];
          prevSide.current[key] = side;

          if (prev === 1 && side === -1 && elapsed > 400) {
            const last = lastCoinAt.current[uid] ?? -Infinity;
            if (now - last > COLLECT_DEBOUNCE_MS) {
              lastCoinAt.current[uid] = now;
              spawnBurst("coin", 0);
            }
          }
        });
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [progress, onCollect]);

  const worldX = useTransform(progress, [0, 1], ["0%", "-50%"]);
  const runnerEra = activeIndex < 2 ? "before-2020" : "after-2020";

  // avatar + progress on the year-track follow the collected stage (node-by-node)
  const nodeCount = timelineStages.length;
  const avatarPct = ((activeIndex + 0.5) / nodeCount) * 100;
  const fillPct = avatarPct - (0.5 / nodeCount) * 100;

  return (
    <section
      ref={sectionRef}
      id="journey"
      className={["runner-section", paused ? "journey-paused" : ""].join(" ")}
    >
      <div className="journey-ribbon">
        <span>✦</span>
        <span>My Journey So Far</span>
        <span>✦</span>
        <button
          type="button"
          className="journey-pause-btn"
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? "Resume journey" : "Pause journey"}
          aria-pressed={paused}
        >
          {paused ? (
            <Play className="size-4" aria-hidden="true" />
          ) : (
            <Pause className="size-4" aria-hidden="true" />
          )}
        </button>
      </div>

      <div className="skyline" ref={skylineRef}>
        <div className="sun" />
        <div className="cloud cloud-one" />
        <div className="cloud cloud-two" />
        <div className="cloud cloud-three" />
        <div className="mountains mountains-back" />
        <div className="mountains mountains-front" />

        <motion.div className="world-track" style={{ x: worldX }}>
          <SceneSet activeIndex={activeIndex} setIndex={0} onOpen={openDetail} />
          <SceneSet
            activeIndex={activeIndex}
            setIndex={1}
            ariaHidden
            onOpen={openDetail}
          />
        </motion.div>

        <RunnerCharacter era={runnerEra} />

        <div className="collect-fx-layer">
          {bursts.map((burst) => {
            if (burst.kind === "coin") {
              return (
                <div
                  key={burst.id}
                  className="collect-fx"
                  style={{ left: burst.x, bottom: burst.bottom }}
                >
                  <span className="collect-spark collect-spark-1" />
                  <span className="collect-spark collect-spark-2" />
                  <span className="collect-spark collect-spark-3" />
                  <span className="coin-pop">●</span>
                </div>
              );
            }
            const stage = timelineStages[burst.stageIndex];
            const Icon = propIcon(stage.gameObject);
            return (
              <div
                key={burst.id}
                className="collect-fx"
                style={{ left: burst.x, bottom: burst.bottom }}
              >
                <span className="collect-ring" />
                <span className="collect-spark collect-spark-1" />
                <span className="collect-spark collect-spark-2" />
                <span className="collect-spark collect-spark-3" />
                <span className="collect-spark collect-spark-4" />
                <span className="collect-glyph">
                  <Icon aria-hidden="true" />
                </span>
              </div>
            );
          })}
        </div>

        <div className="ground" />
      </div>

      <div className="journey-hud">
        <div className="year-track">
          <div className="year-rail" />
          <div className="year-rail-fill" style={{ width: `${fillPct}%` }} />
          {timelineStages.map((stage, index) => (
            <div
              key={stage.id}
              className={[
                "year-node",
                index <= activeIndex ? "year-node-active" : "",
              ].join(" ")}
            >
              <span />
              <strong>{stage.period.split(/[–-]/)[0].trim()}</strong>
            </div>
          ))}
          <div
            className="year-avatar"
            data-era={runnerEra}
            style={{ left: `${avatarPct}%` }}
          >
            <span className="year-avatar-sprite" />
          </div>
        </div>

        <CurrentlyLearningPanel items={currentlyLearning} />
      </div>

      {detail && (
        <>
          <div className="stage-detail-backdrop" onClick={closeDetail} />
          <article
            ref={detailRef}
            className="stage-detail"
            style={
              {
                left: detail.left,
                bottom: detail.bottom,
                width: detail.width,
                maxHeight: detail.maxH,
                "--accent": detail.stage.accent,
              } as CSSProperties
            }
          >
            <button
              type="button"
              className="stage-detail-close"
              onClick={closeDetail}
              aria-label="Close details"
            >
              ✕
            </button>
            <p
              className="text-sm font-black"
              style={{ color: detail.stage.accent }}
            >
              {detail.stage.period}
            </p>
            <h3 className="mt-1 text-lg font-black leading-tight text-slate-950">
              {detail.stage.title}
            </h3>
            <p className="mt-1 text-xs font-black uppercase tracking-[0.08em] text-slate-500">
              {detail.stage.organization}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-800">
              {detail.stage.shortStory}
            </p>

            <p className="stage-detail-label">Skills Unlocked</p>
            <div className="flex flex-wrap gap-1">
              {detail.stage.unlockedSkills.map((s) => (
                <span
                  key={s}
                  className="stage-detail-tag stage-detail-tag-unlocked"
                >
                  {s}
                </span>
              ))}
            </div>

            <p className="stage-detail-label">Hard Skills</p>
            <div className="flex flex-wrap gap-1">
              {detail.stage.hardSkills.map((s) => (
                <span key={s} className="stage-detail-tag">
                  {s}
                </span>
              ))}
            </div>

            <p className="stage-detail-label">Soft Skills</p>
            <div className="flex flex-wrap gap-1">
              {detail.stage.softSkills.map((s) => (
                <span key={s} className="stage-detail-tag stage-detail-tag-soft">
                  {s}
                </span>
              ))}
            </div>

            {detail.stage.highlights.length > 0 && (
              <>
                <p className="stage-detail-label">Highlights</p>
                <ul className="stage-detail-highlights">
                  {detail.stage.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </>
            )}
          </article>
        </>
      )}
    </section>
  );
}

function SceneSet({
  activeIndex,
  setIndex,
  ariaHidden = false,
  onOpen,
}: {
  activeIndex: number;
  setIndex: number;
  ariaHidden?: boolean;
  onOpen?: (stage: TimelineStageData, el: HTMLElement) => void;
}) {
  return (
    <div className="scene-set" aria-hidden={ariaHidden}>
      <div className="sign start-sign">START</div>
      {timelineStages.map((stage, index) => (
        <div
          key={stage.id}
          className="milestone-slot"
          style={
            {
              left: `${8 + (index + 1) * 14.2857}%`,
              "--accent": stage.accent,
            } as CSSProperties
          }
        >
          <TimelineStage
            stage={stage}
            active={index === activeIndex}
            onOpen={onOpen}
          />
          <span className="milestone-line" />
        </div>
      ))}
      {timelineStages.map((stage, index) => {
        const Icon = propIcon(stage.gameObject);
        return (
          <span
            key={`prop-${stage.id}`}
            data-stage={index}
            data-uid={`${setIndex}-${index}`}
            className={[
              "stage-object",
              index === activeIndex ? "stage-object-active" : "",
            ].join(" ")}
            style={
              {
                left: `calc(${8 + (index + 1) * 14.2857}% + max(min(268px, 19vw), 240px) / 2)`,
                "--accent": stage.accent,
              } as CSSProperties
            }
          >
            <Icon className="stage-object-icon" aria-hidden="true" />
          </span>
        );
      })}
      {timelineStages.slice(0, -1).map((stage, index) => (
        <div
          key={`coin-${stage.id}`}
          data-coin-uid={`${setIndex}-c${index}`}
          className="coin"
          style={{
            left: `calc(${8 + (index + 1.5) * 14.2857}% + max(min(268px, 19vw), 240px) / 2 - 15px)`,
            bottom: 54,
          }}
        >
          ●
        </div>
      ))}
    </div>
  );
}

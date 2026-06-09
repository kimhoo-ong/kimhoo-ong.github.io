"use client";

import { motion, useMotionValue, useTransform } from "motion/react";
import {
  Award,
  BarChart3,
  BrainCircuit,
  GraduationCap,
  Plane,
  Rocket,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { currentlyLearning, timelineStages } from "@/data/portfolio";
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
  const [bursts, setBursts] = useState<Burst[]>([]);

  // mutable per-element crossing state, kept out of render
  const prevSide = useRef<Record<string, number>>({});
  const lastCollectAt = useRef<Record<number, number>>({});
  const lastCoinAt = useRef<Record<string, number>>({});
  const burstSeq = useRef(0);

  useEffect(() => {
    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      progress.set(((now - start) % LOOP_MS) / LOOP_MS);

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
          if (prev === 1 && side === -1 && now - start > 400) {
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

          if (prev === 1 && side === -1 && now - start > 400) {
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
    <section id="journey" className="runner-section">
      <div className="journey-ribbon">
        <span>✦</span>
        <span>My Journey So Far</span>
        <span>✦</span>
      </div>

      <div className="skyline" ref={skylineRef}>
        <div className="sun" />
        <div className="cloud cloud-one" />
        <div className="cloud cloud-two" />
        <div className="cloud cloud-three" />
        <div className="mountains mountains-back" />
        <div className="mountains mountains-front" />

        <motion.div className="world-track" style={{ x: worldX }}>
          <SceneSet activeIndex={activeIndex} setIndex={0} />
          <SceneSet activeIndex={activeIndex} setIndex={1} ariaHidden />
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
    </section>
  );
}

function SceneSet({
  activeIndex,
  setIndex,
  ariaHidden = false,
}: {
  activeIndex: number;
  setIndex: number;
  ariaHidden?: boolean;
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
          <TimelineStage stage={stage} active={index === activeIndex} />
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

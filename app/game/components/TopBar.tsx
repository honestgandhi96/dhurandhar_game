"use client";

import { ACT_NAMES, type Act } from "../data/missions";

interface Props {
  score: number;
  missionNumber: number; // 1-indexed
  act: Act;
  hintsRemaining: number;
  streak: number;
  scorePop: boolean;
}

export default function TopBar({
  score,
  missionNumber,
  act,
  hintsRemaining,
  streak,
  scorePop,
}: Props) {
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        backgroundColor: "#0d0d0d",
        borderBottom: "1px solid #1a2a1a",
        height: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 12px",
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        color: "#00aa2a",
      }}
    >
      <span
        style={{
          color: scorePop ? "#00ff41" : "#00aa2a",
          transition: "color 0.2s",
        }}
        className={scorePop ? "score-pop" : ""}
      >
        SCORE:{" "}
        <span style={{ color: "#00ff41", fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: 13 }}>
          {score}
        </span>
      </span>

      <span style={{ textAlign: "center", color: "#00aa2a" }}>
        MISSION{" "}
        <span style={{ color: "#00ff41" }}>{missionNumber}</span>/7
        {"  ·  "}
        <span style={{ color: "#ffaa00", fontFamily: "var(--font-ui)", fontWeight: 600 }}>
          ACT {act}: {ACT_NAMES[act]}
        </span>
      </span>

      <span>
        HINTS:{" "}
        <span style={{ color: hintsRemaining > 0 ? "#00ff41" : "#ff2020" }}>
          {hintsRemaining}
        </span>
        {"  ·  "}STREAK:{" "}
        <span style={{ color: streak > 2 ? "#ffaa00" : "#00ff41" }}>
          {streak}
        </span>
      </span>
    </div>
  );
}

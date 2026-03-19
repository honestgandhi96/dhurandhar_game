"use client";

interface Props {
  completedMissions: number; // 0-7
  act: 1 | 2 | 3;
}

export default function ProgressBar({ completedMissions, act }: Props) {
  const pct = (completedMissions / 7) * 100;
  const color = act === 1 ? "#00ff41" : act === 2 ? "#ffaa00" : "#ff2020";

  return (
    <div
      style={{
        width: "100%",
        height: 4,
        backgroundColor: "#0d1a0d",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${pct}%`,
          backgroundColor: color,
          boxShadow: `0 0 6px rgba(${act === 1 ? "0,255,65" : act === 2 ? "255,170,0" : "255,32,32"},0.5)`,
          transition: "width 0.6s ease-out, background-color 0.5s",
        }}
      />
    </div>
  );
}

"use client";

interface Props {
  integrity: number; // 0-100
  mission7?: boolean;
  dossierShaking?: boolean;
}

export default function CoverIntegrityMeter({
  integrity,
  mission7 = false,
  dossierShaking = false,
}: Props) {
  const pct = Math.max(0, Math.min(100, integrity));
  const isGreen = pct > 60;
  const isAmber = pct <= 60 && pct > 30;

  const barClass = isGreen
    ? "ci-bar-green"
    : isAmber
    ? "ci-bar-amber"
    : "ci-bar-red";
  const barColor = isGreen ? "#00ff41" : isAmber ? "#ffaa00" : "#ff2020";

  return (
    <div style={{ padding: "8px 0 4px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 4,
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          color: "#00aa2a",
          letterSpacing: 1,
        }}
      >
        <span>COVER INTEGRITY</span>
        <span style={{ color: barColor }}>{pct}%</span>
      </div>
      <div
        style={{
          width: "100%",
          height: 6,
          backgroundColor: "#1a1a1a",
          borderRadius: 3,
          overflow: "hidden",
          border: "1px solid #2a2a2a",
        }}
      >
        <div
          className={`${barClass} ${mission7 ? "heartbeat" : ""}`}
          style={{
            height: "100%",
            width: `${pct}%`,
            backgroundColor: barColor,
            borderRadius: 3,
            transition: "width 0.3s ease-out, background-color 0.3s",
          }}
        />
      </div>
      {dossierShaking && (
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            color: "#ff2020",
            marginTop: 4,
            letterSpacing: 1,
          }}
        >
          ⚠ COVER COMPROMISED
        </div>
      )}
    </div>
  );
}

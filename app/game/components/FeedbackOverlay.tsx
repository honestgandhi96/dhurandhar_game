"use client";

import type { MissionData } from "../data/missions";

export interface FeedbackData {
  correct: boolean;
  pointsEarned: number;
  coverAtEnd: number;
  breakdown: {
    base: number;
    speed: number;
    streakBonus: number;
    diffBonus: number;
    hintPenalty: number;
  };
}

interface Props {
  data: FeedbackData;
  mission: MissionData;
  onContinue: () => void;
}

export default function FeedbackOverlay({ data, mission, onContinue }: Props) {
  const { correct, pointsEarned, coverAtEnd, breakdown } = data;

  const coverColor =
    coverAtEnd > 60 ? "#00ff41" : coverAtEnd > 30 ? "#ffaa00" : "#ff2020";

  return (
    <div
      onClick={onContinue}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.85)",
        backdropFilter: "blur(4px)",
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="fade-in"
        style={{
          backgroundColor: "#0a0a0a",
          border: `2px solid ${correct ? "#00ff41" : "#ff2020"}`,
          borderRadius: 8,
          padding: "28px 24px",
          maxWidth: 420,
          width: "100%",
          fontFamily: "var(--font-mono)",
          boxShadow: `0 0 32px ${correct ? "rgba(0,255,65,0.15)" : "rgba(255,32,32,0.15)"}`,
        }}
      >
        {/* Icon */}
        <div
          style={{
            textAlign: "center",
            fontSize: 48,
            marginBottom: 12,
            color: correct ? "#00ff41" : "#ff2020",
          }}
        >
          {correct ? "✓" : "✗"}
        </div>

        {/* Title */}
        <div
          style={{
            textAlign: "center",
            fontFamily: "var(--font-ui)",
            fontWeight: 700,
            fontSize: 18,
            letterSpacing: 3,
            color: correct ? "#00ff41" : "#ff2020",
            marginBottom: 16,
          }}
        >
          {correct ? "TRANSMISSION DECODED" : "COVER BLOWN"}
        </div>

        {correct ? (
          <>
            {/* Cover integrity */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 11,
                color: "#00aa2a",
                marginBottom: 6,
              }}
            >
              <span>COVER AT CLOSE</span>
              <span style={{ color: coverColor }}>{coverAtEnd}%</span>
            </div>
            <div
              style={{
                height: 4,
                backgroundColor: "#1a1a1a",
                borderRadius: 2,
                overflow: "hidden",
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${coverAtEnd}%`,
                  backgroundColor: coverColor,
                  borderRadius: 2,
                }}
              />
            </div>

            {/* Points */}
            <div
              style={{
                textAlign: "center",
                fontSize: 36,
                fontFamily: "var(--font-ui)",
                fontWeight: 700,
                color: "#00ff41",
                textShadow: "0 0 16px rgba(0,255,65,0.5)",
                marginBottom: 8,
              }}
            >
              +{pointsEarned}
            </div>

            {/* Breakdown */}
            <div
              style={{
                backgroundColor: "#0d1a0d",
                borderRadius: 4,
                padding: "10px 12px",
                fontSize: 10,
                color: "#00aa2a",
                lineHeight: 2,
                marginBottom: 20,
              }}
            >
              <div>BASE POINTS: +{breakdown.base}</div>
              <div>SPEED BONUS: +{breakdown.speed}</div>
              {breakdown.streakBonus > 0 && (
                <div>STREAK BONUS: +{breakdown.streakBonus}</div>
              )}
              {breakdown.diffBonus > 0 && (
                <div>
                  DIFFICULTY BONUS: +{breakdown.diffBonus}
                </div>
              )}
              {breakdown.hintPenalty > 0 && (
                <div style={{ color: "#ffaa00" }}>
                  HINT PENALTY: −{breakdown.hintPenalty}
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            {/* Show correct answer on fail */}
            <div
              style={{
                backgroundColor: "#1a0d0d",
                border: "1px solid #330d0d",
                borderRadius: 4,
                padding: "10px 12px",
                fontSize: 11,
                color: "#ff6060",
                marginBottom: 16,
                lineHeight: 1.6,
              }}
            >
              <div style={{ color: "#ff2020", marginBottom: 4, letterSpacing: 1 }}>
                CORRECT ANSWER:
              </div>
              {/* We don't store the answer client-side — shown from API context */}
              <div style={{ letterSpacing: 2, color: "#ff8080" }}>
                [MOVE TO NEXT MISSION]
              </div>
            </div>

            <div
              style={{
                textAlign: "center",
                fontSize: 20,
                fontFamily: "var(--font-ui)",
                fontWeight: 700,
                color: "#ff2020",
                marginBottom: 20,
              }}
            >
              +0 PTS
            </div>
          </>
        )}

        <button
          onClick={onContinue}
          style={{
            display: "block",
            width: "100%",
            minHeight: 48,
            backgroundColor: correct ? "#003310" : "#1a0000",
            border: `1px solid ${correct ? "#00ff41" : "#ff2020"}`,
            borderRadius: 4,
            color: correct ? "#00ff41" : "#ff2020",
            fontFamily: "var(--font-ui)",
            fontWeight: 700,
            fontSize: 14,
            letterSpacing: 3,
            cursor: "pointer",
          }}
        >
          CONTINUE →
        </button>
      </div>
    </div>
  );
}

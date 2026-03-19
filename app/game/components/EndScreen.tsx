"use client";

import { useEffect, useState } from "react";
import IdentityBar from "./IdentityBar";

interface MissionResult {
  missionIndex: number;
  solved: boolean;
  pointsEarned: number;
  coverAtEnd: number;
}

interface Props {
  score: number;
  results: MissionResult[];
  onPlayAgain: () => void;
}

function getRank(score: number) {
  if (score >= 2800)
    return {
      label: "SHADOW DIRECTOR",
      color: "#ffd700",
      sub: "Director Sanyal offers you command of the next operation.",
    };
  if (score >= 2000)
    return {
      label: "MASTER SPY",
      color: "#c0c0c0",
      sub: "Hamza himself would trust you with his real identity.",
    };
  if (score >= 1200)
    return {
      label: "FIELD OPERATIVE",
      color: "#cd7f32",
      sub: "Handler Aalam says you earn your chai.",
    };
  return {
    label: "RECRUIT",
    color: "#00ff41",
    sub: "The shadows of Lyari are unforgiving. Try again.",
  };
}

export default function EndScreen({ score, results, onPlayAgain }: Props) {
  const [typedTitle, setTypedTitle] = useState("");
  const [typedSub, setTypedSub] = useState("");
  const [showBody, setShowBody] = useState(false);
  const [copied, setCopied] = useState(false);

  const rank = getRank(score);

  const avgCover =
    results.length > 0
      ? Math.round(results.reduce((a, r) => a + r.coverAtEnd, 0) / results.length)
      : 0;

  const title = "OPERATION DHURANDHAR — COMPLETE";
  const sub = "AGENT HAMZA ALI MAZARI — FINAL ASSESSMENT";

  useEffect(() => {
    let i = 0;
    const t1 = setInterval(() => {
      i++;
      setTypedTitle(title.slice(0, i));
      if (i >= title.length) {
        clearInterval(t1);
        let j = 0;
        const t2 = setInterval(() => {
          j++;
          setTypedSub(sub.slice(0, j));
          if (j >= sub.length) {
            clearInterval(t2);
            setTimeout(() => setShowBody(true), 200);
          }
        }, 30);
      }
    }, 40);
    return () => clearInterval(t1);
  }, []);

  const gridEmoji = results
    .map((r) => (r.solved ? "✅" : "❌"))
    .join("");

  const shareText = `🕵️ OPERATION DHURANDHAR: BECOME HAMZA

Score: ${score} pts  |  Rank: ${rank.label}
Missions: [${gridEmoji}]
Avg Cover Integrity: ${avgCover}%

I survived all 7 transmissions and became Hamza Ali Mazari.
Can you hold your cover?
Play: ${typeof window !== "undefined" ? window.location.origin : ""}/game

🎬 Dhurandhar 2 — In Cinemas NOW
#Dhurandhar2 #OperationDhurandhar #BecomeHamza`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: select text
    }
  };

  return (
    <div
      style={{
        minHeight: "100dvh",
        backgroundColor: "#0a0a0a",
        padding: "32px 20px 60px",
        fontFamily: "var(--font-mono)",
        color: "#00aa2a",
      }}
    >
      <div style={{ maxWidth: 520, margin: "0 auto" }}>
        {/* Typewriter title */}
        <div
          style={{
            fontFamily: "var(--font-ui)",
            fontWeight: 700,
            fontSize: 18,
            color: "#00ff41",
            letterSpacing: 3,
            marginBottom: 6,
            minHeight: 28,
          }}
          className={typedTitle.length < title.length ? "typewriter-cursor" : ""}
        >
          {typedTitle}
        </div>
        <div
          style={{
            fontSize: 12,
            color: "#00aa2a",
            letterSpacing: 3,
            marginBottom: 28,
            minHeight: 20,
          }}
          className={
            typedSub.length < sub.length && typedTitle.length >= title.length
              ? "typewriter-cursor"
              : ""
          }
        >
          {typedSub}
        </div>

        {showBody && (
          <div className="fade-in">
            {/* Identity bar */}
            <div
              style={{
                backgroundColor: "#0d0d0d",
                border: "1px solid #1a2a1a",
                borderRadius: 6,
                padding: "12px 16px",
                marginBottom: 20,
              }}
            >
              <IdentityBar progress={100} />
              <div
                style={{
                  textAlign: "center",
                  fontSize: 10,
                  color: "#00ff41",
                  letterSpacing: 2,
                  marginTop: 6,
                }}
              >
                IDENTITY TRANSITION: COMPLETE
              </div>
            </div>

            {/* Final score */}
            <div
              style={{
                textAlign: "center",
                marginBottom: 20,
              }}
            >
              <div style={{ fontSize: 10, letterSpacing: 3, marginBottom: 8, color: "#00aa2a" }}>
                FINAL SCORE
              </div>
              <div
                style={{
                  fontFamily: "var(--font-ui)",
                  fontWeight: 700,
                  fontSize: 52,
                  color: "#00ff41",
                  textShadow: "0 0 24px rgba(0,255,65,0.4)",
                  lineHeight: 1,
                }}
              >
                {score}
              </div>
              <div style={{ fontSize: 9, color: "#00661a", marginTop: 4, letterSpacing: 1 }}>
                PTS
              </div>
            </div>

            {/* Rank badge */}
            <div
              style={{
                backgroundColor: "#0d0d0d",
                border: `2px solid ${rank.color}`,
                borderRadius: 6,
                padding: "14px 20px",
                textAlign: "center",
                marginBottom: 20,
                boxShadow: `0 0 20px ${rank.color}22`,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-ui)",
                  fontWeight: 700,
                  fontSize: 20,
                  color: rank.color,
                  letterSpacing: 3,
                  marginBottom: 6,
                }}
              >
                {rank.label}
              </div>
              <div style={{ fontSize: 12, color: "#00aa2a", lineHeight: 1.5 }}>
                {rank.sub}
              </div>
            </div>

            {/* Mission grid */}
            <div style={{ marginBottom: 20 }}>
              <div
                style={{
                  fontSize: 10,
                  color: "#00aa2a",
                  letterSpacing: 2,
                  marginBottom: 10,
                }}
              >
                MISSION DEBRIEF
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
                  gap: 8,
                }}
              >
                {results.map((r) => (
                  <div
                    key={r.missionIndex}
                    style={{
                      backgroundColor: "#0d0d0d",
                      border: `1px solid ${r.solved ? "#1a3a1a" : "#3a1a1a"}`,
                      borderRadius: 4,
                      padding: "8px 10px",
                      textAlign: "center",
                      fontSize: 11,
                    }}
                  >
                    <div style={{ marginBottom: 3 }}>
                      M{r.missionIndex + 1}{" "}
                      <span>{r.solved ? "✅" : "❌"}</span>
                    </div>
                    <div
                      style={{
                        color: r.solved ? "#00ff41" : "#ff2020",
                        fontFamily: "var(--font-ui)",
                        fontWeight: 700,
                        fontSize: 13,
                      }}
                    >
                      {r.pointsEarned} pts
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cover integrity summary */}
            <div
              style={{
                backgroundColor: "#0d0d0d",
                border: "1px solid #1a2a1a",
                borderRadius: 4,
                padding: "10px 14px",
                marginBottom: 20,
                fontSize: 11,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span>AVG COVER INTEGRITY</span>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: 80,
                    height: 4,
                    backgroundColor: "#1a1a1a",
                    borderRadius: 2,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${avgCover}%`,
                      backgroundColor:
                        avgCover > 60 ? "#00ff41" : avgCover > 30 ? "#ffaa00" : "#ff2020",
                      borderRadius: 2,
                    }}
                  />
                </div>
                <span style={{ color: "#00ff41" }}>{avgCover}%</span>
              </div>
            </div>

            {/* Share card */}
            <div style={{ marginBottom: 16 }}>
              <div
                style={{
                  fontSize: 10,
                  color: "#00aa2a",
                  letterSpacing: 2,
                  marginBottom: 8,
                }}
              >
                SHARE YOUR RESULTS
              </div>
              <pre
                style={{
                  backgroundColor: "#0d0d0d",
                  border: "1px solid #1a2a1a",
                  borderRadius: 4,
                  padding: "12px 14px",
                  fontSize: 11,
                  color: "#00cc35",
                  fontFamily: "var(--font-mono)",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  lineHeight: 1.6,
                  userSelect: "all",
                  margin: 0,
                }}
              >
                {shareText}
              </pre>
            </div>

            <button
              onClick={handleCopy}
              style={{
                display: "block",
                width: "100%",
                minHeight: 48,
                backgroundColor: copied ? "#003310" : "#0d1a0d",
                border: `1px solid ${copied ? "#00ff41" : "#1a3a1a"}`,
                borderRadius: 4,
                color: copied ? "#00ff41" : "#00aa2a",
                fontFamily: "var(--font-ui)",
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: 3,
                cursor: "pointer",
                marginBottom: 12,
                transition: "all 0.2s",
              }}
            >
              {copied ? "✓ COPIED" : "COPY & SHARE"}
            </button>

            <button
              onClick={onPlayAgain}
              style={{
                display: "block",
                width: "100%",
                minHeight: 48,
                backgroundColor: "#0d1a0d",
                border: "1px solid #00ff41",
                borderRadius: 4,
                color: "#00ff41",
                fontFamily: "var(--font-ui)",
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: 3,
                cursor: "pointer",
                marginBottom: 24,
              }}
            >
              PLAY AGAIN ↻
            </button>

            <div style={{ textAlign: "center", fontSize: 11, color: "#005510" }}>
              <a href="/mission" style={{ color: "#005510" }}>
                ← Back to quick mission
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

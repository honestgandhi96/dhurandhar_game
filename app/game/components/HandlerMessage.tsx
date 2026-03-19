"use client";

import IdentityBar from "./IdentityBar";

interface Props {
  completedMissionIndex: number; // 0-indexed
  solved: boolean;
  coverAtEnd: number;
  identityProgress: number;
  onContinue: () => void;
}

const FAST_MESSAGES = [
  "Shabash bhai. You were born for this.",
  "Clean work. Major Iqbal suspects nothing.",
  "IB Headquarters confirmed. Proceed.",
];
const SLOW_MESSAGES = [
  "You cut it close. Be sharper next time.",
  "Hamza would have done it faster. Become him.",
  "The shadows of Lyari are unforgiving.",
];
const FAIL_MESSAGES = [
  "Move forward. Don't look back. This never happened.",
  "Cover held — barely. Don't test fate again.",
  "Even Hamza has scars. Keep moving.",
];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function HandlerMessage({
  completedMissionIndex,
  solved,
  coverAtEnd,
  identityProgress,
  onContinue,
}: Props) {
  const msg = !solved
    ? pick(FAIL_MESSAGES)
    : coverAtEnd > 60
    ? pick(FAST_MESSAGES)
    : pick(SLOW_MESSAGES);

  const showAct1Transition = completedMissionIndex === 1; // after mission 2
  const showAct2Transition = completedMissionIndex === 4; // after mission 5

  return (
    <div
      className="fade-in"
      style={{
        minHeight: "100dvh",
        backgroundColor: "#0a0a0a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        fontFamily: "var(--font-mono)",
      }}
    >
      <div style={{ maxWidth: 480, width: "100%" }}>
        {/* Header */}
        <div
          style={{
            color: "#00aa2a",
            fontSize: 10,
            letterSpacing: 3,
            marginBottom: 24,
            textAlign: "center",
          }}
        >
          HANDLER: MOHAMMED AALAM · SECURE CHANNEL
        </div>

        {/* Handler message */}
        <div
          style={{
            color: "#00ff41",
            fontSize: 15,
            lineHeight: 1.8,
            textAlign: "center",
            marginBottom: 24,
            textShadow: "0 0 8px rgba(0,255,65,0.3)",
          }}
        >
          "{msg}"
        </div>

        {/* Act 1 → 2 transition */}
        {showAct1Transition && (
          <div
            className="fade-in"
            style={{
              backgroundColor: "#0d1a0d",
              border: "1px solid #00ff41",
              borderRadius: 6,
              padding: "16px 20px",
              marginBottom: 20,
              textAlign: "center",
            }}
          >
            <div
              style={{
                color: "#00ff41",
                fontFamily: "var(--font-ui)",
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: 3,
                marginBottom: 8,
              }}
            >
              IDENTITY TRANSITION INITIATED
            </div>
            <div
              style={{
                position: "relative",
                display: "inline-block",
                fontSize: 13,
                letterSpacing: 2,
                color: "#00ff41",
              }}
            >
              <span className="glitch-layer1" aria-hidden>
                Jaskirat Singh Rangi → Hamza Ali Mazari
              </span>
              <span className="glitch-layer2" aria-hidden>
                Jaskirat Singh Rangi → Hamza Ali Mazari
              </span>
              Jaskirat Singh Rangi → Hamza Ali Mazari
            </div>
            <div
              style={{ color: "#00aa2a", fontSize: 11, marginTop: 8, letterSpacing: 2 }}
            >
              [ 28% COMPLETE ]
            </div>
          </div>
        )}

        {/* Act 2 → 3 transition */}
        {showAct2Transition && (
          <div
            className="fade-in"
            style={{
              backgroundColor: "#1a0d0d",
              border: "1px solid #ff2020",
              borderRadius: 6,
              padding: "16px 20px",
              marginBottom: 20,
              textAlign: "center",
            }}
          >
            <div
              style={{
                color: "#ff2020",
                fontFamily: "var(--font-ui)",
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: 3,
                marginBottom: 8,
              }}
            >
              POINT OF NO RETURN
            </div>
            <div style={{ color: "#ff6060", fontSize: 12, lineHeight: 1.7, letterSpacing: 1 }}>
              Agent Jaskirat Singh Rangi has been officially declared missing.
              <br />
              Only Hamza exists now.
            </div>
            <div
              style={{
                marginTop: 12,
                display: "inline-block",
                color: "#cc1111",
                border: "2px solid #cc1111",
                borderRadius: 2,
                fontFamily: "var(--font-ui)",
                fontWeight: 700,
                fontSize: 12,
                letterSpacing: 3,
                padding: "3px 10px",
                transform: "rotate(-4deg)",
                opacity: 0.9,
              }}
            >
              DECEASED — JASKIRAT SINGH RANGI
            </div>
          </div>
        )}

        {/* Identity bar */}
        <div
          style={{
            backgroundColor: "#0d0d0d",
            border: "1px solid #1a2a1a",
            borderRadius: 6,
            padding: "12px 16px",
            marginBottom: 24,
          }}
        >
          <IdentityBar progress={identityProgress} glitching={showAct1Transition} />
        </div>

        {/* Continue */}
        <button
          onClick={onContinue}
          style={{
            display: "block",
            width: "100%",
            minHeight: 52,
            backgroundColor: "#0d1a0d",
            border: "1px solid #00ff41",
            borderRadius: 4,
            color: "#00ff41",
            fontFamily: "var(--font-ui)",
            fontWeight: 700,
            fontSize: 15,
            letterSpacing: 3,
            cursor: "pointer",
            transition: "background-color 0.15s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#0f2a0f";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#0d1a0d";
          }}
        >
          CONTINUE MISSION →
        </button>
      </div>
    </div>
  );
}

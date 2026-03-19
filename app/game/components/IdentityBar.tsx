"use client";

interface Props {
  progress: number; // 0-100
  glitching?: boolean;
}

export default function IdentityBar({ progress, glitching = false }: Props) {
  const filled = Math.round((progress / 100) * 10);
  const blocks = "█".repeat(filled) + "░".repeat(10 - filled);

  return (
    <div
      style={{
        textAlign: "center",
        fontFamily: "var(--font-mono)",
        fontSize: 13,
        color: "#00aa2a",
        padding: "12px 0",
      }}
    >
      <div style={{ marginBottom: 6, color: "#00aa2a", fontSize: 10, letterSpacing: 2 }}>
        IDENTITY STATUS
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
        <span style={{ color: progress >= 100 ? "#444" : "#00ff41", fontSize: 12 }}>
          JASKIRAT
        </span>

        <div style={{ position: "relative", display: "inline-block" }}>
          {glitching && (
            <>
              <span className="glitch-layer1" aria-hidden style={{ fontFamily: "var(--font-mono)" }}>
                [{blocks}]
              </span>
              <span className="glitch-layer2" aria-hidden style={{ fontFamily: "var(--font-mono)" }}>
                [{blocks}]
              </span>
            </>
          )}
          <span
            style={{
              color: "#00ff41",
              fontSize: 13,
              letterSpacing: 2,
            }}
          >
            [{blocks}]
          </span>
        </div>

        <span style={{ color: progress >= 100 ? "#00ff41" : "#444", fontSize: 12 }}>
          HAMZA
        </span>
      </div>

      <div style={{ marginTop: 6, fontSize: 10, color: "#00aa2a" }}>
        {progress}% COMPLETE
      </div>
    </div>
  );
}

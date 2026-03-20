"use client";

interface Props {
  encoded: string;
  label: string;
}

export default function CipherBlock({ encoded, label }: Props) {
  return (
    <div style={{ margin: "12px 0" }}>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          color: "#00aa2a",
          letterSpacing: 2,
          marginBottom: 8,
          textTransform: "uppercase",
        }}
      >
        INTERCEPTED TRANSMISSION — {label}
      </div>
      <div
        style={{
          backgroundColor: "#0d1a0d",
          border: "1px solid #1a3a1a",
          borderRadius: 4,
          padding: "12px 16px",
          fontFamily: "var(--font-mono)",
          fontSize: "clamp(22px, 6.5vw, 36px)",
          fontWeight: 700,
          color: "#00ff41",
          letterSpacing: "clamp(3px, 0.8vw, 6px)",
          textAlign: "center",
          wordBreak: "break-all",
          textShadow: "0 0 16px rgba(0,255,65,0.6), 0 0 32px rgba(0,255,65,0.2)",
          boxShadow: "inset 0 0 24px rgba(0,255,65,0.08), 0 0 0 1px rgba(0,255,65,0.1)",
          lineHeight: 1.3,
        }}
      >
        {encoded}
      </div>
    </div>
  );
}

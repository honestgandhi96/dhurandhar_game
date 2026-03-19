"use client";

interface Props {
  hintText: string;
  revealed: boolean;
  hintsRemaining: number;
  onReveal: () => void;
}

export default function HintPanel({
  hintText,
  revealed,
  hintsRemaining,
  onReveal,
}: Props) {
  if (revealed) {
    return (
      <div
        className="fade-in"
        style={{
          backgroundColor: "#1a1400",
          border: "1px solid #ffaa00",
          borderRadius: 4,
          padding: "10px 12px",
          margin: "8px 0",
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          color: "#ffaa00",
          lineHeight: 1.6,
        }}
      >
        <span style={{ marginRight: 8, opacity: 0.7 }}>▸ HINT:</span>
        {hintText}
      </div>
    );
  }

  return (
    <button
      onClick={onReveal}
      disabled={hintsRemaining <= 0}
      style={{
        display: "block",
        width: "100%",
        minHeight: 48,
        backgroundColor: "transparent",
        border: `1px solid ${hintsRemaining > 0 ? "#ffaa00" : "#333"}`,
        borderRadius: 4,
        color: hintsRemaining > 0 ? "#ffaa00" : "#444",
        fontFamily: "var(--font-ui)",
        fontWeight: 600,
        fontSize: 13,
        letterSpacing: 2,
        cursor: hintsRemaining > 0 ? "pointer" : "not-allowed",
        transition: "background-color 0.15s",
        margin: "8px 0",
      }}
      onMouseEnter={(e) => {
        if (hintsRemaining > 0)
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#1a1100";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
      }}
    >
      {hintsRemaining > 0
        ? `▸ USE HINT (${hintsRemaining} remaining · −10% cover · −50pts)`
        : "NO HINTS REMAINING"}
    </button>
  );
}

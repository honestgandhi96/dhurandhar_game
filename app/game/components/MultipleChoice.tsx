"use client";

interface Props {
  choices: string[];
  onSelect: (choice: string) => void;
  disabled: boolean;
  shake: boolean;
}

export default function MultipleChoice({ choices, onSelect, disabled, shake }: Props) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, margin: "8px 0" }}>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          color: "#00aa2a",
          letterSpacing: 2,
          marginBottom: 2,
        }}
      >
        SELECT YOUR ANSWER:
      </div>
      {choices.map((choice) => (
        <button
          key={choice}
          onClick={() => !disabled && onSelect(choice)}
          disabled={disabled}
          className={shake ? "shake" : ""}
          style={{
            minHeight: 38,
            backgroundColor: "#0d2a0d",
            border: "1px solid #2a5a2a",
            borderRadius: 4,
            color: disabled ? "#006622" : "#00ff41",
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            letterSpacing: 2,
            cursor: disabled ? "not-allowed" : "pointer",
            padding: "6px 14px",
            textAlign: "left",
            transition: "border-color 0.15s, background-color 0.15s",
          }}
          onMouseEnter={(e) => {
            if (!disabled) {
              const btn = e.currentTarget as HTMLButtonElement;
              btn.style.borderColor = "#00ff41";
              btn.style.backgroundColor = "#112b11";
            }
          }}
          onMouseLeave={(e) => {
            const btn = e.currentTarget as HTMLButtonElement;
            btn.style.borderColor = "#2a5a2a";
            btn.style.backgroundColor = "#0d2a0d";
          }}
        >
          <span style={{ color: "#00aa2a", marginRight: 12 }}>▸</span>
          {choice}
        </button>
      ))}
    </div>
  );
}

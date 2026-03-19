"use client";

interface Props {
  choices: string[];
  onSelect: (choice: string) => void;
  disabled: boolean;
  shake: boolean;
}

export default function MultipleChoice({ choices, onSelect, disabled, shake }: Props) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, margin: "12px 0" }}>
      {choices.map((choice) => (
        <button
          key={choice}
          onClick={() => !disabled && onSelect(choice)}
          disabled={disabled}
          className={shake ? "shake" : ""}
          style={{
            minHeight: 48,
            backgroundColor: "#0d1a0d",
            border: "1px solid #1a3a1a",
            borderRadius: 4,
            color: disabled ? "#006622" : "#00ff41",
            fontFamily: "var(--font-mono)",
            fontSize: 13,
            letterSpacing: 2,
            cursor: disabled ? "not-allowed" : "pointer",
            padding: "10px 16px",
            textAlign: "left",
            transition: "border-color 0.15s, background-color 0.15s",
          }}
          onMouseEnter={(e) => {
            if (!disabled) {
              const btn = e.currentTarget as HTMLButtonElement;
              btn.style.borderColor = "#00ff41";
              btn.style.backgroundColor = "#0f2a0f";
            }
          }}
          onMouseLeave={(e) => {
            const btn = e.currentTarget as HTMLButtonElement;
            btn.style.borderColor = "#1a3a1a";
            btn.style.backgroundColor = "#0d1a0d";
          }}
        >
          <span style={{ color: "#00aa2a", marginRight: 12 }}>▸</span>
          {choice}
        </button>
      ))}
    </div>
  );
}

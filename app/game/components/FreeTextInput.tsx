"use client";

import { useState } from "react";

interface Props {
  onSubmit: (answer: string) => void;
  disabled: boolean;
  shake: boolean;
}

export default function FreeTextInput({ onSubmit, disabled, shake }: Props) {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSubmit(trimmed);
  };

  return (
    <div style={{ margin: "12px 0" }}>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          color: "#00aa2a",
          letterSpacing: 2,
          marginBottom: 8,
        }}
      >
        ENTER DECODED MESSAGE:
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value.slice(0, 100))}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          disabled={disabled}
          placeholder="TYPE ANSWER HERE..."
          className={shake ? "shake" : ""}
          style={{
            flex: 1,
            minHeight: 48,
            backgroundColor: "#0d1a0d",
            border: "1px solid #1a3a1a",
            borderRadius: 4,
            color: "#00ff41",
            fontFamily: "var(--font-mono)",
            fontSize: 14,
            letterSpacing: 2,
            padding: "0 14px",
            outline: "none",
            caretColor: "#00ff41",
            textTransform: "uppercase",
          }}
          autoComplete="off"
          spellCheck={false}
        />
        <button
          onClick={handleSubmit}
          disabled={disabled || !value.trim()}
          style={{
            minHeight: 48,
            minWidth: 100,
            backgroundColor:
              disabled || !value.trim() ? "#0d1a0d" : "#003310",
            border: `1px solid ${disabled || !value.trim() ? "#1a3a1a" : "#00ff41"}`,
            borderRadius: 4,
            color: disabled || !value.trim() ? "#00661a" : "#00ff41",
            fontFamily: "var(--font-ui)",
            fontWeight: 700,
            fontSize: 13,
            letterSpacing: 2,
            cursor: disabled || !value.trim() ? "not-allowed" : "pointer",
            transition: "all 0.15s",
          }}
        >
          TRANSMIT
        </button>
      </div>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 9,
          color: "#005510",
          marginTop: 6,
          letterSpacing: 1,
        }}
      >
        {value.length}/100 CHARS · ANSWER IS NORMALIZED (CASE INSENSITIVE)
      </div>
    </div>
  );
}

"use client";

interface Props {
  title: string;
  lines: string[];
}

export default function DecoderReference({ title, lines }: Props) {
  return (
    <div
      style={{
        backgroundColor: "#0d1a0d",
        border: "1px solid #1a3a1a",
        borderRadius: 4,
        padding: "10px 12px",
        margin: "10px 0",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 9,
          color: "#00aa2a",
          letterSpacing: 2,
          marginBottom: 6,
          textTransform: "uppercase",
        }}
      >
        ▸ {title}
      </div>
      {lines.map((line, i) =>
        line === "" ? (
          <div key={i} style={{ height: 6 }} />
        ) : (
          <div
            key={i}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "#00cc35",
              lineHeight: 1.7,
              letterSpacing: 1,
            }}
          >
            {line}
          </div>
        )
      )}
    </div>
  );
}

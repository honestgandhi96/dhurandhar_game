"use client";

import type { Act } from "../data/missions";
import type { ReactNode } from "react";

interface Props {
  act: Act;
  missionRef: string;
  children: ReactNode;
  shake?: boolean;
  coverBlown?: boolean;
  mission7?: boolean;
  lowIntegrity?: boolean; // integrity ≤ 30
}

export default function DossierCard({
  act,
  missionRef,
  children,
  shake = false,
  coverBlown = false,
  mission7 = false,
  lowIntegrity = false,
}: Props) {
  const actClass = `dossier-act${act}`;
  const shakeClass = lowIntegrity && !mission7 ? "dossier-danger" : "";
  const blownClass = coverBlown ? "cover-blown-anim" : "";
  const heartClass = mission7 ? "heartbeat" : "";

  return (
    <div
      className={`${actClass} ${shakeClass} ${blownClass} ${heartClass}`}
      style={{
        position: "relative",
        borderRadius: act === 3 ? "6px 6px 0 0" : 6,
        padding: "20px 18px 24px",
        margin: "12px 0",
        overflow: "hidden",
        boxShadow: "0 4px 24px rgba(0,0,0,0.5)",
        border: shake
          ? "1.5px solid #ff2020"
          : "1.5px solid transparent",
        transition: "border-color 0.2s",
      }}
    >
      {/* Act 2: vignette overlay */}
      {act >= 2 && (
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.25) 100%)",
            pointerEvents: "none",
          }}
        />
      )}

      {/* Act 2: ink smudge */}
      {act === 2 && (
        <div
          aria-hidden
          style={{
            position: "absolute",
            bottom: 20,
            right: 20,
            width: 40,
            height: 20,
            backgroundColor: "#000",
            borderRadius: "50%",
            opacity: 0.08,
            filter: "blur(6px)",
            pointerEvents: "none",
          }}
        />
      )}

      {/* Act 3: coffee ring */}
      {act === 3 && (
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: 24,
            right: 24,
            width: 60,
            height: 60,
            border: "3px solid rgba(80,40,0,0.15)",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />
      )}

      {/* CLASSIFIED stamp */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 14,
          right: 16,
          color: "#cc1111",
          border: "3px solid #cc1111",
          borderRadius: 2,
          fontFamily: "var(--font-ui)",
          fontWeight: 700,
          fontSize: 11,
          letterSpacing: 3,
          padding: "2px 8px",
          transform: "rotate(-8deg)",
          opacity: act === 3 ? 0.5 : 0.85,
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 10,
        }}
      >
        CLASSIFIED
      </div>

      {/* Mission ref */}
      <div
        style={{
          fontFamily: "var(--font-dossier)",
          fontSize: 10,
          color: "#5a4a2a",
          letterSpacing: 2,
          marginBottom: 14,
          paddingBottom: 8,
          borderBottom: "1px solid rgba(0,0,0,0.15)",
        }}
      >
        REF: {missionRef}
      </div>

      {children}
    </div>
  );
}

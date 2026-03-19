import type { ReactNode } from "react";
import { Share_Tech_Mono, Rajdhani, Special_Elite } from "next/font/google";
import "./game.css";

const shareTechMono = Share_Tech_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const rajdhani = Rajdhani({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-ui",
  display: "swap",
});

const specialElite = Special_Elite({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dossier",
  display: "swap",
});

export const metadata = {
  title: "Operation Dhurandhar: Become Hamza",
  description:
    "A spy thriller cipher game. 7 missions. One identity. No way back.",
};

export default function GameLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className={`${shareTechMono.variable} ${rajdhani.variable} ${specialElite.variable}`}
      style={{ fontFamily: "var(--font-mono)" }}
    >
      {/* Scanline overlay */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 9999,
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,255,65,0.015) 2px, rgba(0,255,65,0.015) 4px)",
        }}
      />
      {children}
    </div>
  );
}

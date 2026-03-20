"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { MISSIONS } from "./data/missions";
import TopBar from "./components/TopBar";
import ProgressBar from "./components/ProgressBar";
import DossierCard from "./components/DossierCard";
import CoverIntegrityMeter from "./components/CoverIntegrityMeter";
import CipherBlock from "./components/CipherBlock";
import HintPanel from "./components/HintPanel";
import MultipleChoice from "./components/MultipleChoice";
import FreeTextInput from "./components/FreeTextInput";
import FeedbackOverlay, {
  type FeedbackData,
} from "./components/FeedbackOverlay";
import HandlerMessage from "./components/HandlerMessage";
import IdentityBar from "./components/IdentityBar";
import MidGameShare from "./components/MidGameShare";
import EndScreen from "./components/EndScreen";

type GamePhase = "handler" | "playing" | "transition" | "share_prompt" | "gameover";

interface MissionResult {
  missionIndex: number;
  solved: boolean;
  pointsEarned: number;
  coverAtEnd: number;
}

interface TransitionData {
  solved: boolean;
  coverAtEnd: number;
}

export default function GamePage() {
  // ── Core game state ──────────────────────────────────────────
  const [gamePhase, setGamePhase] = useState<GamePhase>("handler");
  const [currentMission, setCurrentMission] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [hintsRemaining, setHintsRemaining] = useState(3);
  const [hintUsedThisMission, setHintUsedThisMission] = useState(false);
  const [hintRevealed, setHintRevealed] = useState(false);
  const [coverIntegrity, setCoverIntegrity] = useState(
    MISSIONS[0].coverIntegrityStart
  );
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [results, setResults] = useState<MissionResult[]>([]);
  const [identityProgress, setIdentityProgress] = useState(0);
  const [shuffledChoices, setShuffledChoices] = useState<string[]>([]);

  // ── UI / animation state ──────────────────────────────────────
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackData, setFeedbackData] = useState<FeedbackData | null>(null);
  const [transitionData, setTransitionData] = useState<TransitionData>({
    solved: false,
    coverAtEnd: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shake, setShake] = useState(false);
  const [coverBlown, setCoverBlown] = useState(false);
  const [greenFlash, setGreenFlash] = useState(false);
  const [redFlash, setRedFlash] = useState(false);
  const [scorePop, setScorePop] = useState(false);

  // ── Refs ──────────────────────────────────────────────────────
  const drainRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const coverRef = useRef(coverIntegrity);
  const failedRef = useRef(false); // prevent double-trigger

  useEffect(() => {
    coverRef.current = coverIntegrity;
  }, [coverIntegrity]);

  const mission = MISSIONS[currentMission];

  // ── Shuffle choices on mission change ────────────────────────
  useEffect(() => {
    if (mission.choices) {
      setShuffledChoices([...mission.choices].sort(() => Math.random() - 0.5));
    }
    failedRef.current = false;
  }, [currentMission, mission.choices]);

  // ── Cover drain timer ────────────────────────────────────────
  useEffect(() => {
    if (drainRef.current) clearInterval(drainRef.current);
    if (gamePhase !== "playing" || showFeedback || coverBlown) return;
    if (currentMission === 6) return; // no passive drain on mission 7

    drainRef.current = setInterval(() => {
      setCoverIntegrity((prev) => Math.max(0, prev - 1));
    }, 4000);

    return () => {
      if (drainRef.current) clearInterval(drainRef.current);
    };
  }, [gamePhase, showFeedback, currentMission, coverBlown]);

  // ── Cover blown detector ─────────────────────────────────────
  useEffect(() => {
    if (
      coverIntegrity <= 0 &&
      gamePhase === "playing" &&
      !showFeedback &&
      !coverBlown &&
      !failedRef.current
    ) {
      failedRef.current = true;
      triggerCoverBlown();
    }
  });

  const triggerCoverBlown = useCallback(() => {
    if (drainRef.current) clearInterval(drainRef.current);
    setCoverBlown(true);
    setRedFlash(true);
    setTimeout(() => {
      setRedFlash(false);
      setCoverBlown(false);
      const data: FeedbackData = {
        correct: false,
        pointsEarned: 0,
        coverAtEnd: 0,
        breakdown: { base: 0, speed: 0, streakBonus: 0, diffBonus: 0, hintPenalty: 0 },
      };
      setFeedbackData(data);
      setTransitionData({ solved: false, coverAtEnd: 0 });
      setStreak(0);
      setShowFeedback(true);
    }, 600);
  }, []);

  // ── Submit answer ─────────────────────────────────────────────
  const handleSubmit = useCallback(
    async (answer: string) => {
      if (isSubmitting || showFeedback || failedRef.current) return;
      setIsSubmitting(true);

      try {
        const res = await fetch("/api/validate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answer, question_id: mission.questionId }),
        });
        const data = await res.json();

        if (data.correct) {
          if (drainRef.current) clearInterval(drainRef.current);
          const ci = coverRef.current;
          const base = 200;
          const speed = Math.floor(ci * 2);
          const streakBonus = streak * 30;
          const diffBonus = (mission.difficulty - 1) * 75;
          const hintPenalty = hintUsedThisMission ? 50 : 0;
          const total = base + speed + streakBonus + diffBonus - hintPenalty;

          setScore((s) => s + total);
          setStreak((s) => s + 1);
          setGreenFlash(true);
          setTimeout(() => setGreenFlash(false), 500);
          setScorePop(true);
          setTimeout(() => setScorePop(false), 300);

          const fb: FeedbackData = {
            correct: true,
            pointsEarned: total,
            coverAtEnd: ci,
            breakdown: { base, speed, streakBonus, diffBonus, hintPenalty },
          };
          setFeedbackData(fb);
          setTransitionData({ solved: true, coverAtEnd: ci });
          setShowFeedback(true);
        } else {
          // Wrong answer
          setShake(true);
          setTimeout(() => setShake(false), 400);
          setRedFlash(true);
          setTimeout(() => setRedFlash(false), 300);
          setStreak(0);

          const newWrong = wrongAttempts + 1;
          setWrongAttempts(newWrong);
          setCoverIntegrity((prev) => Math.max(0, prev - 15));

          // Auto-fail missions 1-5 after 4+ wrong attempts
          if (newWrong >= 4 && currentMission <= 4) {
            if (drainRef.current) clearInterval(drainRef.current);
            failedRef.current = true;
            const fb: FeedbackData = {
              correct: false,
              pointsEarned: 0,
              coverAtEnd: Math.max(0, coverRef.current - 15),
              breakdown: { base: 0, speed: 0, streakBonus: 0, diffBonus: 0, hintPenalty: 0 },
            };
            setFeedbackData(fb);
            setTransitionData({ solved: false, coverAtEnd: 0 });
            setShowFeedback(true);
          }
        }
      } catch {
        setShake(true);
        setTimeout(() => setShake(false), 400);
      } finally {
        setIsSubmitting(false);
      }
    },
    [
      isSubmitting,
      showFeedback,
      mission,
      streak,
      hintUsedThisMission,
      wrongAttempts,
      currentMission,
    ]
  );

  // ── Hint ──────────────────────────────────────────────────────
  const handleHint = useCallback(() => {
    if (hintsRemaining <= 0 || hintRevealed) return;
    setHintRevealed(true);
    setHintUsedThisMission(true);
    setHintsRemaining((n) => n - 1);
    setCoverIntegrity((prev) => Math.max(0, prev - 10));
  }, [hintsRemaining, hintRevealed]);

  // ── Feedback continue ─────────────────────────────────────────
  const handleFeedbackContinue = useCallback(() => {
    if (!feedbackData) return;
    setShowFeedback(false);
    setResults((prev) => [
      ...prev,
      {
        missionIndex: currentMission,
        solved: feedbackData.correct,
        pointsEarned: feedbackData.pointsEarned,
        coverAtEnd: feedbackData.coverAtEnd,
      },
    ]);
    setIdentityProgress((p) => Math.min(100, p + 14));

    if (currentMission >= 6) {
      setGamePhase("gameover");
    } else {
      setGamePhase("transition");
    }
  }, [feedbackData, currentMission]);

  // ── Transition continue ───────────────────────────────────────
  const handleTransitionContinue = useCallback(() => {
    const completedIndex = currentMission;
    const nextIndex = completedIndex + 1;

    setCurrentMission(nextIndex);
    setHintUsedThisMission(false);
    setHintRevealed(false);
    setWrongAttempts(0);
    setCoverIntegrity(MISSIONS[nextIndex].coverIntegrityStart);

    if (completedIndex === 2) {
      setGamePhase("share_prompt");
    } else {
      setGamePhase("playing");
    }
  }, [currentMission]);

  const handleShareContinue = useCallback(() => {
    setGamePhase("playing");
  }, []);

  const handleBegin = useCallback(() => {
    setGamePhase("playing");
  }, []);

  // ── Play again ────────────────────────────────────────────────
  const handlePlayAgain = useCallback(() => {
    setGamePhase("handler");
    setCurrentMission(0);
    setScore(0);
    setStreak(0);
    setHintsRemaining(3);
    setHintUsedThisMission(false);
    setHintRevealed(false);
    setCoverIntegrity(MISSIONS[0].coverIntegrityStart);
    setWrongAttempts(0);
    setResults([]);
    setIdentityProgress(0);
    setShowFeedback(false);
    setFeedbackData(null);
    setCoverBlown(false);
    failedRef.current = false;
  }, []);

  // ── Derived ───────────────────────────────────────────────────
  const lowIntegrity = coverIntegrity <= 30;

  // ─────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────

  if (gamePhase === "gameover") {
    return (
      <div className="game-shell" style={{ backgroundColor: "#0a0a0a" }}>
        <EndScreen score={score} results={results} onPlayAgain={handlePlayAgain} />
      </div>
    );
  }

  if (gamePhase === "share_prompt") {
    return (
      <div className="game-shell" style={{ backgroundColor: "#0a0a0a" }}>
        <MidGameShare score={score} onContinue={handleShareContinue} />
      </div>
    );
  }

  if (gamePhase === "transition") {
    return (
      <div className="game-shell" style={{ backgroundColor: "#0a0a0a" }}>
        <HandlerMessage
          completedMissionIndex={currentMission}
          solved={transitionData.solved}
          coverAtEnd={transitionData.coverAtEnd}
          identityProgress={identityProgress}
          onContinue={handleTransitionContinue}
        />
      </div>
    );
  }

  if (gamePhase === "handler") {
    return (
      <div
        className="game-shell"
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
        <div style={{ maxWidth: 460, width: "100%", textAlign: "center" }}>
          <div
            style={{
              color: "#00aa2a",
              fontSize: 10,
              letterSpacing: 4,
              marginBottom: 16,
            }}
          >
            INTELLIGENCE BUREAU · CLASSIFIED
          </div>
          <div
            style={{
              fontFamily: "var(--font-ui)",
              fontWeight: 700,
              fontSize: 26,
              color: "#00ff41",
              letterSpacing: 3,
              textShadow: "0 0 20px rgba(0,255,65,0.4)",
              marginBottom: 8,
              lineHeight: 1.2,
            }}
          >
            OPERATION DHURANDHAR
          </div>
          <div
            style={{
              fontFamily: "var(--font-ui)",
              fontWeight: 600,
              fontSize: 14,
              color: "#ffaa00",
              letterSpacing: 4,
              marginBottom: 32,
            }}
          >
            BECOME HAMZA
          </div>

          <div
            style={{
              backgroundColor: "#0d1a0d",
              border: "1px solid #1a3a1a",
              borderRadius: 6,
              padding: "18px 20px",
              marginBottom: 24,
              textAlign: "left",
              color: "#00aa2a",
              fontSize: 12,
              lineHeight: 1.9,
            }}
          >
            <div style={{ marginBottom: 8 }}>
              <span style={{ color: "#00ff41" }}>IDENTITY:</span> Jaskirat Singh Rangi
            </div>
            <div style={{ marginBottom: 8 }}>
              <span style={{ color: "#00ff41" }}>DIVISION:</span> IB Field Operations
            </div>
            <div style={{ marginBottom: 8 }}>
              <span style={{ color: "#00ff41" }}>HANDLER:</span> Mohammed Aalam
            </div>
            <div style={{ marginBottom: 8 }}>
              <span style={{ color: "#00ff41" }}>OPERATION:</span> DHURANDHAR
            </div>
            <div>
              <span style={{ color: "#00ff41" }}>MISSION:</span> 7 transmissions. One identity.
              No way back.
            </div>
          </div>

          <div
            style={{
              color: "#00661a",
              fontSize: 11,
              lineHeight: 1.8,
              marginBottom: 28,
            }}
          >
            Each mission brings you closer to becoming{" "}
            <span style={{ color: "#00aa2a" }}>Hamza Ali Mazari</span>.
            <br />
            Decode the ciphers. Hold your cover. Survive.
          </div>

          <button
            onClick={handleBegin}
            style={{
              display: "block",
              width: "100%",
              minHeight: 56,
              backgroundColor: "#003310",
              border: "2px solid #00ff41",
              borderRadius: 4,
              color: "#00ff41",
              fontFamily: "var(--font-ui)",
              fontWeight: 700,
              fontSize: 16,
              letterSpacing: 4,
              cursor: "pointer",
              boxShadow: "0 0 20px rgba(0,255,65,0.2)",
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#004d18";
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 0 30px rgba(0,255,65,0.35)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#003310";
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 0 20px rgba(0,255,65,0.2)";
            }}
          >
            BEGIN OPERATION
          </button>
        </div>
      </div>
    );
  }

  // ── PLAYING ───────────────────────────────────────────────────
  return (
    <div
      className="game-shell"
      style={{ height: "100dvh", backgroundColor: "#0a0a0a", display: "flex", flexDirection: "column" }}
    >
      {/* Flash overlays */}
      {greenFlash && (
        <div
          aria-hidden
          className="green-flash-overlay"
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "#00ff41",
            pointerEvents: "none",
            zIndex: 300,
          }}
        />
      )}
      {redFlash && (
        <div
          aria-hidden
          className="red-flash-overlay"
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "#ff2020",
            pointerEvents: "none",
            zIndex: 300,
          }}
        />
      )}
      {coverBlown && (
        <div
          aria-hidden
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "#0a0a0a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 350,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-ui)",
              fontWeight: 700,
              fontSize: 24,
              color: "#ff2020",
              letterSpacing: 4,
              textShadow: "0 0 20px rgba(255,32,32,0.8)",
            }}
          >
            COVER BLOWN — MISSION COMPROMISED
          </div>
        </div>
      )}

      <TopBar
        score={score}
        missionNumber={mission.id}
        act={mission.act}
        hintsRemaining={hintsRemaining}
        streak={streak}
        scorePop={scorePop}
      />
      <ProgressBar completedMissions={currentMission} act={mission.act} />

      {/* Scrollable mission content */}
      <div style={{ flex: 1, overflowY: "auto", WebkitOverflowScrolling: "touch" }}>
        <div style={{ maxWidth: 560, margin: "0 auto", padding: "16px" }}>
          {/* Mission header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 4,
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              color: "#00aa2a",
              letterSpacing: 1,
            }}
          >
            <span>MISSION {mission.id} OF 7</span>
            <span style={{ color: "#ffaa00" }}>{mission.difficultyLabel}</span>
          </div>

          {/* Dossier card */}
          <DossierCard
            act={mission.act}
            missionRef={mission.ref}
            shake={shake}
            coverBlown={coverBlown}
            mission7={currentMission === 6}
            lowIntegrity={lowIntegrity}
          >
            {/* Cover integrity meter */}
            <CoverIntegrityMeter
              integrity={coverIntegrity}
              mission7={currentMission === 6}
              dossierShaking={lowIntegrity}
            />

            {/* Mission brief */}
            <div
              style={{
                fontFamily: "var(--font-dossier)",
                fontSize: 13,
                color: "#3a2a0a",
                lineHeight: 1.8,
                margin: "14px 0 12px",
              }}
            >
              {mission.brief}
            </div>
          </DossierCard>

          {/* Cipher (terminal section) */}
          <CipherBlock encoded={mission.encoded} label={mission.cipherLabel} />

          {/* Hint */}
          <HintPanel
            hintText={mission.hintText}
            revealed={hintRevealed}
            hintsRemaining={hintsRemaining}
            onReveal={handleHint}
          />
        </div>
      </div>

      {/* Always-visible bottom: answers + identity bar */}
      <div style={{ flexShrink: 0, backgroundColor: "#0a0a0a" }}>
        <div style={{ maxWidth: 560, margin: "0 auto", padding: "8px 16px 4px" }}>
          {/* Answer input */}
          {mission.choices ? (
            <MultipleChoice
              choices={shuffledChoices}
              onSelect={handleSubmit}
              disabled={isSubmitting || showFeedback || coverBlown}
              shake={shake}
            />
          ) : (
            <FreeTextInput
              onSubmit={handleSubmit}
              disabled={isSubmitting || showFeedback || coverBlown}
              shake={shake}
            />
          )}

          {/* Mission 7 special label */}
          {currentMission === 6 && (
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                color: "#ffaa00",
                textAlign: "center",
                marginTop: 8,
                letterSpacing: 2,
              }}
            >
              ⚠ FINAL TRANSMISSION — NO PASSIVE DRAIN — NO WAY BACK
            </div>
          )}
        </div>

        {/* Identity bar */}
        <div
          style={{
            borderTop: "1px solid #1a2a1a",
            padding: "6px 16px max(8px, env(safe-area-inset-bottom))",
          }}
        >
          <IdentityBar progress={identityProgress} />
        </div>
      </div>

      {/* Feedback overlay */}
      {showFeedback && feedbackData && (
        <FeedbackOverlay
          data={feedbackData}
          mission={mission}
          onContinue={handleFeedbackContinue}
        />
      )}
    </div>
  );
}

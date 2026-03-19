export type Act = 1 | 2 | 3;
export type Difficulty = 1 | 2 | 3;

export interface MissionData {
  id: number;
  ref: string;
  act: Act;
  cipherLabel: string;
  difficulty: Difficulty;
  difficultyLabel: string;
  coverIntegrityStart: number;
  brief: string;
  encoded: string;
  questionId: number;
  choices: string[] | null;
  decoderTitle: string;
  decoderLines: string[];
  hintText: string;
}

export const MISSIONS: MissionData[] = [
  {
    id: 1,
    ref: "IB/HAMZA/KARACHI/001",
    act: 1,
    cipherLabel: "CAESAR CIPHER — SHIFT 3",
    difficulty: 1,
    difficultyLabel: "RECRUIT",
    coverIntegrityStart: 100,
    brief:
      "Welcome, Agent Jaskirat. Your mission begins today. Handler Mohammed Aalam has intercepted a fragment of conversation between two Baloch operatives near his juice shop in Lyari, Karachi. Decode the message to confirm your first rendezvous point. Every letter has been shifted 3 positions forward in the alphabet.",
    encoded: "PHHW DW WKH SRUW",
    questionId: 1,
    choices: [
      "MEET AT THE PORT",
      "MOVE TO THE SAFE HOUSE",
      "LEAVE FOR KARACHI",
      "FIND THE INFORMANT",
    ],
    decoderTitle: "CAESAR CIPHER KEY",
    decoderLines: [
      "Each letter shifted FORWARD 3 positions to encode.",
      "To decode, shift BACKWARD 3.",
      "D→A  E→B  F→C  G→D  H→E  I→F  J→G  K→H",
    ],
    hintText:
      "A→D, B→E, C→F when encoding. So D→A, E→B, F→C when decoding. The word PHHW has 4 letters. Think of a 4-letter meeting word.",
  },
  {
    id: 2,
    ref: "IB/HAMZA/KARACHI/002",
    act: 1,
    cipherLabel: "REVERSE CIPHER",
    difficulty: 1,
    difficultyLabel: "RECRUIT",
    coverIntegrityStart: 80,
    brief:
      "ISI double-agent Major Iqbal has sent a reversed message through a courier operating between Karachi and Quetta. Agent Jaskirat — you must decode it before the courier reaches the next checkpoint. The encoding method is crude but effective.",
    encoded: "ENO ON TSURT",
    questionId: 2,
    choices: [
      "TRUST NO ONE",
      "MOVE NOW ALONE",
      "BURN THE FILE",
      "TELL NO ONE",
    ],
    decoderTitle: "REVERSE CIPHER KEY",
    decoderLines: [
      "This message has been written completely backwards.",
      "Read each word in reverse. Then read the words in reverse order.",
    ],
    hintText:
      "Start from the last letter of the last word and read backwards. E-N-O = ?, O-N = ?, T-S-U-R-T = ?",
  },
  {
    id: 3,
    ref: "IB/HAMZA/KARACHI/003",
    act: 2,
    cipherLabel: "ATBASH CIPHER",
    difficulty: 2,
    difficultyLabel: "FIELD AGENT",
    coverIntegrityStart: 80,
    brief:
      "You are three weeks into Karachi. The city is beginning to feel familiar. A coded note was found sewn into the jacket lining at Uzair Baloch's compound. The IB suspects it contains coordinates for an LTF weapons cache. Hamza, this cipher is ancient — of Hebrew origin. The alphabet is a mirror.",
    encoded: "WZMTVI RM PZIZXSR",
    questionId: 3,
    choices: [
      "DANGER IN KARACHI",
      "GATHER IN LAHORE",
      "TARGET IS SECURED",
      "RETURN TO HANDLER",
    ],
    decoderTitle: "ATBASH CIPHER KEY",
    decoderLines: [
      "Atbash mirrors the alphabet. A↔Z, B↔Y, C↔X, D↔W, E↔V",
      "Z→A  Y→B  X→C  W→D  V→E  U→F  T→G  S→H  R→I",
    ],
    hintText:
      "W is the 4th letter from the end of the alphabet, so it decodes to D. Z decodes to A. M decodes to N. Try working through WZMTVI letter by letter.",
  },
  {
    id: 4,
    ref: "IB/HAMZA/KARACHI/004",
    act: 2,
    cipherLabel: "MORSE CODE",
    difficulty: 2,
    difficultyLabel: "FIELD AGENT",
    coverIntegrityStart: 80,
    brief:
      "Six weeks in. You have not spoken your real name in 18 days. Hamza intercepts a radio transmission near the Sindh Police checkpoint. SP Chaudhary Aslam's informant is transmitting in dots and dashes. Decode the signal before the frequency goes dark — you have one chance.",
    encoded: ".- -... --- .-. -",
    questionId: 4,
    choices: ["ABORT", "ALERT", "AWAIT", "ABOVE"],
    decoderTitle: "MORSE CODE REFERENCE",
    decoderLines: [
      "A=.-  B=-...  O=---  R=.-.  T=-",
      "Each letter separated by a space. Decode letter by letter.",
    ],
    hintText:
      "5 Morse codes = 5 letters. .- = A,  -... = B,  --- = O,  .-. = R,  - = T. Rearrange: what 5-letter word do these spell?",
  },
  {
    id: 5,
    ref: "IB/HAMZA/KARACHI/005",
    act: 2,
    cipherLabel: "ROT-13 CIPHER",
    difficulty: 2,
    difficultyLabel: "FIELD AGENT",
    coverIntegrityStart: 80,
    brief:
      "Two months underground. IB Director Ajay Sanyal has made direct contact. A priority message has arrived through the encrypted IB relay. ROT-13 is the agency's most-used field cipher — symmetric, fast, unbreakable without the key. Hamza, decode this before the relay window closes.",
    encoded: "BCRENGVBA ERIRATF",
    questionId: 5,
    choices: [
      "OPERATION REVENGE",
      "OPERATION RESPONSE",
      "OBJECTIVE REACHED",
      "EXTRACTION READY",
    ],
    decoderTitle: "ROT-13 CIPHER KEY",
    decoderLines: [
      "ROT-13 shifts every letter exactly 13 positions.",
      "It is its own inverse — apply it twice to get back the original.",
      "N→A  O→B  P→C  Q→D  R→E  S→F  T→G  U→H",
    ],
    hintText:
      "B decodes to O. C decodes to P. R decodes to E. N decodes to A. The first word BCRENGVBA has 9 letters. What 9-letter operation word fits?",
  },
  {
    id: 6,
    ref: "IB/HAMZA/KARACHI/006",
    act: 3,
    cipherLabel: "NATO PHONETIC ALPHABET",
    difficulty: 3,
    difficultyLabel: "GHOST OPERATIVE",
    coverIntegrityStart: 80,
    brief:
      "Agent Jaskirat Singh Rangi has been officially declared missing by IB. Only Hamza exists now. A mole deep inside the ISI is using NATO phonetic alphabet to pass messages. The transmission was spoken aloud at a diplomatic function and transcribed by our operative. Decode each phonetic word to its letter. The pipe symbol separates words.",
    encoded:
      "HOTEL ALPHA MIKE ZULU ALPHA | LIMA INDIA VICTOR ECHO SIERRA",
    questionId: 6,
    choices: null,
    decoderTitle: "NATO PHONETIC ALPHABET",
    decoderLines: [
      "A=ALPHA  B=BRAVO  C=CHARLIE  D=DELTA  E=ECHO  F=FOXTROT  G=GOLF",
      "H=HOTEL  I=INDIA  J=JULIET  K=KILO  L=LIMA  M=MIKE  N=NOVEMBER",
      "O=OSCAR  P=PAPA  Q=QUEBEC  R=ROMEO  S=SIERRA  T=TANGO  U=UNIFORM",
      "V=VICTOR  W=WHISKEY  X=XRAY  Y=YANKEE  Z=ZULU",
      "Pipe symbol | = space between words",
    ],
    hintText:
      "Take the first letter of each NATO word. HOTEL=H, ALPHA=A, MIKE=M, ZULU=Z, ALPHA=A → first word. LIMA=L, INDIA=I, VICTOR=V, ECHO=E, SIERRA=S → second word.",
  },
  {
    id: 7,
    ref: "IB/HAMZA/KARACHI/007",
    act: 3,
    cipherLabel: "DOUBLE CIPHER — CLASSIFIED",
    difficulty: 3,
    difficultyLabel: "SHADOW DIRECTOR",
    coverIntegrityStart: 80,
    brief:
      "This is the final transmission. Hamza Ali Mazari has uncovered the identity of the mastermind behind the network that planned 26/11. He must send one last message to IB headquarters before going dark forever. Two-layer encryption. Strip the outer Caesar layer first. Then unweave the Rail Fence. There is no going back after this.",
    encoded: "YMJ WJANSLJ NX HTRUQJYJ",
    questionId: 7,
    choices: null,
    decoderTitle: "DOUBLE CIPHER KEY",
    decoderLines: [
      "STEP 1 — Caesar Shift-5 (outer layer):",
      "Each letter was shifted FORWARD 5 to encode.",
      "Shift BACKWARD 5 to decode.",
      "Y→T  M→H  J→E  W→R  A→V  N→I  S→N  L→G",
      "",
      "STEP 2 — Rail Fence, 2 rails (inner layer):",
      "After Step 1, you get a scrambled string.",
      "Split into two halves. Interleave: top rail, bottom rail, alternate.",
    ],
    hintText:
      "After decoding Caesar-5, work through each letter shifting back 5. Then interleave two halves of the result. The answer is a 4-word phrase about the mission being complete.",
  },
];

export const ACT_NAMES: Record<Act, string> = {
  1: "ACTIVATION",
  2: "GOING DEEP",
  3: "NO WAY BACK",
};

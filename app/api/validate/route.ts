import { NextRequest, NextResponse } from "next/server";

// In-memory rate limiter: IP -> { count, windowStart }
const rateLimitMap = new Map<string, { count: number; windowStart: number }>();
const RATE_LIMIT = 20;
const WINDOW_MS = 60_000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now - entry.windowStart >= WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, windowStart: now });
    return false;
  }

  if (entry.count >= RATE_LIMIT) {
    return true;
  }

  entry.count += 1;
  return false;
}

function normalize(s: string): string {
  return s.trim().toUpperCase().replace(/\s+/g, " ");
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "too many attempts" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid input" }, { status: 400 });
  }

  if (
    typeof body !== "object" ||
    body === null ||
    !("answer" in body) ||
    !("question_id" in body)
  ) {
    return NextResponse.json({ error: "invalid input" }, { status: 400 });
  }

  const { answer, question_id } = body as Record<string, unknown>;

  if (
    typeof answer !== "string" ||
    answer.trim().length === 0 ||
    answer.length > 100
  ) {
    return NextResponse.json({ error: "invalid input" }, { status: 400 });
  }

  if (
    typeof question_id !== "number" ||
    !Number.isInteger(question_id) ||
    question_id < 1 ||
    question_id > 7
  ) {
    return NextResponse.json({ error: "invalid input" }, { status: 400 });
  }

  const correctAnswer = process.env[`CIPHER_ANSWER_${question_id}`];
  if (!correctAnswer) {
    return NextResponse.json(
      { error: "server configuration error" },
      { status: 500 }
    );
  }

  const correct = normalize(answer) === normalize(correctAnswer);
  return NextResponse.json({ correct });
}

export async function GET() {
  return NextResponse.json({ error: "method not allowed" }, { status: 405 });
}

export async function PUT() {
  return NextResponse.json({ error: "method not allowed" }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({ error: "method not allowed" }, { status: 405 });
}

export async function PATCH() {
  return NextResponse.json({ error: "method not allowed" }, { status: 405 });
}

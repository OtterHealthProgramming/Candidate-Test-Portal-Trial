import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { candidate, answers, scoring } = body;

    const { data: candidateRow, error: candidateError } = await supabase
      .from("candidates")
      .insert({
        first_name: candidate.firstName,
        last_name: candidate.lastName,
        email: candidate.email,
        status: "completed",
        overall_fit: scoring.overall,
        compassion: scoring.normalized.compassion,
        proactivity: scoring.normalized.proactivity,
        regulation: scoring.normalized.regulation,
        social: scoring.normalized.social,
        reliability: scoring.normalized.reliability,
      })
      .select()
      .single();

    if (candidateError) {
      return NextResponse.json({ error: candidateError.message }, { status: 500 });
    }

    const { error: assessmentError } = await supabase
      .from("assessments")
      .insert({
        candidate_id: candidateRow.id,
        answers_json: answers,
      });

    if (assessmentError) {
      return NextResponse.json({ error: assessmentError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, candidateId: candidateRow.id });
  } catch (error) {
    return NextResponse.json({ error: "Submission failed" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { candidate, answers, scoring, token, questionIds } = body;

    if (!token) {
      return NextResponse.json(
        { error: "Missing token" },
        { status: 400 }
      );
    }

    // Demo fallback path
    if (token === "demo-token") {
      const { data: candidateRow, error: candidateError } = await supabase
        .from("candidates")
        .insert({
          first_name: candidate.firstName,
          last_name: candidate.lastName,
          email: candidate.email,
          status: "completed",
          submitted_at: new Date().toISOString(),
          overall_fit: scoring.overall,
          compassion: scoring.normalized.compassion,
          proactivity: scoring.normalized.proactivity,
          regulation: scoring.normalized.regulation,
          social: scoring.normalized.social,
          reliability: scoring.normalized.reliability,
        })
        .select()
        .single();

      if (candidateError || !candidateRow) {
        return NextResponse.json(
          { error: candidateError?.message || "Failed to create demo candidate" },
          { status: 500 }
        );
      }

      const { error: assessmentError } = await supabase
        .from("assessments")
        .insert({
          candidate_id: candidateRow.id,
          answers_json: {
            answers,
            questionIds,
            token,
          },
        });

      if (assessmentError) {
        return NextResponse.json(
          { error: assessmentError.message },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        candidateId: candidateRow.id,
      });
    }

    // Normal tokenized invite path
    const { data: existingCandidate, error: fetchError } = await supabase
      .from("candidates")
      .select("*")
      .eq("token", token)
      .single();

    if (fetchError || !existingCandidate) {
      return NextResponse.json(
        { error: "Candidate invite not found" },
        { status: 404 }
      );
    }

    const { error: updateError } = await supabase
      .from("candidates")
      .update({
        first_name: candidate.firstName,
        last_name: candidate.lastName,
        email: candidate.email,
        status: "completed",
        submitted_at: new Date().toISOString(),
        overall_fit: scoring.overall,
        compassion: scoring.normalized.compassion,
        proactivity: scoring.normalized.proactivity,
        regulation: scoring.normalized.regulation,
        social: scoring.normalized.social,
        reliability: scoring.normalized.reliability,
      })
      .eq("id", existingCandidate.id);

    if (updateError) {
      return NextResponse.json(
        { error: updateError.message },
        { status: 500 }
      );
    }

    const { error: assessmentError } = await supabase
      .from("assessments")
      .insert({
        candidate_id: existingCandidate.id,
        answers_json: {
          answers,
          questionIds,
          token,
        },
      });

    if (assessmentError) {
      return NextResponse.json(
        { error: assessmentError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      candidateId: existingCandidate.id,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Submission failed" },
      { status: 500 }
    );
  }
}

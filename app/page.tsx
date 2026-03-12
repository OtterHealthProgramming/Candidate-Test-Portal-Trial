"use client";

import React, { useMemo, useState } from "react";
import { CheckCircle2 } from "lucide-react";

const QUESTIONS = [
  {
    id: 1,
    type: "most",
    prompt: "Which statement feels MOST like you?",
    options: {
      A: { text: "I often notice when someone might need help before they say anything", trait: "compassion" },
      B: { text: "I try to keep situations calm when people around me feel stressed", trait: "regulation" },
      C: { text: "I prefer making sure responsibilities are handled correctly", trait: "reliability" },
      D: { text: "I enjoy starting conversations with people I don't know", trait: "social" },
    },
  },
  {
    id: 2,
    type: "most",
    prompt: "Which statement feels MOST natural to you?",
    options: {
      A: { text: "I try to anticipate needs before someone asks", trait: "proactivity" },
      B: { text: "I help people feel comfortable and welcomed", trait: "compassion" },
      C: { text: "I stay steady even when situations become tense", trait: "regulation" },
      D: { text: "I focus on making sure important tasks are completed", trait: "reliability" },
    },
  },
  {
    id: 3,
    type: "most",
    prompt: "Which approach best reflects how you usually work?",
    options: {
      A: { text: "I pay attention to how people around me are feeling", trait: "compassion" },
      B: { text: "I try to make things run smoothly for everyone", trait: "proactivity" },
      C: { text: "I stay calm in unpredictable situations", trait: "regulation" },
      D: { text: "I focus on making sure work is done accurately", trait: "reliability" },
    },
  },
  {
    id: 4,
    type: "most",
    prompt: "When entering a new environment, which feels most natural?",
    options: {
      A: { text: "I look for ways to make people feel comfortable", trait: "compassion" },
      B: { text: "I observe what might need attention or help", trait: "proactivity" },
      C: { text: "I focus on understanding expectations and responsibilities", trait: "reliability" },
      D: { text: "I wait for a natural opportunity to interact with others", trait: "social" },
    },
  },
  {
    id: 5,
    type: "most",
    prompt: "In busy environments, what helps you perform best?",
    options: {
      A: { text: "Noticing when people might need support", trait: "compassion" },
      B: { text: "Staying calm when others feel stressed", trait: "regulation" },
      C: { text: "Keeping track of what needs to get done", trait: "reliability" },
      D: { text: "Communicating easily with different people", trait: "social" },
    },
  },
  {
    id: 6,
    type: "most",
    prompt: "Which statement best reflects your natural tendency?",
    options: {
      A: { text: "I like helping people feel cared for", trait: "compassion" },
      B: { text: "I try to anticipate needs before they become problems", trait: "proactivity" },
      C: { text: "I stay steady in stressful moments", trait: "regulation" },
      D: { text: "I make sure responsibilities are handled properly", trait: "reliability" },
    },
  },
  {
    id: 7,
    type: "least",
    prompt: "Which statement feels LEAST like you?",
    options: {
      A: { text: "I prefer environments where responsibilities are clearly defined", trait: "reliability" },
      B: { text: "I enjoy responding to unexpected situations", trait: "proactivity" },
      C: { text: "I naturally look for ways to help people feel comfortable", trait: "compassion" },
      D: { text: "I usually stay calm when people around me are stressed", trait: "regulation" },
    },
  },
  {
    id: 8,
    type: "most",
    prompt: "Which description fits you best?",
    options: {
      A: { text: "I often notice emotional cues from people", trait: "compassion" },
      B: { text: "I enjoy helping situations run smoothly", trait: "proactivity" },
      C: { text: "I try to remain calm when people are frustrated", trait: "regulation" },
      D: { text: "I make sure things are handled reliably", trait: "reliability" },
    },
  },
  {
    id: 9,
    type: "most",
    prompt: "Which of these approaches feels most natural?",
    options: {
      A: { text: "I look for ways to improve someone's experience", trait: "compassion" },
      B: { text: "I focus on staying steady when situations become tense", trait: "regulation" },
      C: { text: "I make sure responsibilities are handled correctly", trait: "reliability" },
      D: { text: "I try to notice needs before they are expressed", trait: "proactivity" },
    },
  },
  {
    id: 10,
    type: "most",
    prompt: "In service environments, what motivates you most?",
    options: {
      A: { text: "Knowing someone feels supported", trait: "compassion" },
      B: { text: "Helping resolve a problem or request", trait: "reliability" },
      C: { text: "Contributing to a positive environment", trait: "social" },
      D: { text: "Helping things run smoothly", trait: "proactivity" },
    },
  },
  {
    id: 11,
    type: "least",
    prompt: "Which statement feels LEAST natural for you?",
    options: {
      A: { text: "I prefer focusing mainly on assigned responsibilities", trait: "reliability" },
      B: { text: "I enjoy interacting with new people", trait: "social" },
      C: { text: "I try to notice when someone might need help", trait: "compassion" },
      D: { text: "I try to stay calm when others feel stressed", trait: "regulation" },
    },
  },
  {
    id: 12,
    type: "most",
    prompt: "When entering unfamiliar environments, which feels most like you?",
    options: {
      A: { text: "I start noticing how people around me are feeling", trait: "compassion" },
      B: { text: "I observe the environment to see where help might be useful", trait: "proactivity" },
      C: { text: "I focus on understanding what needs to be done", trait: "reliability" },
      D: { text: "I usually wait until someone approaches me", trait: "social" },
    },
  },
  {
    id: 13,
    type: "most",
    prompt: "Which statement feels most like your natural style?",
    options: {
      A: { text: "I try to make people feel comfortable quickly", trait: "compassion" },
      B: { text: "I anticipate needs before they are expressed", trait: "proactivity" },
      C: { text: "I remain calm when situations become stressful", trait: "regulation" },
      D: { text: "I ensure things are done correctly", trait: "reliability" },
    },
  },
  {
    id: 14,
    type: "most",
    prompt: "Which of these descriptions fits you best?",
    options: {
      A: { text: "I often pick up on subtle emotional signals", trait: "compassion" },
      B: { text: "I try to prevent small issues from becoming bigger problems", trait: "proactivity" },
      C: { text: "I remain steady when people are upset", trait: "regulation" },
      D: { text: "I like making sure responsibilities are completed", trait: "reliability" },
    },
  },
  {
    id: 15,
    type: "least",
    prompt: "Which statement feels LEAST like you?",
    options: {
      A: { text: "I prefer focusing on tasks rather than interactions", trait: "social" },
      B: { text: "I enjoy helping people feel comfortable", trait: "compassion" },
      C: { text: "I try to stay calm when situations become tense", trait: "regulation" },
      D: { text: "I look for ways to anticipate needs", trait: "proactivity" },
    },
  },
  {
    id: 16,
    type: "most",
    prompt: "Which statement feels most natural?",
    options: {
      A: { text: "I enjoy noticing small things that might improve someone's experience", trait: "compassion" },
      B: { text: "I focus on staying composed in stressful environments", trait: "regulation" },
      C: { text: "I like keeping things organized and dependable", trait: "reliability" },
      D: { text: "I enjoy interacting with new people", trait: "social" },
    },
  },
  {
    id: 17,
    type: "most",
    prompt: "Which working style feels most natural to you?",
    options: {
      A: { text: "Making sure people feel supported", trait: "compassion" },
      B: { text: "Keeping situations calm and steady", trait: "regulation" },
      C: { text: "Completing responsibilities correctly", trait: "reliability" },
      D: { text: "Anticipating needs before they arise", trait: "proactivity" },
    },
  },
  {
    id: 18,
    type: "most",
    prompt: "Which statement best reflects your approach to helping others?",
    options: {
      A: { text: "I try to understand how they are feeling", trait: "compassion" },
      B: { text: "I look for ways to improve the situation", trait: "proactivity" },
      C: { text: "I remain calm and reassuring", trait: "regulation" },
      D: { text: "I help ensure things are handled properly", trait: "reliability" },
    },
  },
  {
    id: 19,
    type: "least",
    prompt: "Which statement feels LEAST like you?",
    options: {
      A: { text: "I usually wait until someone asks before offering help", trait: "proactivity" },
      B: { text: "I enjoy helping people feel comfortable", trait: "compassion" },
      C: { text: "I try to stay calm when others are frustrated", trait: "regulation" },
      D: { text: "I try to anticipate needs before they are expressed", trait: "proactivity" },
    },
  },
  {
    id: 20,
    type: "most",
    prompt: "Which statement feels most natural?",
    options: {
      A: { text: "I tend to notice when someone might need support", trait: "compassion" },
      B: { text: "I stay steady in stressful situations", trait: "regulation" },
      C: { text: "I make sure responsibilities are completed correctly", trait: "reliability" },
      D: { text: "I often start conversations with people I don't know", trait: "social" },
    },
  },
  {
    id: 21,
    type: "most",
    prompt: "Which of these best describes your natural approach?",
    options: {
      A: { text: "Helping people feel supported", trait: "compassion" },
      B: { text: "Anticipating needs before they arise", trait: "proactivity" },
      C: { text: "Staying calm when situations become stressful", trait: "regulation" },
      D: { text: "Ensuring tasks are handled properly", trait: "reliability" },
    },
  },
  {
    id: 22,
    type: "most",
    prompt: "Which working style feels most like you?",
    options: {
      A: { text: "Paying attention to people's emotional needs", trait: "compassion" },
      B: { text: "Looking for ways to make things run smoothly", trait: "proactivity" },
      C: { text: "Remaining calm when situations feel tense", trait: "regulation" },
      D: { text: "Making sure responsibilities are completed", trait: "reliability" },
    },
  },
  {
    id: 23,
    type: "most",
    prompt: "Which statement feels most natural?",
    options: {
      A: { text: "I enjoy helping people feel welcome", trait: "compassion" },
      B: { text: "I often anticipate needs before they are expressed", trait: "proactivity" },
      C: { text: "I stay calm when others feel stressed", trait: "regulation" },
      D: { text: "I focus on making sure work is done correctly", trait: "reliability" },
    },
  },
  {
    id: 24,
    type: "most",
    prompt: "Which statement best describes you?",
    options: {
      A: { text: "I notice when someone might need help", trait: "compassion" },
      B: { text: "I try to make situations easier for others", trait: "proactivity" },
      C: { text: "I stay steady when things become stressful", trait: "regulation" },
      D: { text: "I ensure responsibilities are handled properly", trait: "reliability" },
    },
  },
];

const TRAIT_WEIGHTS = {
  compassion: 0.3,
  proactivity: 0.25,
  regulation: 0.2,
  social: 0.15,
  reliability: 0.1,
};

function scoreAssessment(answers: Record<number, string>) {
  const raw = { compassion: 0, proactivity: 0, regulation: 0, social: 0, reliability: 0 };
  const max = { compassion: 0, proactivity: 0, regulation: 0, social: 0, reliability: 0 };

  QUESTIONS.forEach((q) => {
    Object.values(q.options).forEach((opt) => {
      if (q.type === "most") max[opt.trait as keyof typeof max] += 2;
      if (q.type === "least") max[opt.trait as keyof typeof max] += 1;
    });

    const selected = answers[q.id];
    if (!selected) return;
    const trait = q.options[selected as keyof typeof q.options].trait as keyof typeof raw;
    raw[trait] += q.type === "least" ? -1 : 2;
  });

  const normalized = Object.fromEntries(
    Object.keys(raw).map((trait) => {
      const best = max[trait as keyof typeof max] || 1;
      const min =
        QUESTIONS.filter(
          (q) => Object.values(q.options).some((o) => o.trait === trait && q.type === "least")
        ).length * -1;
      const range = best - min || 1;
      const pct = Math.round(((raw[trait as keyof typeof raw] - min) / range) * 100);
      return [trait, Math.max(0, Math.min(100, pct))];
    })
  ) as Record<string, number>;

  const overall = Math.round(
    Object.entries(TRAIT_WEIGHTS).reduce((sum, [trait, weight]) => sum + normalized[trait] * weight, 0)
  );

  return { raw, normalized, overall };
}

function cardStyle(): React.CSSProperties {
  return {
    background: "#fff",
    borderRadius: 20,
    padding: 20,
    boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
    border: "1px solid #e5e7eb",
  };
}

function inputStyle(): React.CSSProperties {
  return {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid #d1d5db",
    fontSize: 14,
    boxSizing: "border-box",
  };
}

function buttonStyle(disabled = false): React.CSSProperties {
  return {
    borderRadius: 14,
    padding: "12px 18px",
    border: "none",
    background: disabled ? "#9ca3af" : "#111827",
    color: "#fff",
    cursor: disabled ? "not-allowed" : "pointer",
    fontWeight: 600,
  };
}

export default function Page() {
  const [candidate, setCandidate] = useState({ firstName: "", lastName: "", email: "" });
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const answeredCount = useMemo(() => Object.keys(answers).length, [answers]);
  const progress = Math.round((answeredCount / QUESTIONS.length) * 100);
  const canSubmit =
    candidate.firstName.trim() &&
    candidate.lastName.trim() &&
    candidate.email.trim() &&
    answeredCount === QUESTIONS.length;

  const handleAnswer = (questionId: number, optionKey: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionKey }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setSubmitting(true);

    try {
      const scoring = scoreAssessment(answers);

      const response = await fetch("/api/submit-assessment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          candidate,
          answers,
          scoring
        })
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      setSubmitted(true);
    } catch (error) {
      alert("There was an error submitting the assessment.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div style={{ minHeight: "100vh", padding: 24 }}>
        <div style={{ maxWidth: 720, margin: "40px auto" }}>
          <div style={{ ...cardStyle(), textAlign: "center" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
              <CheckCircle2 size={48} />
            </div>
            <h1 style={{ margin: 0, fontSize: 32 }}>Assessment submitted</h1>
            <p style={{ color: "#6b7280", marginTop: 12 }}>
              Thank you for completing the assessment. Your responses have been received.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", padding: 16 }}>
      <div style={{ maxWidth: 920, margin: "0 auto", display: "grid", gap: 20 }}>
        <div style={cardStyle()}>
          <h1 style={{ margin: 0, fontSize: 34 }}>Hospital Concierge Assessment</h1>
          <p style={{ color: "#6b7280", marginTop: 8 }}>
            Please answer each question based on what feels most natural to you. There are no visible results at the end.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 14,
              marginTop: 20,
            }}
          >
            <div>
              <label style={{ display: "block", marginBottom: 6, fontSize: 14 }}>First name</label>
              <input
                style={inputStyle()}
                value={candidate.firstName}
                onChange={(e) => setCandidate({ ...candidate, firstName: e.target.value })}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: 6, fontSize: 14 }}>Last name</label>
              <input
                style={inputStyle()}
                value={candidate.lastName}
                onChange={(e) => setCandidate({ ...candidate, lastName: e.target.value })}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: 6, fontSize: 14 }}>Email</label>
              <input
                type="email"
                style={inputStyle()}
                value={candidate.email}
                onChange={(e) => setCandidate({ ...candidate, email: e.target.value })}
              />
            </div>
          </div>

          <div style={{ marginTop: 20 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 14,
                color: "#6b7280",
                marginBottom: 8,
              }}
            >
              <span>Progress</span>
              <span>
                {answeredCount} / {QUESTIONS.length}
              </span>
            </div>
            <div
              style={{
                width: "100%",
                height: 10,
                background: "#e5e7eb",
                borderRadius: 999,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${progress}%`,
                  height: "100%",
                  background: "#111827",
                }}
              />
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 18 }}>
          {QUESTIONS.map((question) => (
            <div key={question.id} style={cardStyle()}>
              <div style={{ fontSize: 20, fontWeight: 700 }}>Question {question.id}</div>
              <div style={{ marginTop: 8, fontSize: 18 }}>{question.prompt}</div>

              <div style={{ display: "grid", gap: 10, marginTop: 16 }}>
                {Object.entries(question.options).map(([key, option]) => (
                  <label
                    key={key}
                    style={{
                      display: "block",
                      borderRadius: 16,
                      border: answers[question.id] === key ? "1px solid #111827" : "1px solid #e5e7eb",
                      padding: 16,
                      cursor: "pointer",
                      background: "#fff",
                    }}
                  >
                    <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={key}
                        checked={answers[question.id] === key}
                        onChange={() => handleAnswer(question.id, key)}
                        style={{ marginTop: 4 }}
                      />
                      <div style={{ fontSize: 15 }}>
                        <strong>{key}.</strong> {option.text}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          ))}

          <div
            style={{
              position: "sticky",
              bottom: 16,
            }}
          >
            <div style={{ ...cardStyle(), padding: 16 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 12,
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <div style={{ color: "#6b7280", fontSize: 14 }}>
                  Complete all questions to submit. Results are sent internally and are not shown after submission.
                </div>
                <button type="submit" disabled={!canSubmit || submitting} style={buttonStyle(!canSubmit || submitting)}>
                  {submitting ? "Submitting..." : "Submit Assessment"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

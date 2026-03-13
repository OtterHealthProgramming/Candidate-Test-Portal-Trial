"use client";

import React, { useEffect, useMemo, useState } from "react";
import { CheckCircle2 } from "lucide-react";

const QUESTIONS = [
  {
    id: 1,
    type: "most",
    traitBucket: "compassion",
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
    traitBucket: "proactivity",
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
    traitBucket: "compassion",
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
    traitBucket: "social",
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
    traitBucket: "regulation",
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
    traitBucket: "reliability",
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
    traitBucket: "reliability",
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
    traitBucket: "compassion",
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
    traitBucket: "proactivity",
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
    traitBucket: "social",
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
    traitBucket: "social",
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
    traitBucket: "social",
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
    traitBucket: "compassion",
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
    traitBucket: "proactivity",
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
    traitBucket: "social",
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
    traitBucket: "social",
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
    traitBucket: "regulation",
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
    traitBucket: "compassion",
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
    traitBucket: "proactivity",
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
    traitBucket: "compassion",
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
    traitBucket: "proactivity",
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
    traitBucket: "reliability",
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
    traitBucket: "compassion",
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
    traitBucket: "reliability",
    prompt: "Which statement best describes you?",
    options: {
      A: { text: "I notice when someone might need help", trait: "compassion" },
      B: { text: "I try to make situations easier for others", trait: "proactivity" },
      C: { text: "I stay steady when things become stressful", trait: "regulation" },
      D: { text: "I ensure responsibilities are handled properly", trait: "reliability" },
    },
  },
  {
    id: 25,
    type: "most",
    traitBucket: "compassion",
    prompt: "Which statement feels most natural when someone seems overwhelmed?",
    options: {
      A: { text: "I notice the emotional shift quickly", trait: "compassion" },
      B: { text: "I focus on what needs to happen next", trait: "reliability" },
      C: { text: "I try to help before they ask", trait: "proactivity" },
      D: { text: "I stay calm so I can be useful", trait: "regulation" },
    },
  },
  {
    id: 26,
    type: "most",
    traitBucket: "proactivity",
    prompt: "Which statement feels most like your service style?",
    options: {
      A: { text: "I like to think one step ahead", trait: "proactivity" },
      B: { text: "I focus on making people feel at ease", trait: "compassion" },
      C: { text: "I stay composed under pressure", trait: "regulation" },
      D: { text: "I make sure details are not missed", trait: "reliability" },
    },
  },
  {
    id: 27,
    type: "most",
    traitBucket: "regulation",
    prompt: "When multiple things need attention at once, what feels most natural?",
    options: {
      A: { text: "I keep my tone calm and measured", trait: "regulation" },
      B: { text: "I look for who needs support first", trait: "compassion" },
      C: { text: "I prioritize tasks quickly", trait: "reliability" },
      D: { text: "I move before being asked", trait: "proactivity" },
    },
  },
  {
    id: 28,
    type: "most",
    traitBucket: "social",
    prompt: "Which statement best fits how you interact in new settings?",
    options: {
      A: { text: "I usually break the ice first", trait: "social" },
      B: { text: "I read the room before I act", trait: "compassion" },
      C: { text: "I look for practical ways to help", trait: "proactivity" },
      D: { text: "I try to understand expectations fast", trait: "reliability" },
    },
  },
  {
    id: 29,
    type: "most",
    traitBucket: "reliability",
    prompt: "Which statement feels most natural when a task is assigned?",
    options: {
      A: { text: "I like to make sure it is done correctly", trait: "reliability" },
      B: { text: "I think about what might be needed next", trait: "proactivity" },
      C: { text: "I consider how it affects others", trait: "compassion" },
      D: { text: "I stay steady even if it is urgent", trait: "regulation" },
    },
  },
  {
    id: 30,
    type: "most",
    traitBucket: "compassion",
    prompt: "Which statement feels most like you when helping others?",
    options: {
      A: { text: "I want people to feel supported", trait: "compassion" },
      B: { text: "I like keeping things moving smoothly", trait: "proactivity" },
      C: { text: "I stay calm in tense moments", trait: "regulation" },
      D: { text: "I focus on following through", trait: "reliability" },
    },
  },
  {
    id: 31,
    type: "most",
    traitBucket: "proactivity",
    prompt: "Which statement best describes how you notice work around you?",
    options: {
      A: { text: "I can usually spot what needs attention quickly", trait: "proactivity" },
      B: { text: "I pick up on emotional cues first", trait: "compassion" },
      C: { text: "I like clear steps and follow-through", trait: "reliability" },
      D: { text: "I stay even-keeled when things shift", trait: "regulation" },
    },
  },
  {
    id: 32,
    type: "most",
    traitBucket: "regulation",
    prompt: "When someone is upset, what feels most natural?",
    options: {
      A: { text: "I try to be a calming presence", trait: "regulation" },
      B: { text: "I think about what action would help", trait: "proactivity" },
      C: { text: "I focus on making them feel cared for", trait: "compassion" },
      D: { text: "I make sure the issue gets handled", trait: "reliability" },
    },
  },
  {
    id: 33,
    type: "most",
    traitBucket: "social",
    prompt: "Which statement feels most like you in a people-facing role?",
    options: {
      A: { text: "I enjoy greeting and engaging with others", trait: "social" },
      B: { text: "I focus on making them feel comfortable", trait: "compassion" },
      C: { text: "I think ahead about what they may need", trait: "proactivity" },
      D: { text: "I stay steady even when it gets busy", trait: "regulation" },
    },
  },
  {
    id: 34,
    type: "most",
    traitBucket: "reliability",
    prompt: "Which statement feels most natural in structured work?",
    options: {
      A: { text: "I like knowing responsibilities are covered", trait: "reliability" },
      B: { text: "I still look for ways to go beyond them", trait: "proactivity" },
      C: { text: "I think about who may need extra support", trait: "compassion" },
      D: { text: "I stay calm even when plans change", trait: "regulation" },
    },
  },
  {
    id: 35,
    type: "least",
    traitBucket: "compassion",
    prompt: "Which statement feels LEAST natural for you?",
    options: {
      A: { text: "I usually notice when someone is having a hard moment", trait: "compassion" },
      B: { text: "I like stepping in before I am asked", trait: "proactivity" },
      C: { text: "I stay level-headed when people are tense", trait: "regulation" },
      D: { text: "I like making sure things are done right", trait: "reliability" },
    },
  },
  {
    id: 36,
    type: "least",
    traitBucket: "proactivity",
    prompt: "Which statement feels LEAST like you?",
    options: {
      A: { text: "I naturally think ahead to what comes next", trait: "proactivity" },
      B: { text: "I care about how others are feeling", trait: "compassion" },
      C: { text: "I can stay calm under pressure", trait: "regulation" },
      D: { text: "I pay attention to details", trait: "reliability" },
    },
  },
  {
    id: 37,
    type: "most",
    traitBucket: "compassion",
    prompt: "Which statement feels most natural in difficult moments?",
    options: {
      A: { text: "I focus on helping people feel seen", trait: "compassion" },
      B: { text: "I focus on staying composed", trait: "regulation" },
      C: { text: "I focus on what should happen next", trait: "proactivity" },
      D: { text: "I focus on doing things correctly", trait: "reliability" },
    },
  },
  {
    id: 38,
    type: "most",
    traitBucket: "social",
    prompt: "Which statement best describes your presence with others?",
    options: {
      A: { text: "I help people feel welcome quickly", trait: "social" },
      B: { text: "I read emotional tone well", trait: "compassion" },
      C: { text: "I anticipate what may be needed", trait: "proactivity" },
      D: { text: "I stay dependable and steady", trait: "reliability" },
    },
  },
  {
    id: 39,
    type: "most",
    traitBucket: "regulation",
    prompt: "Which statement feels most like your work style when stress rises?",
    options: {
      A: { text: "I become more focused and calm", trait: "regulation" },
      B: { text: "I think about who needs help most", trait: "compassion" },
      C: { text: "I take initiative without waiting", trait: "proactivity" },
      D: { text: "I make sure nothing is dropped", trait: "reliability" },
    },
  },
  {
    id: 40,
    type: "most",
    traitBucket: "reliability",
    prompt: "Which statement feels most natural when you are supporting a team?",
    options: {
      A: { text: "I make sure commitments are followed through", trait: "reliability" },
      B: { text: "I look for where help will matter most", trait: "proactivity" },
      C: { text: "I pay attention to how people are holding up", trait: "compassion" },
      D: { text: "I keep a calm tone and pace", trait: "regulation" },
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

const QUESTION_PLAN: Record<string, number> = {
  compassion: 6,
  proactivity: 6,
  regulation: 5,
  social: 4,
  reliability: 3,
};

function seededShuffle<T>(arr: T[], seedString: string) {
  const result = [...arr];
  let seed = 0;
  for (let i = 0; i < seedString.length; i += 1) {
    seed = (seed * 31 + seedString.charCodeAt(i)) >>> 0;
  }

  const random = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

function buildQuestionSet(seed: string) {
  const chosen: typeof QUESTIONS = [];

  Object.entries(QUESTION_PLAN).forEach(([bucket, count]) => {
    const pool = QUESTIONS.filter((q) => q.traitBucket === bucket);
    chosen.push(...seededShuffle(pool, `${seed}-${bucket}`).slice(0, count));
  });

  return seededShuffle(chosen, `${seed}-final`).slice(0, 24);
}

function scoreAssessment(questionSet: typeof QUESTIONS, answers: Record<number, string>) {
  const raw = { compassion: 0, proactivity: 0, regulation: 0, social: 0, reliability: 0 };
  const max = { compassion: 0, proactivity: 0, regulation: 0, social: 0, reliability: 0 };

  questionSet.forEach((q) => {
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
        questionSet.filter(
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
    background: "#ffffff",
    borderRadius: 20,
    padding: 24,
    boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
    border: "1px solid rgba(0,0,0,0.05)",
  };
}

function inputStyle(): React.CSSProperties {
  return {
    width: "100%",
    padding: "12px 14px",
    borderRadius: 14,
    border: "1px solid #d1d5db",
    fontSize: 14,
    boxSizing: "border-box",
    background: "#ffffff",
  };
}

function buttonStyle(disabled = false, secondary = false): React.CSSProperties {
  return {
    borderRadius: 14,
    padding: "12px 18px",
    border: secondary ? "1px solid rgba(17,24,39,0.12)" : "none",
    background: disabled ? "#94a3b8" : secondary ? "#ffffff" : "#111827",
    color: secondary ? "#111827" : "#ffffff",
    cursor: disabled ? "not-allowed" : "pointer",
    fontWeight: 700,
    letterSpacing: 0.2,
  };
}

function getTokenFromUrl() {
  if (typeof window === "undefined") return "demo-token";
  const params = new URLSearchParams(window.location.search);
  return params.get("token") || "demo-token";
}

async function markAssessmentStarted(token: string) {
  if (!token || token === "demo-token") return;

  try {
    await fetch("/api/assessment-started", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });
  } catch (error) {
    console.error("Failed to mark assessment as started");
  }
}

export default function HospitalConciergeAssessmentForm() {
  const [candidate, setCandidate] = useState({ firstName: "", lastName: "", email: "" });
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [started, setStarted] = useState(false);
  const [error, setError] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [token, setToken] = useState("demo-token");

  useEffect(() => {
    setToken(getTokenFromUrl());
  }, []);

  const questionSet = useMemo(() => buildQuestionSet(token), [token]);
  const currentQuestion = questionSet[currentIndex];
  const answeredCount = useMemo(() => Object.keys(answers).length, [answers]);
  const progress = started
    ? Math.round(((currentIndex + (submitted ? 1 : 0)) / questionSet.length) * 100)
    : 0;
  const canBegin =
    candidate.firstName.trim() &&
    candidate.lastName.trim() &&
    candidate.email.trim();
  const hasSelectedCurrent = currentQuestion ? Boolean(answers[currentQuestion.id]) : false;
  const isLastQuestion = currentIndex === questionSet.length - 1;

  const handleAnswer = (questionId: number, optionKey: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionKey }));
  };

  const handleNext = () => {
    if (!hasSelectedCurrent) return;
    if (!isLastQuestion) setCurrentIndex((prev) => prev + 1);
  };

  const handleSubmit = async () => {
    if (!isLastQuestion || !hasSelectedCurrent) return;
    setSubmitting(true);
    setError("");

    try {
      const scoring = scoreAssessment(questionSet, answers);

      const response = await fetch("/api/submit-assessment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          candidate,
          answers,
          scoring,
          token,
          questionIds: questionSet.map((q) => q.id),
        }),
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      setSubmitted(true);
    } catch (submissionError) {
      setError("There was an error submitting the assessment.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div style={{ minHeight: "100vh", padding: 24, background: "#ffffff" }}>
        <div style={{ maxWidth: 720, margin: "40px auto" }}>
          <div style={{ ...cardStyle(), textAlign: "center" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
              <CheckCircle2 size={48} />
            </div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: 1.2,
                color: "#7c3aed",
                textTransform: "uppercase",
              }}
            >
              OtterBase x Helen
            </div>
            <h1 style={{ margin: "10px 0 0", fontSize: 32 }}>Assessment submitted</h1>
            <p style={{ color: "#6b7280", marginTop: 12 }}>
              Thank you for completing the assessment. Your responses have been received.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", padding: 16, background: "#ffffff" }}>
      <div style={{ maxWidth: 920, margin: "0 auto", display: "grid", gap: 20 }}>
        <div style={{ ...cardStyle(), color: "#111827" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 12,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: 1.2,
                  color: "#7c3aed",
                  textTransform: "uppercase",
                }}
              >
                OtterBase x Helen
              </div>
              <h1 style={{ margin: "8px 0 0", fontSize: 34 }}>Hospital Concierge Assessment</h1>
              <p style={{ color: "#6b7280", marginTop: 8 }}>
                A structured service aptitude assessment for hospitality-focused patient experience
                roles.
              </p>
            </div>
            <div style={{ minWidth: 160, textAlign: "right" }}>
              <div
                style={{
                  fontSize: 12,
                  color: "#6b7280",
                  textTransform: "uppercase",
                  letterSpacing: 1,
                }}
              >
                Assessment ID
              </div>
              <div style={{ fontSize: 14, fontWeight: 700 }}>{token}</div>
            </div>
          </div>

          {!started ? (
            <div style={{ marginTop: 24, display: "grid", gap: 18 }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: 14,
                }}
              >
                <div>
                  <label style={{ display: "block", marginBottom: 6, fontSize: 14 }}>
                    First name
                  </label>
                  <input
                    style={inputStyle()}
                    value={candidate.firstName}
                    onChange={(e) => setCandidate({ ...candidate, firstName: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ display: "block", marginBottom: 6, fontSize: 14 }}>
                    Last name
                  </label>
                  <input
                    style={inputStyle()}
                    value={candidate.lastName}
                    onChange={(e) => setCandidate({ ...candidate, lastName: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ display: "block", marginBottom: 6, fontSize: 14 }}>
                    Email
                  </label>
                  <input
                    type="email"
                    style={inputStyle()}
                    value={candidate.email}
                    onChange={(e) => setCandidate({ ...candidate, email: e.target.value })}
                  />
                </div>
              </div>

              <div
                style={{
                  background: "rgba(17,24,39,0.04)",
                  borderRadius: 18,
                  padding: 18,
                }}
              >
                <div style={{ fontWeight: 700, marginBottom: 8 }}>Before you begin</div>
                <div style={{ color: "#4b5563", fontSize: 14, lineHeight: 1.55 }}>
                  You will answer 24 multiple-choice questions. Each question appears on its own
                  page. Once you move forward, you will not be able to go back.
                </div>
              </div>

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
                  Questions are randomized for each candidate link.
                </div>
                <button
                  style={buttonStyle(!canBegin)}
                  disabled={!canBegin}
                  onClick={async () => {
                    await markAssessmentStarted(token);
                    setStarted(true);
                  }}
                >
                  Begin Test
                </button>
              </div>
            </div>
          ) : (
            <>
              <div style={{ marginTop: 22 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 14,
                    color: "#6b7280",
                    marginBottom: 8,
                  }}
                >
                  <span>
                    Question {currentIndex + 1} of {questionSet.length}
                  </span>
                  <span>{answeredCount} answered</span>
                </div>
                <div
                  style={{
                    width: "100%",
                    height: 12,
                    background: "#e5e7eb",
                    borderRadius: 999,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${progress}%`,
                      height: "100%",
                      background: "#7c3aed",
                    }}
                  />
                </div>
              </div>

              {currentQuestion ? (
                <div style={{ marginTop: 22, display: "grid", gap: 18 }}>
                  <div>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: "#7c3aed",
                        textTransform: "uppercase",
                        letterSpacing: 1,
                      }}
                    >
                      Current Question
                    </div>
                    <div
                      style={{
                        marginTop: 10,
                        fontSize: 28,
                        fontWeight: 700,
                        lineHeight: 1.2,
                      }}
                    >
                      {currentQuestion.prompt}
                    </div>
                  </div>

                  <div style={{ display: "grid", gap: 12 }}>
                    {Object.entries(currentQuestion.options).map(([key, option]) => (
                      <label
                        key={key}
                        style={{
                          display: "block",
                          borderRadius: 18,
                          border:
                            answers[currentQuestion.id] === key
                              ? "2px solid #7c3aed"
                              : "1px solid #e5e7eb",
                          padding: 18,
                          cursor: "pointer",
                          background:
                            answers[currentQuestion.id] === key
                              ? "rgba(124,58,237,0.08)"
                              : "#fff",
                        }}
                      >
                        <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                          <input
                            type="radio"
                            name={`question-${currentQuestion.id}`}
                            value={key}
                            checked={answers[currentQuestion.id] === key}
                            onChange={() => handleAnswer(currentQuestion.id, key)}
                            style={{ marginTop: 4 }}
                          />
                          <div style={{ fontSize: 16, lineHeight: 1.45 }}>
                            <strong>{key}.</strong> {option.text}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>

                  {error ? <div style={{ color: "#dc2626", fontSize: 14 }}>{error}</div> : null}

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
                      There is no back button on purpose to preserve assessment integrity.
                    </div>
                    {isLastQuestion ? (
                      <button
                        style={buttonStyle(!hasSelectedCurrent || submitting)}
                        disabled={!hasSelectedCurrent || submitting}
                        onClick={handleSubmit}
                      >
                        {submitting ? "Submitting..." : "Submit Assessment"}
                      </button>
                    ) : (
                      <button
                        style={buttonStyle(!hasSelectedCurrent)}
                        disabled={!hasSelectedCurrent}
                        onClick={handleNext}
                      >
                        Next Question
                      </button>
                    )}
                  </div>
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

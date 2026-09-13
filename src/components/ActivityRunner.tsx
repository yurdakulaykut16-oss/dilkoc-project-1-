import { useState } from "react";
import type { Activity, AnswerEvaluation, FlashcardMode } from "../engine/types";
import { submitFlashcardAnswer } from "../db/flashcardRepo";
import { submitGrammarAnswer, getGrammarContent } from "../db/grammarRepo";
import { getReadingPassage, submitReadingAnswer, submitWritingAnswer, getWritingPrompts } from "../db/readingWritingRepo";
import type { VocabItem } from "../engine/types";

interface Props {
  activity: Activity;
  vocabItem?: VocabItem; // required if this activity carries a vocabItemId
  onGraded?: (evaluation: AnswerEvaluation) => void;
}

/** Generic runner: works for any flashcard, grammar, reading, or writing
 *  activity by reading its `data` payload. New activity types just need a
 *  branch here, not a new engine. */
export default function ActivityRunner({ activity, vocabItem, onGraded }: Props) {
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState<AnswerEvaluation | null>(null);

  const options = (activity.data.options as string[] | undefined) ?? undefined;
  const passageText = activity.data.passageText as string | undefined;

  async function handleSubmit() {
    let evaluation: AnswerEvaluation;
    const topicId = activity.data.topicId as string;

    if (activity.relatedVocabId && vocabItem) {
      const mode = activity.data.mode as FlashcardMode;
      const res = await submitFlashcardAnswer({ vocabItem, mode, userAnswer: answer });
      evaluation = res.evaluation;
    } else if (activity.data.exerciseId) {
      const content = getGrammarContent(activity.languageCode, topicId);
      const exercise = content?.exercises.find((e) => e.id === activity.data.exerciseId);
      if (!exercise) return;
      const res = await submitGrammarAnswer(exercise, answer);
      evaluation = res.evaluation;
    } else if (activity.data.questionId) {
      const passage = getReadingPassage(activity.languageCode, topicId);
      const question = passage?.questions.find((q) => q.id === activity.data.questionId);
      if (!question) return;
      const res = await submitReadingAnswer(activity.languageCode, topicId, question, answer);
      evaluation = res.evaluation;
    } else if (activity.data.promptId) {
      const prompts = getWritingPrompts(activity.languageCode, topicId);
      const writingPrompt = prompts.find((p) => p.id === activity.data.promptId);
      if (!writingPrompt) return;
      const res = await submitWritingAnswer(activity.languageCode, topicId, writingPrompt, answer);
      evaluation = res.evaluation;
    } else {
      return;
    }

    setResult(evaluation);
    onGraded?.(evaluation);
  }

  return (
    <div style={{ border: "1px solid #ddd", borderRadius: 8, padding: 12, marginBottom: 8 }}>
      {passageText && <p style={{ fontStyle: "italic" }}>{passageText}</p>}
      <p>{activity.prompt}</p>
      {options ? (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {options.map((opt) => (
            <button key={opt} onClick={() => setAnswer(opt)} style={{ fontWeight: answer === opt ? "bold" : "normal" }}>
              {opt}
            </button>
          ))}
        </div>
      ) : (
        <textarea value={answer} onChange={(e) => setAnswer(e.target.value)} style={{ width: "100%" }} rows={activity.type === "writing_placeholder" ? 4 : 1} />
      )}
      <button onClick={handleSubmit} style={{ marginTop: 8 }}>
        Gönder
      </button>
      {result && <p>{result.correct ? "✅" : "❌"} {result.feedback}</p>}
    </div>
  );
}

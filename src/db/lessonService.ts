import type { LanguageCode, Lesson } from "../engine/types";
import { generateLesson, type LessonOptions } from "../engine/lessonEngine";
import { getOrCreateProfile } from "./profileRepo";
import { getDueVocab, getNewVocabCandidates } from "./vocabRepo";
import { getRecentMistakes } from "./mistakesRepo";
import { getSkillScores } from "./skillScoreRepo";
import { getCurriculumView } from "./curriculumRepo";

/** Assembles today's lesson for a language from profile, curriculum, SRS, and mistake data. */
export async function generateDailyLesson(languageCode: LanguageCode, options?: LessonOptions): Promise<Lesson> {
  const profile = await getOrCreateProfile(languageCode);

  const [dueVocab, newVocabCandidates, recentMistakes, skillScores, curriculumView] = await Promise.all([
    getDueVocab(languageCode),
    getNewVocabCandidates(languageCode),
    getRecentMistakes(languageCode),
    getSkillScores(languageCode),
    getCurriculumView(languageCode, profile.cefrLevel),
  ]);

  return generateLesson(
    { languageCode, profile, skillScores, dueVocab, newVocabCandidates, recentMistakes, curriculumView },
    options
  );
}

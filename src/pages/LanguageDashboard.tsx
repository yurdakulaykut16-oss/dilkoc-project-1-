import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { CurriculumTopicView, Lesson, LanguageCode, LearnerProfile } from "../engine/types";
import { getOrCreateProfile } from "../db/profileRepo";
import { completeTopic, getCurriculumView } from "../db/curriculumRepo";
import { generateDailyLesson } from "../db/lessonService";

const STATUS_LABELS: Record<string, string> = {
  locked: "Kilitli",
  available: "Başlanabilir",
  in_progress: "Devam ediyor",
  completed: "Tamamlandı",
};

export default function LanguageDashboard() {
  const { lang } = useParams<{ lang: LanguageCode }>();
  const [profile, setProfile] = useState<LearnerProfile | null>(null);
  const [topics, setTopics] = useState<CurriculumTopicView[]>([]);
  const [lesson, setLesson] = useState<Lesson | null>(null);

  async function load(l: LanguageCode) {
    const p = await getOrCreateProfile(l);
    setProfile(p);
    setTopics(await getCurriculumView(l, p.cefrLevel));
  }

  useEffect(() => {
    if (lang) load(lang);
  }, [lang]);

  async function handleComplete(topicId: string) {
    if (!lang) return;
    await completeTopic(lang, topicId, 100);
    await load(lang);
  }

  async function handleGenerateLesson() {
    if (!lang) return;
    setLesson(await generateDailyLesson(lang));
  }

  return (
    <div style={{ fontFamily: "system-ui", padding: 24 }}>
      <Link to="/">← Dil seçimi</Link>
      <h1>{lang?.toUpperCase()} ilerlemesi</h1>
      {profile ? (
        <>
          <ul>
            <li>Seviye: {profile.cefrLevel}</li>
            <li>Puan: {profile.cefrScore}</li>
            <li>Seri: {profile.streak} gün</li>
          </ul>

          <h2>Bugünün Dersi</h2>
          <button onClick={handleGenerateLesson}>Ders oluştur</button>
          {lesson && (
            <div style={{ marginTop: 12 }}>
              <p>
                Zorluk: {lesson.estimatedDifficulty} · Süre: ~{lesson.expectedDurationMinutes} dk · Hedef beceriler:{" "}
                {lesson.targetSkills.join(", ")}
              </p>
              <ol>
                {lesson.activities.map((a) => (
                  <li key={a.activity.id}>
                    [{a.activity.type}] {a.activity.prompt}
                    <br />
                    <small>Neden: {a.reason}</small>
                  </li>
                ))}
              </ol>
            </div>
          )}

          <h2>{profile.cefrLevel} Müfredatı</h2>
          <ul>
            {topics.map(({ topic, status, masteryScore }) => (
              <li key={topic.id}>
                [{topic.skillId}] {topic.title} — {STATUS_LABELS[status]}
                {status === "completed" && ` (${masteryScore})`}
                {status === "available" && (
                  <button style={{ marginLeft: 8 }} onClick={() => handleComplete(topic.id)}>
                    Tamamlandı işaretle
                  </button>
                )}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>Yükleniyor...</p>
      )}
    </div>
  );
}

/**
 * CEVAP YAZIM MOTORU
 *
 * Ajanın verdiği her cevabı tutarlı, okunabilir ve "öğretici" bir iskelete oturtur.
 * Amaç: tek paragraflık kuru bilgi yerine, öğrencinin gerçekten kullanabileceği
 * katmanlı bir yanıt üretmek:
 *
 *   ⚡ KISA CEVAP      → iki cümlede net karşılık (soruyu ilk satırda kapatır)
 *   📘 AÇIKLAMA        → kuralın neden böyle olduğunu anlatır
 *   📊 TABLO           → çekim/karşılaştırma tablosu (varsa)
 *   🧩 ÖRNEKLER        → hedef dil + Türkçe karşılığı
 *   ⚠️ TUZAK           → Türk öğrencinin tam burada yaptığı hata
 *   🎯 MİNİ ALIŞTIRMA  → cevabı pekiştiren tek soru
 *   🔗 BAĞLANTI        → müfredattaki ilgili ünite / sonraki adım
 */

export interface AnswerSection {
  icon: string;
  title: string;
  body: string;
}

export interface ComposedAnswer {
  text: string;
  sections: AnswerSection[];
}

export interface ComposeInput {
  /** Tek cümlelik doğrudan karşılık. Her zaman en üstte görünür. */
  headline: string;
  /** Kuralın mantığı, "neden böyle" kısmı. */
  explanation?: string | string[];
  /** Hazır biçimlendirilmiş tablo satırları. */
  table?: string[];
  /** Örnek cümleler: hedef dil + Türkçe. */
  examples?: Array<{ target: string; tr: string; note?: string }>;
  /** Türk öğrencinin bu konuda yaptığı tipik hata. */
  pitfall?: string | string[];
  /** Pekiştirme sorusu. */
  practice?: string;
  /** Müfredat bağlantısı / sonraki adım. */
  nextStep?: string;
  /** Ek notlar (morfoloji motorundan gelen kurallar gibi). */
  notes?: string[];
}

function toLines(value: string | string[] | undefined): string[] {
  if (!value) return [];
  return (Array.isArray(value) ? value : [value]).map(line => line.trim()).filter(Boolean);
}

export function compose(input: ComposeInput): ComposedAnswer {
  const sections: AnswerSection[] = [];

  sections.push({ icon: '⚡', title: 'KISA CEVAP', body: input.headline.trim() });

  const explanation = toLines(input.explanation);
  if (explanation.length > 0) {
    sections.push({ icon: '📘', title: 'NEDEN BÖYLE', body: explanation.join('\n') });
  }

  if (input.table && input.table.length > 0) {
    sections.push({ icon: '📊', title: 'TABLO', body: input.table.join('\n') });
  }

  if (input.examples && input.examples.length > 0) {
    const body = input.examples
      .map(example => `• «${example.target}»\n   → ${example.tr}${example.note ? `\n   ↳ ${example.note}` : ''}`)
      .join('\n');
    sections.push({ icon: '🧩', title: 'ÖRNEKLER', body });
  }

  const notes = toLines(input.notes);
  if (notes.length > 0) {
    sections.push({ icon: '🔍', title: 'İNCE AYAR', body: notes.map(note => `• ${note}`).join('\n') });
  }

  const pitfall = toLines(input.pitfall);
  if (pitfall.length > 0) {
    sections.push({ icon: '⚠️', title: 'TÜRK ÖĞRENCİ TUZAĞI', body: pitfall.map(line => `• ${line}`).join('\n') });
  }

  if (input.practice) {
    sections.push({ icon: '🎯', title: 'MİNİ ALIŞTIRMA', body: input.practice.trim() });
  }

  if (input.nextStep) {
    sections.push({ icon: '🔗', title: 'SIRADAKİ ADIM', body: input.nextStep.trim() });
  }

  const text = sections
    .map(section => `${section.icon} ${section.title}\n${section.body}`)
    .join('\n\n');

  return { text, sections };
}

/** Sabit genişlikli, hizalı bir tablo satırı üretir (monospace olmayan ekranda da okunur). */
export function tableRow(label: string, value: string, width = 22): string {
  const padded = label.length >= width ? label : label + ' '.repeat(width - label.length);
  return `${padded}${value}`;
}

/** Bir çekim tablosunu "Hâl | tekil | çoğul" biçiminde satırlara döker. */
export function caseTable(
  rows: Array<{ label: string; question: string; singular: string; plural: string }>,
): string[] {
  const out: string[] = ['Hâl (soru)            TEKİL → ÇOĞUL'];
  for (const row of rows) {
    out.push(`${row.label} (${row.question})`);
    out.push(`   ${row.singular}  →  ${row.plural}`);
  }
  return out;
}

/** Kısa, tek satırlık karşılaştırma tablosu. */
export function compareTable(
  left: { title: string; points: string[] },
  right: { title: string; points: string[] },
): string[] {
  const out: string[] = [];
  out.push(`▸ ${left.title}`);
  for (const point of left.points) out.push(`   • ${point}`);
  out.push('');
  out.push(`▸ ${right.title}`);
  for (const point of right.points) out.push(`   • ${point}`);
  return out;
}

/**
 * Soru metninden, kullanıcının devamında sorabileceği akıllı takip sorularını üretir.
 * Bunlar arayüzde tıklanabilir çip olarak gösterilir.
 */
export function buildFollowUps(seed: {
  word?: string;
  topic?: string;
  isVerb?: boolean;
  isNoun?: boolean;
  isEnglishMode?: boolean;
}): string[] {
  const out: string[] = [];
  const lang = seed.isEnglishMode ? 'İngilizce' : 'Rusça';
  if (seed.word) {
    if (seed.isNoun && !seed.isEnglishMode) out.push(`«${seed.word}» kelimesinin hâllerini tablo hâlinde göster`);
    if (seed.isVerb && !seed.isEnglishMode) out.push(`«${seed.word}» fiilini çekimle`);
    out.push(`«${seed.word}» ile 3 örnek cümle kur`);
    out.push(`«${seed.word}» nasıl okunur?`);
  }
  if (seed.topic) {
    out.push(`${seed.topic} konusunu örneklerle anlat`);
    out.push(`${seed.topic} konusunda en sık yapılan hata nedir?`);
  }
  if (out.length === 0) {
    out.push(`${lang}da en sık yapılan 5 hata nedir?`);
    out.push('Nerede kaldım?');
    out.push('Bugün ne çalışmalıyım?');
  }
  return [...new Set(out)].slice(0, 4);
}

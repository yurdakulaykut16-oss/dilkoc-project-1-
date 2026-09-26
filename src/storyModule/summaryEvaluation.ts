// ============================================================================
// ÖZET ANALİZ MOTORU (offline "yapay zeka" değerlendirmesi)
// ----------------------------------------------------------------------------
// Kullanıcının Türkçe özetini, hikayenin önceden tanımlı ana fikirleriyle
// (keyPoints) karşılaştırır. Her ana fikir bileşenlerden oluşur: bileşenin
// eş anlamlı kelimelerinden en az biri özette geçiyorsa o bileşen "yakalanmış"
// sayılır; TÜM bileşenler yakalanmışsa ana fikir doğru noktadır.
//
// Türkçe'nin eklemeli yapısı nedeniyle eşleştirme "kök içerir" mantığıyla
// çalışır: "çiçekleri" → "çiçek", "restorandaydı" → "restoran".
// Ek olarak harekesiz klavye toleransı için diakritik-folded (ş→s, ğ→g...)
// ikinci bir geçiş yapılır.
// ============================================================================

import type { CheckpointStory, SummaryEvaluation } from './types';

// ---------------------------------------------------------------------------
// Metin normalizasyonu
// ---------------------------------------------------------------------------

/** Kesme işaretlerini kaldırır ("Marina'nın" -> "Marinanın"), noktalamayı temizler. */
function normalize(raw: string): string {
  return raw
    .replace(/['’`´‘]/g, '')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Türkçe duyarlı küçük harf (İ→i, I→ı). */
function lowerTr(s: string): string {
  return s.toLocaleLowerCase('tr-TR');
}

const FOLD_MAP: Record<string, string> = {
  ı: 'i', i: 'i', ş: 's', ğ: 'g', ü: 'u', ö: 'o', ç: 'c', â: 'a', î: 'i', û: 'u',
};

/** Diakritikleri katlar (harekesiz yazım toleransı): "gözyaşı" -> "gozyasi". */
function fold(s: string): string {
  return s.replace(/[ışğüöçâîû]/g, (c) => FOLD_MAP[c] ?? c);
}

/** Hazırlık: hem orijinal hem katlanmış metin + token listesi döndürür. */
function prepare(raw: string): { text: string; folded: string; tokens: string[]; foldedTokens: string[] } {
  const text = lowerTr(normalize(raw));
  const folded = fold(text);
  const tokens = text.split(' ').filter(Boolean);
  const foldedTokens = folded.split(' ').filter(Boolean);
  return { text, folded, tokens, foldedTokens };
}

// ---------------------------------------------------------------------------
// Anahtar kelime eşleştirme
// ---------------------------------------------------------------------------

/**
 * Kısa anahtar kelimelerde (≤3 harf) yanlış pozitifleri önlemek için token
 * düzeyinde eşleşme, uzun kelimelerde ise "içerir" eşleşmesi yapılır.
 */
function keywordMatches(prep: { text: string; folded: string; tokens: string[]; foldedTokens: string[] }, kwRaw: string): boolean {
  const kw = lowerTr(kwRaw.trim());
  if (!kw) return false;
  const kwFolded = fold(kw);

  // Çok kelimeli kalıplar: "akşam yemeği", "dima aradı" gibi.
  if (kw.includes(' ')) return prep.text.includes(kw) || prep.folded.includes(kwFolded);

  if (kw.length >= 5) {
    // Uzun kökler için içerir eşleşmesi yeterince güvenlidir.
    if (prep.text.includes(kw) || prep.folded.includes(kwFolded)) return true;
    return prep.tokens.some((t) => t.startsWith(kw)) || prep.foldedTokens.some((t) => t.startsWith(kwFolded));
  }

  // Kısa kökler ("ev", "aşk", "iş"): tam token veya makul ek eklenmiş hali.
  return (
    prep.tokens.some((t) => t === kw || (t.length > kw.length && t.startsWith(kw) && t.length - kw.length <= 4)) ||
    prep.foldedTokens.some((t) => t === kwFolded || (t.length > kwFolded.length && t.startsWith(kwFolded) && t.length - kwFolded.length <= 4))
  );
}

function groupCovered(prep: ReturnType<typeof prepare>, group: string[]): boolean {
  return group.some((kw) => keywordMatches(prep, kw));
}

// ---------------------------------------------------------------------------
// Ana değerlendirme
// ---------------------------------------------------------------------------

const MIN_WORDS = 10;

export function evaluateTurkishSummary(story: CheckpointStory, summaryRaw: string): SummaryEvaluation {
  const prep = prepare(summaryRaw);
  const wordCount = prep.tokens.filter((t) => /\p{L}/u.test(t)).length;

  // Dil kontrolü: harflerin %40'ından fazlası Kiril ise özet Türkçe değildir.
  const letters = summaryRaw.replace(/[^\p{L}]/gu, '');
  const cyr = (summaryRaw.match(/[\u0400-\u04FF]/g) || []).length;
  const wrongLanguage = letters.length > 0 && cyr / letters.length > 0.4;

  const matched: { id: string; textTr: string }[] = [];
  const missing: { id: string; hintTr: string }[] = [];

  if (!wrongLanguage) {
    for (const kp of story.keyPoints) {
      // Tüm bileşen grupları örtüşüyorsa ana fikir yakalanmıştır.
      if (kp.keywordGroups.length === 0 || kp.keywordGroups.every((g) => groupCovered(prep, g))) {
        matched.push({ id: kp.id, textTr: kp.textTr });
      } else {
        missing.push({ id: kp.id, hintTr: kp.hintTr });
      }
    }
  } else {
    story.keyPoints.forEach((kp) => missing.push({ id: kp.id, hintTr: kp.hintTr }));
  }

  // Yanlış anlama dedektörü: hikayeyle çelişen kalıplar.
  const misunderstood: { noteTr: string }[] = [];
  if (!wrongLanguage) {
    for (const m of story.misleading) {
      if (m.tokens.some((t) => keywordMatches(prep, t))) misunderstood.push({ noteTr: m.noteTr });
    }
  }

  const total = story.keyPoints.length || 1;
  const correctCount = matched.length;
  const scorePercent = Math.round((correctCount / total) * 100);
  const tooShort = wordCount < MIN_WORDS;

  // ---------------------------------------------------------------------------
  // Geri bildirim metinleri (HIMYM aromalı, yapıcı ton)
  // ---------------------------------------------------------------------------
  let title: string;
  let message: string;
  const tips: string[] = [];

  if (wrongLanguage) {
    title = '🇹🇷 Özetini Türkçe yazmalısın';
    message =
      'Özetini Rusça yazmışsın gibi görünüyor — bu çok yaratıcı ama bu alıştırmanın amacı tam tersi: ' +
      'Rusçayı OKU, özetini TÜRKÇE yaz. Hikayeye geri dön, istersen satırların çevirilerini aç ve tekrar dene.';
    tips.push('Rusça metni okurken bilmediğin kelimeleri hikayenin altındaki sözlük kartlarından kontrol et.');
  } else if (tooShort) {
    title = '🐢 Biraz daha uzun yazmalısın';
    message =
      `Özetin çok kısa (${wordCount} kelime). Bir özet; kimin ne yaptığını, nerede olduğunu ve nasıl bittiğini anlatır. ` +
      `En az ${MIN_WORDS} kelimeyle, 3-4 cümlelik bir özet yazmayı dene.`;
    tips.push('Şu sırayı takip et: Kim? Nerede? Ne oldu? Sonuç ne?');
  } else if (scorePercent >= 85) {
    title = '🏆 LEGEN — WAIT FOR IT — DARY!';
    message = `Efsanevi bir özet! ${correctCount} ana noktayı doğru yakaladın. Hikayeyi gerçekten anlamışsın — Töma bile gurur duyardı.`;
  } else if (scorePercent >= 60) {
    title = '🎉 Çok iyi yakaladın!';
    message = `${correctCount} ana noktayı doğru yakaladın. Küçük birkaç detayı kaçırmışsın ama büyük resmi görmüşsün.`;
  } else if (scorePercent >= 35) {
    title = '🙂 Sağlam bir başlangıç';
    message = `${correctCount} ana noktayı yakaladın, ama hikayenin bir kısmı sisli görünüyor. Eksik ipuçlarına bak ve metne bir tur daha at.`;
  } else {
    title = '🐢 Hikayeye bir tur daha';
    message = `${correctCount} ana noktayı yakalayabildin. Sorun değil — okuma anlama, tıpkı bir sitcom gibi, ikinci izlemede daha iyi anlaşılır. Çevirileri satır satır açıp tekrar okumayı dene.`;
  }

  if (missing.length > 0) {
    tips.push('Eksik noktaları "kim, nerede, ne oldu, nasıl bitti" sırasını takip ederek özetine eklemeyi dene.');
  }
  if (misunderstood.length > 0) {
    tips.push('Uyarı işaretli yerler hikayeyle çelişiyor — o sahneleri 🔊 ile tekrar dinle, yanlış anlaşılan kısmı düzelt.');
  }
  if (!tooShort && wordCount < 25 && !wrongLanguage) {
    tips.push('Biraz daha ayrıntı: iyi bir özet 3-5 cümledir; karakterlerin tepkilerini de eklemeyi dene.');
  }

  return {
    wordCount,
    tooShort,
    wrongLanguage,
    matched,
    missing,
    misunderstood,
    correctCount,
    issueCount: missing.length + misunderstood.length,
    scorePercent: wrongLanguage || tooShort ? Math.min(scorePercent, 30) : scorePercent,
    title,
    message,
    tips,
  };
}

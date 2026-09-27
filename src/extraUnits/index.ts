// ==========================================================
// EK MÜFREDAT PAKETİ — 81 yeni ünite
//   A1 gramer +5  : Ünite 7-11   (ben/benim/benimki/bende — cümle anahtarı)
//   A2 gündelik +8: Ünite 24-31  (market, kıyafet, kargo, taksi, ev, mutfak, operatör, havalimanı)
//   A2 aşçılık +5 : Ünite 32-36  (mutfak eşyaları → malzemeler → ölçüler → ilk tarif)
//   B1 +16        : Ünite 62-77  (iş, emlak, banka, alışveriş, flört başlangıcı, resmî işler)
//   B1 tanışma +3 : Ünite 78-80  (sokak, kafe/kitapçı, spor salonu/park)
//   B1 aşçılık +6 : Ünite 81-86  (pişirme fiilleri, tarif okuma, çorbalar, hamur, salata, kazalar)
//   B2 +14        : Ünite 108-121 (ileri iş, ticaret, ipotek, yatırım, olgun ilişki)
//   B2 tanışma +3 : Ünite 122-124 (bar, kulüp/parti, uçak/tren)
//   B2 aşçılık +5 : Ünite 125-129 (et & balık, tatlılar, konserve, misafir sofrası, restoran mutfağı)
//   C1/C2 +12     : Ünite 148-159 (yöneticilik, ortaklık, ihale, gümrük, müzakere, derin ilişki)
//   C1 aşçılık +4 : Ünite 160-163 (şef dili, sunum, degüstasyon, restoran açmak)
// curriculumData.ts bu diziyi BASE_UNITS ile birleştirip
// unitNumber'a göre sıralayarak UNITS_DATA'yı üretir.
// ==========================================================
import type { UnitModule } from '../curriculumData';
import { EXTRA_A1_GRAM } from './a1gram';
import { EXTRA_A2 } from './a2';
import { EXTRA_B1A } from './b1a';
import { EXTRA_B1B } from './b1b';
import { EXTRA_FLIRT_B1, EXTRA_FLIRT_B2 } from './flirt';
import { EXTRA_B2A } from './b2a';
import { EXTRA_B2B } from './b2b';
import { EXTRA_C1 } from './c1';
import { EXTRA_COOKING } from './cooking';

export const EXTRA_UNITS: UnitModule[] = [
  ...EXTRA_A1_GRAM,  // Ünite 7-11 (A1 — cümle anahtarı)
  ...EXTRA_A2,       // Ünite 24-31 (A2)
  ...EXTRA_B1A,      // Ünite 62-69 (B1)
  ...EXTRA_B1B,      // Ünite 70-77 (B1)
  ...EXTRA_FLIRT_B1, // Ünite 78-80 (B1 — tanışma)
  ...EXTRA_B2A,      // Ünite 108-114 (B2)
  ...EXTRA_B2B,      // Ünite 115-121 (B2)
  ...EXTRA_FLIRT_B2, // Ünite 122-124 (B2 — tanışma)
  ...EXTRA_C1,       // Ünite 148-159 (C1/C2)
  ...EXTRA_COOKING   // Ünite 32-36, 81-86, 125-129, 160-163 (Aşçılık paketi, A2→C1)
];

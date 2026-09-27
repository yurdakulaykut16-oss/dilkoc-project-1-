// ==========================================================
// EK MÜFREDAT PAKETİ — 61 yeni ünite
//   A1 gramer +5  : Ünite 7-11  (ben/benim/benimki/bende — cümle anahtarı)
//   A2 gündelik +8: Ünite 24-31 (market, kıyafet, kargo, taksi, ev, mutfak, operatör, havalimanı)
//   B1 +16        : Ünite 57-72 (iş, emlak, banka, alışveriş, flört başlangıcı, resmî işler)
//   B1 tanışma +3 : Ünite 73-75 (sokak, kafe/kitapçı, spor salonu/park)
//   B2 +14        : Ünite 97-110 (ileri iş, ticaret, ipotek, yatırım, olgun ilişki)
//   B2 tanışma +3 : Ünite 111-113 (bar, kulüp/parti, uçak/tren)
//   C1/C2 +12     : Ünite 132-143 (yöneticilik, ortaklık, ihale, gümrük, müzakere, derin ilişki)
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

export const EXTRA_UNITS: UnitModule[] = [
  ...EXTRA_A1_GRAM,  // Ünite 7-11 (A1 — cümle anahtarı)
  ...EXTRA_A2,       // Ünite 24-31 (A2)
  ...EXTRA_B1A,      // Ünite 57-64 (B1)
  ...EXTRA_B1B,      // Ünite 65-72 (B1)
  ...EXTRA_FLIRT_B1, // Ünite 73-75 (B1 — tanışma)
  ...EXTRA_B2A,      // Ünite 97-103 (B2)
  ...EXTRA_B2B,      // Ünite 104-110 (B2)
  ...EXTRA_FLIRT_B2, // Ünite 111-113 (B2 — tanışma)
  ...EXTRA_C1        // Ünite 132-143 (C1/C2)
];

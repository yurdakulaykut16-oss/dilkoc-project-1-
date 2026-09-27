// ==========================================================
// EK MÜFREDAT PAKETİ — 50 yeni ünite (A2 +8, B1 +16, B2 +14, C1/C2 +12)
// Gündelik hayatın her alanı: market, kargo, taksi, ev işleri,
// iş hayatı (CV'den yöneticiliğe), emlak (kiralamadan yatırıma),
// banka (hesaptan ipoteğe), ticaret (toptancıdan gümrüğe) ve
// ilişkiler (ilk DM'den sonsuza dek birlikte'ye).
// curriculumData.ts bu diziyi BASE_UNITS ile birleştirip
// unitNumber'a göre sıralayarak UNITS_DATA'yı üretir.
// ==========================================================
import type { UnitModule } from '../curriculumData';
import { EXTRA_A2 } from './a2';
import { EXTRA_B1A } from './b1a';
import { EXTRA_B1B } from './b1b';
import { EXTRA_B2A } from './b2a';
import { EXTRA_B2B } from './b2b';
import { EXTRA_C1 } from './c1';

export const EXTRA_UNITS: UnitModule[] = [
  ...EXTRA_A2,   // Ünite 19-26 (A2)
  ...EXTRA_B1A,  // Ünite 52-59 (B1)
  ...EXTRA_B1B,  // Ünite 60-67 (B1)
  ...EXTRA_B2A,  // Ünite 89-95 (B2)
  ...EXTRA_B2B,  // Ünite 96-102 (B2)
  ...EXTRA_C1    // Ünite 121-132 (C1/C2)
];

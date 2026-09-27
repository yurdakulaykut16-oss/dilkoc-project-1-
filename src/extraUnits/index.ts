// ==========================================================
// EK MÜFREDAT PAKETİ — 101 yeni ünite
//   A1 gramer +5  : Ünite 7-11   (ben/benim/benimki/bende — cümle anahtarı)
//   A2 gündelik +8: Ünite 24-31  (market, kıyafet, kargo, taksi, ev, mutfak, operatör, havalimanı)
//   A2 aşçılık +10: Ünite 32-41  (eşyalar, malzemeler, ölçüler, ilk tarif, aletler, süt ürünleri, meyveler, içecekler, saklama)
//   B1 +16        : Ünite 67-82  (iş, emlak, banka, alışveriş, flört başlangıcı, resmî işler)
//   B1 tanışma +3 : Ünite 83-85  (sokak, kafe/kitapçı, spor salonu/park)
//   B1 aşçılık +11: Ünite 86-96  (fiiller, tarif, çorbalar, hamur, salata, kazalar, garnitürler, pelmeni, balık, mangal, baharat)
//   B2 +14        : Ünite 118-131 (ileri iş, ticaret, ipotek, yatırım, olgun ilişki)
//   B2 tanışma +3 : Ünite 132-134 (bar, kulüp/parti, uçak/tren)
//   B2 aşçılık +10: Ünite 135-144 (et/balık, tatlı, konserve, sofra, restoran, kuşlar, dünya mutfağı, peynir, eşleşme, stok)
//   C1/C2 +12     : Ünite 163-174 (yöneticilik, ortaklık, ihale, gümrük, müzakere, derin ilişki)
//   C1 aşçılık +9 : Ünite 175-183 (şef dili, sunum, degüstasyon, restoran açmak, moleküler, tarladan sofraya, Michelin, mentorluk, medya)
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
import { EXTRA_COOKING2 } from './cooking2';
import { EXTRA_DAILY2A } from './daily2a';
import { EXTRA_GRAM_CASES } from './gramCases';
import { EXTRA_DAILY2B } from './daily2b';

export const EXTRA_UNITS: UnitModule[] = [
  ...EXTRA_A1_GRAM,  // Ünite 7-11 (A1 — cümle anahtarı)
  ...EXTRA_GRAM_CASES, // Ünite 12-21 (A2 — ismin 6 hali + vurgu okulu)
  ...EXTRA_A2,       // Ünite 24-31 (A2)
  ...EXTRA_DAILY2A,  // Ünite 32-41 (A2 — gündelik yaşam 2 kat, parti 1/3)
  ...EXTRA_DAILY2B,  // Ünite 62-71 (B1 — gündelik yaşam 2 kat, parti 2/3)
  ...EXTRA_B1A,      // Ünite 67-74 (B1)
  ...EXTRA_B1B,      // Ünite 75-82 (B1)
  ...EXTRA_FLIRT_B1, // Ünite 83-85 (B1 — tanışma)
  ...EXTRA_B2A,      // Ünite 118-124 (B2)
  ...EXTRA_B2B,      // Ünite 125-131 (B2)
  ...EXTRA_FLIRT_B2, // Ünite 132-134 (B2 — tanışma)
  ...EXTRA_C1,       // Ünite 163-174 (C1/C2)
  ...EXTRA_COOKING,  // Ünite 32-36, 86-91, 135-139, 175-178 (Aşçılık paketi 1, A2→C1)
  ...EXTRA_COOKING2  // Ünite 37-41, 92-96, 140-144, 179-183 (Aşçılık paketi 2, A2→C1)
];

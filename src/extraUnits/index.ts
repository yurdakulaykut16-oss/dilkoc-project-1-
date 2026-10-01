// ==========================================================
// EK MÜFREDAT PAKETİ — 101 yeni ünite
//   A1 gramer +5  : Ünite 2-6    (ben/benim/benimki/bende — cümle anahtarı; sohbet üniteleri 7-11 e kaydı)
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
// önce CEFR seviyesine (A1 → A2 → B1 → B2 → C1 → C2), sonra unitNumber'a göre sıralayarak UNITS_DATA'yı üretir.
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
import { EXTRA_DAILY2C_B2, EXTRA_DAILY2C_C1 } from './daily2c';
import { EXPANSION_A1, EXPANSION_A2 } from './expansion50a';
import { EXPANSION_B1, EXPANSION_B2 } from './expansion50b';
import { EXPANSION_C1 } from './expansion50c';
import { A_BOOST_1 } from './aBoost1';
import { A_BOOST_2 } from './aBoost2';
import { A_BOOST_3 } from './aBoost3';
import { PACK100_A1 } from './pack100a1';
import { PACK100_A2 } from './pack100a2';
import { PACK100_B1 } from './pack100b1';
import { PACK100_B2 } from './pack100b2';
import { PACK100_C1 } from './pack100c1';
import { COOKING30 } from './cooking30';
import { DAILY60_A1 } from './daily60a1';
import { DAILY60_A2 } from './daily60a2';
import { DAILY60_B1, DAILY60_B2 } from './daily60b';
import { RETENTION_SPRINT_UNITS } from './retentionSprint';

export const EXTRA_UNITS: UnitModule[] = [
  ...EXTRA_A1_GRAM,  // Ünite 2-6 (A1 — cümle anahtarı, müfredatın en başı)
  ...EXTRA_GRAM_CASES, // Ünite 12-21 (A2 — ismin 6 hali + vurgu okulu)
  ...EXTRA_A2,       // Ünite 24-31 (A2)
  ...EXTRA_DAILY2A,  // Ünite 32-41 (A2 — gündelik yaşam 2 kat, parti 1/3)
  ...EXTRA_DAILY2B,  // Ünite 62-71 (B1 — gündelik yaşam 2 kat, parti 2/3)
  ...EXTRA_DAILY2C_B2, // Ünite 127-133 (B2 — gündelik yaşam 2 kat, parti 3/3)
  ...EXTRA_DAILY2C_C1, // Ünite 182-184 (C1 — gündelik yaşam 2 kat, parti 3/3 FİNAL)
  ...EXTRA_B1A,      // Ünite 67-74 (B1)
  ...EXTRA_B1B,      // Ünite 75-82 (B1)
  ...EXTRA_FLIRT_B1, // Ünite 83-85 (B1 — tanışma)
  ...EXTRA_B2A,      // Ünite 118-124 (B2)
  ...EXTRA_B2B,      // Ünite 125-131 (B2)
  ...EXTRA_FLIRT_B2, // Ünite 132-134 (B2 — tanışma)
  ...EXTRA_C1,       // Ünite 163-174 (C1/C2)
  ...EXTRA_COOKING,  // Ünite 32-36, 86-91, 135-139, 175-178 (Aşçılık paketi 1, A2→C1)
  ...EXTRA_COOKING2, // Ünite 37-41, 92-96, 140-144, 179-183 (Aşçılık paketi 2, A2→C1)
  // GENİŞLEME PAKETİ 50 — kesirli unitNumber'larla seviye bölgelerine sıralanır
  ...EXPANSION_A1,   // Ünite 10.1-10.95 (A1 ×10: renkler, vücut, yiyecek, ev, günler, meslek, hayvan, duygu, şehir, içecek)
  ...EXPANSION_A2,   // Ünite 40.1-40.95 (A2 ×10: eczane, kuaför, spor, sinema, tren, otel, postane, misafirlik, bayram, piknik)
  ...EXPANSION_B1,   // Ünite 95.1-95.95 (B1 ×10: CV, ofis, araba, tamir, telefon, sosyal medya, kütüphane, konser, kamp, acil)
  ...EXPANSION_B2,   // Ünite 143.1-143.95 (B2 ×10: hastane, hukuk, startup, pazarlama, sunum, çevre, psikoloji, tadilat, spor, medya)
  ...EXPANSION_C1,   // Ünite 180.1-180.95 (C1 ×10: diplomasi, borsa, bilim, edebiyat, felsefe, tıp, mahkeme, sanat, YZ, kriz)
  // A SEVİYESİ BÜYÜK GENİŞLEME — 54 A1 ünite (10.9601-10.9654 < 11)
  ...A_BOOST_1,      // Ünite 10.9601-10.9618 (A1 ×18: selamlaşma, aile, para, saat, okul, ev, sağlık...)
  ...A_BOOST_2,      // Ünite 10.9619-10.9636 (A1 ×18: hava, ulaşım, kafe, market, telefon, hobiler...)
  ...A_BOOST_3,      // Ünite 10.9637-10.9654 (A1 ×18: günlük kelime ve anlatı dili)
  // ========================================================
  // BÜYÜK PAKET 100 — her seviyeye 20 ünite: temel/ileri gramer,
  // CÜMLEDE ANLAM (olumsuzluk, tonlama, mecaz, deyim, atasözü,
  // eş seslilik, ironi, eşdizim, nüans), KÜLTÜR ve DİN üniteleri.
  // ========================================================
  // GÜNDELİK HAYAT 60 — pratik yaşam üniteleri (A1 20, A2 20, B1 15, B2 5)
  ...DAILY60_A1,     // Ünite 10.9721-10.9740 (A1 ×20)
  ...DAILY60_A2,     // Ünite 40.9801-40.9820 (A2 ×20)
  ...DAILY60_B1,     // Ünite 95.9801-95.9815 (B1 ×15)
  ...DAILY60_B2,     // Ünite 143.9801-143.9805 (B2 ×5)
  ...PACK100_A1,     // Ünite 10.9701-10.9720 (A1 ×20)
  ...PACK100_A2,     // Ünite 40.9601-40.9620 (A2 ×20)
  ...PACK100_B1,     // Ünite 95.9601-95.9620 (B1 ×20)
  ...PACK100_B2,     // Ünite 143.9601-143.9620 (B2 ×20)
  ...PACK100_C1,     // Ünite 180.9601-180.9620 (C1/C2 ×20)
  // ========================================================
  // AŞÇILIK ÖZEL PAKETİ — 30 ünite (100'lük paketin DIŞINDA):
  // yalnızca yemek yapma, baharatlar, mutfak malzemeleri,
  // teknikler, pastacılık, profesyonel mutfak dili.
  // ========================================================
  ...COOKING30,      // Ünite 40.9701-40.9710, 95.9701-95.9710, 143.9701-143.9705, 180.9701-180.9705
  // KALICILIK SPRINTLERİ — aktif hatırlama, karışık pratik ve 1-3-7 gün protokolü
  ...RETENTION_SPRINT_UNITS // A1 ×4, A2 ×3, B1 ×3, B2 ×2
];

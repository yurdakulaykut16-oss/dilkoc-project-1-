# .scratch — EN ayna üretim hattı

İngilizce ek ünite paketleri (`src/content/en/enExtraSpecs*.ts` + `enNewSpecs.ts`)
bu klasördeki araçlarla üretilir. Elle düzenleme yapma — üreticiyi çalıştır.

1. **dict/dict1..8.py** — TR→EN sözlüğü (2637 girdi). RU ek ünitelerindeki her
   TR anlamın İngilizce karşılığı. Anahtarlar `tr-list.json`'daki TAM dizelerdir
   (büyük/küçük harf ve noktalama dahil).
2. **extract-extras.ts** — RU müfredatını çalışma zamanından döker
   (`/tmp/extras-full.json`; 499 ek ünite, tam meta).
3. **gen-en-mirror.py** — sözlük + dökümü birleştirip 499 ayna spec'i ve
   175 "Pekiştirme" ünitesi üretir; `src/content/en/` içine yazar.

Yeniden üretim sırası:
```
npx esbuild .scratch/extract-extras.ts --bundle --format=esm --platform=node \
  --outfile=/tmp/extract-extras.mjs --log-level=error && node /tmp/extract-extras.mjs
python3 .scratch/gen-en-mirror.py
```

`extras-full.json` türetilmiş veri olduğu için Git'e girmez (.gitignore).

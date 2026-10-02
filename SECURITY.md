# DilKoç — Dosya Koruması ve Güvenlik

> Bu belge, projedeki dosyaların çalınmasına, izinsiz kullanılmasına ve
> değiştirilmesine ("crack") karşı kurulan koruma katmanlarını ve bunların
> nasıl kullanılacağını açıklar.

## Koruma katmanları

| Katman | Neyi korur | Nerede |
|---|---|---|
| **LICENSE** | Tüm kod, müfredat, görsel ve sesler — 5846 FSEK kapsamında tam mülkiyet | `LICENSE` |
| **Telif başlıkları** | Kaynak dosyalarda kalıcı sahiplik ibaresi | `src/*.ts`, `src/*.tsx` (çekirdek dosyalar) |
| **Bütünlük manifesti** | Dosyaların değiştirilmesi/silinmesi tespit edilir | `integrity.manifest.json` + `scripts/integrity.mjs` |
| **Derleme sertleştirmesi** | Dağıtılan paketin tersine mühendisliği zorlaştırır (sourcemap yok, konsol silinir, isimler karışır) | `vite.config.ts` |
| **Telif bildirimi + noindex** | Konsolda yasal uyarı; arama motorları içeriği arşivlemez | `index.html` |

## Bütünlük doğrulama (en önemli araç)

Projenin **her izlenen dosyasının** SHA-256 parmak izi `integrity.manifest.json`
içinde tutulur. Bir dosya bile değişirse, silinirse ya da bilinmeyen bir dosya
eklenirse `check` komutu bunu raporlar:

```bash
npm run integrity:manifest   # parmak izlerini kaydet (meşru değişiklikten sonra)
npm run integrity:check      # dosyaları doğrula (ihlal varsa hata kodu 1)
```

### Güçlü mod (önerilen)

Manifest'i bir **gizli anahtarla** imzalayın. Anahtar sizde kaldığı sürece,
dosyaları değiştiren biri manifest'i yeniden üreter izini de kaydedemez:

```bash
# Anahtarı bir kez belirleyin ve SADECE kendi bilgisayarınızda saklayın
# (örn. ~/.dilkoc_key). Asla depoya commit etmeyin!
echo "benim-cok-gizli-anahtarim-2026" > ~/.dilkoc_key

DILKOC_INTEGRITY_KEY="$(cat ~/.dilkoc_key)" npm run integrity:manifest
DILKOC_INTEGRITY_KEY="$(cat ~/.dilkoc_key)" npm run integrity:check
```

### Sahiplik kanıtı (içerik çalınırsa)

`integrity.manifest.json` commit geçmişine gömülür. Git'in değiştirilemez
tarih + SHA kayıtları, bu dosyaların **o tarihte sizde olduğunu** noter
gibi kanıtlar. Çalınma tespit edilirse şu zincir DMCA/ihtar sürecinde
birinci sınıf delildir:

1. `LICENSE` (tam mülkiyet beyanı)
2. `integrity.manifest.json` + onu içeren commit'lerin tarihçesi
3. Gerekirse `git log -- integrity.manifest.json` çıktısı

## Dağıtım (build) koruması

`npm run build` çıktısı (`dist/`) şu sertleştirmelerle üretilir:

- **sourcemap yok** — derlenmiş koddan kaynak koda geri dönülemez
- **terser** — tüm `console.log` silinir, değişken/fonksiyon adları
  karıştırılır (mangle toplevel), yorumlar temizlenir
- **güvenlik başlıkları** — `vite preview` için X-Frame-Options, nosniff,
  Referrer-Policy, Permissions-Policy (gerçek dağıtımda sunucu tarafında da
  ayarlanmalı)

## Gerçekçi sınırlar (dürüst not)

- Depo şu an **herkese açık (public)**: kaynak kod GitHub'da herkes tarafından
  indirilebilir. En güçlü tek adım depoyu özel (private) yapmaktır —
  istenirse `gh repo edit --visibility private` ile tek komutta yapılabilir.
- Eski commit geçmişi eski dosya sürümlerini içerir; geçmiş korunarak bu
  giderilemez (geçmişin yeniden yazılması gerekir).
- Tamamen tarayıcıda çalışan bir uygulama, kararlı bir saldırgan tarafından
  %100 korunamaz; buradaki katmanlar işi ciddi biçimde zorlaştırır ve
  hukuki delili güçlendirir.
- Kendi bilgisayarınızdaki klasör için ek koruma: BitLocker/VeraCrypt ile
  disk şifreleme, klasöre yalnız kendi kullanıcınızın erişmesi
  (klasör > Özellikler > Güvenlik).

## İhlal bulunursa

1. `npm run integrity:check` çıktısını ve `git status` kaydını saklayın.
2. İçerik başka bir yerde yayımlandıysa platforma (GitHub/YouTube/mağaza)
   DMCA ihbarında bulunun; yukarıdaki sahiplik zincirini ekleyin.
3. Gerekirse 5846 FSEK kapsamında hukuki danışman alın.

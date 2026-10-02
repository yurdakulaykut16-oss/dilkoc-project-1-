# DilKoç — Play Store Güvenlik Yol Haritası

> Bu belge, uygulamayı Google Play Store'a koyarken kod ve içerik güvenliğini
> en üst düzeye çıkarmak için mevcut korumaları ve atmanız gereken adımları
> listeler.

## Şu an zaten KORUNAN (otomatik — her `npm run build`)

| Katman | Etki |
|---|---|
| **Obfuscation (kod karartma)** | Uygulamanın tamamı TEK pakette; tüm string'ler (müfredat, AI, mesajlar) base64 gizli diziye gömülü — pakette `grep "nasılsın"` → 0 sonuç. Tüm fonksiyon/değişken adları hex kod. |
| **Sourcemap yok** | Derlenmiş koddan kaynak koda geri çıkılamaz. |
| **Terser** | `console.log` tamamen silinir; isimler karıştırılır; yorumlar (ipuçları) yok. |
| **Tek dosya paketi** | Kod bölme yok → modül yapısı, dosya adları, bağımlılık haritası görünmez. |
| **Bütünlük manifesti** | Kaynak dosyaların SHA-256 kaydı (`npm run integrity:check`). |
| **LICENSE + telif başlıkları** | Hukuki caydırıcı ve DMCA delil zinciri. |
| **Güvenlik başlıkları** | `vite preview`/dağıtım: X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy. |

Doğrulama örneği (bu build ile yapıldı):
- `find dist -name '*.map'` → 0 dosya
- `grep -c "nasılsın\|Книга\|how are you\|Yerel" dist/assets/*.js` → 0
- `node --check dist/assets/*.js` → geçerli

## Play Store'a çıkarken ATMANIZ GEREKEN adımlar

### 1. Android derlemesi (Tauri v2)
Proje Tauri v2 ile hazır. Android üretimi için (bir kez):
```bash
npm run tauri android init        # src-tauri/gen/android üretir
npm run tauri android build       # release AAB (Play Store formatı)
```
Play Store'a `.aab` (Android App Bundle) yüklenir.

### 2. İmza anahtarı (keystore) — EN KRİTİK GİZLİ
- `tauri android build` bir keystore ister/üretir. **Keystore dosyasını ve
  şifrelerini ASLA depoya koymayın** — yedeklerini güvenli bir yerde
  (parolalı disk/şifreleyici) saklayın.
- Kaybederseniz uygulamayı GÜNCELLEYEMEZSİNİZ (Play App Signing kapalıysa).
- Google Play App Signing'i etkinleştirin: Google imza anahtarını tutar,
  sizin anahtarınız yalnız kimlik doğrulama için kalır.

### 3. Android tarafı sertleştirme
- Release derlemesinde `minifyEnabled true` + R8 (Tauri şablonunda varsayılan
  gelir) → Rust/Java katmanı da küçülür ve karartılır.
- `AndroidManifest.xml`'de `android:debuggable="false"` (release'ta varsayılan).
- `tauri.conf.json` → `app.security.csp` değerini `null` bırakmayın; örn.
  `"default-src 'self'; img-src 'self' data:; media-src 'self'; style-src 'self' 'unsafe-inline'"`.

### 4. (Opsiyonel, önerilir) Play Integrity API
Uygulama açılışında `IntegrityManager` ile cihaz/uygulama doğrulaması:
- Korsan APK'ların ve modlanmış paketlerin tespitini kolaylaştırır.
- Tamamen yerel çalışan bir uygulamada "ceza" uygulayacak sunucunuz yoksa
  etkisi sınırlıdır; ileride online özellik (senkron,premium) eklerseniz
  mutlaka kurun.

### 5. Yayın öncesi kontrol listesi
- [ ] `npm run build` → obfuscation çıktısını tarayıcıda açıp test edin
      (bu depoda: `npx vite preview --port 4173`)
- [ ] `npm run integrity:manifest` + manifest'i commit'e dahil edin
- [ ] Keystore yedeği alındı mı?
- [ ] `gh api repos/.../releases` yerine **Play Console**'da iç test kanalı
      ile kendi cihazınızda doğrulayın

## GERÇEKÇİ SINIRLAR — mutlaka okuyun

1. **Depo hâlâ HERKESE AÇIK.** Play Store'da satmak istediğiniz uygulamanın
   TAM KAYNAK KODU şu anda GitHub'da herkes tarafından indirilebiliyor.
   Obfuscation yalnızca DERLENMİŞ paketi korur; kaynağı korumaz. Yayın
   öncesi depoyu özel yapmanız ŞİDDETLE önerilir:
   `gh repo edit yurdakulaykut16-oss/dilkoc-project-1- --visibility private`
   (geri dönüşü vardır; Arena oturumu etkilenmez).

2. **"%100 crack olmaz" yoktur.** APK'yı açıp içindeki JS'i çıkarabilirler
   (bu her uygulamada böyledir). Fark şudur: çıkan kod obfuscation'lı,
   isimsiz, tek dosya ve sourcemap'sizdir — okuyup kopyalamak haftalar alır;
   sizin LICENSE + manifest + commit geçmişi de hukuki olarak arkınızdadır.

3. İçeriğin gerçekten ÇALINAMAZ olması için tek yol sunucu tarafında
   tutmaktır (uygulama açılışta sunucudan indirir). Bu, "internetsiz çalışır"
   özelliğinden vazgeçmek demektir — tasarım kararı size ait.

## İhlal bulunursa
`SECURITY.md` → "İhlal bulunursa" bölümündeki adımları izleyin
(delil zinciri: LICENSE + integrity.manifest.json + git geçmişi).

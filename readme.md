# 🇷🇺 Rusça Öğrenme ve Dil Koçu Platformu (A1 - A2)

Bu proje, Rusça öğrenmek isteyen kullanıcılara Kiril alfabesinden başlayarak A1 ve A2 seviyelerinde akıcı iletişim kurmaya kadar rehberlik eden **interaktif bir dil öğrenme ve pekiştirme platformudur**.

> **Not:** Bu projenin kurgulanmasında, Kiril alfabesi ders içeriklerinin hazırlanmasında ve interaktif öğrenme mimarisinin oluşturulmasında **Claude** yapay zeka modelinden faydalanılmıştır.

---

## 🎯 Projenin Amacı ve Kazanımları

Bu uygulamayı düzenli olarak takip eden bir öğrenci aşağıdaki **kazanımları** elde eder:

* **33 Harflik Kiril Alfabesi Hâkimiyeti:** Rus alfabesindeki tüm harfleri okuma, yazma, Türkçe fonetik karşılıklarıyla tanıma ve telaffuz etme.
* **Fonetik ve Vurgu Kuralları:** Rusçadaki *Akanje* (vurgusuz 'O' harfinin 'A' okunması), *Ikanje* (vurgusuz 'E' harfinin 'İ' okunması) ve kelime sonu ünsüz sedasızlaşması kurallarını kavrama.
* **A1 & A2 Seviye Gramer ve Kelime Dağarcığı:** Günlük yaşamda en çok kullanılan +1200 kelimeyi ve temel dilbilgisi kalıplarını öğrenme.
* **Gerçek Hayat Senaryoları:** Tanışma, Aile, Kafe & Restoranda Sipariş, Şehir Ulaşımı & Yön Sorma, Sayılar & Zaman, Hava Durumu, Alışveriş & Pazarlık, Telefon Görüşmeleri, Ev Eşyaları ve Randevu Alma gibi 10+ tematik ünitede pratik yapma.
* **Anlaşılır Girdi (Comprehensible Input) ile Dinleme:** Popüler Rus çizgi dizisi *Smeshariki (Смешарики)* karakterlerinden esinlenilmiş özel diyaloglar sayesinde doğal konuşma dilini anlama ve dinlediğini kavrama yeteneği kazanma.

---

## 🆕 Kişiselleştirme & Ses Motoru Güncellemesi

* **🧭 Kişisel Rota (`src/learnerModel.ts` + `src/components/LearningRoute.tsx`):** Çözülen HER soru (ünite sınavları, cümle kurma, dinleme testleri, gramer quizleri, hikaye Türkçeleştirme) yerel öğrenen modeline işlenir. Cümlelerden **zamanlar** (şimdiki/geçmiş/gelecek, morfolojik ipuçlarıyla) ve **edatlar** (в, на, к, у, с, из…) deterministik olarak tespit edilir; üst bardaki **"🧭 Rotam"** ekranı her zaman ve her edat için ayrı isabet çubuğu gösterir ve zayıf halkalardan sıralı bir **kişiselleştirilmiş öğrenim rotası** üretir (ilgili gramer ünitesine atlama + 1 dakikalık hedefli test + mikro ders akışı). Ses seçimi de bu ekrandadır.
* **🔬 Anlamsal Fark Analizi (`src/semanticFeedback.ts`):** Cümle kurma egzersizlerinde yanlış cevaba artık salt "yanlış" denmez; kullanıcının cümlesi ile ideal cümle **anlam ve yapı düzeyinde** karşılaştırılır ve **13 ayrı tanı katmanı** çalışır: zaman kayması, **görünüş (вид) hatası** (прочитал ↔ читал), **şahıs eki uyumsuzluğu**, **geçmiş zaman cinsiyet/sayı uyumu** (она читал → читала), **şimdiki zamanda быть kullanımı**, **olumsuzlukta ilgi hâli** (нет + родительный), **dönüşlü -ся eki**, eksik/fazla edat, **edat-hâl yönetimi** (в/на + belirtme-bulunma, с + araç, у/из/для + ilgi …), **hangi hâl kullanıldı / hangisi gerekiyordu** teşhisi (çekim tablosu üzerinden doğrulanır, yalnız "ek yanlış" denmez), eksik/fazla kelime, **Kiril-Latin alfabe karışması** ve dizilim/vurgu farkı. Her rapor madde madde gerekçelidir, anlamsal yakınlık yüzdesi ve "önce şu maddeyi çöz" biçiminde bir öncelik tavsiyesi içerir.
* **🎬 Koç Akışı (`src/components/CoachShorts.tsx`):** Üst bardaki ayrı **"🎬 Koç Akışı"** butonuyla açılan bölüm: kullanıcının hata yaptığı kelime ve gramer (zaman/edat) konularından **AI ile üretilmiş 15-30 saniyelik dikey (9:16) video/animasyon mikro dersler** oluşturur — story tarzı sahne çubukları, animasyonlu sahneler, tarayıcı yerleşik ses fallback'i ve Reels tarzı ▲▼ gezinme ile.
* **🕸️ 3D Kelime Ağı (`src/components/WordGraph3D.tsx`):** Bildiğin tüm kelimeleri; geldikleri **bölümlere (üniteler)**, **tekniklere** (dinleme, SRS, alfabe, zamanlar, edatlar) ve **seviyelere** (A1→C1/C2) bağlayan, sürükle-döndür + yakınlaştırmalı, kütüphanesiz 3D kuvvet-yönlendirmeli ağ grafiği. **Unutulmaya yüz tutan kelimeler (SRS vadesi geçen / kronik hatalılar) ağ üzerinde KIRMIZILAŞIR** ve nabız gibi atar.
* **⚡ Hızlı Kurtarma Testi (`src/components/RescueTest.tsx`):** 3D ağda kırmızılaşan veya zayıf bağlanan bir kelime/gramer düğümüne tıklayınca **60 saniyelik geri sayımlı, doğrudan o noktayı hedefleyen test** başlar (tanıma + üretim + dinleme + bağlam soruları). Geçilirse kelimenin SRS kutusu yükselir ve düğüm yeşile döner; geçilemezse kutu 1'e iner.
* **🎙️ Anahtarsız tarayıcı ses fallback'i (`src/tts/webSpeech.ts`):** Yerel VoiceStudio veya seçili cloud provider anlık olarak hazır değilse metin, ağ kimlik doğrulamasına bağlı olmayan tarayıcı yerleşik TTS motoruna düşer. Microsoft Edge websocket TTS kullanılmaz; böylece Edge kimlik/TLS hataları ses akışını bozmaz.
* **🎚️ Perde Korumalı Dinleme Hızı:** Rusça ünitelerin **sadece dinleme olan yerlerinde** (dinleme konuları, dinle&seç testleri, dizi sahnesi/diyalog, ünite dinleme sınavı) 0.5×–1.5× hız düğmesi vardır; `preservesPitch` sayesinde ses yavaşlarken/hızlanırken **kelime bozulmaz** (incelme/kalınlaşma olmaz).

## 🤖💬 Kişisel AI Ajanı + VoiceStudio ses paleti (ücretsiz)

* **Tamamen yerel soru-cevap zekâsı (`src/components/AiChat.tsx` + `src/ai/localRussianAgent.ts`):** Kullanıcı istediği soruyu Türkçe veya Rusça yazabilir. Yanıt motoru API, LLM veya token kullanmadan cihazda çalışır; **460 bölümlük ve 65.000+ atomik bilgi noktalı** yerel uzmanlık bankasını, bütün müfredat kelimelerini/cümlelerini ve öğrenme konumunu deterministik olarak tarar. Model indirmez; yerleşik bilgiler + IndexedDB hızlı cevap önbelleği birlikte kesin olarak **en fazla 1 GB** alan kullanacak biçimde sınırlandırılmıştır. Soru türünü **16 ayrı niyet** altında ayırır, gerçek kaynakları güven puanıyla seçer, bilinen gramer hatalarını kural motoruyla düzeltir ve bağlantı olmadığında da aynı şekilde çalışır.
* **🧬 Kural tabanlı biçimbilim motoru (`src/ai/morphology.ts`):** Sözlükte olmayan kelimeler için bile canlı üretim yapar — **6 hâl × tekil/çoğul isim çekimi** (cinsiyet, canlılık, gövde tipi, kaçıcı ünlü, düzensiz çoğullar), **1./2. çekim ve düzensiz fiil çekimi** (şimdiki/geçmiş/gelecek/emir, görünüş çiftleri, `-овать/-евать/-авать` kuralları), **sıfat çekimi ve derecelendirme**, **sayı-isim uyumu** (год/года/лет) ve **ses kuralı açıklamalı telaffuz üretimi** (akanye, ikanye, sedasızlaşma, `-ого → [v]`). Müfredattaki okunuş yazımındaki vurgu işareti okunarak ses indirgemesi kesinleştirilir.
* **📐 Bölümlenmiş cevap derleyicisi (`src/ai/answerComposer.ts`):** Her cevap aynı pedagojik iskelette üretilir: ⚡ kısa cevap → 📘 neden böyle → 📊 tablo → 🧩 örnekler → 🔍 ince ayar → ⚠️ Türk öğrenci tuzağı → 🎯 mini alıştırma → 🔗 sıradaki adım. Cevaplar sohbet ekranında düz metin olarak değil, **renkli bölüm blokları ve hizalı tablolar** hâlinde gösterilir; her cevabın altında kullanılan **kaynak rozetleri**, **güven etiketi**, **bilgi noktası sayısı** ve tek dokunuşla sorulabilen **akıllı takip soruları** bulunur.
* **🔀 Karşılaştırma motoru:** Türk öğrencilerin en çok sorduğu ikilikler (в/на, идти/ходить, ехать/ездить, знать/уметь/мочь, говорить/сказать, тоже/также, это/этот, мой/свой, нет/не, bitmiş/bitmemiş görünüş; İngilizce tarafta Present Perfect/Past Simple, in/on/at, make/do, will/going to, gerund/infinitive) için **ayırıcı ölçüt + yan yana tablo + örnek + tuzak** veren özel kayıtlar içerir.
* **🎒 Öğrenen verisine bağlı cevaplar:** Ajan artık koçun **hata defterini** ve **SRS kutusunu** da görür. "Zayıf konularım neler?" sorusu gerçek hata gerekçelerinin sıklık analizini, vadesi gelen kart sayısını ve en zayıf kartları döndürür; çalışma planı bu yüke göre ölçeklenir. Düzeltme cevaplarını tek dokunuşla hata defterine, kelime cevaplarını tekrar kutusuna ekleyebilirsin.
* **🪐 Konuşan gezegen maskotu + insan kolu iskeleti (`src/components/VoicePlanet.tsx` + `src/components/planetGestures.ts`):** AI Ajanının gezegenine üç eklemli (omuz → dirsek → bilek) **insan kolları** eklendi: üst kol, ön kol, avuç, başparmak ve üç parmaktan oluşan bir rig. Kollar **okunan cümleye göre** farklılaşır — soru cümlesinde avuçlar yukarı döner, ünlem/coşku cümlesinde kollar "V" olup havada pompalanır, kural ve uyarı cümlesinde sağ kol uzanıp işaret parmağıyla batar, sayı/liste cümlesinde parmaklar vuruşla kıvrılır, "bilmiyorum" tonunda omuzlar silkinir, selamda tek el sallanır. Salınımın **genliği ve süresi**, o hecenin ağız açıklığından beslenen enerjiyle kare kare yumuşatılarak ölçeklenir (uzun ve enerjik cümle = hızlı ve geniş kol hareketi). Mikrofon açıkken el kulağa (antene) gider, ajan yanıt ararken el çene altına iner ve düşünme noktaları yanıp söner; boşta kollar nefes alır, ara sıra gerinir. Cümle bitince kısa bir alkış + halka ve konfeti patlaması gelir. Sahneye ayrıca dönen gezegen yüzeyi, göz kırpma + bebekte bakış kayması, kaş ifadeleri, yanak allığı, halka parlaması ve yörüngede iki uydu eklendi. `prefers-reduced-motion` açıksa tüm hareketler kapatılır.
* **🚫 Dürüst belirsizlik:** Eşleşme puanı eşiğin altındaysa ajan alakasız bir ders anlatmak yerine bulamadığını söyler ve nasıl soracağını gösterir.
* **AirLearn benzeri akış:** Sohbet geçmişi cihazda kalıcıdır (sayfa yenilense de kaybolmaz), son konuşmalar bağlam olarak korunur ve **kısa takip soruları önceki soruyla birleştirilerek** çözümlenir ("peki ya çoğulu?"), hazır soru önerileri vardır, cevaplar otomatik seslendirilebilir ve her mesajda konum etiketi görünür. Böylece “nerede kaldım?” sorusu ajanın bağlamından kopmaz.
* **Gerçek VoiceStudio bağlantısı (`src/tts/voiceStudioLocal.ts` + `src/components/VoiceStudioPanel.tsx`):** Botun ana sesi Google/Edge değildir. [debpalash/VoiceStudio](https://github.com/debpalash/VoiceStudio) yerel backend'i çalışıyorsa uygulama Vite proxy üzerinden `POST /v1/audio/speech` çağırır; bilgisayardaki gerçek clone/design profilleri `GET /v1/audio/voices` ile yüklenir ve seçilen profil kullanılır. Speechify/ElevenLabs/OpenAI profilleri yalnızca VoiceStudio kapalı olduğunda anahtarsız fallback'tir; bunlar da başarısız olursa tarayıcı yerleşik TTS'i kullanılır. Seçim localStorage'da saklanır.

### VoiceStudio otomatik kurulumu ve bağlama

VoiceStudio artık ayrı bir terminal, `git clone`, `uv sync`, `bun install` veya manuel backend başlatma gerektirmez:

1. Node.js 18+ ile proje bağımlılıklarını kurun: `npm install`
2. Tek komutu çalıştırın: `npm run dev`
3. İlk açılışta launcher gerçek [VoiceStudio](https://github.com/debpalash/VoiceStudio) kaynağını `.runtime/VoiceStudio` altına indirir, proje içindeki izole `.runtime/uv-venv` ortamına `uv` kurar, Python bağımlılıklarını hazırlar, backend'i `3900` portunda başlatır ve `k2-fsa/OmniVoice` model indirmesini arka planda başlatır.
4. Aynı komut Vite frontend'ini açar. DilKoç → **💬 AI Ajanı → 🎚️ Ses Stüdyosu** yolunda `✅ Yerel bağlı` durumunu ve gerçek VoiceStudio clone/design profillerini görüp birini seçebilirsiniz.

İlk kurulum başarısız olursa DilKoç yine açılır ve mevcut VoiceStudio → cloud → tarayıcı cihaz sesi fallback zinciri çalışır. Model indirmesini kapatmak için `DILKOC_AUTO_INSTALL_VOICESTUDIO_MODEL=false`, backend portunu değiştirmek için örneğin `VOICESTUDIO_PORT=3910 npm run dev` kullanılabilir; Vite proxy bu portu otomatik kullanır. Kendi sesinizi klonlarken VoiceStudio'nun consent/rıza akışını kullanın; DilKoç yalnızca VoiceStudio'nun OpenAI uyumlu yerel endpoint'ini çağırır.

## 📚🔒 ULTRA PAKET 4.0: Seviye Kilitli Denemeler + Benzer-Ünite Temizliği + 60 Gündelik Hayat Ünitesi

* **🔒 Seviye Kilit Kuralı (`examReadiness`):** Bir seviyenin denemesi artık o seviyenin **TÜM üniteleri bitmeden AÇILMAZ** — B1 denemesi için B1'in tamamı, GENEL için bütün müfredat şartı; kilitli satırda ilerleme sayacı görünür (ör. `🔒 174/175 ünite — kalan 1`). 🌅 **GÜNÜN MİNİ DENEMESİ** bu kuraldan muaf; öğrendiğin her şeyden (≥8 kelimelik havuzla) her gün açık kalır. Böylece sınavın her sorusu birebir senin ünitelerinin **kelime, cümle ve diyaloglarından** üretilir — deneme = senin müfredatın.
* **🧹 Benzer-İçerik Temizliği:** Aynı konunun ısıtılmış kopyası olan **517 "Benzer Konu: …" (mirror) ünitesi silindi** (`mirrorPack` kaldırıldı). Ayrıca aynı seviyede **birebir aynı başlıklı** çiftler ("Sabah Rutini", "Otobüs Durağı", "Geniş Aile", "Mutfak Eşyaları", "Soru Kelimeleri", "İş Görüşmesi", "Medya ve Haber Dili" vb.) otomatik ayıklanıyor — içeriği zengin olanı kalıyor ("… 1/2" gibi serilere dokunulmaz). Müfredat 1174'ten **650 üniteye** sadeleşti (60 yeni PLUS ünitesiyle birlikte toplam **710 ünite**, 5.164 kelime).
* **➕ Gündelik Hayat PLUS — 60 yeni ünite (`src/extraUnits/dailyLifePlus.ts`):** tamamı farklı konular, zorluklarına göre seviyelere dağıtıldı: **A1 (12):** yağmurlu gün, kar günü, sabah yürüyüşü, çay molası, çiçek sulama, hediye paketleme, kayıp eşya, video görüşme, süsleme, meydan müzisyeni, dondurmacı, komşudan yardım. **A2 (14):** optik, ayakkabı alışverişi, biyometrik fotoğraf, ehliyet teorik sınavı, ilk iş günü, karne günü, veteriner, kırık ekran tamiri, kombi arızası, gürültülü komşu, kanepe taşıma, güneş gözlüğü, yüzme kursu, şehir turu. **B1 (14):** kiracı arıza bildirme, araç muayene (TÜVTÜRK), öğretmen görüşmesi, vergi dairesi, düğün organizasyonu, aşı randevusu, ev sigortası, kart dolandırıcılığı, apartman toplantısı, taşınma/nakliye, direksiyon dersi, nalbur, açık öğretim, kira zammı. **B2 (12):** noter vekâleti, mahkeme hazırlığı, gümrük, konut kredisi, maaş pazarlığı, sözleşme kontrolü, işyeri ruhsatı, tüketici heyeti, karakol ifadesi, okul nakli, ev satın alma pazarlığı, fatura itirazı. **C1/C2 (8):** miras paylaşımı, iflas, kentsel dönüşüm, basın açıklaması, tez savunması, mali denetim, iş mahkemesi, konsolosluk acili. Cümle şablonları seviyeye göre değişir (A1 kısa-doğrudan → B2 şart/risk bildiren → C1 resmî-hukukî söylem: *в рамках процедуры…, может повлечь юридические последствия…*).

## 🗣️🔥 ULTRA PAKET 3.0: Günlük Ağız Jimnastiği + Denemeler Her Yerde + Genel Zorlaştırma

* **🗣️ GÜNLÜK AĞIZ ÖDEVİ — "Ağız Jimnastiği" (`src/speech/` + `src/components/SpeechGym.tsx`):** Kelime EZBERİ değil, **ağız kas hafızası** hedefleyen günlük konuşma antrenmanı. Her gece yarısı tarihin deterministik tohumuyla **7 yeni görev** üretilir: 3 **kelime zinciri** ("молоко молоко молоко" — aynı kelime ×3, duraksamadan), 2 **Rus tekerlemesi** (Шла Саша по шоссе… 24 gerçek скороговорка + okunuş + kısa anlam + hangi sesleri çalıştırdığı), 2 **cümle zinciri** (bitirilen ünitelerin kısa cümleleri ×2). Zincir kelimeleri bitirilen ünitelerin "ağız yoran"larından seçilir (ы, щ, ь, тр/др/стр kümeleri +2 puan). Model sesler: 🐢 yavaş / 🎵 normal / ⚡ hedef hız TTS. **🎤 Konuşma tanıma açıksa** (Capacitor native + Web Speech zinciri, rusça ru-RU): söylenen metin hedefle karşılaştırılır — **Anlaşılırlık %** (token + Levenshtein benzerliği, ё→е katlamalı) ve **HIZ (harf/sn)** ölçülür; dereceler 🐢/🔥/⚡ YILDIRIM, günün hız rekoru saklanır. Tanıma yoksa kendi kendini değerlendirme modu açılır. Tamamlanan görevler `dilkoc_speech_v1`'e işlenir; günlük plan kartında ve haritada "🗣️ Ağız ödevi (X/7)" olarak görünür; 7/7'de +40 XP gün bonusu.
* **📝 Denemeler artık her yerde:** Denemelere 7. bölüm olarak **🔗 EŞLEŞTİRME** eklendi (süreli mini oyun: 3 çift, 1 hata hakkı). Ayrıca **🗓️ GÜNÜN MİNİ DENEMESİ**: günün tohumuyla sabitlenmiş 12 soruluk karışık sınav (herkes aynı gün aynı soruları görür, gece yarısı yenilenir); bugün çözüldüyse ("✅ bugünkü çözüldü") rozeti görünür, tekrar çözülebilir.
* **💪 GENEL ZORLAŞTIRMA (ultra mod DEĞİL, herkes için):** Türkçeleştirme barajı %85 → **%90**, dinleme konusu testi %75 → **%80**, bölüm finali kapı sınavı 7/10 → **8/10**, ünite sınavındaki yalnız-ses dinleme soruları 3 → **5**, bağlam soruları 3 → **4**, kalıcı tekrar enjeksiyonu 10 → **12** (dinleme 6 → **8**). ⚡ ULTRA mod bunların üstünde kalmaya devam eder: %95 / %90 / 9/10 / 18-12 soru / 2 kez yeniden sorma / sıkı SRS / XP ×1.5.

## ⚡⚡ ULTRA PAKET 2.0: Deneme Sınavları + Kart Evi + Ultra Zorluk Modu

Kalıcı öğrenme seviyesini "ultra"ya çıkaran üçlü paket (`src/ultra/` + `src/components/MockExamScreen.tsx` + `src/components/FlashcardArena.tsx`):

* **📝 Deneme Sınavları (üst bar + haritadaki Ultra Merkezi):** Bitirdiğin ünitelerin kelime/cümle havuzundan üretilen **süreli, 6 bölümlü karma sınavlar** — her seviye için ayrı (A1, A2, B1, B2, C1/C2) + tüm müfredatı karıştıran **🌪️ GENEL ULTRA DENEME (30 soru)**. Bölümler: 📖 kelime tanıma (RU→TR), ✍️ üretim (TR→RU), 🎧 dinleme (yalnız ses), 💬 bağlam (cümle anlama), 🧩 boşluk doldurma ve **⌨️ YAZMA** (Türkçesi verilir, Rusçası ekran Kiril klavyesiyle YAZILIR — en zor bölüm). Her sorunun geri sayımı vardır; süre dolan soru yanlış sayılır. Yanlışlar **hata kütüğüne + zayıf nokta istatistiğine + öğrenen modeline** otomatik işlenir; sınav sonunda beceri karnesi (bölüm bazında bar grafik), yanlış kartelası (🔊 tekrar dinleme) ve puan raporu verilir. Tüm denemeler `dilkoc_exams_v1` deposunda saklanır: seviye başına EN İYİ puan, son denemeler listesi, geçti/kaldı durumu. Sıfırlamada geçmiş de temizlenir.
* **🃏 Kart Evi (4 modlu flashcard arenası):** Desteler: 📅 vadesi gelen SRS kelimeleri → 🎓 öğrendiğim kelimeler → 🌍 tüm müfredattan rastgele 40.
  * **📇 Klasik Kartlar:** çevir-çalış; "Biliyorum/Bilmiyorum" oyu Leitner kutunu doğrudan günceller; bilinmeyen kart deste sonuna bir kez geri döner.
  * **⚡ Yıldırım 60 sn:** kronometreye karşı arka arkaya doğru cevaplar SERİni büyütür; yanlışta seri sıfırlanır (skor = doğrular + en iyi seri bonusu).
  * **✍️ Üretim Kartları (ZOR):** Türkçesi gösterilir, Rusçası **Kiril ekran klavyesiyle** yazılır; ё/е katlamalı normalizasyonla değerlendirilir. Üretim kanalı kalıcı öğrenmenin en güçlü antrenmanıdır — doğrular yüksek XP verir, yanlışlar kutu 1'e düşer.
  * **🔗 Eşleştirme Sprinti:** 6 RU–TR çifti kronometreye karşı; hata sayısı ve süre puana işlenir.
* **⚡ Ultra Zorluk Modu (üst barda turuncu ⚡ rozet — tek tıkla aç/kapat, `dilkoc_ultra_v1`'de saklanır):** Açıkken TÜM uygulama zorlaşır:
  * Türkçeleştirme sınavı barajı **%85 → %95**, dinleme konusu testi **%75 → %90**, bölüm finali kapı sınavı **7/10 → 9/10**, deneme sınavı barajı **%70 → %85**.
  * Yanlışlanan sınav sorusu sınav sonunda 1 değil **2 KEZ** tekrar sorulur.
  * 🔁 Kalıcı tekrar enjeksiyonu dozu artar: ünite sınavı 10 → **16**, dinleme testi 6 → **9** soru.
  * SRS (Leitner) tekrar aralıkları sıkılaşır: 1-3-7-16-35 gün → **1-2-4-8-14 gün** (daha sık tekrar = daha kalıcı iz).
  * Ödül: **tüm XP kazanımları ×1.5** (üst barda "ULTRA AKTİF" rozeti).

İlgili dosyalar: `src/ultra/ultraMode.ts` (mod + dinamik barajlar), `src/ultra/examStore.ts` (deneme geçmişi), `src/ultra/mockExam.ts` (deterministik olmayan, tekleştirilmiş şık üretimiyle 6 bölümlü sınav üreteci; `normalizeRu`/`typingMatches` yazma değerlendirmesi), `src/components/CyrillicPad.tsx` (ЙЦУКЕН dizilimli ekran Kiril klavyesi), `src/components/MockExamScreen.tsx`, `src/components/FlashcardArena.tsx`.

## 🚀 Ultra Paket: İstatistik Merkezi + 10 Yeni Özellik

* **🔥 Gerçek Seri (Streak) Takibi (`src/statsStore.ts`):** Üst bardaki 🔥 sayısı artık sabit değil — XP kazanılan her gün seri +1 artar, gün atlanırsa 1'e döner; en iyi seri de saklanır (`dilkoc_stats_v1`).
* **🎯 Günlük Hedef (50 XP):** Üst barda `🎯 bugünkü/50` çipi; İstatistik ekranında dolan SVG halka. Hedefi dolduran günler grafikte yeşile boyanır.
* **🏆 Lig Sistemi (Bronz → Efsane):** Toplam XP'ye göre 8 lig (Bronz, Gümüş, Altın, Safir, Yakut, Elmas, Usta, Efsane); üst barda tıklanabilir lig rozeti + bir sonraki lige ilerleme çubuğu.
* **🏅 12 Başarı Rozeti:** İlk adım, harf avcısı, Kiril ustası, 3/7 günlük seri, günlük hedef, ilk ünite, 10 ünite, keskin kulak, cümle mimarı, hafıza bankası (50 SRS kelimesi), temiz sayfa (hata kütüğü sıfır).
* **📈 14 Günlük XP Grafiği:** Gün gün kazanılan XP çubuk grafikte; bugün turuncu, hedef dolu günler yeşil.
* **🗓️ Günün Kelimesi (haritada):** Tarihin deterministik hash'i ile tüm kelime havuzundan her gün farklı bir kelime seçilir — okunuşu, anlamı, kullanım notu ve 🔊 dinleme butonuyla.
* **📋 Günlük Akıllı Plan (haritada):** Tek kartta üç eylem: vadesi gelen **aralıklı tekrar** sayısı (tek tıkla başlat), **zayıf nokta** antrenmanı (kronik hatalı kelime sayısıyla) ve yoldaki **sıradaki adım**.
* **💾 İlerleme Yedeği (dışa/içe aktarma):** İstatistik ekranından tüm ilerleme (XP/üniteler/SRS/hatalar + öğrenen modeli + istatistikler + ses tercihleri) tek JSON dosyası olarak indirilir; başka cihazda geri yüklenir.
* **⌨️ Klavye Kısayolları (1-4):** Tüm test ekranlarında (ünite sınavı, dinle&seç, hızlı kurtarma testi) 1-4 tuşları şıkları seçer; şıkların köşesinde küçük numara ipucu görünür.
* **🔊 Kartta Otomatik Seslendirme:** Kelime kartı ekranında kart her değiştiğinde Rusça kelime otomatik okunur; sağ üstteki düğmeyle açılıp kapanır (tercih `dilkoc_autospeak` ile kalıcıdır).

İstatistik Merkezi'ne üst bardaki **📊 İstatistik** butonundan (veya lig rozetine tıklayarak) ulaşılır (`src/components/ProfileStats.tsx`).

---

## 🛠 Proje Mimari ve Kod Yapısı (`App.tsx`)

Uygulama, tip güvenliği ve sürdürülebilirlik gözetilerek **React** ve **TypeScript** standartlarına uygun şekilde modüler olarak tasarlanmıştır.

### **A. Veri Modelleri ve Tip Tanımlamaları (Interfaces)**
* `AlphabetLetter` & `ReadingDrill`: Harf kartlarının (büyük/küçük harf, okunuş ipucu, fonetik kural, detaylı telaffuz açıklaması, örnek kelimeler, yaygın hatalar) ve okuma pratiklerinin tip yapısını belirler.
* `WordDetail` & `DialogueLine`: Kelimelerin seviye bilgisi, Türkçe anlamı, okunuşu ve kullanım notları ile diyaloglardaki konuşmacı repliklerini modeller.
* `SmesharikiScene` & `SmesharikiQuestion`: Çizgi dizi tabanlı interaktif alıştırma sahnelerini, dinamik şık karıştırma fonksiyonlarını ve anlama sorularını tanımlar.
* `UnitModule`: Ünitenin numarasını, seviye grubunu (A1, A2, B1...), renk temasını, ikonunu, dilbilgisi kurallarını ve kelime/cümle listelerini bir arada tutan ana modül yapısıdır.

### **B. Veri Yapıları (Data Arrays)**
* `ALPHABET_LESSONS`: 8 ana fonetik üniteden oluşur (33 harf). Her harf kartı kalıcı öğrenme hedefiyle **sade bir yapıya** indirgenmiştir — uzun cümleler ve yoğun metinler yoktur: `Harf → Ses ipucu (soundHint) → Net fonetik kural (phoneticRule) → 1-2 temel örnek kelime (examples)`. Vurgu kuralları (O->A, E->İ), patlamalı ünsüzler, vızıltılı/ıslıklı sesler, iyotlu harfler (Ё, Ю, Я) ve özel yumuşatma/sertleştirme işaretleri (Ь, Ъ, Ы, Э) kategorize edilmiştir.
* `PATH` (`App.tsx`): **Tek müfredat yolu.** "Aşama 1/2/3" gruplandırması yoktur; alfabe (8) + dinleme konuları (188) + müfredat üniteleri (183) tek bir sıralı çizgi üzerinde **Ünite 1 → Ünite 384** olarak akar ve her kart bir önceki bitince açılır. Ön-hazırlık dinleme konuları, ilgili ünitenin **hemen öncesine** yerleştirilir; her 10. müfredat ünitesinin ardından bir **📖 Hikaye Kontrol Noktası** kartı gelir. Haritadaki tüm kartlar aynı renkli ünite kartı tasarımını kullanır; seviye etiketleri (A1, A2, B1, B2, C1/C2) `LEVEL_COLORS` ile renklendirilir.
* `ALL_ALPHA_LETTERS`: Tüm alfabe harflerini tek bir düz listede toplayarak hızlı erişim sağlar.
* `UNITS_DATA`: Gündelik yaşam senaryolarına dayalı üniteleri barındırır. Kelimeler, cümle kurma bulmacaları, diyaloglar ve test soruları bu dizi içinde organize edilmiştir.
* `UNITS_DATA` artık `src/curriculumData.ts` içindeki **tek kaynak**dır (**233+ ünite**, A1→C1/C2; **Genişleme Paketi 50** (`src/extraUnits/expansion50a/b/c.ts`) her seviyeye 10'ar yeni ünite ekler — A1: renkler/vücut/yiyecek/ev/günler/meslek/hayvan/duygu/şehir/içecek; A2: eczane/kuaför/spor/sinema/tren/otel/postane/misafirlik/bayram/piknik; B1: CV/ofis/araba/tamirci/telefon/sosyal medya/kütüphane/konser/kamp/acil durum; B2: hastane/hukuk/startup/pazarlama/sunum/çevre/psikoloji/tadilat/spor/medya; C1: diplomasi/borsa/bilim/edebiyat/felsefe/tıp/mahkeme/sanat/yapay zekâ/kriz yönetimi — kesirli ünite numaralarıyla (10.x, 40.x, 95.x, 143.x, 180.x) kendi seviye bölgelerine yerleşir ve hikaye kontrol noktalarını bozmaz; bunun 31'i "İlişkiler & Flört", 40'ı A2'den C1'e uzanan "Aşçılık" müfredatı (mutfak eşyaları → malzemeler → teknikler → tarifler → profesyonel mutfak; diyaloglar «Ван Гог» kadrosuyla); A1 sonuna eklenen 5 gramer ünitesi ben/benim/benimki/bende zincirini ve cümle çözme anahtarını öğretir; iş hayatı, ticaret, emlak, banka, gündelik yaşam ve tanışma/yürüme genişleme paketleri `src/extraUnits/` altındadır). Her ünitenin banner'ında `public/unit-art/{unitId}.jpg` yolundaki AI üretimi konu görseli gösterilir; görsel yoksa ikonlu banner'a otomatik dönülür. Hem ana uygulama hem dinleme modülü bu dosyayı kullanır — seviyeler arası hiçbir format farkı yoktur, yalnızca zorluk artar.
* `storyModule/` (`src/storyModule/`): **Hikaye & Özet modülü.** `storyData.ts` **13 hikayeyi** tutar: 8 kontrol noktası hikayesi (ünite 10, 20, ... 80) + **5 BÖLÜM FİNALİ** (ünite 11, 41, 96, 144, 183 — A1/A2/B1/B2/C1 sonları). Hikayeler iki tarzdır: HIMYM çerçevesi (Dima 2035'te çocuklarına anlatır; pilot bölümdeki sarı şemsiye, dizi finalinde çözülür) ve «Кухня» esinli mutfak komedileri («Ван Гог» restoranı: Şef Pyotr, garson Lyosha, Nina, Semyon) + bir crossover bölümü. Tekrarlayan kadro `STORY_CAST`'tedir; hikaye başına en fazla 3 yeni kelime, anahtar noktalar, yanlış-anlama dedektörleri ve **ESKİ kelimeler tekrar listesi** (`recycleWords` — önceki bölümlerin kelimeleri B finallerinde bilerek tekrar edilir) bulunur. Hikaye ekranı video ya da sahne görseli yerine yalnızca konuşma metnine odaklanır. **Bölüm finalleri KAPILIDIR**: özet %100 + Seviye Tekrar Sınavı (10 soru: 6'sı bitirilen bölümden + 4'ü önceki bölümlerden, ≥7/10) geçilmeden sonraki bölümün hiçbir kartı açılmaz (`gateStoryForUnitNumber`). `summaryEvaluation.ts` Türkçe özeti **yerel, deterministik** bir anahtar-kelime motoruyla analiz eder (normalizasyon, Türkçe karakter katlaması, çok kelimeli öbekler, yanıltıcı ifadeler tespiti; skor = yakalanan/toplam ana nokta). API: `storyForCheckpoint`, `storyTriggeredAtUnit`, `gateStoryForUnitNumber`, `isStoryUnlocked`, `nextPendingStory`, `evaluateTurkishSummary`. Üst bardaki **"🕸️ Hikaye Bağları"** butonu, 13 hikayenin hangi kol (HIMYM çerçevesi / «Ван Гог» restoranı), karakter, mekân ve motiflerle birbirine bağlandığını gösteren ayrı bir bağlantı haritası ekranı açar — bu ekranda bilerek hiçbir özet/olay örgüsü yer almaz.
* `TOPICS_100` (`src/topics100/`): "Kulağı Alıştır" bölümünün veri modülü. Tüm 188 konu **`UNITS_DATA`'dan türetilir** (`derive.ts`): 33 harf konusu (harfi içeren **A1/A2 öncelikli, kolaydan zora** kelimeler + SADECE A1 ünitelerinden kısa cümle/diyalog satırları — alfabe aşamasında dinlendiği için B2/C1 içerik bu konulara girmez; ince harfler için `letterNotes.ts` içindeki tamamlayıcı kelime tablosu), 8 fonetik konusu (2 hece pratiği + akanje, ikanje, sonda sedasızlaşma, yumuşatma, iyotlaşma, vurgu kuralları) ve 147 müfredat ön-hazırlık konusu (B1/B2/C1 ünitelerinin kelimeleri/cümleleri/diyaloğu birebir). Konu sayıları `UNITS_DATA`'dan hesaplandığı için müfredat büyüse bile otomatik güncellenir. Her konu; `items` (kelime kartları), `sentences` (cümleler) ve `dialogue` (sahne/diyalog) bloklarını — yani ünitelerle BİREBİR aynı veri formatını — içerir ve `unitId`/`level` alanlarıyla örneklerin geldiği ünitelere gerçek bağlantı taşır. Test soruları `buildTopicDrills` ile deterministik üretilir (5 soru: kelime dinleme + harf konularında harf sesi + başka bir konudan gelen karışık tekrar sorusu).

---

## 📱 Uygulama Nasıl Kullanılır?

1. **🗺️ Öğrenme Yolu — Ünite 1'den 384'e Tek Sıra:** Haritada "Aşama 1/2/3" gruplandırması yoktur; alfabe üniteleri (1-8), cümle temelleri + harf/fonetik dinleme konuları ve müfredat üniteleri + ön-hazırlık dinleme konuları (384'e kadar) tek bir çizgi üzerinde sıralanır; her 10. müfredat ünitesinin hemen ardından renkli bir **hikaye kontrol noktası** kartı göreceksiniz. Her kartın seviye etiketi (A1→C1/C2) ve renkli ikonu vardır; her kart bir önceki bitince açılır. Üstteki seviye çipleri (A1, A2, B1, B2, C1/C2) sizi yol içinde ilgili seviyenin ilk kartına kaydırır; **"🔊 Ses Testi"** butonu TTS sesinin çalıştığını anında doğrular.
2. **🔤 Alfabe Üniteleri (ilk 16 ders, 33 harf) + 📖 Okuma Pratiği (60 tematik ders):** Harf kartları sade yapıdadır — büyük harf, ses ipucu, net fonetik kural ve yanında 🔊 ile 1-2 temel örnek kelime. Her harften sonra anlık tanıma testi, bölüm sonunda *Reading Drills (Okuma Tatbikatları)* ve alfabe sınavı gelir. **33 harfin tamamı ilk 16 derste biter**; sayılar/aylar/renkler/menü/tabela/hız turları gibi tematik okuma dersleri alfabe DEĞİLDİR — bunlar "📖 OKUMA PRATİĞİ" etiketiyle **müfredat ünitelerinin arasına** (her 3 ünitede bir) serpiştirilir, yolun başına yığılmaz.
3. **🎧 Kulağı Alıştır: 188 Dinleme Konusu (yolun içinde):** Her harf konusu, o harfi öğreten **alfabe dersinin hemen ARDINDAN** gelir (önce harfi öğren, sonra kulağını alıştır — henüz öğrenmediğin harfin/ileri seviye kelimenin konusu öne gelmez); 2 hece pratiği konusu tüm harfler bittikten hemen sonra gelir; alfabe + hecelerin ARDINDAN **cümle temelleri paketi** (🔢 Sayılar 0-20 ve 20-1000, zamanlar, özne/yüklem, edatlar) yerleşir — dilin iskeleti kurulmadan ileri dinleme kuralı konusu (akanje, ikanje, sedasızlaşma...) gelmez; bu 6 fonetik kural konusu temellerden sonra sıralanır; 147 müfredat ön-hazırlık konusu ilgili ünitenin hemen öncesine yerleşir. Cümle yoğunluğu düşüktür: her konu **kelime kartları odaklıdır** (tek tek 🔊 + seviye etiketli, en fazla 2 cümle + 2 diyalog satırı), "Konuyu Dinle" / "Yavaşça Dinle" TTS butonları ve 5 soruluk **"dinle & seç"** sınavıyla biter (son soru başka bir konudan gelir; geçersen kelimeler Aralıklı Tekrar havuzuna eklenir ve yoldaki sıradaki ünite açılır).
4. **📚 Müfredat Üniteleri (183 ünite, A1→C1/C2):** Kelime kartlarını çalışın, dilbilgisi açıklamalarını okuyun, dizi sahnelerini dinleyin ve kelime sıralama / cümle kurma / dinleme alıştırmalarını tamamlayın. Ünite bitiş sınavı geçilince (A2+ için hikaye Türkçeleştirme sınavında %85 barajıyla) yoldaki sıradaki kart açılır. İlişkiler/flört/manitacılık temalı içerik iki katına çıkarıldı: sokakta/kafede/spor salonunda/barda/kulüpte/uçakta tanışma ve ilk adım, flört & tanışma, randevu teklifi, ilk buluşma, sevgi sözcükleri, ileri flört, tartışma & barışma, Sevgililer Günü, birlikte yaşamak, evlilik teklifi, uzun mesafe, tanışma uygulaması, evlilikte kriz, boşanma ve düğün konuşması — hepsi HIMYM tadında absürt durum komedisi ve eğlenceli karakter dinamikleriyle yazıldı.
4. **📖 Hikaye & Özet Modülü (10'luk kontrol noktaları + bölüm finalleri):** Her 10. müfredat ünitesinde bir kontrol noktası hikayesi açılır; her BÖLÜMÜN sonunda (A1→ünite 11, A2→41, B1→96, B2→144, C1/C2→183) ise bir **BÖLÜM FİNALİ** açılır. Hikayeler son öğrenilen kelimelerle yazılmıştır ve içinde en fazla **3 yeni kelime** vardır (anlamları sözlük kartlarında). İki anlatı tarzı vardır: **HIMYM çerçevesi** (2035'te Dima çocuklarına "annelerinizle nasıl tanıştım"ı anlatır — pilot bölümdeki sarı şemsiyenin sırrı, dizi finali «Настоящая история»da çözülür!) ve **«Кухня» tarzı mutfak komedileri** («Ван Гог» restoranı: bağıran ama altın kalpli Şef Pyotr, şansız garson Lyosha, kuralcı Nina, metrdotel Semyon); B1 finali bir crossover bölümüdür. Hikayeyi satır satır okur (çevirilere dokunarak açar, 🔊 dinler, "🎧 Hikayeyi Dinle / Yavaşça Dinle" kullanır), yeni kelimeleri sözlük kartlarından, önceki bölümlerden gelen **eski kelimeleri** "🔁 Eski Kelimeler" bölümünden tekrar eder. Sonra **Türkçe özetinizi yazarsınız**: analiz motoru **"X doğru nokta var, Y eksik/yanlış anlaşılan yer var"** biçiminde yapıcı geri bildirim verir (ipuçları cevabı ifşa etmez). **Bölüm finallerinde kapı kuralı** vardır: özet TAMAMEN doğru olmalı (tüm ana noktalar + sıfır yanlış anlama) VE 10 soruluk Seviye Tekrar Sınavı'ndan (6 soru bitirilen bölümden + 4 soru önceki bölümlerden — A kelimeleri B'de geri döner) en az 7/10 alınmalıdır; aksi halde **sonraki bölümün tüm kartları kilitli kalır**. Kontrol noktası hikayeleri ise isteğe bağlıdır (skorsuz da tamamlanabilir).

4. **Smeshariki İnteraktif Dinleme Modülü:** Çizgi dizi diyaloglarını takip edin, sahne anlama sorularını yanıtlayın ve entegre arama sorguları üzerinden gerçek ses dinlemeleri gerçekleştirin.
5. **🍳 Кухня (Kitchen) Sahne Modülü:** İlk Buluşma (ünite 30), Evlilik Teklifi (ünite 52) ve Düğün Konuşması (ünite 73) ünitelerinde «Кухня» dizisinden esinlenilmiş sahneler açılır: AI ile yazılmış benzer sahne diyalogları, AI ile üretilmiş telifsiz sahne görselleri, "bu tarz gerçek sahneyi izle" YouTube bağlantıları ve sahne anlama soruları. (Video dosyaları telif nedeniyle uygulamaya gömülmez; aynı tarz orijinal sahneler YouTube arama linkiyle açılır.)

---

## 🚀 Uygulama Bilgisayarda Nasıl Çalıştırılır? (Kurulum Rehberi)

Projenizi kendi yerel ortamınızda çalıştırmak için aşağıdaki adımları sırasıyla uygulayın:

### Ön Gereksinimler
* Bilgisayarınızda **Node.js** (v18.0.0 veya üzeri) ve **npm** (veya **yarn**) yüklü olmalıdır.  
  *(Yüklü olup olmadığını kontrol etmek için terminale `node -v` yazabilirsiniz.)*

### Kurulum Adımları

1. **Depoyu bilgisayarınıza indirin / klonlayın:**
   ```bash
   git clone https://github.com/yurdakulaykut16-oss/dilkoc-project-1-.git
   cd dilkoc-project-1-
   ```
2. **Frontend paketlerini kurun:**
   ```bash
   npm install
   ```
3. **Her şeyi tek komutla başlatın:**
   ```bash
   npm run dev
   ```

İlk `npm run dev` çalıştırması VoiceStudio Python paketleri ve OmniVoice modeli nedeniyle uzun sürebilir. Kurulum ilerlemesi terminalde görünür; manuel Python ortamı, ayrı VoiceStudio terminali veya ek `git clone` gerekmez. Vite'ın yazdırdığı adresi tarayıcıda açarak uygulamayı kullanabilirsiniz. `npm run dev:vite` yalnızca VoiceStudio kurulmadan frontend'i açan düşük özellikli geliştirme komutudur.

---

## 📱 Android Uygulamasını İndir

Uygulamanın Android APK sürümünü doğrudan telefonunuza indirebilirsiniz:

📲 **[DilKoç Android APK'yı Doğrudan İndir](https://github.com/yurdakulaykut16-oss/dilkoc-project-1-/releases/download/v1.0.0/Rusca.apk)**

---

# 📜 Lisans ve Teşekkür
Geliştirici: Aykut Yurdakul

Yapay Zeka Destekçisi: İçerik kurgusu ve müfredat yapısında Claude (Anthropic) modelinden yararlanılmıştır.

# 🇷🇺 Rusça Öğrenme ve Dil Koçu Platformu (A1 - A2)

Bu proje, Rusça öğrenmek isteyen kullanıcılara Kiril alfabesinden başlayarak A1 ve A2 seviyelerinde akıcı iletişim kurmaya kadar rehberlik eden **interaktif bir dil öğrenme ve pekiştirme platformudur**.

> **Not:** Bu projenin kurgulanmasında, Kiril alfabesi ders içeriklerinin hazırlanmasında ve interaktif öğrenme mimarisinin oluşturulmasında **Claude** yapay zeka modelinden faydalanılmıştır.

---

## 🎯 Projenin Amacı ve Kazanımları

Bu uygulamayı düzenli olarak takip eden bir öğrenci aşağıdaki **kazanımları** elde eder:

* **33 Harflik Kiril Alfabesi Hâkimiyeti:** Rus alfabesindeki tüm harfleri okuma, yazma, Türkçe fonetik karşılıklarıyla tanıma ve telaffuz etme.
* **Fonetik ve Vurgu Kuralları:** Rusçadaki *Akanje* (vurgusuz 'O' harfinin 'A' okunması), *Ikanje* (vurgusuz 'E' harfinin 'İ' okunması) ve kelime sonu ünsüz sedasızlaşması kurallarını kavrama.
* **A1 & A2 Seviye Gramer ve Kelime Dağarcığı:** Günlük yaşamda en çok kullanılan +500 kelimeyi ve temel dilbilgisi kalıplarını öğrenme.
* **Gerçek Hayat Senaryoları:** Tanışma, Aile, Kafe & Restoranda Sipariş, Şehir Ulaşımı & Yön Sorma, Sayılar & Zaman, Hava Durumu, Alışveriş & Pazarlık, Telefon Görüşmeleri, Ev Eşyaları ve Randevu Alma gibi 10+ tematik ünitede pratik yapma.
* **Anlaşılır Girdi (Comprehensible Input) ile Dinleme:** Popüler Rus çizgi dizisi *Smeshariki (Смешарики)* karakterlerinden esinlenilmiş özel diyaloglar sayesinde doğal konuşma dilini anlama ve dinlediğini kavrama yeteneği kazanma.

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
* `PATH` (`App.tsx`): **Tek müfredat yolu.** "Aşama 1/2/3" gruplandırması yoktur; alfabe (8) + dinleme konuları (110) + müfredat üniteleri (82) tek bir sıralı çizgi üzerinde **Ünite 1 → Ünite 200** olarak akar ve her kart bir önceki bitince açılır. Ön-hazırlık dinleme konuları, ilgili ünitenin **hemen öncesine** yerleştirilir; her 10. müfredat ünitesinin ardından bir **📖 Hikaye Kontrol Noktası** kartı gelir. Haritadaki tüm kartlar aynı renkli ünite kartı tasarımını kullanır; seviye etiketleri (A1, A2, B1, B2, C1/C2) `LEVEL_COLORS` ile renklendirilir.
* `ALL_ALPHA_LETTERS`: Tüm alfabe harflerini tek bir düz listede toplayarak hızlı erişim sağlar.
* `UNITS_DATA`: Gündelik yaşam senaryolarına dayalı üniteleri barındırır. Kelimeler, cümle kurma bulmacaları, diyaloglar ve test soruları bu dizi içinde organize edilmiştir.
* `UNITS_DATA` artık `src/curriculumData.ts` içindeki **tek kaynak**dır (**82 ünite**, A1→C1/C2; bunun 15'i "İlişkiler & Flört" temalı). Hem ana uygulama hem dinleme modülü bu dosyayı kullanır — seviyeler arası hiçbir format farkı yoktur, yalnızca zorluk artar.
* `storyModule/` (`src/storyModule/`): **Hikaye & Özet modülü.** `storyData.ts` 8 hikayeyi (ünite 10, 20, ... 80 kontrol noktaları), tekrarlayan kadroyu (`STORY_CAST`) ve hikaye başına 6 yeni kelime + anahtar noktaları tutar; `summaryEvaluation.ts` Türkçe özeti **yerel, deterministik** bir anahtar-kelime motoruyla analiz eder (normalizasyon, Türkçe karakter katlaması, çok kelimeli öbekler, yanıltıcı ifadeler tespiti; skor = yakalanan/ toplam ana nokta). API: `storyForCheckpoint`, `isStoryUnlocked`, `nextPendingStory`, `checkpointForUnitNumber`, `evaluateTurkishSummary`.
* `TOPICS_100` (`src/topics100/`): "Kulağı Alıştır" bölümünün veri modülü. Tüm 110 konu **`UNITS_DATA`'dan türetilir** (`derive.ts`): 33 harf konusu (harfi içeren B1-C2 öncelikli kelimeler + ünite cümleleri + diyalog satırları; ince harfler için `letterNotes.ts` içindeki tamamlayıcı kelime tablosu), 8 fonetik konusu (2 hece pratiği + akanje, ikanje, sonda sedasızlaşma, yumuşatma, iyotlaşma, vurgu kuralları) ve 69 müfredat ön-hazırlık konusu (B1/B2/C1 ünitelerinin kelimeleri/cümleleri/diyaloğu birebir). Konu sayıları `UNITS_DATA`'dan hesaplandığı için müfredat büyüse bile otomatik güncellenir. Her konu; `items` (kelime kartları), `sentences` (cümleler) ve `dialogue` (sahne/diyalog) bloklarını — yani ünitelerle BİREBİR aynı veri formatını — içerir ve `unitId`/`level` alanlarıyla örneklerin geldiği ünitelere gerçek bağlantı taşır. Test soruları `buildTopicDrills` ile deterministik üretilir (5 soru: kelime dinleme + harf konularında harf sesi + başka bir konudan gelen karışık tekrar sorusu).

---

## 📱 Uygulama Nasıl Kullanılır?

1. **🗺️ Öğrenme Yolu — Ünite 1'den 200'e Tek Sıra:** Haritada "Aşama 1/2/3" gruplandırması yoktur; alfabe üniteleri (1-8), harf/fonetik dinleme konuları (9-49) ve müfredat üniteleri + ön-hazırlık dinleme konuları (50-200) tek bir çizgi üzerinde sıralanır; her 10. müfredat ünitesinin hemen ardından renkli bir **hikaye kontrol noktası** kartı göreceksiniz. Her kartın seviye etiketi (A1→C1/C2) ve renkli ikonu vardır; her kart bir önceki bitince açılır. Üstteki seviye çipleri (A1, A2, B1, B2, C1/C2) sizi yol içinde ilgili seviyenin ilk kartına kaydırır; **"🔊 Ses Testi"** butonu TTS sesinin çalıştığını anında doğrular.
2. **🔤 Alfabe Üniteleri (Ünite 1-8, 33 harf):** Harf kartları sade yapıdadır — büyük harf, ses ipucu, net fonetik kural ve yanında 🔊 ile 1-2 temel örnek kelime. Her harften sonra anlık tanıma testi, bölüm sonunda *Reading Drills (Okuma Tatbikatları)* ve alfabe sınavı gelir.
3. **🎧 Kulağı Alıştır: 110 Dinleme Konusu (yolun içinde):** 33 harf + 8 fonetik konusu alfabe ünitelerinin hemen ardından; 69 müfredat ön-hazırlık konusu ilgili ünitenin hemen öncesine yerleşir. Cümle yoğunluğu düşüktür: her konu **kelime kartları odaklıdır** (tek tek 🔊 + seviye etiketli, en fazla 2 cümle + 2 diyalog satırı), "Konuyu Dinle" / "Yavaşça Dinle" TTS butonları ve 5 soruluk **"dinle & seç"** sınavıyla biter (son soru başka bir konudan gelir; geçersen kelimeler Aralıklı Tekrar havuzuna eklenir ve yoldaki sıradaki ünite açılır).
4. **📚 Müfredat Üniteleri (82 ünite, A1→C1/C2):** Kelime kartlarını çalışın, dilbilgisi açıklamalarını okuyun, dizi sahnelerini dinleyin ve kelime sıralama / cümle kurma / dinleme alıştırmalarını tamamlayın. Ünite bitiş sınavı geçilince (A2+ için hikaye Türkçeleştirme sınavında %85 barajıyla) yoldaki sıradaki kart açılır. İlişkiler/flört/manitacılık temalı içerik iki katına çıkarıldı: flört & tanışma, randevu teklifi, ilk buluşma, sevgi sözcükleri, ileri flört, tartışma & barışma, Sevgililer Günü, birlikte yaşamak, evlilik teklifi, uzun mesafe, tanışma uygulaması, evlilikte kriz, boşanma ve düğün konuşması — hepsi HIMYM tadında absürt durum komedisi ve eğlenceli karakter dinamikleriyle yazıldı.
4. **📖 Hikaye & Özet Modülü (her 10 ünitede bir):** 10. müfredat ünitesini tamamladığınızda hikaye modülü otomatik açılır: son 10 ünitede öğrendiğiniz kelimelerle yazılmış, içinde en fazla **5-6 yeni kelime** barındıran bir Rusça sit-com hikayesi. Yeni kelimelerin Türkçe anlamları hikayenin altındaki **sözlük kartlarında** verilir. Hikayeyi satır satır okur (istediğiniz satırın çevirisini dokunarak açar, 🔊 ile dinlersiniz), sonra **Türkçe özetinizi yazarsınız**; analiz motoru özeti hikayenin ana noktalarıyla karşılaştırıp **"X doğru nokta var, Y eksik/yanlış anlaşılan yer var"** biçiminde yapıcı geri bildirim verir (ipuçları, yanlış anlaşılma uyarıları, skor). Hikayeler 2035'te Dima'nın çocuklarına "annelerinizle nasıl tanıştım"ı anlatması çerçevesinde ilerler — yani How I Met Your Mother tarzı bir anlatı.
4. **Smeshariki İnteraktif Dinleme Modülü:** Çizgi dizi diyaloglarını takip edin, sahne anlama sorularını yanıtlayın ve entegre arama sorguları üzerinden gerçek ses dinlemeleri gerçekleştirin.

---

## 🚀 Uygulama Bilgisayarda Nasıl Çalıştırılır? (Kurulum Rehberi)

Projenizi kendi yerel ortamınızda çalıştırmak için aşağıdaki adımları sırasıyla uygulayın:

### Ön Gereksinimler
* Bilgisayarınızda **Node.js** (v18.0.0 veya üzeri) ve **npm** (veya **yarn**) yüklü olmalıdır.  
  *(Yüklü olup olmadığını kontrol etmek için terminale `node -v` yazabilirsiniz.)*

### Kurulum Adımları

1. **Depoyu Bilgisayarınıza İndirin / Klonlayın:**
   ```bash
   git clone [https://github.com/KULLANICI_ADINIZ/dilkoc-project.git](https://github.com/KULLANICI_ADINIZ/dilkoc-project.git)
   cd dilkoc-project
   
2. **Gerekli Bağımlılıkları (Paketleri) Yükleyin:**
     npm install
   
4. **Geliştirici Sunucusunu Başlatın:**
   npm run dev
   
6. **Tarayıcıda Görüntüleyin:**
   Terminalde belirtilen adresi internet tarayıcınızda açarak uygulamayı kullanmaya başlayabilirsiniz.

---

## 📱 Android Uygulamasını İndir

Uygulamanın Android APK sürümünü doğrudan telefonunuza indirebilirsiniz:

📲 **[DilKoç Android APK'yı Doğrudan İndir](https://github.com/yurdakulaykut16-oss/dilkoc-project-1-/releases/download/v1.0.0/Rusca.apk)**

---

# 📜 Lisans ve Teşekkür
Geliştirici: Aykut Yurdakul

Yapay Zeka Destekçisi: İçerik kurgusu ve müfredat yapısında Claude (Anthropic) modelinden yararlanılmıştır.

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
* `ALPHABET_LESSONS`: 8 ana fonetik üniteden oluşur. Vurgu kuralları (O->A, E->İ), patlamalı ünsüzler, vızıltılı/ıslıklı sesler, iyotlu harfler (Ё, Ю, Я) ve özel yumuşatma/sertleştirme işaretleri (Ь, Ъ, Ы, Э) detaylıca kategorize edilmiştir.
* `ALL_ALPHA_LETTERS`: Tüm alfabe harflerini tek bir düz listede toplayarak hızlı erişim sağlar.
* `UNITS_DATA`: Gündelik yaşam senaryolarına dayalı üniteleri barındırır. Kelimeler, cümle kurma bulmacaları, diyaloglar ve test soruları bu dizi içinde organize edilmiştir.
* `UNITS_DATA` artık `src/curriculumData.ts` içindeki **tek kaynak**dır (72 ünite, A1→C1/C2). Hem ana uygulama hem "100 Konu" modülü bu dosyayı kullanır — seviyeler arası hiçbir format farkı yoktur, yalnızca zorluk artar.
* `TOPICS_100` (`src/topics100/`): "Kulağı Alıştır" bölümünün veri modülü. Tüm 100 konu **`UNITS_DATA`'dan türetilir** (`derive.ts`): 33 harf konusu (harfi içeren B1-C2 öncelikli kelimeler + ünite cümleleri + diyalog satırları; ince harfler için `letterNotes.ts` içindeki tamamlayıcı kelime tablosu), 8 fonetik konusu (2 hece pratiği + akanje, ikanje, sonda sedasızlaşma, yumuşatma, iyotlaşma, vurgu kuralları) ve 59 müfredat ön-hazırlık konusu (5 A2 + 22 B1 + 17 B2 + 15 C1/C2 ünitesinin kelimeleri/cümleleri/diyaloğu birebir). Her konu; `items` (kelime kartları), `sentences` (cümleler) ve `dialogue` (sahne/diyalog) bloklarını — yani ünitelerle BİREBİR aynı veri formatını — içerir ve `unitId`/`level` alanlarıyla örneklerin geldiği ünitelere gerçek bağlantı taşır. Test soruları `buildTopicDrills` ile deterministik üretilir (5 soru: kelime dinleme + harf konularında harf sesi + başka bir konudan gelen karışık tekrar sorusu).

---

## 📱 Uygulama Nasıl Kullanılır?

1. **Kiril Alfabesi Sekmesi:** Harf kartlarına tıklayarak okunuş ipuçlarını, telaffuz kurallarını ve örnek kelimeleri inceleyin. Bölüm sonlarındaki *Reading Drills (Okuma Tatbikatları)* ile okuma pratiği yapın.
2. **🎧 Kulağı Alıştır: 100 Konu (AŞAMA 2):** 100 konuluk sesli dinleme bölümü — 33 harf (örnekler doğrudan müfredat ünitelerinden), 8 fonetik (hece + ses kuralları) ve 59 müfredat ön-hazırlık konusu (A2→C1/C2 ünitelerinin sesli hali). Her konuda: kelimeler tek tek 🔊 (seviye etiketli), cümleler ve diyalog/sahne blokları (ünitelerle aynı format), "Konuyu Dinle" (normal tempo) ve "Yavaşça Dinle" (yavaş tempo) Rusça TTS dinlemeleri, ardından 5 soruluk **"dinle & seç"** kulağı sınavı (son soru başka bir konudan gelir; geçersen konunun kelimeleri otomatik Aralıklı Tekrar havuzuna eklenir). Müfredat ön-hazırlık konularından doğrudan ilgili üniteye sıçrayabilirsiniz. Haritadaki **"🔊 Ses Testi"** butonu TTS sesinin çalıştığını anında doğrular.
3. **Ünite Müfredatı (72 ünite, A1→C1/C2):** Üniteler seviyeye göre gruplanır (A1, A2, B1, B2, C1/C2) ve sırayla açılır: bir seviye, bir önceki seviyenin tüm üniteleri bitince açılır. Üstteki seviye sekmelerine tıklayarak ilgili seviyeye atlayabilirsiniz. Kelime kartlarını çalışın, dilbilgisi açıklamalarını okuyun ve kelime sıralama / cümle kurma alıştırmalarını tamamlayın.
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

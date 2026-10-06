import type { UnitModule } from '../../curriculumData';
import { makeCitUnit, type CitWord, type CitLine } from '../citizenship/makeCitUnit';

/**
 * Birleşik Krallık senaryoları şu resmî kaynaklardaki başvuru alanları ve
 * değerlendirme ölçütlerinden hazırlanmıştır (erişim: 3 Ekim 2026):
 * gov.uk/standard-visitor/apply-standard-visitor-visa
 * gov.uk/guidance/immigration-rules/immigration-rules-appendix-v-visitor
 * gov.uk/government/publications/student-route-caseworker-guidance/student-and-child-student-accessible
 * gov.uk/government/publications/relationship-with-a-partner
 * gov.uk/government/publications/form-an-guidance
 * Bunlar sızdırılmış/sabit soru listeleri değil, gerçeğe uygun dil alıştırmalarıdır.
 */

type Level = UnitModule['levelGroup'];
type Exchange = readonly [q: string, qRead: string, qTr: string, a: string, aRead: string, aTr: string];
type Spec = readonly [id: string, level: Level, icon: string, title: string, desc: string, words: CitWord[], exchanges: readonly Exchange[], note?: string];

const VISA = 'Birleşik Krallık Vize Mülakatı';
const CIT = 'Britanya Vatandaşlık Başvurusu';
const DISCLAIMER = '⚠️ Birleşik Krallık makamları her başvuranda mülakat yapmaz ve resmî, değişmez bir soru listesi yayımlamaz. Bu ünite, başvuru formunda istenen bilgiler ile UKVI değerlendirme ölçütlerine dayalı olası soru-cevap pratiğidir. Yanıtlarınız daima formunuz ve belgelerinizle doğru ve tutarlı olmalıdır.';

function build(spec: Spec, index: number): UnitModule {
  const [id, level, icon, title, desc, words, exchanges, note] = spec;
  const dlg: CitLine[] = exchanges.flatMap(([q, qRead, qTr, a, aRead, aTr]) => [
    ['UKVI Officer', q, qRead, qTr],
    ['Applicant', a, aRead, aTr],
  ]);
  return makeCitUnit({
    id,
    unitNumber: 700 + index,
    level,
    icon,
    title,
    desc,
    category: index < 25 ? VISA : CIT,
    color: index < 25 ? '#2563eb' : '#7c3aed',
    grammar: `${DISCLAIMER}\n📌 ${note ?? 'Soruyu kısa, doğrudan ve başvurudaki bilgilerle aynı biçimde yanıtlayın. Bilmediğiniz ayrıntıyı tahmin etmeyin.'}`,
    words,
    sents: exchanges.map((e) => [e[3], e[5]]),
    dlg,
  });
}

const SPECS: readonly Spec[] = [
  ['en_int_01', 'A2', '🪪', 'Mülakatta Kimlik: Tam Ad', 'Pasaporttaki ad, önceki adlar ve yazılış kontrolü', [
    ['full legal name', 'FUL Lİİgıl NEYM', 'resmî tam ad', 'Pasaporttaki eksiksiz addır.'], ['surname', 'SÖRneym', 'soyadı', 'Family name ile aynıdır.'], ['given name', 'GİVın NEYM', 'ad', 'First name olarak da geçer.'], ['previous name', 'PRİİviyıs NEYM', 'önceki ad/soyadı', 'Değişiklik varsa belgeyle açıklanır.'],
  ], [
    ['What is your full legal name?', 'UOT iz yor FUL Lİİgıl NEYM?', 'Resmî tam adınız nedir?', 'My full legal name is Deniz Kaya.', 'may FUL Lİİgıl NEYM iz deNİZ kaYA.', 'Resmî tam adım Deniz Kaya.'],
    ['Have you ever used another name?', 'HEV yu EVır YUUZD ınADır NEYM?', 'Daha önce başka bir ad kullandınız mı?', 'Yes. My previous surname was Demir.', 'YES. may PRİİviyıs SÖRneym woz deMİR.', 'Evet. Önceki soyadım Demir’di.'],
  ]],
  ['en_int_02', 'A2', '🎂', 'Doğum Tarihi ve Doğum Yeri', 'Kimlik doğrulamasında tarih ve şehir söyleme', [
    ['date of birth', 'DEYT ov BÖRTH', 'doğum tarihi', 'Day-month-year biçimini net söyleyin.'], ['place of birth', 'PLEYS ov BÖRTH', 'doğum yeri', 'Şehir ve ülke sorulabilir.'], ['birth certificate', 'BÖRTH sertifiKEYT', 'doğum belgesi', 'Kimlik ve soy bağını gösterebilir.'], ['to verify', 'VERifay', 'doğrulamak', 'Bilgiyi belgeyle kontrol etmek.'],
  ], [
    ['What is your date of birth?', 'UOT iz yor DEYT ov BÖRTH?', 'Doğum tarihiniz nedir?', 'I was born on the twelfth of May, nineteen ninety.', 'ay woz BORN on dı TUELFTH ov MEY, naynTİİN NAYNti.', '12 Mayıs 1990’da doğdum.'],
    ['Where were you born?', 'UEIR wör yu BORN?', 'Nerede doğdunuz?', 'I was born in Bursa, Turkey.', 'ay woz BORN in BURsa, TÖRki.', 'Bursa, Türkiye’de doğdum.'],
  ]],
  ['en_int_03', 'A2', '🌍', 'Uyruk ve Pasaportlar', 'Mevcut ve önceki vatandaşlıklarla seyahat belgeleri', [
    ['nationality', 'neşıNALıti', 'uyruk', 'Başvuru formundaki vatandaşlıktır.'], ['citizenship', 'SİTızınşip', 'vatandaşlık', 'Hukuki vatandaşlık bağıdır.'], ['passport number', 'PASport NAMbır', 'pasaport numarası', 'Belgedeki harf ve rakamlarla okunur.'], ['dual national', 'DYUUıl NEŞınıl', 'çifte vatandaş', 'İki vatandaşlığa sahip kişi.'],
  ], [
    ['What is your current nationality?', 'UOT iz yor KARınt neşıNALıti?', 'Mevcut uyruğunuz nedir?', 'I am a Turkish citizen.', 'ay em ı TÖRkiş SİTızın.', 'Türk vatandaşıyım.'],
    ['Do you hold any other passports?', 'du yu HOULD eni ADır PASports?', 'Başka pasaportunuz var mı?', 'No, this is my only passport.', 'NOU, dis iz may OUNli PASport.', 'Hayır, bu tek pasaportum.'],
  ]],
  ['en_int_04', 'A2', '🏠', 'Ev Adresi ve İkamet Süresi', 'Güncel adresi ve ne zamandır orada yaşadığını anlatma', [
    ['current address', 'KARınt ıDRES', 'güncel adres', 'Başvurudaki ikamet adresidir.'], ['postcode', 'POUSTkoud', 'posta kodu', 'UK adreslerinde sık sorulur.'], ['resident', 'REZıdınt', 'ikamet eden', 'Bir yerde yasal olarak yaşayan kişi.'], ['since', 'SİNS', '-den beri', 'Başlangıç tarihiyle kullanılır.'],
  ], [
    ['What is your current home address?', 'UOT iz yor KARınt HOUM ıDRES?', 'Güncel ev adresiniz nedir?', 'I live at 24 Park Street in Bursa.', 'ay LİV et TUENti FOR PARK striit in BURsa.', 'Bursa’da Park Caddesi 24 numarada oturuyorum.'],
    ['How long have you lived there?', 'hau LONG hev yu LİVD deır?', 'Ne zamandır orada yaşıyorsunuz?', 'I have lived there since 2021.', 'ay hev LİVD deır sins TUENti TUENti UAN.', '2021’den beri orada yaşıyorum.'],
  ]],
  ['en_int_05', 'A2', '💍', 'Medeni Durum ve Eş Bilgileri', 'Eşin adı, doğum tarihi ve pasaport bilgileri', [
    ['marital status', 'MERitıl STEYtıs', 'medeni durum', 'Single, married, divorced veya widowed.'], ['spouse', 'SPAUS', 'eş', 'Koca veya eş için resmî sözcük.'], ['civil partner', 'Sİvıl PARTnır', 'medeni birliktelik partneri', 'UK başvurularında ayrı bir statüdür.'], ['marriage certificate', 'MERic sertifiKEYT', 'evlilik belgesi', 'Evlilik tarihini ve tarafları gösterir.'],
  ], [
    ['What is your marital status?', 'UOT iz yor MERitıl STEYtıs?', 'Medeni durumunuz nedir?', 'I am married.', 'ay em MERid.', 'Evliyim.'],
    ['What is your spouse’s full name?', 'UOT iz yor SPAUsız FUL NEYM?', 'Eşinizin tam adı nedir?', 'Her full name is Elif Kaya.', 'hör FUL NEYM iz eLİF kaYA.', 'Tam adı Elif Kaya.'],
  ]],
  ['en_int_06', 'A2', '👪', 'Anne, Baba ve Aile Bilgileri', 'Ebeveynlerin adları, doğum tarihleri ve yaşadıkları ülke', [
    ['parent', 'PEIRınt', 'ebeveyn', 'Anne veya baba.'], ['mother’s maiden name', 'MADHırs MEYdın NEYM', 'annenin kızlık soyadı', 'Kimlik sorularında görülebilir.'], ['next of kin', 'NEKST ov KİN', 'en yakın akraba', 'Acil durumda iletişim kişisi.'], ['relative', 'RELıtiv', 'akraba', 'Aile bağı bulunan kişi.'],
  ], [
    ['What are your parents’ full names?', 'UOT ar yor PEIRınts FUL NEYMZ?', 'Ebeveynlerinizin tam adları nedir?', 'Their names are Ayşe and Mehmet Kaya.', 'deır NEYMZ ar ayŞE end mehMET kaYA.', 'Adları Ayşe ve Mehmet Kaya.'],
    ['Where do your parents live?', 'UEIR du yor PEIRınts LİV?', 'Ebeveynleriniz nerede yaşıyor?', 'They live in Turkey.', 'dey LİV in TÖRki.', 'Türkiye’de yaşıyorlar.'],
  ]],
  ['en_int_07', 'A2', '🧒', 'Çocuklar ve Bakmakla Yükümlü Olunanlar', 'Çocukların kimliği, yaşı ve seyahat durumu', [
    ['dependant', 'diPENdınt', 'bakmakla yükümlü olunan kişi', 'Maddi olarak başvurana bağlı kişi.'], ['minor child', 'MAYnır ÇAYLD', 'reşit olmayan çocuk', '18 yaşından küçük çocuk.'], ['legal guardian', 'Lİİgıl GARDiyın', 'yasal vasi', 'Çocuk adına sorumlu yetişkin.'], ['consent letter', 'kınSENT LETır', 'muvafakat yazısı', 'Çocuk seyahatinde istenebilir.'],
  ], [
    ['Do you have any dependant children?', 'du yu HEV eni diPENdınt ÇİLdrın?', 'Bakmakla yükümlü olduğunuz çocuk var mı?', 'Yes, I have one daughter aged eight.', 'YES, ay hev UAN DOTır eycd EYT.', 'Evet, sekiz yaşında bir kızım var.'],
    ['Will she travel with you?', 'wil şi TRAVıl vid yu?', 'Sizinle seyahat edecek mi?', 'No, she will stay with her mother.', 'NOU, şi wil STEY vid hör MADHır.', 'Hayır, annesiyle kalacak.'],
  ]],
  ['en_int_08', 'A2', '🎯', 'Seyahat Amacı', 'Birleşik Krallık’a gidiş nedenini açık ve tutarlı anlatma', [
    ['purpose of visit', 'PÖRpıs ov VİZit', 'ziyaret amacı', 'Ana seyahat nedenidir.'], ['tourism', 'TUUrizım', 'turizm', 'Standard Visitor kapsamında olabilir.'], ['permitted activity', 'pırMİTid ekTİVıti', 'izin verilen faaliyet', 'Ziyaretçi kurallarındaki faaliyet.'], ['genuine visitor', 'CENyuin VİZitır', 'gerçek ziyaretçi', 'Süre sonunda ayrılacağına inanılan başvuran.'],
  ], [
    ['What is the main purpose of your visit?', 'UOT iz dı MEYN PÖRpıs ov yor VİZit?', 'Ziyaretinizin ana amacı nedir?', 'I am visiting the UK for tourism.', 'ay em VİZiting dı yuKEY for TUUrizım.', 'Birleşik Krallık’ı turizm amacıyla ziyaret ediyorum.'],
    ['What do you plan to do there?', 'UOT du yu PLAN tu DU deır?', 'Orada ne yapmayı planlıyorsunuz?', 'I plan to visit museums and historical sites.', 'ay PLAN tu VİZit myuZİYımz end hisTORikıl SAYTS.', 'Müzeleri ve tarihî yerleri ziyaret etmeyi planlıyorum.'],
  ]],
  ['en_int_09', 'A2', '📅', 'Seyahat Tarihleri ve Kalış Süresi', 'Giriş, çıkış ve toplam ziyaret süresi', [
    ['arrival date', 'ıRAYvıl DEYT', 'varış tarihi', 'Planlanan giriş günüdür.'], ['departure date', 'diPARçır DEYT', 'ayrılış tarihi', 'Planlanan çıkış günüdür.'], ['length of stay', 'LENGTH ov STEY', 'kalış süresi', 'Toplam ziyaret süresi.'], ['return ticket', 'riTÖRN TİKıt', 'dönüş bileti', 'Dönüş planını destekleyebilir.'],
  ], [
    ['When do you intend to travel?', 'UEN du yu inTEND tu TRAVıl?', 'Ne zaman seyahat etmeyi düşünüyorsunuz?', 'I intend to arrive on 10 April.', 'ay inTEND tu ıRAYV on TEN EYprıl.', '10 Nisan’da varmayı düşünüyorum.'],
    ['How long will you stay?', 'hau LONG wil yu STEY?', 'Ne kadar kalacaksınız?', 'I will stay for twelve days.', 'ay wil STEY for TUELV DEYZ.', 'On iki gün kalacağım.'],
  ]],
  ['en_int_10', 'B1', '🗺️', 'Gezi Programı ve Şehirler', 'Rota, planlanan faaliyetler ve şehirler', [
    ['itinerary', 'ayTİNıreri', 'gezi programı', 'Tarih ve yerleri içeren plan.'], ['destination', 'destiNEYşın', 'varış noktası', 'Gidilecek şehir veya yer.'], ['scheduled', 'ŞEDyuuld', 'planlanmış', 'Belirli tarihe konmuş faaliyet.'], ['day trip', 'DEY TRİP', 'günübirlik gezi', 'Geceleme olmadan yapılan gezi.'],
  ], [
    ['Which cities will you visit?', 'UİÇ Sİtiz wil yu VİZit?', 'Hangi şehirleri ziyaret edeceksiniz?', 'I will visit London, Bath and Oxford.', 'ay wil VİZit LANdın, BATH end OKSfırd.', 'Londra, Bath ve Oxford’u ziyaret edeceğim.'],
    ['Can you explain your itinerary?', 'KEN yu ikSPLEYN yor ayTİNıreri?', 'Gezi programınızı açıklayabilir misiniz?', 'I have five days in London and two day trips.', 'ay hev FAYV DEYZ in LANdın end TU DEY TRİPS.', 'Londra’da beş günüm ve iki günübirlik gezim var.'],
  ]],
  ['en_int_11', 'A2', '🏨', 'Konaklama Bilgileri', 'Otel, ev sahibi ve kalınacak adresi açıklama', [
    ['accommodation', 'ıkomıDEYşın', 'konaklama', 'Ziyaret boyunca kalınacak yer.'], ['booking confirmation', 'BUKing konfırMEYşın', 'rezervasyon onayı', 'Konaklama kaydını gösterir.'], ['host', 'HOUST', 'ev sahibi / ağırlayan kişi', 'Yanında kalınacak kişi.'], ['overnight stay', 'OUvırNAYT STEY', 'geceleme', 'Bir gece konaklama.'],
  ], [
    ['Where will you stay in the UK?', 'UEIR wil yu STEY in dı yuKEY?', 'Birleşik Krallık’ta nerede kalacaksınız?', 'I will stay at the Riverside Hotel in London.', 'ay wil STEY et dı RİVırsayd houTEL in LANdın.', 'Londra’daki Riverside Hotel’de kalacağım.'],
    ['Do you have a booking confirmation?', 'du yu HEV ı BUKing konfırMEYşın?', 'Rezervasyon onayınız var mı?', 'Yes, here is the confirmation.', 'YES, hiır iz dı konfırMEYşın.', 'Evet, onay burada.'],
  ]],
  ['en_int_12', 'B1', '💳', 'Seyahat Masraflarını Kim Ödeyecek?', 'Toplam bütçe, sponsor ve masraf paylaşımı', [
    ['trip cost', 'TRİP KOST', 'seyahat maliyeti', 'Tahmini toplam masraf.'], ['self-funded', 'SELF FANDıd', 'masrafları kendisi karşılanan', 'Başvuran kendi parasını kullanır.'], ['financial sponsor', 'fayNENşıl SPONsır', 'maddi sponsor', 'Masrafları karşılayan üçüncü kişi.'], ['reasonable costs', 'Rİİzınıbıl KOSTS', 'makul masraflar', 'Seyahat ve dönüş dâhil giderler.'],
  ], [
    ['Who will pay for your trip?', 'HU wil PEY for yor TRİP?', 'Seyahatinizi kim ödeyecek?', 'I will pay for the trip myself.', 'ay wil PEY for dı TRİP maySELF.', 'Seyahati kendim ödeyeceğim.'],
    ['How much do you expect it to cost?', 'hau MAÇ du yu ikSPEKT it tu KOST?', 'Ne kadara mal olmasını bekliyorsunuz?', 'I expect the total cost to be about two thousand pounds.', 'ay ikSPEKT dı TOUtıl KOST tu bi ıBAUT TU THAUzınd PAUNDZ.', 'Toplam maliyetin yaklaşık iki bin sterlin olmasını bekliyorum.'],
  ]],
  ['en_int_13', 'B1', '💼', 'Meslek, İşveren ve Maaş', 'İş rolü, çalışma süresi ve yıllık gelir', [
    ['occupation', 'okyuPEYşın', 'meslek', 'Mevcut iş veya çalışma alanı.'], ['employer', 'imPLOYır', 'işveren', 'Çalışılan kişi veya şirket.'], ['annual income', 'ENyuıl İNKAM', 'yıllık gelir', 'Bir yıldaki toplam kazanç.'], ['leave of absence', 'LİİV ov EBsıns', 'izinli ayrılık', 'İşverenin onayladığı geçici izin.'],
  ], [
    ['What do you do for a living?', 'UOT du yu DU for ı LİVing?', 'Ne iş yapıyorsunuz?', 'I am a software engineer at Delta Ltd.', 'ay em ı SOFTueır enciNİIR et DELta LİMitıd.', 'Delta Ltd. şirketinde yazılım mühendisiyim.'],
    ['Has your employer approved your leave?', 'hez yor imPLOYır ıPRUVD yor LİİV?', 'İşvereniniz izninizi onayladı mı?', 'Yes, my leave is approved for two weeks.', 'YES, may LİİV iz ıPRUVD for TU WİİKS.', 'Evet, iki haftalık iznim onaylandı.'],
  ]],
  ['en_int_14', 'B2', '🏦', 'Banka Hesabı ve Paranın Kaynağı', 'Bakiye, düzenli gelir ve büyük para girişlerini açıklama', [
    ['bank statement', 'BENK STEYtmınt', 'banka hesap özeti', 'Gelir ve kullanılabilir parayı gösterir.'], ['source of funds', 'SORS ov FANDZ', 'paranın kaynağı', 'Bakiyenin nasıl oluştuğunu açıklar.'], ['deposit', 'diPOZit', 'hesaba para yatırma', 'Büyük girişler açıklama gerektirebilir.'], ['available funds', 'ıVEYLıbıl FANDZ', 'kullanılabilir para', 'Başvuranın gerçekten erişebildiği tutar.'],
  ], [
    ['What is the source of these funds?', 'UOT iz dı SORS ov DİİZ FANDZ?', 'Bu paranın kaynağı nedir?', 'They are my salary savings from the last year.', 'dey ar may SELıri SEYvingz from dı LAST YİIR.', 'Geçen yıldaki maaşımdan biriktirdiklerim.'],
    ['Can you explain this large deposit?', 'KEN yu ikSPLEYN dis LARC diPOZit?', 'Bu büyük para girişini açıklayabilir misiniz?', 'It is the documented sale of my car.', 'it iz dı DOKyumentıd SEYL ov may KAR.', 'Bu, belgelenmiş araç satışından geldi.'],
  ]],
  ['en_int_15', 'B1', '🔙', 'Ülkeye Geri Dönüş Bağları', 'İş, aile ve yükümlülüklerle dönüş niyetini anlatma', [
    ['intention to leave', 'inTENşın tu LİİV', 'ayrılma niyeti', 'Ziyaret sonunda UK’den çıkma planı.'], ['home ties', 'HOUM TAYZ', 'ülkeye bağlar', 'İş, aile, eğitim veya mülk bağları.'], ['ongoing employment', 'ONgouing imPLOYmınt', 'devam eden iş', 'Dönüşte sürecek çalışma.'], ['commitment', 'kıMİTmınt', 'yükümlülük / bağlılık', 'Dönmeyi gerektiren sorumluluk.'],
  ], [
    ['Why will you return to Turkey?', 'UAY wil yu riTÖRN tu TÖRki?', 'Neden Türkiye’ye döneceksiniz?', 'I have a permanent job and my family lives here.', 'ay hev ı PÖRmınınt COB end may FEMıli LİVZ hiır.', 'Sürekli bir işim var ve ailem burada yaşıyor.'],
    ['When must you return to work?', 'UEN mast yu riTÖRN tu WÖRK?', 'İşe ne zaman dönmeniz gerekiyor?', 'I must return to work on 24 April.', 'ay mast riTÖRN tu WÖRK on TUENti FOR EYprıl.', '24 Nisan’da işe dönmem gerekiyor.'],
  ]],
  ['en_int_16', 'B1', '🛫', 'Önceki Seyahatler ve Vizeler', 'Son on yıllık seyahat geçmişi ve kurallara uyum', [
    ['travel history', 'TRAVıl HİSTıri', 'seyahat geçmişi', 'Önceki ülke giriş-çıkışları.'], ['previous visa', 'PRİİviyıs VİZı', 'önceki vize', 'Daha önce verilen vize.'], ['overstay', 'OUvırSTEY', 'izin süresini aşmak', 'İzin verilen tarihten sonra kalmak.'], ['immigration record', 'imiGREYşın REKırd', 'göçmenlik kaydı', 'Vize ve sınır geçmişi.'],
  ], [
    ['Have you visited the UK before?', 'HEV yu VİZitıd dı yuKEY biFOR?', 'Birleşik Krallık’ı daha önce ziyaret ettiniz mi?', 'Yes, I visited London in 2023.', 'YES, ay VİZitıd LANdın in TUENti TUENti THRİİ.', 'Evet, 2023’te Londra’yı ziyaret ettim.'],
    ['Did you leave before your visa expired?', 'DİD yu LİİV biFOR yor VİZı ikSPAYırd?', 'Vizeniz dolmadan ayrıldınız mı?', 'Yes, I left after seven days as planned.', 'YES, ay LEFT aftır SEvın DEYZ ez PLEND.', 'Evet, planlandığı gibi yedi gün sonra ayrıldım.'],
  ]],
  ['en_int_17', 'B2', '⛔', 'Ret, Sınır Dışı ve İhlal Geçmişi', 'Önceki retleri ve göçmenlik sorunlarını dürüstçe açıklama', [
    ['visa refusal', 'VİZı riFYUUzıl', 'vize reddi', 'Önceki olumsuz karar.'], ['deportation', 'diiporTEYşın', 'sınır dışı edilme', 'Bir ülkeden resmen çıkarılma.'], ['breach', 'BRİİÇ', 'ihlal', 'Göçmenlik kuralına aykırılık.'], ['refusal notice', 'riFYUUzıl NOUtis', 'ret bildirimi', 'Ret nedenlerini içeren yazı.'],
  ], [
    ['Have you ever been refused a visa?', 'HEV yu EVır bin riFYUUZD ı VİZı?', 'Hiç vize reddi aldınız mı?', 'Yes, a Schengen visa was refused in 2022.', 'YES, ı ŞENGın VİZı woz riFYUUZD in TUENti TUENti TU.', 'Evet, 2022’de bir Schengen vizem reddedildi.'],
    ['Why was it refused?', 'UAY woz it riFYUUZD?', 'Neden reddedildi?', 'The refusal notice said my financial evidence was incomplete.', 'dı riFYUUzıl NOUtis SED may fayNENşıl EVidıns woz inkımPLİİT.', 'Ret yazısı mali kanıtlarımın eksik olduğunu söylüyordu.'],
  ]],
  ['en_int_18', 'B2', '⚖️', 'Adli, Hukuki ve Göçmenlik Beyanları', 'Mahkûmiyet, ceza ve devam eden davalar hakkında doğru beyan', [
    ['criminal conviction', 'KRİmınıl kınVİKşın', 'adli mahkûmiyet', 'Mahkemenin suçlu bulması.'], ['civil judgment', 'Sİvıl CACmınt', 'hukuk mahkemesi kararı', 'Özel hukuk alanındaki karar.'], ['pending charge', 'PENding ÇARC', 'bekleyen suçlama', 'Henüz sonuçlanmamış isnat.'], ['to disclose', 'disKLOUZ', 'beyan etmek / açıklamak', 'İstenen bilgiyi saklamadan bildirmek.'],
  ], [
    ['Do you have any criminal convictions?', 'du yu HEV eni KRİmınıl kınVİKşınz?', 'Adli mahkûmiyetiniz var mı?', 'No, I have no criminal convictions.', 'NOU, ay hev nou KRİmınıl kınVİKşınz.', 'Hayır, adli mahkûmiyetim yok.'],
    ['Are there any pending proceedings against you?', 'ar deır eni PENding prıSİİdingz ıGENST yu?', 'Hakkınızda devam eden işlem var mı?', 'No, there are no pending proceedings.', 'NOU, deır ar nou PENding prıSİİdingz.', 'Hayır, devam eden işlem yok.'],
  ]],
  ['en_int_19', 'B1', '🤝', 'Davet Eden Kişi ve Sponsor', 'Davet edenle ilişki, adres ve desteğin kapsamı', [
    ['inviting person', 'inVAYting PÖRsın', 'davet eden kişi', 'Ziyaret için çağıran kişi.'], ['sponsor', 'SPONsır', 'sponsor', 'Maddi veya konaklama desteği veren.'], ['genuine relationship', 'CENyuin riLEYşınşip', 'gerçek ilişki', 'Üçüncü kişi desteğinde değerlendirilir.'], ['invitation letter', 'inviTEYşın LETır', 'davet mektubu', 'Ziyaret ve destek ayrıntılarını açıklar.'],
  ], [
    ['Who is inviting you to the UK?', 'HU iz inVAYting yu tu dı yuKEY?', 'Sizi Birleşik Krallık’a kim davet ediyor?', 'My cousin, Murat Kaya, is inviting me.', 'may KAzın, muRAT kaYA, iz inVAYting mi.', 'Kuzenim Murat Kaya beni davet ediyor.'],
    ['How do you know your sponsor?', 'HAU du yu NOU yor SPONsır?', 'Sponsorunuzu nereden tanıyorsunuz?', 'He is my mother’s nephew, and we speak every week.', 'hi iz may MADHırs NEFyu, end wi SPİİK EVri WİİK.', 'Annemin yeğeni; her hafta konuşuruz.'],
  ]],
  ['en_int_20', 'B1', '🏛️', 'Turistik Ziyaret Ayrıntıları', 'Görülecek yerleri ve planın gerçekçiliğini anlatma', [
    ['landmark', 'LENDmark', 'simge yapı', 'Tanınmış tarihî veya turistik yer.'], ['admission ticket', 'ıdMİŞın TİKıt', 'giriş bileti', 'Müze veya etkinlik bileti.'], ['sightseeing', 'SAYTsiing', 'turistik gezi', 'Şehrin önemli yerlerini görme.'], ['opening hours', 'OUpınıng AUırz', 'açılış saatleri', 'Ziyaret planında yararlı bilgi.'],
  ], [
    ['Which places do you want to see?', 'UİÇ PLEYSız du yu UONT tu Sİİ?', 'Hangi yerleri görmek istiyorsunuz?', 'I want to see the British Museum and the Tower of London.', 'ay UONT tu Sİİ dı BRİTiş myuZİYım end dı TAUır ov LANdın.', 'British Museum ve Tower of London’ı görmek istiyorum.'],
    ['Why did you choose the UK?', 'UAY did yu ÇUUZ dı yuKEY?', 'Neden Birleşik Krallık’ı seçtiniz?', 'I am interested in British history and architecture.', 'ay em İNtrıstıd in BRİTiş HİStıri end ARkıtekçır.', 'Britanya tarihi ve mimarisiyle ilgileniyorum.'],
  ]],
  ['en_int_21', 'B2', '💼', 'İş Ziyareti ve Toplantı', 'Şirket, toplantı amacı ve izin verilen iş faaliyetleri', [
    ['business meeting', 'BİZnis Mİİting', 'iş toplantısı', 'Ziyaret kapsamındaki toplantı.'], ['conference', 'KONfırıns', 'konferans', 'Mesleki etkinlik.'], ['inviting company', 'inVAYting KAMpıni', 'davet eden şirket', 'UK’deki iş bağlantısı.'], ['employment', 'imPLOYmınt', 'ücretli çalışma', 'Ziyaret vizesinde ayrı kurallara tabidir.'],
  ], [
    ['What business will you conduct in the UK?', 'UOT BİZnis wil yu kınDAKT in dı yuKEY?', 'Birleşik Krallık’ta hangi işi yapacaksınız?', 'I will attend two meetings with our distributor.', 'ay wil ıTEND TU Mİİtingz vid AUır disTRİByutır.', 'Distribütörümüzle iki toplantıya katılacağım.'],
    ['Will you be paid by a UK company?', 'wil yu bi PEYD bay ı yuKEY KAMpıni?', 'Bir UK şirketinden ödeme alacak mısınız?', 'No, my Turkish employer will continue to pay my salary.', 'NOU, may TÖRkiş imPLOYır wil kınTİNYU tu PEY may SELıri.', 'Hayır, maaşımı Türk işverenim ödemeye devam edecek.'],
  ]],
  ['en_int_22', 'B2', '🎓', 'Öğrenci Vizesi: Gerçek Öğrenci Görüşmesi', 'Kurs seçimi, akademik ilerleme ve eğitim hedefi', [
    ['credibility interview', 'kredıBİLıti İNtırvyu', 'güvenilirlik mülakatı', 'Gerçek öğrenci değerlendirmesi.'], ['course content', 'KORS KONtent', 'ders içeriği', 'Programın ne öğrettiği.'], ['academic progression', 'ekıDEMik prıGREŞın', 'akademik ilerleme', 'Yeni eğitimin önceki eğitimle ilişkisi.'], ['CAS', 'KAS', 'öğrenim kabul onayı', 'Confirmation of Acceptance for Studies.'],
  ], [
    ['Why did you choose this course?', 'UAY did yu ÇUUZ dis KORS?', 'Bu bölümü neden seçtiniz?', 'It builds on my engineering degree and focuses on renewable energy.', 'it BİLDZ on may enciNİIRing diGRİİ end FOUkısız on riNYUıbıl ENırci.', 'Mühendislik eğitimimin üzerine kuruluyor ve yenilenebilir enerjiye odaklanıyor.'],
    ['Why did you choose this university?', 'UAY did yu ÇUUZ dis yunıVÖRsıti?', 'Bu üniversiteyi neden seçtiniz?', 'Its programme includes the laboratory modules I need.', 'its PROUgram inKLUUDZ dı leBORıtıri MOCuulz ay NİİD.', 'Programında ihtiyaç duyduğum laboratuvar modülleri var.'],
  ], 'Student görüşmesinde kişisel ve mali koşullar, fonların kaynağı, kurs gerekçesi, önceki eğitim, konaklama ve İngilizce yeterliği değerlendirilebilir.'],
  ['en_int_23', 'B2', '💷', 'Öğrenci Vizesi: Eğitim Finansmanı', 'Kurs ücreti, yaşam giderleri ve fonların kaynağı', [
    ['tuition fees', 'tyuİŞın FİİZ', 'öğrenim ücreti', 'CAS üzerinde gösterilen kurs bedeli.'], ['living costs', 'LİVing KOSTS', 'yaşam giderleri', 'Konaklama ve günlük harcamalar.'], ['financial evidence', 'fayNENşıl EVidıns', 'mali kanıt', 'Uygun hesap veya sponsorluk belgesi.'], ['official sponsorship', 'ıFİŞıl SPONsırşip', 'resmî burs/sponsorluk', 'Kabul edilen resmî finansman.'],
  ], [
    ['How will you pay your tuition fees?', 'HAU wil yu PEY yor tyuİŞın FİİZ?', 'Öğrenim ücretinizi nasıl ödeyeceksiniz?', 'My parents will pay the fees from their savings.', 'may PEIRınts wil PEY dı FİİZ from deır SEYvingz.', 'Ücreti ebeveynlerim birikimlerinden ödeyecek.'],
    ['What are your expected monthly expenses?', 'UOT ar yor ikSPEKtıd MANTli ikSPENsız?', 'Beklenen aylık giderleriniz nedir?', 'I have budgeted for rent, food and transport.', 'ay hev BACitıd for RENT, FUUD end TRANsport.', 'Kira, yemek ve ulaşım için bütçe hazırladım.'],
  ]],
  ['en_int_24', 'B2', '❤️', 'Partner Vizesi: İlişkinin Gerçekliği', 'Tanışma, birlikte yaşam ve ortak sorumluluklar', [
    ['genuine and subsisting', 'CENyuin end sıbSİSting', 'gerçek ve devam eden', 'Partner ilişkisinin temel ölçütü.'], ['cohabitation', 'kouhebiTEYşın', 'birlikte yaşama', 'Aynı evde ortak yaşam.'], ['shared responsibility', 'ŞEIRD risponsıBİLıti', 'ortak sorumluluk', 'Mali veya ev içi yükümlülük.'], ['relationship evidence', 'riLEYşınşip EVidıns', 'ilişki kanıtı', 'Ortak adres, mali kayıt veya iletişim.'],
  ], [
    ['When and how did you meet your partner?', 'UEN end HAU did yu MİİT yor PARTnır?', 'Partnerinizle ne zaman ve nasıl tanıştınız?', 'We met at university in Ankara in 2018.', 'wi MET et yunıVÖRsıti in ANkara in TUENti EYtİİN.', '2018’de Ankara’da üniversitede tanıştık.'],
    ['How do you share household responsibilities?', 'HAU du yu ŞEIR HAUShoUld risponsıBİLıtiz?', 'Ev sorumluluklarını nasıl paylaşıyorsunuz?', 'We pay the rent jointly and divide the bills.', 'wi PEY dı RENT COYNTli end diVAYD dı BİLZ.', 'Kirayı birlikte öder, faturaları paylaşırız.'],
  ], 'Partner başvurularında ilişki geçerli, gerçek ve devam ediyor olmalıdır. Kanıt yetersiz veya tutarsızsa ayrıntılı görüşme düşünülebilir.'],
  ['en_int_25', 'B1', '👆', 'Biyometri ve Belge Tutarlılığı', 'Parmak izi, fotoğraf, pasaport ve çeviriler', [
    ['biometric information', 'bayouMETRik infırMEYşın', 'biyometrik bilgi', 'Parmak izi ve yüz fotoğrafı.'], ['fingerprints', 'FİNGırprints', 'parmak izleri', 'Kimlik doğrulamasında kaydedilir.'], ['certified translation', 'SÖRtifayd trensLEYşın', 'onaylı çeviri', 'İngilizce veya Galce olmayan belgeler için.'], ['supporting document', 'sıPORTing DOKyument', 'destekleyici belge', 'Başvurudaki beyanı kanıtlar.'],
  ], [
    ['Is this your current passport?', 'iz dis yor KARınt PASport?', 'Bu güncel pasaportunuz mu?', 'Yes, it is valid for the whole trip.', 'YES, it iz VELid for dı HOUL TRİP.', 'Evet, tüm seyahat boyunca geçerli.'],
    ['Have you provided certified translations?', 'HEV yu prıVAYdıd SÖRtifayd trensLEYşınz?', 'Onaylı çevirileri sundunuz mu?', 'Yes, all Turkish documents have certified translations.', 'YES, OL TÖRkiş DOKyuments hev SÖRtifayd trensLEYşınz.', 'Evet, tüm Türkçe belgelerin onaylı çevirisi var.'],
  ]],
  ['en_int_26', 'B2', '🏡', 'Vatandaşlıkta İkamet ve Yurtdışı Günleri', 'Adres geçmişi, yasal ikamet ve ülke dışındaki süreler', [
    ['residence requirement', 'REZidıns riKUAYırmınt', 'ikamet şartı', 'Başvuru yoluna göre gereken yerleşiklik.'], ['absence', 'EBsıns', 'ülke dışında bulunma', 'UK dışında geçirilen dönem.'], ['lawful residence', 'LOFıl REZidıns', 'yasal ikamet', 'Geçerli izinle ikamet.'], ['qualifying period', 'KUALifaying Pİıriyıd', 'uygunluk dönemi', 'Hesaplamaya alınan ikamet süresi.'],
  ], [
    ['How long have you lived in the UK?', 'HAU LONG hev yu LİVD in dı yuKEY?', 'Birleşik Krallık’ta ne kadar yaşadınız?', 'I have lived here lawfully for six years.', 'ay hev LİVD hiır LOFıli for SİKS YİIRZ.', 'Burada altı yıldır yasal olarak yaşıyorum.'],
    ['Please explain this long absence.', 'PLİİZ ikSPLEYN dis LONG EBsıns.', 'Lütfen bu uzun yurtdışı süresini açıklayın.', 'I cared for my father abroad and have included the evidence.', 'ay KEIRD for may FADHır ıBROAD end hev inKLUUDıd dı EVidıns.', 'Yurtdışında babama baktım ve kanıtları ekledim.'],
  ], 'Vatandaşlık başvurusu genellikle belge üzerinden karara bağlanır; Home Office ek bilgi isterse ikamet ve ülke dışındaki günleri belgelerinizle açıklayın.'],
  ['en_int_27', 'B2', '📚', 'Life in the UK ve Dil Şartı', 'Sınav, referans numarası ve dil kanıtı', [
    ['Life in the UK test', 'LAYF in dı yuKEY TEST', 'Life in the UK sınavı', 'Vatandaşlık bilgisini ölçen resmî sınav.'], ['pass reference number', 'PAS REFrıns NAMbır', 'başarı referans numarası', 'Başvuruda sonucu doğrulamak için kullanılır.'], ['language requirement', 'LENGgviç riKUAYırmınt', 'dil şartı', 'İngilizce, Galce veya İskoç Galcesi bilgisi.'], ['exemption', 'igZEMPşın', 'muafiyet', 'Belirli gerekçeyle şarttan muaf olma.'],
  ], [
    ['Have you passed the Life in the UK test?', 'HEV yu PAST dı LAYF in dı yuKEY TEST?', 'Life in the UK sınavını geçtiniz mi?', 'Yes, and I entered my reference number in the application.', 'YES, end ay ENtırd may REFrıns NAMbır in dı apliKEYşın.', 'Evet, referans numaramı başvuruya girdim.'],
    ['How do you meet the language requirement?', 'HAU du yu MİİT dı LENGgviç riKUAYırmınt?', 'Dil şartını nasıl karşılıyorsunuz?', 'I have an approved B1 English qualification.', 'ay hev en ıPRUVD Bİİ UAN İNGliş kualıfiKEYşın.', 'Onaylı B1 İngilizce yeterliğim var.'],
  ]],
  ['en_int_28', 'C1', '⚖️', 'Vatandaşlıkta İyi Karakter Beyanı', 'Suç, vergi, göçmenlik ve dürüstlük kontrolleri', [
    ['good character', 'GUD KERıktır', 'iyi karakter', 'Kanuna uyum ve dürüstlük değerlendirmesi.'], ['tax liability', 'TEKS layıBİLıti', 'vergi yükümlülüğü', 'Ödenmesi gereken vergi sorumluluğu.'], ['immigration breach', 'imiGREYşın BRİİÇ', 'göçmenlik ihlali', 'İzin koşullarına aykırılık.'], ['mitigating factor', 'MİtigeYting FEKtır', 'hafifletici etken', 'Olayın bağlamını açıklayan unsur.'],
  ], [
    ['Have you disclosed every conviction and penalty?', 'HEV yu disKLOUZD EVri kınVİKşın end PENılti?', 'Tüm mahkûmiyet ve cezaları beyan ettiniz mi?', 'Yes, I disclosed the old fine and attached the record.', 'YES, ay disKLOUZD dı OULD FAYN end ıTEÇT dı REKırd.', 'Evet, eski para cezasını beyan edip kaydı ekledim.'],
    ['Have you ever breached immigration law?', 'HEV yu EVır BRİİÇT imiGREYşın LO?', 'Hiç göçmenlik hukukunu ihlal ettiniz mi?', 'No, I have always held valid permission.', 'NOU, ay hev OLweyz HELD VELid pırMİŞın.', 'Hayır, her zaman geçerli iznim oldu.'],
  ], '“Good character” bölümünde suçlar dışında vergi, aldatıcı beyan, göçmenlik geçmişi ve devam eden suçlamalar da önem taşıyabilir; şüphedeyseniz saklamak yerine doğru açıklama yapın.'],
  ['en_int_29', 'B2', '👥', 'Hakemler ve Kimlik Doğrulama', 'İki hakemin başvuranı nasıl tanıdığını açıklama', [
    ['referee', 'refırİİ', 'hakem / kimlik doğrulayan kişi', 'Vatandaşlık başvurusunu destekleyen uygun kişi.'], ['professional standing', 'prıFEŞınıl STENding', 'mesleki statü', 'Uygun hakem ölçütlerinden biri.'], ['true likeness', 'TRUU LAYKnis', 'gerçek benzerlik', 'Fotoğrafın başvurana ait olduğunun teyidi.'], ['identity verification', 'ayDENtıti verıfiKEYşın', 'kimlik doğrulama', 'Kişi ve belgelerin eşleştirilmesi.'],
  ], [
    ['How does your first referee know you?', 'HAU daz yor FÖRST refırİİ NOU yu?', 'İlk hakeminiz sizi nereden tanıyor?', 'She is my accountant and has known me for four years.', 'şi iz may ıKAUNtınt end hez NOUN mi for FOR YİIRZ.', 'Muhasebecimdir ve beni dört yıldır tanır.'],
    ['Is either referee related to you?', 'iz AYdhır refırİİ riLEYtıd tu yu?', 'Hakemlerden biri akrabanız mı?', 'No, neither referee is related to me.', 'NOU, NAYdhır refırİİ iz riLEYtıd tu mi.', 'Hayır, ikisi de akrabam değil.'],
  ], 'Britanya vatandaşlık başvurularında iki hakem kimliğin kanıtlanmasına yardım eder. Uygunlukları başvuru yolunun güncel rehberinden kontrol edilmelidir.'],
  ['en_int_30', 'C1', '🎤', 'Tam Prova: UKVI ve Vatandaşlık Kontrolü', 'Kimlikten mali duruma, dönüş planından vatandaşlık beyanına tam prova', [
    ['consistent answer', 'kınSİStınt ANsır', 'tutarlı yanıt', 'Form ve belgelerle çelişmeyen cevap.'], ['supporting evidence', 'sıPORTing EVidıns', 'destekleyici kanıt', 'Beyanı doğrulayan belge.'], ['clarification', 'klerıfiKEYşın', 'açıklığa kavuşturma', 'Belirsiz bilgiyi netleştirme.'], ['truthful declaration', 'TRUUTHfıl deklıREYşın', 'doğru beyan', 'Bilgilerin gerçek olduğuna dair beyan.'],
  ], [
    ['Your form says ten days, but your booking shows twelve. Can you clarify?', 'yor FORM SEZ TEN DEYZ, bat yor BUKing ŞOUZ TUELV. KEN yu KLERıfay?', 'Formunuz on gün, rezervasyonunuz on iki gün gösteriyor. Açıklar mısınız?', 'I changed my return date and uploaded the new itinerary yesterday.', 'ay ÇEYNCD may riTÖRN DEYT end APLOUdıd dı NYUU ayTİNıreri YEStırdey.', 'Dönüş tarihimi değiştirdim ve yeni programı dün yükledim.'],
    ['Do you confirm that all your answers are true?', 'du yu kınFÖRM det OL yor ANsırz ar TRUU?', 'Tüm cevaplarınızın doğru olduğunu onaylıyor musunuz?', 'Yes. They are complete and accurate to the best of my knowledge.', 'YES. dey ar kımPLİİT end EKyurıt tu dı BEST ov may NOLıc.', 'Evet. Bildiğim kadarıyla eksiksiz ve doğrudur.'],
  ], 'Cevabı ezberlenmiş bir slogan gibi değil, kendi gerçek durumunuza göre verin. Çelişki fark ederseniz saklamak yerine tarihi ve belgeyi açıkça düzeltin.'],
];

export const EN_INTERVIEW_UNITS: UnitModule[] = SPECS.map(build);

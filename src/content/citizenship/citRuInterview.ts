import type { UnitModule } from '../../curriculumData';
import { makeCitUnit, type CitWord, type CitLine } from './makeCitUnit';

/**
 * Rusya senaryoları resmî konsolosluk/MVD alanları ve mevzuattan hazırlanmıştır
 * (erişim: 3 Ekim 2026): visa.kdmid.ru; mid.ru ve kdmid.ru konsolosluk sayfaları;
 * 22.11.2023 tarihli 889 sayılı Cumhurbaşkanlığı Kararnamesi ve eki vatandaşlık
 * başvuru usulü; MVD'nin Rus dili görüşmesinde biyografi, aile, taşınma, eğitim ve
 * iş hayatını anlatma ölçütleri. Sabit/sızdırılmış soru listesi değildir.
 */

type Level = UnitModule['levelGroup'];
type Exchange = readonly [q: string, qRead: string, qTr: string, a: string, aRead: string, aTr: string];
type Spec = readonly [id: string, level: Level, icon: string, title: string, desc: string, words: CitWord[], exchanges: readonly Exchange[], note?: string];
const VISA = 'Rusya Vize Görüşmesi';
const CIT = 'Rusya Vatandaşlık Başvurusu';
const DISCLAIMER = '⚠️ Rus konsolosluğu gerektiğinde ek belge isteyebilir veya başvuranı görüşmeye çağırabilir; her başvuruda mülakat yapılmaz ve değişmez bir resmî soru listesi yoktur. Alıştırmalar vize formu, davet belgeleri ve resmî değerlendirme alanlarına dayanır. Cevaplar gerçek form ve belgelerinizle tutarlı olmalıdır.';

function build(spec: Spec, index: number): UnitModule {
  const [id, level, icon, title, desc, words, exchanges, note] = spec;
  const dlg: CitLine[] = exchanges.flatMap(([q, qRead, qTr, a, aRead, aTr]) => [
    ['Сотрудник', q, qRead, qTr], ['Заявитель', a, aRead, aTr],
  ]);
  return makeCitUnit({ id, unitNumber: 700 + index, level, icon, title, desc,
    category: index < 20 ? VISA : CIT, color: index < 20 ? '#2563eb' : '#7c3aed',
    grammar: `${DISCLAIMER}\n📌 ${note ?? 'Soruyu kısa ve doğrudan yanıtlayın. Rusçada resmî hitap için «вы», “lütfen gösterin” için «предъявите, пожалуйста» kullanılır.'}`,
    words, sents: exchanges.map((e) => [e[3], e[5]]), dlg });
}

const SPECS: readonly Spec[] = [
  ['ru_int_01','A2','🪪','Mülakatta Kimlik: Tam Ad','Pasaporttaki ad, soyadı ve varsa önceki adlar',[
    ['полное имя','Pólnaye ímya','tam ad','Pasaporttaki eksiksiz addır.'],['фамилия','Famíliya','soyadı','Rusçada ad-soyad sırası değişebilir.'],['имя','Ímya','ad','Kişinin verilen adı.'],['прежняя фамилия','Préjnyaya famíliya','önceki soyadı','Değişiklik belgesiyle açıklanır.']], [
    ['Назовите ваше полное имя.','Nazavíti váshe pól naye ímya.','Tam adınızı söyleyin.','Меня зовут Дениз Кая.','Minyá zavút Diníz Kayá.','Benim adım Deniz Kaya.'],
    ['Вы раньше носили другую фамилию?','Vı ránşe nasíli drugúyu famíliyu?','Daha önce başka soyadı kullandınız mı?','Да, моя прежняя фамилия — Демир.','Da, mayá préjnyaya famíliya — Dimír.','Evet, önceki soyadım Demir’di.']]],
  ['ru_int_02','A2','🎂','Doğum Tarihi ve Yeri','Kimlik kontrolünde tarih, şehir ve ülke söyleme',[
    ['дата рождения','Dáta rajdéniya','doğum tarihi','Gün, ay ve yıl olarak söylenir.'],['место рождения','Mésta rajdéniya','doğum yeri','Şehir ve ülke bilgisi.'],['свидетельство о рождении','Svidyételstva a rajdénii','doğum belgesi','Kimlik ve soy bağını gösterir.'],['подтвердить','Pattver dít','doğrulamak','Bilgiyi belgeyle teyit etmek.']], [
    ['Когда вы родились?','Kagdá vı radílis?','Ne zaman doğdunuz?','Я родился двенадцатого мая тысяча девятьсот девяностого года.','Ya radílsya dvinátsatava máya týsiça divitsót divinóstava góda.','12 Mayıs 1990’da doğdum.'],
    ['Где вы родились?','Gdye vı radílis?','Nerede doğdunuz?','Я родился в Бурсе, в Турции.','Ya radílsya v Búrse, v Túrtsii.','Bursa, Türkiye’de doğdum.']]],
  ['ru_int_03','A2','🌍','Vatandaşlık ve Pasaport','Mevcut vatandaşlık, pasaport numarası ve diğer uyruklar',[
    ['гражданство','Grajdanstva','vatandaşlık','Devletle hukuki bağ.'],['заграничный паспорт','Zagraníçnıy pásport','uluslararası pasaport','Yabancı ülke seyahat belgesi.'],['номер паспорта','Nómir pásporta','pasaport numarası','Harf ve rakamlardan oluşabilir.'],['двойное гражданство','Dvoy nóye grajdanstva','çifte vatandaşlık','İki vatandaşlığa sahip olma.']], [
    ['Какое у вас гражданство?','Kakóye u vas grajdanstva?','Vatandaşlığınız nedir?','Я гражданин Турции.','Ya grajdanín Túrtsii.','Türkiye vatandaşıyım.'],
    ['У вас есть другое гражданство?','U vas yest drugóye grajdanstva?','Başka vatandaşlığınız var mı?','Нет, у меня только одно гражданство.','Nyet, u minyá tó lka adnó grajdanstva.','Hayır, yalnızca bir vatandaşlığım var.']]],
  ['ru_int_04','A2','🏠','Adres ve İletişim Bilgileri','İkamet adresi, telefon ve e-posta doğrulama',[
    ['адрес проживания','Ádres prajivániya','ikamet adresi','Fiilen yaşanan adres.'],['адрес регистрации','Ádres registrátsii','kayıtlı adres','Resmî kayıt adresi.'],['номер телефона','Nómir telefóna','telefon numarası','Ülke koduyla verilebilir.'],['электронная почта','Elektrónnaya póçta','e-posta','Başvuru iletişim adresi.']], [
    ['По какому адресу вы проживаете?','Pa kakómu ádresu vı prajiváyete?','Hangi adreste yaşıyorsunuz?','Я живу в Бурсе на улице Парк, дом двадцать четыре.','Ya jivú v Búrse na úlitse Park, dom dvátsat çitýri.','Bursa’da Park Caddesi 24 numarada yaşıyorum.'],
    ['Это ваш актуальный номер телефона?','Éta vaş aktuálnıy nómir telefóna?','Bu güncel telefon numaranız mı?','Да, этот номер действует.','Da, état nómir déystvuyet.','Evet, bu numara aktiftir.']]],
  ['ru_int_05','A2','💍','Medeni Durum ve Aile','Eş, ebeveyn ve çocuklara ilişkin temel kimlik bilgileri',[
    ['семейное положение','Siméynaye palajéniye','medeni durum','Evli, bekâr veya boşanmış olma.'],['супруг','Suprúk','eş (erkek)','Resmî dilde koca/eş.'],['супруга','Suprúga','eş (kadın)','Resmî dilde kadın eş.'],['близкий родственник','Blízkiy ródstvennik','yakın akraba','Eş, ebeveyn, çocuk vb.']], [
    ['Каково ваше семейное положение?','Kakavó váshe siméynaye palajéniye?','Medeni durumunuz nedir?','Я женат.','Ya jinát.','Evliyim.'],
    ['Ваша супруга едет с вами?','Váşa suprúga yédit s vámi?','Eşiniz sizinle geliyor mu?','Нет, она остаётся в Турции.','Nyet, aná astayótsa v Túrtsii.','Hayır, Türkiye’de kalıyor.']]],
  ['ru_int_06','A2','🎯','Rusya’ya Seyahat Amacı','Vize türüyle uyumlu ana seyahat nedenini açıklama',[
    ['цель поездки','Tsel payézdki','seyahat amacı','Formdaki ana ziyaret nedeni.'],['туризм','Turízm','turizm','Turistik ziyaret amacı.'],['частная поездка','Çástnaya payézdka','özel ziyaret','Akraba veya arkadaş ziyareti.'],['соответствовать','Saatvyétstvavat','uygun olmak','Amacın vize türüyle eşleşmesi.']], [
    ['Какова цель вашей поездки?','Kaková tsel váşey payézdki?','Seyahatinizin amacı nedir?','Цель моей поездки — туризм.','Tsel mayéy payézdki — turízm.','Seyahatimin amacı turizmdir.'],
    ['Что вы планируете делать в России?','Şto vı planír uyete délat v Rassíi?','Rusya’da ne yapmayı planlıyorsunuz?','Я хочу посетить музеи и исторические места.','Ya haçú pasitít muzéi i istariçeskiye mistá.','Müzeleri ve tarihî yerleri ziyaret etmek istiyorum.']]],
  ['ru_int_07','A2','📅','Giriş, Çıkış ve Vize Süresi','Kesin seyahat tarihleri ile giriş sayısını söyleme',[
    ['дата въезда','Dáta vyézda','giriş tarihi','Rusya’ya varış günü.'],['дата выезда','Dáta výyezda','çıkış tarihi','Rusya’dan ayrılış günü.'],['срок пребывания','Srok pribıvániya','kalış süresi','Ülkede geçirilecek süre.'],['кратность визы','Krát nast vízı','vizenin giriş sayısı','Tek, çift veya çok giriş.']], [
    ['Когда вы въезжаете в Россию?','Kagdá vı vyezjáyete v Rassíyu?','Rusya’ya ne zaman giriş yapacaksınız?','Я въезжаю десятого апреля.','Ya vyezjáyu disyátava aprélya.','10 Nisan’da giriş yapacağım.'],
    ['На сколько дней вы едете?','Na skólka dney vı yédite?','Kaç günlüğüne gidiyorsunuz?','Я еду на двенадцать дней.','Ya yédu na dvinátsat dney.','On iki günlüğüne gidiyorum.']]],
  ['ru_int_08','B1','🗺️','Rota ve Ziyaret Edilecek Şehirler','Şehirleri, ulaşımı ve gezi sırasını anlatma',[
    ['маршрут поездки','Marşrút payézdki','seyahat rotası','Şehirlerin ve tarihlerin planı.'],['город пребывания','Górat pribıvániya','kalınacak şehir','Konaklama yapılan şehir.'],['перелёт','Piril yót','uçuş','Uçakla yapılan yolculuk.'],['экскурсия','Ekskúrsiya','rehberli gezi','Turistik inceleme gezisi.']], [
    ['Какие города вы посетите?','Kakíye garadá vı pasitíte?','Hangi şehirleri ziyaret edeceksiniz?','Я посещу Москву и Санкт-Петербург.','Ya pasi şşú Maskvú i Sankt-Pitirbúrk.','Moskova ve St. Petersburg’u ziyaret edeceğim.'],
    ['Покажите ваш маршрут, пожалуйста.','Pakaj íte vaş marşrút, pajálusta.','Lütfen rotanızı gösterin.','Сначала пять дней в Москве, затем четыре дня в Петербурге.','Snaçála pyat dney v Maskvé, zatém çitýri dnya v Pitirbúrge.','Önce Moskova’da beş gün, sonra Petersburg’da dört gün.']]],
  ['ru_int_09','A2','🏨','Konaklama ve Kalınacak Adres','Otel rezervasyonu veya ev sahibinin adresi',[
    ['место проживания','Mésta prajivániya','kalınacak yer','Rusya’daki konaklama yeri.'],['бронирование гостиницы','Braniravániye gastínitsı','otel rezervasyonu','Konaklama onayı.'],['принимающая сторона','Prinimáyuşşaya staraná','kabul eden taraf','Davet eden kişi/kurum.'],['полный адрес','Pólnıy ádres','açık adres','Şehir, sokak ve bina bilgisi.']], [
    ['Где вы будете жить?','Gdye vı búdite jit?','Nerede kalacaksınız?','Я буду жить в гостинице «Москва».','Ya búdu jit v gastínitse Maskvá.','Moskva Oteli’nde kalacağım.'],
    ['У вас есть подтверждение бронирования?','U vas yest pattverjdéniye braniravániya?','Rezervasyon onayınız var mı?','Да, вот подтверждение и адрес.','Da, vot pattverjdéniye i ádres.','Evet, onay ve adres burada.']]],
  ['ru_int_10','B1','✉️','Davet ve Davet Eden Taraf','Davet numarası, kurum veya kişinin bilgileri',[
    ['приглашение','Priglaşéniye','davet belgesi','Vize türüne göre temel belge olabilir.'],['приглашающая организация','Priglaşáyuşşaya arganizátsiya','davet eden kuruluş','İş veya eğitim davetçisi.'],['приглашающее лицо','Priglaşáyuşşeye litsó','davet eden kişi','Özel ziyarette ev sahibi.'],['номер приглашения','Nómir priglaşéniya','davet numarası','Belgeyi tanımlayan numara.']], [
    ['Кто вас приглашает?','Kto vas priglaşáyet?','Sizi kim davet ediyor?','Меня приглашает компания «Вектор».','Minyá priglaşáyet kampániya Véktor.','Beni Vektor şirketi davet ediyor.'],
    ['Как вы связаны с этой организацией?','Kak vı svyázanı s état arganizátsiyey?','Bu kuruluşla bağlantınız nedir?','Это наш российский деловой партнёр.','Éta naş rassíyskiy dilavóy partnyór.','Bu bizim Rus iş ortağımız.']]],
  ['ru_int_11','B1','💳','Seyahatin Finansmanı','Masrafları kimin karşıladığı ve bütçenin yeterliliği',[
    ['расходы на поездку','Rashódı na payézdku','seyahat masrafları','Ulaşım ve konaklama giderleri.'],['оплатить самостоятельно','Aplatít samastayátelna','kendisi ödemek','Kendi parasıyla karşılamak.'],['финансовая гарантия','Finánsavaya garántiya','mali garanti','Desteğin sağlanacağına dair güvence.'],['выписка со счёта','Výpiska sa şçyóta','banka hesap özeti','Paranın kaynağını gösterir.']], [
    ['Кто оплачивает вашу поездку?','Kto apláçivayet váşu payézdku?','Seyahatinizi kim ödüyor?','Я оплачиваю все расходы самостоятельно.','Ya apláçivayu vse rashódı samastayátelna.','Tüm masrafları kendim karşılıyorum.'],
    ['У вас достаточно средств?','U vas dastát oçna srétstv?','Yeterli paranız var mı?','Да, вот выписка с моего банковского счёта.','Da, vot výpiska s mayevó bánkavskava şçyóta.','Evet, banka hesap özetim burada.']]],
  ['ru_int_12','B1','💼','Meslek ve İşveren','Görev, şirket, maaş ve izin bilgileri',[
    ['место работы','Mésta rabótı','iş yeri','Çalışılan kurum.'],['должность','Dóljnast','görev/unvan','İşteki resmî pozisyon.'],['заработная плата','Zárabatnaya pláta','maaş','Düzenli iş geliri.'],['справка с работы','Spráfka s rabótı','iş yeri yazısı','Görev, maaş ve izni gösterebilir.']], [
    ['Где вы работаете?','Gdye vı rabótayete?','Nerede çalışıyorsunuz?','Я работаю инженером в компании «Дельта».','Ya rabótayu injiné ram v kampánii Délta.','Delta şirketinde mühendis olarak çalışıyorum.'],
    ['Работодатель одобрил ваш отпуск?','Rabatadátel adóbril vaş ót pusk?','İşvereniniz izninizi onayladı mı?','Да, у меня отпуск на две недели.','Da, u minyá ót pusk na dve nidéli.','Evet, iki haftalık iznim var.']]],
  ['ru_int_13','B1','🔙','Geri Dönüş Planı','İş, aile ve diğer bağlarla dönüş niyetini açıklama',[
    ['вернуться','Virnútşa','geri dönmek','Başlangıç ülkesine dönmek.'],['обратный билет','Abrátnıy bilét','dönüş bileti','Geri dönüş ulaşım belgesi.'],['постоянная работа','Pastayánnaya rabóta','sürekli iş','Dönüş bağlarından biri.'],['обязательство','Abyazátelstva','yükümlülük','Dönmeyi gerektiren sorumluluk.']], [
    ['Когда вы вернётесь в Турцию?','Kagdá vı virnyótis v Túrtsiyu?','Türkiye’ye ne zaman döneceksiniz?','Я вернусь двадцать второго апреля.','Ya virnús dvátsat vtaróva aprélya.','22 Nisan’da döneceğim.'],
    ['Почему вы обязательно вернётесь?','Paçimú vı abyazátelna virnyótis?','Neden mutlaka döneceksiniz?','У меня постоянная работа и семья в Турции.','U minyá pastayánnaya rabóta i simyá v Túrtsii.','Türkiye’de sürekli işim ve ailem var.']]],
  ['ru_int_14','B1','🛫','Önceki Rusya Seyahatleri','Eski vizeler, giriş-çıkış tarihleri ve kalış kuralları',[
    ['предыдущая поездка','Pridıdúşşaya payézdka','önceki seyahat','Daha önceki ziyaret.'],['старая виза','Stáraya víza','eski vize','Önce verilmiş vize.'],['нарушить срок','Naruşít srok','süreyi ihlal etmek','İzin verilen kalışı aşmak.'],['история поездок','İstóriya payézdak','seyahat geçmişi','Önceki ülke ziyaretleri.']], [
    ['Вы раньше были в России?','Vı ránşe bıli v Rassíi?','Daha önce Rusya’da bulundunuz mu?','Да, я был в Москве в 2023 году.','Da, ya bıl v Maskvé v dve týsiçi dvátsat trétyem gadú.','Evet, 2023’te Moskova’daydım.'],
    ['Вы соблюдали срок визы?','Vı sablyudáli srok vízı?','Vize süresine uydunuz mu?','Да, я выехал вовремя.','Da, ya výyehal vóvremya.','Evet, zamanında çıktım.']]],
  ['ru_int_15','A2','🩺','Sağlık Sigortası ve Belgeler','Poliçe numarası, şirket ve geçerlilik dönemi',[
    ['медицинская страховка','Miditsínskaya strahófka','sağlık sigortası','Rusya’da geçerli seyahat poliçesi.'],['страховой полис','Strahavóy pólis','sigorta poliçesi','Teminat belgesi.'],['срок действия','Srok déystviya','geçerlilik süresi','Belgenin yürürlük dönemi.'],['страховая компания','Strahaváya kampániya','sigorta şirketi','Poliçeyi düzenleyen kurum.']], [
    ['У вас есть медицинская страховка?','U vas yest miditsínskaya strahófka?','Sağlık sigortanız var mı?','Да, полис действует весь срок поездки.','Da, pólis déystvuyet ves srok payézdki.','Evet, poliçe seyahatin tamamında geçerli.'],
    ['Назовите страховую компанию.','Nazavíti strahavúyu kampániyu.','Sigorta şirketini söyleyin.','Страховая компания называется «Гарант».','Strahaváya kampániya nazıváyetsa Garant.','Sigorta şirketinin adı Garant.']]],
  ['ru_int_16','B1','🏖️','Turistik Belge ve Program','Tur operatörü onayı, otel ve gerçek turizm amacı',[
    ['туристическое подтверждение','Turistíçeskaye pattverjdéniye','turist kabul onayı','Yetkili tur operatörü belgesi.'],['туроператор','Turapirátar','tur operatörü','Turistik kabulü düzenleyen şirket.'],['номер референса','Nómir réfirensa','referans numarası','Turist belgesindeki kayıt numarası.'],['достопримечательность','Dastaprimiçátel nast','turistik/tarihî yer','Görülmeye değer yer.']], [
    ['Какая организация оформила подтверждение?','Kakáya arganizátsiya afórmila pattverjdéniye?','Onayı hangi kuruluş düzenledi?','Подтверждение оформил туроператор «Нева».','Pattverjdéniye afórmil turapirátar Néva.','Onayı Neva tur operatörü düzenledi.'],
    ['Где вы будете жить и что посетите?','Gdye vı búdite jit i şto pasitíte?','Nerede kalacak ve nereyi gezeceksiniz?','Я буду жить в центре и посещу Кремль и музеи.','Ya búdu jit v tséntre i pasi şşú Kreml i muzéi.','Merkezde kalıp Kremlin’i ve müzeleri gezeceğim.']]],
  ['ru_int_17','B2','👪','Özel Vize ve Akrabalık','Davet eden yakının kimliği ve akrabalık kanıtı',[
    ['частная виза','Çástnaya víza','özel ziyaret vizesi','Aile/özel ziyaret amacı.'],['степень родства','Stépin rótstva','akrabalık derecesi','Kişiler arasındaki aile bağı.'],['свидетельство о браке','Svidyételstva a bráke','evlilik belgesi','Eş bağını kanıtlar.'],['жилищное обеспечение','Jilíşşnaye abispéçeniye','konaklama güvencesi','Davetlinin kalacak yerinin sağlanması.']], [
    ['Кем вам приходится приглашающее лицо?','Kem vam prihóditsa priglaşáyuşşeye litsó?','Davet eden kişi neyiniz olur?','Она моя родная сестра.','Aná mayá radnáya sistrá.','O benim öz kız kardeşim.'],
    ['Чем подтверждается ваше родство?','Çem pattverjdáyetsa váshe rótstva?','Akrabalığınız neyle kanıtlanıyor?','Наше родство подтверждается свидетельствами о рождении.','Náşe rótstva pattverjdáyetsa svidyételstvami a rajdénii.','Akrabalığımız doğum belgeleriyle kanıtlanıyor.']]],
  ['ru_int_18','B2','💼','İş Vizesi ve Toplantılar','Davet eden şirket, görev ve ziyaret kapsamı',[
    ['деловая виза','Dilaváya víza','iş vizesi','Ticari/mesleki ziyaret vizesi.'],['деловые переговоры','Dilavıye pirigavórı','iş görüşmeleri','Ticari müzakere.'],['принимающая компания','Prinimáyuşşaya kampániya','kabul eden şirket','Rusya’daki iş ortağı.'],['служебная цель','Sluzhébnaya tsel','mesleki amaç','Görevle ilgili ziyaret nedeni.']], [
    ['С какой деловой целью вы едете?','S kakóy dilavóy tsélyu vı yédite?','Hangi iş amacıyla gidiyorsunuz?','Я еду на переговоры с нашим дистрибьютором.','Ya yédu na pirigavórı s náşim distribyútoram.','Distribütörümüzle görüşmeye gidiyorum.'],
    ['Кто оплачивает командировку?','Kto apláçivayet kamandirófku?','İş seyahatini kim ödüyor?','Все расходы оплачивает мой работодатель.','Vse rashódı apláçivayet moy rabatadátel.','Tüm masrafları işverenim karşılıyor.']]],
  ['ru_int_19','B2','🎓','Öğrenci Vizesi Görüşmesi','Üniversite daveti, bölüm, eğitim ve ödeme bilgileri',[
    ['учебная виза','Uçébnaya víza','öğrenci vizesi','Eğitim amacıyla verilen vize.'],['учебное заведение','Uçébnaye zavidéniye','eğitim kurumu','Üniversite veya okul.'],['договор на обучение','Dagavór na abuçéniye','eğitim sözleşmesi','Kurs ve ücret koşullarını gösterir.'],['уровень образования','Úravi n abrazavániya','eğitim düzeyi','Önceki akademik yeterlik.']], [
    ['В каком вузе вы будете учиться?','V kakóm vúze vı búdite uçítşa?','Hangi üniversitede okuyacaksınız?','Я буду учиться в Казанском федеральном университете.','Ya búdu uçítşa v Kazánskam fidíralnam univirsitéte.','Kazan Federal Üniversitesinde okuyacağım.'],
    ['Кто оплачивает ваше обучение?','Kto apláçivayet váshe abuçéniye?','Eğitiminizi kim ödüyor?','Обучение оплачивает моя семья.','Abuçéniye apláçivayet mayá simyá.','Eğitimimi ailem ödüyor.']],
  'Gerçek amaç veya davetin doğruluğu konusunda şüphe oluşursa eğitim sözleşmesi, ödeme ve önceki eğitimle ilgili ek belgeler istenebilir.'],
  ['ru_int_20','B2','🔎','Belge Tutarlılığı ve Ek Açıklama','Form, pasaport, davet ve rezervasyon arasındaki farkları açıklama',[
    ['несоответствие','Nisaatvyétstviye','uyuşmazlık','İki bilgideki çelişki.'],['уточнить сведения','Utaçnít svyédiniya','bilgileri netleştirmek','Eksik veya belirsiz alanı açıklamak.'],['дополнительный документ','Dapalnítelnıy dakumyént','ek belge','Sonradan istenen kanıt.'],['исправление','İspravléniye','düzeltme','Yanlış bilginin düzeltilmesi.']], [
    ['Почему даты в анкете и брони разные?','Paçimú dátı v ankyéte i bróni ráznıye?','Form ve rezervasyondaki tarihler neden farklı?', 'Я изменил дату вылета и приложил новую бронь.','Ya izminíl dátu výleta i prilajíl nóvuyu bron.','Uçuş tarihini değiştirdim ve yeni rezervasyonu ekledim.'],
    ['Вы можете подтвердить это документом?','Vı mójite pattverdít éta dakumyéntam?','Bunu belgeyle doğrulayabilir misiniz?','Да, вот новый билет и письмо гостиницы.','Da, vot nóvıy bilét i pismó gastínitsı.','Evet, yeni bilet ve otel yazısı burada.']]],
  ['ru_int_21','B1','📄','Vatandaşlık Başvuru Nedeni ve Statü','Başvuru dayanağı ile mevcut göçmenlik statüsünü açıklama',[
    ['приём в гражданство','Priyóm v grajdanstva','vatandaşlığa kabul','Sonradan vatandaşlık kazanma.'],['основание','Asnavániye','hukuki dayanak','Başvuru hakkını doğuran neden.'],['вид на жительство','Vit na jítelstva','ikamet izni','Daimî oturum belgesi.'],['законное проживание','Zakónnaye prajivániye','yasal ikamet','Geçerli statüyle yaşama.']], [
    ['На каком основании вы подаёте заявление?','Na kakóm asnavánii vı padayóte zayavléniye?','Hangi dayanakla başvuruyorsunuz?','Я подаю заявление на основании постоянного проживания.','Ya padayú zayavléniye na asnavánii pastayánnava prajivániya.','Daimî ikamet dayanağıyla başvuruyorum.'],
    ['Какой у вас миграционный статус?','Kakóy u vas migratsiónnıy státus?','Göçmenlik statünüz nedir?','У меня действующий вид на жительство.','U minyá déystvuyuşşiy vit na jítelstva.','Geçerli ikamet iznim var.']],
  'Güncel başvuru yolu ve istisnalar kişiye göre değişir; bu dil alıştırması hukuki danışmanlık değildir.'],
  ['ru_int_22','B1','✍️','Ad ve Soyadı Değişiklikleri','Evlilik, boşanma veya resmî değişiklikleri belgeleme',[
    ['смена фамилии','Smyéna famílii','soyadı değişikliği','Resmî soyadı değişimi.'],['перемена имени','Pirimyéna ímini','ad değişikliği','Adın resmen değiştirilmesi.'],['свидетельство о разводе','Svidyételstva a razvóde','boşanma belgesi','Önceki evliliğin sona erdiğini gösterir.'],['нотариальный перевод','Natar iálnıy pirivót','noter onaylı çeviri','Yabancı dildeki belge çevirisi.']], [
    ['Почему у вас была другая фамилия?','Paçimú u vas bılá drugáya famíliya?','Neden başka bir soyadınız vardı?','Я сменила фамилию после заключения брака.','Ya sminíla famíliyu pósle zaklyuçéniya bráka.','Evlendikten sonra soyadımı değiştirdim.'],
    ['У вас есть подтверждающий документ?','U vas yest pattverjdáyuşşiy dakumyént?','Doğrulayan belgeniz var mı?','Да, я приложила свидетельство о браке с переводом.','Da, ya prilajíla svidyételstva a bráke s pirivódam.','Evet, çevirili evlilik belgesini ekledim.']]],
  ['ru_int_23','B2','🏡','İkamet Geçmişi ve Yurtdışı Süreleri','Adresler, Rusya dışındaki dönemler ve yasal kalış',[
    ['история проживания','İstóriya prajivániya','ikamet geçmişi','Önceki adres ve tarihler.'],['постоянно проживать','Pastayánna prajivát','daimî ikamet etmek','Bir yerde sürekli yasal yaşamak.'],['период отсутствия','Piriyot atsútstviya','ülke dışında kalınan dönem','Rusya dışındaki süre.'],['место жительства','Mésta jítelstva','ikamet yeri','Resmî yaşama adresi.']], [
    ['Сколько лет вы живёте в России?','Skólka let vı jivyóte v Rassíi?','Kaç yıldır Rusya’da yaşıyorsunuz?','Я постоянно живу в России шесть лет.','Ya pastayánna jivú v Rassíi şest let.','Altı yıldır Rusya’da daimî yaşıyorum.'],
    ['Почему вы долго находились за границей?','Paçimú vı dólga nahadílis za granítsey?','Neden uzun süre yurtdışındaydınız?','Я ухаживал за больным отцом и приложил справки.','Ya uhájival za balnım attsóm i prilajíl spráfki.','Hasta babama baktım ve belgeleri ekledim.']]],
  ['ru_int_24','B1','👪','Aile Üyeleri ve Çocuklar','Eş, ebeveyn, çocuk ve vatandaşlık bilgileri',[
    ['член семьи','Çlen simyí','aile üyesi','Eş, çocuk veya ebeveyn.'],['несовершеннолетний ребёнок','Nisavirşinnalétniy ribyónak','reşit olmayan çocuk','18 yaşından küçük çocuk.'],['гражданство ребёнка','Grajdanstva ribyónka','çocuğun vatandaşlığı','Çocuğun hukuki uyruğu.'],['совместно проживать','Savméstna prajivát','birlikte yaşamak','Aynı hanede yaşamak.']], [
    ['Кто из членов семьи живёт с вами?','Kto iz çlénav simyí jivyót s vámi?','Aile üyelerinden kim sizinle yaşıyor?','Со мной живут супруга и сын.','Sa mnoy jivút suprúga i sın.','Eşim ve oğlum benimle yaşıyor.'],
    ['Какое гражданство у вашего сына?','Kakóye grajdanstva u vášiva sýna?','Oğlunuzun vatandaşlığı nedir?','У него гражданство Турции.','U nivó grajdanstva Túrtsii.','Türkiye vatandaşlığı var.']]],
  ['ru_int_25','B2','💼','Eğitim, İş ve Gelir Kaynağı','Özgeçmiş, meslek ve geçim kaynağını açıklama',[
    ['образование','Abrazavániye','eğitim','Tamamlanan okul ve diploma.'],['трудовая деятельность','Trudaváya déyatel nast','çalışma hayatı','İş geçmişi.'],['профессия','Praféssiya','meslek','Uzmanlık alanı.'],['источник средств','İstóçnik srétstv','geçim kaynağı','Yasal gelir kaynağı.']], [
    ['Расскажите о вашем образовании и работе.','Rasskaj íti a vášim abrazavánii i rabóte.','Eğitiminiz ve işinizden söz edin.','Я окончил университет и работаю инженером.','Ya akónçil univirsitét i rabótayu injiné ram.','Üniversiteyi bitirdim ve mühendis olarak çalışıyorum.'],
    ['Каков ваш источник средств к существованию?','Kakóf vaş istóçnik srétstv k suşşistvavániyu?','Geçim kaynağınız nedir?','Мой основной источник дохода — заработная плата.','Moy asnavnóy istóçnik dahóda — zárabatnaya pláta.','Temel gelir kaynağım maaşımdır.']]],
  ['ru_int_26','B2','🗣️','Rusça Görüşmesi: Biyografi','Biyografi, aile, taşınma ve günlük yaşamı bağlantılı anlatma',[
    ['собеседование','Sabisedavániye','mülakat/görüşme','Komisyon veya memurla görüşme.'],['биография','Biagráfiya','biyografi','Kişinin yaşam öyküsü.'],['связно рассказать','Svyázna rasskazát','bağlantılı anlatmak','Düşünceleri mantıklı sırayla aktarmak.'],['переезд','Pereyézd','taşınma','Başka ülke/şehre yerleşme.']], [
    ['Расскажите кратко о своей биографии.','Rasskaj íti krátka a svayéy biagráfii.','Kısaca biyografinizi anlatın.','Я родился в Бурсе, окончил университет и в 2020 году переехал в Казань.','Ya radílsya v Búrse, akónçil univirsitét i v dve týsiçi dvátsatam gadú pereyéhal v Kazán.','Bursa’da doğdum, üniversiteyi bitirdim ve 2020’de Kazan’a taşındım.'],
    ['Почему вы переехали в Россию?','Paçimú vı pereyéhali v Rassíyu?','Neden Rusya’ya taşındınız?','Я получил работу и хотел жить вместе с семьёй.','Ya paluçíl rabótu i hatél jit vméste s simyóy.','İş buldum ve ailemle yaşamak istedim.']]],
  ['ru_int_27','B2','📚','Rus Dili, Tarih ve Hukuk Bilgisi','Dil yeterliği ve gerekli bilgi belgeleri hakkında konuşma',[
    ['владение русским языком','Vladéniye rússkim yazıkóm','Rusça yeterliği','Rusçayı kullanabilme düzeyi.'],['история России','İstóriya Rassíi','Rusya tarihi','Bilgi şartının alanlarından biri.'],['основы законодательства','Asnóvı zakanadátelstva','hukukun temelleri','Temel mevzuat bilgisi.'],['сертификат','Sirtifikát','sertifika','Yeterliği doğrulayan belge.']], [
    ['Чем вы подтверждаете владение русским языком?','Çem vı pattverjdáyete vladéniye rússkim yazıkóm?','Rusça yeterliğinizi neyle kanıtlıyorsunuz?','Я сдал экзамен и получил сертификат.','Ya zdal ekzámin i paluçíl sirtifikát.','Sınavı geçip sertifika aldım.'],
    ['Вы сдавали историю и основы законодательства?','Vı zdaváli istóriyu i asnóvı zakanadátelstva?','Tarih ve hukuk temelleri sınavına girdiniz mi?','Да, результаты указаны в сертификате.','Da, r izultátı ukázanı v sirtifikáte.','Evet, sonuçlar sertifikada yazıyor.']],
  'Gerekli sınav/belge ve muafiyetler başvuru dayanağına göre değişebilir; güncel MVD listesini kontrol edin.'],
  ['ru_int_28','C1','⚖️','Adli Geçmiş ve Doğru Beyan','Mahkûmiyet, devam eden işlem ve belge doğruluğu',[
    ['судимость','Sudímast','adli sicil/mahkûmiyet','Ceza mahkûmiyeti kaydı.'],['уголовное преследование','Ugalóvnaye pris lédavaniye','ceza soruşturması/kovuşturması','Devam eden ceza işlemi.'],['достоверные сведения','Dastavyérnıye svyédiniya','doğru bilgiler','Gerçeğe uygun beyanlar.'],['ложные сведения','Lójnıye svyédiniya','yanlış bilgiler','Gerçeğe aykırı beyan.']], [
    ['У вас есть судимость?','U vas yest sudímast?','Adli sicil kaydınız var mı?','Нет, я не был судим.','Nyet, ya ni bıl sudím.','Hayır, mahkûm olmadım.'],
    ['Вы подтверждаете достоверность сведений?','Vı pattverjdáyete dastavyérnast svyédiniy?','Bilgilerin doğruluğunu onaylıyor musunuz?','Да, все сведения полные и достоверные.','Da, vse svyédiniya pólnıye i dastavyérnıye.','Evet, tüm bilgiler eksiksiz ve doğrudur.']]],
  ['ru_int_29','B2','🤝','Vatandaşlık Yemini','Yemin metni, tören ve vatandaşlık belgesi',[
    ['присяга гражданина','Prisyága grajdanína','vatandaşlık yemini','Vatandaşlığa kabulde edilen yemin.'],['принести присягу','Prinistí prisyágu','yemin etmek','Resmî biçimde yemin vermek.'],['соблюдать Конституцию','Sablyudát Kanstitútsiyu','Anayasa’ya uymak','Yemindeki yükümlülüklerden biri.'],['решение о приёме','Rişéniye a priyóme','kabul kararı','Vatandaşlığa kabul kararı.']], [
    ['Вы готовы принести Присягу гражданина России?','Vı gatóvı prinistí prisyágu grajdanína Rassíi?','Rusya vatandaşlık yemini etmeye hazır mısınız?','Да, я готов принести присягу.','Da, ya gatóf prinistí prisyágu.','Evet, yemin etmeye hazırım.'],
    ['Вы понимаете текст присяги?','Vı panimáyete tekst prisyági?','Yemin metnini anlıyor musunuz?','Да, я понимаю свои обязанности.','Da, ya panimáyu svaí abyázannasti.','Evet, yükümlülüklerimi anlıyorum.']],
  'Yeminin uygulanması ve istisnaları için 889 sayılı Kararname ekindeki güncel usule bakılmalıdır.'],
  ['ru_int_30','C1','🎤','Tam Prova: Vize ve Vatandaşlık Görüşmesi','Kimlik, amaç, belgeler ve doğru beyanı birleştiren tam prova',[
    ['последовательный ответ','Paslidavátelnıy atvyét','tutarlı yanıt','Önceki beyanlarla çelişmeyen cevap.'],['подтверждающий документ','Pattverjdáyuşşiy dakumyént','doğrulayıcı belge','Cevabı destekleyen resmî kanıt.'],['уточняющий вопрос','Utaçnyáyuşşiy vaprós','açıklayıcı ek soru','Ayrıntıyı netleştiren soru.'],['личная подпись','Líçnaya pó tpis','kişisel imza','Başvuranın kendi imzası.']], [
    ['В анкете указан другой адрес. Объясните, пожалуйста.','V ankyéte úkazan drugóy ádres. Abyasníti, pajálusta.','Formda başka adres yazıyor. Lütfen açıklayın.','Я переехал месяц назад и приложил новую регистрацию.','Ya pereyéhal mésyats nazát i prilajíl nóvuyu registrátsiyu.','Bir ay önce taşındım ve yeni kayıt belgesini ekledim.'],
    ['Вы подтверждаете, что ваши ответы правдивы?','Vı pattverjdáyete, şto váşi atvyétı pravdívı?','Cevaplarınızın doğru olduğunu onaylıyor musunuz?','Да, ответы соответствуют моим документам.','Da, atvyétı saatvyétstvuyut maím dakumyéntam.','Evet, cevaplarım belgelerimle uyumludur.']],
  'Ezberlenmiş kurgu cevap vermeyin. Formdaki hata veya değişikliği tarih, neden ve yeni belgeyle açıkça düzeltin.'],
];

export const CIT_RU_INTERVIEW: UnitModule[] = SPECS.map(build);

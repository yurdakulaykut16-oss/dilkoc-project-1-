export interface SubTopic {
  id: string;
  category: 'Gündelik Hayat' | 'Aile & Arkadaşlık' | 'Emlak & Barınma' | 'Ticaret & İş' | 'Seyehat & Turizm';
  title: string;
  theory: string;
  // Yanlış yapıldığında devreye girecek alternatif soru varyasyonları
  variations: {
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  }[];
}

export const RUSSIAN_ADVANCED_CURRICULUM: Record<string, SubTopic[]> = {
  A1: [
    {
      id: 'a1_family_1',
      category: 'Aile & Arkadaşlık',
      title: 'İsim Cinsiyetleri ve İyelik Zamirleri (Мой / Моя / Моё)',
      theory: "Rusçada 'Benim' derken kelimenin cinsiyetine bakılır. Eril isimler için 'Мой', Dişil için 'Моя', Nötr için 'Моё' kullanılır. Biyolojik erkekler (папа, дедушка) '-а' ile bitse bile Erildir.",
      variations: [
        {
          question: "'Bu benim ailem' derken 'Семья' (Dişil) kelimesi için hangi iyelik zamiri seçilmelidir?",
          options: ["Мой семья", "Моя семья", "Моё семья", "Мои семья"],
          correctAnswer: "Моя семья",
          explanation: "'Семья' kelimesi '-я' ile bittiği için Dişildir; 'Моя' gerektirir."
        },
        {
          question: "(Varyasyon 2) 'Bu benim babam' cümlesinde 'Папа' kelimesinin biyolojik cinsiyetine göre doğru kullanım hangisidir?",
          options: ["Моя папа", "Мой папа", "Моё папа", "Мои папа"],
          correctAnswer: "Мой папа",
          explanation: "'Папа' biyolojik olarak erkek olduğu için biçimsel olarak '-а' ile bitse de Erildir (Мой)."
        }
      ]
    },
    {
      id: 'a1_realestate_1',
      category: 'Emlak & Barınma',
      title: "Ev/Daire Tanımlama ve 'Где' (Nerede) Kalıbı",
      theory: "Ev ararken ve konum bildirirken 'Где' kullanılır. 'Gde Kvartira?' (Daire nerede?). Cevap verirken 'Это...' (Bu...) kalıbıyla başlanır.",
      variations: [
        {
          question: "'Bu büyük bir daire' cümlesinde 'Квартира' (Dişil) için doğru sıfat çekimi hangisidir?",
          options: ["Это большой квартира", "Это большая квартира", "Это большое квартира", "Это большие квартира"],
          correctAnswer: "Это большая квартира",
          explanation: "Dişil isimlerle kullanılan sıfatlar '-ая' eki alır (Большая)."
        },
        {
          question: "(Varyasyon 2) Emlakçıya 'Kiralık daire nerede?' diye sormak için doğru dizilim hangisidir?",
          options: ["Где квартира?", "Как квартира?", "Кто квартира?", "Что квартира?"],
          correctAnswer: "Где квартира?",
          explanation: "'Где' kelimesi mekan ve konum sormak için kullanılır."
        }
      ]
    },
    {
      id: 'a1_trade_1',
      category: 'Ticaret & İş',
      title: "Fiyat Sorma ve 'Сколько стоит' Kalıbı",
      theory: "Ticarette veya alışverişte 'Bu ne kadar?' demek için 'Сколько стоит...?' kalıbı kullanılır.",
      variations: [
        {
          question: "'Bu ürün / şey ne kadar?' sorusunun Rusça karşılığı hangisidir?",
          options: ["Сколько стоит это?", "Где стоит это?", "Кто стоит это?", "Как стоит это?"],
          correctAnswer: "Сколько стоит это?",
          explanation: "'Сколько стоит' kelime anlamıyla 'Ne kadar tutuyor/maliyeti ne?' demektir."
        }
      ]
    }
  ]
};
import { LevelData } from './types';

export const COURSE_DATA: Record<string, LevelData> = {
  A1: {
    title: 'A1 - Başlangıç Seviyesi',
    vocabulary: [
      { word: 'Always', meaning: 'Her zaman', example: 'I always wake up early.' },
      { word: 'Family', meaning: 'Aile', example: 'I love my family.' }
    ],
    grammar: [
      { title: 'Present Simple', rule: 'Geniş zaman alışkanlıkları anlatır.', examples: ['I live in Istanbul.', 'He plays football.'] }
    ],
    reading: [
      { title: 'My Routine', text: 'I wake up at 7 AM every day.', translation: 'Her gün sabah 7\'de uyanırım.' }
    ]
  },
  A2: {
    title: 'A2 - Temel Seviye',
    vocabulary: [
      { word: 'Schedule', meaning: 'Program / Takvim', example: 'Check the schedule.' },
      { word: 'Travel', meaning: 'Seyahat', example: 'I travel by train.' }
    ],
    grammar: [
      { title: 'Past Simple', rule: 'Geçmişte bitmiş eylemler.', examples: ['I visited London.', 'She didn\'t call me.'] }
    ],
    reading: [
      { title: 'A Trip to Beach', text: 'We went to the beach yesterday.', translation: 'Dün plaja gittik.' }
    ]
  },
  B1: {
    title: 'B1 - Orta Seviye',
    vocabulary: [
      { word: 'Improve', meaning: 'Geliştirmek', example: 'Practice to improve.' },
      { word: 'Opportunity', meaning: 'Fırsat', example: 'Take this opportunity.' }
    ],
    grammar: [
      { title: 'Present Perfect', rule: 'Geçmişle bağı kopmamış durumlar.', examples: ['I have lived here for 2 years.', 'Have you seen it?'] }
    ],
    reading: [
      { title: 'Job Interview', text: 'Preparing for an interview is essential.', translation: 'Mülakata hazırlanmak gereklidir.' }
    ]
  },
  B2: {
    title: 'B2 - Orta-Üstü Seviye',
    vocabulary: [
      { word: 'Substantial', meaning: 'Kayda değer / Önemli', example: 'A substantial increase.' },
      { word: 'Consequence', meaning: 'Sonuç / Netice', example: 'Think about consequences.' }
    ],
    grammar: [
      { title: 'Conditionals (Type 2)', rule: 'Varsayımsal günümüz durumları.', examples: ['If I had money, I would buy a boat.'] }
    ],
    reading: [
      { title: 'Technology Trend', text: 'AI is changing how we work.', translation: 'Yapay zeka çalışma şeklimizi değiştiriyor.' }
    ]
  },
  C1: {
    title: 'C1 - İleri Seviye',
    vocabulary: [
      { word: 'Ambiguous', meaning: 'Belirsiz / Muğlak', example: 'An ambiguous answer.' },
      { word: 'Foster', meaning: 'Teşvik etmek / Büyütmek', example: 'Foster creativity.' }
    ],
    grammar: [
      { title: 'Inversion', rule: 'Vurgu için devrik cümle yapısı.', examples: ['Hardly had I arrived when it rained.'] }
    ],
    reading: [
      { title: 'Climate Reform', text: 'Systemic reform is needed urgently.', translation: 'Acilen sistemik reform gerekiyor.' }
    ]
  },
  C2: {
    title: 'C2 - Usta Seviye',
    vocabulary: [
      { word: 'Ephemeral', meaning: 'Geçici / Fani', example: 'Fame is ephemeral.' },
      { word: 'Quintessential', meaning: 'Mükemmel örnek', example: 'The quintessential style.' }
    ],
    grammar: [
      { title: 'Subjunctive Mood', rule: 'Resmi gereklilik ve dilek yapıları.', examples: ['It is vital that he be present.'] }
    ],
    reading: [
      { title: 'Philosophy', text: 'The dichotomy between mind and matter.', translation: 'Zihin ve madde arasındaki ikilem.' }
    ]
  }
};
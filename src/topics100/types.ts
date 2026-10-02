export type Topic100Cat = 'harf' | 'fonetik' | 'mufredat';

export type CefrTag = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'C1/C2';

export interface Topic100Item {
  ru: string;
  reading: string;
  tr: string;
  unitId?: string;
  level?: CefrTag;
}

export interface Topic100Sentence {
  ru: string;
  tr: string;
  unitId?: string;
  level?: CefrTag;
}

export interface Topic100Line {
  speaker: string;
  ru: string;
  reading: string;
  tr: string;
  unitId?: string;
  level?: CefrTag;
}

export interface Topic100 {
  id: string;
  num: number;
  cat: Topic100Cat;
  icon: string;
  titleRu?: string;
  titleTr: string;
  descTr: string;
  letterGlyph?: string;
  unitId?: string;
  levelGroup?: CefrTag;
  items: Topic100Item[];
  sentences: Topic100Sentence[];
  dialogue: Topic100Line[];
}

export interface Topic100Question {
  type: 'word' | 'letter' | 'mixed';
  prompt: string;
  answer: string;
  options: string[];
  audio: string;
  hint: string;
}

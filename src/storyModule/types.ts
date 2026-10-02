export interface StoryLine {
  speaker: string;
  ru: string;
  reading: string;
  tr: string;
  narrator?: boolean;
}

export interface StoryNewWord {
  ru: string;
  reading: string;
  tr: string;
  note: string;
}

export interface StoryKeyPoint {
  id: string;
  textTr: string;
  hintTr: string;
  keywordGroups: string[][];
}

export interface StoryMislead {
  tokens: string[];
  noteTr: string;
}

export type StoryKind = 'checkpoint' | 'levelFinal';

export interface CheckpointStory {
  id: string;
  kind: StoryKind;
  checkpoint: number | null;
  unitFrom: number;
  unitTo: number;
  levelId?: 'A1' | 'A2' | 'B1' | 'B2' | 'C1/C2';
  nextLevelId?: 'A1' | 'A2' | 'B1' | 'B2' | 'C1/C2';
  titleRu: string;
  titleTr: string;
  framingTr: string;
  icon: string;
  color: string;
  paragraphs: StoryLine[];
  newWords: StoryNewWord[];
  keyPoints: StoryKeyPoint[];
  misleading: StoryMislead[];
  recycleWords?: { ru: string; tr: string; from: string }[];
}

export interface SummaryEvaluation {
  wordCount: number;
  tooShort: boolean;
  wrongLanguage: boolean;
  matched: { id: string; textTr: string }[];
  missing: { id: string; hintTr: string }[];
  misunderstood: { noteTr: string }[];
  correctCount: number;
  issueCount: number;
  scorePercent: number;
  title: string;
  message: string;
  tips: string[];
}

export interface Vocabulary {
  word: string;
  meaning: string;
  example: string;
}

export interface GrammarTopic {
  title: string;
  rule: string;
  examples: string[];
}

export interface ReadingText {
  title: string;
  text: string;
  translation: string;
}

export interface LevelData {
  title: string;
  vocabulary: Vocabulary[];
  grammar: GrammarTopic[];
  reading: ReadingText[];
}
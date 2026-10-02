import AiChat from './AiChat';
import type { AiChatProps } from './AiChat';

export interface AiTutorProps extends AiChatProps {
  addMistake: (ru: string, tr: string, reason: string) => void;
  addToSRS: (ru: string, tr: string, type: 'word' | 'letter') => void;
  onEarnXp: (amount: number) => void;
}

export default function AiTutor({
  completedUnits,
  completedTopics,
  completedAlpha,
  completedGrammar,
  learningFocus,
  mistakes,
  srsBank,
}: AiTutorProps) {
  return (
    <AiChat
      completedUnits={completedUnits}
      completedTopics={completedTopics}
      completedAlpha={completedAlpha}
      completedGrammar={completedGrammar}
      learningFocus={learningFocus}
      mistakes={mistakes}
      srsBank={srsBank}
    />
  );
}

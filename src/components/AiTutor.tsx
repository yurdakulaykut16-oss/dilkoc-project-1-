import AiChat from './AiChat';
import type { AiChatProps } from './AiChat';

/**
 * AI ekranı yalnızca serbest sohbet ajanıdır.
 * Günlük soru listesi, otomatik görevler, mikrofonlu tekrar ve gezegen koçu
 * burada özellikle çalıştırılmaz; kullanıcı ne sorarsa ajan ona göre cevap verir.
 */
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

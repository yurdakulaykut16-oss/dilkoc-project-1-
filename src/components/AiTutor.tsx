import AiChat from './AiChat';
import type { AiChatProps } from './AiChat';

export interface AiTutorProps extends AiChatProps {
  addMistake: (ru: string, tr: string, reason: string) => void;
  addToSRS: (ru: string, tr: string, type: 'word' | 'letter') => void;
  onEarnXp: (amount: number) => void;
}

/**
 * AiTutor, sohbet ajanını uygulamanın koç altyapısına bağlayan ince sarmalayıcıdır.
 * Hata defteri, SRS kutusu ve XP geri çağrıları artık ajana kadar iletilir; böylece
 * ajan "zayıf konularım neler?" gibi soruları gerçek kullanıcı verisiyle yanıtlar
 * ve cevaplardaki kelimeler tek dokunuşla tekrar kutusuna eklenebilir.
 */
export default function AiTutor({
  completedUnits,
  completedTopics,
  completedAlpha,
  completedGrammar,
  learningFocus,
  mistakes,
  srsBank,
  addMistake,
  addToSRS,
  onEarnXp,
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
      addMistake={addMistake}
      addToSRS={addToSRS}
      onEarnXp={onEarnXp}
    />
  );
}

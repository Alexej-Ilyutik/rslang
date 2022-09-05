/* eslint-disable no-await-in-loop */
import { WordDifficulty, DateFormat } from '../shared/types';
import API from './api';

export const getWordProperties = async (
  wordId: string,
): Promise<{
  difficultyValue: WordDifficulty;
  guessCounterValue: number;
  firstShowedDateValue: Date | undefined;
  learnDateValue: DateFormat;
}> => {
  const arrayOfUserWords = await API.getUserWords();
  let wordIndex: number | null = null;
  for (let i = 0; i < (await arrayOfUserWords).length; i += 1) {
    if ((await arrayOfUserWords)[i].wordId === wordId) {
      wordIndex = i;
      break;
    }
  }
  if (wordIndex || wordIndex === 0) {
    const { difficulty } = (await arrayOfUserWords)[wordIndex];
    const { guessCounter } = (await arrayOfUserWords)[wordIndex].optional;
    const { firstShowedDate } = (await arrayOfUserWords)[wordIndex].optional;
    const { learnDate } = (await arrayOfUserWords)[wordIndex].optional;
    return {
      difficultyValue: difficulty,
      guessCounterValue: guessCounter,
      firstShowedDateValue: firstShowedDate,
      learnDateValue: learnDate,
    };
  }
  return { difficultyValue: 'normal', guessCounterValue: 0, firstShowedDateValue: undefined, learnDateValue: '' };
};

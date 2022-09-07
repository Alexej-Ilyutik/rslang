/* eslint-disable no-await-in-loop */
import { storage } from '../shared/storage';
import { WordDifficulty } from '../shared/types';
import API from './api';

export const updateWordProperties = async (
  wordId: string,
  isGuessed: boolean | undefined,
  difficultyValue?: WordDifficulty | undefined,
): Promise<void> => {
  const arrayOfWords = await API.getUserWords();
  let wordIndex: number | null = null;
  for (let i = 0; i < (await arrayOfWords).length; i += 1) {
    if ((await arrayOfWords)[i].wordId === wordId) {
      wordIndex = i;
      break;
    }
  }
  if (wordIndex || wordIndex === 0) {
    let { difficulty } = (await arrayOfWords)[wordIndex];
    if (difficultyValue) difficulty = difficultyValue;

    let { guessCounter } = (await arrayOfWords)[wordIndex].optional;

    if (isGuessed !== undefined) {
      if (isGuessed) guessCounter += 1;
      else guessCounter = 0;
    }
    if (guessCounter >= storage.maxGuessNumber && !difficultyValue) difficulty = 'easy';

    let { learnDate } = (await arrayOfWords)[wordIndex].optional;
    if (guessCounter >= storage.maxGuessNumber || difficulty === 'easy') {
      if (guessCounter === storage.maxGuessNumber) {
        // Word has just been learned
        learnDate = new Date().toLocaleDateString('en-GB');
      }
    }
    const { firstShowedDate } = (await arrayOfWords)[wordIndex].optional;

    await API.updateUserWord(wordId, difficulty, guessCounter, firstShowedDate, learnDate);
  } else {
    let difficulty = 'normal';
    if (difficultyValue) difficulty = difficultyValue;

    let guessCounter = 0;
    if (isGuessed !== undefined && isGuessed) guessCounter += 1;

    let learnDate = 'none';
    if (guessCounter >= storage.maxGuessNumber || difficulty === 'easy') {
      if (guessCounter === storage.maxGuessNumber || difficultyValue === 'easy') {
        // Word has just been learned
        learnDate = new Date().toLocaleDateString('en-GB');
      }
    }

    const firstShowedDate = new Date().toLocaleDateString('en-GB');

    await API.createUserWord(wordId, difficulty, guessCounter, firstShowedDate, learnDate);
  }
};

import { WordInterface } from '../shared/types';
import { storage } from '../shared/storage';
import { getRandomNumber } from './getRandomNumber';

export function getGuessWord(currentPage: string | null, arr: WordInterface[]) {
  let guessWordCur: WordInterface;
  if (currentPage === 'Book') {
    guessWordCur = storage.currentPageWords[getRandomNumber(0, 19)];
  } else {
    guessWordCur = arr[getRandomNumber(0, 599)];
  }

  return guessWordCur;
}

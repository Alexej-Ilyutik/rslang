import { WordInterface } from '../shared/types';
import { storage } from '../shared/storage';
import { getRandomNumber } from './getRandomNumber';
import API from './api';

export async function getGuessWord(currentPage: string | null, arr: WordInterface[]) {
  let guessWordCur: WordInterface;
  if (currentPage === 'Book') {
    const learnedWords = (await API.getAggregatedWords('easy')).map((x: { _id: string }) => x._id);
    const words = storage.currentPageWords.filter((x: { id: string }) => !learnedWords.includes(x.id));
    guessWordCur = words[getRandomNumber(0, words.length - 1)];
  } else {
    guessWordCur = arr[getRandomNumber(0, 599)];
  }
  return guessWordCur;
}

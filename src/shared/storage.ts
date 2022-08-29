import { WordInterface } from './types';

interface StorageInterface {
  wordsListCurrentPage: number;
  wordsListCurrentGroup: number;
  limitOfPages: number; // delete it
  maxGuessNumber: number;
  userWords: WordInterface[];
}

export const storage: StorageInterface = {
  wordsListCurrentPage: 0,
  wordsListCurrentGroup: 0,
  limitOfPages: 30,
  maxGuessNumber: 5,
  userWords: [],
};

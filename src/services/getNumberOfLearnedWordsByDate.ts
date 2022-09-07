/* eslint-disable no-await-in-loop */
import { WordInterface } from '../shared/types';
import API from './api';

export const getNumberOfLearnedWordsByDate = async (date: string): Promise<number> => {
  const learnedWordsArray: WordInterface[] = await API.getAggregatedWords('easy');

  let numberOfLearnedWords = 0;
  for (let i = 0; i < learnedWordsArray.length; i += 1) {
    if (learnedWordsArray[i].userWord?.optional.learnDate === date) numberOfLearnedWords += 1;
  }
  return numberOfLearnedWords;
};

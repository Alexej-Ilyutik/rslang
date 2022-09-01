/* eslint-disable no-await-in-loop */
import { UserWordInterface } from "../shared/types"
import API from './api';

export const updateWordProperties = async (wordId: string, isGuessed: boolean): Promise<void> => {
  const arrayOfWords: Promise<UserWordInterface[]> = API.getUserWords();
  let wordIndex: number | null = null;
  for (let i = 0; i < (await arrayOfWords).length; i += 1) {
    if ((await arrayOfWords)[i].wordId === wordId) {
      wordIndex = i;
      break;
    }
  }
  if (wordIndex || wordIndex === 0) {
    const {difficulty} = (await arrayOfWords)[wordIndex];
    const {firstShowedDate} = (await arrayOfWords)[wordIndex].optional;
    let {guessCounter} = (await arrayOfWords)[wordIndex].optional;
    if (isGuessed) guessCounter += 1;
    else guessCounter = 0;
    API.updateUserWord(wordId, difficulty, guessCounter, firstShowedDate);
  } else {
    let guessCounter = 0;
    if (isGuessed) guessCounter += 1;
    const currentDate = new Date();
    API.createUserWord(wordId, 'normal', guessCounter, currentDate);
  }
}

/* eslint-disable no-await-in-loop */
/* eslint-disable no-underscore-dangle */
import { PageOfWordsInterface, WordInterface } from "../shared/types"
import API from "./api"

export const getWordsWithFullInformation = async (arrayOfWords: WordInterface[]): PageOfWordsInterface => {
  const userWords = await API.getUserWords();
  const arrayOfWordsWithFullInformation: WordInterface[] = [...arrayOfWords];

  arrayOfWordsWithFullInformation.forEach(async (element) => {
    for (let i = 0; i < (await userWords).length; i += 1) {
      if (element.id === userWords[i]._id) {
        element.userWord = userWords[i].userWord;
      } else {
        element.userWord = {difficulty: '', optional: {guessCounter: 0}};
      }
    }
  })
  return arrayOfWordsWithFullInformation;
}

export type WordDifficulty = 'hard' | 'easy' | '';

export interface WordInterface {
  id: string,
  _id?: string,
  group: number,
  page: number,
  word: string,
  image: string,
  audio: string,
  audioMeaning: string,
  audioExample: string,
  textMeaning: string,
  textExample: string,
  transcription: string,
  wordTranslate: string,
  textMeaningTranslate: string,
  textExampleTranslate: string,
  userWord?: { difficulty?: WordDifficulty, optional: { guessCounter: number, firstShowedDate?: Date }}
};

export type PageOfWordsInterface = Promise<WordInterface[]>;

export interface UserWordInterface {
  difficulty: WordDifficulty,
  id: string,
  optional: {
    guessCounter: number,
    firstShowedDate: Date, // When create new user's word put current Date here.
  },
  wordId: string,
}

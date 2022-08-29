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
  userWord?: { difficulty: string, optional: { guessCounter: number }}
};

export type PageOfWordsInterface = Promise<WordInterface[]>;

export interface UserWordInterface {
  difficulty: string,
  id: string,
  optional: {guessCounter: number},
  wordId: string,
}

// export type WordDifficulty = 'hard' | 'easy';

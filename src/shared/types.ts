export type WordDifficulty = 'hard' | 'easy' | 'normal';

export interface WordInterface {
  id: string;
  _id?: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
  userWord?: UserWordInterface;
}

export type PageOfWordsInterface = Promise<WordInterface[]>;

export interface UserWordInterface {
  difficulty: WordDifficulty;
  id: string;
  optional: {
    guessCounter: number;
    firstShowedDate: DateFormat;
    learnDate: DateFormat;
  };
  wordId: string;
}

export type GameNameType = 'sprintGame' | 'audioGame';

export interface GameStatisticInterface {
  newWordsCount: number;
  accuracy: number;
  bestStreak: number;
}

export type DateFormat = string;

export interface UserStatisticInterfaceAll {
  id: string;
  learnedWords: number;
  optional: UserStatisticInterface;
}

export type UserStatisticInterface = {
  [date in DateFormat]: {
    gamesStatistic: {
      sprintGame: GameStatisticInterface[];
      audioGame: GameStatisticInterface[];
    };
    globalStatistic: {
      learnedWordsToday: number;
    };
  };
};

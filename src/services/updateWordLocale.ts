import { WordInterface } from "../shared/types"

export const updateWordLocale = async (arrayOfWords: WordInterface[], wordId: string, isGuessed: boolean): Promise<void> => {
  let counter;
  if (isGuessed) counter = 1;
  else counter = -1;
}

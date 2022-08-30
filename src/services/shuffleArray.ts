import { WordInterface } from '../shared/types';

export function shuffle(array: WordInterface[]) {
  const newArr = array.sort(() => Math.random() - 0.5);
  return newArr;
}

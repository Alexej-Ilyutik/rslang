import { updateWordProperties } from './updateWordProperties';
import { WordInterface } from '../shared/types';

export const updateWord = async (arrTrue: WordInterface[], arrFalse: WordInterface[]) => {
  await Promise.all(
    arrTrue.map(async x => {
      if (x.id) {
        await updateWordProperties(x.id, true, undefined);
      }
    }),
  );
  await Promise.all(
    arrFalse.map(async x => {
      if (x.id) {
        await updateWordProperties(x.id, true, undefined);
      }
    }),
  );
};

import { updateWordProperties } from "./updateWordProperties";
import { WordInterface } from "../shared/types";

export const updateWords = async (correct: WordInterface[], incorrect: WordInterface[]) => {
  await Promise.all(
    correct.map(async (x) => {
      if (x.id) {
        await updateWordProperties(x.id, true, undefined);
      } else if (x._id) {
        await updateWordProperties(x._id, true, undefined);
      }
    }),
  );
  await Promise.all(
    incorrect.map(async (x) => {
      if (x.id) {
        await updateWordProperties(x.id, false, undefined);
      } else if (x._id) {
        await updateWordProperties(x._id, false, undefined);
      }
    }),
  );
};

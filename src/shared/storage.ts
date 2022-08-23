interface StorageInterface {
  wordsListCurrentPage: number;
  wordsListCurrentGroup: number;
  limitOfPages: number; // delete it
}

export const storage: StorageInterface = {
  wordsListCurrentPage: 1,
  wordsListCurrentGroup: 1,
  limitOfPages: 10,
};

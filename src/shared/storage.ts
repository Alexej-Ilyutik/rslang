interface StorageInterface {
  wordsListCurrentPage: number;
  wordsListCurrentGroup: number;
  limitOfPages: number; // delete it
}

export const storage: StorageInterface = {
  wordsListCurrentPage: 0,
  wordsListCurrentGroup: 0,
  limitOfPages: 30,
};

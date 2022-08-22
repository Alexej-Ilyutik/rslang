interface storageInterface {
  wordsListCurrentPage: number;
  wordsListCurrentGroup: number;
  limitOfPages: number; //delete it
}

export const storage: storageInterface = {
  wordsListCurrentPage: 1,
  wordsListCurrentGroup: 1,
  limitOfPages: 10,
};

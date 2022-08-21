interface storageInterface {
  wordsListCurrentPage: number;
  limitOfPages: number; //delete it
}

export const storage: storageInterface = {
  wordsListCurrentPage: 1,
  limitOfPages: 2,
};

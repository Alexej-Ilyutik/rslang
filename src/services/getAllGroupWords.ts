import API from "./api";

export const getAllGroupWords = async (diff: number) => {
  const result = [];

  for (let i = 0; i <= 29; i += 1) {
    result.push(API.getWords(diff, i));
  }

  return (await Promise.all(result)).flat();
}

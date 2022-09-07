export const setBestStreak = (currentStreak: number, bestStreak: number) => {
  if (currentStreak > bestStreak) {
    return currentStreak;
  }
  return bestStreak;
};

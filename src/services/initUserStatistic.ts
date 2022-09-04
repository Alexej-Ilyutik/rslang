import { DateFormat, UserStatisticInterface } from "../shared/types";
import API from "./api";

// RESET STATISTIC//!!!!!
export const initUserStatistic = async (): Promise<void> => {
  const currentDate: DateFormat = new Date().toLocaleDateString('en-GB');
  const statisticForm: UserStatisticInterface = {
    [currentDate]: {
      gamesStatistic: {
        sprintGame: [{newWordsCount: 0, accuracy: 0, bestStreak: 0}],
        audioGame: [{newWordsCount: 0, accuracy: 0, bestStreak: 0}],
      },
      globalStatistic: {
        learnedWordsToday: 0,
      },
    },
  }
  await API.upsertStatistics(0, statisticForm);
}

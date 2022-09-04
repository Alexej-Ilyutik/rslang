import { DateFormat, GameNameType, GameStatisticInterface } from "../shared/types";
import API from "./api";

export const updateUserStatistic = async (obj: GameStatisticInterface, gameName: GameNameType): Promise<void> => {
  const learnedWordsArray = await API.getAggregatedWords('easy');
  const learnedWordsNumber = learnedWordsArray.length;
  // const currentDate: DateFormat = new Date().toLocaleDateString('en-GB');
  const currentDate: DateFormat = '01/09/22';
  const {newWordsCount, accuracy, bestStreak} = obj;

  const currentUserStatistic = await API.getStatistics();

  let sprintGameStatistics;
  let audioGameStatistics;
  if (currentDate in currentUserStatistic.optional) {
    sprintGameStatistics = [...currentUserStatistic.optional[currentDate].gamesStatistic.sprintGame];
    audioGameStatistics = [...currentUserStatistic.optional[currentDate].gamesStatistic.audioGame];

    switch (gameName) {
      case 'sprintGame':
        sprintGameStatistics.push({newWordsCount, accuracy, bestStreak});
        break;

      case 'audioGame':
        audioGameStatistics.push({newWordsCount, accuracy, bestStreak});
        break;

      default:
        break;
    }

    currentUserStatistic.optional[currentDate] = {
      gamesStatistic: {
        sprintGame: sprintGameStatistics,
        audioGame: audioGameStatistics,
      },
      globalStatistic: {
        learnedWordsToday: 0, // TODO
      },
    }
  } else {
    currentUserStatistic.optional[currentDate] = { // Initialization
      gamesStatistic: {
        sprintGame: [{newWordsCount: 0, accuracy: 0, bestStreak: 0}],
        audioGame: [{newWordsCount: 0, accuracy: 0, bestStreak: 0}],
      },
      globalStatistic: {
        learnedWordsToday: 0, // TODO
      },
    }
    switch (gameName) {
      case 'sprintGame':
        currentUserStatistic.optional[currentDate].gamesStatistic.sprintGame[1] = {newWordsCount, accuracy, bestStreak};
        break;

      case 'audioGame':
        currentUserStatistic.optional[currentDate].gamesStatistic.audioGame[1] = {newWordsCount, accuracy, bestStreak};
        break;

      default:
        break;
    }
  }

  await API.upsertStatistics(learnedWordsNumber, currentUserStatistic.optional);
}

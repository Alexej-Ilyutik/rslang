import { DateFormat, GameNameType, GameStatisticInterface } from "../shared/types";
import API from "./api";

export const updateUserStatistic = async (obj: GameStatisticInterface, gameName: GameNameType): Promise<void> => {
  const learnedWordsArray = await API.getAggregatedWords('easy');
  const learnedWordsNumber = learnedWordsArray.length;
  const currentDate: DateFormat = new Date().toLocaleDateString('en-GB');
  const {newWordsCount, accuracy, bestStreak} = obj;

  const currentUserStatistic = await API.getStatistics();

  const sprintGameStatistics = [...currentUserStatistic.optional[currentDate].gamesStatistic.sprintGame];
  const audioGameStatistics = [...currentUserStatistic.optional[currentDate].gamesStatistic.audioGame];

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

  await API.upsertStatistics(learnedWordsNumber, currentUserStatistic.optional);
}

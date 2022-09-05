import { DateFormat, GameNameType, GameStatisticInterface } from "../shared/types";
import API from "./api";
import { getNumberOfLearnedWordsByDate } from "./getNumberOfLearnedWordsByDate";

export const updateUserStatistic = async (obj: GameStatisticInterface, gameName: GameNameType): Promise<void> => {
  const learnedWordsArray = await API.getAggregatedWords('easy');
  const learnedWordsNumber = learnedWordsArray.length;
  const currentDate: DateFormat = new Date().toLocaleDateString('en-GB');
  const learnedWordsTodayValue = await getNumberOfLearnedWordsByDate(currentDate);
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
        learnedWordsToday: learnedWordsTodayValue,
      },
    }
  } else {
    currentUserStatistic.optional[currentDate] = {
      gamesStatistic: {
        sprintGame: [],
        audioGame: [],
      },
      globalStatistic: {
        learnedWordsToday: learnedWordsTodayValue,
      },
    }
    switch (gameName) {
      case 'sprintGame':
        currentUserStatistic.optional[currentDate].gamesStatistic.sprintGame[0] = {newWordsCount, accuracy, bestStreak};
        break;

      case 'audioGame':
        currentUserStatistic.optional[currentDate].gamesStatistic.audioGame[0] = {newWordsCount, accuracy, bestStreak};
        break;

      default:
        break;
    }
  }

  await API.upsertStatistics(learnedWordsNumber, currentUserStatistic.optional);
}

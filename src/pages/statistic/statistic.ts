import "./statistic.scss";
import API from "../../services/api";
import { GameStatisticInterface } from "../../shared/types";

export const findGameAccuracy = (array: GameStatisticInterface[]): number => {
  const numberOfGames = array.length;
  let sumOfSprintAccuracy = 0;
  array.forEach((element) => {
    sumOfSprintAccuracy += element.accuracy;
  })
  return sumOfSprintAccuracy / (numberOfGames);
}

export const findGameBestStrike = (array: GameStatisticInterface[]): number => {
  let bestStreakValue = 0;
  array.forEach((element) => {
    if (element.bestStreak > bestStreakValue) bestStreakValue = element.bestStreak;
  })
  return bestStreakValue;
}

export const updateStatistic = async (): Promise<void> => {
  const userStatistic = await API.getStatistics();
  const currentDate = new Date().toLocaleDateString('en-GB');

  if (!(currentDate in userStatistic.optional)) {
    userStatistic.optional[currentDate] = { // Initialization
      gamesStatistic: {
        sprintGame: [],
        audioGame: [],
      },
      globalStatistic: {
        learnedWordsToday: 0,
      },
    }
  }

  const dailyAccuracy = document.getElementById('daily-accuracy') as HTMLElement;

  const dailyNewWords = document.getElementById('daily-new-words') as HTMLElement;
  const dailyLearnedWords = document.getElementById('daily-learned-words') as HTMLElement;
  dailyLearnedWords.innerHTML = userStatistic.optional[currentDate].globalStatistic.learnedWordsToday.toString();

  const arrayOfSprintGames = userStatistic.optional[currentDate].gamesStatistic.sprintGame;
  const lastSprintGameNumber = arrayOfSprintGames.length;
  if (lastSprintGameNumber) {
    const sprintNewLearnedWords = document.getElementById('Sprint-new-learned-words') as HTMLElement;
    sprintNewLearnedWords.innerHTML = arrayOfSprintGames[lastSprintGameNumber - 1].newWordsCount.toString();
    const sprintAccuracy = document.getElementById('Sprint-accuracy') as HTMLElement;
    sprintAccuracy.innerHTML = findGameAccuracy(arrayOfSprintGames).toString();
    const sprintBestStreak = document.getElementById('Sprint-best-streak') as HTMLElement;
    sprintBestStreak.innerHTML = findGameBestStrike(arrayOfSprintGames).toString();
  }

  const arrayOfAudioGames = userStatistic.optional[currentDate].gamesStatistic.audioGame;
  const lastAudioGameNumber = arrayOfAudioGames.length;
  if (lastAudioGameNumber) {
    const audioNewLearnedWords = document.getElementById('Audio-new-learned-words') as HTMLElement;
    audioNewLearnedWords.innerHTML = arrayOfAudioGames[lastAudioGameNumber - 1].newWordsCount.toString();
    const audioAccuracy = document.getElementById('Audio-accuracy') as HTMLElement;
    audioAccuracy.innerHTML = findGameAccuracy(arrayOfAudioGames).toString();
    const audioBestStreak = document.getElementById('Audio-best-streak') as HTMLElement;
    audioBestStreak.innerHTML = findGameBestStrike(arrayOfAudioGames).toString();
  }
}

export const renderStatistic = (): void => {
  const statistic = `
  <div class="statistic">
  <div class="statistic__wrapper container">
    <h2>Statistic</h2>
    <div class="statistic__content container">
      <div class="daily container mb-5">
        <h3>Today</h3>
        <div class="daily__content d-flex">
          <div class="card words">
            <div class="card-body d-flex words__body">
              <h3 class="card-title words__title" id="daily-accuracy">?</h3>
              <div class="words__text">
                <h3 class="mb-0">accuracy</h3>
                <span class="card-text">were achieved</span>
              </div>
            </div>
          </div>
          <div class="card words">
            <div class="card-body d-flex words__body">
              <h3 class="card-title words__title" id="daily-new-words">?</h3>
              <div class="words__text">
                <h3 class="mb-0">words</h3>
                <span class="card-text">were new</span>
              </div>
            </div>
          </div>
          <div class="card words">
            <div class="card-body d-flex words__body">
              <h3 class="card-title words__title" id="daily-learned-words">?</h3>
              <div class="words__text">
                <h3 class="mb-0">words</h3>
                <span class="card-text">were learned</span>
              </div>
            </div>
          </div>

          <div class="card game">
            <div class="card-body d-flex game__body">
              <h3 class="card-title game__blue-title">Sprint</h3>
              <div class="game__content">
                <div class="game__text">
                  <span id="Sprint-new-learned-words">?</span>
                  <span>words</span>
                </div>
                <div class="game__text">
                  <span id="Sprint-accuracy">?</span>
                  <span>accuracy</span>
                </div>
                <div class="game__text">
                  <span id="Sprint-best-streak">?</span>
                  <span>best streak</span>
                </div>
              </div>
            </div>
          </div>

          <div class="card game">
            <div class="card-body d-flex game__body">
              <h3 class="card-title game__red-title">Audio challenge</h3>
              <div class="game__content">
              <div class="game__text">
                <span id="Audio-new-learned-words">?</span>
                  <span>words</span>
                </div>
                <div class="game__text">
                  <span id="Audio-accuracy">?</span>
                  <span>accuracy</span>
                </div>
                <div class="game__text">
                  <span id="Audio-best-streak">?</span>
                  <span>best streak</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div class="all-time">
        <h3>All time</h3>
        <div class="d-flex">
          <h1>Graph</h1>
          <h1>Graph</h1>
        </div>
      </div>
    </div>
  </div>
</div>
`;
  const main = document.getElementById('main') as HTMLElement;
  main.innerHTML = statistic;

  updateStatistic();
}



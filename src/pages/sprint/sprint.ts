import "./sprint.scss";
import * as bootstrap from 'bootstrap';
import { getAllGroupWords } from "../../services/getAllGroupWords";
import { getRandomNumber } from "../../services/getRandomNumber";
import { WordInterface } from "../../shared/types";
import { renderSmallAudioButton } from "../../components/audioButtonSmall/audioButtonSmall";
import API from "../../services/api";
import { storage } from "../../shared/storage";
import { renderSpinner } from "../../components/spinner/spinner";
import { setSettingsGameStyles } from "../../services/setSettingsGameStyles";
import { textBlinker } from "../../services/textBlinker";
import { updateWordProperties } from "../../services/updateWordProperties";
import { setBestStreak } from "../../services/setBestStreak";
import { updateUserStatistic } from "../../services/updateUserStatistic";
import { isLogin } from "../../services/isLogin";
import { renderVolumeBtn } from "../../components/renderVolumeBtn/renderVolumeBtn";

export const renderSprint = (): void => {
  const sprint = `
  <div class = "audiocall__volume">${renderVolumeBtn()}
  </div>
  <div class="sprint">
    <div class="sprint__wrapper container-sm">
      <div class="progress-timer">
        <svg class="sprint-progress-bar" width="60" height="60">
          <circle cx="30" cy="30" r="28" id="sprint-circle"></circle>
        </svg>
        <div class="sprint__timer" id="sprint-timer"></div>
      </div>
      <div class="sprint__streak">
        <div class="sprint__streak-bar">
          <div class="round" id="streak-round-1"></div>
          <div class="round" id="streak-round-2"></div>
          <div class="round" id="streak-round-3"></div>
        </div>
        <div class="sprint__reward"></div>
      </div>
      <div class="sprint__score" id="sprint-score">0</div>
      <div class="sprint__words mb-3">
        <div class="sprint__word"></div>
        <div class="sprint__word-translate"></div>
      </div>
      <div class="sprint__buttons">
        <button type="button" class="btn btn-danger sprint-btn" id="sprint-wrong-btn">Wrong</button>
        <button type="button" class="btn btn-success sprint-btn" id="sprint-right-btn">Right</button>
      </div>
    </div>
    <div class="modal" tabindex="-1" id="game-modal">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <div class="modal-headers">
              <h4 class="modal-title" id="finish-score"></h4>
              <h4 class="modal-title" id="finish-accuracy"></h4>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body modal-game" id="modal-body">
            <div class="answers">
              <h4 id="correct-answers-count"></h4>
              <div class="result-words" id="correct-answers"></div>
            </div>
            <div class="answers">
              <h4 id="incorrect-answers-count"></h4>
              <div class="result-words" id="incorrect-answers"></div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-warning" id="play-again-btn">Play again</button>
          </div>
        </div>
      </div>
    </div>
  </div>`;

  const main = document.querySelector('.audiocall__content') as HTMLElement;
  main.innerHTML = sprint;
}

let isSprintFromTextBook = false;
let sprintWords: WordInterface[];
interface SprintStorage {
  correct: WordInterface[];
  incorrect: WordInterface[];
  score: number;
  streak: number;
  bestStreak: number;
}

const sprintStorage: SprintStorage = {
  correct: [],
  incorrect: [],
  score: 0,
  streak: 0,
  bestStreak: 0
};
let reward = 10;
let level = 0;

const nextReward = () => {
  if (reward === 10) return 20;
  if (reward === 20) return 40;
  return 80;
}

const getRandom = () => Math.round(Math.random());

let isTranslateRight = getRandom();

const startRewordAnimation = () => {
  if ([0, 3, 7, 11].includes(sprintStorage.streak)) {
    textBlinker(<HTMLElement>document.querySelector('.sprint__reward'));
  }
}

const setReword = () => {
  const rewardElem = <HTMLElement>document.querySelector('.sprint__reward');
  if (sprintStorage.streak > 0 && sprintStorage.streak <= 4) {
    reward = 10;
    sprintStorage.score += reward;
  } else if (sprintStorage.streak > 4 && sprintStorage.streak <= 8) {
    reward = 20;
    sprintStorage.score += reward;
  } else if (sprintStorage.streak > 8 && sprintStorage.streak <= 12) {
    reward = 40;
    sprintStorage.score += reward;
  } else if (sprintStorage.streak > 12) {
    reward = 80;
    sprintStorage.score += reward;
  }
  rewardElem.innerText = sprintStorage.streak > 2 ? `+${nextReward()} points per word` : '';
}

const setStreakRoundFill = () => {
  const round1 = <HTMLElement>document.getElementById('streak-round-1');
  const round2 = <HTMLElement>document.getElementById('streak-round-2');
  const round3 = <HTMLElement>document.getElementById('streak-round-3');

  if (sprintStorage.streak === 0 || sprintStorage.streak === 4 || sprintStorage.streak === 8) {
    round1.style.background = 'gray';
    round2.style.background = 'gray';
    round3.style.background = 'gray';
  }
  if (sprintStorage.streak === 1 || sprintStorage.streak === 5 || sprintStorage.streak === 9) {
    round1.style.background = '#198754';
    round2.style.background = 'gray';
    round3.style.background = 'gray';
  }
  if (sprintStorage.streak === 2 || sprintStorage.streak === 6 || sprintStorage.streak === 10) {
    round2.style.background = '#198754';
  }
  if (sprintStorage.streak === 3 || sprintStorage.streak === 7 || sprintStorage.streak === 11) {
    round3.style.background = '#198754';
  }
  if (sprintStorage.streak > 11) {
    round1.style.background = 'transparent';
    round3.style.background = 'transparent';
  }
}

const play = (elem: HTMLElement) => {
  const audio = <HTMLAudioElement>elem.previousElementSibling;
  audio.play();
}

const renderModal = () => {
  const correctAnswers = <HTMLElement>document.getElementById('correct-answers');
  const incorrectAnswers = <HTMLElement>document.getElementById('incorrect-answers');

  correctAnswers.innerHTML = '';
  incorrectAnswers.innerHTML = '';

  sprintStorage.correct.forEach((_, i) => {
    const audio = new Audio(`${API.base}/${sprintStorage.correct[i].audio}`);
    audio.preload = 'none';
    correctAnswers.insertAdjacentHTML('beforeend', `<div class="result-words__container">
    ${audio.outerHTML}
    ${renderSmallAudioButton()}
    <span class="result-words__origin">${sprintStorage.correct[i].word}</span>
    <span class="result-words__translate">- ${sprintStorage.correct[i].wordTranslate}</span></div>`);
  });

  sprintStorage.incorrect.forEach((_, i) => {
    const audio = new Audio(`${API.base}/${sprintStorage.incorrect[i].audio}`);
    audio.preload = 'none';
    incorrectAnswers.insertAdjacentHTML('beforeend', `<div class="result-words__container">
    ${audio.outerHTML}
    ${renderSmallAudioButton()}
    <span class="result-words__origin">${sprintStorage.incorrect[i].word}</span>
    <span class="result-words__translate">- ${sprintStorage.incorrect[i].wordTranslate}</span></div>`);
  });
}

const finishGame = async () => {
  const gameModal = <HTMLElement>document.getElementById('game-modal');
  if (!gameModal) return;
  const modalBody = <HTMLElement>document.getElementById('modal-body');
  const playAgain = <HTMLButtonElement>document.getElementById('play-again-btn');
  const finishScore = <HTMLElement>document.getElementById('finish-score');
  const finishAccuracy = <HTMLElement>document.getElementById('finish-accuracy');
  const correctAnswersCount = <HTMLElement>document.getElementById('correct-answers-count');
  const incorrectAnswersCount = <HTMLElement>document.getElementById('incorrect-answers-count');

  const victorySound = new Audio('./assets/victory.mp3');
  if (storage.volumeState) {
    victorySound.play();
  }

  modalBody.addEventListener('click', (e) => {
    const target = <HTMLElement>e.target;
    if (target.tagName === 'BUTTON') {
      play(target);
    }
    if (target.tagName === 'IMG') {
      play(<HTMLElement>target.parentElement);
    }
  });

  const modal = new bootstrap.Modal(gameModal, {});
  modal.show();

  finishScore.innerText = `Your result: ${sprintStorage.score} score`;

  correctAnswersCount.innerHTML = `Correct answers<span class="badge text-bg-success ms-2">
    ${sprintStorage.correct.length || 0}</span>`;
  incorrectAnswersCount.innerHTML = `Mistakes<span class="badge text-bg-danger ms-2">
    ${sprintStorage.incorrect.length || 0}</span>`;

  const accuracy = Math.round(sprintStorage.correct.length / (sprintStorage.incorrect.length +
    sprintStorage.correct.length) * 100) || 0;
  finishAccuracy.innerText = `Accuracy: ${accuracy} %`;

  let flagPlayAgain = false;
  gameModal.addEventListener('hide.bs.modal', () => {
    const fakeClick = new Event('click', {bubbles: true});

    if (!flagPlayAgain && !isSprintFromTextBook) {
      const games = <HTMLElement>document.querySelector('[href="#/games"]');
      games.dispatchEvent(fakeClick);
    }

    if (!flagPlayAgain && isSprintFromTextBook) {
      const book = <HTMLElement>document.querySelector('[href="#/book"]');
      book.dispatchEvent(fakeClick);
    }
    flagPlayAgain = false;
  });

  playAgain.addEventListener('click', () => {
    const btnStart = <HTMLButtonElement>document.body.querySelector('.settings__start');
    flagPlayAgain = true;
    const fakeClick = new Event('click', {bubbles: true});
    modal.hide();
    if (isSprintFromTextBook) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      startSprintFromTextBook();
    } else {
      btnStart.dispatchEvent(fakeClick);
    }
  });
  if (isLogin()) {
    const oldUserWords = await API.getUserWords();
    const updateWords = async () => {
      await Promise.all(sprintStorage.correct.map(async(x) => {if (x._id) await updateWordProperties(x._id, true)}));
      await Promise.all(sprintStorage.incorrect.map(async(x) => {if (x._id) await updateWordProperties(x._id, false)}));
    }
    await updateWords();
    const newWordsCount = async () => {
      const userWords = await API.getUserWords();
      const result = oldUserWords.length - userWords.length;
      return Math.abs(result);
    }
    const result = {
      newWordsCount: await newWordsCount(),
      accuracy,
      bestStreak: sprintStorage.bestStreak
    };
    updateUserStatistic(result, 'sprintGame');
  }
}

const setCircleProgress = (second: number) => {
  const circle = <SVGCircleElement>document.querySelector('#sprint-circle');
  if (circle) {
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = `${circumference}`;
    const offset = circumference - second / 60 * circumference;
    circle.style.strokeDashoffset = `${offset}`;
  }
}

const startTimer = (elem:HTMLElement, time: number) => {
  const element = elem;
  const countDownDate = new Date().getTime() + time;

  const timerId: NodeJS.Timer = setInterval(() => {
    const circle = <SVGCircleElement>document.querySelector('#sprint-circle');
    const timeNow = new Date().getTime();
    const distance = countDownDate - timeNow;
    const seconds = Math.floor((distance % (1000 * 60)) / 1000) + 1;
    element.innerText = seconds.toString();
    setCircleProgress(60 - Math.round(distance / 1000));

    if (!circle) {
      clearInterval(timerId);
    }

    if (distance < 0 || !sprintWords.length) {
      clearInterval(timerId);
      finishGame();
      renderModal();
    }
  }, 500);
}

export const sprintGame = async (learnedWords?: string[]) => {
  const sprintContent = <HTMLElement>document.querySelector('.audiocall__content');
  const wrongBtn = <HTMLButtonElement>document.getElementById('sprint-wrong-btn');
  const rightBtn = <HTMLButtonElement>document.getElementById('sprint-right-btn');
  const timer = <HTMLElement>document.getElementById('sprint-timer');
  const score = <HTMLElement>document.getElementById('sprint-score');
  const word = <HTMLElement>document.querySelector('.sprint__word');
  const wordTranslate = <HTMLElement>document.querySelector('.sprint__word-translate');
  const correctAnswerSound = new Audio('./assets/success.mp3');
  const incorrectAnswerSound = new Audio('./assets/error.mp3');

  const playAnswerSound = (answer: boolean) => {
    correctAnswerSound.currentTime = 0;
    incorrectAnswerSound.currentTime = 0;

    if (storage.volumeState) {
      if (answer) {
        correctAnswerSound.play();
      }
      if (!answer) {
        incorrectAnswerSound.play();
      }
    }
  }

  let primaryWordNumber = getRandomNumber(0, sprintWords.length - 1);
  let wordTranslateNumber = primaryWordNumber;

  const getOtherWordNumber = (compareNum: number): number => {
    const result = getRandomNumber(0, sprintWords.length - 1);
    if (result !== compareNum) {
      return result;
    }
    return getOtherWordNumber(primaryWordNumber);
  }

  const getNextPair = async () => {
    word.innerText = sprintWords[primaryWordNumber].word;

    if (isTranslateRight) {
      wordTranslate.innerText = sprintWords[primaryWordNumber].wordTranslate;
    } else {
      wordTranslateNumber = getOtherWordNumber(primaryWordNumber);
      wordTranslate.innerText = sprintWords[wordTranslateNumber].wordTranslate;
    }

    if (isSprintFromTextBook && sprintWords.length === 1) {
      const {group, page} = sprintWords[0];
      if (page > 0) {
        const prevPage = page - 1;
        let extraWords = await API.getWords(group, prevPage);
        if (learnedWords) {
          extraWords = extraWords.filter((x: { id: string; }) => !learnedWords.includes(x.id));
        }
        sprintWords = sprintWords.concat(extraWords);
      }
    }
  }

  sprintStorage.correct = [];
  sprintStorage.incorrect = [];
  sprintStorage.score = 0;
  sprintStorage.streak = 0;
  reward = 10;
  getNextPair();
  timer.innerText = '60';
  startTimer(timer, 60000);

  const wrongBtnHandler = () => {
    if(isTranslateRight) {
      playAnswerSound(false);
      sprintStorage.streak = 0;
      sprintStorage.incorrect.push(sprintWords[primaryWordNumber]);
    } else {
      playAnswerSound(true);
      sprintStorage.streak += 1;
      sprintStorage.correct.push(sprintWords[primaryWordNumber]);
    }
  }

  const rightBtnHandler = () => {
    if(isTranslateRight) {
      playAnswerSound(true);
      sprintStorage.streak += 1;
      sprintStorage.correct.push(sprintWords[primaryWordNumber]);
    } else {
      playAnswerSound(false);
      sprintStorage.streak = 0;
      sprintStorage.incorrect.push(sprintWords[primaryWordNumber]);
    }
  }

  const bothBtnHandler = () => {
    sprintStorage.bestStreak = setBestStreak(sprintStorage.streak, sprintStorage.bestStreak);
    startRewordAnimation();
    setReword();
    setStreakRoundFill();
    score.innerText = String(sprintStorage.score);
    sprintWords.splice(primaryWordNumber, 1);
    isTranslateRight = sprintWords.length > 1 ? getRandom(): 1;
    primaryWordNumber = getRandomNumber(0, sprintWords.length - 1);
    if (sprintWords.length === 0) return;
    getNextPair();
  }

  const clickHandler = (e: Event) => {
    const target = <HTMLElement>e.target;
    if (!sprintWords.length) return;

    if (target.classList.contains('volume-off')) {
      storage.volumeState = true;
      target.classList.remove('fa-volume-mute', 'volume-off');
      target.classList.add('fa-volume-up', 'volume-on');
    } else if (target.classList.contains('volume-on')) {
      storage.volumeState = false;
      target.classList.remove('fa-volume-up', 'volume-on');
      target.classList.add('fa-volume-mute', 'volume-off');
    }

    if (target === wrongBtn) {
      wrongBtnHandler();
    }

    if (target === rightBtn) {
      rightBtnHandler();
    }

    if (target === wrongBtn || target === rightBtn) {
      bothBtnHandler();
    }
  };

  sprintContent.onclick = clickHandler;
  const keyboardHandler = (e: KeyboardEvent) => {
    if (e.repeat || !sprintWords.length) return;

    if (e.key === 'ArrowLeft') {
      wrongBtnHandler();
      bothBtnHandler();
    }
    if (e.key === 'ArrowRight') {
      rightBtnHandler();
      bothBtnHandler();
    }
  }
  const gameContainer = document.querySelector('.audiocall__container') as HTMLElement;
  gameContainer.tabIndex = 0;
  gameContainer.focus();
  gameContainer.style.outline = 'none';
  gameContainer.onkeydown = keyboardHandler;
}

export const startSprint = async (): Promise<void> => {
  const gameContainer = document.querySelector('.audiocall__container') as HTMLElement;
  const sprintContent = document.querySelector('.audiocall__content') as HTMLElement;
  sprintContent.style.gap = '0';
  sprintContent.innerHTML = `
  <h3 class="audiocall__subtitle">Game: Sprint</h3>
  <img class="sprint__img" src="../../assets/sprint-img.png" alt="sprint game" alt="Image Title" />
  `;

  gameContainer.addEventListener('click', async (e) => {
    isSprintFromTextBook = false;
    const target = <HTMLButtonElement>e.target;

    if (target.classList.contains('setting__level')) {
      level = Number(target.getAttribute('data-level'));
    }

    if (target.classList.contains('settings__start')) {
      setSettingsGameStyles();
      renderSpinner();
      sprintWords = await getAllGroupWords(level);
      renderSprint();
      sprintGame();
    }
  });
}

export const startSprintFromTextBook = async () => {
  setSettingsGameStyles();
  renderSpinner();
  isSprintFromTextBook = true;
  const {wordsListCurrentGroup, wordsListCurrentPage} = storage;
  const learnedWords = (await API.getAggregatedWords('easy')).map((x: { _id: string; }) => x._id);

  if (wordsListCurrentGroup === 6) {
    sprintWords = await API.getAggregatedWords('hard');
  } else {
    sprintWords = await API.getWords(wordsListCurrentGroup, wordsListCurrentPage);
    sprintWords = sprintWords.filter((x: { id: string; }) => !learnedWords.includes(x.id));
  }

  renderSprint();
  sprintGame(learnedWords);
}

/* eslint-disable no-underscore-dangle */
import './audioGame.scss';
import { WordInterface } from '../../shared/types';
import { storage } from '../../shared/storage';
import { getAllGroupWords } from '../../services/getAllGroupWords';
import { getGuessWord } from '../../services/getGuessWord';
import { getRandomNumber } from '../../services/getRandomNumber';
import { playAllAudioFiles } from '../../components/audioButton/audioButton';
import { setAttrDisabled } from '../../services/setAttrDisabled';
import { shuffle } from '../../services/shuffleArray';
import { renderGamePage } from '../game/game';
import { renderProgressBar } from '../../components/progressBar/renderProgressBar';
import API from '../../services/api';
import { renderPreLoader } from '../../components/preLoader/preLoader';
import { renderGamePageContainer } from '../../components/gamePageContainer/gamePageContainer';
import { renderVolumeBtn } from '../../components/renderVolumeBtn/renderVolumeBtn';
import { updateUserStatistic } from '../../services/updateUserStatistic';
import { updateWord } from '../../services/updateWord';
import { findDailyNewWords } from '../statistic/statistic';
import { isLogin } from '../../services/isLogin';

const trueAnswerAudio = new Audio('../../assets/success.mp3');
const falseAnswerAudio = new Audio('../../assets/error.mp3');

function getArrOptions(array: WordInterface[]) {
  const arr: WordInterface[] = [];
  let uniqueArray: WordInterface[] = [];
  while (uniqueArray.length < 4) {
    const el = array[getRandomNumber(0, 599)];

    arr.push(el);
    uniqueArray = [...new Set(arr)];
  }

  return uniqueArray;
}

function getUniqueArray(array: WordInterface[]) {
  const uniqueArray = [...new Set(array)];
  if (uniqueArray.length > 4) {
    uniqueArray.shift();
  }
  return uniqueArray;
}

export const renderResultAudioPage = (
  block: HTMLElement,
  accuracy: number,
  trueAnswer: number,
  falseAnswer: number,
): void => {
  const mainBlock = `
    <div class="result__container">
      <h3 class="audiocall__subtitle">Result</h3>
      <h4 class="result__subtitle">Accuracy: <span>${accuracy}%</span></h4>
      <button type="button" class="btn-close result__close" id = "btn-close" aria-label="Close"></button>

      <div class="result__answer-container">

        <div class="result__answer">
          <div class="result__description">
            <div class="result__marker green-marker"></div>
            <div class="result__content">Right answers: <span>${trueAnswer}</span></div>
          </div>
          <ul class="result__list-true">
          </ul>
        </div>

        <div class="result__answer">
          <div class="result__description">
            <div class="result__marker red-marker"></div>
            <div class="result__content">Wrong answers: <span>${falseAnswer}</span></div>
          </div>
          <ul class="result__list-false">
          </ul>
        </div>

      </div>

      <button type="button" class="btn btn-success result__btn-play" id = "btn-play-again">Play again</button>
    </div>
  `;
  block.innerHTML = mainBlock;
};

const renderListItem = (block: HTMLElement, wordArr: WordInterface[]): void => {
  for (let i = 0; i < wordArr.length; i += 1) {
    const item = document.createElement('li');
    item.className = 'result__item';
    item.innerHTML = `
             <div class="result__block">
              <button class="word-card_audio-button result__block-btn">
                <img class="audiocall__figure-img voice__audio" src="../../assets/volume.svg" alt="audio button"
                data-audio="${`${API.base}/${wordArr[i].audio}`}">
              </button>
              <div class="result__text">${`${wordArr[i].word}`} ${`${wordArr[i].transcription}`} -
              ${`${wordArr[i].wordTranslate}`}</div>
            </div>
        `;
    block.appendChild(item);
  }
};

let level = 0;
let progress = 0;
let newWordStart = 0;
let newWordFinish = 0;
const currentDate = new Date().toLocaleDateString('en-GB');

async function renderContentAudioPage(
  block: HTMLElement,
  mainWord: WordInterface,
  array: WordInterface[],
  progressLine: number,
): Promise<void> {
  let wordId: string | undefined;
  if (mainWord.id === undefined) {
    wordId = mainWord._id;
  } else {
    wordId = mainWord.id;
  }
  const mainBlock = `
    <div class = "audiocall__volume">${renderVolumeBtn()}
    </div>
    <h3 class="audiocall__subtitle">Game: Audio challenge</h3>
    <figure class="figure audiocall__figure-container">
      <img src="${`${API.base}/${mainWord.image}`}" class="figure-img img-fluid rounded" alt="${`${mainWord.word}`}">
      <div class="audiocall__figure-content">
        <button class="word-card_audio-button audiocall__figure-btn">
          <img id = "voice-audio" class="audiocall__figure-img voice__audio"
          src="../../assets/volume.svg" alt="audio button"
          data-audio="${`${API.base}/${mainWord.audio}`}"
          data-name ="${`${mainWord.wordTranslate}`}"
          data-id="${`${wordId}`}">
        </button>
        <figcaption class="figure-caption">${`${mainWord.word}`} ${`${mainWord.transcription}`} -
        ${`${mainWord.wordTranslate}`}</figcaption>
      </div>

    </figure>
    <div class="audiocall__voice">
        <button class="word-card_audio-button">
          <img class="word-card_audio-button-image voice__audio" src="../../assets/volume.svg" alt="audio button"
          data-audio="${`${API.base}/${mainWord.audio}`}"
          data-name ="${`${mainWord.wordTranslate}`}"
          data-id="${`${wordId}`}">
        </button>
    </div>
    <div class="audiocall__btns">
      <input type="radio" class="btn-check audiocall__check" name="options" id="option1" autocomplete="off">
      <label class="btn btn-warning audiocall__btn-option" id="btn-option1"
      for="option1">1. ${`${array[0].wordTranslate}`}</label>

      <input type="radio" class="btn-check audiocall__check" name="options" id="option2" autocomplete="off">
      <label class="btn btn-warning audiocall__btn-option" id="btn-option2"
      for="option2">2. ${`${array[1].wordTranslate}`}</label>

      <input type="radio" class="btn-check audiocall__check" name="options" id="option3" autocomplete="off">
      <label class="btn btn-warning audiocall__btn-option" id="btn-option3"
      for="option3">3. ${`${array[2].wordTranslate}`}</label>

      <input type="radio" class="btn-check audiocall__check" name="options" id="option4" autocomplete="off">
      <label class="btn btn-warning audiocall__btn-option" id="btn-option4"
      for="option4">4. ${`${array[3].wordTranslate}`}</label>
    </div>
    <button type="button" class="btn btn-info audiocall__next" id = "btn-next">I don't know</button>
    <div class="progressbar__container">${renderProgressBar(progressLine)}</div>
  `;
  block.innerHTML = mainBlock;
}

const addEventStartAudioGame = async (): Promise<void> => {
  const arrWords = await getAllGroupWords(level);
  const audioContent = document.querySelector('.audiocall__content') as HTMLElement;

  let trueAnswer = 0;
  let falseAnswer = 0;
  let currentStreak = 0;
  const currentStreakArray: Array<number> = [];
  const trueAnswerArr: WordInterface[] = [];
  const falseAnswerArr: WordInterface[] = [];

  audioContent.addEventListener('click', async e => {
    const target = e.target as HTMLInputElement;

    if (target.classList.contains('volume-off')) {
      storage.volumeState = true;
      target.classList.remove('fa-volume-mute', 'volume-off');
      target.classList.add('fa-volume-up', 'volume-on');
    } else if (target.classList.contains('volume-on')) {
      storage.volumeState = false;
      target.classList.remove('fa-volume-up', 'volume-on');
      target.classList.add('fa-volume-mute', 'volume-off');
    }

    if (target.classList.contains('voice__audio')) {
      playAllAudioFiles([target.getAttribute('data-audio') || '']);
    }

    const btnNext = document.querySelector('.audiocall__next') as HTMLElement;
    const answerContainer = document.querySelector('.audiocall__figure-container') as HTMLElement;
    const btnVoiceContainer = document.querySelector('.audiocall__voice') as HTMLElement;
    const btnsOption = Array.from(document.getElementsByClassName('audiocall__check'));

    if (target.classList.contains('audiocall__btn-option')) {
      const btnVoice = document.getElementById('voice-audio') as HTMLElement;
      const value = target.innerHTML.slice(3);
      const getIdWord = btnVoice.getAttribute('data-id') || '';
      console.log(getIdWord);

      const currentWord: WordInterface = await API.getWord(getIdWord);

      if (value === btnVoice.getAttribute('data-name')) {
        target.classList.add('audiocall__btn-true');
        if (storage.volumeState) {
          trueAnswerAudio.play();
        }
        progress += 10;
        trueAnswer += 1;
        btnNext.innerHTML = 'Next';
        answerContainer.style.display = 'flex';
        btnVoiceContainer.style.display = 'none';
        setAttrDisabled(btnsOption);
        trueAnswerArr.push(currentWord);
        currentStreak += 1;
      } else {
        target.classList.add('audiocall__btn-false');
        if (storage.volumeState) {
          falseAnswerAudio.play();
        }
        progress += 10;
        falseAnswer += 1;
        btnNext.innerHTML = 'Next';
        answerContainer.style.display = 'flex';
        btnVoiceContainer.style.display = 'none';
        setAttrDisabled(btnsOption);
        falseAnswerArr.push(currentWord);
        currentStreakArray.push(currentStreak);
        currentStreak = 0;
      }
    }

    if (target.classList.contains('audiocall__next') && progress !== 100) {
      const arrayOptions = getArrOptions(arrWords);

      const newGuessWord = await getGuessWord(storage.currentPage, arrWords);

      arrayOptions.push(newGuessWord);

      const newArrayOptions = getUniqueArray(arrayOptions);
      shuffle(newArrayOptions);

      renderContentAudioPage(audioContent, newGuessWord, newArrayOptions, progress);
      console.log(newGuessWord);

      playAllAudioFiles([`${API.base}/${newGuessWord.audio}`]);
    } else if (target.classList.contains('audiocall__next') && progress === 100) {
      const myAccuracy = trueAnswer * 10;
      renderResultAudioPage(audioContent, myAccuracy, trueAnswer, falseAnswer);
      const itemListTrue = document.querySelector('.result__list-true') as HTMLElement;
      const itemListFalse = document.querySelector('.result__list-false') as HTMLElement;
      renderListItem(itemListTrue, trueAnswerArr);
      renderListItem(itemListFalse, falseAnswerArr);

      if (isLogin()) {
        await updateWord(trueAnswerArr, falseAnswerArr);

        currentStreakArray.push(currentStreak);

        newWordFinish = await findDailyNewWords(currentDate);

        await updateUserStatistic(
          {
            newWordsCount: newWordFinish - newWordStart,
            accuracy: myAccuracy,
            bestStreak: Math.max.apply(null, currentStreakArray),
          },
          'audioGame',
        );
      }
    }

    if (target.classList.contains('result__close')) {
      renderGamePage();
    }
  });
};

document.addEventListener('keydown', event => {
  if (event.code === 'Digit1' || event.code === 'Numpad1') {
    if (document.getElementById('btn-option1')) {
      (document.getElementById('btn-option1') as HTMLElement).click();
    }
  } else if (event.code === 'Digit2' || event.code === 'Numpad2') {
    if (document.getElementById('btn-option2')) {
      (document.getElementById('btn-option2') as HTMLElement).click();
    }
  } else if (event.code === 'Digit3' || event.code === 'Numpad3') {
    if (document.getElementById('btn-option3')) {
      (document.getElementById('btn-option3') as HTMLElement).click();
    }
  } else if (event.code === 'Digit4' || event.code === 'Numpad4') {
    if (document.getElementById('btn-option4')) {
      (document.getElementById('btn-option4') as HTMLElement).click();
    }
  } else if (event.code === 'NumpadEnter' || event.code === 'Enter') {
    if (document.getElementById('btn-next')) {
      (document.getElementById('btn-next') as HTMLElement).click();
    } else if (document.getElementById('btn-play-again')) {
      (document.getElementById('btn-play-again') as HTMLElement).click();
    } else if (document.getElementById('btn-start')) {
      (document.getElementById('btn-start') as HTMLElement).click();
    }
  } else if (event.code === 'Escape') {
    if (document.getElementById('btn-close')) {
      (document.getElementById('btn-close') as HTMLElement).click();
    }
  }
});

export const renderAudioPage = async (): Promise<void> => {
  const gameContainer = document.querySelector('.audiocall__container') as HTMLElement;
  const audioContent = document.querySelector('.audiocall__content') as HTMLElement;
  const mainBlock = `
    <h3 class="audiocall__subtitle">Game: Audio challenge</h3>
    <img class="audiocall__img" src="../../assets/audio-img.png" alt="audio" alt="Image Title" />
  `;
  audioContent.innerHTML = mainBlock;

  gameContainer.addEventListener('click', async e => {
    const target = <HTMLButtonElement>e.target;
    const inputs = Array.from(document.getElementsByClassName('setting__level'));

    if (target.classList.contains('setting__level')) {
      level = Number(target.getAttribute('data-level'));
    }
    if (target.classList.contains('settings__start')) {
      if (isLogin()) {
        newWordStart = await findDailyNewWords(currentDate);
      }

      progress = 0;
      renderPreLoader(audioContent);
      const arrWords = await getAllGroupWords(level);
      const arrOptions = getArrOptions(arrWords);
      const guessWord = await getGuessWord(storage.currentPage, arrWords);

      arrOptions.push(guessWord);
      const newArrOptions = getUniqueArray(arrOptions);
      shuffle(newArrOptions);
      renderContentAudioPage(audioContent, guessWord, newArrOptions, progress);
      playAllAudioFiles([`${API.base}/${guessWord.audio}`]);
      addEventStartAudioGame();
      target.disabled = true;

      for (let i = 0; i < inputs.length; i += 1) {
        (<HTMLInputElement>inputs[i]).disabled = true;
      }
    }
    if (target.classList.contains('result__btn-play')) {
      level = 0;
      renderGamePageContainer();
      renderAudioPage();
    }
  });
};

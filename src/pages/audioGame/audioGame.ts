import './audioGame.scss';
import { WordInterface } from '../../shared/types';
import { playAllAudioFiles } from '../../components/audioButton/audioButton';
import { setAttrDisabled } from '../../services/setAttrDisabled';
import { renderProgressBar, rerenderProgressBar } from '../../components/progressBar/renderProgressBar';
import API from '../../services/api';

const trueAnswerAudio = new Audio('../../assets/success.mp3');
const falseAnswerAudio = new Audio('../../assets/error.mp3');

const getWordsTemp = async (diff: number) => {
  const result = [];

  for (let i = 0; i <= 29; i += 1) {
    result.push(API.getWords(diff, i));
  }

  return (await Promise.all(result)).flat();
};

function getRandomArbitrary(min: number, max: number) {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function getArrOptions(array: WordInterface[]) {
  const arr: WordInterface[] = [];
  let uniqueArray: WordInterface[] = [];
  while (uniqueArray.length < 4) {
    const el = array[getRandomArbitrary(0, 599)];
    arr.push(el);
    uniqueArray = [...new Set(arr)];
  }
  return uniqueArray;
}

const renderContentAudioPage = async (
  block: HTMLElement,
  mainWord: WordInterface,
  arrOptions: WordInterface[],
  progress: number,
): Promise<void> => {
  const mainBlock = `
    <h3 class="audiocall__subtitle">Game: Audio challenge</h3>
    <figure class="figure audiocall__figure-container">
      <img src="${`${API.base}/${mainWord.image}`}" class="figure-img img-fluid rounded" alt="${`${mainWord.word}`}">
      <div class="audiocall__figure-content">
        <button class="word-card_audio-button audiocall__figure-btn">
          <img class="audiocall__figure-img voice__audio" src="../../assets/volume.svg" alt="audio button"
          data-audio="${`${API.base}/${mainWord.audio}`}"
          data-name ="${`${mainWord.wordTranslate}`}"
          data-id="${`${mainWord.id}`}">
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
          data-id="${`${mainWord.id}`}">
        </button>
    </div>
    <div class="audiocall__btns">
      <input type="radio" class="btn-check audiocall__check" name="options" id="option1" autocomplete="off">
      <label class="btn btn-warning audiocall__btn-option" for="option1">1. ${`${arrOptions[0].wordTranslate}`}</label>

      <input type="radio" class="btn-check audiocall__check" name="options" id="option2" autocomplete="off">
      <label class="btn btn-warning audiocall__btn-option" for="option2">2. ${`${arrOptions[1].wordTranslate}`}</label>

      <input type="radio" class="btn-check audiocall__check" name="options" id="option3" autocomplete="off">
      <label class="btn btn-warning audiocall__btn-option" for="option3">3. ${`${arrOptions[2].wordTranslate}`}</label>

      <input type="radio" class="btn-check audiocall__check" name="options" id="option4" autocomplete="off">
      <label class="btn btn-warning audiocall__btn-option" for="option4">4. ${`${arrOptions[3].wordTranslate}`}</label>
    </div>
    <button type="button" class="btn btn-info audiocall__next">I don't know</button>
    <div class="progressbar__container">${renderProgressBar(progress)}</div>
  `;
  block.innerHTML = mainBlock;
};

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

      <button type="button" class="btn btn-success result__btn-play">Play again</button>
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

const addEventStartAudioGame = (block: HTMLElement): void => {
  const GameContainer = document.querySelector('.audiocall__container') as HTMLElement;
  const btnStart = document.querySelector('.settings__start') as HTMLElement;

  btnStart.classList.add('btn__start-audio-game');
  let progress = 0;
  let trueAnswer = 0;
  let falseAnswer = 0;
  let trueAnswerArr: WordInterface[] = [];
  let falseAnswerArr: WordInterface[] = [];

  async function rerenderAudioGame(event: Event) {
    const target = event.target as HTMLInputElement;
    const arrWords = await getWordsTemp(level);
    const arrOptions = getArrOptions(arrWords);
    const addWordsToAudioGame = (): WordInterface => {
      const word = arrOptions[getRandomArbitrary(0, 3)];
      return word;
    };
    const mainWord = addWordsToAudioGame();

    if (target.classList.contains('setting__level')) {
      level = Number(target.getAttribute('data-level'));
    }

    if (target.classList.contains('btn__start-audio-game') || target.classList.contains('result__btn-play')) {
      progress = 0;
      trueAnswer = 0;
      falseAnswer = 0;
      trueAnswerArr = [];
      falseAnswerArr = [];
      renderContentAudioPage(block, mainWord, arrOptions, progress);

      const btnVoice = document.querySelector('.voice__audio') as HTMLElement;

      playAllAudioFiles([btnVoice.getAttribute('data-audio') || '']);
    }

    if (target.classList.contains('voice__audio')) {
      playAllAudioFiles([target.getAttribute('data-audio') || '']);
    }

    const ProgressContainer = document.querySelector('.progressbar__container') as HTMLElement;
    const btnNext = document.querySelector('.audiocall__next') as HTMLElement;
    const answerContainer = document.querySelector('.audiocall__figure-container') as HTMLElement;
    const btnVoiceContainer = document.querySelector('.audiocall__voice') as HTMLElement;
    const btnsOption = Array.from(document.getElementsByClassName('audiocall__check'));

    if (target.classList.contains('audiocall__btn-option')) {
      const btnVoice = document.querySelector('.voice__audio') as HTMLElement;
      const value = target.innerHTML.slice(3);
      const getIdWord = btnVoice.getAttribute('data-id') || '';
      const currentWord: WordInterface = await API.getWord(getIdWord);

      if (value === btnVoice.getAttribute('data-name')) {
        target.classList.add('audiocall__btn-true');
        trueAnswerAudio.play();
        progress += 10;
        trueAnswer += 1;
        rerenderProgressBar(ProgressContainer, progress);
        btnNext.innerHTML = 'Next';
        answerContainer.style.display = 'flex';
        btnVoiceContainer.style.display = 'none';
        setAttrDisabled(btnsOption);
        trueAnswerArr.push(currentWord);
      } else {
        target.classList.add('audiocall__btn-false');
        falseAnswerAudio.play();
        progress += 10;
        falseAnswer += 1;
        rerenderProgressBar(ProgressContainer, progress);
        btnNext.innerHTML = 'Next';
        answerContainer.style.display = 'flex';
        btnVoiceContainer.style.display = 'none';
        setAttrDisabled(btnsOption);
        falseAnswerArr.push(currentWord);
      }
    }

    if (target.classList.contains('audiocall__next') && progress !== 100) {
      renderContentAudioPage(block, mainWord, arrOptions, progress);
      const btnVoice = document.querySelector('.voice__audio') as HTMLElement;
      playAllAudioFiles([btnVoice.getAttribute('data-audio') || '']);
    } else if (target.classList.contains('audiocall__next') && progress === 100) {
      const accuracy = trueAnswer * 10;
      renderResultAudioPage(block, accuracy, trueAnswer, falseAnswer);
      const itemListTrue = document.querySelector('.result__list-true') as HTMLElement;
      const itemListFalse = document.querySelector('.result__list-false') as HTMLElement;
      renderListItem(itemListTrue, trueAnswerArr);
      renderListItem(itemListFalse, falseAnswerArr);
      console.log(trueAnswerArr);
      console.log(falseAnswerArr);

    }
  }

  GameContainer.addEventListener('click', rerenderAudioGame);
};

export const renderAudioPage = async (): Promise<void> => {
  const audioContent = document.querySelector('.audiocall__content') as HTMLElement;

  addEventStartAudioGame(audioContent);

  const mainBlock = `
    <h3 class="audiocall__subtitle">Game: Audio challenge</h3>
    <img class="audiocall__img" src="../../assets/audio-img.png" alt="audio" alt="Image Title" />
  `;
  audioContent.innerHTML = mainBlock;
};

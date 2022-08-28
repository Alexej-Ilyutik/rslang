import './audioGame.scss';
import { WordInterface } from '../../shared/types';
import { playAllAudioFiles } from '../../components/audioButton/audioButton';
import { setAttrDisabled } from '../../services/setAttrDisabled';
import { renderProgressBar, rerenderProgressBar } from '../../components/progressBar/renderProgressBar';
import API from '../../services/api';

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
    <div class="audiocall__voice">
       <button class="word-card_audio-button">
          <img class="word-card_audio-button-image voice__audio" src="../../assets/volume.svg" alt="audio button"
          data-audio="${`${API.base}/${mainWord.audio}`}"
          data-name ="${`${mainWord.wordTranslate}`}">
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

let level = 0;

const addEventStartAudioGame = (block: HTMLElement): void => {
  const GameContainer = document.querySelector('.audiocall__container') as HTMLElement;
  const btnStart = document.querySelector('.settings__start') as HTMLElement;

  btnStart.classList.add('btn__start-audio-game');
  let progress = 0;
  async function rerenderAudioGame(event: Event) {
    const target = event.target as HTMLInputElement;
    const arrWords = await getWordsTemp(level);
    const arrOptions = getArrOptions(arrWords);
    const addWordsToAudioGame = (): WordInterface => {
      const mainWord = arrOptions[getRandomArbitrary(0, 3)];
      return mainWord;
    };
    const mainWord = addWordsToAudioGame();

    if (target.classList.contains('setting__level')) {
      level = Number(target.getAttribute('data-level'));
    }

    if (target.classList.contains('btn__start-audio-game')) {
      renderContentAudioPage(block, mainWord, arrOptions, progress);

      const btnVoice = document.querySelector('.voice__audio') as HTMLElement;

      playAllAudioFiles([btnVoice.getAttribute('data-audio') || '']);
    }

    if (target.classList.contains('voice__audio')) {
      playAllAudioFiles([target.getAttribute('data-audio') || '']);
    }

    const ProgressContainer = document.querySelector('.progressbar__container') as HTMLElement;
    const btnNext = document.querySelector('.audiocall__next') as HTMLElement;
    const btnsOption = Array.from(document.getElementsByClassName('audiocall__check'));

    if (target.classList.contains('audiocall__btn-option')) {
      const btnVoice = document.querySelector('.voice__audio') as HTMLElement;
      const value = target.innerHTML.slice(3);
      if (value === btnVoice.getAttribute('data-name')) {
        target.classList.add('audiocall__btn-true');
        progress += 10;
        rerenderProgressBar(ProgressContainer, progress);
        btnNext.innerHTML = 'Next';
        setAttrDisabled(btnsOption);
      } else {
        target.classList.add('audiocall__btn-false');
        btnNext.innerHTML = 'Next';
        setAttrDisabled(btnsOption);
      }
    }

    if (target.classList.contains('audiocall__next')) {
      renderContentAudioPage(block, mainWord, arrOptions, progress);
      const btnVoice = document.querySelector('.voice__audio') as HTMLElement;
      playAllAudioFiles([btnVoice.getAttribute('data-audio') || '']);
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

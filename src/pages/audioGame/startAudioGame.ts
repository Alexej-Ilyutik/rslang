import { WordInterface } from '../../shared/types';
import API from '../../services/api';

const getWordsTemp = async (diff: number) => {
  const result = [];

  for (let i = 0; i <= 29; i += 1) {
    result.push(API.getWords(diff, i));
  }

  return (await Promise.all(result)).flat();
};

const arrWords = await getWordsTemp(0);

function getRandomArbitrary(min: number, max: number) {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function getArrOptions() {
  const arr: WordInterface[] = [];
  let uniqueArray: WordInterface[] = [];
  while (uniqueArray.length < 4) {
    const el = arrWords[getRandomArbitrary(0, 599)];
    arr.push(el);
    uniqueArray = [...new Set(arr)];
  }
  return uniqueArray;
}

const arrOptions = getArrOptions();

const addWordsToAudioGame = (): WordInterface => {
  const mainWord = arrOptions[getRandomArbitrary(0, 3)];
  return mainWord;
};

const renderContentAudioPage = async (): Promise<void> => {
  const audioContent = document.querySelector('.audiocall__content') as HTMLElement;
  const mainWord = addWordsToAudioGame();
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
      <input type="radio" class="btn-check" name="options" id="option1" autocomplete="off">
      <label class="btn btn-warning" for="option1">1. ${`${arrOptions[0].wordTranslate}`}</label>

      <input type="radio" class="btn-check" name="options" id="option2" autocomplete="off">
      <label class="btn btn-warning" for="option2">2. ${`${arrOptions[1].wordTranslate}`}</label>

      <input type="radio" class="btn-check" name="options" id="option3" autocomplete="off">
      <label class="btn btn-warning" for="option3">3. ${`${arrOptions[2].wordTranslate}`}</label>

      <input type="radio" class="btn-check" name="options" id="option4" autocomplete="off">
      <label class="btn btn-warning" for="option4">4. ${`${arrOptions[3].wordTranslate}`}</label>
    </div>
  `;
  audioContent.innerHTML = mainBlock;
};

let level: number;

// const settingsContainer = document.querySelector('.settings__btns') as HTMLElement;

// settingsContainer.addEventListener('click', event => {
//   const target = event.target as HTMLInputElement;
//   if (target.classList.contains('setting__level')) {
//     level = Number(target.getAttribute('data-level'));
//   }
// });

export const addEventStartAudioGame = (): void => {
  const GameContainer = document.querySelector('.audiocall__container') as HTMLElement;
  // const btnStart = document.querySelector('.settings__start') as HTMLElement;
  // btnStart.classList.add('btn__start-audio-game');

  GameContainer.addEventListener('click', event => {
    const target = event.target as HTMLInputElement;

    if (target.classList.contains('setting__level')) {
      level = Number(target.getAttribute('data-level'));
    }

    if (target.classList.contains('btn__start-audio-game')) {
      console.log('работает функция антона');
      console.log(level);
      renderContentAudioPage();
    }
  });
};

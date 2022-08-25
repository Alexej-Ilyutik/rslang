import './audioGame.scss';
import { PageOfWordsInterface } from '../../shared/types';
import { storage } from '../../shared/storage';
import API from '../../services/api';

const getWordsTemp = async (diff: number) => {
  const result = [];

  for (let i = 0; i <= 29; i += 1) {
    result.push(API.getWords(diff, i));
  }

  return (await Promise.all(result)).flat();
};

const arrWords = await getWordsTemp(0);

function getRandomArbitrary(min:number, max:number) {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}




export const renderAudioPage = async (): Promise<void> => {
  // storage.wordsListCurrentGroup = groupNumber;
  console.log(arrWords[getRandomArbitrary(0,599)]);

  const mainBlock = `
    <h3 class="audiocall__subtitle">Game: Audio challenge</h3>
    <div class="audiocall__voice">
       <button class="word-card_audio-button">
          <img class="word-card_audio-button-image" src="../../assets/volume.svg" alt="audio button"
          data-audio="${`${API.base}/`}"></img>
        </button>
    </div>
    <div class="audiocall__btns">
      <input type="radio" class="btn-check" name="options" id="option1" autocomplete="off" checked>
      <label class="btn btn-secondary" for="option1">Checked</label>

      <input type="radio" class="btn-check" name="options" id="option2" autocomplete="off">
      <label class="btn btn-secondary" for="option2">Radio</label>

      <input type="radio" class="btn-check" name="options" id="option3" autocomplete="off">
      <label class="btn btn-secondary" for="option3">Disabled</label>

      <input type="radio" class="btn-check" name="options" id="option4" autocomplete="off">
      <label class="btn btn-secondary" for="option4">Radio</label>
    </div>
  `;
  const audioContent = document.querySelector('.audiocall__content') as HTMLElement;
  audioContent.innerHTML = mainBlock;
};

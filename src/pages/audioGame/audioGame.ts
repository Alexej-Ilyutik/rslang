import './audioGame.scss';
import { PageOfWordsInterface } from '../../shared/types';
import { storage } from '../../shared/storage';
import API from '../../services/api';

export const renderAudioPage = (): void => {
  const mainBlock = `
    <div class="audiocall__voice">

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

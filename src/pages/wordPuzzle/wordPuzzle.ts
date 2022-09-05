import './wordPuzzle.scss';
import { WordInterface } from '../../shared/types';
import API from '../../services/api';
import { renderPreLoader } from '../../components/preLoader/preLoader';
import { getAllGroupWords } from '../../services/getAllGroupWords';
import { getGuessWord } from '../../services/getGuessWord';
import { storage } from '../../shared/storage';
import { shuffle } from '../../services/shuffleArray';
import { playAllAudioFiles } from '../../components/audioButton/audioButton';
import { renderVolumeBtn } from '../../components/renderVolumeBtn/renderVolumeBtn';

let level = 0;
let item = 0;
const trueAnswerAudio = new Audio('../../assets/success.mp3');
const falseAnswerAudio = new Audio('../../assets/error.mp3');

const renderOptionLetters = (block: HTMLElement, wordArr: string[]): void => {
  for (let i = 0; i < wordArr.length; i += 1) {
    const item = document.createElement('div');
    item.className = 'options-letter';
    item.innerHTML = `${wordArr[i]}`;
    block.appendChild(item);
  }
};

const renderWordLetters = (block: HTMLElement, wordArr: string[]): void => {
  for (let i = 0; i < wordArr.length; i += 1) {
    const item = document.createElement('div');
    item.className = 'word-letter';
    item.innerHTML = ``;
    block.appendChild(item);
  }
};

async function renderContentWordPuzzlePage(block: HTMLElement, mainWord: WordInterface): Promise<void> {
  const mainBlock = `
  <div class = "audiocall__volume">${renderVolumeBtn()}
    </div>
    <h3 class="audiocall__subtitle">Game: Word Puzzle</h3>
    <figure class="figure wordPuzzle__figure-container">
      <div class="wordPuzzle__image">
        <img src="${`${API.base}/${mainWord.image}`}" class="figure-img img-fluid rounded" alt="${`${mainWord.word}`}">
      </div>
      <div class="audiocall__figure-content">
        <button class="word-card_audio-button audiocall__figure-btn">
          <img id = "voice-audio" class="audiocall__figure-img voice__audio"
          src="../../assets/volume.svg" alt="audio button"
          data-audio="${`${API.base}/${mainWord.audio}`}"
          data-name ="${`${mainWord.word}`}"
          data-id="${`${mainWord.id}`}">
        </button>
        <figcaption class="figure-caption">${`${mainWord.wordTranslate}`}</figcaption>
      </div>
    </figure>
    <div class="figure wordPuzzle__game-container">
        <div class="figure wordPuzzle__game-word">
        </div>
        <div class="figure wordPuzzle__game-options">
        </div>
      </div>
  `;
  block.innerHTML = mainBlock;
}

const addEventStartWordPuzzleGame = async (): Promise<void> => {
  const arrWords = await getAllGroupWords(level);
  const audioContent = document.querySelector('.audiocall__content') as HTMLElement;
  const wordBlockContent = Array.from(document.getElementsByClassName('word-letter'));
  // let trueAnswer = 0;
  // let falseAnswer = 0;
  // let currentStreak = 0;
  // const currentStreakArray: Array<number> = [];
  // const trueAnswerArr: WordInterface[] = [];
  // const falseAnswerArr: WordInterface[] = [];

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

    if (target.classList.contains('options-letter')) {
      const btnVoice = document.getElementById('voice-audio') as HTMLElement;
      const currentWord = btnVoice.getAttribute('data-name') as string;
      if (target.innerHTML === currentWord[item]) {
        wordBlockContent[item].innerHTML = target.innerHTML;
        if (storage.volumeState) {
          trueAnswerAudio.play();
        }
        item += 1;
        target.innerHTML = '';
      } else {
        if (storage.volumeState) {
          falseAnswerAudio.play();
        }
        console.log('false');
      }

      console.log(wordBlockContent);
    }
  });
};

export const renderWordPuzzlePage = async (): Promise<void> => {
  const gameContainer = document.querySelector('.audiocall__container') as HTMLElement;
  const audioContent = document.querySelector('.audiocall__content') as HTMLElement;
  const mainBlock = `
    <h3 class="audiocall__subtitle">Game: Word Puzzle</h3>
    <img class="audiocall__img" src="../../assets/word-puzzle.png" alt="audio" alt="Image Title" />
  `;
  audioContent.innerHTML = mainBlock;
  gameContainer.addEventListener('click', async e => {
    const target = <HTMLButtonElement>e.target;
    const inputs = Array.from(document.getElementsByClassName('setting__level'));

    if (target.classList.contains('setting__level')) {
      level = Number(target.getAttribute('data-level'));
    }
    if (target.classList.contains('settings__start')) {
      renderPreLoader(audioContent);
      const arrWords = await getAllGroupWords(level);
      const guessWord = getGuessWord(storage.currentPage, arrWords);

      const arrOptions = guessWord.word.split('');
      shuffle(arrOptions);

      renderContentWordPuzzlePage(audioContent, guessWord);
      const wordContent = document.querySelector('.wordPuzzle__game-word') as HTMLElement;
      const optionContent = document.querySelector('.wordPuzzle__game-options') as HTMLElement;

      renderWordLetters(wordContent, arrOptions);
      renderOptionLetters(optionContent, arrOptions);
      addEventStartWordPuzzleGame();
      target.disabled = true;

      for (let i = 0; i < inputs.length; i += 1) {
        (<HTMLInputElement>inputs[i]).disabled = true;
      }
    }
    if (target.classList.contains('result__btn-play')) {
      level = 0;
      // renderGamePageContainer();
      renderWordPuzzlePage();
    }
  });
};

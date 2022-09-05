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
import { renderGamePage } from '../game/game';
import { renderGamePageContainer } from '../../components/gamePageContainer/gamePageContainer';
import { updateWord } from '../../services/updateWord';
import { updateUserStatistic } from '../../services/updateUserStatistic';
import { findDailyNewWords } from '../statistic/statistic';

let level = 0;
let count = 0;
let amountClick = 0;
let life = 5;
let trueAnswerRez = 0;
let allAnswerRez = 0;
let falseAnswerRez = 0;
const trueAnswerAudio = new Audio('../../assets/success.mp3');
const falseAnswerAudio = new Audio('../../assets/error.mp3');
let falseAnswerArr: WordInterface[] = [];
let newWordStart = 0;
let newWordFinish = 0;
const currentDate = new Date().toLocaleDateString('en-GB');

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

export const renderResultWordPuzzlePage = (
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

      <button type="button" class="btn btn-success result__btn-play" id = "btn-puzzle-play-again">Play again</button>
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

const renderLife = (block: HTMLElement, num: number): void => {
  for (let i = 0; i < num; i += 1) {
    const item = document.createElement('div');
    item.className = 'audiocall__life-item';
    item.innerHTML = `
             <i id="life${i}" class="fa-solid fa-heart fa-2x"></i>
        `;
    block.appendChild(item);
  }
};

async function renderContentWordPuzzlePage(block: HTMLElement, mainWord: WordInterface): Promise<void> {
  const mainBlock = `
  <div class = "audiocall__volume">${renderVolumeBtn()}
    </div>
    <h3 class="audiocall__subtitle">Game: Word Puzzle</h3>
    <div class="audiocall__life-container">
    </div>
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
    <button type="button" class="btn btn-info audiocall__next" id = "btn-wordPuzzle-next">I don't know</button>
  `;
  block.innerHTML = mainBlock;
  amountClick = 0;
  falseAnswerArr.push(mainWord);
}

const addEventStartWordPuzzleGame = async (): Promise<void> => {
  const audioContent = document.querySelector('.audiocall__content') as HTMLElement;
  let currentStreak = 0;
  const currentStreakArray: Array<number> = [];
  const trueAnswerArr: WordInterface[] = [];

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
      const wordBlockContent = Array.from(document.getElementsByClassName('word-letter'));
      const btnNext = document.querySelector('.audiocall__next') as HTMLElement;
      const btnVoice = document.getElementById('voice-audio') as HTMLElement;
      const currentWord = btnVoice.getAttribute('data-name') as string;
      const getIdWord = btnVoice.getAttribute('data-id') || '';
      const currentWordObj: WordInterface = await API.getWord(getIdWord);

      if (target.innerHTML === currentWord[count]) {
        wordBlockContent[count].innerHTML = target.innerHTML;

        if (storage.volumeState) {
          trueAnswerAudio.play();
        }
        amountClick += 1;
        count += 1;
        target.innerHTML = '';
        if (count === currentWord.length) {
          btnNext.innerHTML = 'Next';
        }
      } else {
        if (storage.volumeState) {
          falseAnswerAudio.play();
        }
        currentStreak = 0;
        life -= 1;
        amountClick -= 1;
        const lifeContent = document.querySelector('.audiocall__life-container') as HTMLElement;
        lifeContent.innerHTML = '';
        renderLife(lifeContent, life);
      }

      if (amountClick === currentWord.length) {
        trueAnswerRez += 1;
        trueAnswerArr.push(currentWordObj);
        currentStreak += 1;
        currentStreakArray.push(currentStreak);
      }

      if (life === 0) {
        let myAccuracy = 0;
        allAnswerRez += 1;
        if (allAnswerRez !== 0) {
          myAccuracy = Math.round((trueAnswerRez * 100) / allAnswerRez);
        }
        falseAnswerRez = allAnswerRez - trueAnswerRez;

        const falseResult = falseAnswerArr.filter(x => !trueAnswerArr.some(y => x.id === y.id));

        renderResultWordPuzzlePage(audioContent, myAccuracy, trueAnswerRez, falseAnswerRez);
        const itemListTrue = document.querySelector('.result__list-true') as HTMLElement;
        const itemListFalse = document.querySelector('.result__list-false') as HTMLElement;
        renderListItem(itemListTrue, trueAnswerArr);
        renderListItem(itemListFalse, falseResult);
        await updateWord(trueAnswerArr, falseResult);
        newWordFinish = await findDailyNewWords(currentDate);

        await updateUserStatistic(
          {
            newWordsCount: newWordFinish - newWordStart,
            accuracy: myAccuracy,
            bestStreak: Math.max.apply(null, currentStreakArray),
          },
          'puzzleGame',
        );
      }
    }

    if (target.classList.contains('audiocall__next')) {
      count = 0;
      allAnswerRez += 1;
      renderPreLoader(audioContent);
      const arrWords = await getAllGroupWords(level);
      const newGuessWord = getGuessWord(storage.currentPage, arrWords);

      const newArrOptions = newGuessWord.word.split('');
      shuffle(newArrOptions);

      renderContentWordPuzzlePage(audioContent, newGuessWord);
      const lifeContent = document.querySelector('.audiocall__life-container') as HTMLElement;
      renderLife(lifeContent, life);
      const wordContent = document.querySelector('.wordPuzzle__game-word') as HTMLElement;
      const optionContent = document.querySelector('.wordPuzzle__game-options') as HTMLElement;

      renderWordLetters(wordContent, newArrOptions);
      renderOptionLetters(optionContent, newArrOptions);
    }

    if (target.classList.contains('result__close')) {
      trueAnswerRez = 0;
      allAnswerRez = 0;
      life = 5;
      count = 0;
      falseAnswerArr = [];
      renderGamePage();
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
      newWordStart = await findDailyNewWords(currentDate);
      renderPreLoader(audioContent);
      const arrWords = await getAllGroupWords(level);
      const guessWord = getGuessWord(storage.currentPage, arrWords);

      const arrOptions = guessWord.word.split('');
      shuffle(arrOptions);

      renderContentWordPuzzlePage(audioContent, guessWord);
      const lifeContent = document.querySelector('.audiocall__life-container') as HTMLElement;
      renderLife(lifeContent, life);
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
      life = 5;
      count = 0;
      trueAnswerRez = 0;
      allAnswerRez = 0;
      falseAnswerArr = [];
      renderGamePageContainer();
      renderWordPuzzlePage();
    }
  });
};

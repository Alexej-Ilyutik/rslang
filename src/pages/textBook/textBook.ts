/* eslint-disable no-underscore-dangle */
import './textBook.scss';
import { PageOfWordsInterface } from '../../shared/types';
import { storage } from '../../shared/storage';
import API from '../../services/api';
import { deleteClassActive } from '../../services/deleteClassActive';
import { playAllAudioFiles } from '../../components/audioButton/audioButton';

export const renderTextBookNavigation = (): void => {
  const textBook = `
    <div class="textBook container">
      <h2 class="textBook__title">Text book</h2>
      <div class="textBook__content-wrapper">
        <div class="textBook__btn-group-wrapper">
          <button type="button" class="textBook__btn-group_button btn btn-outline-primary active"
            data-group="0">A1</button>
          <button type="button" class="textBook__btn-group_button btn btn-outline-primary" data-group="1">A2</button>
          <button type="button" class="textBook__btn-group_button btn btn-outline-primary" data-group="2">B1</button>
          <button type="button" class="textBook__btn-group_button btn btn-outline-primary" data-group="3">B2</button>
          <button type="button" class="textBook__btn-group_button btn btn-outline-primary" data-group="4">C1</button>
          <button type="button" class="textBook__btn-group_button btn btn-outline-primary" data-group="5">C2</button>
          <button type="button" class="textBook__btn-group_button btn btn-outline-primary" data-group="6">
          Hard words</button>
        </div>
        <nav class="textBook__pagination" aria-label="Page navigation example">
          <ul class="textBook__pagination_list pagination justify-content-center">
          </ul>
        </nav>
        <div class="textBook__games">
          <button class="textBook__games_game-button">
            <img src="../../assets/sprint-icon.svg" class="textBook__games_game-img" alt="game image"></img>
            <h2 class="textBook__games_game-name">Sprint</h2>
          </button>
          <button class="textBook__games_game-button">
            <img src="../../assets/audio-icon.svg" class="textBook__games_game-img" alt="game image"></img>
            <h2 class="textBook__games_game-name">Audio-game</h2>
          </button>
          <ul class="textBook__games_information-wrapper">
            <li class="textBook__games_information">Page: Has learned ${0}/${20} words</li>
            <li class="textBook__games_information">Groupe: Has learned ${0}/${600} words</li>
          </ul>
        </div>
        <ul class="textBook__words-list">
        </ul>
      </div>
    </div>`;
  const main = document.getElementById('main') as HTMLElement;
  main.innerHTML = textBook;
}

export const checkWordStatus = async (wordId: string):
Promise<{ isHard: boolean, isLearned: boolean, guessCounter: number }> => {
  let isHardStatus = false;
  let isLearnedStatus = false;
  let guessCounterStatus = 0;

  const wordStatus = await API.getUserWord(wordId);
  if (wordStatus) {
    if (wordStatus.difficulty === 'hard') isHardStatus = true;
    if (wordStatus.optional >= storage.maxGuessNumber) isLearnedStatus = true;
    guessCounterStatus = wordStatus.optional.guessCounter;
  }
  return {isHard: isHardStatus, isLearned: isLearnedStatus, guessCounter: guessCounterStatus };
}

export const setWordsStatus = async (arrayOfWords: PageOfWordsInterface): Promise<void> => {
  (await arrayOfWords).forEach(async element => {
    const wordId = element.id || element._id;
    const hardCheckbox = document.getElementById(`${wordId}Hard`) as HTMLInputElement;
    const learnedCheckbox = (document.getElementById(`${wordId}Learned`) as HTMLInputElement);
    const guessCounterSign = document.getElementById(`${wordId}`) as HTMLElement;
    const { isHard, isLearned, guessCounter} = await checkWordStatus(wordId || '');

    hardCheckbox.checked = isHard;
    learnedCheckbox.checked = isLearned;
    guessCounterSign.setAttribute('data-guessCounter', guessCounter.toString());
    guessCounterSign.innerHTML = `Guessed ${guessCounter.toString()} times`;
    if (guessCounter >= storage.maxGuessNumber) {
      learnedCheckbox.checked = true;
    }
  });
}

// export const updateWordStatus = async (wordId: string, isHard: boolean, guessCounter: number): Promise<void> => {

// }

export const renderTextBoxPage = async (groupNumber: number, pageNumber: number): Promise<void> => {
  storage.wordsListCurrentGroup = groupNumber;

  const getWords = async (_groupNumber: number, _pageNumber: number): PageOfWordsInterface => {
    if (_groupNumber === 6) {
      const arrayOfWords: PageOfWordsInterface = await API.getAggregatedWords();
      return arrayOfWords;
    }
    const arrayOfWords: PageOfWordsInterface = await API.getWords(_groupNumber, _pageNumber);
    return arrayOfWords;
  }
  // const arrayOfWords: PageOfWordsInterface = await API.getWords(storage.wordsListCurrentGroup, pageNumber)
  const arrayOfWords: PageOfWordsInterface = getWords(groupNumber, pageNumber);

  const wordsList = document.querySelector('.textBook__words-list') as HTMLElement;
  storage.wordsListCurrentPage = pageNumber; // update page number
  const html = (await arrayOfWords).map((element) => `
    <li class="textBook__words-list_word-card word-card" tabindex="0">
      <div class="word-card_visual-content-wrapper">
        <div class="word-card_img-wrapper">
          <img class="word-card_img" src="${`${API.base}/${element.image}`}" alt="${element.word} image"></img>
        </div>
        <div class="word-card_information-wrapper">
          <h2 class="word-card_word-name">${element.word}
          <span class="word-card_word-transcription"> ${element.transcription}</span></h2>
          <p class="word-card_word-name-translation">${element.wordTranslate}</p>
          <p class="word-card_word-meaning">${element.textMeaning}</p>
          <p class="word-card_word-meaning-translation">${element.textMeaningTranslate}</p>
          <p class="word-card_word-example">${element.textExample}</p>
          <p class="word-card_word-example-translation">${element.textExampleTranslate}</p>
          <hr class="word-card_line">
          <div class="word-card_status-wrapper">
            <div class="word-card_status-checkbox-wrapper">
              <input type="checkbox" class="word-card_status-checkbox hard-checkbox"
              id="${element.id || element._id}Hard" value="yes" data-id="${element.id || element._id}">
              <label for="${element.id || element._id}Hard"></label>
              <p class="word-card_status-checkbox-text">Hard word</p>
            </div>
            <div class="word-card_status-checkbox-wrapper">
              <input type="checkbox" class="word-card_status-checkbox learned-checkbox"
              id="${element.id || element._id}Learned" value="yes" data-id="${element.id || element._id}">
              <label for="${element.id || element._id}Learned"></label>
              <p class="word-card_status-checkbox-text">Learned word</p>
            </div>
          </div>
          <h3 class="word-card_counter-information" id="${element.id || element._id}">Guessed 0 times</h3>
        </div>
      </div>
      <div class="word-card_audio-content-wrapper">
        <button class="word-card_audio-button">
          <img class="word-card_audio-button-image" src="../../assets/volume.svg" alt="audio button"
          data-audio="${`${API.base}/${ element.audio}`}"
          data-audio-example="${`${API.base}/${element.audioExample}`}"
          data-audio-meaning="${`${API.base}/${element.audioMeaning}`}"></img>
        </button>
      </div>
    </li>`
  ).join('');
  wordsList.innerHTML = html;

  setWordsStatus(arrayOfWords);
}

export const renderPagination = (pageNumber: number, totalPagesNumber: number  = storage.limitOfPages): void => {
  const pagination = document.querySelector('.textBook__pagination_list') as HTMLElement;
  let maxNumberOfButtons = 3;
  if (window.matchMedia("(min-width: 576px)").matches) {
    maxNumberOfButtons = 5
  }
  if (window.matchMedia("(min-width: 768px)").matches) {
    maxNumberOfButtons = 7
  }

  const currentPage = pageNumber + 1;
  let i = 1;
  let lastIndex = maxNumberOfButtons;
  if (currentPage > Math.ceil(maxNumberOfButtons / 2)) {
    i = currentPage - Math.floor(maxNumberOfButtons / 2);
    lastIndex = currentPage + Math.floor(maxNumberOfButtons / 2);
  }
  if (currentPage > storage.limitOfPages - Math.floor(maxNumberOfButtons / 2)) {
    i = currentPage - maxNumberOfButtons + (storage.limitOfPages - currentPage) + 1;
  }
  let numButtonsHtml = '';
  for(; i <= totalPagesNumber && i <= lastIndex; i += 1) {
    let isActive = '';
    if (i === currentPage) {
      isActive = 'active';
    }
    numButtonsHtml += `<li class="page-item"><button class="page-link textBook__pagination_page-number ${isActive}"
    data-page="${i - 1}">${i}</button></li>`;
  }
  let prevButtonsStatus = '';
  let nextButtonsStatus = '';
  if (currentPage === 1) {
    prevButtonsStatus = 'disabled';
  }
  if (currentPage === storage.limitOfPages) {
    nextButtonsStatus = 'disabled';
  }

  const html = `
    <li class="page-item">
      <button class="page-link textBook__pagination_prev-ten-page ${prevButtonsStatus}"><<</button>
    </li>
    <li class="page-item">
      <button class="page-link textBook__pagination_prev-page ${prevButtonsStatus}"><</button>
    </li>
    ${ numButtonsHtml }
    <li class="page-item">
      <button class="page-link textBook__pagination_next-page ${nextButtonsStatus}">></button>
    </li>
    <li class="page-item">
      <button class="page-link textBook__pagination_next-ten-page ${nextButtonsStatus}">>></button>
    </li>`;
  pagination.innerHTML = html;
}

export const changePage = (groupNumber:number, pageNumber: number): void => {
  storage.wordsListCurrentPage = pageNumber;
  renderTextBoxPage(groupNumber, pageNumber);
  renderPagination(pageNumber);
}

export const addEventPagination = (): void => {
  const paginationArea = document.querySelector('.textBook__pagination_list') as HTMLElement;
  paginationArea.addEventListener('click', (event) => {
    if ((event.target as HTMLElement).classList.contains('textBook__pagination_page-number')) {
      const pageNumber = Number((event.target as HTMLElement).getAttribute('data-page'));
      changePage(storage.wordsListCurrentGroup, pageNumber);
    }
    if ((event.target as HTMLElement).classList.contains('textBook__pagination_prev-page')) {
      if (storage.wordsListCurrentPage > 0) {
        changePage(storage.wordsListCurrentGroup, storage.wordsListCurrentPage - 1);
      }
    }
    if ((event.target as HTMLElement).classList.contains('textBook__pagination_prev-ten-page')) {
      if (storage.wordsListCurrentPage > 0) {
        let nextPage = storage.wordsListCurrentPage - 10;
        if (nextPage < 0) nextPage = 0;
        else nextPage = storage.wordsListCurrentPage - 10;
        changePage(storage.wordsListCurrentGroup, nextPage);
      }
    }
    if ((event.target as HTMLElement).classList.contains('textBook__pagination_next-page')) {
      if (storage.wordsListCurrentPage < storage.limitOfPages - 1) {
        changePage(storage.wordsListCurrentGroup, storage.wordsListCurrentPage + 1);
      }
    }
    if ((event.target as HTMLElement).classList.contains('textBook__pagination_next-ten-page')) {
      if (storage.wordsListCurrentPage < storage.limitOfPages - 1) {
        let nextPage = storage.wordsListCurrentPage + 10;
        if (nextPage >= storage.limitOfPages) nextPage = storage.limitOfPages;
        else nextPage = storage.wordsListCurrentPage + 10;
        changePage(storage.wordsListCurrentGroup, nextPage - 1);
      }
    }
  })
}

export const addEventWordsGroup = (): void => {
  const wordsGroupArea = document.querySelector('.textBook__btn-group-wrapper') as HTMLElement;
  wordsGroupArea.addEventListener('click', (event) => {
    if ((event.target as HTMLElement).classList.contains('btn')) {
      const groupNumber = Number((event.target as HTMLElement).getAttribute('data-group'));
      const buttonsList = Array.from(document.querySelectorAll('.textBook__btn-group_button'));
      deleteClassActive(buttonsList);
      (event.target as HTMLElement).classList.add('active');
      storage.wordsListCurrentPage = 0;
      changePage(groupNumber, storage.wordsListCurrentPage);
    }
  })
}

export const addEventWords = (): void => {
  const wordsArea = document.querySelector('.textBook__words-list') as HTMLElement;
  wordsArea.addEventListener('click', async (event) => {
    if ((event.target as HTMLElement).classList.contains('word-card_audio-button-image')) {
      const audioLinkWord = (event.target as HTMLElement).getAttribute('data-audio') || '';
      const audioLinkExample = (event.target as HTMLElement).getAttribute('data-audio-example') || '';
      const audioLinkMeaning = (event.target as HTMLElement).getAttribute('data-audio-meaning') || '';
      const audioArray = [audioLinkWord, audioLinkMeaning, audioLinkExample];
      playAllAudioFiles(audioArray);
    }
    if ((event.target as HTMLInputElement).classList.contains('hard-checkbox')) {
      const wordId = (event.target as HTMLInputElement).getAttribute('data-id')?.toString() || '';
      const guessCounter = Number((document.getElementById(wordId) as HTMLElement).getAttribute('data-guessCounter'));
      let isHard = 'simple';
      if ((event.target as HTMLInputElement).checked) isHard = 'hard';
      if(await API.getUserWord(wordId)) {
        API.updateUserWord(wordId, isHard, guessCounter);
      } else {
        API.createUserWord(wordId, isHard, guessCounter);
      }
    }
    if ((event.target as HTMLInputElement).classList.contains('learned-checkbox')) {
      const wordId = (event.target as HTMLInputElement).getAttribute('data-id')?.toString() || '';
      const guessCounterStatus = Number((document.getElementById(wordId) as HTMLElement).getAttribute('data-guessCounter'));
      const hardCheckboxStatus = (document.getElementById(`${wordId}Hard`) as HTMLInputElement).checked;
      let isHard = 'simple';
      if (hardCheckboxStatus) isHard = 'hard';
      let guessCounter = guessCounterStatus;
      if ((event.target as HTMLInputElement).checked) guessCounter = storage.maxGuessNumber;
      if(await API.getUserWord(wordId)) {
        API.updateUserWord(wordId, isHard, guessCounter);
      } else {
        API.createUserWord(wordId, isHard, guessCounter);
      }
    }
  })
}

export const addTestBookEvents = (): void => {
  addEventWordsGroup();
  addEventPagination();
  addEventWords();
}

export const renderTextBook = (): void => {
  renderTextBookNavigation();
  renderTextBoxPage(storage.wordsListCurrentGroup, storage.wordsListCurrentPage);
  renderPagination(storage.wordsListCurrentPage);
  addTestBookEvents();
}

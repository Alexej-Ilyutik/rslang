/* eslint-disable no-underscore-dangle */
import './textBook.scss';
import { PageOfWordsInterface, WordInterface } from '../../shared/types';
import { storage } from '../../shared/storage';
import API from '../../services/api';
import { deleteClassActive } from '../../services/deleteClassActive';
import { playAllAudioFiles } from '../../components/audioButton/audioButton';
import { updateWordProperties } from '../../services/updateWordProperties';
import { getWordProperties } from '../../services/getWordProperties';
import { isLogin } from '../../services/isLogin';
import { hideElement } from '../../services/hideElement';

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
          <button type="button" class="textBook__btn-group_button btn btn-outline-primary" data-group="6"
          ${hideElement(storage.isLogin)}>
          Hard words</button>
        </div>
        <nav class="textBook__pagination" aria-label="Page navigation example">
          <ul class="textBook__pagination_list pagination justify-content-center">
          </ul>
        </nav>
        <div class="textBook__games" ${hideElement(storage.isLogin)}>
          <a href="#/sprintBook" class="textBook__games_game-button link-direction">
            <img src="../../assets/sprint-icon.svg" class="textBook__games_game-img" alt="game image"></img>
            <h2 class="textBook__games_game-name">Sprint</h2>
          </a>
          <a href="#/audio" class="textBook__games_game-button link-direction">
            <img src="../../assets/audio-icon.svg" class="textBook__games_game-img" alt="game image"></img>
            <h2 class="textBook__games_game-name">Audio challenge</h2>
          </a>
          <a href="#/wordPuzzle" class="textBook__games_game-button link-direction">
            <img src="../../assets/puzzle-icon.svg" class="textBook__games_game-img" alt="game image"></img>
            <h2 class="textBook__games_game-name">Word puzzle</h2>
          </a>
          <div class="textBook__games_information">
            <p>Learned ?/20 words on page</p>
          </div>
        </div>
        <ul class="textBook__words-list">
        </ul>
      </div>
      <div class="card text-center hard-message">
        <div class="card-body">
          <h3 class="card-title">You don't have "Hard words"!</h3>
        </div>
      </div>
    </div>`;
  const main = document.getElementById('main') as HTMLElement;
  main.innerHTML = textBook;
};

export const setWordStatus = async (wordId: string): Promise<void> => {
  const learnedCheckbox = document.getElementById(`${wordId}Learned`) as HTMLInputElement;
  const hardCheckbox = document.getElementById(`${wordId}Hard`) as HTMLInputElement;
  const guessCounterSign = document.getElementById(`${wordId}Counter`) as HTMLElement;
  const { difficultyValue, guessCounterValue } = await getWordProperties(wordId);
  if (difficultyValue === 'hard') {
    hardCheckbox.checked = true;
    learnedCheckbox.checked = false;
  } else if (difficultyValue === 'easy') {
    learnedCheckbox.checked = true;
    hardCheckbox.checked = false;
  }
  guessCounterSign.setAttribute('data-guessCounter', guessCounterValue.toString());
  guessCounterSign.innerHTML = `Guessed ${guessCounterValue.toString()} times`;
};

export const setWordsStatus = async (arrayOfWords: WordInterface[], isUserLogIn: boolean): Promise<void> => {
  if (isUserLogIn) {
    arrayOfWords.forEach(async element => {
      const wordId = element.id || element._id;
      await setWordStatus(wordId || '');
    });
  }
};

export const updateLearnWordsCounter = async (
  groupNumber: number,
  pageNumber: number,
  isUserLogIn: boolean,
): Promise<void> => {
  if (isUserLogIn) {
    const learnedWordsCounter = document.querySelector('.textBook__games_information') as HTMLElement;
    const learnedWordArray = await API.getAggregatedWords('easy');
    let learnedWordsOnPage = 0;
    for (let i = 0; i < learnedWordArray.length; i += 1) {
      if (learnedWordArray[i].group === groupNumber && learnedWordArray[i].page === pageNumber) {
        learnedWordsOnPage += 1;
      }
    }
    const gamesArea = document.querySelector('.textBook__games') as HTMLElement;
    if (gamesArea) {
      gamesArea.classList.remove('hidden-element');
    }

    // gamesArea.classList.remove('hidden-element');
    // gamesArea.style.display = 'flex';

    if (learnedWordsOnPage === storage.limitOfWordsOnPage) {
      gamesArea.classList.add('hidden-element');
      // gamesArea.style.display = 'none';
    }
    storage.learnedWordsOnPage = learnedWordsOnPage;
    learnedWordsCounter.innerHTML = `<p>Learned ${learnedWordsOnPage}/20 words on page</p>`;
  }
};

export const renderTextBoxPage = async (groupNumber: number, pageNumber: number): Promise<void> => {
  storage.wordsListCurrentGroup = groupNumber;
  const messageArea = document.querySelector('.hard-message') as HTMLElement;

  messageArea.style.display = 'none';

  const spinner = `
  <div class="spinner-wrapper">
    <div class="d-flex justify-content-center my-auto">
      <div class="spinner-border" role="status" style="width: 5rem; height: 5rem; margin-top: 2rem">
      </div>
    </div>
  </div>`;

  const textBoxPage = document.querySelector('.textBook__words-list') as HTMLElement;
  textBoxPage.innerHTML = spinner;

  const getWords = async (_groupNumber: number, _pageNumber: number): PageOfWordsInterface => {
    if (_groupNumber === 6) {
      const arrayOfWords: PageOfWordsInterface = await API.getAggregatedWords('hard');

      if ((await arrayOfWords).length === 0) {
        messageArea.style.display = 'block';
      }

      return arrayOfWords;
    }
    const arrayOfWords: PageOfWordsInterface = await API.getWords(_groupNumber, _pageNumber);
    return arrayOfWords;
  };
  const arrayOfWords: PageOfWordsInterface = getWords(groupNumber, pageNumber);
  storage.currentPageWords = await arrayOfWords;

  const wordsList = document.querySelector('.textBook__words-list') as HTMLElement;
  storage.wordsListCurrentPage = pageNumber;
  const html = (await arrayOfWords)
    .map(
      element => `
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
          <hr class="word-card_line" ${hideElement(storage.isLogin)}>
          <div class="word-card_status-wrapper" ${hideElement(storage.isLogin)}>
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
          <h3 class="word-card_counter-information" ${hideElement(storage.isLogin)}
          id="${element.id || element._id}Counter">Guessed 0 times</h3>
        </div>
      </div>
      <div class="word-card_audio-content-wrapper">
        <button class="word-card_audio-button">
          <img class="word-card_audio-button-image" src="../../assets/volume.svg" alt="audio button"
          data-audio="${`${API.base}/${element.audio}`}"
          data-audio-example="${`${API.base}/${element.audioExample}`}"
          data-audio-meaning="${`${API.base}/${element.audioMeaning}`}"></img>
        </button>
      </div>
    </li>`,
    )
    .join('');
  wordsList.innerHTML = html;
  updateLearnWordsCounter(storage.wordsListCurrentGroup, storage.wordsListCurrentPage, storage.isLogin);
  setWordsStatus(await arrayOfWords, storage.isLogin);
};

export const renderPagination = (pageNumber: number, totalPagesNumber: number = storage.limitOfPages): void => {
  const pagination = document.querySelector('.textBook__pagination_list') as HTMLElement;
  let maxNumberOfButtons = 3;
  if (window.matchMedia('(min-width: 576px)').matches) {
    maxNumberOfButtons = 5;
  }
  if (window.matchMedia('(min-width: 768px)').matches) {
    maxNumberOfButtons = 7;
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
  for (; i <= totalPagesNumber && i <= lastIndex; i += 1) {
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
    ${numButtonsHtml}
    <li class="page-item">
      <button class="page-link textBook__pagination_next-page ${nextButtonsStatus}">></button>
    </li>
    <li class="page-item">
      <button class="page-link textBook__pagination_next-ten-page ${nextButtonsStatus}">>></button>
    </li>`;
  pagination.innerHTML = html;
};

export const changePage = (groupNumber: number, pageNumber: number): void => {
  storage.wordsListCurrentPage = pageNumber;
  renderTextBoxPage(groupNumber, pageNumber);
  renderPagination(pageNumber);
};

export const addEventPagination = (): void => {
  const paginationArea = document.querySelector('.textBook__pagination_list') as HTMLElement;
  paginationArea.addEventListener('click', event => {
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
  });
};

export const addEventWordsGroup = (): void => {
  const wordsGroupArea = document.querySelector('.textBook__btn-group-wrapper') as HTMLElement;
  wordsGroupArea.addEventListener('click', event => {
    if ((event.target as HTMLElement).classList.contains('btn')) {
      const groupNumber = Number((event.target as HTMLElement).getAttribute('data-group'));
      const buttonsList = Array.from(document.querySelectorAll('.textBook__btn-group_button'));
      deleteClassActive(buttonsList);
      (event.target as HTMLElement).classList.add('active');
      storage.wordsListCurrentPage = 0;
      changePage(groupNumber, storage.wordsListCurrentPage);
    }
  });
};

export const addEventWords = (): void => {
  const wordsArea = document.querySelector('.textBook__words-list') as HTMLElement;
  wordsArea.addEventListener('click', async event => {
    if ((event.target as HTMLElement).classList.contains('word-card_audio-button-image')) {
      const audioLinkWord = (event.target as HTMLElement).getAttribute('data-audio') || '';
      const audioLinkExample = (event.target as HTMLElement).getAttribute('data-audio-example') || '';
      const audioLinkMeaning = (event.target as HTMLElement).getAttribute('data-audio-meaning') || '';
      const audioArray = [audioLinkWord, audioLinkMeaning, audioLinkExample];
      playAllAudioFiles(audioArray);
    }
    if ((event.target as HTMLInputElement).classList.contains('hard-checkbox')) {
      const wordId = (event.target as HTMLInputElement).getAttribute('data-id')?.toString() || '';
      if ((event.target as HTMLInputElement).checked === true) {
        await updateWordProperties(wordId, undefined, 'hard');
        setWordStatus(wordId);
        updateLearnWordsCounter(storage.wordsListCurrentGroup, storage.wordsListCurrentPage, storage.isLogin);
      } else {
        await updateWordProperties(wordId, undefined, 'normal');
        setWordStatus(wordId);
      }
    }
    if ((event.target as HTMLInputElement).classList.contains('learned-checkbox')) {
      const wordId = (event.target as HTMLInputElement).getAttribute('data-id')?.toString() || '';
      if ((event.target as HTMLInputElement).checked === true) {
        await updateWordProperties(wordId, undefined, 'easy');
        setWordStatus(wordId);
        updateLearnWordsCounter(storage.wordsListCurrentGroup, storage.wordsListCurrentPage, storage.isLogin);
      } else {
        await updateWordProperties(wordId, undefined, 'normal');
        setWordStatus(wordId);
        updateLearnWordsCounter(storage.wordsListCurrentGroup, storage.wordsListCurrentPage, storage.isLogin);
      }
    }
  });
};

export const addTestBookEvents = (): void => {
  addEventWordsGroup();
  addEventPagination();
  addEventWords();
};

export const renderTextBook = (groupNumber: number, pageNumber: number): void => {
  storage.isLogin = isLogin();
  renderTextBookNavigation();
  renderTextBoxPage(groupNumber, pageNumber);
  renderPagination(pageNumber);
  addTestBookEvents();
  storage.currentPage = 'Book';
};

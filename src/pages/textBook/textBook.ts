import './textBook.scss';
import { pageOfWordsInterface } from '../../shared/types';
import { storage } from '../../shared/storage';
import API from '../../services/api';

export const renderTextBook = (): void => {
  const textBook = `
    <div class="textBook container">
      <h2 class="textBook__title">Text book</h2>
      <div class="textBook__content-wrapper">
        <nav class="textBook__nav nav nav-pills flex-column flex-sm-row">
          <a class="flex-sm-fill text-sm-center nav-link active" href="#none">A1</a>
          <a class="flex-sm-fill text-sm-center nav-link" href="#none">A2</a>
          <a class="flex-sm-fill text-sm-center nav-link" href="#none">B1</a>
          <a class="flex-sm-fill text-sm-center nav-link" href="#none">B2</a>
          <a class="flex-sm-fill text-sm-center nav-link" href="#none">C1</a>
          <a class="flex-sm-fill text-sm-center nav-link" href="#none">C2</a>
          <a class="flex-sm-fill text-sm-center nav-link disabled" href="#none" tabindex="-1" aria-disabled="true">H</a>
        </nav>
        <nav class="textBook__pagination" aria-label="Page navigation example">
          <ul class="textBook__pagination_list pagination justify-content-center">
          </ul>
        </nav>
        <ul class="textBook__words-list">
        </ul>
      </div>
    </div>`;
    const main = document.getElementById('main') as HTMLElement;
    main.innerHTML = textBook;
  }

export const renderTextBoxPage = async (pageNumber: number): Promise<void> => {
  const arrayOfWords: pageOfWordsInterface = await API.getWords(1, pageNumber)

  const wordsList = document.querySelector('.textBook__words-list') as HTMLElement;
  storage.wordsListCurrentPage = pageNumber; //update page number
  const html = (await arrayOfWords).map((element) => {
    if (element.page === pageNumber) return `
    <li class="textBook__words-list_word-card word-card" tabindex="0">
      <img class="word-card_img" src="${element.image}" alt="${element.word} image"></img>
      <div class="word-card_information-wrapper">
        <h2 class="word-card_word-name">${element.word}</h2>
        <p class="word-card_word-transcription">${element.transcription}</p>
        <p class="word-card_word-name-translation">${element.wordTranslate}</p>
        <p class="word-card_word-meaning">${element.textMeaning}</p>
        <p class="word-card_word-meaning-translation">${element.textMeaningTranslate}</p>
        <p class="word-card_word-example">${element.textExample}</p>
        <p class="word-card_word-example-translation">${element.textExampleTranslate}</p>
      </div>
    </li>`
  }).join('');
  wordsList.innerHTML = html;
}

export const renderPagination = (pageNumber: number, totalPagesNumber: number  = storage.limitOfPages): void => {
  const pagination = document.querySelector('.textBook__pagination_list') as HTMLElement;

  const maxNumberOfButtons = 8;

  let i = 1;
  let lastIndex = maxNumberOfButtons;
  if (pageNumber > maxNumberOfButtons) {
    i = pageNumber - maxNumberOfButtons + 1;
    lastIndex = maxNumberOfButtons + i - 1;
  }
  let numButtonsHtml: string = '';
  for(; i <= totalPagesNumber && i <= lastIndex; i++) {
    let isActive = '';
    if (i === pageNumber) {
      isActive = 'active';
    }
    numButtonsHtml += `<li class="page-item"><button class="page-link textBook__pagination_page-number ${isActive}" data-page="${i}">${i}</button></li>`;
  }

  const html = `<li class="page-item textBook__pagination_prev-page disabled">
    <button class="page-link">\<</button>
    </li>
    ${ numButtonsHtml }
    <li class="page-item">
      <button class="page-link textBook__pagination_next-page">\></button>
    </li>`;

  pagination.innerHTML = html;
}

export const addEventPagination = (): void => {
  const paginationArea = document.querySelector('.textBook__pagination_list') as HTMLElement;
  paginationArea.addEventListener('click', (event) => {
    if ((event.target as HTMLElement).classList.contains('textBook__pagination_page-number')) {
      const pageNumber = Number((event.target as HTMLElement).getAttribute('data-page'));
      changePage(pageNumber);
    }
    if ((event.target as HTMLElement).classList.contains('textBook__pagination_prev-page')) {
      if (storage.wordsListCurrentPage > 1) {
        changePage(storage.wordsListCurrentPage - 1);
      }
    }
    if ((event.target as HTMLElement).classList.contains('textBook__pagination_next-page')) {
      if (storage.wordsListCurrentPage < storage.limitOfPages) {
        changePage(storage.wordsListCurrentPage + 1);
      }
    }
  })
}

export const changePage = (pageNumber: number): void => {
  storage.wordsListCurrentPage = pageNumber;
  renderTextBoxPage(pageNumber);
  renderPagination(pageNumber);
}

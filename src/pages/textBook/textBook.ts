import './textBook.scss';
import { pageOfWordsInterface } from '../../shared/types';
import { storage } from '../../shared/storage';

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
            <li class="page-item disabled">
              <a class="page-link" href="#" tabindex="-1" aria-disabled="true">\<</a>
            </li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item">
              <a class="page-link" href="#">\></a>
            </li>
          </ul>
        </nav>
        <ul class="textBook__words-list">
        </ul>
      </div>
    </div>`;
    const main = document.getElementById('main') as HTMLElement;
    main.innerHTML = textBook;
  }

  const arrayOfWords: pageOfWordsInterface = [
    {
      "id": "1",
      "group": 1,
      "page": 1,
      "word": "duck",
      "image": "../../assets/duck.png",
      "audio": "string",
      "audioMeaning": "string",
      "audioExample": "string",
      "textMeaning": "string",
      "textExample": "string",
      "transcription": "string",
      "wordTranslate": "string",
      "textMeaningTranslate": "string",
      "textExampleTranslate": "string"
    },
    {
      "id": "2",
      "group": 1,
      "page": 1,
      "word": "duck2",
      "image": "../../assets/duck.png",
      "audio": "string",
      "audioMeaning": "string",
      "audioExample": "string",
      "textMeaning": "string",
      "textExample": "string",
      "transcription": "string",
      "wordTranslate": "string",
      "textMeaningTranslate": "string",
      "textExampleTranslate": "string"
    },
    {
      "id": "3",
      "group": 1,
      "page": 2,
      "word": "duck3",
      "image": "../../assets/duck.png",
      "audio": "string",
      "audioMeaning": "string",
      "audioExample": "string",
      "textMeaning": "string",
      "textExample": "string",
      "transcription": "string",
      "wordTranslate": "string",
      "textMeaningTranslate": "string",
      "textExampleTranslate": "string"
    },
    {
      "id": "4",
      "group": 1,
      "page": 2,
      "word": "duck4",
      "image": "../../assets/duck.png",
      "audio": "string",
      "audioMeaning": "string",
      "audioExample": "string",
      "textMeaning": "string",
      "textExample": "string",
      "transcription": "string",
      "wordTranslate": "string",
      "textMeaningTranslate": "string",
      "textExampleTranslate": "string"
    }
  ]; //Delete this!

  export const renderTextBoxPage = (pageNumber: number = 1): void => {
    //arrayOfWords: pageOfWordsInterface = getWords(pageNumber);
    const wordsList = document.querySelector('.textBook__words-list') as HTMLElement;
    storage.wordsListPage = pageNumber; //update page number
    const html = arrayOfWords.map((element) => {
      if (element.page === pageNumber) return `
      <li class="textBook__words-list_word-card word-card">
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

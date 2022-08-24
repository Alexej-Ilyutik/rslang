import './textBook.scss';
import { PageOfWordsInterface } from '../../shared/types';
import { storage } from '../../shared/storage';
import API from '../../services/api';
import { deleteClassActive } from '../../services/deleteClassActive';

export const renderTextBook = (): void => {
  const textBook = `
    <div class="textBook container">
      <h2 class="textBook__title">Text book</h2>
      <div class="textBook__content-wrapper">
        <div class="textBook__btn-group-wrapper">
          <div class="btn-group" role="group" aria-label="Basic outlined example">
            <button type="button" class="textBook__btn-group_button btn btn-outline-primary active"
             data-group="0">A1</button>
            <button type="button" class="textBook__btn-group_button btn btn-outline-primary" data-group="1">A2</button>
            <button type="button" class="textBook__btn-group_button btn btn-outline-primary" data-group="2">B1</button>
            <button type="button" class="textBook__btn-group_button btn btn-outline-primary" data-group="3">B2</button>
            <button type="button" class="textBook__btn-group_button btn btn-outline-primary" data-group="4">C1</button>
            <button type="button" class="textBook__btn-group_button btn btn-outline-primary" data-group="5">C2</button>
            <button type="button" class="textBook__btn-group_button btn btn-outline-primary" data-group="6">HD</button>
          </div>
        </div>
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

export const renderTextBoxPage = async (groupNumber: number, pageNumber: number): Promise<void> => {
  storage.wordsListCurrentGroup = groupNumber;
  const arrayOfWords: PageOfWordsInterface = await API.getWords(storage.wordsListCurrentGroup, pageNumber)

  const wordsList = document.querySelector('.textBook__words-list') as HTMLElement;
  storage.wordsListCurrentPage = pageNumber; // update page number
  const html = (await arrayOfWords).map((element) => `
    <li class="textBook__words-list_word-card word-card" tabindex="0">
      <div class="word-card_visual-content-wrapper">
        <div class="word-card_img-wrapper">
          <img class="word-card_img" src="${`${API.base}/${element.image}`}" alt="${element.word} image"></img>
        </div>
        <div class="word-card_information-wrapper">
          <h2 class="word-card_word-name">${element.word}</h2>
          <p class="word-card_word-transcription">${element.transcription}</p>
          <p class="word-card_word-name-translation">${element.wordTranslate}</p>
          <p class="word-card_word-meaning">${element.textMeaning}</p>
          <p class="word-card_word-meaning-translation">${element.textMeaningTranslate}</p>
          <p class="word-card_word-example">${element.textExample}</p>
          <p class="word-card_word-example-translation">${element.textExampleTranslate}</p>
          <hr class="word-card_line">
          <div class="word-card_status-wrapper">
            <div class="word-card_status-checkbox-wrapper">
              <input type="checkbox" class="word-card_status-checkbox" id="hard" value="yes" checked="checked">
              <label for="hard"></label>
              <p class="word-card_status-checkbox-text">Hard word</p>
            </div>
            <div class="word-card_status-checkbox-wrapper">
              <input type="checkbox" class="word-card_status-checkbox" id="learned" value="yes">
              <label for="learned"></label>
              <p class="word-card_status-checkbox-text">Learned word</p>
            </div>
            <p class="word-card_counter-information">Guessed ${0} times</p>
          </div>
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
}

export const renderPagination = (pageNumber: number, totalPagesNumber: number  = storage.limitOfPages): void => {
  const pagination = document.querySelector('.textBook__pagination_list') as HTMLElement;

  const maxNumberOfButtons = 7;
  const currentPage = pageNumber + 1;
  let i = 1;
  let lastIndex = maxNumberOfButtons;
  if (currentPage > 4) {
    i = currentPage - 3;
    lastIndex = currentPage + 3;
  }
  if (currentPage > storage.limitOfPages - 3) {
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

  const html = `<li class="page-item textBook__pagination_prev-page disabled">
    <button class="page-link"><</button>
    </li>
    ${ numButtonsHtml }
    <li class="page-item">
      <button class="page-link textBook__pagination_next-page">></button>
    </li>`;

  pagination.innerHTML = html;
}

export const changePage = (groupNumber:number, pageNumber: number): void => {
  storage.wordsListCurrentPage = pageNumber;
  renderTextBoxPage(groupNumber, pageNumber);
  renderPagination(pageNumber);
}

export const stopAllAudio = (): void => {
  const allAudioFiles: HTMLAudioElement[] = Array.from(document.querySelectorAll('audio'));
  allAudioFiles.forEach(el => {
    el.pause();
    el.remove();
  })
}

export const playAllAudioFiles = (audioLinks: string[], index = 0): void => {
  if (index === 0) {
    stopAllAudio();
  }
  if (index < audioLinks.length) {
    const audio = document.createElement('audio');
    audio.style.display = "none";
    audio.src = audioLinks[index];
    audio.autoplay = true;
    audio.onended = () => {
      audio.remove();
    };
    document.body.appendChild(audio);
    audio.addEventListener("ended", () => {
      playAllAudioFiles(audioLinks, index + 1);
    });
  }
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
    if ((event.target as HTMLElement).classList.contains('textBook__pagination_next-page')) {
      if (storage.wordsListCurrentPage < storage.limitOfPages - 1) {
        changePage(storage.wordsListCurrentGroup, storage.wordsListCurrentPage + 1);
      }
    }
  })
}

export const addEventWordsGroup = (): void => {
  const wordsGroupArea = document.querySelector('.btn-group') as HTMLElement;
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

export const addEventAudioButton = (): void => {
  const wordsArea = document.querySelector('.textBook__words-list') as HTMLElement;
  wordsArea.addEventListener('click', (event) => {
    if ((event.target as HTMLElement).classList.contains('word-card_audio-button-image')) {
      const audioLinkWord = (event.target as HTMLElement).getAttribute('data-audio') || '';
      const audioLinkExample = (event.target as HTMLElement).getAttribute('data-audio-example') || '';
      const audioLinkMeaning = (event.target as HTMLElement).getAttribute('data-audio-meaning') || '';
      const audioArray = [audioLinkWord, audioLinkMeaning, audioLinkExample];
      playAllAudioFiles(audioArray);
    }
  })
}

export const addTestBookEvents = (): void => {
  addEventWordsGroup();
  addEventPagination();
  addEventAudioButton();
}

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { renderHeader } from './components/header/header';
import { renderFooter } from './components/footer/footer';
import { renderMain } from './pages/main/main';
import { storage } from './shared/storage';
import './style.scss';
import { renderTextBook, renderTextBoxPage, renderPagination, addEventPagination } from './pages/textBook/textBook';

export const renderPage = (): void => {
  renderHeader();
  renderMain();
  renderFooter();
};

renderPage();

const main = document.getElementById('main') as HTMLElement;

const onNavigate = (location: string): void => {
  switch (location) {
    case '#/main':
      renderMain();
      break;
    case '#/book':
      // main.innerHTML = `<h1>Book</h1>`;
      renderTextBook();
      renderTextBoxPage(1);
      renderPagination(storage.wordsListCurrentPage);
      addEventPagination();
      break;
    case '#/games':
      main.innerHTML = `<h1>Games</h1>`;
      break;
    case '#/statistic':
      main.innerHTML = `<h1>Statistic</h1>`;
      break;
    case '#/command':
      main.innerHTML = `<h1>Command</h1>`;
      break;
    default:
      main.innerHTML = `<h1>Main</h1>`;
      break;
  }
};

window.addEventListener('click', (e: Event) => {
  const target = e.target as HTMLAnchorElement;

  if (target.classList.contains('nav-link')) {
    const location = target.href.split('/').slice(-2).join('/');
    onNavigate(location);
  }
});

const brand = document.querySelector('.navbar-brand') as HTMLElement;

brand.addEventListener('click', (e: Event) => {
  const target = e.currentTarget as HTMLAnchorElement;
  const location = target.href.split('/').slice(-2).join('/');
  onNavigate(location);
});

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { renderHeader } from './components/header/header';
import { renderFooter } from './components/footer/footer';
import { renderMain } from './pages/main/main';
import { storage } from './shared/storage';
import { deleteClassActive } from './services/deleteClassActive';
import './style.scss';
import { renderTextBook, renderTextBoxPage, renderPagination, addTestBookEvents } from './pages/textBook/textBook';
import { loginForm, loginHandler } from './components/loginForm/loginForm';
import { registerForm, registerHandler } from './components/registerForm/registerForm';
import { isLogin } from './services/isLogin';
import { switchLoginMode } from './services/switchLoginMode';
import { renderGamePage } from './pages/games/game';

const renderPage = (): void => {
  renderHeader();
  renderMain();
  renderFooter();
};

renderPage();

const header = document.getElementById('header');
header?.insertAdjacentHTML('beforeend', loginForm);
header?.insertAdjacentHTML('beforeend', registerForm);
loginHandler();
registerHandler();

if (isLogin()) switchLoginMode();

const main = document.getElementById('main') as HTMLElement;
const mainLink = document.querySelector('.main-link') as HTMLElement;

const navLinks = Array.from(document.getElementsByClassName('nav-link'));

const onNavigate = (location: string): void => {
  switch (location) {
    case '#/main':
      renderMain();
      break;
    case '#/book':
      renderTextBook();
      renderTextBoxPage(0, 1);
      renderPagination(storage.wordsListCurrentPage);
      addTestBookEvents()
      break;
    case '#/games':
      renderGamePage();
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
    deleteClassActive(navLinks);

    const location = target.href.split('/').slice(-2).join('/');
    navLinks.forEach(el => {
      if (el.innerHTML === target.innerHTML) {
        el.classList.add('active');
      }
    });

    onNavigate(location);
  }
});

const brand = document.querySelector('.navbar-brand') as HTMLElement;
const footerBrand = document.querySelector('.footer__brand') as HTMLElement;

function changeLinkActiveLogo(e: Event) {
  deleteClassActive(navLinks);
  const curTarget = e.currentTarget as HTMLAnchorElement;
  const location = curTarget.href.split('/').slice(-2).join('/');

  mainLink.classList.add('active');
  onNavigate(location);
}

brand.addEventListener('click', changeLinkActiveLogo);

footerBrand.addEventListener('click', changeLinkActiveLogo);

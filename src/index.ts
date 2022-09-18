import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { renderHeader } from './components/header/header';
import { renderFooter } from './components/footer/footer';
import { renderMain } from './pages/main/main';
import { deleteClassActive } from './services/deleteClassActive';
import './style.scss';
import { renderTextBook } from './pages/textBook/textBook';
import { loginForm, loginHandler } from './components/loginForm/loginForm';
import { registerForm, registerHandler } from './components/registerForm/registerForm';
import { isLogin } from './services/isLogin';
import { switchLoginMode } from './services/switchLoginMode';
import { renderGamePage } from './pages/game/game';
import { renderAudioPage } from './pages/audioGame/audioGame';
import { renderGamePageContainer } from './components/gamePageContainer/gamePageContainer';
import { startSprint, startSprintFromTextBook } from './pages/sprint/sprint';
import { renderGraphs, renderStatistic } from './pages/statistic/statistic';
import { renderWordPuzzlePage } from './pages/wordPuzzle/wordPuzzle';

const renderPage = (): void => {
  renderHeader();
  renderMain();
  renderFooter();
};

renderPage();

const header = <HTMLElement>document.getElementById('header');
header.insertAdjacentHTML('beforeend', loginForm);
header.insertAdjacentHTML('beforeend', registerForm);
loginHandler();
registerHandler();

if (isLogin()) switchLoginMode();

const navLinks = Array.from(document.getElementsByClassName('nav-link'));

const onNavigate = async (location: string): Promise<void> => {
  switch (location) {
    case '#/main':
      renderMain();
      renderFooter();
      localStorage.setItem('currentPage', '#/main');
      break;
    case '#/book':
      renderTextBook(0, 0);
      renderFooter();
      localStorage.setItem('currentPage', '#/book');
      break;
    case '#/games':
      renderGamePage();
      renderFooter();
      localStorage.setItem('currentPage', '#/games');
      break;
    case '#/statistic':
      renderStatistic();
      renderGraphs();
      renderFooter();
      localStorage.setItem('currentPage', '#/statistic');
      break;
    case '#/sprint':
      renderGamePageContainer();
      startSprint();
      localStorage.setItem('currentPage', '#/sprint');
      break;
    case '#/sprintBook':
      renderGamePageContainer();
      startSprintFromTextBook();
      localStorage.setItem('currentPage', '#/sprintBook');
      break;
    case '#/audio':
      renderGamePageContainer();
      renderAudioPage();
      localStorage.setItem('currentPage', '#/audio');
      break;
    case '#/wordPuzzle':
      renderGamePageContainer();
      renderWordPuzzlePage();
      localStorage.setItem('currentPage', '#/wordPuzzle');
      break;
    default:
      renderMain();
      renderFooter();
      localStorage.setItem('currentPage', '#/main');
      break;
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const location = localStorage.getItem('currentPage') as string;
  deleteClassActive(navLinks);
  navLinks.forEach(el => {
    if (el.innerHTML.toLowerCase() === location.slice(2)) {
      el.classList.add('active');
    }
  });
  onNavigate(location);
});

window.addEventListener(
  'popstate',
  (): void => {
    const location = window.document.URL.split('/').slice(-2).join('/');
    deleteClassActive(navLinks);
    navLinks.forEach(el => {
      if (el.innerHTML.toLowerCase() === location.slice(2)) {
        el.classList.add('active');
      }
    });
    onNavigate(location);
  },
  false,
);


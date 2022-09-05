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
import { startSprint } from './pages/sprint/sprint';
import { renderStatistic } from './pages/statistic/statistic';

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

const main = document.getElementById('main') as HTMLElement;

const navLinks = Array.from(document.getElementsByClassName('nav-link'));

const onNavigate = (location: string): void => {
  switch (location) {
    case '#/main':
      renderMain();
      break;
    case '#/book':
      renderTextBook();
      break;
    case '#/games':
      renderGamePage();
      break;
    case '#/statistic':
      renderStatistic();
      break;
    case '#/sprint':
      renderGamePageContainer();
      startSprint();
      break;
    case '#/audio':
      renderGamePageContainer();
      renderAudioPage();
      break;
    case '#/sprintBook':
      main.innerHTML = `<h1>sprintBook</h1>`;
      break;
    case '#/wordPuzzle':
      main.innerHTML = `<h1>#/wordPuzzle</h1>`;
      break;
    case '#/sentencePuzzle':
      main.innerHTML = `<h1>#/sentencePuzzle</h1>`;
      break;
    default:
      renderMain();
      renderFooter();
      break;
  }
};

window.addEventListener('click', (e: Event) => {
  const target = e.target as HTMLAnchorElement;
  const link = target.closest('.link-direction') as HTMLAnchorElement | null;

  if (!link) return;

  deleteClassActive(navLinks);

  const location = link.href.split('/').slice(-2).join('/');
  navLinks.forEach(el => {
    if (el.innerHTML === target.innerHTML) {
      el.classList.add('active');
    }
  });
  onNavigate(location);
});

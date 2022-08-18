import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { renderHeader } from './components/header/header';
import { renderFooter } from './components/footer/footer';
import { renderMain } from './components/pages/main/main';
import { textBook } from './components/pages/textBook/textBook';
import './style.scss';

export const renderPage = (): void => {
  renderHeader();
  renderFooter();
  // renderMain();
};

renderPage();

const main = document.getElementById('main') as HTMLElement;


const onNavigate = (location: string): void => {
  switch (location) {
    case '/':
      main.innerHTML = `<h1>Main</h1>`;
      break;
    case '/book':
      main.innerHTML = `<h1>Book</h1>`;
      break;
    case '/games':
      main.innerHTML = `<h1>Games</h1>`;
      break;
    case '/statistic':
      main.innerHTML = `<h1>Statistic</h1>`;
      break;
    case '/command':
      main.innerHTML = `<h1>Command</h1>`;
      break;
    default:
      main.innerHTML = `<h1>Main</h1>`;
      break;
  }
};

window.addEventListener('load', ()=>{
  const location = window.location.hash;
  if(location){
    onNavigate(location);
  }
})

// const routes = {
//   '/': home,
//   '/book': book,
//   '/games': games,
// };

// const main = document.getElementById('main') as HTMLElement;
// main.innerHTML = routes[window.location.pathname];

// const onNavigate = (pathname: void) => {
//   window.history.pushState({}, pathname, window.location.origin + pathname);
//   main.innerHTML = routes[pathname];
// };

// window.onpopstate = (): void => {
//   main.innerHTML = routes[window.location.pathname];
// };

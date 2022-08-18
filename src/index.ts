import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { renderMain } from './components/pages/main/main';
import { textBook } from './components/pages/textBook/textBook';
import './style.scss';

// renderPage();

export const renderPage = (): void => {
  const pageContent = `
         ${renderMain()}
`;
  const app = document.createElement('div');
  app.innerHTML = pageContent;
  document.body.appendChild(app);
};
renderPage();

// const routes = {
//   '/': main,
//   '/textBook': textBook,
// };

// const rootDiv = document.getElementById('root') as HTMLElement;
// rootDiv.innerHTML = routes[window.location.pathname];

// const onNavigate = pathname => {
//   window.history.pushState({}, pathname, window.location.origin + pathname);
//   rootDiv.innerHTML = routes[pathname];
// };

// window.onpopstate = () => {
//   rootDiv.innerHTML = routes[window.location.pathname];
// };

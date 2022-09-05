import { hideElement } from '../../services/hideElement';
import { storage } from '../../shared/storage';
import './header.scss';

export const renderHeader = (): void => {
  const headerBlock = `
        <nav class="navbar navbar-expand-lg mb-5">
        <div class="container">
          <a class="navbar-brand link-direction" href="#/main">
            <img src="./assets/flag-UK.svg" alt="logo" width="75" height="55" />
            <div>RS Lang</div>
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mb-2 mb-lg-0 navbar-links">
              <li class="nav-item mx-3">
                <a
                  class="nav-link fw-bolder fs-5 active main-link link-direction"
                  aria-current="page"
                  href="#/main"
                  >Home</a
                >
              </li>
              <li class="nav-item mx-3">
                <a class="nav-link fw-bolder fs-5 link-direction" href="#/book"
                  >Book</a
                >
              </li>
              <li class="nav-item mx-3">
                <a class="nav-link fw-bolder fs-5 link-direction" href="#/games"
                >Games</a>
              </li>
              <li class="nav-item mx-3" ${hideElement(storage.isLogin)}>
                <a class="nav-link fw-bolder fs-5 link-direction" href="#/statistic"
                >Statistics</a>
              </li>
            </ul>
            <ul class="navbar-nav mb-2 mb-lg-0 navbar-btn-group">
              <li class="nav-item">
                <button type="button" id="logout-btn" class="btn btn-warning nav-btn hidden-element">Log out</button>
              </li>
              <li class="nav-item">
                <button type="button" id="login-btn" class="btn nav-btn"
                data-bs-toggle="modal" data-bs-target="#login-modal">Log in</button>
              </li>
               <li class="nav-item">
                <button type="button" id="register-btn" class="btn btn-warning nav-btn"
                data-bs-toggle="modal" data-bs-target="#register-modal">Register</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
`;
  const header = document.getElementById('header') as HTMLElement;
  header.innerHTML = headerBlock;
};

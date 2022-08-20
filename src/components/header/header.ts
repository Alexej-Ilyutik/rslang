import './header.scss';

export const renderHeader = (): void => {
  const headerBlock = `
        <nav class="navbar navbar-expand-lg mb-5">
        <div class="container">
          <a class="navbar-brand" href="#/main">
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
                  class="nav-link fw-bolder fs-5 active main-link"
                  aria-current="page"
                  href="#/main"
                  >Главная</a
                >
              </li>
              <li class="nav-item mx-3">
                <a class="nav-link fw-bolder fs-5" href="#/book"
                  >Учебник</a
                >
              </li>
              <li class="nav-item mx-3">
                <a class="nav-link fw-bolder fs-5" href="#/games"
                >Игры</a>
              </li>
              <li class="nav-item mx-3">
                <a class="nav-link fw-bolder fs-5" href="#/statistic"
                >Статистика</a>
              </li>
              <li class="nav-item mx-3">
                <a class="nav-link fw-bolder fs-5" href="#/command"
                >Команда</a>
              </li>
            </ul>
            <ul class="navbar-nav mb-2 mb-lg-0 navbar-btn-group">
              <li class="nav-item">
                <button type="button" class="btn nav-btn">Log in</button>
              </li>
               <li class="nav-item">
                <button type="button" class="btn btn-warning nav-btn">Register</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
`;
  const header = document.getElementById('header') as HTMLElement;
  header.innerHTML = headerBlock;
};

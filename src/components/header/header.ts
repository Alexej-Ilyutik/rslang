import './header.scss';

export const renderHeader = (): void => {
  const headerBlock = `
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
          <a class="navbar-brand" href="#">
            <img src="./assets/united-kingdom.svg" alt="logo" width="75" height="65" />
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
                  class="nav-link fw-bolder fs-5 active"
                  aria-current="page"
                  href="#"
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
                <button type="button" class="btn btn-primary">Log in</button>
              </li>
               <li class="nav-item">
                <button type="button" class="btn btn-secondary">Register</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
`;
  const header = document.getElementById('header') as HTMLElement;
  header.innerHTML = headerBlock;
};

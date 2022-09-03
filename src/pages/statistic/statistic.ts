import "./statistic.scss";
import API from "../../services/api";

export const renderStatistic = (): void => {
  const statistic = `
  <div class="statistic">
  <div class="statistic__wrapper container">
    <h2>Statistic</h2>
    <div class="statistic__content container">
      <div class="daily container mb-5">
        <h3>Today</h3>
        <div class="daily__content d-flex">
          <div class="card words">
            <div class="card-body d-flex words__body">
              <h3 class="card-title words__title" id="daily-accuracy">100%</h3>
              <div class="words__text">
                <h3 class="mb-0">accuracy</h3>
                <span class="card-text">were achieved</span>
              </div>
            </div>
          </div>
          <div class="card words">
            <div class="card-body d-flex words__body">
              <h3 class="card-title words__title" id="daily-new-words">1000</h3>
              <div class="words__text">
                <h3 class="mb-0">words</h3>
                <span class="card-text">were new</span>
              </div>
            </div>
          </div>
          <div class="card words">
            <div class="card-body d-flex words__body">
              <h3 class="card-title words__title" id="daily-learned-words">1000</h3>
              <div class="words__text">
                <h3 class="mb-0">words</h3>
                <span class="card-text">were learned</span>
              </div>
            </div>
          </div>

          <div class="card game">
            <div class="card-body d-flex game__body">
              <h3 class="card-title game__blue-title">Sprint</h3>
              <div class="game__content">
                <div class="game__text">
                  <span>0</span>
                  <span>words</span>
                </div>
                <div class="game__text">
                  <span>0%</span>
                  <span>accuracy</span>
                </div>
                <div class="game__text">
                  <span>0</span>
                  <span>best streak</span>
                </div>
              </div>
            </div>
          </div>

          <div class="card game">
            <div class="card-body d-flex game__body">
              <h3 class="card-title game__red-title">Audio challenge</h3>
              <div class="game__content">
                <div class="game__text">
                  <span>0</span>
                  <span>words</span>
                </div>
                <div class="game__text">
                  <span>0%</span>
                  <span>accuracy</span>
                </div>
                <div class="game__text">
                  <span>0</span>
                  <span>best streak</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div class="all-time">
        <h3>All time</h3>
        <div class="d-flex">
          <h1>Graph</h1>
          <h1>Graph</h1>
        </div>
      </div>
    </div>
  </div>
</div>
`;


  const main = document.getElementById('main') as HTMLElement;
  main.innerHTML = statistic;
}

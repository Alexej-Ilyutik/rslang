import './gamePageContainer.scss';

export const renderGamePageContainer = (): void => {
  const mainBlock = `
    <div class="audiocall container">
      <div class="audiocall__container row">
        <aside class="audiocall__settings settings col-3">
          <h4 class="audiocall__title mb-4">Select the Level:</h4>
          <div class="settings__btns mb-5">
            <input type="radio" class="btn-check setting__level" name="level" data-level="0" id="A1" autocomplete="off">
            <label class="btn btn-info" for="A1">A1</label>

            <input type="radio" class="btn-check setting__level" name="level" data-level="1" id="A2" autocomplete="off">
            <label class="btn btn-info" for="A2">A2</label>

            <input type="radio" class="btn-check setting__level" name="level" data-level="2" id="B1" autocomplete="off">
            <label class="btn btn-info" for="B1">B1</label>

            <input type="radio" class="btn-check setting__level" name="level" data-level="3" id="B2" autocomplete="off">
            <label class="btn btn-info" for="B2">B2</label>

            <input type="radio" class="btn-check setting__level" name="level" data-level="4" id="C1" autocomplete="off">
            <label class="btn btn-info" for="C1">C1</label>

            <input type="radio" class="btn-check setting__level" name="level" data-level="5" id="C2" autocomplete="off">
            <label class="btn btn-info" for="C2">C2</label>
          </div>
          <button type="button" class="btn btn-success settings__start">Start</button>

        </aside>
        <div class="audiocall__content col-9">
        </div>
      </div>
    </div>
`;
  const main = document.getElementById('main') as HTMLElement;
  main.innerHTML = mainBlock;
};

import './gamePageContainer.scss';

export const renderGamePageContainer = (): void => {
  const mainBlock = `
    <div class="audiocall container">
      <div class="audiocall__container row">
        <aside class="audiocall__settings settings col-3">
          <h4 class="audiocall__title mb-4">Select the Level:</h4>
          <div class="settings__btns mb-5">
            <input type="radio" class="btn-check" name="options" id="option1" autocomplete="off" checked>
            <label class="btn btn-info" for="option1">A1</label>

            <input type="radio" class="btn-check" name="options" id="option2" autocomplete="off">
            <label class="btn btn-info" for="option2">A2</label>

            <input type="radio" class="btn-check" name="options" id="option3" autocomplete="off">
            <label class="btn btn-info" for="option3">B1</label>

            <input type="radio" class="btn-check" name="options" id="option4" autocomplete="off">
            <label class="btn btn-info" for="option4">B2</label>

            <input type="radio" class="btn-check" name="options" id="option5" autocomplete="off">
            <label class="btn btn-info" for="option5">C1</label>

            <input type="radio" class="btn-check" name="options" id="option6" autocomplete="off">
            <label class="btn btn-info" for="option6">C2</label>
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

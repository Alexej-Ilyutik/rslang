import './wordPuzzle.scss';

let level = 0;
let progress = 0;

async function renderContentWordPuzzlePage(
  block: HTMLElement,
): Promise<void> {
  const mainBlock = `
    <h3 class="audiocall__subtitle">Game: Word Puzzle</h3>

  `;
  block.innerHTML = mainBlock;
}

export const renderWordPuzzlePage = async (): Promise<void> => {
  const gameContainer = document.querySelector('.audiocall__container') as HTMLElement;
  const audioContent = document.querySelector('.audiocall__content') as HTMLElement;
  const mainBlock = `
    <h3 class="audiocall__subtitle">Game: Word Puzzle</h3>
    <img class="audiocall__img" src="../../assets/word-puzzle.png" alt="audio" alt="Image Title" />
  `;
  audioContent.innerHTML = mainBlock;
  gameContainer.addEventListener('click', async e => {
    const target = <HTMLButtonElement>e.target;
    const inputs = Array.from(document.getElementsByClassName('setting__level'));

    if (target.classList.contains('setting__level')) {
      level = Number(target.getAttribute('data-level'));
    }
    if (target.classList.contains('settings__start')) {
      progress = 0;
      console.log('dffg');

      renderContentWordPuzzlePage(audioContent);
      target.disabled = true;

      for (let i = 0; i < inputs.length; i += 1) {
        (<HTMLInputElement>inputs[i]).disabled = true;
      }
    }
    if (target.classList.contains('result__btn-play')) {
      level = 0;
      // renderGamePageContainer();
      renderWordPuzzlePage();
    }
  });
};

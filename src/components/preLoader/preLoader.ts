import './preLoader.scss';

export const renderPreLoader = (block: HTMLElement): void => {
  const spinner = document.createElement('div');
  spinner.className = 'spinner-container';
  spinner.id = 'spinner';
  spinner.innerHTML = `
      <div class="spinner-border text-warning" role="status">
        <span class="sr-only">Loading...</span>
      </div>
  `;
  block.appendChild(spinner);
};

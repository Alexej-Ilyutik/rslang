import './renderProgressBar.scss';

export const renderProgressBar = (progress: number): string => {
  const mainBlock = `
      <h4>Progress:</h4>
      <div class="progress progressbar__line">
        <div class="progress-bar" role="progressbar" style="width: ${`${progress}`}%;" aria-valuenow="25"
        aria-valuemin="0" aria-valuemax="100">${`${progress}`}%</div>
      </div>
  `;

  return mainBlock;
};

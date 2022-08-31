import './preLoader.scss';

export const renderPreLoader = (): void => {
  const mainBlock = `
    <div id = "preloader" class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Загрузка...</span>
    </div>
`;
  const main = document.getElementById('main') as HTMLElement;
  main.innerHTML = mainBlock;
};

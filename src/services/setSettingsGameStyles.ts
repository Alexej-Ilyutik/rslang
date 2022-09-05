export const setSettingsGameStyles = () => {
  const settingsContainer = <HTMLElement>document.querySelector('.audiocall__settings');
  const startBtn = <HTMLButtonElement>settingsContainer.lastElementChild;
  const settingsContainerChildren = settingsContainer.children as HTMLCollectionOf<HTMLElement>;
  const inputArr = settingsContainer.getElementsByTagName('INPUT') as HTMLCollectionOf<HTMLInputElement>;

  [...settingsContainerChildren].forEach(x => {
    x.style.filter = 'blur(4px)';
  });
  [...inputArr, startBtn].forEach(x => {
    x.disabled = true;
  });
};

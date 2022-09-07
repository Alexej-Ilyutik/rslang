export const textBlinker = (elem: HTMLElement) => {
  elem.classList.add('blinker');
  setTimeout(() => {
    elem.classList.remove('blinker');
  }, 1000);
};

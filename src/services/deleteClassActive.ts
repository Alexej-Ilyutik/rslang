export const deleteClassActive = (arr: Element[]): void => {
  arr.forEach(el => {
    el.classList.remove('active');
  });
};

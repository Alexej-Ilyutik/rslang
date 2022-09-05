export const setAttrDisabled = (arr: Element[]): void => {
  arr.forEach(el => {
    el.setAttribute('disabled', 'disabled');
  });
};

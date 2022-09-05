export const hideElement = (isNotHidden: boolean): string => {
  if (!isNotHidden) {
    return 'hidden';
  }
  return '';
};

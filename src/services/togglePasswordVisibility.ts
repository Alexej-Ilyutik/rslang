export const togglePasswordVisibility = (passwordInput: HTMLInputElement) => {
  const element = passwordInput;
  if (element.type === 'password') {
    element.type = 'text';
  } else {
    element.type = 'password';
  }
};

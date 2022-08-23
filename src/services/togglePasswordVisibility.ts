export const togglePasswordVisibility = (passwordInput: HTMLInputElement) => {
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
  } else {
    passwordInput.type = 'password';
  }
}

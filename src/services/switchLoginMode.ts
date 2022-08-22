export const switchLoginMode = () => {
  const loginBtn = document.getElementById('login-btn') as HTMLButtonElement;
  const logoutBtn = document.getElementById('logout-btn') as HTMLButtonElement;
  const registerBtn = document.getElementById('register-btn') as HTMLButtonElement;

  [loginBtn, registerBtn].forEach(x => x.classList.toggle('hidden-element'));
  logoutBtn.classList.toggle('hidden-element');
}

import { storage } from "../shared/storage";
import { isLogin } from "./isLogin";

export const switchLoginMode = () => {
  const loginBtn = document.getElementById('login-btn') as HTMLButtonElement;
  const logoutBtn = document.getElementById('logout-btn') as HTMLButtonElement;
  const registerBtn = document.getElementById('register-btn') as HTMLButtonElement;

  storage.isLogin = isLogin();
  [loginBtn, registerBtn, logoutBtn].forEach(x => x.classList.toggle('hidden-element'));
}

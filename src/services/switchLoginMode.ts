import { storage } from "../shared/storage";
import { isLogin } from "./isLogin";

export const switchLoginMode = () => {
  const loginBtn = document.getElementById('login-btn') as HTMLButtonElement;
  const logoutBtn = document.getElementById('logout-btn') as HTMLButtonElement;
  const registerBtn = document.getElementById('register-btn') as HTMLButtonElement;
  const statisticBtnHeader = document.querySelector('.statistic-button-header') as HTMLButtonElement;


  storage.isLogin = isLogin();
  [loginBtn, registerBtn, logoutBtn, statisticBtnHeader].forEach(x => x.classList.toggle('hidden-element'));
}

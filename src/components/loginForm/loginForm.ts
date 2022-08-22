import './loginForm.scss';
import API from "../../services/api";
import * as bootstrap from 'bootstrap';
import { togglePasswordVisibility } from '../../services/togglePasswordVisibility';
//TODO remove camelCase in id-selectors

export const loginForm = `
  <div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="loginModalLabel">Sing in</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form id="loginForm">
            <div class="form-floating mb-3">
              <input type="email" class="form-control" id="loginEmailInput" required="required" placeholder="name@example.com">
              <label for="loginEmailInput">Email address</label>
            </div>
            <div class="form-floating mb-2">
              <input type="password" class="form-control" id="loginPasswordInput" required="required" placeholder="Password">
              <label for="login-password-visibility">Password</label>
            </div>
            <div class="checkbox mb-2">
              <label>
                <input type="checkbox" id="login-password-visibility"> Show password
              </label>
            </div>
            <div class="hidden-element loginForm__error-message mb-1" id="login-error">
            Wrong email or password
            </div>
            <button class="w-100 btn btn-lg btn-warning" type="submit" id="loginBtn">Sign in</button>
          </form>
        </div>
      </div>
    </div>
  </div>`

export const loginHandler = () => {
  const login = document.getElementById('loginForm') as HTMLElement;
  const passwordInput = document.getElementById('loginPasswordInput') as HTMLInputElement;
  const passwordVisibilityCheckbox = document.getElementById('login-password-visibility') as HTMLInputElement;
  const loginBtn = document.getElementById('login-btn') as HTMLButtonElement;
  const logoutBtn = document.getElementById('logout-btn') as HTMLButtonElement;
  const registerBtn = document.getElementById('register-btn') as HTMLButtonElement;
  const loginError = document.getElementById('login-error') as HTMLElement;

  const loginModal = new bootstrap.Modal(document.getElementById('loginModal')!, {});

  passwordVisibilityCheckbox.addEventListener('change', () => togglePasswordVisibility(passwordInput));

  login.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = (<HTMLInputElement>document.getElementById('loginEmailInput')).value;
    const password = (<HTMLInputElement>document.getElementById('loginPasswordInput')).value;

    try {
      await API.loginUser(email, password);
      HTMLFormElement.prototype.reset.call(login);
      loginModal.hide();
      [loginBtn, registerBtn, loginError].forEach(x => x.classList.add('hidden-element'));
      logoutBtn.classList.remove('hidden-element');
    } catch(e) {
      console.error(e);
      loginError.classList.remove('hidden-element');
    }
  });

  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('userAuthenticationData');
    [loginBtn, registerBtn].forEach(x => x.classList.remove('hidden-element'));
    logoutBtn.classList.add('hidden-element');
  });
}

export const checkIsLogin = () => {
  const loginBtn = document.getElementById('login-btn') as HTMLButtonElement;
  const logoutBtn = document.getElementById('logout-btn') as HTMLButtonElement;
  const registerBtn = document.getElementById('register-btn') as HTMLButtonElement;

  if (localStorage.getItem('userAuthenticationData')) {
    [loginBtn, registerBtn].forEach(x => x.classList.add('hidden-element'));
    logoutBtn.classList.remove('hidden-element');
  }
}

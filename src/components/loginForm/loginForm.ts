import './loginForm.scss';
import * as bootstrap from 'bootstrap';
import API from '../../services/api';
import { togglePasswordVisibility } from '../../services/togglePasswordVisibility';
import { switchLoginMode } from '../../services/switchLoginMode';

export const loginForm = `
  <div class="modal fade" id="login-modal" tabindex="-1" aria-labelledby="login-modal-label" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="login-modal-label">Sing in</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form id="login-form">
            <div class="form-floating mb-3">
              <input type="email" class="form-control" id="login-email-input"
              required="required" placeholder="name@example.com">
              <label for="login-email-input">Email address</label>
            </div>
            <div class="form-floating mb-2">
              <input type="password" class="form-control" id="login-password-input"
              required="required" placeholder="Password">
              <label for="login-password-input">Password</label>
            </div>
            <div class="checkbox mb-2">
              <label>
                <input type="checkbox" id="login-password-visibility"> Show password
              </label>
            </div>
            <div class="hidden-element login-form__error-message mb-1" id="login-error">
            Wrong email or password
            </div>
            <button class="w-100 btn btn-lg btn-warning" type="submit" id="loginBtn">Sign in</button>
          </form>
        </div>
      </div>
    </div>
  </div>`;

export const loginHandler = () => {
  const login = <HTMLElement>document.getElementById('login-form');
  const passwordInput = <HTMLInputElement>document.getElementById('login-password-input');
  const passwordVisibilityCheckbox = <HTMLInputElement>document.getElementById('login-password-visibility');
  const logoutBtn = <HTMLButtonElement>document.getElementById('logout-btn');
  const loginError = <HTMLElement>document.getElementById('login-error');

  const loginModal = new bootstrap.Modal(<HTMLElement>document.getElementById('login-modal'), {});

  passwordVisibilityCheckbox.addEventListener('change', () => togglePasswordVisibility(passwordInput));

  login.addEventListener('submit', async event => {
    event.preventDefault();
    const email = (<HTMLInputElement>document.getElementById('login-email-input')).value;
    const password = passwordInput.value;

    try {
      await API.loginUser(email, password);
      HTMLFormElement.prototype.reset.call(login);
      loginModal.hide();
      switchLoginMode();
      loginError.classList.add('hidden-element');
      const locations = <HTMLInputElement>document.querySelector('.link-direction.active');
      if (locations) {
        locations.dispatchEvent(new Event('click', { bubbles: true }));
      }
    } catch (e) {
      console.error(e);
      loginError.classList.remove('hidden-element');
    }
  });

  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('userAuthenticationData');
    switchLoginMode();
    const locations = (<HTMLInputElement>document.querySelector('.link-direction.active'));
    const statisticBtn = document.querySelector('[href="#/statistic"]') as HTMLElement;
    const main = document.querySelector('[href="#/main"]') as HTMLElement;
    if (locations) {
      if (locations === statisticBtn) {
        main.dispatchEvent(new Event('click', {bubbles: true}));
      } else {
        locations.dispatchEvent(new Event('click', {bubbles: true}));
      }
    }
  });

  API.getWord('5e9f5ee35eb9e72bc21af4f5');
};

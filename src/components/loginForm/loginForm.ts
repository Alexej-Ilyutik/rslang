import './loginForm.scss';
import API from "../../services/api";
import * as bootstrap from 'bootstrap';
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
              <input type="email" class="form-control" id="login-email-input" required="required" placeholder="name@example.com">
              <label for="login-email-input">Email address</label>
            </div>
            <div class="form-floating mb-2">
              <input type="password" class="form-control" id="login-password-input" required="required" placeholder="Password">
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
  </div>`

export const loginHandler = () => {
  const login = document.getElementById('login-form') as HTMLElement;
  const passwordInput = document.getElementById('login-password-input') as HTMLInputElement;
  const passwordVisibilityCheckbox = document.getElementById('login-password-visibility') as HTMLInputElement;
  const logoutBtn = document.getElementById('logout-btn') as HTMLButtonElement;
  const loginError = document.getElementById('login-error') as HTMLElement;

  const loginModal = new bootstrap.Modal(document.getElementById('login-modal')!, {});

  passwordVisibilityCheckbox.addEventListener('change', () => togglePasswordVisibility(passwordInput));

  login.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = (<HTMLInputElement>document.getElementById('login-email-input')).value;
    const password = passwordInput.value;

    try {
      await API.loginUser(email, password);
      HTMLFormElement.prototype.reset.call(login);
      loginModal.hide();
      switchLoginMode();
      loginError.classList.add('hidden-element');
    } catch(e) {
      console.error(e);
      loginError.classList.remove('hidden-element');
    }
  });

  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('userAuthenticationData');
    switchLoginMode();
  });
}
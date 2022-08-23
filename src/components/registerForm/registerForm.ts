import * as bootstrap from 'bootstrap';
import API from '../../services/api';
import { togglePasswordVisibility } from '../../services/togglePasswordVisibility';
import { switchLoginMode } from '../../services/switchLoginMode';

export const registerForm = `
  <div class="modal fade" id="register-modal" tabindex="-1" aria-labelledby="register-modal-label" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="register-modal-label">Registration</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form id="register-form" autocomplete="off">
            <div class="form-floating mb-3">
              <input type="text" class="form-control" id="register-name-input"
              required="required" placeholder="Name" pattern=".{2,}" required title="2 characters minimum">
              <label for="register-name-input">Name</label>
            </div>
            <div class="form-floating mb-3">
              <input type="email" class="form-control" id="register-email-input"
              required="required" placeholder="name@example.com">
              <label for="register-email-input">Email address</label>
            </div>
            <div class="form-floating mb-2">
              <input type="password" class="form-control" id="register-password-input"
              required="required" placeholder="Password" pattern=".{8,}"   required title="8 characters minimum">
              <label for="register-password-input">Password</label>
            </div>
            <div class="checkbox mb-2">
              <label>
                <input type="checkbox" id="register-password-visibility"> Show password
              </label>
            </div>
            <div class="hidden-element register-form-message mb-1" id="register-error">
            Wrong email or password
            </div>
            <button class="w-100 btn btn-lg btn-warning" type="submit" id="register-btn">Sign up</button>
          </form>
        </div>
      </div>
    </div>
  </div>`;

export const registerHandler = () => {
  const register = document.getElementById('register-form') as HTMLElement;
  const passwordInput = document.getElementById('register-password-input') as HTMLInputElement;
  const passwordVisibilityCheckbox = document.getElementById('register-password-visibility') as HTMLInputElement;
  const registerError = document.getElementById('register-error') as HTMLElement;

  const registerModal = new bootstrap.Modal(document.getElementById('register-modal')!, {});

  passwordVisibilityCheckbox.addEventListener('change', () => togglePasswordVisibility(passwordInput));

  register.addEventListener('submit', async event => {
    event.preventDefault();
    const name = (<HTMLInputElement>document.getElementById('register-name-input')).value;
    const email = (<HTMLInputElement>document.getElementById('register-email-input')).value;
    const password = (<HTMLInputElement>document.getElementById('register-password-input')).value;

    try {
      await API.createUser(name, email, password);
      await API.loginUser(email, password);
      HTMLFormElement.prototype.reset.call(register);
      registerModal.hide();
      switchLoginMode();
      registerError.classList.add('hidden-element');
    } catch (e) {
      console.error(e);
      registerError.classList.remove('hidden-element');
    }
  });
};

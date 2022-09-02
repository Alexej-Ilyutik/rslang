export const renderSpinner = (): void => {
  const spinner = `
    <div class="d-flex justify-content-center my-auto">
      <div class="spinner-border" role="status" style="width: 5rem; height: 5rem">
      </div>
    </div>`

  const main = document.querySelector('.audiocall__content') as HTMLElement;
  main.innerHTML = spinner;
}

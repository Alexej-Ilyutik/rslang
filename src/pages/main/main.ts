import './main.scss';

export const renderMain = (): void => {
  const mainBlock = `
    <div class="card bg-dark text-white">
      <img src="../../../assets/london.jpg" class="card-img" alt="london">
      <div class="card-img-overlay text-center">
        <h5 class="card-title main-title">Card title</h5>
        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        <p class="card-text">Last updated 3 mins ago</p>
      </div>
    </div>
`;
  const main = document.getElementById('main') as HTMLElement;
  main.innerHTML = mainBlock;
};

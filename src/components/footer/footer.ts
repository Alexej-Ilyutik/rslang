import './footer.scss';

export const renderFooter = (): void => {
  const footerBlock = `
        <div class="container p-4 pb-0">
      <!-- Section: Links -->
      <section class="footer__container">
        <!--Grid row-->
        <div class="row">
          <!-- Grid column -->
          <div class="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
            <a class="footer__brand link-direction" href="#/main">
            <img src="./assets/flag-UK.svg" alt="logo" width="60" height="40" />
            <p>RS Lang</p>
          </a>
            <p class="footer__description">
              Here you can use rows and columns to organize your footer
              content. Lorem ipsum dolor sit amet, consectetur adipisicing
              elit.
            </p>
          </div>
          <!-- Grid column -->

          <hr class="w-100 clearfix d-md-none text-white" />

          <!-- Grid column -->
          <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
            <h6 class="footer__title text-uppercase mb-4 font-weight-bold">Navigation</h6>
            <p>
              <a class="text-white nav-link link-direction" href="#/main">Home</a>
            </p>
            <p>
              <a class="text-white nav-link link-direction" href="#/book">Book</a>
            </p>
            <p>
              <a class="text-white nav-link link-direction" href="#/games">Games</a>
            </p>
            <p>
              <a class="text-white nav-link link-direction" href="#/statistic">Statistics</a>
            </p>
            <p>
              <a class="text-white nav-link link-direction" href="#/command">Team</a>
            </p>

          </div>
          <!-- Grid column -->

          <hr class="w-100 clearfix d-md-none text-white" />

          <!-- Grid column -->
          <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
            <h6 class="footer__title text-uppercase mb-4 font-weight-bold">
              Resources
            </h6>
            <p>
              <a class="text-white footer__resources" href="https://webpack.js.org/" target="_blank">Webpack</a>
            </p>
            <p>
              <a class="text-white footer__resources"
              href="https://www.typescriptlang.org/" target="_blank">Typescript</a>
            </p>
            <p>
              <a class="text-white footer__resources"
              href="https://developer.mozilla.org/ru/docs/Web/JavaScript" target="_blank">JavaScript</a>
            </p>
            <p>
              <a class="text-white footer__resources"  href="https://getbootstrap.com/" target="_blank">Bootstrap</a>
            </p>
            <p>
              <a class="text-white footer__resources"  href="https://github.com/" target="_blank">GitHub</a>
            </p>
          </div>


        </div>
        <!--Grid row-->
      </section>
      <!-- Section: Links -->

      <hr class="my-3 text-white">

      <!-- Section: Copyright -->
      <section class="p-3 pt-0">
        <div class="row d-flex align-items-center">
          <!-- Grid column -->
          <div class="col-md-7 col-lg-8 text-center text-md-start">
            <!-- Copyright -->
            <div class="p-3 text-white">
              © 2022 Copyright: Team 41
            </div>
            <!-- Copyright -->
          </div>
          <!-- Grid column -->

          <!-- Grid column -->
          <div class="col-md-5 col-lg-4 ml-lg-0 text-center text-md-end">
           <a
               href="https://github.com/Alexej-Ilyutik" target="_blank"
               class="btn btn-outline-light btn-floating mx-2 footer__github"
               class="text-white"
               data-title="Alexej"
               role="button"
               ><i class="fa fa-github fa-2x"></i
              ></a>
            <a
              href="https://github.com/NewAnton" target="_blank"
               class="btn btn-outline-light btn-floating mx-2 footer__github"
               class="text-white"
               data-title="Anton"
               role="button"
               ><i class="fa fa-github fa-2x"></i
              ></a>
            <a
              href="https://github.com/EJ252" target="_blank"
               class="btn btn-outline-light btn-floating mx-2 footer__github"
               class="text-white"
               data-title="Vadim"
               role="button"
               ><i class="fa fa-github fa-2x"></i
              ></a>
          </div>
          <!-- Grid column -->
        </div>
      </section>
      <!-- Section: Copyright -->
    </div>
`;
  const footer = document.getElementById('footer') as HTMLElement;
  footer.innerHTML = footerBlock;
};

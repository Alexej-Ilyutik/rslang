import './main.scss';

export const renderMain = (): void => {
  const mainBlock = `
   <div class="container">
    <section class="card bg-dark card__main mb-5">
      <img src="../../../assets/start-img.png" class="card-img" alt="london">
      <div class="card-img-overlay text-left">
        <h1 class="card-title main-title">RS Lang<br>Learning English has never been so easy.</h1>
        <p class="card-text main__text">Memorizing English words can be fun and challenging.
        Play games, listen to pronunciation, improve your knowledge.
        With our app, learning is a joy.</p>
        <p class="card-text card-btn"><a class = "link-direction" href="#/games">
        <button type="button" class="btn btn-warning">Let's start</button></a></p>
      </div>
    </section>
    <section class="card card__advantage">
      <div class="row ">
        <div class="col-md-6 mb-3">
          <img src="../../../assets/advantage.jpg" class="card-img" alt="advantages">
        </div>
        <div class="col-md-6">
          <h3 class="card-title main-title">Textbook</h3>
          <p class="card-text">The electronic textbook consists of six sections.
          Each section has 30 pages of 20 words.</p>
          <h3 class="card-title main-title">Dictionary</h3>
          <p class="card-text">The dictionary contains lists of studied words,
          words that do not need to be learned, as well as those that cause difficulties.
          The dictionary reflects statistics for each section and student progress.</p>
          <h3 class="card-title main-title">Games</h3>
          <p class="card-text">For learning words and reinforcing memorization, the application has 2 games:
          Savannah and Sprint, which will help you to "pump" your vocabulary in a playful way.</p>
          <h3 class="card-title main-title">Statistics</h3>
          <p class="card-text">All the progress of training can be viewed in statistics,
          where data for the current day, as well as for the entire training period, are presented.
          The information is presented both in the form of a table and graphs, which is very convenient.</p>
        </div>
      </div>
    </section>
     <section class="card card__video">
      <div class="row ">
        <div class="col-md-3">
          <h2 class="card-title main-title">Presentation & tutorial</h2>
        </div>
        <div class="col-md-9">
         <div class="ratio ratio-16x9">
            <iframe src="https://www.youtube.com/embed/vlDzYIIOYmM"
                    title="YouTube video"
                    allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
      <section class="team-boxed">
            <div class="intro">
                <h2 class="text-left mb-5">Our team </h2>
            </div>
            <div class="row people">
                <div class="col-md-6 col-lg-4 item">
                    <div class="box"><img class="rounded border border-light" src="../../../assets/Alexej.jpg" alt="ava">
                        <a href="https://alexej-ilyutik.github.io/rsschool-cv/" target="_blank">
                        <h3 class="name">Alexej Ilyutik</h3></a>
                        <p class="title">Frontend developer</p>
                        <p class="description">Did basic project settings, initial layout, router setup.
                        Designed the main page of the application.
                        Created the game "Audio Challenge".</p>
                        <div class="social">
                        <a href="https://www.linkedin.com/in/alexej-ilyutik/" target="_blank">
                        <i class="fab fa-linkedin-in"></i></a>
                        <a href="https://github.com/Alexej-Ilyutik" target="_blank">
                        <i class="fa fa-github fa-x"></i></a>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-lg-4 item">
                    <div class="box"><img class="rounded border border-light" src="../../../assets/Anton.jpg" alt="ava">
                        <a href="https://github.com/NewAnton/rsschool-cv/blob/main/cv.md" target="_blank">
                        <h3 class="name">Anton Korobov</h3></a>
                        <p class="title">Frontend developer</p>
                        <p class="description">Created application design. Developed the TextBook page.
                        Helped to think over the logic of the application.</p>
                        <div class="social">
                        <a href="http://www.linkedin.com/in/%D0%B0%D0%BD%D1%82%D0%BE%D0%BD-%D0%BA%D0%BE%D1%80%D0%BE%D0%B1%D0%BE%D0%B2-a2a619221"
                        target="_blank">
                        <i class="fab fa-linkedin-in"></i></a>
                        <a href="https://github.com/NewAnton" target="_blank">
                        <i class="fa fa-github fa-x"></i></a>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-lg-4 item">
                    <div class="box"><img class="rounded border border-light" src="../../../assets/vadzim.jpg" alt="ava">
                        <a href="https://ej252.github.io/rsschool-cv/" target="_blank">
                        <h3 class="name">Vadzim Embala</h3></a>
                        <p class="title">Frontend developer</p>
                        <p class="description">Created the game "Sprint". Created a registration form.
                        Set up the backend.</p>
                        <div class="social">
                        <a href="https://www.linkedin.com/in/vadzim-embala-65021b200/" target="_blank">
                        <i class="fab fa-linkedin-in"></i></a>
                        <a href="https://github.com/EJ252" target="_blank">
                        <i class="fa fa-github fa-x"></i></a>
                        </div>
                    </div>
                </div>
            </div>
    </section>

   </div>
`;
  const main = document.getElementById('main') as HTMLElement;
  main.innerHTML = mainBlock;
};

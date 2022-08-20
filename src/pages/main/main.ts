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
        <p class="card-text card-btn"><button type="button" class="btn btn-warning">Let's start</button></p>
      </div>
    </section>
    <section class="card card__advantage">
      <div class="row ">
        <div class="col-md-6 mb-3">
          <img src="../../../assets/advantage.png" class="card-img" alt="advantages">
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

   </div>
`;
  const main = document.getElementById('main') as HTMLElement;
  main.innerHTML = mainBlock;
};

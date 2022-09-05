import './game.scss';
import { storage } from '../../shared/storage';

export const renderGamePage = (): void => {
  const mainBlock = `
   <section class="light">
	<div class="container py-2">
		<article class="postcard light blue">
				<img class="postcard__img" src="../../assets/sprint.png" alt="sprint" />
			<div class="postcard__text t-dark">
				<h2 class="postcard__title blue"><a class="link-direction" href="#/sprint">Sprint</a></h2>
				<div class="postcard__bar"></div>
				<div class="postcard__preview-txt">Check how much points you can get in one minute,
        making educated guesses about what is right and what is wrong.</div>
				<a href="#/sprint" class="game__btn btn btn-warning link-direction" role="button">Play game</a>
			</div>
		</article>
		<article class="postcard light red">

				<img class="postcard__img" src="../../assets/audio-img.png" alt="audio" alt="Image Title" />

			<div class="postcard__text t-dark">
				<h2 class="postcard__title red"><a class = "link-direction" href="#/audio">Audio challenge</a></h2>
				<div class="postcard__bar"></div>
				<div class="postcard__preview-txt">Check your listening skills,
        trying to pick the right meaning after hearing a word. Be careful, as you just have one guess.</div>
				<a href="#/audio" class="game__btn btn btn-warning link-direction" role="button">Play game</a>
			</div>
		</article>
		<article class="postcard light green">

				<img class="postcard__img" src="../../assets/word-puzzle.png" alt="Image Title" />

			<div class="postcard__text t-dark">
				<h2 class="postcard__title green"><a class = "link-direction" href="#/wordPuzzle">Word puzzle</a></h2>
				<div class="postcard__bar"></div>
				<div class="postcard__preview-txt">Collect a word from letters. Be careful, you only have 5 lives!</div>
				<a href="#/wordPuzzle" class="game__btn btn btn-warning link-direction" role="button">Play game</a>
			</div>
		</article>
	</div>
</section>
`;
  const main = document.getElementById('main') as HTMLElement;
  main.innerHTML = mainBlock;
  storage.currentPage = 'Game';
};

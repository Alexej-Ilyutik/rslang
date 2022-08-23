import './game.scss';

export const renderGamePage = (): void => {
  const mainBlock = `
   <section class="light">
	<div class="container py-2">
		<article class="postcard light blue">
				<img class="postcard__img" src="../../assets/sprint.png" alt="sprint" />
			<div class="postcard__text t-dark">
				<h2 class="postcard__title blue"><a class="game__link" href="#/sprint">Sprint</a></h2>
				<div class="postcard__bar"></div>
				<div class="postcard__preview-txt">Check how much points you can get in one minute,
        making educated guesses about what is right and what is wrong.</div>
				<a href="#/sprint" class="game__btn btn btn-warning game__link" role="button">Play game</a>
			</div>
		</article>
		<article class="postcard light red">

				<img class="postcard__img" src="../../assets/audio-img.png" alt="audio" alt="Image Title" />

			<div class="postcard__text t-dark">
				<h2 class="postcard__title red"><a class="game__link" href="#/audio">Audio challenge</a></h2>
				<div class="postcard__bar"></div>
				<div class="postcard__preview-txt">Check your listening skills,
        trying to pick the right meaning after hearing a word. Be careful, as you just have one guess.</div>
				<a href="#/audio" class="game__btn btn btn-warning game__link" role="button">Play game</a>
			</div>
		</article>
		<article class="postcard light green">
			<a class="postcard__img_link " href="#">
				<img class="postcard__img" src="../../assets/london.jpg" alt="Image Title" />
			</a>
			<div class="postcard__text t-dark">
				<h2 class="postcard__title green"><a class="game__link" href="#">Other games</a></h2>
				<div class="postcard__bar"></div>
				<div class="postcard__preview-txt">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, fugiat asperiores inventore beatae accusamus odit minima enim, commodi quia, doloribus eius! Ducimus nemo accusantium maiores velit corrupti tempora reiciendis molestiae repellat vero. Eveniet ipsam adipisci illo iusto quibusdam, sunt neque nulla unde ipsum dolores nobis enim quidem excepturi, illum quos!</div>
				<a href="#/audio" class="game__btn btn btn-warning" role="button">Play game</a>
			</div>
		</article>
		<article class="postcard light yellow">
			<a class="postcard__img_link" href="#">
				<img class="postcard__img" src="../../assets/london.jpg" alt="Image Title" />
			</a>
			<div class="postcard__text t-dark">
				<h2 class="postcard__title yellow"><a class="game__link" href="#">Other games</a></h2>

				<div class="postcard__bar"></div>
				<div class="postcard__preview-txt">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, fugiat asperiores inventore beatae accusamus odit minima enim, commodi quia, doloribus eius! Ducimus nemo accusantium maiores velit corrupti tempora reiciendis molestiae repellat vero. Eveniet ipsam adipisci illo iusto quibusdam, sunt neque nulla unde ipsum dolores nobis enim quidem excepturi, illum quos!</div>
			<a href="#/audio" class="game__btn btn btn-warning" role="button">Play game</a>
			</div>
		</article>
	</div>
</section>
`;
  const main = document.getElementById('main') as HTMLElement;
  main.innerHTML = mainBlock;
};

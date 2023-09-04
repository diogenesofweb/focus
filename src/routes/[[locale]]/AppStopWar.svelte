<a
	lang="en"
	href="https://war.ukraine.ua/support-ukraine/"
	title="STAND WITH UKRAINE"
>
	ua
</a>

<style>
	a {
		line-height: 1;
		/* height: 2rem; */
		text-decoration: none;
		--blue: #0158b5;
		--yellow: #f6ce00;

		display: grid;
		place-items: center;
		color: var(--yellow);
		background: linear-gradient(to bottom, var(--blue) 50%, var(--yellow) 50%);
		color: transparent !important;
	}

	@media (hover: hover) {
		a {
			position: fixed;
			z-index: 2;
			bottom: 0;
			left: 0;
			width: 6em;
			height: 3em;

			transform: rotate(45deg) translate(-1em, 2em);

			background: linear-gradient(
				to bottom,
				var(--blue) 33%,
				var(--yellow) 33%,
				var(--yellow) 66%,
				transparent 66%
			);
		}
	}
</style>

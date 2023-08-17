<script>
	const timers = [
		['/pomodoro', 'Pomodoro timer', 'alpha'],
		['/countdown', 'Countdown timer', 'beta'],
		['/stopwatch', 'Stopwatch timer', 'gamma']
	];
</script>

<article>
	<h1 class="f-serif">Beautiful and easy to use timers</h1>

	<ul>
		{#each timers as el}
			<li class={el[2]}>
				<a class="btn outlined" href={el[0]}>
					<span>
						{el[1]}
					</span>
				</a>
			</li>
		{/each}
	</ul>
</article>

<style>
	article {
		padding-inline: 1rem;
	}

	h1 {
		text-align: center;
		text-wrap: balance;
		margin-top: max(4rem, 10vh);
		font-size: clamp(1.5rem, 8vw, 3rem);
		color: var(--fg);
	}

	ul {
		max-width: 30rem;
		margin-inline: auto;
		margin-block: max(3rem, 6vh);

		font-size: 2rem;
		display: flex;
		flex-direction: column;
		gap: 2rem;

		/* background: black; */
	}
	li {
		display: grid;
		/* background: darkred; */
	}
	a {
		padding-block: 2rem;
		padding-inline: 2rem;
		border-radius: 22rem;
		font-weight: 900;
	}

	a:not(:hover):not(:focus-visible) {
		background: var(--__bga1);
		/* background: var(--bga); */
		backdrop-filter: blur(3px);
		border-color: transparent;
		color: var(--__fg);
	}
</style>

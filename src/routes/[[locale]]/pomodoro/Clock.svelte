<script>
	/** @type {number | string} */
	export let MM;
	/** @type {number | string} */
	export let SS;

	export let is_running = false;
	export let is_overtime = false;
</script>

<time class="font-x" class:is_running class:is_overtime>
	<span>{MM}</span>
	<span class="x">:</span>
	<span>{SS}</span>
</time>

<style>
	time {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		--g: 3px;
		gap: var(--g);

		letter-spacing: var(--g);
		font-variant-numeric: tabular-nums;
		/* font-size: clamp(4.5rem, 22vw, 7rem); */
		/* font-size: clamp(6rem, 33vw, 10rem); */
		font-size: clamp(6em, 33vw, 12em);
		line-height: 1;

		color: var(--__fg0);

		padding-bottom: 2rem;
		/* margin-block: 3rem 1rem; */
		/* background-color: black; */
	}

	time.is_overtime {
		color: var(--fg-danger);
	}

	time:not(.is_running) {
		opacity: 0.7;
	}

	/* time.is_running > span { */
	/* 	text-shadow: 0.02em 0.04em 0.02em var(--__bg); */
	/* } */

	time > :first-child {
		text-align: right;
	}

	.x {
		transform: translateY(-9px);
	}
</style>

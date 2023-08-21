<script>
	/** @type {number | string} */
	export let MM;
	/** @type {number | string} */
	export let SS;

	export let is_running = false;
</script>

<time class="timer font-x" class:is_running>
	<span>{MM}</span>
	<span class="x">:</span>
	<span>{SS}</span>
</time>

<style>
	.timer {
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

		&.is_running > span {
			text-shadow: 0.02em 0.04em 0.02em var(--__bg);
		}
	}

	.timer > :first-child {
		text-align: right;
	}

	.x {
		transform: translateY(-9px);
	}
</style>

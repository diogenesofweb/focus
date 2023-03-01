<script>
	/** @type {number | string} */
	export let MM;
	/** @type {number | string} */
	export let SS;
</script>

<div class="timer font-x">
	<span>{MM}</span>
	<span class="x">:</span>
	<span>{SS}</span>
</div>

<style>
	.timer {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		--g: 3px;
		gap: var(--g);

		letter-spacing: var(--g);
		font-variant-numeric: tabular-nums;
		/* font-size: clamp(4.5rem, 22vw, 7rem); */
		font-size: clamp(6rem, 33vw, 10rem);

		color: var(--__fg-1);

		margin-block: 1.5rem 0.5rem;
		/* background-color: black; */
	}

	.timer > :first-child {
		text-align: right;
	}

	.x {
		transform: translateY(-9px);
	}

	span {
		text-shadow: 3px 6px 3px var(--__bg-1);
	}
</style>

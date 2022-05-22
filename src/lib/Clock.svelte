<script>
	export let MM;
	export let SS;
</script>

<div class="fce">
	<div class="timer">
		<span>{MM}</span>
		<span>:</span>
		<span>{SS}</span>
	</div>
</div>

<style>
	.timer {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		gap: 9px;

		font-weight: bold;
		font-size: clamp(4.5rem, 22vw, 7rem);

		color: var(--__fg);

		padding: 1.5rem var(--rsx);
		min-width: 6ch;
	}

	.timer > :first-child {
		text-align: right;
	}
</style>

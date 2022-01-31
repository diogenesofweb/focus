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

		font-family: 'Audiowide', cursive;
		font-size: clamp(3.5rem, 12vw, 5rem);

		color: var(--tone);

		padding: 1.5rem var(--rsx);
		min-width: 6ch;
	}

	.timer > :first-child {
		text-align: right;
	}
</style>

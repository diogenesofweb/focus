<script>
	import Logo from './Logo.svelte';
</script>

<div class="alpha">
	<span>
		<Logo />
	</span>
	<b>TimerOne</b>
</div>

<style>
	div {
		line-height: 1;
		/* font-size: 1.5rem; */
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.5em;
		padding: 0.5em;
		border-radius: 0.5em;

		color: var(--__fg2);
		background: var(--bga1);
	}

	b {
		font-size: 1.15rem;
	}

	@media (hover: hover) {
		div:hover {
			color: var(--fg-beta);
		}

		div:hover > span {
			transform: rotate(90deg);
		}
	}
</style>

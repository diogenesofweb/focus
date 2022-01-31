<script>
	import { Btn, Icon } from '@kazkadien/svelte';
</script>

<div class="close-btn">
	<Btn colored accent="danger" pointy icony on:click>
		<Icon name="close" />
	</Btn>
</div>

<style>
	.close-btn {
		position: absolute;
		right: 0ch;
		top: -3.5rem;
		background-color: hsla(0, 0%, 50%, 20%);
		background-color: var(--bg);
		border: var(--border);
		border-radius: var(--br-s);
	}

	/* @media only screen and (min-width: 600px) { */
	/* 	.close-btn { */
	/* 		display: none; */
	/* 	} */
	/* } */
</style>

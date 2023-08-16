<script>
	import { goto } from '$app/navigation';
	import RunTimer from '../../RunTimer.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	const t = { hh: 0, mm: data.minutes, ss: 0 };

	function handle_close() {
		// console.log('close');
		goto('/countdown');
	}
	const title = `${data.minutes} minute timer`;
</script>

<svelte:head>
	<title>{title}</title>
	<meta
		name="description"
		content="Run a {data.minutes} munute countdown timer in one click."
	/>
</svelte:head>

<div class="wrap container">
	<article>
		<!-- pass title!-->
		<RunTimer {title} {t} autostart={false} on:close={handle_close} />

		<h1>Pre-set {data.minutes} minute countdown timer.</h1>
	</article>
</div>

<style>
	h1 {
		margin-top: 3rem;
		text-align: center;
	}
</style>

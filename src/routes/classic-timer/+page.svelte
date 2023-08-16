<script>
	import SetupTimer from './SetupTimer.svelte';
	import RunTimer from './RunTimer.svelte';

	let is_set = false;
	// let t = { min: 0, sec: 0 };
	let t = { hh: 0, mm: 0, ss: 0 };

	function handle_start(ev) {
		t = ev.detail;
		// console.log(t);
		is_set = true;
	}

	function handle_close() {
		is_set = false;
	}
</script>

<svelte:head>
	<title>Classic Timer Online | Delhpic</title>
	<meta
		name="description"
		content="Easy to use, mobile friendly, accurate, beautiful, minimalist online timer"
	/>
</svelte:head>

<article class="container">
	<div>
		{#if is_set}
			<RunTimer {t} on:close={handle_close} />
		{:else}
			<SetupTimer on:start={handle_start} />
		{/if}
	</div>

	<section>
		<h1>Online Classic Timer</h1>
		<p>
			Easy to use, mobile friendly, accurate, beautiful, minimalist online timer
		</p>
	</section>
</article>

<style>
	div {
		min-height: calc(100vh - 10rem);
		/* background: black; */
	}
	article {
		padding-inline: 1rem;
	}
	section {
		text-align: center;
		margin-bottom: 2rem;
	}
</style>

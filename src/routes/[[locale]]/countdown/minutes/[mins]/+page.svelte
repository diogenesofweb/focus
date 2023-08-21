<script>
	import { goto } from '$app/navigation';
	import RunTimer from '../../RunTimer.svelte';
	import { getContext } from 'svelte';
	/** @type {import('$lib/types').Localize } */
	const l = getContext('ttt');
	const th = l.t.r.c_preset.head;
	const tb = l.t.r.c_preset.body;

	/** @type {import('./$types').PageData} */
	export let data;

	// const t = { hh: 0, mm: data.minutes, ss: 0 };
	const t = { hh: 0, mm: 0, ss: 0 };

	if (data.minutes >= 60) {
		t.hh = Math.floor(data.minutes / 60);
		t.mm = data.minutes % 60;
	} else {
		t.mm = data.minutes;
	}

	function handle_close() {
		// console.log('close');
		goto('/countdown');
	}
	const title = th.title(data.minutes);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={th.desc(data.minutes)} />
</svelte:head>

<div class="wrap container">
	<article>
		<!-- pass title!-->
		<RunTimer {title} {t} autostart={false} on:close={handle_close} />

		<h1>{tb.h1(data.minutes)}</h1>
		<p class="tac">
			{tb.d1} <a href="{l.r.prefix}/countdown/minutes">{tb.d2}</a>.
		</p>
	</article>
</div>

<style>
	h1 {
		margin-top: 3rem;
		text-align: center;
	}
</style>

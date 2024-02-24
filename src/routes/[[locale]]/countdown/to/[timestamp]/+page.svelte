<script>
	import RunTimer from '../../RunTimer.svelte';
	import { getContext } from 'svelte';
	/** @type {import('$lib/types').Localize } */
	const l = getContext('ttt');

	/** @type {import('./$types').PageData} */
	export let data;
	// console.log(data);

	let autostart = false;
	let t = { hh: 0, mm: 0, ss: 0 };
	let days = 0;

	let heading = '';

	(() => {
		try {
			const to_date = new Date(data.ms);
			// console.log(to_date);
			const is_invalid_date = isNaN(to_date.getTime());
			// console.log({ is_invalid_date });
			if (is_invalid_date) {
				heading = 'Invalid Date';
				// throw new Error('Invalid Date');
				return;
			}

			const now = new Date().getTime();
			if (now >= data.ms) {
				heading = l.t.time.expired;
				return;
			}
			heading = l.t.time.until + ' ' + to_date.toLocaleString(l.r.lang, {});
			// heading = l.t.time.until + ' ' + to_date.toLocaleString();

			const diff = data.ms - now;
			// console.log({ diff });

			// const dd = new Date(diff);
			// console.log(dd);

			const c = {
				ss: 1000 * 60,
				hh: 1000 * 60 * 60,
				dd: 1000 * 60 * 60 * 24
			};
			days = Math.floor(diff / c.dd);
			t.hh = Math.floor((diff % c.dd) / c.hh);
			t.mm = Math.floor((diff % c.hh) / c.ss);
			t.ss = Math.floor((diff % c.ss) / 1000);
			// console.log({ days, t });
			autostart = true;
		} catch (error) {
			console.error(error);
		}
	})();

	function handle_close() {
		console.log('close');
	}
</script>

<svelte:head>
	<title>{heading}</title>
	<meta name="description" content={heading} />
</svelte:head>

<article class="container">
	<!-- <h1>{heading}</h1> -->
	<RunTimer
		{days}
		{heading}
		{t}
		{autostart}
		with_label={true}
		show_init_nums={false}
		with_controls={false}
		on:close={handle_close}
	/>
</article>

<!-- <style> -->
<!-- </style> -->

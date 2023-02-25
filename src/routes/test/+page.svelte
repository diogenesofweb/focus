<script>
	import { ldb } from '$lib/db';

	// your script goes here

	const d = new Date('2023-01-25');
	const dd = d.getDay();
	const str = d.toLocaleDateString('fr-CA');
	// const str = d.toLocaleDateString('fr-CA', { month: 'numeric' });
	console.log(str);
	console.log(
		new Date('2023-02-11').toLocaleDateString(undefined, { month: '2-digit' })
	);

	// ldb.records.list().then((v) => console.log(v));
	ldb.records.listByMonth('01').then((v) => console.log(v));
</script>

<section>test</section>
<p>{new Intl.RelativeTimeFormat().format(160, 'minutes')}</p>
<button
	on:click={() => {
		const dd = '2023-01-12';
		const locales = 'fr-CA';
		const today = new Date(dd);

		ldb.records.upsertOne({
			date: dd,
			// date: {
			// 	day: today.toLocaleDateString(locales, { day: 'numeric' }),
			// 	month: today.toLocaleDateString(locales, { month: 'numeric' }),
			// 	year: today.toLocaleDateString(locales, { year: 'numeric' })
			// },
			focus: { total: 33, tasks: { first: 1 } },
			break: { total: 20, activities: { run: 1 } }
		});
	}}>clicl</button
>

<button
	on:click={() => {
		ldb.records.list().then((v) => {
			console.log(v);
		});
	}}>list</button
>

<style>
	/* your styles go here */
</style>

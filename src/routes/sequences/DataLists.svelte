<script>
	import { ldb } from '$lib/db';
	/** @type {Set<string>} */
	let res = new Set();

	ldb.activities.list().then((v) => {
		// console.log(v);
		v.forEach((e) => e.values.forEach((x) => res.add(x)));
		res = res;
		// console.log(res);
	});
</script>

<datalist id="my-breaks">
	{#each [...res] as el}
		<option value={el} />
	{/each}
</datalist>

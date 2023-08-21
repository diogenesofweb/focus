<script>
	import { ch } from '$lib/utils';
	import { getContext } from 'svelte';
	/** @type {import('$lib/types').Localize } */
	const l = getContext('ttt');
	const locale = l.r.lang;

	const m2hm = (/** @type {number} */ mins) => {
		let h = Math.floor(mins / 60);
		let m = mins % 60;
		// return h ? `${h}h ${m}m` : `${m}m`;
		return h ? `${ch(h)}:${ch(m)}` : `00:${ch(m)}`;
	};

	/** @type {import("$lib/types").IStat[]} */
	export let times = [];
</script>

<table>
	<thead>
		<tr>
			<th>{l.t.r.stats.body.date}</th>
			<th class="alpha1">{l.t.r.stats.body.focus}</th>
			<th class="beta1">{l.t.r.stats.body.break}</th>
		</tr>
	</thead>
	<tbody>
		{#each times as el}
			<tr>
				<td
					>{new Date(el.date).toLocaleDateString(locale, {
						day: '2-digit',
						weekday: 'long'
					})}</td
				>
				<td class="alpha">{m2hm(el.focus.total)}</td>
				<td class="beta">{m2hm(el.break.total)}</td>
			</tr>
		{/each}
	</tbody>
</table>

<!-- <style> -->
<!-- </style> -->

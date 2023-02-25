<script>
	const m2hm = (/** @type {number} */ mins) => {
		let h = Math.floor(mins / 60);
		let m = mins % 60;
		return h ? `${h}h ${m}m` : `${m}m`;
	};

	/** @type {import("$lib/types").IStat[]} */
	export let times = [];
</script>

<table>
	<thead>
		<tr>
			<th>Date</th>
			<th class="alpha1">Focus time</th>
			<th class="beta1">Break time</th>
		</tr>
	</thead>
	<tbody>
		{#each times as el}
			<tr>
				<td
					>{new Date(el.date).toLocaleDateString('en', {
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

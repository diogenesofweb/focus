<script>
	/** @type {[string, number][]} */
	export let activities = [];
</script>

<table>
	<thead>
		<tr>
			<th>Activity</th>
			<th>Total</th>
		</tr>
	</thead>
	{#each activities.sort((a, b) => b[1] - a[1]) as a}
		<tbody>
			<tr>
				<td>{a[0]}</td>
				<td class="beta">{a[1]}</td>
			</tr>
		</tbody>
	{/each}
</table>

<!-- <style> -->
<!-- </style> -->

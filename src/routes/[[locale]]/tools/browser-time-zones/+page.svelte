<script>
	const d = new Date();
	const time_zones = Intl.supportedValuesOf('timeZone').map((v) => {
		// return [v, d.toLocaleString(undefined, { timeZone: v,  })];
		const f = d.toLocaleString(undefined, {
			timeZone: v,
			timeZoneName: 'longOffset',
			hour: '2-digit',
			minute: '2-digit',
			hourCycle: 'h23'
		});
		const x = f.split(' ');
		// console.log(x);
		return [v, x[0], x[1]];
	});

	// const ro = Intl.DateTimeFormat().resolvedOptions();
	// console.log(ro);
	const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
	const t = d.toLocaleString();
	const t2 = d.toString();
	const t0 = d.getTimezoneOffset();
	const u = d.getTime();
	const l = Intl.DateTimeFormat().resolvedOptions().locale;
</script>

<article>
	<div class="card-x">
		<h1>browser time zone</h1>

		<h2>this browser date info</h2>
		<table>
			<tr> <td>time format</td> <td>{t}</td> </tr>
			<tr> <td>time format 2</td> <td>{t2}</td> </tr>
			<tr> <td>Unix Time</td> <td>{u}</td> </tr>
			<tr> <td>Time Zone</td> <td>{tz}</td> </tr>
			<tr> <td>Time Zone Offset</td> <td>{t0}</td> </tr>
			<tr> <td>Locale</td> <td>{l}</td> </tr>
		</table>

		<h2>this browser supported time zones</h2>
		<!-- <li>Time zone</li> -->
		<table>
			<tr>
				<td>Time Zone</td>
				<td>Time</td>
				<td>GMT</td>
			</tr>
			{#each time_zones as val}
				<tr>
					<td lang="en"> {val[0]} </td>
					<td> {val[1]} </td>
					<td> {val[2]} </td>
				</tr>
			{/each}
		</table>
	</div>
</article>

<style>
	table {
		line-height: 1.6;
	}
	/* td:first-child { */
	/* 	word-wrap: break-word; */
	/* } */
	@media (hover: hover) {
		tr:hover {
			background: var(--bg0);
		}
	}
</style>

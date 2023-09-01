<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import SetupLay from '$lib/SetupLay.svelte';
	import { Btn, Field, snack_new } from '@kazkadien/svelte';
	import { getContext } from 'svelte';
	/** @type {import('$lib/types').Localize } */
	const l = getContext('ttt');
	const th = l.t.r.countdown_to.head;

	const time_zones = Intl.supportedValuesOf('timeZone');
	let tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
	// console.log(time_zones);
	// console.log(ltz);
	const now = new Date();
	const today = now.toLocaleDateString('fr-CA');
	// console.log({ today });

	let date = today;
	let time = '';

	function get_path() {
		let date_str = date;
		if (time) {
			date_str += `T${time}:00`;
		}
		// console.log({ date, time, date_str });
		const d = new Date(date_str);
		// const dl = d.getTime();
		const dtz = new Date(d.toLocaleString('en', { timeZone: tz })).getTime();
		if (new Date().getTime() >= dtz) {
			return '';
		}
		// console.log({ dl, dtz });
		// const xl = new Date(dl);
		// const xtz = new Date(dtz);
		// console.log({ xl, xtz });
		const url = $page.url.pathname + `/${dtz}`;
		// console.log(url);
		return url;
	}

	let path = '';
	function on_change() {
		console.log('ch');
		path = get_path();
	}

	function on_submit() {
		path && goto(path);
	}

	const origin = 'https://www.timerone.com';
	function on_copy() {
		if (!path) return;

		const url = origin + get_path();
		// console.log({ url });
		navigator.clipboard.writeText(url).then(() => {
			snack_new('Copied !');
		});
	}
</script>

<svelte:head>
	<title>{th.title}</title>
	<meta name="description" content={th.desc} />
	<meta property="og:title" content={th.title} />
	<meta property="og:description" content={th.desc} />
</svelte:head>

<SetupLay>
	<div class="heading">
		<h1>{l.t.r.countdown_to.body.h1}</h1>
		<p>{l.t.r.countdown_to.body.desc}</p>
	</div>

	<form
		class="form v2 alpha"
		on:submit|preventDefault={on_submit}
		on:change={on_change}
	>
		<div>
			<Field label={l.t.time.date}>
				<input type="date" min={today} bind:value={date} />
			</Field>

			<Field label={l.t.time.time}>
				<input type="time" bind:value={time} />
			</Field>

			<label class="field" lang="en">
				<b>Time Zone</b>
				<select bind:value={tz}>
					{#each time_zones as val}
						<option value={val}>{val}</option>
					{/each}
				</select>
			</label>
		</div>

		<div class="btns">
			<Btn text={l.t.btn.start} type="submit" disabled={!path} />

			<Btn
				text={l.t.btn.copy_link}
				accent="gamma"
				on:click={on_copy}
				disabled={!path}
			/>
		</div>
	</form>
</SetupLay>

<style>
	h1 {
		margin-top: 0;
	}

	form {
		margin-top: 4rem;
		display: grid;
		gap: 3rem;
	}
	form div {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}
	form :global(:is(label, button)) {
		flex-grow: 1;
	}
</style>

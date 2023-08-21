<script>
	import { ldb, restore_data } from '$lib/db';
	import { Alert, Btn } from '@kazkadien/svelte';
	const VERSION = 1;
	import { getContext } from 'svelte';
	/** @type {import('$lib/types').Localize } */
	const l = getContext('ttt');

	// https://stackoverflow.com/questions/19721439/download-json-object-as-a-file-from-browser
	/**
	 * @param {string} filename
	 * @param {any} dataObjToWrite
	 */
	function saveTemplateAsFile(filename, dataObjToWrite) {
		const blob = new Blob([JSON.stringify(dataObjToWrite)], {
			type: 'text/json'
		});
		const link = document.createElement('a');

		link.download = filename;
		link.href = window.URL.createObjectURL(blob);
		link.dataset.downloadurl = ['text/json', link.download, link.href].join(
			':'
		);

		const evt = new MouseEvent('click', {
			view: window,
			bubbles: true,
			cancelable: true
		});

		link.dispatchEvent(evt);
		link.remove();
	}

	const ls_options = 'options';
	async function make_snaphot() {
		// console.log('up');
		const records = await ldb.records.list();
		// console.log(records);

		const stations = await ldb.stations.list();
		// console.log(stations);

		const sequences = await ldb.sequences.list();
		// console.log(sequences);

		const activities = (await ldb.activities.list()).map((v) => {
			// @ts-ignore
			v.values = [...v.values];
			return v;
		});
		// console.log(activities);
		const options = localStorage.getItem(ls_options);

		/** @type {import('$lib/db').RestoreData } */
		const snap = {
			VERSION,
			options,

			activities,
			sequences,
			records,
			stations
		};

		// console.log(snap);

		saveTemplateAsFile('focus.snap.json', snap);
	}
	let msg = '';

	/** @param {Event & { currentTarget: EventTarget & HTMLInputElement; }} ev */
	function restore(ev) {
		// console.log('up');
		// @ts-ignore
		const file = ev.currentTarget.files[0];
		// console.log(file)
		const reader = new FileReader();
		reader.onload = async (e) => {
			try {
				const content = e.target?.result;
				// console.log(content);
				if (typeof content === 'string') {
					console.log('content ok');

					/** @type {import('$lib/db').RestoreData } */
					const json = JSON.parse(content);
					console.log(json);

					if (json.VERSION !== VERSION) throw new Error('Invalid version');

					await restore_data(json);
					if (json.options) {
						localStorage.setItem(ls_options, json.options);
					}

					msg = l.t.r.snaps.body.restore_ok;
				} else {
					throw new Error('Invalid type of file content');
				}
			} catch (error) {
				console.log(error);
				// @ts-ignore
				msg = error.message || 'Oups :(';
			}
		};
		reader.readAsText(file);
	}
</script>

<svelte:head>
	<title>{l.t.r.stats.head.title}</title>
	<meta name="description" content={l.t.r.stats.head.desc} />
</svelte:head>

<div>
	<section class="">
		<Btn
			on:click={make_snaphot}
			variant="outlined"
			text={l.t.r.snaps.body.download}
		/>

		{#if msg}
			<Alert body={msg} closable={false} />
		{:else}
			<div class="form v2">
				<label class="field">
					<b>{l.t.r.snaps.body.restore}</b>
					<input type="file" accept="application/json" on:change={restore} />
				</label>
			</div>
		{/if}
	</section>
</div>

<style>
	section {
		margin-top: 1rem;
		max-width: 60ch;
		margin-inline: auto;
		padding: 6em 2em;
		display: grid;
		gap: 4em;

		background: var(--bg);
		border: var(--border);
		border-radius: 1em;
		/* --bg: var(--bg1); */
	}
</style>

<script>
	import MyLayout from '$lib/MyLayout.svelte';
	import { ldb } from '$lib/db';
	import { Btn, Field, Icon } from '@kazkadien/svelte';
	import { getContext } from 'svelte';
	/** @type {import('$lib/types').Localize } */
	const l = getContext('ttt');
	const th = l.t.r.breaks.head;
	const tb = l.t.r.breaks.body;

	let newListName = '';
	function handleSubmitNewList() {
		console.log({ newListName });
		listNames = [newListName, ...listNames];
		name = newListName;
		values = new Set();
		upsert();
		newListName = '';
	}
	function deleteList() {
		if (listNames.length < 2) {
			return;
		}
		ldb.activities.deleteOne(name);
		listNames = listNames.filter((e) => e !== name);
		name = listNames[0];
		fetchOne(name);
	}

	function upsert() {
		ldb.activities.upsertOne({ name, values });
	}

	/** @type {string[]} */
	let listNames = [];
	ldb.activities.getNames().then((res) => {
		listNames = res;
		if (res.length) {
			name = res[0];
			fetchOne(name);
		}
	});
	/** @param {string} name */
	function fetchOne(name) {
		// @ts-ignore
		ldb.activities.getOneByName(name).then((v) => (values = v?.values));
	}
	let name = '';
	/** @type {Set<string>} */
	let values = new Set();

	/** @param {Event & { currentTarget: EventTarget & HTMLSelectElement; }} ev */
	function onChangeList(ev) {
		const val = ev.currentTarget.value;
		console.log({ val });
		name = val;
		fetchOne(name);
		// currList = val;
	}
	/** @param {string} val */
	function onDelete(val) {
		console.log(val);
		values.delete(val);
		values = values;
		upsert();
	}

	let action = '';
	function handleSubmitNewActivity() {
		console.log(values);
		console.log(action);
		values.add(action);
		values = values;
		upsert();
		action = '';
	}
</script>

<svelte:head>
	<title>{th.title}</title>
	<meta name="description" content={th.desc} />
</svelte:head>

<MyLayout title="">
	<div slot="top">
		<form class="form v2 alpha" on:submit|preventDefault={handleSubmitNewList}>
			<Field label={tb.new}>
				<input
					bind:value={newListName}
					type="text"
					required
					maxlength="240"
					minlength="2"
					placeholder="My list name"
				/>
			</Field>
		</form>

		<div class="g1a">
			<div class="form v2 ll">
				<Field label={tb.list}>
					<select on:change={onChangeList}>
						{#each listNames as val}
							<option selected={val === name}>{val}</option>
						{/each}
					</select>
				</Field>
			</div>
			<Btn
				iconOnly
				colored
				accent="danger"
				variant="text"
				title={l.t.btn.del}
				on:click={deleteList}
			>
				<Icon name="delete" />
			</Btn>
		</div>
	</div>

	<svelte:fragment slot="list">
		{#each [...values] as el}
			<li>
				<span>{el}</span>
				<Btn
					iconOnly
					accent="danger"
					colored
					variant="text"
					on:click={() => onDelete(el)}
				>
					<Icon name="delete" />
				</Btn>
			</li>
		{:else}
			<li>Empty</li>
		{/each}
	</svelte:fragment>

	<form
		slot="btns"
		class="form v2 alpha end"
		on:submit|preventDefault={handleSubmitNewActivity}
	>
		<Field label={tb.new_activity}>
			<input
				bind:value={action}
				type="text"
				required
				maxlength="240"
				minlength="2"
				placeholder="Plank"
			/>
		</Field>
	</form>
</MyLayout>

<div class="notes" lang="en">
	<p>
		<a href="https://www.bbc.com/news/health-66303982">
			Wall squats and planks best at lowering blood pressure
		</a>
	</p>
</div>

<style>
	form {
		background: var(--bg);
		/* padding: 1em; */
		border-radius: 1em;
	}
	.ll {
		/* margin-top: 2em; */
		display: flex;
	}
	.ll :global(label) {
		flex-grow: 1;
		/* background: black; */
	}
	li {
		padding-inline-start: 1ch;
	}

	.g1a {
		margin-block: 3em 1em;
		/* background: black; */
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 2ch;
		align-items: flex-start;

		/* outline: 1px solid orange; */
	}
	.end {
		margin-top: 2em;
	}

	.notes {
		padding: 1rem;
		border-radius: 1rem;
		/* border: var(--border); */
		background: var(--bg);
		margin-block: 4rem;
	}
</style>

<script>
	import EditRadioStation from './EditRadioStation.svelte';
	import MyIcon from '$lib/MyIcon.svelte';
	import MyLayout from '$lib/MyLayout.svelte';
	import { Btn, Icon, Modal } from '@kazkadien/svelte';
	import { ldb } from '$lib/db';
	import { getContext } from 'svelte';
	/** @type {import('$lib/types').Localize } */
	const l = getContext('ttt');
	const bb = l.t.btn;
	const tb = l.t.r.radios.body;

	/** @type {import('$lib/types').IRadioStation[]} */
	let myStations = [];
	reload();

	function reload() {
		ldb.stations.list().then((v) => {
			myStations = v.sort((a, b) => a.name.localeCompare(b.name));
			// console.log(myStations);
		});
	}
	let is_confirm = false;
	function on_reset() {
		if (!is_confirm) {
			is_confirm = true;
			setTimeout(() => (is_confirm = false), 1000);
			return;
		}

		ldb.stations.reset_to_default().then(() => reload());
	}

	let modalIsOpen = false;
	/** @type {import('$lib/types').IRadioStation | undefined} */
	let station2edit;

	/** @param {number} id */
	function onDelete(id) {
		// console.log(id);
		ldb.stations.deleteOneById(id).then(() => {
			reload();
		});
	}

	function onAdd() {
		if (station2edit) station2edit = undefined;
		modalIsOpen = true;
	}

	/** @param {import("$lib/types").IRadioStation } station */
	function onEdit(station) {
		// console.log('edit ', station);
		station2edit = station;
		modalIsOpen = true;
	}

	function onCloseModal() {
		modalIsOpen = false;
		station2edit = undefined;
	}

	$: tt = is_confirm ? `${bb.confirm} ${tb.e.reset}` : tb.e.reset;
</script>

<svelte:head>
	<title>{l.t.r.radios.head.title}</title>
	<meta name="description" content={l.t.r.radios.head.desc} />
</svelte:head>

{#if modalIsOpen}
	<Modal on:close={onCloseModal}>
		<EditRadioStation
			station={station2edit}
			on:close={() => {
				onCloseModal();
				reload();
			}}
		/>
	</Modal>
{/if}

<MyLayout title={tb.h}>
	<svelte:fragment slot="list">
		{#each myStations as el}
			<li>
				<span> {el.name} </span>

				<div class="btns">
					<Btn
						iconOnly
						accent="alpha"
						colored
						variant="text"
						on:click={() => onEdit(el)}
						title={bb.edit}
					>
						<MyIcon name="edit" />
					</Btn>

					<Btn
						iconOnly
						accent="danger"
						colored
						variant="text"
						on:click={() => onDelete(el.id)}
						title={bb.del}
					>
						<Icon name="delete" />
					</Btn>
				</div>
			</li>
		{/each}
	</svelte:fragment>

	<div slot="btns" class="fsb g1">
		<Btn on:click={onAdd} accent="alpha" variant="filled" text={tb.e.add} />
		<Btn on:click={on_reset} accent="danger" variant="filled" text={tt} />
	</div>
</MyLayout>

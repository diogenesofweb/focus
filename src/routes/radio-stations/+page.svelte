<script>
	import EditRadioStation from './EditRadioStation.svelte';
	import MyIcon from '$lib/MyIcon.svelte';
	import MyLayout from '$lib/MyLayout.svelte';
	import { Btn, Icon, Modal } from '@kazkadien/svelte';
	import { ldb } from '$lib/db';

	/** @type {import('$lib/types').IRadioStation[]} */
	let myStations = [];
	reset();

	function reset() {
		ldb.stations.list().then((v) => {
			myStations = v;
			// console.log(myStations);
		});
	}

	let modalIsOpen = false;
	/** @type {import('$lib/types').IRadioStation | undefined} */
	let station2edit;

	/** @param {number} id */
	function onDelete(id) {
		// console.log(id);
		ldb.stations.deleteOneById(id).then(() => {
			reset();
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
</script>

<svelte:head>
	<title>Focus | Radios</title>
</svelte:head>

{#if modalIsOpen}
	<Modal on:close={onCloseModal}>
		<EditRadioStation
			station={station2edit}
			on:close={() => {
				onCloseModal();
				reset();
			}}
		/>
	</Modal>
{/if}

<MyLayout title="Radio Stations:">
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
					>
						<MyIcon name="edit" />
					</Btn>

					<Btn
						iconOnly
						accent="danger"
						colored
						variant="text"
						on:click={() => onDelete(el.id)}
					>
						<Icon name="delete" />
					</Btn>
				</div>
			</li>
		{/each}
	</svelte:fragment>

	<div slot="btns" class="fce">
		<Btn
			on:click={onAdd}
			accent="alpha"
			variant="filled"
			text="Add New Station"
		/>
	</div>
</MyLayout>

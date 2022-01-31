<script>
	import EditRadioStation from '$lib/EditRadioStation.svelte';
	import MyIcon from '$lib/MyIcon.svelte';
	import MyLayout from '$lib/MyLayout.svelte';
	import { stations } from '$store/radio';
	import { Stations } from '$utils/storage';
	import { Btn, Icon, Modal } from '@kazkadien/svelte';

	/** @typedef {import('$typings/types').Station} Station*/

	let modalIsOpen = false;
	let station2edit;

	/** @param {number} id */
	function onDelete(id) {
		// console.log(id);
		Stations.del(id);
		stations.update((v) => v.filter((e) => e.id !== id));
	}

	function onAdd() {
		if (station2edit) station2edit = undefined;
		modalIsOpen = true;
	}

	/** @param {Station} station */
	function onEdit(station) {
		// console.log('edit ', station);
		station2edit = station;
		modalIsOpen = true;
	}
</script>

{#if modalIsOpen}
	<Modal on:close={() => (modalIsOpen = false)}>
		<EditRadioStation
			station={station2edit}
			on:close={() => (modalIsOpen = false)}
		/>
	</Modal>
{/if}

<MyLayout title="Radio Stations:">
	<svelte:fragment slot="list">
		{#each $stations as el}
			<li>
				<span> {el.name} </span>

				<div class="btns">
					<Btn
						icony
						accent="alpha"
						colored
						size="small"
						on:click={() => onEdit(el)}
					>
						<MyIcon name="edit" />
					</Btn>

					<Btn
						icony
						accent="danger"
						colored
						size="small"
						on:click={() => onDelete(el.id)}
					>
						<Icon name="delete" />
					</Btn>
				</div>
			</li>
		{/each}
	</svelte:fragment>

	<div slot="btns" class="fce">
		<Btn on:click={onAdd} accent="alpha" classic title="Add New Station" />
	</div>
</MyLayout>

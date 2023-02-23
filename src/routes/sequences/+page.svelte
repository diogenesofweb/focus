<script>
	import EditSequence from './EditSequence.svelte';
	import MyIcon from '$lib/MyIcon.svelte';
	import MyLayout from '$lib/MyLayout.svelte';
	import { currSequenceName, sequences } from '$store/store';
	import { Btn, Icon, Modal } from '@kazkadien/svelte';
	import { ldb } from '$lib/db';

	let modalIsOpen = false;

	/** @param {string} name */
	function onDelete(name) {
		console.log(name);
		ldb.sequences.deleteOneByName(name).then(() => {
			sequences.update((v) => v.filter((e) => e != name));
		});
	}

	function onAdd() {
		modalIsOpen = true;
	}

	/** @type {import('$lib/types').ISequence | undefined} */
	let sequence2edit;
	/** @param {string} name */
	function onEdit(name) {
		ldb.sequences.getOneByName(name).then((v) => {
			if (!v) return;
			sequence2edit = v;
			modalIsOpen = true;
		});
	}
	function onCloseModal() {
		modalIsOpen = false;
		sequence2edit = undefined;
	}
</script>

<svelte:head>
	<title>Focus | Sequences</title>
</svelte:head>

{#if modalIsOpen}
	<Modal on:close={onCloseModal}>
		<EditSequence on:close={onCloseModal} seq={sequence2edit} />
	</Modal>
{/if}

<MyLayout title="Sequences">
	<svelte:fragment slot="list">
		{#each $sequences as el}
			<li>
				<span> {el} </span>

				<div class="btns">
					<Btn
						iconOnly
						colored
						accent="alpha"
						variant="text"
						on:click={() => onEdit(el)}
					>
						<MyIcon name="edit" />
					</Btn>

					<Btn
						colored
						iconOnly
						variant="text"
						accent="danger"
						on:click={() => onDelete(el)}
						disabled={el === $currSequenceName}
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
			text="Add New Sequence"
		/>
	</div>
</MyLayout>

<style>
	.btns {
		font-size: 0.75em;
	}
</style>

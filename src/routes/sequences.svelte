<script>
	import EditSequence from '$lib/EditSequence.svelte';
	import MyIcon from '$lib/MyIcon.svelte';
	import MyLayout from '$lib/MyLayout.svelte';
	import { sequences } from '$store/store';
	import { Sequences } from '$utils/storage';
	import { Btn, Icon, Modal } from '@kazkadien/svelte';

	let modalIsOpen = false;

	/** @param {string} name */
	function onDelete(name) {
		console.log(name);
		Sequences.del(name);

		sequences.update((v) => v.filter((e) => e != name));
	}

	function onAdd() {
		sequence2edit = '';
		modalIsOpen = true;
	}

	/** @param {{ detail: any; }} e */
	function onCreated(e) {
		const _name = e.detail;
		console.log(e.detail);
		if (!sequence2edit) {
			sequences.update((v) => {
				v.push(_name);
				return v;
			});
		}
		modalIsOpen = false;
	}

	let sequence2edit = '';
	/** @param {string} name */
	function onEdit(name) {
		sequence2edit = name;
		modalIsOpen = true;
	}
</script>

<svelte:head>
	<title>Focus | Sequences</title>
</svelte:head>

{#if modalIsOpen}
	<Modal blurBG on:close={() => (modalIsOpen = false)}>
		<EditSequence
			on:close={() => (modalIsOpen = false)}
			on:created={onCreated}
			{sequence2edit}
		/>
	</Modal>
{/if}

<MyLayout title="Sequences:">
	<svelte:fragment slot="list">
		{#each $sequences as el}
			<li>
				<span> {el} </span>

				<div class="btns">
					<Btn
						iconOnly
						accent="alpha"
						colored
						size="small"
						on:click={() => onEdit(el)}
					>
						<MyIcon name="edit" />
					</Btn>

					<Btn
						iconOnly
						accent="danger"
						colored
						size="small"
						on:click={() => onDelete(el)}
					>
						<Icon name="delete" />
					</Btn>
				</div>
			</li>
		{/each}
	</svelte:fragment>

	<div slot="btns" class="fce">
		<Btn on:click={onAdd} accent="alpha" filled text="Add New Sequence" />
	</div>
</MyLayout>

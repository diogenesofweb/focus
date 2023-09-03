<script>
	import EditSequence from './EditSequence.svelte';
	import MyIcon from '$lib/MyIcon.svelte';
	import MyLayout from '$lib/MyLayout.svelte';
	import { currSequenceName, sequences } from '$store/store';
	import { Btn, Icon, Modal } from '@kazkadien/svelte';
	import { ldb } from '$lib/db';
	import { getContext } from 'svelte';
	/** @type {import('$lib/types').Localize } */
	const l = getContext('ttt');
	const bb = l.t.btn;

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
	<title>{l.t.r.sequences.head.title}</title>
	<meta name="description" content={l.t.r.sequences.head.desc} />
</svelte:head>

{#if modalIsOpen}
	<Modal on:close={onCloseModal}>
		<EditSequence on:close={onCloseModal} seq={sequence2edit} />
	</Modal>
{/if}

<MyLayout title={l.t.r.sequences.body.h}>
	<svelte:fragment slot="list">
		{#each $sequences as el}
			<li>
				<span> {el} </span>

				<div class="btns" style="font-size: .75em;">
					<Btn
						iconOnly
						colored
						accent="alpha"
						variant="text"
						on:click={() => onEdit(el)}
						title={bb.edit}
					>
						<MyIcon name="edit" />
					</Btn>

					<Btn
						title={bb.del}
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
			text={l.t.r.sequences.body.add}
		/>
	</div>
</MyLayout>

<!-- <style> -->
<!-- 	.btns { -->
<!-- 		font-size: 0.75em; -->
<!-- 	} -->
<!-- </style> -->

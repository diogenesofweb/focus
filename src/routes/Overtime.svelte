<script>
	export let overtime = 0;

	/** @type {import("$typings/types").Phase} */
	export let phase;

	$: overdue = overtime < 10 ? '0' + overtime : overtime;
</script>

{#if overtime}
	<section class="danger fsb">
		<div>{phase == 'focus' ? 'Break' : 'Focus'} Overtime</div>
		<div class="overdue danger" title="overtime">+{overdue}:00</div>
	</section>
{/if}

<style>
	section {
		padding-block: 6px;
		padding-inline: var(--x1);
		border-radius: var(--x1);
		background: var(--bg);
		color: var(--__fg);

		border: 1px solid var(--__bg);
	}

	.overdue {
		font-weight: bold;
		font-size: 1.4rem;

		text-align: center;
	}
</style>

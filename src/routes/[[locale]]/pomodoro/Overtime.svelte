<script>
	import { getContext } from 'svelte';
	/** @type {import('$lib/types').Localize } */
	const l = getContext('ttt');
	const tr = {
		overtime: l.t.timers.pomodoro.overtime,
		focus: l.t.timers.pomodoro.phase.focus,
		break: l.t.timers.pomodoro.phase.break
	};

	export let overtime = 0;

	/** @type {import("$typings/types").Phase} */
	export let phase;

	$: overdue = overtime < 10 ? '0' + overtime : overtime;
</script>

{#if overtime}
	<section class="danger fsb">
		<div>{phase == 'focus' ? tr.break : tr.focus} {tr.overtime}</div>
		<div class="overdue danger" title={tr.overtime}>+{overdue}:00</div>
	</section>
{/if}

<style>
	section {
		padding-block: 6px;
		padding-inline: var(--x1);
		border-radius: var(--x1);
		background: var(--bg);
		color: var(--__fg);

		border: 1px solid var(--__fl);
		margin-block: 2em;
	}
	div:first-child {
		text-transform: capitalize;
	}

	.overdue {
		font-weight: bold;
		font-size: 1.4rem;

		text-align: center;
	}
</style>

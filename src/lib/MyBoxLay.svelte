<script>
	/** @type {import("@kazkadien/svelte/dist/types").Accent | ''} */
	export let accent = '';
	/** @type {string } */
	export let heading;

	/** @type {string | number} */
	export let HH;
	/** @type {string | number} */
	export let MM;
	/** @type {string | number} */
	export let SS;

	/** @type {string } */
	export let init_nums = '';
</script>

<section class={accent}>
	<div class="box">
		<div class="header f-mono">{heading}</div>

		<div class="tablo">
			{#if init_nums}
				<div class="init-nums font-x">[ {init_nums} ]</div>
			{/if}

			<div class="font-x nums">
				<b>{HH}</b>
				<i>:</i>
				<b>{MM}</b>
				<i>:</i>
				<b>{SS}</b>
			</div>
		</div>
	</div>

	<div class="btns g-action-btns">
		<slot name="btns"><!-- optional fallback --></slot>
	</div>
</section>

<style>
	.init-nums {
		padding-top: 1em;
		margin-bottom: -0.25em;

		color: var(--__fg0);
		line-height: 1;
		text-align: center;
		/* font-weight: 900; */
		font-size: clamp(1.5rem, 10vw, 3rem);
	}

	.box {
		padding-top: max(4rem, 10vh);
	}

	.header,
	.tablo {
		background: var(--__bga);
		backdrop-filter: blur(3px);
	}

	.header {
		text-align: center;
		/* text-transform: uppercase; */
		font-size: 1.75rem;
		font-weight: 900;

		/* border: 3px dotted var(--__fl0); */
		border: 0.5rem double var(--__fl0);
		border-radius: 0 0 1rem 1rem;

		padding: 1rem;
		color: var(--__fg);
	}

	.tablo {
		user-select: none;
		border-radius: 1rem;
		border: 0.25rem solid var(--__fl0);
		border-left: 0.75rem solid var(--__fl0);
		border-right: 0.75rem solid var(--__fl0);
	}

	.tablo,
	.btns {
		margin-top: 2rem;
	}

	.nums {
		padding-block: 0.2em 0em;
		padding-inline: 0.2em;
		color: var(--__fg);

		display: grid;
		grid-template-columns: 2ch 0.75ch 2ch 0.75ch 2ch;
		justify-content: center;
		/* gap: 0.25rem; */

		text-align: center;
		font-variant-numeric: tabular-nums;
		font-size: clamp(4rem, 20vw, 10rem);

		/* background: black; */
	}
	b {
		text-align: center;
	}
	b:first-child {
		text-align: right;
	}
	b:last-child {
		text-align: left;
	}
	i {
		font-style: normal;
		transform: translateY(-4%);
		/* background: black; */
	}

	.btns {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
		gap: 1rem;
	}
</style>

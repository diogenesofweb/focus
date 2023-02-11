<script>
	import { Breaks } from '$utils/storage';

	const long = Breaks.long.get();
	const short = Breaks.short.get();
</script>

<!-- <datalist id="my-breaks"> -->
<!-- 	{#each [...long, ...short] as el} -->
<!-- 		<option value={el.action} /> -->
<!-- 	{/each} -->
<!-- </datalist> -->

<datalist id="long-breaks">
	{#each long as el}
		<option value={el.action} />
	{/each}
</datalist>

<datalist id="short-breaks">
	{#each short as el}
		<option value={el.action} />
	{/each}
</datalist>

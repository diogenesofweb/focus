<script>
</script>

<article class="container">
	<div class="card-x alpha">
		<slot><!-- optional fallback --></slot>
	</div>
</article>

<style>
	article {
		padding-block: max(3rem, 8vh);
		min-width: min(100%, 60ch);
		/* background: black; */
	}
</style>

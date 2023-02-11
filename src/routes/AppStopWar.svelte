<section id="stop-war">
	<a
		href="https://war.ukraine.ua/support-ukraine/"
		target="_blank"
		rel="noopener noreferrer"
	>
		<span>STAND WITH UKRAINE</span>

		<svg xmlns="http://www.w3.org/2000/svg" width="30" height="20">
			<rect width="30" height="20" fill="#005BBB" />
			<rect width="30" height="10" y="10" fill="#FFD500" />
		</svg>
	</a>
</section>

<style>
	#stop-war {
		z-index: 999;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 1ch;
		background-color: black;
		font-size: 14px;
		text-align: center;
	}

	#stop-war a {
		font-family: 'Courier New', Courier, monospace;
		/* color: red; */
		color: salmon;
		text-decoration: none;
		display: inline-flex;
		align-items: flex-end;
		gap: 1ch;
	}

	#stop-war a:is(:hover, :focus) {
		text-decoration: underline;
	}
</style>

<script>
	import { dev } from '$app/environment';
	import MyProjects from './MyProjects.svelte';
	// import Name from '$lib/Name.svelte';
	const items = [
		['/', 'en', 'English'],
		['/fr', 'fr', 'Français'],
		['/ua', 'uk', 'Українська']
	];
</script>

<footer lang="en">
	<div class="container-1">
		<!-- <div> <Name /> </div> -->

		<!-- <div> -->
		<!-- <div> -->
		<!-- 	Free and open source web app. Built with -->
		<!-- 	<a href="https://kit.svelte.dev">SvelteKit</a>, on -->
		<!-- <a href="https://github.com/diogenesofweb/focus">GitHub</a>. -->
		<!-- </div> -->

		<!-- <p> -->
		<!-- 	Check out -->
		<!-- 	<a href="https://www.delphic.top/projects">my projects</a>. -->
		<!-- </p> -->

		<!-- <div> -->
		<!-- 	<a -->
		<!-- 		href="https://github.com/diogenesofweb/focus" -->
		<!-- 		aria-label="link to repo" -->
		<!-- 	> -->
		<!-- 		<svg width="24" height="24" viewBox="0 0 24 24"> -->
		<!-- 			<path -->
		<!-- 				fill="currentColor" -->
		<!-- 				d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" -->
		<!-- 			/> -->
		<!-- 		</svg> -->
		<!-- 	</a> -->
		<!-- </div> -->

		<!-- {#if dev} -->
		<!-- 	<a href="/countdown/minutes">Popular timers</a> -->
		<!-- 	<a href="/alarm-clock">Alarm</a> -->
		<!-- 	<a href="/tools">tools</a> -->
		<!-- {/if} -->
		<!-- </div> -->

		<nav class="fsb">
			<ul class="alpha">
				{#each items as el}
					<li>
						<a data-sveltekit-reload href={el[0]} lang={el[1]}>{el[2]}</a>
					</li>
				{/each}
			</ul>

			<a href="https://github.com/diogenesofweb/focus">GitHub</a>
		</nav>

		<MyProjects />
	</div>
</footer>

<style>
	a:not(.btn) {
		color: var(--fg);
	}
	a:not(.btn):hover {
		color: var(--fg-alpha);
	}
	footer {
		padding-block: 3rem 6rem;
		background-color: var(--bg0);
		border-top: 3px double var(--fl0);
	}
	footer > div {
		/* background: black; */
		padding-inline: 2rem;
		display: grid;
		gap: 3rem;
		/* grid-template-columns: 1fr auto; */
	}

	ul {
		display: flex;
		gap: 1em;
	}
	li {
		padding-block: 0.3em;
	}
</style>

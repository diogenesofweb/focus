<script context="module">
	export const VISIBILITY_STATE = {
		hidden: 'hidden',
		visible: 'visible'
	};
</script>

<script>
	// https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API#example

	import { onDestroy } from 'svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	let hidden, visibilityChange;

	if (typeof document.hidden !== 'undefined') {
		// Opera 12.10 and Firefox 18 and later support
		hidden = 'hidden';
		visibilityChange = 'visibilitychange';
		// @ts-ignore
	} else if (typeof document.msHidden !== 'undefined') {
		hidden = 'msHidden';
		visibilityChange = 'msvisibilitychange';
		// @ts-ignore
	} else if (typeof document.webkitHidden !== 'undefined') {
		hidden = 'webkitHidden';
		visibilityChange = 'webkitvisibilitychange';
	}

	function handleVisibilityChange() {
		// console.log('document[hidden]', document[hidden]);
		if (document[hidden]) {
			dispatch('state', VISIBILITY_STATE.hidden);
		} else {
			dispatch('state', VISIBILITY_STATE.visible);
		}
	}

	// Warn if the browser doesn't support addEventListener or the Page Visibility API
	if (
		typeof document.addEventListener === 'undefined' ||
		hidden === undefined
	) {
		console.log(
			'This site requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.'
		);
	} else {
		// Handle page visibility change
		document.addEventListener(visibilityChange, handleVisibilityChange, false);
	}

	onDestroy(() => {
		document.removeEventListener(
			visibilityChange,
			handleVisibilityChange,
			false
		);
	});
</script>

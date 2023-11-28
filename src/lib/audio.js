import { Howl } from 'howler';

export const audio = new Howl({ src: ['/flute.wav'] });

export const noise = new Howl({
	src: [
		'/_sounds/empty_loop_for_js_performance.ogg',
		'/_sounds/empty_loop_for_js_performance.wav'
	],
	// mute: true,
	volume: 0.5,
	loop: true
});

// export const INIT_TITLE = 'Pomodoro Timer Online';

export const msg = {
	finish: 'FINISH',
	tick: 'TICK',
	resume: 'RESUME',
	start: 'START',
	stop: 'STOP',

	remindTimerEnded: 'REMIND_TIMER_ENDED',

	hidden: 'HIDDEN',
	visible: 'VISIBLE'
};

// message worker_forward
export const MSG_WF = /** @type {const} */ ({
	stop: 'stop',
	// pause: 'pause',
	reset: 'reset',
	start: 'start'
});

export const LS = {
	recent_timers: 'recent_timers'
};

/** @typedef {keyof ii } MyIconName */
export const ii = {
	fast_forward: 'fast_forward',
	skip_next: 'skip_next',

	sports_gymnastics: 'sports_gymnastics',
	local_cafe: 'local_cafe',
	play_arrow: 'play_arrow',
	pause: 'pause',
	play_pause: 'play_pause',
	volume_up: 'volume_up',
	flag: 'flag',
	code: 'code',
	workspaces: 'workspaces',
	self_improvement: 'self_improvement',
	timer: 'timer',
	stop: 'stop',
	timelapse: 'timelapse',
	settings_backup_restore: 'settings_backup_restore',
	alarm: 'alarm',
	alarm_add: 'alarm_add',
	cycle: 'cycle',
	tune: 'tune'
};

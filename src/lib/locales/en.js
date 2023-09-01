// const en = /** @type { const } */ ({
const en = {
	btn: {
		add: 'add',
		subtrack: 'subtract',
		calculate: 'calculate',
		copy_link: 'copy link',
		confirm: 'confirm',
		edit: 'edit',
		del: 'delete',
		skip: 'skip',
		start: 'start',
		restart: 'restart',
		resume: 'resume',
		stop: 'stop',
		next: 'next',
		reset: 'reset',
		cycle: 'cycle',
		play: 'play',
		mute: 'mute',
		pause: 'pause'
	},
	// icon title and labels
	it: {
		add_timer: 'add countdown timer',
		settings: 'settings',
		menu: 'menu',

		//labels
		sequence: 'Sequence',
		radio: 'Radio Station',
		vol: 'Volume',

		total_focus: "focus: today's total time (HH:MM)",
		total_break: "break: today's total time (HH:MM)"
	},

	menu: {
		timers: 'Timers',
		edit: 'Edit',
		info: 'Info',
		pomodoro: 'Pomodoro',
		tools: 'Tools'
	},

	time: {
		date: 'Date',
		time: 'Time',
		until: 'Time until',
		expired: 'Expired',
		days: 'Days',
		hh: 'Hours',
		mm: 'Minutes',
		ss: 'Seconds',
		mins: 'min',

		year: 'year',
		years: 'years',
		month: 'month',
		months: 'months',
		weeks: 'weeks',
		day: 'day'
		// days: 'days'
	},

	opts: {
		group: {
			general: 'General Options',
			pomo: 'Pomodoro Options',
			addons: 'Pomodoro Add-ons'
		},

		notif: 'Notifications',
		alarm: 'Sound Alarm',
		wake_lock: 'Prevent Dimming or Locking the Screen',

		reminder: 'Overtime Reminder *',
		skip_break: 'Skip Break Activity Selection',
		autoshow_activities: 'Auto Show Break Activities',
		autostart_focus: 'Auto Start Focus',

		addons: {
			stopwatch: 'Stopwatch',
			radio: 'Radio Player',
			total_time: "Today's Total Time",
			overtime: 'Current Overtime'
		},

		etc: {
			remind: '* Remind me of overtime every 5 minutes.',
			autoclose: 'Remove on completion',
			preserve_HMS: 'Preserve values HH:MM:SS'
		},

		theme: 'Theme'
	},

	timers: {
		pomodoro: {
			n: 'pomodoro',
			h: 'Pomodoro Timer',
			phase: {
				focus: 'focus',
				break: 'break'
			},
			b_type: {
				short: 'short',
				long: 'long'
			},
			overtime: 'overtime'
		},

		countdown: {
			n: 'countdown',
			h: 'Countdown Timer'
		},

		countdown_date: {
			n: 'countdown_date',
			h: 'Countdown to Date'
		},

		stopwatch: {
			n: 'stopwatch',
			h: 'Stopwatch Timer'
		}
	},

	// routes
	r: {
		index: {
			head: {
				title: 'Free Online Timers',
				desc: 'Free online easy-to-use timers : pomodoro, countdown, stopwatch. And date calculators. No distractions. Light and dark mode. Works on all screen sizes.',
				og: {
					title: 'Free Online Timers',
					desc: 'Free online easy-to-use timers : pomodoro, countdown, stopwatch. And date calculators. No distractions. Light and dark mode. Works on all screen sizes.'
				}
			},
			body: {
				h1: 'Modern and easy-to-use online timers',
				h2: 'Date Calculators'
			}
		},

		pomodoro: {
			head: {
				title: 'Pomodoro Timer Online',
				desc: 'Easy-to-use, customizable, minimalistic and aesthetic free online pomodoro timer. Helps with productivity and concentration.',
				og: {
					title: 'Online Pomodoro Timer',
					desc: 'Easy-to-use, customizable, minimalistic and aesthetic productivity timer.'
				}
			},
			body: {
				h1: 'Online Productivity Timer',
				d1: 'Mobile-friendly, easy-to-use, customizable, minimalistic and aesthetic productivity timer based on ',
				l: {
					url: 'https://en.wikipedia.org/wiki/Pomodoro_Technique',
					n: 'pomodoro technique'
				},
				d2: '. On a mission to boost productivity and concentration, but also to encourage meaningful breaks with predefined activities. '
			}
		},

		stopwatch: {
			head: {
				title: 'Stopwatch Timer Online',
				desc: 'Easy-to-use, accurate, pleasing to the eye, online stopwatch timer.',
				og: {
					title: 'Online Stopwatch',
					desc: 'Easy-to-use, accurate, pleasing to the eye, online stopwatch.'
				}
			},
			body: {
				h1: 'Online Stopwatch Timer',
				desc: 'Easy-to-use, accurate, pleasing to the eye, online stopwatch timer.',
				h: 'Stopwatch'
			}
		},

		countdown: {
			head: {
				title: 'Countdown Timer Online',
				desc: 'Easy-to-use, mobile-friendly, accurate, modern, minimalist online timer',
				og: {
					title: 'Online Countdown Timer',
					desc: 'Easy-to-use, mobile-friendly, accurate, modern, minimalist online timer'
				}
			},
			body: {
				h1: 'Online Countdown Timer',
				desc: 'Easy-to-use, mobile-friendly, accurate, modern, minimalist online timer.',
				desc_x1: 'Choose from',
				desc_x2: 'frequent pre-set timers',
				h: 'Countdown'
			}
		},

		countdown_to: {
			head: {
				title: 'Countdown to Date Online',
				desc: 'Simple, mobile-friendly, modern countdown to date online timer'
			},
			body: {
				h1: 'Countdown to Date',
				desc: 'Select date, time and time zone to start the timer.',
				h: 'Countdown to Date'
			}
		},

		c_minutes: {
			head: {
				title: 'Popular pre-set timers',
				desc: 'Popular pre-set countdown timers in minutes'
			},
			body: {
				h1: 'Popular countdown timers, pre-set in minutes',
				h2: 'minute timer'
				// h: 'Countdown'
			}
		},

		c_preset: {
			head: {
				title: (n) => `${n} Minute Timer Online`,
				desc: (n) =>
					`Run a pre-set ${n} munute countdown timer in one click. It's free and easy-to-use.`
			},
			body: {
				h1: (n) => `Pre-set ${n} minute countdown timer.`,
				d1: 'More',
				d2: 'pre-set timers'
				// h: 'Countdown'
			}
		},

		stats: {
			head: {
				title: 'Stats',
				desc: 'Statistics for focus and  break activities'
			},
			body: {
				h: 'Stats',

				date: 'Date',
				focus: 'Focus time',
				break: 'Break time',

				activity: 'Activity',
				total: 'Total'
			}
		},
		snaps: {
			head: {
				title: 'Snapshots',
				desc: 'Save and restore your data'
			},
			body: {
				h: 'Snapshots',
				download: 'download snapshot',
				restore: 'Restore from snapshot',
				restore_ok: 'Restored! Please refresh page.',
				desc: 'My Snapshots'
			}
		},
		sequences: {
			head: {
				title: 'Session Sequences',
				desc: 'List of sequences'
			},
			body: {
				// desc: 'My Snapshots',
				add: 'Add new sequence',
				h: 'Session Sequences',
				e: {
					name: 'Name',
					focus: 'Focus',
					break: 'Break',
					l_break: 'Long break',
					s_break: 'Short break',
					note: '* Focus and break time in minutes',
					sets: 'Sets',

					time: 'Time',
					task: 'Task',
					activity_list: 'Activities list',
					activity: 'Activity'
				}
			}
		},
		breaks: {
			head: {
				title: 'Break Activities',
				desc: 'Break Activities'
			},
			body: {
				h: 'Break Activities',
				new: 'New List',
				list: 'Activities List',
				new_activity: 'New Activity'
			}
		},
		radios: {
			head: {
				title: 'Radio stations',
				desc: 'List of radio stations'
			},
			body: {
				h: 'Radio Stations',
				e: {
					add: 'Add New Station',
					reset: 'reset to default'
				}
			}
		},

		date2date: {
			head: {
				title: 'Date to date calculator',
				desc: 'Calculate difference between two dates.'
			},
			body: {
				h: 'Date to date calculator',
				p: 'Calculate difference between two dates'
			}
		},

		add_sub_date: {
			head: {
				title: 'Add or Subtract Date',
				desc: 'Add (or subtract) years, months, weeks, and days to(from) a date.'
			},
			body: {
				h: 'Add or Subtract Date',
				p: 'Add (or subtract) years, months, weeks, and days to (from) a date.'
			}
		}
	}
};
// });

export default en;

/** @typedef { en } Locale */

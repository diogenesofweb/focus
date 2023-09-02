/** @type {import('./en.js').Locale } */
const fr = {
	btn: {
		set_alarm: 'démarrer',
		add: 'ajouter',
		subtrack: 'soustraire',
		calculate: 'calculer',
		copy_link: 'copier le lien',
		confirm: 'confirmer',
		edit: 'éditer',
		del: 'supprimer',
		skip: 'passer',
		start: 'démarrer',
		restart: 'redemarrer',
		resume: 'reprendre',
		stop: 'arrêter',
		next: 'suivant',
		reset: 'réinitialiser',
		cycle: 'cycle',
		play: 'jouer',
		mute: 'couper',
		pause: 'suspendre'
		// pause: 'pause'
	},
	// icon title and labels
	it: {
		add_alarm: 'add alarm',
		add_timer: 'ajouter un compte à rebours',
		settings: 'paramètres',
		menu: 'menu',

		//labels
		sequence: 'Séquence',
		radio: 'Station de radio',
		vol: 'Volume',

		total_focus: 'focus : temps total du jour',
		total_break: 'pause : temps total du jour'
	},

	menu: {
		timers: 'Minuteurs',
		edit: 'Modifier',
		info: 'Info',
		pomodoro: 'Pomodoro',
		tools: 'Outils'
	},

	time: {
		date: 'Date',
		time: 'Temps',
		until: "Temps jusqu'à",
		expired: 'Expiré',
		days: 'Jours',
		hh: 'Heures',
		mm: 'Minutes',
		ss: 'Secondes',
		mins: 'min',

		year: 'année',
		years: 'années',
		month: 'mois',
		months: 'mois',
		weeks: 'semaines',
		day: 'your'
	},

	opts: {
		group: {
			general: 'Options générales',
			pomo: 'Options Pomodoro',
			addons: 'Pomodoro Add-ons'
		},

		notif: 'Notifications',
		alarm: 'Alarme',
		wake_lock: "Empêcher la gradation ou le verrouillage de l'écran",

		reminder: "Rappel d'overtime *",
		skip_break: "Sauter l'activité de pause",
		autoshow_activities: 'Les activités de pause: affichage automatique',
		autostart_focus: 'Focus: démarrage automatique',

		addons: {
			stopwatch: 'Chronomètre',
			radio: 'Lecteur radio',
			total_time: "Temps total d'aujourd'hui",
			overtime: 'Overtime'
		},

		etc: {
			remind: "* Rappelez-moi d'overtime toutes les 5 minutes.",
			autoclose: 'Supprimer à la fin',
			preserve_HMS: 'Conserver les valeurs HH:MM:SS'
		},

		theme: 'Thème'
	},

	timers: {
		pomodoro: {
			n: 'pomodoro',
			h: 'Minuteur Pomodoro',
			phase: {
				focus: 'focus',
				break: 'pause'
			},
			b_type: {
				short: 'courte',
				long: 'longue'
			},
			overtime: 'overtime'
		},

		alarm_clock: {
			n: 'réveil',
			h: 'Réveil'
		},

		countdown: {
			n: 'minuteur',
			h: 'Minuteur compte à rebours'
		},

		countdown_date: {
			n: 'minuteur_date',
			h: 'Minuteur Date'
		},

		stopwatch: {
			n: 'chronomètre',
			h: 'Chronomètre'
		}
	},

	// routes
	r: {
		index: {
			head: {
				title: 'Minuteurs en ligne gratuits',
				desc: "Des minuteurs en ligne, modernes et faciles à utiliser : pomodoro, compte à rebours, chronomètres. Calculateurs de dates. Pas de distractions. Mode clair et sombre. Fonctionne sur toutes les tailles d'écran.",
				og: {
					title: 'Minuteurs en ligne',
					desc: "Des minuteurs en ligne, modernes et faciles à utiliser : pomodoro, compte à rebours, chronomètres. Calculateurs de dates. Pas de distractions. Mode clair et sombre. Fonctionne sur toutes les tailles d'écran."
				}
			},
			body: {
				h1: 'Des minuteurs en ligne modernes et faciles à utiliser',
				h2: 'Calculateurs de Dates'
			}
		},

		pomodoro: {
			head: {
				title: 'Pomodoro minuteur en ligne',
				desc: 'Personnalisable, minimaliste et esthétique Pomodoro minuteur en ligne. Facile à utiliser, aide à la productivité et à la concentration.',
				og: {
					title: 'Pomodoro minuteur en ligne',
					desc: 'Personnalisable, minimaliste et esthétique Pomodoro minuteur en ligne. Facile à utiliser, aide à la productivité et à la concentration.'
				}
			},
			body: {
				h1: 'Minuteur de productivité en ligne',
				d1: 'Minuteur de productivité facile à utiliser, personnalisable, minimaliste et esthétique, basé sur',
				l: {
					url: 'https://fr.wikipedia.org/wiki/Technique_Pomodoro',
					n: 'la technique Pomodoro'
				},
				d2: '. En mission pour booster la productivité et la concentration, mais aussi pour favoriser des pauses significatives avec des activités prédéfinies.'
			}
		},

		stopwatch: {
			head: {
				title: 'Chronomètre en ligne',
				desc: "Facile à utiliser, précis, agréable à l'œil, chronomètre en ligne.",
				og: {
					title: 'Chronomètre en ligne',
					desc: "Facile à utiliser, précis, agréable à l'œil, chronomètre en ligne."
				}
			},
			body: {
				h1: 'Chronomètre en ligne',
				desc: 'Chronomètre en ligne facile à utiliser, compatible avec les mobiles, précis, moderne et minimaliste',
				h: 'Chronomètre'
			}
		},

		alarm_clock: {
			head: {
				title: 'Réveil en ligne',
				desc: 'Réveil en ligne facile à utiliser et à configurer'
			},
			body: {
				h1: 'Réveil en ligne',
				h3: 'Date et heure actuelles:',
				p: ''
			}
		},

		countdown: {
			head: {
				title: 'Minuteur de compte à rebours en ligne',
				desc: 'Minuteur en ligne facile à utiliser, compatible avec les mobiles, précis, moderne et minimaliste.',
				og: {
					title: 'Minuteur de compte à rebours en ligne',
					desc: 'Minuteur en ligne facile à utiliser, compatible avec les mobiles, précis, moderne et minimaliste.'
				}
			},
			body: {
				h1: 'Minuteur de compte à rebours en ligne',
				desc: 'Minuteur en ligne facile à utiliser, compatible avec les mobiles, précis, moderne et minimaliste.',
				desc_x1: 'Choisissez parmi',
				desc_x2: 'des minuteurs fréquentes et préréglés',
				h: 'Minuteur de compte à rebours'
			}
		},

		countdown_to: {
			head: {
				title: 'Minuteur Date',
				desc: 'Minuteur Date en ligne simple, adapté aux appareils mobiles et moderne'
			},
			body: {
				h1: 'Minuteur Date',
				desc: "Sélectionnez la date, l'heure et le fuseau horaire pour démarrer le minuteur.",
				h: 'Minuteur Date'
			}
		},

		c_minutes: {
			head: {
				title: 'Minuteurs préréglés populaires',
				desc: 'Comptes à rebours préréglés populaires en minutes'
			},
			body: {
				h1: 'Comptes à rebours populaires, préréglés en minutes',
				h2: 'minute minuteur'
				// h: 'Countdown'
			}
		},

		c_preset: {
			head: {
				title: (n) => `Minuteur ${n} minutes en ligne`,
				desc: (n) =>
					`Exécutez un compte à rebours prédéfini de ${n} minutes en un clic. C'est gratuit et facile à utiliser.`
			},
			body: {
				h1: (n) => `Compte à rebours préréglé de ${n} minutes.`,
				d1: 'Plus de',
				d2: 'minuteurs préréglés'
				// h: 'Countdown'
			}
		},

		stats: {
			head: {
				title: 'Statistiques',
				desc: 'Statistiques pour les activités de concentration et de pause'
			},
			body: {
				h: 'Statistiques',

				date: 'Date',
				focus: 'Focus',
				break: 'Pause',

				activity: 'Activité',
				total: 'Total'
			}
		},
		snaps: {
			head: {
				title: 'Snapshots',
				desc: 'Sauvegardez et restaurez vos données'
			},
			body: {
				h: 'Snapshots',
				download: 'télécharger snapshot',
				restore: "Restaurer à partir d'un snapshot",
				restore_ok: 'Veuillez actualiser la page.',
				desc: 'Mes Snapshots'
			}
		},
		sequences: {
			head: {
				title: 'Séquences de sessions',
				desc: 'Liste des séquences'
			},
			body: {
				// desc: 'My Snapshots',
				add: 'Ajouter une nouvelle séquence',
				h: 'Séquences de sessions',
				e: {
					name: 'Nom',
					focus: 'Focus',
					break: 'Pause',
					l_break: 'Longue pause',
					s_break: 'Courte pause',
					note: '* durée en minutes',
					sets: 'Quantité',

					time: 'Durée',
					task: 'Tâche',
					activity_list: 'Liste des activités',
					activity: 'Activité'
				}
			}
		},
		breaks: {
			head: {
				title: 'Activités de pause',
				desc: 'Activitésde pause'
			},
			body: {
				h: 'Activités de pause',
				new: 'Nouvelle liste',
				list: 'Liste des activités',
				new_activity: 'Nouvelle activité'
			}
		},
		radios: {
			head: {
				title: 'Stations de radio',
				desc: 'Liste des radios'
			},
			body: {
				h: 'Stations de radio',
				e: {
					add: 'Ajouter une nouvelle radio',
					reset: 'réinitialiser par défaut'
				}
			}
		},

		date2date: {
			head: {
				title: 'Calculateur Date à Date',
				desc: 'Calculez la différence entre deux dates'
			},
			body: {
				h: 'Calculateur Date à Date',
				p: 'Calculez la différence entre deux dates'
			}
		},

		add_sub_date: {
			head: {
				title: 'Ajouter ou soustraire une Date',
				desc: 'Ajoutez (ou soustrayez) des années, des mois, des semaines et des jours à (de) une date.'
			},
			body: {
				h: 'Ajouter ou soustraire une Date',
				p: 'Ajoutez (ou soustrayez) des années, des mois, des semaines et des jours à (de) une date.'
			}
		}
	}
};

export default fr;

/** @param {string} phase */
export function sendNotification(phase) {
	const title = 'Focus App';

	/** @type {NotificationOptions} */
	const opt = {
		body: `${phase.toUpperCase()} time is over!`
	};

	const n = new Notification(title, opt);

	n.onclick = function () {
		parent.focus();
		window.focus();
		this.close();
	};
}

// sendNotification('focus');
// sendNotification('break');

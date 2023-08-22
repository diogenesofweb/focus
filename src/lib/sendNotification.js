/** @param {string} phase */
export function sendNotification(phase) {
	const title = 'TimerOne';

	// todo: update body
	/** @type {NotificationOptions} */
	const opt = {
		body: `${phase.toUpperCase()} is over!`
	};

	const n = new Notification(title, opt);

	n.onclick = function () {
		parent.focus();
		window.focus();
		this.close();
	};
}

/** @param {string} phase */
export function sendNotification(phase) {
	const title = 'Pomidor :';

	/** @type {NotificationOptions} */
	const opt = {
		body: `${phase} is over !`
	};

	const n = new Notification(title, opt);

	n.onclick = function () {
		parent.focus();
		window.focus();
		this.close();
	};
}

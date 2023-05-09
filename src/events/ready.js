import Event from '../structures/event';

export default class extends Event {
	constructor(...args) {
		super(...args, {
			once: true,
		});
	}

	// eslint-disable-next-line no-unused-vars
	async run(client, message, args) {
		console.log(`Logged in as ${client.user.tag}!`);
		this.client.user.setActivity('!help', { type: 'LISTENING' });
	}
}

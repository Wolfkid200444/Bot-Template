import Event from '../event';
import { ActivityType } from 'discord.js';
export default class Ready extends Event {
	constructor(...args: any[]) {
		super(...args, {
			once: true,
		});
	}

	// eslint-disable-next-line no-unused-vars
	async run(client: Client) {
		console.log(`Logged in as ${client.user?.tag}!`);
		client.user?.setActivity('/help', { type: ActivityType.Listening });

	}
}

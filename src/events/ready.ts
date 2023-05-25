import Event from '../event';
import { ActivityType } from 'discord.js';
import { Bot } from '../types/types';
export default class Ready extends Event {
	constructor(...args: ConstructorParameters<typeof Event>) {
		console.log(...args)
		super(...args, {
			once: true,
		});
	}

	// eslint-disable-next-line no-unused-vars
	async run(client: Bot.Client) {
		console.log(`Logged in as ${client.user?.tag}!`);
		client.user?.setActivity('/help', { type: ActivityType.Listening });

	}
}

import Event from '../event';
import { ActivityType } from 'discord.js';

export default class Ready extends Event {
    constructor(...args: ConstructorParameters<typeof Event>) {
        // @ts-ignore
        super(...args, { once: true });
    }

    async run(client: Bot.Client) {
        console.log(`Logged in as ${client.user?.tag}!`);
        client.user?.setActivity('/help', { type: ActivityType.Listening });
    }
}

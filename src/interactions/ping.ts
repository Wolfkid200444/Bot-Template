import type { CommandInteraction } from 'discord.js';
import Interaction from '../interaction.ts';

export default class Ping extends Interaction {
    constructor(...args: ConstructorParameters<typeof Interaction>) {
        super(...args, {
            name: 'ping',
            description: 'Ping!',
        });
    }

    async run(interaction: CommandInteraction) {
        await interaction.reply('Pong!');
    }
}

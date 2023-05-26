import type { CommandInteraction } from 'discord.js';
import Event from '../../event';

export default class InteractionCreate extends Event {
    // @ts-ignore
    async run(interaction: CommandInteraction) {
        if (interaction.isChatInputCommand())
            return this.client?.emit('slashCommands', interaction);
    }
}

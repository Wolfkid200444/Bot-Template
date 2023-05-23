import Event from '../../event';

export default class InteractionCreate extends Event {
	async run(interaction) {
		if (interaction.isChatInputCommand()) return this.client.emit('slashCommands', interaction);
	}
}

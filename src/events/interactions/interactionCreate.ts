import Event from '../../event';

export default class extends Event {
	async run(interaction) {
		if (interaction.isChatInputCommand()) return this.client.emit('slashCommands', interaction);
	}
}

import Event from '../../event';

export default class extends Event {
	async run(interaction) {
		const cmd = this.client.interactions.get(interaction.commandName);
		try {
			return await cmd.run(interaction);
		}
		catch (error) {
			console.error(error);
			return await interaction.reply({
				content: 'There was an error while executing this command!',
				ephemeral: true,
			});
		}
	}
}

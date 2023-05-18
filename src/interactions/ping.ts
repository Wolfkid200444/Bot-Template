import Interaction from '../interaction';

export default class extends Interaction {
	constructor(...args) {
		super(...args, {
			name: 'ping',
			description: 'Ping!',
		});
	}

	async run(interaction) {
		await interaction.reply('Pong!');
	}
}

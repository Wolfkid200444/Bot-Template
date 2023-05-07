const Interaction = require('../structures/interaction');

module.exports = class extends Interaction {
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
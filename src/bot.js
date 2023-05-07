const botClient = require('./structures/botClient');
const config = require('../config.json');

const client = new botClient(config);

client.start();
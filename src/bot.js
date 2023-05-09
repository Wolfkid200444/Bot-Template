import botClient from './structures/botClient';
import config from '../config.json';

const client = new botClient(config);

client.start();

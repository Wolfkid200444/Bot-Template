import BotClient from './structures/botClient';
import * as dotenv from 'dotenv';
dotenv.config();

// import config from '../config.json' assert { type: 'json' };

const client = new BotClient(process.env);

client.start();

import BotClient from './structures/botClient';
import * as dotenv from 'dotenv';
dotenv.config();

const client = new BotClient(process.env);

await client.start();

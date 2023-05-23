import BotClient from "../structures/botClient";


declare global {

    type Client = BotClient;

    interface Configuration {
        TOKEN: string;
        PREFIX: string;
    }

}

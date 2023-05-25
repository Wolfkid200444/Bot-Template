import BotClient from "../structures/botClient";

declare global {
  namespace Bot {
    export interface Configuration {
      TOKEN: string;
    }

    export type Client = BotClient;
  }
  namespace Types {
    export enum EventTypes {
      ONCE = "once",
      ON = "on",
    }

    export enum InteractionType {
      SUB_COMMAND = 1,
      SUB_COMMAND_GROUP = 2,
      STRING = 3,
      INTEGER = 4,
      BOOLEAN = 5,
      USER = 6,
      CHANNEL = 7,
      ROLE = 8,
    }
  }
}

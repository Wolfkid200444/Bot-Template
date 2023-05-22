import { REST } from "@discordjs/rest";
import { Routes } from "discord.js";
import fs from "fs/promises";
import * as path from "path";
import { fileURLToPath } from "url";
import * as dotenv from "dotenv";

import Event from "../event.js";
import Interaction from "../interaction.js";

dotenv.config();

const token = process.env.TOKEN;

export default class Util {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  isClass(input: Function) {
    return (
      typeof input === "function" &&
      typeof input.prototype === "object" &&
      input.toString().substring(0, 5) === "class"
    );
  }

  get directory() {
    return `${path.dirname(
      path.join(fileURLToPath(`${new URL(import.meta.url)}`), "..")
    )}${path.sep}`;
  }

  async *loadFiles(dir: string) {
    const EXTENSION = ".json";
    const files = await fs.readdir(dir);
    const targetFiles = files.filter((file) => {
      return path.extname(file).toLowerCase() !== EXTENSION;
    });
    for (const file of targetFiles) {
      const pathToFile = path.join(dir, file);
      const isDirectory = (await fs.stat(pathToFile)).isDirectory();
      if (isDirectory) {
        yield* this.loadFiles(pathToFile);
      } else {
        yield pathToFile;
      }
    }
  }

  async loadEvents() {
    for await (const eventFile of this.loadFiles(`${this.directory}events`)) {
      const { name } = path.parse(eventFile);
      const File  = await import(`file:///${eventFile}`);
      if (!this.isClass(File.default))
        throw new TypeError(`Event ${name} doesn't export a class.`);
      const event = new File.default(this.client, name);
      if (!(event instanceof Event))
        throw new TypeError(`Event ${name} doesn't belong in events.`);
      this.client.events.set(event.name, event);
      event.emitter[event.type](name, (...args) => event.run(...args));
    }
  }

  async loadInteractions() {
    const int = [];
    for await (const interactionFile of this.loadFiles(
      `${this.directory}interactions`
    )) {
      const { name } = path.parse(interactionFile);
      const File = await import(`file:///${interactionFile}`);
      if (!this.isClass(File.default))
        throw new TypeError(`Interaction ${name} doesn't export a class.`);
      const interaction = new File.default(this.client, name);
      if (!(interaction instanceof Interaction)) {
        throw new TypeError(
          `Interaction ${name} doesn't belong in interactions.`
        );
      }
      this.client.interactions.set(interaction.name, interaction);
      delete interaction.client;
      int.push(interaction);
    }
    try {
      const res = new REST({ version: "10" }).setToken(token);
      await res.put(
        Routes.applicationGuildCommands(
          "1108729874534899763",
          "1033741322965749871"
        ),
        {
          body: int,
        }
      );
    } catch (err) {
      throw new Error(err);
    }
  }
}

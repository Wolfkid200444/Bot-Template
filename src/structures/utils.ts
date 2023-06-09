import { REST } from '@discordjs/rest';
import { Routes } from 'discord.js';
import fs from 'fs/promises';
import * as path from 'path';
import { fileURLToPath } from 'url';
import * as dotenv from 'dotenv';

import Event from '../event.ts';
import Interaction from '../interaction.ts';

dotenv.config();

const token = process.env.TOKEN as string;

export default class Util {
    client: Bot.Client;
    constructor(client: Bot.Client) {
        this.client = client;
    }

    public errorMessage(error: unknown) {
        if (error instanceof Error) return error;
        return new Error(JSON.stringify(error));
    }

    public isClass(input: Function) {
        return (
            typeof input === 'function' &&
            typeof input.prototype === 'object' &&
            input.toString().substring(0, 5) === 'class'
        );
    }

    public get directory() {
        return `${path.dirname(path.join(fileURLToPath(`${new URL(import.meta.url)}`), '..'))}${
            path.sep
        }`;
    }

    private async *loadFiles(dir: string): AsyncGenerator<string> {
        const EXTENSION = '.json';
        const files = await fs.readdir(dir);
        const targetFiles = files.filter(file => {
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

    public async loadEvents() {
        for await (const eventFile of this.loadFiles(`${this.directory}events`)) {
            const { name } = path.parse(eventFile);
            const File = await import(`file:///${eventFile}`);
            if (!this.isClass(File.default))
                throw new TypeError(`Event ${name} doesn't export a class.`);
            const event = new File.default(this.client, name);
            if (!(event instanceof Event))
                throw new TypeError(`Event ${name} doesn't belong in events.`);
            this.client.events.set(event.name, event);
            // @ts-ignore
            event.emitter[event.type](name, (...args: any) => event.run(...args));
        }
    }

    public async loadInteractions() {
        const int = [];
        for await (const interactionFile of this.loadFiles(`${this.directory}interactions`)) {
            const { name } = path.parse(interactionFile);
            const File = await import(`file:///${interactionFile}`);
            if (!this.isClass(File.default))
                throw new TypeError(`Interaction ${name} doesn't export a class.`);
            const interaction = new File.default(this.client, name);
            if (!(interaction instanceof Interaction)) {
                throw new TypeError(`Interaction ${name} doesn't belong in interactions.`);
            }
            this.client?.interactions.set(interaction.name, interaction);
            delete interaction.client;
            int.push(interaction);
        }
        try {
            const res = new REST({ version: '10' }).setToken(token);
            await res.put(
                Routes.applicationGuildCommands('1108729874534899763', '1033741322965749871'),
                {
                    body: int,
                }
            );
        } catch (err) {
            this.errorMessage(err);
        }
    }
}

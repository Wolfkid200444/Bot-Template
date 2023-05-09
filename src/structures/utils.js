import { REST } from '@discordjs/rest';
import { Routers } from 'discord.js';
import fs from 'fs/promises';
import path from 'path';

import { token } from '../config.json';

import Event from './event';
import Interaction from './interaction';

export default class util {
	constructor(client) {
		this.client = client;
	}

	isClass(input) {
		return (
			typeof input === 'function' &&
      typeof input.prototype === 'object' &&
      input.toString().substring(0, 5) === 'class'
		);
	}

	get directory() {
		return `${path.dirname(require.main.filename)}${path.sep}`;
	}

	async *loadFiles(dir) {
		const EXTENSION = '.json';
		const files = await fs.readdir(dir);
		const targetFiles = files.filter((file) => {
			return path.extname(file).toLowerCase() !== EXTENSION;
		});
		for (const file of targetFiles) {
			const pathToFile = path.join(dir, file);
			const isDirectory = (await fs.stat(pathToFile)).isDirectory();
			if (isDirectory) {
				yield* this.loadFiles(pathToFile);
			}
			else {
				yield pathToFile;
			}
		}
	}

	async loadEvents() {
		for await (const eventFile of this.loadFiles(`${this.directory}events`)) {
			delete require.cache[eventFile];
			const { name } = path.parse(eventFile);
			const File = require(eventFile);
			if (!this.isClass(File)) throw new TypeError(`Event ${name} doesn't export a class.`);
			const event = new File(this.client, name);
			if (!(event instanceof Event)) throw new TypeError(`Event ${name} doesn't belong in events.`);
			this.client.events.set(event.name, event);
			event.emitter[event.type](name, (...args) => event.run(...args));
		}
	}

	async LoadInteractions() {
		const int = [];
		for await (const interactionFile of this.loadFiles(`${this.directory}interactions`)) {
			delete require.cache[interactionFile];
			const { name } = path.parse(interactionFile);
			const File = require(interactionFile);
			if (!this.isClass(File)) throw new TypeError(`Interaction ${name} doesn't export a class.`);
			const interaction = new File(this.client, name);
			if (!(interaction instanceof Interaction)) {
				throw new TypeError(`Interaction ${name} doesn't belong in interactions.`);
			}
			this.client.interactions.set(interaction.name, interaction);
			delete interaction.client;
			int.push(interaction);
		}
		try {
			const res = new REST({ version: '10' }).setToken(token);
			await res.put(Routers.applicationCommands(this.client.user.id), {
				body: int,
			});
		}
		catch (err) {
			throw new Error(err);
		}
	}
}

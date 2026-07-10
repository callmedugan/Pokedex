import { createInterface, type Interface } from 'readline';
import { stdin, stdout } from 'node:process';
import { commandHelp } from './command_help.js';
import { commandExit } from './command_exit.js';
import { commandMap, commandMapB } from './command_map.js';
import { PokeAPI } from './pokeapi.js';

export type CLICommand = {
  name: string;
  description: string;
  callback: (state:State) => Promise<void>;
};

export type State = {
    commands: Record<string, CLICommand>,
    readline: Interface,
    api: PokeAPI,
    prevLocationsURL: string | null,
    nextLocationsURL: string | null,
}

export function initState(): State {
    return {
        readline: createInterface({
            input: stdin,
            output: stdout,
            prompt: "Pokedex > "
            }),
        commands: {
            help: {
                name: "help",
                description: "Displays the help message",
                callback: commandHelp,
            },
            exit: {
                name: "exit",
                description: "Exit the Pokedex",
                callback: commandExit,
            },
            map: {
                name: "map",
                description: "View the next 20 maps",
                callback: commandMap,
            },
            mapb: {
                name: "mapb",
                description: "View the previous 20 maps",
                callback: commandMapB,
            },
        },
        api: new PokeAPI,
        prevLocationsURL: null,
        nextLocationsURL: null
    }
}
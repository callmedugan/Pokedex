import { createInterface, type Interface } from 'readline';
import { stdin, stdout } from 'node:process';
import { commandHelp } from './command_help.js';
import { commandExit } from './command_exit.js';
import { commandMap, commandMapB } from './command_map.js';
import { PokeAPI, PokemonData as PokemonData } from './pokeapi.js';
import { commandExplore } from './command_explore.js';
import chalk from 'chalk';
import { commandCatch } from './command_catch.js';
import { inspect } from 'node:util';
import { commandInspect } from './command_inspect.js';

export type CLICommand = {
  name: string;
  description: string;
  callback: (state:State, ...args: string[]) => Promise<void>;
};

export type State = {
    commands: Record<string, CLICommand>,
    readline: Interface,
    api: PokeAPI,
    pokedex: Map<string, PokemonData>,
    prevLocationsURL: string | null,
    nextLocationsURL: string | null,
}

export function initState(): State {
    return {
        readline: createInterface({
            input: stdin,
            output: stdout,
            prompt: chalk.green("Pokedex > ")
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
            explore: {
                name: "explore",
                description: "View the pokemon found in the given map name/id",
                callback: commandExplore,
            },            
            catch: {
                name: "catch",
                description: "Attempt to catch a Pokemon of the given name/id",
                callback: commandCatch,
            },
            inspect: {
                name: "inspect",
                description: "Check details of a caught Pokemon of the given name/id",
                callback: commandInspect,
            },
        },
        pokedex: new Map<string, PokemonData>,
        api: new PokeAPI,
        prevLocationsURL: null,
        nextLocationsURL: null
    }
}
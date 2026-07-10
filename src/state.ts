import { createInterface, type Interface } from 'readline';
import { stdin, stdout } from 'node:process';
import { commandHelp } from './command_help.js';
import { commandExit } from './command_exit.js';

export type CLICommand = {
  name: string;
  description: string;
  callback: (state:State) => void;
};

export type State = {
    commands: Record<string, CLICommand>,
    readline: Interface,
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
  }}
}
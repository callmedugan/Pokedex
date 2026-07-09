import { CLICommand } from "./command.js";

export function commandHelp(commands:Record<string, CLICommand>){
    console.log("Welcome to the Pokedex!");
    console.log("Usage:\n")
    const keys = Object.keys(commands)
    for(const key of keys){
        console.log(commands[key].name + ": " + commands[key].description)
    }
}
import { State } from "./state.js";
import chalk from "chalk";

export async function commandHelp(state:State){
    console.log(chalk.yellow("Welcome to the Pokedex!"));
    console.log(chalk.cyan("Usage:\n"))
    const keys = Object.keys(state.commands)
    for(const key of keys){
        console.log(chalk.cyan(state.commands[key].name + ": ") + state.commands[key].description)
    }
}
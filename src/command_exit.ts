import process from "node:process";
import { State } from "./state.js";
import chalk from "chalk";

export async function commandExit(state:State){
    console.log(chalk.green("Closing the Pokedex... Goodbye!"));
    state.readline.close();
    process.exit(0);
}


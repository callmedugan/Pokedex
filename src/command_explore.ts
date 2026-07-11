import { State } from "./state.js";
import chalk from "chalk";

export async function commandExplore(state:State, location:string){
    //console.log(location);
    const response = await state.api.fetchLocation(location)
    console.log(chalk.cyan(`Exploring ${location}...`));
    console.log(chalk.yellow("Found Pokemon:"));
    for(const encounters of response.pokemon_encounters){
        console.log(encounters.pokemon.name)
    }
}
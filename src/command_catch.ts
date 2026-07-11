import { State } from "./state.js";
import chalk from "chalk";

export async function commandCatch(state:State, pokemon:string){
    const response = await state.api.fetchPokemon(pokemon)
    //cap catch rate at 1%
    const catchRate = 1 - Math.min(response.base_experience/300, 0.99);
    //console.log(chalk.dim("Catch rate is: " + catchRate))
    console.log(chalk.cyan(`Throwing a Pokeball at ${response.name}...`));
    //random chance
    if(Math.random() < catchRate){   
        //first time catch, register in pokedex
        if(!state.pokedex.has(response.name)){
            console.log(chalk.yellow(`${response.name} was caught! Adding ${response.name} to the Pokedex.`));
            state.pokedex.set(response.name, response);
        }
        else{
            console.log(chalk.yellow(`${response.name} was caught!`));
        }
    }
    else{      
        console.log(chalk.red(`${response.name} escaped!`));
    }
}
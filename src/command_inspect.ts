import { State } from "./state.js";
import chalk from "chalk";

export async function commandInspect(state:State, pokemon:string){
    // get pokedex data
    const data = state.pokedex.get(pokemon)
    if(data == undefined || data == null)
        throw new Error("invalid pokemon")
    //start printing
    console.log(chalk.yellow("Accessing Pokedex..."))
    console.log(chalk.green("Name: ") + data.name.toUpperCase());
    console.log(chalk.green("Number: ") + data.id);
    //types
    if(data.types.length > 1)
        console.log(chalk.green("Types: ") + data.types[0].type.name.toUpperCase() + "/" + data.types[1].type.name.toUpperCase());
    else
        console.log(chalk.green("Type: ") + data.types[0].type.name.toUpperCase());
    //stats
    console.log(chalk.green("Height: ") + data.height);
    console.log(chalk.green("Weight: ") + data.weight);
    console.log(chalk.green("HP: ") + data.stats[0].base_stat);
    console.log(chalk.green("ATTACK: ") + data.stats[1].base_stat);
    console.log(chalk.green("DEFENSE: ") + data.stats[2].base_stat);
    console.log(chalk.green("SP. ATTACK: ") + data.stats[3].base_stat);
    console.log(chalk.green("SP. DEFENSE: ") + data.stats[4].base_stat);
    console.log(chalk.green("SPEED: ") + data.stats[5].base_stat);
    
}
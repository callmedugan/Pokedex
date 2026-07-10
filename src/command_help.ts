import { State } from "./state.js";

export async function commandHelp(state:State){
    console.log("Welcome to the Pokedex!");
    console.log("Usage:\n")
    const keys = Object.keys(state.commands)
    for(const key of keys){
        console.log(state.commands[key].name + ": " + state.commands[key].description)
    }
}
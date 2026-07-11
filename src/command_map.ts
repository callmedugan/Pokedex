import { State } from "./state.js";
import chalk from "chalk";

export async function commandMap(state:State){
    const response = await state.api.fetchLocations(state.nextLocationsURL)
    for(const map of response.results){
        console.log(map.name)
    }
    state.nextLocationsURL = response.next
    state.prevLocationsURL = response.previous
}

export async function commandMapB(state:State){
    //check if on first page
    if(state.prevLocationsURL === null){
        console.log(chalk.dim("You're on the first page"))
        return
    }
    const response = await state.api.fetchLocations(state.prevLocationsURL)
    for(const map of response.results){
        console.log(map.name)
    }
    state.nextLocationsURL = response.next
    state.prevLocationsURL = response.previous
}
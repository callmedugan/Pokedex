import { State } from "./state.js";

export async function commandExplore(state:State, location:string){
    //console.log(location);
    const response = await state.api.fetchLocation(location)
    console.log(`Exploring ${location}...`);
    console.log("Found Pokemon:");
    for(const encounters of response.pokemon_encounters){
        console.log(encounters.pokemon.name)
    }
}
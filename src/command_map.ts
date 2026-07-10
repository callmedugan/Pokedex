import { State } from "./state.js";

export async function commandMap(state:State){
    const response = await state.api.fetchLocations(state.nextLocationsURL)
    for(const map of response.results){
        console.log(map.name)
    }
    state.nextLocationsURL = response.next
    state.prevLocationsURL = response.previous
}

export async function commandMapB(state:State){
    if(state.prevLocationsURL === null){
        console.log("you're on the first page")
        return
    }
    const response = await state.api.fetchLocations(state.prevLocationsURL)
    for(const map of response.results){
        console.log(map.name)
    }
    state.nextLocationsURL = response.next
    state.prevLocationsURL = response.previous
}
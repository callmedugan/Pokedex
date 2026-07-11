import { Cache } from "./pokecache.js";
import chalk from "chalk";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  #cache: Cache;

  constructor() {
    this.#cache = new Cache(30000);
  }

  //checks cache, then makes api call and stores to cache if needed before returning results
  async fetchLocations(pageURL: string | null): Promise<ShallowLocations> {
    const url = pageURL ?? (PokeAPI.baseURL + "/location-area");
    const cacheData = this.#cache.get(url);
    //if cache contains data
    if(cacheData != undefined){
        //console.log(chalk.dim("*retrieved cache data*"))
        return cacheData.value;
    }
    //else
    const response = await fetch(url)
    if(!response.ok){
        throw new Error("Unexpected response: " + response.status);
    }
    const parsedData = await response.json();
    //store to cache
    //console.log(chalk.dim("*updated cache data*"))
    this.#cache.add(url, parsedData);
    return parsedData;
  }

  //used to get individual location data
  async fetchLocation(locationName: string): Promise<Location> {
    const url = PokeAPI.baseURL + "/location-area/" + locationName;
    const cacheData = this.#cache.get(url);
    //if cache contains data
    if(cacheData != undefined){
        //console.log(chalk.dim("*retrieved cache data*"))
        return cacheData.value;
    }
    //else
    const response = await fetch(url)
    if(!response.ok){
        throw new Error("Unexpected response: " + response.status);
    }
    const parsedData = await response.json();
    //store to cache
    //console.log(chalk.dim("*updated cache data*"))
    this.#cache.add(url, parsedData);
    return parsedData;
  }

//used to get individual pokemon data
  async fetchPokemon(pokemonName: string): Promise<PokemonData> {
    const url = PokeAPI.baseURL + "/pokemon/" + pokemonName;
    const cacheData = this.#cache.get(url);
    //if cache contains data
    if(cacheData != undefined){
        //console.log(chalk.dim("*retrieved cache data*"))
        return cacheData.value;
    }
    //else
    const response = await fetch(url)
    if(!response.ok){
        throw new Error("Unexpected response: " + response.status);
    }
    const parsedData = await response.json();
    //store to cache
    //console.log(chalk.dim("*updated cache data*"))
    this.#cache.add(url, parsedData);
    return parsedData;
  }
}



//used for location area groups
export type ShallowLocations = {
    count: number
    next: string | null
    previous: string | null
    results: Result[]
};

//used for location areas
export type Location = {
  id: number
  name: string
  location: Result
  pokemon_encounters: PokemonEncounter[]
}

export type PokemonEncounter = {
  pokemon: Pokemon
}

export type Pokemon = {
  name: string
  url: string
}

//used for both
export type Result = {
  name: string
  url: string
}

//used for getting pokemon catch data
export type PokemonData = {
  name: string
  id: number
  base_experience: number
}
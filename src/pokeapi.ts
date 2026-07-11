import { Cache } from "./pokecache.js";

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
        console.log("*retrieved cache data*")
        return cacheData.value;
    }
    //else
    const response = await fetch(url)
    if(!response.ok){
        throw new Error("Unexpected response: " + response.status);
    }
    const parsedData = await response.json();
    //store to cache
    console.log("*updated cache data*")
    this.#cache.add(url, parsedData);
    return parsedData;
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const response = await fetch(PokeAPI.baseURL + "/location/" + locationName)
    return await response.json();
  }
}

export type ShallowLocations = {
    count: number
    next: string | null
    previous: string | null
    results: Result[]
};

export interface Result {
  name: string
  url: string
}


export type Location = {
  // add properties here
};
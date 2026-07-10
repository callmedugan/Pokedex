export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  constructor() {}

  async fetchLocations(pageURL: string | null): Promise<ShallowLocations> {
    const response = await fetch(pageURL ?? (PokeAPI.baseURL + "/location-area"))
    if(!response.ok){
        throw new Error("Unexpected response: " + response.status);
    }
    return await response.json();
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
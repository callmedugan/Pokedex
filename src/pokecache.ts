import { time, timeStamp } from "node:console";
import { TIMEOUT } from "node:dns";
import { Network } from "node:inspector/promises";

export type CacheEntry<T> = {
    createdAt:number,
    value:T,
}

export class Cache {
    #cache = new Map<string, CacheEntry<any>>();
    //timer to clear older entries
    #reapIntervalId: NodeJS.Timeout | undefined = undefined;
    //milliseconds
    #interval: number;

    constructor(interval:number){
        this.#interval = interval;
        this.#startReapLoop();
    }

    //deletes any entries older than interval
    #reap(){
        for(const [key, entry] of this.#cache){
            if(entry.createdAt < Date.now() - this.#interval){
                this.#cache.delete(key);
            }
        }
    }

    //starts reap loop and repeats every interval
    #startReapLoop(){
        this.#reapIntervalId = setTimeout(() => {this.#reap()}, this.#interval);
    }

    //stops loop
    stopReapLoop(){
        clearInterval(this.#reapIntervalId);
        this.#reapIntervalId = undefined;
    }

    add<T>(key:string, val:T){
        this.#cache.set(key,{createdAt: Date.now(), value: val})
    }

    get<T>(key:string): CacheEntry<any> | undefined{
        return this.#cache.get(key);
    }
}
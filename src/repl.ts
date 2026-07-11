import { stdin, stdout } from 'node:process';
import { State } from './state.js';

export function cleanInput(input:string): string[]{
    const split= input.toLowerCase().split(" ");
    const result:string[] = [];
    for(const s of split){
        if(s != "") result.push(s)
    }
    return result;
}

export function startREPL(state:State){
    const rl = state.readline;
    //start
    rl.prompt();
    //callback
    rl.on("line", async (line) => {
        //clean
        const response = cleanInput(line);
        const command = state.commands[response[0]];
        //if command is valid, run callback
        if(command){
            try{
                await command.callback(state, response.length > 1 ? response[1] : "");
            }catch(err){
                console.log(err instanceof Error ? err.message : "unknown error")
            }
        }
        else{
            console.log("Unknown command")
        }
        //return to prompt
        rl.prompt();
    })
};
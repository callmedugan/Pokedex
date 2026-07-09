import { createInterface } from 'node:readline';
import { stdin, stdout } from 'node:process';
import { getCommands } from './command.js';

export function cleanInput(input:string): string[]{
    const split= input.toLowerCase().split(" ");
    const result:string[] = [];
    for(const s of split){
        if(s != "") result.push(s)
    }
    return result;
}

export function startREPL(){
    const rl = createInterface({
        input: stdin,
        output: stdout,
        prompt: "Pokedex > "
    });
    //start
    rl.prompt();
    //callback
    rl.on("line", (line) => {
        //clean
        const response = cleanInput(line);
        const command = getCommands()[response[0]];
        if(command){
            command.callback(getCommands());
        }
        else{
            console.log("Unknown command")
        }
        //return to prompt
        rl.prompt();
    })
};
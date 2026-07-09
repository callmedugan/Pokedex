import { createInterface } from 'node:readline';
import { stdin, stdout } from 'node:process';

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
        //check if empty and log first word
        if(response.length !== 0)
            console.log("Your command was: " + response[0]);
        rl.prompt();
    })
};
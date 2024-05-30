import fs from 'fs';
import { yarg } from './plugins/yargs.plugin';

const { b: base, l: limit, s: showTable } = yarg; 

let outputMessage = '';
    
const headerMessage = `
===============================
        Tabla del ${ base }
===============================
`

for (let i = 1; i <= limit; i++) {
    outputMessage += (`${ base } x ${ i } = ${ base * i }\n`);
}

outputMessage = headerMessage + '\n' + outputMessage;
showTable && console.log(outputMessage);


const outputPath = `outputs`

fs.mkdirSync(outputPath, { recursive: true });
fs.writeFileSync(`${ outputPath }/tabla-${ base }.txt`, outputMessage);
console.log('File Created');


// console.log( fs.readFileSync(`outputs/tabla-${base}.txt`) );

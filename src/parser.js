import readline from 'readline'
import stream from 'stream'

export default class Parser {

    parserArgE(body) {

        let data = []
        var buf = new Buffer(body);
        var bufferStream = new stream.PassThrough();
        bufferStream.end(buf);

        var rl = readline.createInterface({
            input: bufferStream,
        });
        
        let linearr = []
        rl.on('line', (line) => {
            linearr = line.split(/\s+/)
            linearr.forEach(x => {
                if(Number.isInteger(Number(x))){
                     
                }
            });
        });
        
        return 
    }

    parser(text, indexOn, indexLast) {

        let textString = JSON.stringify(text);

        let firstIndex = textString.lastIndexOf(indexOn);

        firstIndex = firstIndex + indexOn.length;

        let lastIndex = textString.indexOf(indexLast);

        let exit = lastIndex - firstIndex;

        let block = textString.substring(firstIndex, exit);

        return block;
    }

}
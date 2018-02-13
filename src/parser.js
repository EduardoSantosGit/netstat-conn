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
       
        rl.on('line', function (line) {
            console.log(line)
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
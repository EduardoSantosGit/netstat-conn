import readline from 'readline'
import stream from 'stream'

export default class Parser {

    async parserArgE(body) {
        var buf = new Buffer(body);
        var bufferStream = new stream.PassThrough();
        bufferStream.end(buf);

        var rl = readline.createInterface({
            input: bufferStream,
        });

        let linearr = []
        await rl.on('line', (line) => {
            linearr.push(line)
        });

        let data = []
        linearr.forEach(x => {
            data.push(x.split(/\s+/))
        })

        console.log(data)
        let ret = []
        for(let i=4;i<data.length;i++){

            let env = data[i][data[i].length-1]
            let rec = data[i][data[i].length-2]

        }

        return
    }

}
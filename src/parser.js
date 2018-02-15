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

        let number = []
        for (let i = 0; i < data.length; i++) {

            let count = 0
            let pri = 0
            let seg = 0
            for (let j = 0; j < data[i].length; j++) {
                
                if(Number.isInteger(Number(data[i][j]))){

                    if(count == 0){

                        pri = data[i][j]

                        count++
                    }
                    else {
                        seg = data[i][j]
                        count++
                    }
                }

                console.log('primeiro ' , pri , "segundo ", seg)
            }

        }

        return
    }

}
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
        
        let ret = []
        for(let i=4;i<data.length;i++){

            let env = data[i][data[i].length-1]
            let rec = data[i][data[i].length-2]

            if(!Number.isInteger(Number(env)))
                env = 0

            if(!Number.isInteger(Number(rec)))
                rec = 0
            
            let name = data[i][0]

            if(data[i].length > 1 && !Number.isInteger(Number(data[i][1]))){
                name += " " + data[i][1]
            }
            
            ret.push({
                "name" : name,
                "received" : rec,
                "sent" : env
            })
            
        }
        
        return ret
    }

    async parserArgN(body) {
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

        let ret = []
        for(let i=4;i<data.length;i++){
            
            ret.push({
                "protocol" : data[i][1],
                "localAddress" : data[i][2],
                "foreignAddress" : data[i][3],
                "state" : data[i][4]
            })
        }

        return ret
    }

    async parserArgR(body) {
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

        console.log(linearr)
    }    

}
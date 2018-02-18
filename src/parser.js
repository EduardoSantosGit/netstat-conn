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

        let data = []
        linearr.forEach(x => {
            data.push(x.split(/\s+/))
        })

        let posipv4 = 0
        let posipv6 = 0
        for(let i=0;i<data.length;i++){
            if(data[i].equals([ 'IPv4', 'Route', 'Table' ])){
                posipv4 = i
            }
            if(data[i].equals([ 'IPv6', 'Route', 'Table' ])){
                posipv6 = i
            }
        }

        let ipv4 = this.parserIPV4(data.slice(posipv4 + 4, posipv6 - 4))
        let ipv6 = this.parserIPV6(data.slice(posipv6 + 3, posipv6 - 3))

    }
    
    parserIPV4(body){
        let ret = []
        for(let i=0;i<body.length;i++){
            ret.push({
                "networkDestination" : body[i][1],
                "netmask" : body[i][2],
                "gateway" : body[i][3],
                "interface" : body[i][4],
                "maetric" : body[i][5]
            })
        }
        return ret
    }

    parserIPV6(body){

        let ret = []
        for(let i=0;i<body.length;i++){
           
        }
        return ret

    }

}

Array.prototype.equals = function (array) {
    if (!array)
        return false;

    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        
        if (this[i] instanceof Array && array[i] instanceof Array) {
            
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) { 
            return false;  
        }           
    }       
    return true;
}
import ParserUtil from './parserUtil' 

export default class Parser {

    async parserArgE(body) {
        
        let data = await ParserUtil.parserCmdOut(body)

        let ret = []
        for (let i = 4; i < data.length; i++) {

            let env = data[i][data[i].length - 1]
            let rec = data[i][data[i].length - 2]

            if (!Number.isInteger(Number(env)))
                env = 0

            if (!Number.isInteger(Number(rec)))
                rec = 0

            let name = data[i][0]

            if (data[i].length > 1 && !Number.isInteger(Number(data[i][1]))) {
                name += " " + data[i][1]
            }

            ret.push({
                "name": name,
                "received": rec,
                "sent": env
            })

        }

        return ret
    }

    async parserArgN(body) {

        let data = await ParserUtil.parserCmdOut(body)

        let ret = []
        for (let i = 4; i < data.length; i++) {

            ret.push({
                "protocol": data[i][1],
                "localAddress": data[i][2],
                "foreignAddress": data[i][3],
                "state": data[i][4]
            })
        }

        return ret
    }

    async parserArgR(body) {

        let data = await ParserUtil.parserCmdOut(body)

        let posipv4 = 0
        let posipv6 = 0
        for (let i = 0; i < data.length; i++) {
            if (data[i].equals(['IPv4', 'Route', 'Table'])) {
                posipv4 = i
            }
            if (data[i].equals(['IPv6', 'Route', 'Table'])) {
                posipv6 = i
            }
        }

        let ipv4 = ParserUtil.parserIPV4(data.slice(posipv4 + 4, posipv6 - 4))
        let ipv6 = ParserUtil.parserIPV6(data.slice(posipv6 + 4, data.length - 3))

        let json = {
            "ipv4" : ipv4,
            "ipv6" : ipv6
        }

        return json
    }

    async parserArgS(body) {

        let data = await ParserUtil.parserCmdOut(body)
        
        let splits = ['IPv4','IPv6','ICMPv4','ICMPv6','TCP','UDP']
        let block = []
        let index = []
        for(let i=0;i<data.length;i++){
            if(splits.includes(data[i][0])){
                index.push(i)
            }
        }
        
        let ipv4 = ParserUtil.parserBlockEqual(data.slice(index[0],index[1]))
        let ipv6 = ParserUtil.parserBlockEqual(data.slice(index[1],index[2]))
        let icmpv4 = ParserUtil.parserBlockTable(data.slice(index[2],index[3]))
        let icmpv6 = ParserUtil.parserBlockTable(data.slice(index[3],index[4]))
        let tcpIpv4 = ParserUtil.parserBlockEqual(data.slice(index[4],index[5]))
        let tcpIpv6 = ParserUtil.parserBlockEqual(data.slice(index[5],index[6]))
        let udpIpv4 = ParserUtil.parserBlockEqual(data.slice(index[6],index[7]))
        let udpIpv6 = ParserUtil.parserBlockEqual(data.slice(index[7],index[8]))

        let json = {
            "IPv4": ipv4,
            "IPv6" : ipv6,
            "ICMPv4" : icmpv4,
            "ICMPv6" : icmpv6,
            "TcpIPv4" : tcpIpv4,
            "TcpIPv6" : tcpIpv6,
            "UdpIPv4" : udpIpv4,
            "UdpIPv6" : udpIpv6
        }

        return json
    }
    
    async parserArgO(body) {

        let data = await ParserUtil.parserCmdOut(body)

        let ret = []

        for(let i=4;i<data.length;i++){
            
            ret.push({
                "protocol" : data[i][1],
                "localAddress" : data[i][2],
                "foreignAddress" : data[i][3],
                "state" : data[i][4],
                "pid" : data[i][5]
            })

        }

        return ret
    }    

    async parserArgA(body) {

        let data = await ParserUtil.parserCmdOut(body)

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
    
    async parserArgP(body){

        let data = await ParserUtil.parserCmdOut(body)

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
    
}

Array.prototype.equals = function (array) {
    if (!array)
        return false;

    if (this.length != array.length)
        return false;

    for (var i = 0, l = this.length; i < l; i++) {

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
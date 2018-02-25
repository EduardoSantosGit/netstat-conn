import Parser from '../src/parser'
import Command from '../src/command'
import { expect } from 'chai'
import readline from 'readline'
import stream from 'stream'

describe('parser tests', () => {

    it('test method parserArgE params -e return json', async () => {

        let body = new Command().commandNetstat('-e')
        let parser = new Parser();
        let ret = await parser.parserArgE(body)
        
        let jsonString = JSON.stringify(ret[0])

        expect(jsonString).to.include("{");
        expect(jsonString).to.include("name");
        expect(jsonString).to.include("received");
        expect(jsonString).to.include("sent");
        expect(jsonString).to.include("}");
    })

    it('test method parserArgE params -e return json not null length valid', async () => {

        let body = new Command().commandNetstat('-e')
        let parser = new Parser();
        let ret = await parser.parserArgE(body)
        
        expect(ret).to.not.null
        expect(ret.length).to.equal(6)
        ret.map(x => {
            expect(x).to.not.null
        })       
    })

    it('test method parserArgE params -e return json values numbers', async () => {

        let body = new Command().commandNetstat('-e')
        let parser = new Parser();
        let ret = await parser.parserArgE(body)
        
        ret.map(x => {
            expect(Number.isInteger(Number(x.sent))).to.true
            expect(Number.isInteger(Number(x.received))).to.true
        })       
    })

    it('test method parserArgN params -n return json', async () => {

        let body = new Command().commandNetstat('-n')
        let parser = new Parser();
        let ret = await parser.parserArgN(body)
        
        let jsonString = JSON.stringify(ret[0])

        expect(jsonString).to.include("{")
        expect(jsonString).to.include("}")
        expect(jsonString).to.include("protocol")
        expect(jsonString).to.include("localAddress")
        expect(jsonString).to.include("foreignAddress")
        expect(jsonString).to.include("state")
    })

    it('test method parserArgN params -n return values valid', async () => {

        let body = new Command().commandNetstat('-n')
        let parser = new Parser();
        let ret = await parser.parserArgN(body)
        
        let state = ["CLOSE_WAIT", "CLOSED", "ESTABLISHED","FIN_WAIT_1","FIN_WAIT_2","LAST_ACK","LISTEN","SYN_RECEIVED",
        "SYN_SEND","TIME_WAIT"]
        
        ret.map(x => {
            expect(x.protocol === ("TCP" || "UDP")).to.true
            expect(state.includes(x.state)).to.true            
        })    
    })

    it('test method parserArgN params -n return values ips and ports valid', async () => {

        let body = new Command().commandNetstat('-n')
        let parser = new Parser();
        let ret = await parser.parserArgN(body)
        
        ret.map(x => {

            expect(x.localAddress).to.include(":")
            expect(x.foreignAddress).to.include(":")

            if(!x.localAddress.includes("[") || !x.foreignAddress.includes("[")){
                expect(x.foreignAddress).to.include(".")
                expect(x.localAddress).to.include(".")
            }     
        })    
    })

    it('test method parserArgR return json and array not null', async () => {

        let body = new Command().commandNetstat('-r')
        let parser = new Parser();
        let ret = await parser.parserArgR(body)  

        expect(ret).to.not.null
        expect(ret.ipv4).to.not.null
        expect(ret.ipv6).to.not.null
    })

    it('test method parserArgR return values json valid', async () => {

        let body = new Command().commandNetstat('-r')
        let parser = new Parser();
        let ret = await parser.parserArgR(body)  

        let jsonString4 = JSON.stringify(ret.ipv4[0])
        let jsonString6 = JSON.stringify(ret.ipv6[0])

        expect(jsonString4).to.include("{")
        expect(jsonString4).to.include("}")
        expect(jsonString4).to.include("networkDestination")
        expect(jsonString4).to.include("netmask")
        expect(jsonString4).to.include("gateway")
        expect(jsonString4).to.include("interface")
        expect(jsonString4).to.include("metric")

        expect(jsonString6).to.include("{")
        expect(jsonString6).to.include("}")
        expect(jsonString6).to.include("if")
        expect(jsonString6).to.include("metric")
        expect(jsonString6).to.include("networkDestination")
        expect(jsonString6).to.include("gateway")
    })

    it('test method parserArgS return keys json valid', async () => {

        let body = new Command().commandNetstat('-s')
        let parser = new Parser();
        let ret = await parser.parserArgS(body)
        
       expect(ret).to.not.null
       expect(ret.IPv4).to.not.null
       expect(ret.IPv6).to.not.null
       expect(ret.ICMPv4).to.not.null
       expect(ret.ICMPv6).to.not.null
       expect(ret.TcpIPv4).to.not.null
       expect(ret.TcpIPv6).to.not.null
       expect(ret.UdpIPv4).to.not.null
       expect(ret.UdpIPv6).to.not.null
    });  
    
    it('test method parserArgS return IPv4 keys json valid', async () => {

        let body = new Command().commandNetstat('-s')
        let parser = new Parser();
        let ret = await parser.parserArgS(body)
        
        let json = JSON.stringify(ret.IPv4[0])

        expect(json).to.include("{")
        expect(json).to.include("}")
        expect(json).to.include("name")
        expect(json).to.include("value")
    });

    it('test method parserArgS return IPv6 keys json valid', async () => {

        let body = new Command().commandNetstat('-s')
        let parser = new Parser();
        let ret = await parser.parserArgS(body)
        
        let json = JSON.stringify(ret.IPv6[0])

        expect(json).to.include("{")
        expect(json).to.include("}")
        expect(json).to.include("name")
        expect(json).to.include("value")
    });

    it('test method parserArgS return ICMPv4 keys json valid', async () => {

        let body = new Command().commandNetstat('-s')
        let parser = new Parser();
        let ret = await parser.parserArgS(body)
        
        let json = JSON.stringify(ret.ICMPv4[0])

        expect(json).to.include("{")
        expect(json).to.include("}")
        expect(json).to.include("name")
        expect(json).to.include("received")
        expect(json).to.include("sent")
    });

    it('test method parserArgS return ICMPv6 keys json valid', async () => {

        let body = new Command().commandNetstat('-s')
        let parser = new Parser();
        let ret = await parser.parserArgS(body)
        
        let json = JSON.stringify(ret.ICMPv6[0])

        expect(json).to.include("{")
        expect(json).to.include("}")
        expect(json).to.include("name")
        expect(json).to.include("received")
        expect(json).to.include("sent")
    });

    it('test method parserArgS return TcpIPv4 keys json valid', async () => {

        let body = new Command().commandNetstat('-s')
        let parser = new Parser();
        let ret = await parser.parserArgS(body)
        
        let json = JSON.stringify(ret.TcpIPv4[0])

        expect(json).to.include("{")
        expect(json).to.include("}")
        expect(json).to.include("name")
        expect(json).to.include("value")
    });

    it('test method parserArgS return TcpIPv6 keys json valid', async () => {

        let body = new Command().commandNetstat('-s')
        let parser = new Parser();
        let ret = await parser.parserArgS(body)
        
        let json = JSON.stringify(ret.TcpIPv6[0])

        expect(json).to.include("{")
        expect(json).to.include("}")
        expect(json).to.include("name")
        expect(json).to.include("value")
    });

    it('test method parserArgS return UdpIPv4 keys json valid', async () => {

        let body = new Command().commandNetstat('-s')
        let parser = new Parser();
        let ret = await parser.parserArgS(body)
        
        let json = JSON.stringify(ret.UdpIPv4[0])

        expect(json).to.include("{")
        expect(json).to.include("}")
        expect(json).to.include("name")
        expect(json).to.include("value")
    });

    it('test method parserArgS return UdpIPv6 keys json valid', async () => {

        let body = new Command().commandNetstat('-s')
        let parser = new Parser();
        let ret = await parser.parserArgS(body)
        
        let json = JSON.stringify(ret.UdpIPv6[0])

        expect(json).to.include("{")
        expect(json).to.include("}")
        expect(json).to.include("name")
        expect(json).to.include("value")
    });

    async function auxFormatCmd(body){
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
        return data
    }

})

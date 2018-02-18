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

    it('test method parserIPV4 return json valid', async () => {

        let body = new Command().commandNetstat('-r')
        let parser = new Parser();
        let ret = await auxFormatCmd(body)

        let posipv4 = 0
        let posipv6 = 0
        for (let i = 0; i < ret.length; i++) {
            if (ret[i].equals(['IPv4', 'Route', 'Table'])) {
                posipv4 = i
            }
            if (ret[i].equals(['IPv6', 'Route', 'Table'])) {
                posipv6 = i
            }
        }

        let ipv4 = parser.parserIPV4(ret.slice(posipv4 + 4, posipv6 - 4))

        let jsonString = JSON.stringify(ipv4[0])

        expect(jsonString).to.include("{")
        expect(jsonString).to.include("}")
        expect(jsonString).to.include("networkDestination")
        expect(jsonString).to.include("netmask")
        expect(jsonString).to.include("gateway")
        expect(jsonString).to.include("interface")
        expect(jsonString).to.include("metric")
    })

    it('test method parserIPV4 return values ip valid', async () => {

        let body = new Command().commandNetstat('-r')
        let parser = new Parser();
        let ret = await auxFormatCmd(body)

        let posipv4 = 0
        let posipv6 = 0
        for (let i = 0; i < ret.length; i++) {
            if (ret[i].equals(['IPv4', 'Route', 'Table'])) {
                posipv4 = i
            }
            if (ret[i].equals(['IPv6', 'Route', 'Table'])) {
                posipv6 = i
            }
        }

        let ipv4 = parser.parserIPV4(ret.slice(posipv4 + 4, posipv6 - 4))

        ipv4.map(x => {
            expect(x.networkDestination).to.include(".")   
            expect(x.netmask).to.include(".")
            expect(x.interface).to.include(".")   
            expect(Number.isInteger(Number(x.metric))).to.true     
        })    
    })

    it('test method parserIPV6 return json valid', async () => {

        let body = new Command().commandNetstat('-r')
        let parser = new Parser();
        let ret = await auxFormatCmd(body)

        let posipv4 = 0
        let posipv6 = 0
        for (let i = 0; i < ret.length; i++) {
            if (ret[i].equals(['IPv4', 'Route', 'Table'])) {
                posipv4 = i
            }
            if (ret[i].equals(['IPv6', 'Route', 'Table'])) {
                posipv6 = i
            }
        }

        let ipv6 = parser.parserIPV6(ret.slice(posipv6 + 4, ret.length - 3))

        let jsonString = JSON.stringify(ipv6[0])

        expect(jsonString).to.include("{")
        expect(jsonString).to.include("}")
        expect(jsonString).to.include("if")
        expect(jsonString).to.include("metric")
        expect(jsonString).to.include("networkDestination")
        expect(jsonString).to.include("gateway")
    })

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

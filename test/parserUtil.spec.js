import ParserUtil from '../src/parserUtil'
import Command from '../src/command'
import { expect } from 'chai'
import readline from 'readline'
import stream from 'stream'

describe('parser util tests', () => {

    it('test method parserIPV4 return json valid', async () => {

        let body = new Command().commandNetstat('-r')
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

        let ipv4 = ParserUtil.parserIPV4(ret.slice(posipv4 + 4, posipv6 - 4))

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

        let ipv4 = ParserUtil.parserIPV4(ret.slice(posipv4 + 4, posipv6 - 4))

        ipv4.map(x => {
            expect(x.networkDestination).to.include(".")   
            expect(x.netmask).to.include(".")
            expect(x.interface).to.include(".")   
            expect(Number.isInteger(Number(x.metric))).to.true     
        })    
    })

    it('test method parserIPV6 return json valid', async () => {

        let body = new Command().commandNetstat('-r')
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

        let ipv6 = ParserUtil.parserIPV6(ret.slice(posipv6 + 4, ret.length - 3))

        let jsonString = JSON.stringify(ipv6[0])

        expect(jsonString).to.include("{")
        expect(jsonString).to.include("}")
        expect(jsonString).to.include("if")
        expect(jsonString).to.include("metric")
        expect(jsonString).to.include("networkDestination")
        expect(jsonString).to.include("gateway")
    })

    it('test method parserIPV6 return values ip valid', async () => {

        let body = new Command().commandNetstat('-r')
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

        let ipv6 = ParserUtil.parserIPV6(ret.slice(posipv6 + 4, ret.length - 3))

        ipv6.map(x => {
            if(x.if !== "")
                expect(Number.isInteger(Number(x.if))).to.true
            if(x.metric !== "")
                expect(Number.isInteger(Number(x.metric))).to.true
            if(x.networkDestination !== "")   
                expect(x.networkDestination).to.include(":") 
        })    
    })

    it('test method parserBlockEqual return json statistics ip', async () => {

        let body = new Command().commandNetstat('-s')
        let ret = await auxFormatCmd(body)

        let splits = ['IPv4','IPv6','ICMPv4','ICMPv6','TCP','UDP']
        let index = []

        for(let i=0;i<ret.length;i++){
            if(splits.includes(ret[i][0])){
                index.push(i)
            }
        }
        
        let ipv4 = ParserUtil.parserBlockEqual(ret.slice(index[0],index[1]))
       
        let json = JSON.stringify(ipv4[0])

        expect(ipv4).to.not.null
        expect(json).to.include("name")
        expect(json).to.include("value")
        expect(json).to.include("{")
        expect(json).to.include("}")
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
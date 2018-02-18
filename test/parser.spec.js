import Parser from '../src/parser'
import Command from '../src/command'
import { expect } from 'chai'

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

})

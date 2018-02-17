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

    
})

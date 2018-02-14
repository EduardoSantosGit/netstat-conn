import Parser from '../src/parser'
import Command from '../src/command'
import { expect } from 'chai'

describe('parser tests', () => {

    it('test method parserArgE params text', async () => {

        let body = new Command().commandNetstat('-e')
        let parser = new Parser();
        await parser.parserArgE(body)

       // console.log(ret)
    })
})

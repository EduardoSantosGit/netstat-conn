import Parser from '../src/parser'
import Command from '../src/command'
import { expect } from 'chai'

describe('parser tests', () => {

    it('test method parserArgE params text', () => {

        let body = new Command().commandNetstat('-e')
        let ret = new Parser().parserArgE(body)

        console.log(ret)
    })
})

import Netstat from '../src/netstat'
import { expect } from 'chai'

describe('netstat tests', () => {

    it('test method netstat params', () => {
        
        let net = new Netstat().netstat();
        
        expect(net).to.not.null
    })

    it('test method validateArgs params array valid', () => {

        let ret = new Netstat().validateArgs(['a','e','s'])
        expect(ret).to.true
    })

    it('test method validateArgs params array not valid', () => {

        let ret = new Netstat().validateArgs(['a','e','f'])
        expect(ret).to.false
    })

    it('test method validateArgs param valid', () => {

        let ret = new Netstat().validateArgs('a')
        expect(ret).to.true
    })

    it('test method validateArgs param not valid', () => {

        let ret = new Netstat().validateArgs('j')
        expect(ret).to.false
    })

    it('test method validateArgs param string not valid', () => {

        let ret = new Netstat().validateArgs('aef')
        expect(ret).to.false
    })
})    
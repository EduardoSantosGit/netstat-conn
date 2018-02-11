import Netstat from '../src/netstat'
import { expect } from 'chai'

describe('netstat tests', () => {

    it('test method netstat params', () => {
        
        let net = new Netstat().netstat();
        
        expect(net).to.not.null
    })

    it('test method validateArgs params valid', () => {

        let ret = new Netstat().validateArgs(['a','e','s'])
        expect(ret).to.true
    })

    it('test method validateArgs params not valid', () => {

        let ret = new Netstat().validateArgs(['a','e','f'])
        expect(ret).to.false
    })
})    
import Netstat from '../src/netstat'
import { expect } from 'chai'

describe('netstat tests', function () {

    it('test method netstat params', async function () {
        
        let net = new Netstat().netstat();
        
        expect(net).to.not.null
    })
})    
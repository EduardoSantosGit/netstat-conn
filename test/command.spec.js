import Command from '../src/command'
import { expect } from 'chai'

describe('Command tests', () => {

    it('test method commandNetstat param -a return item includes address', () => { 
        let ret = new Command().commandNetstat('-a')
        expect(ret).to.includes('Local Address')
        expect(ret).to.includes('Foreign')
        expect(ret).to.includes('State')
    })
    
    it('test method commandNetstat param -e return item includes texts bytes', () => { 
        let ret = new Command().commandNetstat('-e')
        expect(ret).to.includes('Bytes')
        expect(ret).to.includes('Received')
        expect(ret).to.includes('Sent')
    })

    it('test method commandNetstat param -n return item includes texts proto', () => { 
        let ret = new Command().commandNetstat('-n')
        expect(ret).to.includes('Proto')
        expect(ret).to.includes('Local Address')
        expect(ret).to.includes('Foreign')
        expect(ret).to.includes('State')
    })
})    
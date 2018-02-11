import Command from '../src/command'
import { expect } from 'chai'

describe('Command tests', () => {

    it('test method commandNetstat param -a return item includes address', () => { 
        let ret = new Command().commandNetstat('-a')
        expect(ret).to.includes('Local Address')
    })
    
    it('test method commandNetstat param -e return item includes texts bytes', () => { 
        let ret = new Command().commandNetstat('-e')
        expect(ret).to.includes('Bytes')
        expect(ret).to.includes('Received')
        expect(ret).to.includes('Sent')
    })
})    
import Command from '../src/command'
import { expect } from 'chai'

describe('Command tests', () => {

    it('test method commandNetstat param -a return item includes address', () => { 
        let ret = new Command().commandNetstat('-a')
        expect(ret).to.includes('Local Address')
    })
    
})    
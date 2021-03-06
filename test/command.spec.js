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

    it('test method commandNetstat param -o return item includes texts pid', () => { 
        let ret = new Command().commandNetstat('-o')
        expect(ret).to.includes('Proto')
        expect(ret).to.includes('Local Address')
        expect(ret).to.includes('Foreign')
        expect(ret).to.includes('State')
        expect(ret).to.includes('PID')
    })

    it('test method commandNetstat param -s return item includes texts ip', () => { 
        let ret = new Command().commandNetstat('-s')
        expect(ret).to.includes('IPv4')
        expect(ret).to.includes('IPv6')
        expect(ret).to.includes('ICMPv4')
        expect(ret).to.includes('ICMPv6')
        expect(ret).to.includes('TCP')
    })

    it('test method commandNetstat param -r return item includes texts Routes', () => { 
        let ret = new Command().commandNetstat('-r')
        expect(ret).to.includes('Active Routes')
        expect(ret).to.includes('Network Destination')
        expect(ret).to.includes('IPv6 Route Table')
        expect(ret).to.includes('Metric Network Destination')
    })
})    
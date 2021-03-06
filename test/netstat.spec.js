import Netstat from '../src/netstat'
import { expect } from 'chai'

describe('netstat tests', () => {

    it('test method validateArgs params array valid return true', () => {

        let ret = new Netstat().validateArgs(['a','e','s'])
        expect(ret).to.true
    })
    
    it('test method validateArgs params array not validreturn false', () => {

        let ret = new Netstat().validateArgs(['a','e','f'])
        expect(ret).to.false
    })

    it('test method validateArgs param valid return true', () => {

        let ret = new Netstat().validateArgs('a')
        expect(ret).to.true
    })

    it('test method validateArgs param not valid return false', () => {

        let ret = new Netstat().validateArgs('j')
        expect(ret).to.false
    })

    it('test method validateArgs param string not valid return false', () => {

        let ret = new Netstat().validateArgs('aef')
        expect(ret).to.false
    })

    it('test method validateArgs param number return false', () => {

        let ret = new Netstat().validateArgs(1254)
        expect(ret).to.false
    })

    it('test method validateArgs param NaN return false', () => {

        let ret = new Netstat().validateArgs(NaN)
        expect(ret).to.false
    })

    it('test method convertArgs param char retuns array', () => {

        let ret = new Netstat().convertArgs('a')
        expect(ret).to.eql(['a'])
    })

    it('test method convertArgs param number retuns array empty', () => {

        let ret = new Netstat().convertArgs(1254)
        expect(ret).to.eql([])
    })

    it('test method convertArgs param NaN retuns array empty', () => {

        let ret = new Netstat().convertArgs(NaN)
        expect(ret).to.eql([])
    })

    it('test method convertArgs param string valid retuns array values', () => {

        let ret = new Netstat().convertArgs('ars')
        expect(ret).to.eql(['a','r','s'])
    })

    it('test method netstat param NaN retuns exception', () => { 
        expect(() => new Netstat().netstat(NaN)).to.throw('Error invalid argument');
    })

    it('test method netstat param number retuns exception', () => { 
        expect(() => new Netstat().netstat(524545)).to.throw('Error invalid argument');
    })

    it('test method netstat param number string retuns exception', () => { 
        expect(() => new Netstat().netstat('524545')).to.throw('Error invalid argument');
    })

    it('test method formatArgs param string valid retuns string concat', () => { 
        let ret = new Netstat().formatArgs('ars')
        expect(ret).to.equal('-ars')
    })

    it('test method formatArgs param char valid retuns string', () => { 
        let ret = new Netstat().formatArgs('a')
        expect(ret).to.equal('-a')
    })

    it('test method formatArgs param array valid retuns string concat', () => { 
        let ret = new Netstat().formatArgs(['a'])
        expect(ret).to.equal('-a')
    })

    it('test method formatArgs param array multiple itens valid retuns string concat', () => { 
        let ret = new Netstat().formatArgs(['a','r'])
        expect(ret).to.equal('-ar')
    })

})    